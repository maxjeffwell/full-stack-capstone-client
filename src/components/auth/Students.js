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
            <div className="student-card" key={student._id}>
                <table>
                    <tr>
                        <th>Name: </th>
                            <td>{student.fullName}</td>
                    </tr>
                    <tr>
                        <th>School: </th>
                        <td>{student.school}</td>
                    </tr>
                    <tr>
                        <th>Country of Birth: </th>
                        <td>{student.countryOfBirth}</td>
                    </tr>
                        {/*{student.nativeLanguage}*/}
                    {/*{student.ellStatus}*/}
                    {/*{student.gradeLevel}*/}
                </table>
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
