import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card } from 'semantic-ui-react';
import styled from 'styled-components';

import { fetchStudents } from '../../actions';
import { deleteStudent } from '../../actions';

const StyledCard = styled(Card)`
  &&& .content {
    overflow: auto;
  }
  &&& .content .header:not(.ui) {
    color: ${props => props.theme.blue};
    font-family: 'Roboto', 'sans-serif';
    font-size: .75em;
    font-weight: 600;
  }
  &&& .extra {
    height: auto;
    overflow: hidden;
  }
 `;

const StyledButton = styled.button`
    border: 2.5px solid ${props => props.theme.orange};
    background-color: ${props => props.theme.green};
    border-radius: 5px;
    font-family: 'Roboto','sans-serif';
    font-size: 1em;
    font-weight: 500;
    color: ${props => props.theme.blue};
    cursor: pointer;
    margin-right: 10px;
    white-space: nowrap;
     &:hover:not([disabled]) {
      box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
      }
`;

class Students extends Component {

  componentDidMount() {
    this.props.dispatch(fetchStudents());
  }

    renderStudentData() {
        return this.props.students.map(student => {
            return (
                  <StyledCard className="student-card" key={student._id}>
                      <Card.Content>
                          <Card.Header>Student: {student.fullName}</Card.Header>
                          <Card.Header>School: {student.school}</Card.Header>
                          <Card.Header>Teacher: {student.teacher}</Card.Header>
                          <Card.Header>Grade: {student.gradeLevel}</Card.Header>
                          <Card.Header>ELL Status: {student.ellStatus}</Card.Header>
                          <Card.Header>Composite Level: {student.compositeLevel}</Card.Header>
                          <Card.Header>Designation: {student.designation}</Card.Header>
                          <Card.Header>Native Language: {student.nativeLanguage}</Card.Header>
                          <Card.Header>Country of Birth: {student.countryOfBirth}</Card.Header>
                      </Card.Content>
                      <Card.Content extra>
                        <Link to={`/students/${student._id}/update`}>
                          <StyledButton>
                          Edit Student
                        </StyledButton>
                        </Link>
                        <StyledButton onClick={() => this.props.dispatch(deleteStudent(student._id))}>
                          Delete Student
                        </StyledButton>
                      </Card.Content>
                  </StyledCard>
            );
        });
    }

    render() {
        return (
        <Card.Group stackable={true} itemsPerRow={4}>
            {this.renderStudentData()}
        </Card.Group>
        );
    }
}

const mapStateToProps = state => ({
     students: state.students.students
});

export default connect(mapStateToProps)(Students);
