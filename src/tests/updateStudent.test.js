import React from 'react';
import { render, screen, waitFor } from './test-utils';
import UpdateStudent from '../components/UpdateStudent';
const mockStudent = {
  id: '123',
  fullName: 'John Doe',
  school: 'Lincoln Elementary',
  teacher: 'Ms. Smith',
  gradeLevel: '3rd',
  ellStatus: 'Level 2',
  compositeLevel: '3.5',
  designation: 'IEP',
};

// Mock useParams
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: '123' }),
  useNavigate: () => jest.fn(),
}));

// Mock authRequired HOC to bypass authentication
jest.mock('../components/authRequired', () => Component => Component);

describe('<UpdateStudent />', () => {
  it('Should render without crashing', () => {
    const preloadedState = {
      students: {
        ids: ['123'],
        entities: {
          123: mockStudent,
        },
        loading: false,
        error: null,
      },
    };

    render(<UpdateStudent />, { preloadedState });
    expect(
      screen.getByRole('button', { name: /save student/i })
    ).toBeInTheDocument();
  });

  it('Should display all form fields', () => {
    const preloadedState = {
      students: {
        ids: ['123'],
        entities: {
          123: mockStudent,
        },
        loading: false,
        error: null,
      },
    };

    render(<UpdateStudent />, { preloadedState });

    expect(
      screen.getByPlaceholderText('enter full student name')
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('enter school')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('enter teacher')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('enter grade level')
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('enter ELL Status')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('enter composite level (overall)')
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/designation/i)).toBeInTheDocument();
  });

  it('Should display delete button', () => {
    const preloadedState = {
      students: {
        ids: ['123'],
        entities: {
          123: mockStudent,
        },
        loading: false,
        error: null,
      },
    };

    render(<UpdateStudent />, { preloadedState });
    expect(screen.getByText('DELETE')).toBeInTheDocument();
  });

  it('Should load and display student data when available', async () => {
    const preloadedState = {
      students: {
        ids: ['123'],
        entities: {
          123: mockStudent,
        },
        loading: false,
        error: null,
      },
    };

    render(<UpdateStudent />, { preloadedState });

    await waitFor(() => {
      expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(
        screen.getByDisplayValue('Lincoln Elementary')
      ).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByDisplayValue('Ms. Smith')).toBeInTheDocument();
    });
  });
});
