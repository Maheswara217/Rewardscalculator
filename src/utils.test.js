import { calculateRewardPoints } from './utils/utils';

describe('calculateRewardPoints', () => {
  test('calculates points correctly for each customer', () => {
    const mockData = [
      { customerId: 1, customerName: 'John Doe', amount: 120, date: '2024-06-15' },
      { customerId: 1, customerName: 'John Doe', amount: 75, date: '2024-06-20' },
      { customerId: 2, customerName: 'Jane Smith', amount: 150, date: '2024-06-25' },
      { customerId: 2, customerName: 'Jane Smith', amount: 60, date: '2024-07-05' },
      { customerId: 3, customerName: 'Sam Brown', amount: 300, date: '2024-08-15' },
      { customerId: 3, customerName: 'Sam Brown', amount: 50, date: '2024-08-18' },
      { customerId: 1, customerName: 'John Doe', amount: 200, date: '2024-08-20' },
    ];

    const result = calculateRewardPoints(mockData);

    expect(result).toEqual({
      1: {
        customerName: 'John Doe',
        monthlyPoints: { '06-2024': 130, '08-2024': 250 },
        totalPoints: 380,
      },
      2: {
        customerName: 'Jane Smith',
        monthlyPoints: { '06-2024': 150, '07-2024': 60 },
        totalPoints: 210,
      },
      3: {
        customerName: 'Sam Brown',
        monthlyPoints: { '08-2024': 350 },
        totalPoints: 350,
      },
    });
  });

  test('returns empty object for no transactions', () => {
    const result = calculateRewardPoints([]);
    expect(result).toEqual(8);
  });
});
