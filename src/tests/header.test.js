import React from 'react';
import { render, screen } from './test-utils';
import Header from '../components/Header';

describe('<Header />', () => {
  it('Should render without crashing', () => {
    render(<Header />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('Should display logo image', () => {
    render(<Header />);
    const logo = screen.getByRole('img');
    expect(logo).toBeInTheDocument();
  });

  it('Should show unauthenticated navigation links', () => {
    render(<Header />);

    expect(screen.getByText('Register')).toBeInTheDocument();
    expect(screen.getByText('Log In')).toBeInTheDocument();

    // Should not show authenticated links
    expect(screen.queryByText('Instructor Dashboard')).not.toBeInTheDocument();
    expect(screen.queryByText('Student List')).not.toBeInTheDocument();
    expect(screen.queryByText('Log Out')).not.toBeInTheDocument();
  });

  it('Should show authenticated navigation links when user is logged in', () => {
    const authenticatedState = {
      auth: { authenticated: 'fake-token', errorMessage: '' },
    };

    render(<Header />, { preloadedState: authenticatedState });

    expect(screen.getByText('Instructor Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Student List')).toBeInTheDocument();
    expect(screen.getByText('Add New Student')).toBeInTheDocument();
    expect(screen.getByText('Log Out')).toBeInTheDocument();

    // Should not show unauthenticated links
    expect(screen.queryByText('Register')).not.toBeInTheDocument();
    expect(screen.queryByText('Log In')).not.toBeInTheDocument();
  });

  it('Should have proper navigation link paths', () => {
    render(<Header />);

    const registerLink = screen.getByText('Register').closest('a');
    const loginLink = screen.getByText('Log In').closest('a');

    expect(registerLink).toHaveAttribute('href', '/signup');
    expect(loginLink).toHaveAttribute('href', '/signin');
  });

  it('Should have proper navigation link paths for authenticated user', () => {
    const authenticatedState = {
      auth: { authenticated: 'fake-token', errorMessage: '' },
    };

    render(<Header />, { preloadedState: authenticatedState });

    const dashboardLink = screen.getByText('Instructor Dashboard').closest('a');
    const studentsLink = screen.getByText('Student List').closest('a');
    const addStudentLink = screen.getByText('Add New Student').closest('a');
    const logoutLink = screen.getByText('Log Out').closest('a');

    expect(dashboardLink).toHaveAttribute('href', '/dashboard');
    expect(studentsLink).toHaveAttribute('href', '/students');
    expect(addStudentLink).toHaveAttribute('href', '/students/new');
    expect(logoutLink).toHaveAttribute('href', '/signout');
  });

  it('Should be responsive with stackable menu', () => {
    render(<Header />);

    const menu = screen.getByRole('navigation');
    expect(menu).toHaveClass('stackable');
  });
});
