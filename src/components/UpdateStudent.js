import React, {Component} from 'react';
import { Field, reduxForm, initialize } from 'redux-form';
import axios from 'axios';


class UpdateStudent extends Component {
    constructor() {
        super();
        this.state = {
            initialValues: null,
        }
    }

    componentDidMount() {
        console.log(this.props.match.params.id);
        axios.get(`${'https://cors-anywhere.herokuapp.com/'}/students/${this.props.match.params.id}`)
            .then(res => {
                console.log(res.data);
                this.props.dispatch(initialize('UpdatesStudent', res.data));

            })
//         console.log(this.props.match.params.id);
    }

    onSubmit = formProps => {
        console.log(formProps);
        axios.put(`${'https://cors-anywhere.herokuapp.com/'}/students/${this.props.match.params.id}`, formProps)
            .then(res => {
                console.log(res);
            })

    };

    render() {
        const {handleSubmit} = this.props;
        return (
            <form onSubmit={handleSubmit(this.onSubmit)}>
                <fieldset className="update-group">
                    <label className="update-labels">Student Name: </label>
                    <Field
                        name="fullName"
                        type="text"
                        component="input"
                        autoComplete="none"
                    />
                    <button>Update</button>
                </fieldset>
                <fieldset className="update-group">
                    <label className="update-labels">School Name: </label>
                    <Field
                        name="school"
                        type="text"
                        component="input"
                        autoComplete="none"
                    />
                    <button>Update</button>
                </fieldset>
                <fieldset className="update-group">
                    <label className="update-labels">Teacher: </label>
                    <Field
                        name="teacher"
                        type="text"
                        component="input"
                        autoComplete="none"
                    />
                    <button>Update</button>
                </fieldset>
                <fieldset className="update-group">
                    <label className="update-labels">Grade Level: </label>
                    <Field
                        name="gradeLevel"
                        type="text"
                        component="input"
                        autoComplete="none"
                    />
                    <button>Update</button>
                </fieldset>
                <fieldset className="update-group">
                    <label className="update-labels">ELL Status: </label>
                    <Field
                        name="ellStatus"
                        type="text"
                        component="input"
                        autoComplete="none"
                    />
                    <button>Update</button>
                </fieldset>
                <fieldset className="update-group">
                    <label className="update-labels">Composite Level: </label>
                    <Field
                        name="compositeLevel"
                        type="text"
                        component="input"
                        autoComplete="none"
                    />
                    <button>Update</button>
                </fieldset>
                <fieldset className="update-group">
                    <label className="update-labels">Active: </label>
                    <Field
                        name="active"
                        type="text"
                        component="input"
                        autoComplete="none"
                    />
                    <button>Update</button>
                </fieldset>
                <fieldset className="update-group">
                    <label className="update-labels">Designation: </label>
                    <Field
                        name="designation"
                        type="text"
                        component="input"
                        autoComplete="none"
                    />
                    <button>Update</button>
                </fieldset>
            </form>
        );
    }
}

export default reduxForm({form: 'UpdatesStudent', fields: ['fullName', 'school', 'teacher', 'gradeLevel', 'ellStatus', 'compositeLevel', 'active', 'designation']})(UpdateStudent);



