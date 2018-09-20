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
        axios.get(`http://localhost:8080/students/${this.props.match.params.id}`)
            .then(res => {
                console.log(res.data);
                this.props.dispatch(initialize('UpdatesStudent', res.data));

            })
        console.log(this.props.match.params.id);
    }

    onSubmit = formProps => {
        console.log(formProps);
        axios.put(`http://localhost:8080/students/${this.props.match.params.id}`, formProps)
            .then(res => {
                console.log(res);
            })

    };

    render() {
        const {handleSubmit} = this.props;
        return (
            <form onSubmit={handleSubmit(this.onSubmit)}>
                <fieldset>
                    <label>Student Name</label>
                    <Field
                        name="fullName"
                        type="text"
                        component="input"
                        autoComplete="none"
                    />
                    <button>Update</button>
                </fieldset>
                <fieldset>
                    <label>School Name</label>
                    <Field
                        name="school"
                        type="text"
                        component="input"
                        autoComplete="none"
                    />
                    <button>Update</button>
                </fieldset>
                <fieldset>
                    <label>Teacher</label>
                    <Field
                        name="teacher"
                        type="text"
                        component="input"
                        autoComplete="none"
                    />
                    <button>Update</button>
                </fieldset>
                <fieldset>
                    <label>Grade Level</label>
                    <Field
                        name="gradeLevel"
                        type="text"
                        component="input"
                        autoComplete="none"
                    />
                    <button>Update</button>
                </fieldset>
                <fieldset>
                    <label>ELL Status</label>
                    <Field
                        name="ellStatus"
                        type="text"
                        component="input"
                        autoComplete="none"
                    />
                    <button>Update</button>
                </fieldset>
                <fieldset>
                    <label>Composite Level</label>
                    <Field
                        name="compositeLevel"
                        type="text"
                        component="input"
                        autoComplete="none"
                    />
                    <button>Update</button>
                </fieldset>
                <fieldset>
                    <label>Active</label>
                    <Field
                        name="active"
                        type="text"
                        component="input"
                        autoComplete="none"
                    />
                    <button>Update</button>
                </fieldset>
                <fieldset>
                    <label>Designation</label>
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

export default reduxForm({form: 'UpdatesStudent'})(UpdateStudent);


