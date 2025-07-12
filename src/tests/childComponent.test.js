import React from 'react';
import { render, screen } from './test-utils';
import authRequired from '../components/authRequired';

// Create a test component to wrap with authRequired HOC
const TestComponent = () => <div>Protected Content</div>;
const ProtectedComponent = authRequired(TestComponent);

describe('authRequired HOC', () => {
  it('Should redirect to signin when not authenticated', () => {
    const mockNavigate = jest.fn();
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => mockNavigate,
    }));

    render(<ProtectedComponent />, {
      preloadedState: {
        auth: { authenticated: false },
      },
    });

    // Component should not render content when not authenticated
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });

  it('Should render wrapped component when authenticated', () => {
    render(<ProtectedComponent />, {
      preloadedState: {
        auth: { authenticated: true },
      },
    });

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('Should pass props to wrapped component', () => {
    const TestComponentWithProps = ({ message }) => <div>{message}</div>;
    const ProtectedComponentWithProps = authRequired(TestComponentWithProps);

    render(<ProtectedComponentWithProps message="Hello World" />, {
      preloadedState: {
        auth: { authenticated: true },
      },
    });

    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });
});
