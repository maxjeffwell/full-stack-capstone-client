import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card } from 'semantic-ui-react';
import styled from 'styled-components';

import { fetchStudents } from '../../actions';
import { deleteStudent } from '../../actions'

const StyledCard = styled(Card)`
  &&& .content {
    overflow: scroll;
  }
  &&& .content .header:not(.ui) {
    color: ${props => props.theme.blue};
    font-family: 'Roboto', 'sans-serif';
    font-size: .75em;
    font-weight: 700;
    padding: 2px;
  }
  &&& .extra {
    height: auto;
  }
  &&& .extra a:not(.ui) {
    font-size: .75em;
    font-family: 'Roboto', 'sans-serif';
    color: ${props => props.theme.green};
    font-weight: 700;
  }
`;

const StyledButton = styled.button`
    border: 2px solid ${props => props.theme.orange};
    background-color: ${props => props.theme.blue};
    border-radius: 5px;
    font-size: .85em;
    font-family: 'Roboto','sans-serif';
    color: ${props => props.theme.white};
    cursor: pointer;
`;

class Students extends Component {

    // class-based component so we can use a lifecycle method to fetch protected data from backend api anytime the Students component is shown

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
                            <Link to={`/students/${student._id}/update`}>Edit Student Information</Link>
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
        <Card.Group itemsPerRow={4}>
            {this.renderStudentData()}
        </Card.Group>
        );
    }
}

const mapStateToProps = (state) => ({
     students: state.students.students
});

export default connect(mapStateToProps)(Students);
