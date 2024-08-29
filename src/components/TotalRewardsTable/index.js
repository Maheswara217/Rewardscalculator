import React from 'react';

const TotalRewardsTable = ({ rewards }) => {
    
    return(
  <div>
    <h2>Total Rewards for Each Customer (Last 3 Months)</h2>
    <table>
      <thead>
        <tr>
          <th>Customer Name</th>
          <th>Total Points</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(rewards).map(([customerId, { customerName, totalPoints }]) => (
          <tr key={customerId}>
            <td className='text-left'>{customerName}</td>
            <td className='text-left'>{totalPoints}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  )
}

export default TotalRewardsTable;
