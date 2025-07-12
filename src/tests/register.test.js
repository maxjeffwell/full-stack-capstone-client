import React from 'react';
import { render, screen, waitFor } from './test-utils';
import userEvent from '@testing-library/user-event';
import Register from '../components/auth/Register';

// Mock navigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('<Register />', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('Should render without crashing', () => {
    render(<Register />);
    expect(screen.getByText('registration')).toBeInTheDocument();
  });

  it('Should display registration form fields', () => {
    render(<Register />);

    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirm Password')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /register/i })
    ).toBeInTheDocument();
  });

  it('Should show validation errors for invalid email', async () => {
    const user = userEvent.setup();
    render(<Register />);

    const emailInput = screen.getByPlaceholderText('Email');
    const submitButton = screen.getByRole('button', { name: /register/i });

    await user.type(emailInput, 'invalid-email');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/invalid email address/i)).toBeInTheDocument();
    });
  });

  it('Should validate password length', async () => {
    const user = userEvent.setup();
    render(<Register />);

    const passwordInput = screen.getByPlaceholderText('Password');
    await user.type(passwordInput, 'short');
    await user.tab(); // Trigger validation

    await waitFor(() => {
      expect(
        screen.getByText(/must be at least 7 characters/i)
      ).toBeInTheDocument();
    });
  });

  it('Should validate password confirmation matches', async () => {
    const user = userEvent.setup();
    render(<Register />);

    const passwordInput = screen.getByPlaceholderText('Password');
    const confirmInput = screen.getByPlaceholderText('Confirm Password');

    await user.type(passwordInput, 'password123');
    await user.type(confirmInput, 'different123');
    await user.tab(); // Trigger validation

    await waitFor(() => {
      expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
    });
  });

  it('Should display demo account message', () => {
    render(<Register />);
    expect(screen.getByText('DEMO ACCOUNT AVAILABLE')).toBeInTheDocument();
  });
});
