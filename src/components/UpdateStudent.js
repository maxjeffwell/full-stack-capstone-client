import React, {Component} from 'react';
import { Field, reduxForm, initialize } from 'redux-form';
import { Form, Icon, Button } from 'semantic-ui-react';
import { LabelInputField } from 'react-semantic-redux-form';
import axios from 'axios';
import styled from 'styled-components';

import {API_BASE_URL} from "../config";

const StyledForm = styled(Form)`
  &&& .ui.labeled.input:not([class*="corner labeled"]) 
  .label:first-child+input {
    font-family: 'Roboto', 'sans-serif';
    font-size: 2em;
    font-weight: 700;
    color: ${props => props.theme.blue};
    padding: 5px 5px 5px 10px;
    background-color: ${props => props.theme.white};
    border-top: 2px solid ${props => props.theme.green};
    border-right: 2px solid ${props => props.theme.green};
    border-bottom: 2px solid ${props => props.theme.green};
  }
  &&& .ui.label {
    border: 2px solid ${props => props.theme.orange};
    border-radius: 5px;
    width: 50px;
    text-align: center;
  }
  &&& .ui.button {
    font-family: 'Roboto', 'sans-serif';
    font-size: 2em;
    color: ${props => props.theme.white};
    background-color: ${props => props.theme.blue}; 
    border: 2px solid ${props => props.theme.orange};
    border-radius: 5px;
    padding: 10px;
  }
`;

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
            <StyledForm onSubmit={handleSubmit(this.onSubmit)}>

              <Field name="fullName" component={LabelInputField}
                     label={{ content: <Icon color="green" name="student" size="large" /> }}
                     labelPosition="left"
                     placeholder="Student Name" />

              <Field name="school" component={LabelInputField}
                     label={{ content: <Icon color="blue" name="university" size="large" /> }}
                     labelPosition="left"
                     placeholder="School Name" />

              <Field name="teacher" component={LabelInputField}
                     label={{ content: <Icon color="orange" name="header" size="large" /> }}
                     labelPosition="left"
                     placeholder="Teacher Name" />

              <Field name="gradeLevel" component={LabelInputField}
                     label={{ content: <Icon color="green" name="level up" size="large" /> }}
                     labelPosition="left"
                     placeholder="Grade Level" />

              <Field name="ellStatus" component={LabelInputField}
                     label={{ content: <Icon color="blue" name="language" size="large" /> }}
                     labelPosition="left"
                     placeholder="Current ELL Status" />

              <Field name="compositeLevel" component={LabelInputField}
                     label={{ content: <Icon color="orange" name="bullseye" size="large" /> }}
                     labelPosition="left"
                     placeholder="Composite Level" />

              <Field name="designation" component={LabelInputField}
                     label={{ content: <Icon color="green" name="certificate" size="large" /> }}
                     labelPosition="left"
                     placeholder="Current Designation" />

                     <Button>Update</Button>

            </StyledForm>
        );
    }
}

export default reduxForm({form: 'UpdatesStudent', fields: ['fullName', 'school', 'teacher', 'gradeLevel', 'ellStatus', 'compositeLevel', 'designation']})(UpdateStudent);



