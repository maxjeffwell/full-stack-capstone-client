import React, { Component, Fragment } from 'react';
import { reduxForm, Field, focus } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';

// compose allows us to write out multiple higher order components in a better formatted way
// add reduxForm to component export statement and tell it about different field names,
// then we can use the field component inside of the component itself

import { Form, Icon, Button, Grid, Segment, Header, Message } from 'semantic-ui-react';
import { LabelInputField } from 'react-semantic-redux-form';
import styled from 'styled-components';

import { required, nonEmpty, matches, length, isTrimmed } from '../../validators';

import * as actions from '../../actions';

const StyledSegment = styled(Segment)`
  &&& {
    display: grid;
    min-width: 420px;
    margin-top: 50px;
    border: 4px solid ${props => props.theme.orange};
    border-radius: 5px;
    background: ${props => props.theme.white};
    padding: 25px 20px 25px 20px;
  }
`;

const StyledHeader = styled(Header)`
  &&& {
    margin-bottom: 20px;
    margin-right: 5px;
    font-family: 'Roboto', 'sans-serif';
    font-size: 2em;
    font-weight: bold;
    color: ${props => props.theme.blue};
    background: ${props => props.theme.green};
    border: 4px solid ${props => props.theme.orange};
    width: 100%;
    max-height: border-box;
    border-radius: 5px;
    padding: 0 5px 0 5px; ;
    white-space: nowrap;
  }
`;

const StyledForm = styled(Form)`
  &&& {
    padding: 0px;
  }
  &&& .icon {
    size: 100px;
  }
  &&& .input {
    border-radius: 5px;
    margin-bottom: 10px;
    margin-top: 12px;
    border-top: 3px solid ${props => props.theme.green};
    border-right: 3px solid ${props => props.theme.green};
    border-bottom: 2px solid ${props => props.theme.green};
    border-left: 3px solid ${props => props.theme.green};
  }
  &&& .ui.labeled.input:not([class*="corner labeled"]) .label:first-child + input {
    color: ${props => props.theme.blue};
    font-family: 'Roboto', 'sans-serif';
    font-weight: bold;
    font-size: 1.5em;
    padding-left: 10px;
    border-radius: 5px;
  }
  &&& .ui.button {
    border: 2px solid ${props => props.theme.orange};
    border-radius: 5px;
    font-size: 2em;
    font-family: 'Roboto','sans-serif';
    color: ${props => props.theme.white};
    margin-top: 15px;
    &:hover:not([disabled]) {
    box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
    }
  }
  &&& .ui.label.label {
    padding-right: 10px;
    padding-left: 10px;
  }
  &&& .ui.red {
  color: red;
  font-family: 'Roboto','sans-serif';
  font-size: 1.25em;
  }
`;

const StyledErrorMessage = styled.div`
  &&& {
    font-family: 'Roboto', 'sans-serif';
    font-size: 1.5em;
    color: red;
  }
`;

const StyledMessage = styled(Message)`
  &&& {
    display: grid;
    margin-top: 25px;
    margin-bottom: 10px;
    padding: 25px 25px 25px 25px;
    font-family: 'Roboto', 'sans-serif';
    font-weight: bold;
    border: 4px solid ${props => props.theme.orange};
    color: ${props => props.theme.blue};
    background: ${props => props.theme.white};
    line-height: 30px;
    border-radius: 5px;
    min-width: 420px;
   }
`;

const passwordLength = length({ min: 7, max: 42 });
const matchesPassword = matches('password');

class Register extends Component {
    onSubmit = (formProps) => {

        // arrow function makes it so we don't have to worry about binding the context of onSubmit

        this.props.signup(formProps, () => {
            this.props.history.push('/dashboard')
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
          <Fragment>
            <div className="signup">
            <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
              <Grid.Column style={{ maxWidth: 450 }}>

                <StyledMessage info>
                  DEMO ACCOUNT AVAILABLE
                  <p>If you prefer not to register at this time, an account for demo purposes is available on the login page.</p>
                </StyledMessage>
                  <StyledSegment>
                    <StyledHeader as="h1">educationELLy registration</StyledHeader>
                      <StyledForm onSubmit={handleSubmit(this.onSubmit)}>

                        {/* now we can add an onSubmit and call handleSubmit and to handleSubmit we'll pass the callback we want to be executed when user submits the form, which is the onSubmit method we just created. we don't call onSubmit as soon as we render the form, however. onSubmit will be called in the future. we pass a reference to the onSubmit function to handleSubmit. */}

        <Field name="email" component={LabelInputField}
                   label={{ content: <Icon color="orange" name="user outline" size="large" /> }}
                   labelPosition="left" placeholder="Email" validate={[required, nonEmpty, isTrimmed]}
        />

        <Field name="password" component={LabelInputField} type="password"
                   label={{ content: <Icon color="orange" name="lock" size="large" /> }}
                   labelPosition="left" placeholder="Password" validate={[required, passwordLength, isTrimmed]}
        />

        <Field name="passwordConfirmation" component={LabelInputField} type="password"
                    label={{ content: <Icon color="orange" name="lock" size="large" /> }}
                    labelPosition="left" placeholder="Confirm Password" validate={[required, nonEmpty, matchesPassword]}
        />

            <Form.Field control={Button} primary
                        type="submit"
                        disabled={this.props.pristine || this.props.submitting}>
                Register
            </Form.Field>
                        <StyledErrorMessage className="form-error" aria-live="polite">
                          {this.props.errorMessage}
                        </StyledErrorMessage>
        </StyledForm>
                  </StyledSegment>
              </Grid.Column>
            </Grid>
            </div>
          </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    errorMessage: state.signup.errorMessage,
})

export default compose (
  connect(mapStateToProps, actions), //apply action creators to Register component
    reduxForm({ form: 'register',
    onSubmitFail: (errors, dispatch) =>
    dispatch(focus('register', Object.keys(errors)[0]))
    })
)(Register);
