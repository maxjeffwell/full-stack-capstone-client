import React from 'react';
import { render, screen } from './test-utils';
import Signout from '../components/auth/Signout';

// Mock the signout action
const mockSignout = jest.fn();
jest.mock('../store/actions', () => ({
  ...jest.requireActual('../store/actions'),
  signout: () => mockSignout(),
}));

describe('<Signout />', () => {
  beforeEach(() => {
    mockSignout.mockClear();
  });

  it('Should render without crashing', () => {
    render(<Signout />);
    expect(
      screen.getByText('You have successfully logged out.')
    ).toBeInTheDocument();
  });

  it('Should call signout action on mount', () => {
    render(<Signout />);
    expect(mockSignout).toHaveBeenCalledTimes(1);
  });

  it('Should display success message', () => {
    render(<Signout />);

    const message = screen.getByText('You have successfully logged out.');
    expect(message).toBeInTheDocument();
    expect(message.closest('.message')).toHaveClass('success');
  });
});
