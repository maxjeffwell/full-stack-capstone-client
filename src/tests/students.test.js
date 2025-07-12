import React from 'react';
import { render, screen } from './test-utils';
import Students from '../components/auth/Students';

const mockStudents = [
  {
    id: '1',
    fullName: 'John Doe',
    school: 'Lincoln Elementary',
    teacher: 'Ms. Smith',
    gradeLevel: '3rd',
    ellStatus: 'Level 2',
    compositeLevel: '3.5',
    designation: 'IEP',
  },
  {
    id: '2',
    fullName: 'Jane Smith',
    school: 'Washington Middle',
    teacher: 'Mr. Johnson',
    gradeLevel: '6th',
    ellStatus: 'Level 4',
    compositeLevel: '4.2',
    designation: '504 Plan',
  },
];

describe('<Students />', () => {
  it('Should render without crashing', () => {
    render(<Students />);
    expect(screen.getByText(/Student List/i)).toBeInTheDocument();
  });

  it('Should show loading state initially', () => {
    render(<Students />);
    expect(screen.getByText('Loading students...')).toBeInTheDocument();
  });

  it('Should render with preloaded student data', () => {
    const preloadedState = {
      students: {
        ids: ['1', '2'],
        entities: {
          1: mockStudents[0],
          2: mockStudents[1],
        },
        loading: false,
        error: null,
      },
    };

    render(<Students />, { preloadedState });

    expect(screen.getByText('Student Name: John Doe')).toBeInTheDocument();
    expect(screen.getByText('Student Name: Jane Smith')).toBeInTheDocument();
  });

  it('Should display student information when data is available', () => {
    const preloadedState = {
      students: {
        ids: ['1'],
        entities: {
          1: mockStudents[0],
        },
        loading: false,
        error: null,
      },
    };

    render(<Students />, { preloadedState });

    expect(screen.getByText('School: Lincoln Elementary')).toBeInTheDocument();
    expect(screen.getByText('Teacher: Ms. Smith')).toBeInTheDocument();
    expect(screen.getByText('Grade: 3rd')).toBeInTheDocument();
    expect(screen.getByText('ELL Status: Level 2')).toBeInTheDocument();
  });

  it('Should show no students message when list is empty', () => {
    const preloadedState = {
      students: {
        ids: [],
        entities: {},
        loading: false,
        error: null,
      },
    };

    render(<Students />, { preloadedState });
    expect(screen.getByText('No students found.')).toBeInTheDocument();
  });

  it('Should display update links for students', () => {
    const preloadedState = {
      students: {
        ids: ['1', '2'],
        entities: {
          1: mockStudents[0],
          2: mockStudents[1],
        },
        loading: false,
        error: null,
      },
    };

    render(<Students />, { preloadedState });

    const updateLinks = screen.getAllByText('Update Student');
    expect(updateLinks).toHaveLength(2);
    expect(updateLinks[0].closest('a')).toHaveAttribute(
      'href',
      '/students/1/update'
    );
    expect(updateLinks[1].closest('a')).toHaveAttribute(
      'href',
      '/students/2/update'
    );
  });
});
