  
 // Calculate points for a single transaction
export const calculatePoints = (amount) => {
  let points = 0;
  if (amount > 100) {
    points += (amount - 100) * 2; // 2 points for every dollar spent over $100
  }
  if (amount > 50) {
    points += Math.min(amount - 50, 50); // 1 point for every dollar between $50 and $100
  }
  return points;
};

// Group transactions by customer and month, and calculate points
export const calculateRewardPoints = (transactions) => {
  const rewards = {};

  transactions.forEach(({ customerId, customerName, amount, date }) => {
    const month = new Date(date).toLocaleString('default', { month: 'long', year: 'numeric' });
    const points = calculatePoints(amount);

    if (!rewards[customerId]) {
      rewards[customerId] = { customerName, monthlyPoints: {}, totalPoints: 0 };
    }

    if (!rewards[customerId].monthlyPoints[month]) {
      rewards[customerId].monthlyPoints[month] = 0;
    }

    rewards[customerId].monthlyPoints[month] += points;
    rewards[customerId].totalPoints += points;
  });

  return rewards;
};
