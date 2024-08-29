import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
// import { calculatePoints } from './utils/utils';

// Mock API call
jest.mock('./utils/utils', () => ({
  calculateRewardPoints: jest.fn((data) => {
    return {
      1: { customerName: 'John Doe', monthlyPoints: { '06-2024': 130, '08-2024': 250 }, totalPoints: 380 },
      2: { customerName: 'Jane Smith', monthlyPoints: { '06-2024': 150, '07-2024': 60 }, totalPoints: 210 },
      3: { customerName: 'Sam Brown', monthlyPoints: { '08-2024': 350 }, totalPoints: 350 },
    };
  }),
}));

describe('App Component', () => {
  // test('renders loading message initially', () => {
    // render(<App />);
    // expect(screen.getByText(/Loading transactions.../i)).toBeInTheDocument();
  // });

  test('renders tables after fetching data', async () => {
    render(<App />);
    await waitFor(() => expect(screen.getByText(/All Transactions/i)).toBeInTheDocument());
    expect(screen.getByText(/Monthly Rewards for Each Customer/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Rewards for Each Customer/i)).toBeInTheDocument();
  });

  test('displays the correct data in All Transactions Table', async () => {
    render(<App />);
    await waitFor(() => screen.getByText('John Doe'));
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Sam Brown')).toBeInTheDocument();
  });

  test('displays the correct total rewards for each customer', async () => {
    render(<App />);
    await waitFor(() => screen.getByText('Total Rewards for Each Customer (Last 3 Months)'));
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('380')).toBeInTheDocument(); // John Doe's total points
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('210')).toBeInTheDocument(); // Jane Smith's total points
    expect(screen.getByText('Sam Brown')).toBeInTheDocument();
    expect(screen.getByText('350')).toBeInTheDocument(); // Sam Brown's total points
  });
});
