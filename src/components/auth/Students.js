import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import { Card } from 'semantic-ui-react';
import styled from 'styled-components';

import { fetchStudents } from '../../actions';
import { bindActionCreators } from 'redux';

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
    color: ${props => props.theme.blue};
    cursor: pointer;
    white-space: nowrap;
   &:hover:not([disabled]) {
      box-shadow: inset 6.5em 0 0 0 var(--hover);
      background-color: ${props => props.theme.blue};
      color: ${props => props.theme.white};
    }
  }
`;

class Students extends Component {

  componentDidMount() {
      this.props.fetchStudents();
  }

  renderStudentData() {
      return this.props.students.map(student => {
        return (
          <Fragment key={student._id}>
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
            </Card.Content>
          </StyledCard>
          </Fragment>
        );
      });
    }

    render()
    {
      return (
        <Card.Group stackable={true} itemsPerRow={4}>
          {this.renderStudentData()}
        </Card.Group>
      );
    }
  }

function mapDispatchToProps(dispatch) {
  return {
    fetchStudents: bindActionCreators(fetchStudents, dispatch)
  }};

function mapStateToProps(state) {
     return {
       students: state.students.students
     }
};

export default connect(mapStateToProps, mapDispatchToProps)(Students);
