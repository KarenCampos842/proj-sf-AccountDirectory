/**
 * @file Account.jsx
 * @description Reusable presentational component representing an individual Account entity.
 * Encapsulates the table row structure for a single Salesforce account record.
 */

import React from 'react';

/**
 * Renders an individual account row within the directory table.
 * 
 * @component
 * @param {Object} props - Component properties.
 * @param {Object} props.account - The account data object to display.
 * @param {string} props.account.id - Unique Salesforce identifier.
 * @param {string} props.account.name - Name of the account organization.
 * @param {string} props.account.industry - Business sector or industry.
 * @param {string} props.account.phone - Contact telephone number.
 * @returns {JSX.Element} A table row (`<tr>`) containing the account details.
 */
const Account = ({ account }) => {
  return (
    <tr className="account-table__row">
      {/* Account name highlighted with primary accent color */}
      <td className="account-table__cell font-semibold">{account.name}</td>
      
      {/* Industry sector description */}
      <td className="account-table__cell">{account.industry}</td>
      
      {/* Contact phone number */}
      <td className="account-table__cell">{account.phone}</td>
    </tr>
  );
};

export default Account;