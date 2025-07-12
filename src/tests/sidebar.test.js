import React from 'react';
import { render, screen } from './test-utils';
import Sidebar from '../components/Sidebar';

describe('<Sidebar />', () => {
  it('Should render without crashing', () => {
    render(<Sidebar />);
    const sidebar = document.querySelector('.ui.sidebar');
    expect(sidebar).toBeInTheDocument();
  });

  it('Should be visible when toggled', () => {
    const toggledState = {
      isSidebarToggled: true,
    };

    render(<Sidebar />, { preloadedState: toggledState });
    const sidebar = screen.getByTestId('sidebar');
    expect(sidebar).toHaveClass('visible');
  });

  it('Should not be visible when not toggled', () => {
    render(<Sidebar />);
    const sidebar = screen.getByTestId('sidebar');
    expect(sidebar).not.toHaveClass('visible');
  });

  it('Should contain navigation menu items', () => {
    render(<Sidebar />);

    // Check for menu items (assuming sidebar has navigation links)
    const sidebar = document.querySelector('.ui.sidebar');
    expect(sidebar.querySelector('.menu')).toBeInTheDocument();
  });
});
