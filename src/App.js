import React, { useState, useEffect } from 'react';
import AllTransactionsTable from './components/AllTransactionsTable';
import CustomerMonthlyRewardsTable from './components/CustomerMonthlyRewardsTable';
import TotalRewardsTable from './components/TotalRewardsTable';
import { calculateRewardPoints } from './utils';
import './App.css'; // Import the CSS file

const mockApiCall = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { customerId: 1, customerName: 'John Doe', amount: 120, date: '2024-06-15' },
        { customerId: 1, customerName: 'John Doe', amount: 75, date: '2024-06-20' },
        { customerId: 2, customerName: 'Jane Smith', amount: 150, date: '2024-06-25' },
        { customerId: 2, customerName: 'Jane Smith', amount: 60, date: '2024-07-05' },
        { customerId: 3, customerName: 'Sam Brown', amount: 300, date: '2024-08-15' },
        { customerId: 3, customerName: 'Sam Brown', amount: 50, date: '2024-08-18' },
        { customerId: 1, customerName: 'John Doe', amount: 200, date: '2024-08-20' },
      ]);
    }, 1000);
  });
};

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [rewards, setRewards] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    mockApiCall().then((data) => {
      setTransactions(data);
      const rewardPoints = calculateRewardPoints(data);
      setRewards(rewardPoints);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading transactions...</div>;

  return (
    <div className="table-container">
      <h1>Customer Rewards Program</h1>
      <AllTransactionsTable transactions={transactions} />
      <CustomerMonthlyRewardsTable rewards={rewards} />
      <TotalRewardsTable rewards={rewards} />
    </div>
  );
};

export default App;
