import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { Field, reduxForm, focus } from 'redux-form';
import {Form, Icon, Button, Grid} from 'semantic-ui-react';
import { LabelInputField } from 'react-semantic-redux-form';
import axios from 'axios';

import { API_BASE_URL } from '../config';
import { required, nonEmpty } from '../validators';
import { StyledForm } from './UpdateStudent';

class CreateStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialValues: null,
    }
  }
  onSubmit = formProps => {
      axios.post(`${API_BASE_URL}/students`, formProps)
        .then(() => this.props.history.push('/students'));
    };

    render() {
      const { handleSubmit, pristine, submitting } = this.props;
      return  <Grid textAlign="center"
                    style={{marginLeft: '1.5em', width: 'auto',
                      justifyContent: 'inherit', alignItems: 'stretch',
                      paddingTop: '0px'}}>
        <Grid.Row centered columns={1}>
      <StyledForm onSubmit={handleSubmit(this.onSubmit)}>

        <Field name="fullName" component={LabelInputField}
               label={{content: <Icon color="green" name="student" size="large"/>}}
               labelPosition="left"
               placeholder="Student Name"
               validate={[required, nonEmpty]}
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
               validate={[required, nonEmpty]}
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
               validate={[required, nonEmpty]}
        />

        <Form.Field control={Button} primary
                    type="submit"
                    style={{marginBottom: '25px'}}
                    disabled={pristine || submitting}>
          Create Student
        </Form.Field>
      </StyledForm>
        </Grid.Row>
      </Grid>
    }
}

export default compose(
  reduxForm({form: 'CreateStudent',
    fields: ['fullName', 'school', 'teacher', 'gradeLevel', 'ellStatus', 'compositeLevel', 'designation'],
    onSubmitFail: (errors, dispatch) => dispatch(focus('CreateStudent', Object.keys(errors)[0]))
  })(withRouter(CreateStudent)));

