import { calculatePoints, calculateRewardPoints } from './Rewardpoints1';

describe('calculatePoints', () => {
  test('calculates correct points for transactions', () => {
    expect(calculatePoints(120)).toBe(90); // 20*2 + 50*1
    expect(calculatePoints(75)).toBe(25);  // 25*1
    expect(calculatePoints(50)).toBe(0);   // No points
    expect(calculatePoints(200)).toBe(250); // 100*2 + 50*1
  });
});

describe('calculateRewardPoints', () => {
  test('calculates reward points per customer', () => {
    const transactions = [
      { customerId: 1, amount: 120, date: "2024-06-15" },
      { customerId: 1, amount: 75, date: "2024-06-20" },
      { customerId: 2, amount: 150, date: "2024-06-25" }
    ];
    const result = calculateRewardPoints(transactions);
    expect(result).toEqual({
      1: { 5: 115 }, // June transactions for customer 1
      2: { 5: 150 }, // June transaction for customer 2
    });
  });

  test('handles multiple months correctly', () => {
    const transactions = [
      { customerId: 1, amount: 120, date: "2024-06-15" },
      { customerId: 1, amount: 75, date: "2024-07-10" },
      { customerId: 2, amount: 150, date: "2024-08-05" }
    ];
    const result = calculateRewardPoints(transactions);
    expect(result).toEqual({
      1: { 5: 90, 6: 25 }, // June and July transactions for customer 1
      2: { 7: 150 }        // August transaction for customer 2
    });
  });
});
