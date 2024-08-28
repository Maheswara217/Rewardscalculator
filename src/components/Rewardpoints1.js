import React, { useState, useEffect } from 'react';

// Helper function to simulate API call
const fetchTransactions = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { customerId: 1, amount: 120, date: "2024-06-15" },
        { customerId: 1, amount: 75, date: "2024-06-20" },
        { customerId: 1, amount: 200, date: "2024-07-10" },
        { customerId: 2, amount: 150, date: "2024-06-25" },
        { customerId: 2, amount: 60, date: "2024-07-05" },
        { customerId: 3, amount: 300, date: "2024-08-15" },
        { customerId: 3, amount: 85, date: "2024-08-22" },
        // More data can be added to demonstrate functionality
      ]);
    }, 1000);
  });
};

// Pure function to calculate points for a single transaction
const calculatePoints = (amount) => {
  let points = 0;
  if (amount > 100) {
    points += (amount - 100) * 2 + 50; // 2 points for each dollar over $100, plus 1 point for each dollar between $50 and $100
  } else if (amount > 50) {
    points += (amount - 50); // 1 point for each dollar between $50 and $100
  }
  return points;
};

// Pure function to calculate points per customer
const calculateRewardPoints = (transactions) => {
  const customerPoints = {};

  transactions.forEach(({ customerId, amount, date }) => {
    const points = calculatePoints(amount);
    const month = new Date(date).getMonth(); // get month as an integer (0-11)

    if (!customerPoints[customerId]) {
      customerPoints[customerId] = {};
    }

    if (!customerPoints[customerId][month]) {
      customerPoints[customerId][month] = 0;
    }

    customerPoints[customerId][month] += points;
  });

  return customerPoints;
};

const RewardPoints = () => {
  const [transactions, setTransactions] = useState([]);
  const [rewardPoints, setRewardPoints] = useState({});

  useEffect(() => {
    const getData = async () => {
      const data = await fetchTransactions();
      setTransactions(data);
      const points = calculateRewardPoints(data);
      setRewardPoints(points);
    };

    getData();
  }, []);

  return (
    <div>
      <h1>Reward Points</h1>
      {Object.keys(rewardPoints).map((customerId) => (
        <div key={customerId}>
          <h2>Customer {customerId}</h2>
          {Object.keys(rewardPoints[customerId]).map((month) => (
            <p key={month}>
              Month {parseInt(month) + 1}: {rewardPoints[customerId][month]} points
            </p>
          ))}
          <p>Total: {Object.values(rewardPoints[customerId]).reduce((a, b) => a + b, 0)} points</p>
        </div>
      ))}
    </div>
  );
};

export default RewardPoints;
