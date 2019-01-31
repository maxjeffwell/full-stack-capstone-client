import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form'; // add reduxForm to component export statement and tell it about different field names, then use the field component inside of the component itself

import { Form, Icon, Button, Grid, Segment } from 'semantic-ui-react';
import { LabelInputField } from 'react-semantic-redux-form';

import { compose } from 'redux'; // write out multiple higher order components in a better formatted way
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signin extends Component {
    onSubmit = (formProps) => { // arrow function makes it so we don't have to worry about binding the context of onSubmit

      this.props.signin(formProps, () => {
            this.props.history.push('/dashboard');
        }); // call the signup action creator

      // when we use reduxForm we get a function on our props object called handleSubmit. Use this function to         // take email and password out of the form and provide it to the onSubmit callback
    };

    render() {
        const { handleSubmit } = this.props;

        // can't just add onSubmit as a callback directly to form tag. we have to destructure handleSubmit              // function from our props object

      return (
          <Grid centered columns={2}>
          <Grid.Column>
            <Segment>
          <Form onSubmit={handleSubmit(this.onSubmit)}>

            {/* now we can add an onSubmit and call handleSubmit and to handleSubmit we'll pass the callback we want to be executed when user submits the form, which is the onSubmit method we just created. we don't call onSubmit as soon as we render the form, however. onSubmit will be called in the future. we pass a reference to the onSubmit function to handleSubmit.*/}

            <Field name="email" component={LabelInputField}
                       label={{ content: <Icon color="orange" name="user" size="large" /> }}
                       labelPosition="left" placeholder="Email" />

                       <Field name="password" component={LabelInputField} type="password"
                              label={{ content: <Icon color="orange" name="lock" size="large" /> }}
                              labelPosition="left" placeholder="Password" />

                              <Form.Field control={Button} primary
                                          type="submit">
                                Login
                              </Form.Field>

                <div className="error">
                    {this.props.errorMessage}
                </div>
            </Form>
            </Segment>
          </Grid.Column>
          </Grid>
        );
    }
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.errorMessage };
}

export default compose (

  // compose allows us to apply multiple HOC's in series to a single component (Signin in this case) in an easier  // to read way

  connect(mapStateToProps, actions), //apply action creators to Register component
  reduxForm({ form: 'signin'})
)(Signin);
