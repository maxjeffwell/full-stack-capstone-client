import React, { Component } from 'react';
import { fetchStudents } from "../../actions";
import connect from "react-redux/es/connect/connect";
import { Link } from 'react-router-dom';

class Students extends Component { // class-based component because we'll use a lifecycle method to fetch protected data from backend api anytime the feature component is shown
    componentDidMount() {
        this.props.dispatch(fetchStudents());
        console.log(this.props.students);
    }

    renderStudentData() {
        return this.props.students.map(student => {
            return (
            <div key={student._id}>
                    <span>{student.fullName}</span>
                    <p>
                        {student.body}
                    </p>
                    <p className="right">
                        {student.school}
                    </p>
                    <p className="left">
                        {student.countryOfBirth}
                    </p>
                    <span>{student.nativeLanguage}</span>
                    <span>{student.ellStatus}</span>
                    <span>{student.gradeLevel}</span>
                <Link to={`/students/${student._id}/update`}>Edit</Link>
            </div>
                );
        });
    }

    render() {
    return (
        <div>
            {this.renderStudentData()}
        </div>
        );
    }
}


function mapStateToProps({students}) {
    return { students };
}

export default connect(mapStateToProps)(Students);
