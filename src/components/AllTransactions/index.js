import React from 'react';
import './style.css'
const AllTransactionsTable = ({ transactions }) => (
  <div>
    <h2>All Transactions</h2>
    <table>
      <thead>
        <tr>
          <th>Customer Id</th>
          <th>Customer Name</th>
          <th>Amount</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map(({ customerId, customerName, amount, date }) => (
          <tr key={`${customerId}-${date}`}>
            <td className='text-left'>{customerId}</td>
            <td className='text-left'>{customerName}</td>
            <td className='text-left'>${amount.toFixed(2)}</td>
            <td className='text-left'>{new Date(date).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default AllTransactionsTable;
