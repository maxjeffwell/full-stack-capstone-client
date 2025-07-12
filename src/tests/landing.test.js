import React from 'react';
import { render, screen } from './test-utils';
import Landing from '../components/Landing';

describe('<Landing />', () => {
  it('Should render without crashing', () => {
    render(<Landing />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('Should display the welcome message', () => {
    render(<Landing />);
    expect(screen.getByText('Welcome to educationELLy')).toBeInTheDocument();
  });

  it('Should display the app description', () => {
    render(<Landing />);
    expect(
      screen.getByText(/mainstream classroom teachers/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/English Language Learning/i)).toBeInTheDocument();
  });

  it('Should have proper semantic HTML structure', () => {
    render(<Landing />);

    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
    expect(main).toHaveClass('landing');
  });

  it('Should be accessible with proper heading hierarchy', () => {
    render(<Landing />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Welcome to educationELLy');
  });
});
