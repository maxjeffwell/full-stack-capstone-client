import React, { Component  } from 'react';
import { Field, reduxForm, initialize, focus } from 'redux-form';
import { Grid, Form, Icon, Button } from 'semantic-ui-react';
import { LabelInputField } from 'react-semantic-redux-form';
import axios from 'axios';
import styled from 'styled-components';

import {API_BASE_URL} from '../config';
import { required } from '../validators';
import DeleteStudent from './DeleteStudent';

export const StyledForm = styled(Form)`
 &&& form.ui.form {
    display: grid;
    min-width: 372px;
    padding-bottom: 0;
    align-items: flex-start;
  }
  &&& div.field {
    text-align: center;
  }
  &&& .icon {
    size: 100px;
  }
  }
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
    margin-right: auto;
  }
  &&& .ui.label {
    border: 2px solid ${props => props.theme.orange};
    border-radius: 5px;
    width: 50px;
    text-align: center;
  }
  &&& .ui.red {
    color: red;
    font-family: 'Roboto','sans-serif';
    font-size: 1.5em;
    font-weight: bold;
    border: none;
    display: inline;
  }
  &&& .ui.button {
    font-family: 'Roboto', 'sans-serif';
    font-size: 28px;
    color: ${props => props.theme.white};
    background-color: ${props => props.theme.blue}; 
    border: 2px solid ${props => props.theme.orange};
    border-radius: 5px;
    padding: 10px;
     &:hover:not([disabled]) {
      box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
    }
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
        this.props.dispatch(initialize('UpdatesStudent', res.data));
      });
  }

  onSubmit = formProps => {
    axios.put(`${API_BASE_URL}/students/${this.props.match.params.id}`, formProps)
      .then(() => this.props.history.push('/students'));
  };

  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    return <Grid textAlign="center"
                 style={{width: 'auto'}}>
      <Grid.Row centered columns={1}>
        <StyledForm onSubmit={handleSubmit(this.onSubmit)}>

          <Field name="fullName" component={LabelInputField}
                 label={{content: <Icon color="green" name="student" size="large"/>}}
                 labelPosition="left"
                 placeholder="Student Name"
                 validate={required}
          />

          <Field name="school" component={LabelInputField}
                 label={{content: <Icon color="blue" name="university" size="large"/>}}
                 labelPosition="left"
                 placeholder="School Name"
          />

          <Field name="teacher" component={LabelInputField}
                 label={{content: <Icon color="orange" name="header" size="large"/>}}
                 labelPosition="left"
                 placeholder="Teacher Name"
          />

          <Field name="gradeLevel" component={LabelInputField}
                 label={{content: <Icon color="green" name="level up" size="large"/>}}
                 labelPosition="left"
                 placeholder="Grade Level"
          />

          <Field name="ellStatus" component={LabelInputField}
                 label={{content: <Icon color="blue" name="language" size="large"/>}}
                 labelPosition="left"
                 placeholder="Current ELL Status"
          />

          <Field name="compositeLevel" component={LabelInputField}
                 label={{content: <Icon color="orange" name="bullseye" size="large"/>}}
                 labelPosition="left"
                 placeholder="Composite Level"
          />

          <Field name="designation" component={LabelInputField}
                 label={{content: <Icon color="green" name="certificate" size="large"/>}}
                 labelPosition="left"
                 placeholder="Current Designation"
          />

          <Form.Field control={Button} primary
                      style={{whiteSpace: "noWrap"}}
                      type="submit"
                      disabled={pristine || submitting}>
            Update Student
          </Form.Field>
        </StyledForm>
      </Grid.Row>
      <Grid.Row centered columns={1} style={{paddingTop: '5px', paddingBottom: '0'}}>
        <DeleteStudent />
      </Grid.Row>
      </Grid>
  }
}

export default reduxForm({form: 'UpdatesStudent',
  fields: ['fullName', 'school', 'teacher', 'gradeLevel', 'ellStatus', 'compositeLevel', 'designation'],
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus('UpdatesStudent', Object.keys(errors)[0]))
})(UpdateStudent);



