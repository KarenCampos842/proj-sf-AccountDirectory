/**
 * @description Controller class for the Account Search Directory Lightning Web Component.
 *              Retrieves Account records that match a search term, with optional dynamic
 *              sorting by a whitelisted set of fields.
 *
 *              Security model:
 *              - `with sharing` enforces record-level sharing rules for the running user.
 *              - `WITH USER_MODE` enforces object- and field-level security (CRUD/FLS) on the query.
 *              - Sort field/direction are validated against a whitelist before being concatenated
 *                into the dynamic SOQL string, since column names cannot be passed as bind variables.
 */
public with sharing class AccountSearchController {

    /** Maximum number of records returned per search, to keep results reasonable and stay within governor limits. */
    private static final Integer MAX_QUERY_RESULTS = 50;

    /** Fallback sort field used whenever the caller-supplied field is missing or not whitelisted. */
    private static final String DEFAULT_SORT_FIELD = 'Name';

    /** Fallback sort direction used whenever the caller-supplied direction is missing or invalid. */
    private static final String DEFAULT_SORT_DIRECTION = 'ASC';

    /**
     * @description Retrieves Accounts whose Name matches the search term, ordered by the
     *              requested field and direction. 
     * @param searchTerm    Substring to match against Account Name. Blank returns all accounts.
     * @param sortField     Desired sort field API name. Must be one of Name, Industry, Phone.
     * @param sortDirection Desired sort direction, 'ASC' or 'DESC'.
     * @return List of matching Account records (Id, Name, Industry, Phone), capped at MAX_QUERY_RESULTS.
     */
    @AuraEnabled(cacheable=true)
    public static List<Account> searchAccounts(String searchTerm, String sortField, String sortDirection) {

        // Wrap the search term for a "contains" match. This stays injection-safe even though
        // the query below is built dynamically, because it's passed in as a bind variable.
        String searchPattern = '%' + (String.isBlank(searchTerm) ? '' : searchTerm) + '%';

        // Sort field can't be a bind variable — SOQL doesn't allow binding column names — so it
        // has to be whitelisted explicitly instead of trusting client input in the query string.
        Set<String> validSortFields = new Set<String>{'Name', 'Industry', 'Phone'};
        String safeSortField = validSortFields.contains(sortField) ? sortField : DEFAULT_SORT_FIELD;

        // Same reasoning applies to sort direction: only ASC or DESC ever reach the query string.
        String safeSortDirection = (String.isNotBlank(sortDirection) && sortDirection.toUpperCase() == 'DESC')
            ? 'DESC'
            : DEFAULT_SORT_DIRECTION;

        String queryString = 'SELECT Id, Name, Industry, Phone ' +
                             'FROM Account ' +
                             'WHERE Name LIKE :searchPattern ' +
                             'WITH USER_MODE ' +
                             'ORDER BY ' + safeSortField + ' ' + safeSortDirection + ' NULLS LAST ' +
                             'LIMIT :MAX_QUERY_RESULTS';

        // Database.query() resolves :searchPattern and :MAX_QUERY_RESULTS automatically, 
        // since both are in scope as local variables at the point this method runs.
        return Database.query(queryString);
    }
}