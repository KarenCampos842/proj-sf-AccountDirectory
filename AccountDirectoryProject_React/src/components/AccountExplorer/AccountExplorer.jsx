/**
 * @file AccountExplorer.jsx
 * @description Main smart container component for the Account Directory application.
 * Manages UI state, client-side filtering, and ascending/descending data sorting.
 */

import React, { useState, useMemo } from 'react';
import Account from '../Account/Account';
import { SORT_DIRECTIONS, SORTABLE_FIELDS, DEFAULT_STATE } from '../../utils/constants';
import rawAccountsData from '../../data/Account_Sample_Data.json';
import './AccountExplorer.css';

/**
 * AccountExplorer container component.
 * 
 * @component
 * @returns {JSX.Element} The rendered enterprise account explorer dashboard layout.
 */
const AccountExplorer = () => {
  const [searchTerm, setSearchTerm] = useState(DEFAULT_STATE.SEARCH_TERM);
  const [sortField, setSortField] = useState(DEFAULT_STATE.SORT_FIELD);
  const [sortDirection, setSortDirection] = useState(DEFAULT_STATE.SORT_DIRECTION);

  /**
   * Derived state calculation: filters and sorts local JSON records.
   */
  const processedAccounts = useMemo(() => {
    let processed = [...rawAccountsData];

    if (searchTerm.trim() !== '') {
      const lowerCaseTerm = searchTerm.toLowerCase();
      processed = processed.filter((account) =>
        account.name.toLowerCase().includes(lowerCaseTerm)
      );
    }

    processed.sort((a, b) => {
      const valueA = a[sortField] || '';
      const valueB = b[sortField] || '';
      const comparisonResult = valueA.localeCompare(valueB);

      return sortDirection === SORT_DIRECTIONS.ASCENDING
        ? comparisonResult
        : comparisonResult * -1;
    });

    return processed;
  }, [searchTerm, sortField, sortDirection]);

  /**
   * Toggles the sorting direction state between ASCENDING and DESCENDING.
   */
  const handleSortDirectionToggle = () => {
    setSortDirection((prevDirection) =>
      prevDirection === SORT_DIRECTIONS.ASCENDING
        ? SORT_DIRECTIONS.DESCENDING
        : SORT_DIRECTIONS.ASCENDING
    );
  };

  return (
    <div className="app-container">
      <main className="account-explorer">
        
        {/* Header and Control Toolbar Section */}
        <header className="account-explorer__header">
          <div className="header-titles">
            <span className="subtitle">Salesforce Directory</span>
            <h1>Accounts Management</h1>
          </div>
          
          {/* Controls: Search input and sorting options */}
          <div className="controls">
            <div className="controls__search-wrapper">
              <svg className="search-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
              </svg>
              <input
                type="text"
                placeholder="Search accounts by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="controls__input"
                aria-label="Search Accounts by name"
              />
            </div>

            <select
              value={sortField}
              onChange={(e) => setSortField(e.target.value)}
              className="controls__select"
              aria-label="Select field to sort table by"
              >
              {SORTABLE_FIELDS.map((field) => (
                <option key={field.key} value={field.key}>
                  Sort by {field.label}
                </option>
              ))}
              </select>

              <button 
              type="button"
              onClick={handleSortDirectionToggle} 
              className="controls__btn-icon"
              title={`Current order: ${sortDirection}. Click to toggle.`}
              aria-label="Toggle sorting direction"
              >
              {sortDirection === SORT_DIRECTIONS.ASCENDING ? '↑' : '↓'}
              </button>
          </div>
        </header>

        {/* Presentation Section: Data Table mapping through the reusable Account component */}
        <section className="table-card">
          {processedAccounts.length > 0 ? (
            <div className="table-responsive">
              <table className="account-table">
                <thead>
                  <tr>
                    <th>Account Name</th>
                    <th>Industry</th>
                    <th>Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {processedAccounts.map((account) => (
                    <Account key={account.id} account={account} />
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-state">
              <svg className="empty-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 10h10v2H7zm0 4h7v2H7z"/>
              </svg>
              <h3>No matching accounts found</h3>
              <p>We couldn't find any results for "{searchTerm}". Please check the spelling or try a different name.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default AccountExplorer;