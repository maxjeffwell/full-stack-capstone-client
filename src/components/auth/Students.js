import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect';
import { Link } from 'react-router-dom';
import { Card } from 'semantic-ui-react';

import { fetchStudents } from '../../actions';

class Students extends Component {

    // class-based component so we can use a lifecycle method to fetch protected data from backend api anytime the Students component is shown

    componentDidMount() {
        this.props.dispatch(fetchStudents());
    }

    renderStudentData() {
        return this.props.students.map(student => {
            return (
                  <Card className="student-card" key={student._id}>
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
                      </Card.Content>
                  </Card>
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

function mapStateToProps(state) {
    return { students: state.students.students };
}

export default connect(mapStateToProps)(Students);
