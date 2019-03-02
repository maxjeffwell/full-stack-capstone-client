import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux'

import { Link } from 'react-router-dom';
import { Card } from 'semantic-ui-react';
import styled from 'styled-components';

import { deleteStudent, fetchStudents, showModal, hideModal } from '../../actions';

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
  }
 `;

const StyledButton = styled.button`
    border: 2px solid ${props => props.theme.orange};
    background-color: ${props => props.theme.green};
    alignment: left;
    justify-content: space-around;
    padding: 0 5px;
    border-radius: 5px;
    margin-right: 25px;
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
  constructor(props) {
    super(props);

    this.openDeleteModal = this.openDeleteModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.showModal = this.showModal.bind(this);
    this.deleteStudent = this.deleteStudent.bind(this);
  }

  componentDidMount() {
    this.props.fetchStudents();
  }

  closeModal(event) {
    this.props.hideModal();
  }

  showModal(event) {
    this.props.showModal();
  }

  deleteStudent() {
    this.props.deleteStudent().then(this.props.hideModal());
  }

  openDeleteModal(event) {
    this.props.showModal({
      open: true,
      title: 'Delete Modal',
      message: 'Please confirm the deletion of this student',
      deleteAction: this.deleteStudent,
      closeModal: this.closeModal,
      deleteText: 'delete'
    }, 'delete')
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
                        <button
                          className="btn btn-outline-primary btn-block"
                          onClick={(event) => this.openDeleteModal(event)}>
                          Delete Student
                        </button>
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

const mapDispatchToProps = dispatch => ({
  hideModal: () => dispatch(hideModal()),
  showModal: (modalProps, modalType) => {
    dispatch(showModal({ modalProps, modalType }))
  },
  fetchStudents: () => dispatch(fetchStudents()),
  deleteStudent: () => dispatch(deleteStudent()),
});

const mapStateToProps = state => ({
     students: state.students.students,
});

export default compose (
  connect(mapStateToProps, mapDispatchToProps))(Students);
