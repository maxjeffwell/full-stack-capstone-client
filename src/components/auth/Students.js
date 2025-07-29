import React, { useEffect, memo, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Header } from 'semantic-ui-react';
import styled from 'styled-components';

import {
  fetchStudents,
  selectAllStudents,
  selectStudentsLoading,
} from '../../store/slices/studentsSlice';
import LoadingSpinner from '../LoadingSpinner';

const StyledCard = styled(Card)`
  &&& .ui.card.student-card {
    min-width: 250px;
  }
  &&& .content {
    overflow: auto;
    padding: 15px !important;
  }
  &&& .content .header:not(.ui) {
    color: ${props => props.theme.blue};
    font-family: 'Roboto', 'sans-serif';
    font-size: 0.75em;
    font-weight: 600;
    line-height: 1.25em;
    margin-bottom: 5px;
  }
  &&& .extra {
    height: auto;
    width: auto;
    padding: 15px !important;
    justify-content: space-between;
    overflow: hidden;
    display: table;
    text-align: center;
    border-top: none;
  }
`;

const StyledButton = styled.button`
  border: 2px solid ${props => props.theme.orange};
  background-color: ${props => props.theme.green};
  alignment: left;
  justify-content: space-around;
  padding: 0 5px;
  border-radius: 5px;
  font-family: 'Roboto', 'sans-serif';
  font-size: 1em;
  font-weight: 500;
  margin-bottom: 2px;
  margin-top: 2px;
  color: ${props => props.theme.white};
  a {
    color: ${props => props.theme.white};
    &:hover {
      color: ${props => props.theme.orange};
    }
  }
  &:hover:not([disabled]) {
    box-shadow:
      0 12px 16px 0 rgba(0, 0, 0, 0.24),
      0 17px 50px 0 rgba(0, 0, 0, 0.19);
  }
`;

// Memoized StudentCard component to prevent unnecessary re-renders
const StudentCard = memo(({ student }) => {
  const studentId = student.id || student._id;

  return (
    <StyledCard className="student-card">
      <Card.Content>
        <Card.Header>Student Name: {student.fullName}</Card.Header>
        <Card.Description>
          School: {student.school}
          <br />
          Teacher: {student.teacher}
          <br />
          Grade: {student.gradeLevel}
          <br />
          ELL Status: {student.ellStatus}
          <br />
          WIDA ACCESS Overall Composite: {student.compositeLevel}
          <br />
          IEP | 504 | Intervention Plan: {student.designation}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Link to={`/students/${studentId}/update`}>
          <StyledButton>Update Student</StyledButton>
        </Link>
      </Card.Content>
    </StyledCard>
  );
});

StudentCard.displayName = 'StudentCard';

const Students = memo(() => {
  const dispatch = useDispatch();
  const students = useSelector(selectAllStudents);
  const loading = useSelector(selectStudentsLoading);
  const error = useSelector(state => state.students.error);

  useEffect(() => {
    dispatch(fetchStudents())
      .unwrap()
      .then(() => {
        // Students fetched successfully
      })
      .catch(err => {
        console.error('Failed to fetch students:', err);
        // If authentication failed, provide option to re-login
        if (err === 'Not authenticated') {
          // Authentication failed - token may be expired
        }
      });
  }, [dispatch]);

  // Memoize the students list to prevent recalculation on every render
  const studentsList = useMemo(() => {
    if (!students || students.length === 0) {
      return [];
    }
    return students;
  }, [students]);

  // Memoize the rendered student cards
  const renderedStudents = useMemo(() => {
    return studentsList.map(student => {
      const studentId = student.id || student._id;
      return <StudentCard key={studentId} student={student} />;
    });
  }, [studentsList]);

  if (loading) {
    return <LoadingSpinner message="Loading students..." />;
  }

  if (error) {
    const isAuthError =
      error === 'Not authenticated' ||
      error === 'No authentication token found';

    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <Header as="h3" color="red">
          Error Loading Students
        </Header>
        <p>{error}</p>
        {isAuthError ? (
          <>
            <p>Your session may have expired. Please sign in again.</p>
            <Link to="/signin">
              <StyledButton>Sign In</StyledButton>
            </Link>
          </>
        ) : (
          <StyledButton onClick={() => dispatch(fetchStudents())}>
            Retry
          </StyledButton>
        )}
      </div>
    );
  }

  if (studentsList.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <Header as="h3">No students found.</Header>
        <p>Add your first student to get started!</p>
        <Link to="/students/new">
          <StyledButton>Add New Student</StyledButton>
        </Link>
      </div>
    );
  }

  return (
    <div style={{ paddingBottom: '100px' }}>
      <Header as="h3">Student List ({studentsList.length} students)</Header>
      <p>
        This Student List contains the most current information about each
        student.
      </p>
      <Card.Group itemsPerRow={3} stackable>
        {renderedStudents}
      </Card.Group>
    </div>
  );
});

Students.displayName = 'Students';

export default Students;
