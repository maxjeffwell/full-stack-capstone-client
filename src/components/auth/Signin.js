import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { reduxForm, Field, focus } from 'redux-form'; // add reduxForm to component export statement and tell it about different field names, then use the field component inside of the component itself

import { Form, Icon, Button, Grid, Segment, Header, Message } from 'semantic-ui-react';
import { LabelInputField } from 'react-semantic-redux-form';
import styled from 'styled-components';
import { compose } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../../actions';
import { required, nonEmpty } from '../../validators';

export const StyledMessage = styled(Message)`
  &&& {
    display: grid;
    min-width: 420px;
    margin-top: 10px;
    margin-bottom: 25px;
    padding: 25px 25px 25px 25px;
    font-family: 'Roboto', 'sans-serif';
    font-weight: bold;
    border: 4px solid ${props => props.theme.orange};
    color: ${props => props.theme.blue};
    background: ${props => props.theme.white};
    line-height: 30px;
    border-radius: 5px;
   }
   &&& p:first-child {
    margin-top: 10px;
    margin-bottom: 2px;
   }
   &&& p:last-child {
    margin-top: 2px;
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
    padding-top: 3px;
    padding-bottom: 25px;
    height: 50%;
    border-radius: 5px;
  }
  `;

const StyledSegment = styled(Segment)`
  &&& {
    display: grid;
    min-width: 420px;
    border: 4px solid ${props => props.theme.orange};
    border-radius: 5px;
    padding: 25px 25px 25px 15px;
    background: ${props => props.theme.white};
    margin-top: 25px;
  }
`;

const StyledForm = styled(Form)`
  &&& {
    padding: 0;
  }
  &&& .icon {
    size: 100px;
  }
  &&& .input {
    border-top: 3px solid ${props => props.theme.green};
    border-right: 3px solid ${props => props.theme.green};
    border-bottom: 2px solid ${props => props.theme.green};
    border-left: 3px solid ${props => props.theme.green};
    border-radius: 5px;
    margin-bottom: 10px;
    margin-top: 12px;
  }
  &&& .ui.labeled.input:not([class*="corner labeled"]) .label:first-child + input {
    color: ${props => props.theme.blue};
    font-family: 'Roboto', 'sans-serif';
    font-weight: bold;
    font-size: 1.5em;
    padding-left: 10px;
  }
  &&& .ui.button {
    border: 2px solid ${props => props.theme.orange};
    border-radius: 5px;
    font-size: 2em;
    font-family: 'Roboto','sans-serif';
    color: ${props => props.theme.white};
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
    font-size: 1.5em;
  }
`;

const StyledError = styled.div`
  &&& {
    font-family: 'Roboto', 'sans-serif';
    font-size: 1.5em;
    color: red;
  }
`;

 class Signin extends Component {
    onSubmit = (formProps) => { // arrow function makes it so we don't have to worry about binding the context of onSubmit

      this.props.signin(formProps, () => { // call the signin action creator
            this.props.history.push('/dashboard')
      });

      // when we use reduxForm we get a function on our props object called handleSubmit. Use this function to take email and password out of the form and provide it to the onSubmit callback
    };

    render() {

      if (this.props.auth) {
        return <Redirect to="/dashboard" />;
      }

      let registrationError = '';

      if (this.props.errorMessage) {
        registrationError = this.props.errorMessage;
      }

      const { handleSubmit, pristine, submitting } = this.props;

        // can't just add onSubmit as a callback directly to form tag. we have to destructure handleSubmit function from our props object

      return (
        <Fragment>
          <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
          <Grid.Column style={{ maxWidth: 450 }}>

              <StyledMessage info>
                Please log in with your account email and password. If you have neither registered
                nor been assigned account credentials, you are welcome to use the available demo account to log in.
              </StyledMessage>

            <StyledMessage info>
            DEMO ACCOUNT AVAILABLE
              <p>Email: demo</p>
              <p>Password: demopassword</p>
          </StyledMessage>

            <StyledSegment stacked>
              <StyledHeader as="h1">educationELLy login</StyledHeader>

              <StyledForm onSubmit={handleSubmit(this.onSubmit)}>

            {/* now we can add an onSubmit and call handleSubmit and to handleSubmit we'll pass the callback we want to be executed when user submits the form, which is the onSubmit method we just created. we don't call onSubmit as soon as we render the form, however. onSubmit will be called in the future. we pass a reference to the onSubmit function to handleSubmit.*/}

            <Field name="email" component={LabelInputField}
                   label={{ content: <Icon color="orange" name="user outline" size="large" /> }}
                   labelPosition="left" placeholder="Email" validate={[required, nonEmpty]}
            />

            <Field name="password" component={LabelInputField} type="password"
                   label={{ content: <Icon color="orange" name="lock" size="large" /> }}
                   labelPosition="left" placeholder="Password" validate={[required, nonEmpty]}
            />

            <Form.Field control={Button} primary
                        type="submit"
                        disabled={pristine || submitting}
            >
              Login
            </Form.Field>
                <StyledError className='form-error' aria-live="polite">
                  {registrationError}
                </StyledError>
              </StyledForm>
            </StyledSegment>
          </Grid.Column>
          </Grid>
        </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    errorMessage: state.auth.errorMessage,
    auth: state.auth.authenticated
});

export default compose (
  connect(mapStateToProps, actions),reduxForm({ form: 'signin',
    onSubmitFail: (errors, dispatch) =>
      dispatch(focus('signin', 'email')) }))(Signin);
