import React from 'react';
import { render, screen } from './test-utils';
import Footer from '../components/Footer';

describe('<Footer />', () => {
  it('Should render without crashing', () => {
    render(<Footer />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('Should display copyright information', () => {
    render(<Footer />);
    expect(screen.getByText(/© \d{4}/)).toBeInTheDocument();
  });

  it('Should display developer name', () => {
    render(<Footer />);
    expect(screen.getByText(/Jeff Maxwell/i)).toBeInTheDocument();
  });

  it('Should have proper semantic HTML', () => {
    render(<Footer />);

    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveClass('footer');
  });
});
