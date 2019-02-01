import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

// add reduxForm to component export statement and tell it about different field names,
// then we can use the field component inside of the component itself

import { Form, Icon, Button, Grid, Segment, Header } from 'semantic-ui-react';
import { LabelInputField } from 'react-semantic-redux-form';
import styled from 'styled-components';

import { compose } from 'redux';

// compose allows us to write out multiple higher order components in a better formatted way

import { connect } from 'react-redux';
import * as actions from '../../actions';

const StyledSegment = styled(Segment)`
  &&& {
    margin-top: 50px;
    padding: 30px 30px 30px 30px;
  }
`;

const StyledHeader = styled(Header)`
  &&& {
    margin-bottom: 20px;
    font-family: 'Roboto', 'sans-serif';
    font-size: 2em;
    font-weight: bold;
    color: ${props => props.theme.blue};
    background: ${props => props.theme.green};
    border: 4px solid ${props => props.theme.orange};
    width: 100%;
    padding-top: 10px;
    padding-bottom: 10px;
    height: 50%;
    border-radius: 5px;
    text-align: center;
  }
  `;

export const StyledForm = styled(Form)`
  &&& {
    padding: 0px;
    display: grid;
  }
  &&& .icon {
    size: 100px;
  }
  &&& .input {
      border-radius: 5px;
      margin-bottom: 10px;
      margin-top: 12px;
      border: 2px solid ${props => props.theme.blue};
  }
  &&& .ui.labeled.input:not([class*="corner labeled"]) .label:first-child + input {
      color: ${props => props.theme.blue};
      font-family: 'Roboto', 'sans-serif';
      font-weight: bold;
      font-size: 1.5em;
      padding-left: 5px;
      border-radius: 5px;
  }
  &&& .ui.button {
    border: 2px solid ${props => props.theme.orange};
    border-radius: 5px;
    font-size: 2em;
    font-family: 'Roboto','sans-serif';
    color: ${props => props.theme.white};
  }
`;


class Register extends Component {
    onSubmit = (formProps) => {

        // arrow function makes it so we don't have to worry about binding the context of onSubmit

        this.props.signup(formProps, () => {
            this.props.history.push('/dashboard');
        });

        // call the signup action creator
        // when using reduxForm we get a function on our props object called handleSubmit.
        // Use this function to take email and password out of the form and provide it to the onSubmit callback

    };

    render() {
        const { handleSubmit } = this.props;

        // can't just add onSubmit as a callback directly to form tag -
        // have to destructure handleSubmit function from our props object

        return (
          <Grid centered columns={2}>
              <Grid.Column>
                  <StyledSegment>
                    <StyledHeader as="h1">educationELLy account registration</StyledHeader>
                      <StyledForm onSubmit={handleSubmit(this.onSubmit)}>

                        {/* now we can add an onSubmit and call handleSubmit and to handleSubmit we'll pass the callback we want to be executed when user submits the form, which is the onSubmit method we just created. we don't call onSubmit as soon as we render the form, however. onSubmit will be called in the future. we pass a reference to the onSubmit function to handleSubmit. */}

        <Field name="email" component={LabelInputField}
                   label={{ content: <Icon color="orange" name="user" size="large" /> }}
                   labelPosition="left" placeholder="Email" />

                   <Field name="password" component={LabelInputField} type="password"
                   label={{ content: <Icon color="orange" name="lock" size="large" /> }}
                   labelPosition="left" placeholder="Password" />

            <Form.Field control={Button} primary
                        type="submit">
                Register
            </Form.Field>

            <div className="error">
                {this.props.errorMessage}
            </div>
        </StyledForm>
                  </StyledSegment>
              </Grid.Column>
          </Grid>
        );
    }
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.errorMessage };
}

export default compose (
  connect(mapStateToProps, actions), //apply action creators to Register component
    reduxForm({ form: 'register'})
)(Register);
