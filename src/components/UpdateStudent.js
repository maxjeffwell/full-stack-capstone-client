import React, {Component} from 'react';
import { Field, reduxForm, initialize } from 'redux-form';
import { Form, Icon, Button } from 'semantic-ui-react';
import { LabelInputField } from 'react-semantic-redux-form';
import axios from 'axios';

import {API_BASE_URL} from "../config";

class UpdateStudent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initialValues: null,
        }
    }

    componentDidMount() {
        let token = localStorage.getItem('jwtToken');
        let config = { headers: {'Authorization': "bearer " +   token}};

        axios.get(`${API_BASE_URL}/students/${this.props.match.params.id}`, config)
            .then(res => {
                console.log(res.data);
                this.props.dispatch(initialize('UpdatesStudent', res.data));
            });
    }

    onSubmit = formProps => {
        console.log(formProps);
        axios.put(`${API_BASE_URL}/students/${this.props.match.params.id}`, formProps)
            .then(res => {
                console.log(res);
            })
            .then(this.props.history.push('/students'));
    };

    render() {
        const {handleSubmit} = this.props;
        return (
            <Form onSubmit={handleSubmit(this.onSubmit)}>

              <Field name="fullName" component={LabelInputField}
                     label={{ content: <Icon color="green" name="student" size="large" /> }}
                     labelPosition="left"
                     placeholder="Student Name" />
                     {/*<Button>Update</Button>*/}

              <Field name="school" component={LabelInputField}
                     label={{ content: <Icon color="blue" name="university" size="large" /> }}
                     labelPosition="left"
                     placeholder="School Name" />
                     {/*<Button>Update</Button>*/}

              <Field name="teacher" component={LabelInputField}
                     label={{ content: <Icon color="orange" name="header" size="large" /> }}
                     labelPosition="left"
                     placeholder="Teacher Name" />
                     {/*<Button>Update</Button>*/}

              <Field name="gradeLevel" component={LabelInputField}
                     label={{ content: <Icon color="green" name="level up" size="large" /> }}
                     labelPosition="left"
                     placeholder="Grade Level" />
                     {/*<Button>Update</Button>*/}

              <Field name="ellStatus" component={LabelInputField}
                     label={{ content: <Icon color="blue" name="language" size="large" /> }}
                     labelPosition="left"
                     placeholder="Current ELL Status" />
                     {/*<Button>Update</Button>*/}

              <Field name="compositeLevel" component={LabelInputField}
                     label={{ content: <Icon color="orange" name="bullseye" size="large" /> }}
                     labelPosition="left"
                     placeholder="Composite Level" />
                     {/*<Button>Update</Button>*/}

              <Field name="designation" component={LabelInputField}
                     label={{ content: <Icon color="green" name="certificate" size="large" /> }}
                     labelPosition="left"
                     placeholder="Current Designation" />

                     <Button>Update</Button>

            </Form>
        );
    }
}

export default reduxForm({form: 'UpdatesStudent', fields: ['fullName', 'school', 'teacher', 'gradeLevel', 'ellStatus', 'compositeLevel', 'designation']})(UpdateStudent);



