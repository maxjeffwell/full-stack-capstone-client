import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card } from 'semantic-ui-react';
import styled from 'styled-components';

import { fetchStudents } from '../../store/actions';
import { selectAllStudents, selectStudentsLoading } from '../../store/slices/studentsSlice';

const StyledCard = styled(Card)`
  &&& .ui.card.student-card {
  min-width: 250px;
  }
  &&& .content {
    overflow: auto;
    padding-left: 5px;
    padding-right: 5px;
  }
  &&& .content .header:not(.ui) {
    color: ${props => props.theme.blue};
    font-family: 'Roboto', 'sans-serif';
    font-size: .75em;
    font-weight: 600;
    line-height: 1.25em;
    margin-bottom: 5px;
  }
  &&& .extra {
    height: auto;
    width: auto;
    padding-left: 5px;
    padding-right: 5px;
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
    font-family: 'Roboto','sans-serif';
    font-size: 1em;
    font-weight: 500;
    margin-bottom: 2px;
    margin-top: 2px;
    color: ${props => props.theme.white};
  a {
    color: ${props => props.theme.white};
    &:hover{
      color: ${props => props.theme.orange};
    }
  }
    &:hover:not([disabled]) {
      box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
    }
`;

const Students = () => {
  const dispatch = useDispatch();
  const students = useSelector(selectAllStudents);
  const loading = useSelector(selectStudentsLoading);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const renderStudentsList = () => {
    if (loading) {
      return <div>Loading students...</div>;
    }

    if (!students || students.length === 0) {
      return <div>No students found.</div>;
    }

    return students.map(student => {
      const studentId = student.id || student._id;
      
      return (
        <StyledCard key={studentId} className="student-card">
          <Card.Content>
            <Card.Header>
              Student Name: {student.fullName}
            </Card.Header>
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
  };

  return (
    <>
      <h3>This Student List contains the most current information about each student.</h3>
      <Card.Group>
        {renderStudentsList()}
      </Card.Group>
    </>
  );
};

export default Students;