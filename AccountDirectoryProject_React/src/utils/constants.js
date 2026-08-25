/**
 * @file constants.js
 * @description Centralized application constants used to eliminate magic strings 
 * and values, ensuring consistency across search, sorting, and state management.
 */

/**
 * Enumeration of available sort directions to avoid magic strings.
 * @readonly
 * @enum {string}
 */
export const SORT_DIRECTIONS = {
  ASCENDING: 'asc',
  DESCENDING: 'desc',
};

/**
 * Configuration list of fields available for sorting functionality.
 * Maps user-friendly labels to actual object property keys in the data source.
 */
export const SORTABLE_FIELDS = [
  { label: 'Account', key: 'name' },
  { label: 'Industry', key: 'industry' },
  { label: 'Phone', key: 'phone' },
];

/**
 * Default initial values for the application core state.
 */
export const DEFAULT_STATE = {
  SEARCH_TERM: '',
  SORT_FIELD: 'name',
  SORT_DIRECTION: SORT_DIRECTIONS.ASCENDING,
};