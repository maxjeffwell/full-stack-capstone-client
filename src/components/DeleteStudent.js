import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Modal from './Modal';
import history from '../history';
import { fetchStudent, deleteStudent } from '../actions';

class StudentDelete extends Component {
  componentDidMount() {
    this.props.fetchStudent(this.props.match.params.id);
  }

  renderActions() {
    const { id } = this.props.match.params;

    return (
      <Fragment>
        <button
          onClick={() => this.deleteStudent(id)}
          className="ui button negative"
        >
          Delete Student
        </button>
        <Link to={this.props.match.params.id} className="ui button">
          Cancel
        </Link>
      </Fragment>
    );
  }

  renderContent() {
    if (!this.props.student) {
      return `Are you sure you want to delete this student?`;
    }

    return `Are you sure you want to delete this student: {
      this.props.student.id}?`;
  }

  render() {
    return (
      <Modal
        title="Delete Student"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push('/students')}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { student: state.students[ownProps.match.params.id],
  };
};

export default connect(
  mapStateToProps,
  { fetchStudent, deleteStudent }
)(StudentDelete);
