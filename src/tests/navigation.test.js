import React from 'react';
import { render, screen, fireEvent } from './test-utils';
import Navigation from '../components/Navigation';

describe('<Navigation />', () => {
  it('Should render without crashing', () => {
    render(<Navigation />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('Should display claptrap logo image', () => {
    render(<Navigation />);
    const logo = screen.getByAltText('students');
    expect(logo).toBeInTheDocument();
  });

  it('Should have link to students page', () => {
    render(<Navigation />);
    const link = screen.getByRole('button', { name: /students/i });
    expect(link).toHaveAttribute('href', '/students');
  });

  it('Should toggle sidebar when clicked', () => {
    const { store } = render(<Navigation />);

    const navIcon = screen.getByAltText('students').parentElement.parentElement;
    fireEvent.click(navIcon);

    // Check that toggleSidebar action was dispatched
    const state = store.getState();
    expect(state.isSidebarToggled).toBe(true);
  });
});
