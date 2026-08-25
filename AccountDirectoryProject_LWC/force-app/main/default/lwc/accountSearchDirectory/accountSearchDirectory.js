/**
 * @description Lightning Web Component that provides a searchable and sortable directory
 *              of Account records.
 *
 *              Loading-state contract: every handler that changes a reactive wire parameter
 *              (searchTerm, sortField, sortDirection) must set `isLoading = true` *before*
 *              making that change, since the @wire service only calls back into
 *              processWiredAccounts once new data or an error has already arrived — there is
 *              no separate "request started" callback. Skipping this step in a new handler
 *              would silently break the loading spinner for that interaction.
 */
import { LightningElement, wire } from 'lwc';
import searchAccounts from '@salesforce/apex/AccountSearchController.searchAccounts';

const SEARCH_DELAY_MILLISECONDS = 300;
const SORT_ASCENDING = 'ASC';
const SORT_DESCENDING = 'DESC';

export default class AccountSearchDirectory extends LightningElement {

    searchTerm = '';
    sortField = 'Name';
    sortDirection = SORT_ASCENDING;

    accounts = [];
    errorMessage = '';
    isLoading = true;

    _searchTimeout;

    /**
     * @description Options rendered in the "Sort By" combobox. Values must match the
     *              server-side whitelist in AccountSearchController exactly, or a selection
     *              here would silently fall back to the default sort on the server.
     */
    get sortOptions() {
        return [
            { label: 'Account Name', value: 'Name' },
            { label: 'Industry', value: 'Industry' },
            { label: 'Phone', value: 'Phone' }
        ];
    }

    /**
     * @description Icon reflecting the current sort direction, used on the toggle button.
     */
    get sortIconName() {
        return this.sortDirection === SORT_ASCENDING ? 'utility:arrowup' : 'utility:arrowdown';
    }

    /**
     * @description Wires the Apex method and re-runs it automatically whenever searchTerm,
     *              sortField, or sortDirection changes. Only responsible for turning the
     *              *result* into component state — isLoading is turned on by the callers
     *              below, not here (see the loading-state contract in the class doc above).
     */
    @wire(searchAccounts, {
        searchTerm: '$searchTerm',
        sortField: '$sortField',
        sortDirection: '$sortDirection'
    })
    processWiredAccounts({ error, data }) {
        if (data) {
            this.accounts = data;
            this.errorMessage = '';
        } else if (error) {
            this.accounts = [];
            this.errorMessage = this._extractErrorMessage(error);
        }

        this.isLoading = false;
    }

    // --- Event Handlers ---

    /**
     * @description Debounces the search input so a new Apex call only fires 300ms after
     *              the user stops typing, instead of on every keystroke.
     * @param {Event} event - Input change event from the search box.
     */
    handleSearchTermChange(event) {
        const currentInput = event.target.value;

        window.clearTimeout(this._searchTimeout);

        this._searchTimeout = setTimeout(() => {
            this.isLoading = true;
            this.searchTerm = currentInput;
        }, SEARCH_DELAY_MILLISECONDS);
    }

    /**
     * @description Applies a new sort field selected from the combobox. No debounce needed
     *              here since a combobox selection, unlike typing, doesn't fire repeatedly.
     * @param {Event} event - Change event from the sort combobox; value is in event.detail.
     */
    handleSortFieldChange(event) {
        this.isLoading = true;
        this.sortField = event.detail.value;
    }

    /**
     * @description Flips between ascending and descending order for the current sort field.
     */
    toggleSortDirection() {
        this.isLoading = true;
        this.sortDirection = this.sortDirection === SORT_ASCENDING ? SORT_DESCENDING : SORT_ASCENDING;
    }

    /**
     * @description Extracts a user-displayable message from the wire service's error shape.
     * @param {Object} error - The error object returned by the wire adapter.
     * @return {String} A readable error message, falling back to a generic one if none is present.
     */
    _extractErrorMessage(error) {
        return error.body ? error.body.message : 'An unknown error occurred while fetching accounts.';
    }

    // --- UI State Getters ---
    // Each of these is gated on !isLoading so the loading spinner is never shown alongside
    // stale data, a stale error, or an empty state left over from a previous search.

    /** True once a non-empty result set has finished loading. */
    get hasAccounts() {
        return !this.isLoading && this.accounts && this.accounts.length > 0;
    }

    /** True once a failed request has finished loading. */
    get hasError() {
        return !this.isLoading && this.errorMessage.length > 0;
    }

    /** True once loading has finished with no error and no results. */
    get isDirectoryEmpty() {
        return !this.isLoading && !this.hasError && (!this.accounts || this.accounts.length === 0);
    }
}