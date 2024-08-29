import React from 'react';

const AllTransactionsTable = ({ transactions }) => (
  <div>
    <h2>All Transactions</h2>
    <table>
      <thead>
        <tr>
          <th>Customer Name</th>
          <th>Amount</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map(({ customerId, customerName, amount, date }) => (
          <tr key={`${customerId}-${date}`}>
            <td>{customerName}</td>
            <td>${amount.toFixed(2)}</td>
            <td>{new Date(date).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default AllTransactionsTable;
