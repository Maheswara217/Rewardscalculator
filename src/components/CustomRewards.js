import React, { useState, useEffect } from 'react';
import { transactionsData } from '../data/transactionsData';


const CustomRewards = () => {
  const [data, setData] = useState([]);


  // Define calculateRewardPoints inside the component
  const calculateRewardPoints = (amount) => {
    let points = 0;
    if (amount > 100) {
      points += (amount - 100) * 2;
      amount = 100;
    }
    if (amount > 50) {
      points += (amount - 50) * 1;
    }
    return points;
  };


  useEffect(() => {
    const fetchTransactions = () => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(transactionsData), 1000);
      });
    };


    fetchTransactions().then(transactions => {
      const processedData = transactions.map(customer => {
        const monthlyRewards = {};


        customer.transactions.forEach(transaction => {
          const month = transaction.date.split('-')[1];
          const points = calculateRewardPoints(transaction.amount);


          if (!monthlyRewards[month]) {
            monthlyRewards[month] = 0;
          }


          monthlyRewards[month] += points;
        });


        return {
          ...customer,
          monthlyRewards,
          totalRewards: Object.values(monthlyRewards).reduce((a, b) => a + b, 0),
        };
      });


      setData(processedData);
    });
  }, []);


  return (
    <div>
      <h1>Customer Rewards</h1>
      {data.map(customer => (
        <div key={customer.customerId}>
          <h2>{customer.name}</h2>
          {Object.keys(customer.monthlyRewards).map(month => (
            <p key={month}>
              Month {month}: {customer.monthlyRewards[month]} points
            </p>
          ))}
          <p>Total: {customer.totalRewards} points</p>
        </div>
      ))}
    </div>
  );
};


export default CustomRewards;
