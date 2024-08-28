import React  from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import CustomerRewards from './CustomRewards';


// Mock the transactionsData import
jest.mock('../data/transactionsData', () => ({
  transactionsData: [
    {
      customerId: 1,
      name: 'John Doe',
      transactions: [
        { date: '2024-06-01', amount: 120 },
        { date: '2024-06-15', amount: 75 },
        { date: '2024-07-05', amount: 200 },
        { date: '2024-07-20', amount: 50 },
        { date: '2024-08-01', amount: 110 },
        { date: '2024-08-10', amount: 90 },
      ],
    },
    {
      customerId: 2,
      name: 'Jane Smith',
      transactions: [
        { date: '2024-06-10', amount: 50 },
        { date: '2024-06-25', amount: 180 },
        { date: '2024-07-07', amount: 90 },
        { date: '2024-07-22', amount: 120 },
        { date: '2024-08-15', amount: 60 },
      ],
    },
  ],
}));


describe('CustomerRewards Component', () => {
  it('renders customer rewards correctly', async () => {
    render(<CustomerRewards />);


    // Wait for the data to be fetched and displayed
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Month 06: 115 points')).toBeInTheDocument();
      expect(screen.getByText('Month 07: 250 points')).toBeInTheDocument();
      expect(screen.getByText('Month 08: 110 points')).toBeInTheDocument();
      expect(screen.getByText('Total: 475 points')).toBeInTheDocument();


      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
      expect(screen.getByText('Month 06: 210 points')).toBeInTheDocument();
      expect(screen.getByText('Month 07: 130 points')).toBeInTheDocument();
      expect(screen.getByText('Month 08: 10 points')).toBeInTheDocument();
      expect(screen.getByText('Total: 350 points')).toBeInTheDocument();
    });
  });
});
