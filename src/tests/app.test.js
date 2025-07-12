import React from 'react';
import { render, screen } from './test-utils';
import App from '../components/App';

describe('<App />', () => {
  it('Should render without crashing', () => {
    render(<App />);
    // App component contains Header, Routes, and other components
    // Let's verify some key elements are present
    expect(document.querySelector('.ui.menu')).toBeInTheDocument(); // Header menu
  });

  it('Should render header with navigation links', () => {
    render(<App />);

    // Check for unauthenticated user links
    expect(screen.getByText('Register')).toBeInTheDocument();
    expect(screen.getByText('Log In')).toBeInTheDocument();
  });

  it('Should render the landing page by default', () => {
    render(<App />);

    // Landing page should be shown at root path
    expect(screen.getByText(/Welcome to educationELLy/i)).toBeInTheDocument();
  });

  it('Should apply global styles', () => {
    const { container } = render(<App />);

    // Check that styled-components styles are applied
    expect(container.firstChild).toHaveStyle(`
      font-family: Roboto, sans-serif
    `);
  });
});
