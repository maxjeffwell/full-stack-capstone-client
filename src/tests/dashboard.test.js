import React from 'react';
import { render, screen } from './test-utils';
import Dashboard from '../components/Dashboard';

// Mock authRequired HOC to bypass authentication
jest.mock('../components/authRequired', () => Component => Component);

describe('<Dashboard />', () => {
  it('Should render without crashing', () => {
    render(<Dashboard />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('Should render Navigation component', () => {
    render(<Dashboard />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('Should apply toggled class when sidebar is toggled', () => {
    const toggledState = {
      isSidebarToggled: true,
    };

    render(<Dashboard />, {
      preloadedState: toggledState,
    });
    const grid = screen.getByTestId('dashboard-grid');
    expect(grid).toHaveClass('toggled');
  });

  it('Should not have toggled class when sidebar is not toggled', () => {
    render(<Dashboard />);
    const grid = screen.getByTestId('dashboard-grid');
    expect(grid).not.toHaveClass('toggled');
  });

  it('Should have proper grid layout', () => {
    render(<Dashboard />);
    const grid = screen.getByTestId('dashboard-grid');

    expect(grid).toHaveClass('centered');
    expect(grid).toHaveStyle({ height: '100%' });
  });
});
