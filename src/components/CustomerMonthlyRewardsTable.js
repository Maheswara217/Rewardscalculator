import React from 'react';

const CustomerMonthlyRewardsTable = ({ rewards }) => (
  <div>
    <h2>Monthly Rewards for Each Customer</h2>
    {Object.entries(rewards).map(([customerId, { customerName, monthlyPoints }]) => (
      <div key={customerId}>
        <h3>{customerName}</h3>
        <table>
          <thead>
            <tr>
              <th>Month</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(monthlyPoints).map(([month, points]) => (
              <tr key={month}>
                <td>{month}</td>
                <td>{points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ))}
  </div>
);

export default CustomerMonthlyRewardsTable;
