import React, { Component, Fragment } from 'react';
import { reduxForm, Field, initialize } from 'redux-form'; // add reduxForm to component export statement and tell it about different field names, then use the field component inside of the component itself

import { Form, Icon, Button, Grid, Segment, Header, Message } from 'semantic-ui-react';
import { LabelInputField } from 'react-semantic-redux-form';
import styled from 'styled-components';

import { compose } from 'redux'; // write out multiple higher order components in a better formatted way
import { connect } from 'react-redux';
import * as actions from '../../actions';

export const StyledMessage = styled(Message)`
  &&& {
    display: grid;
    margin-top: 35px;
    margin-bottom: 20px;
    padding: 25px 25px 25px 25px;
    font-family: 'Roboto', 'sans-serif';
    font-weight: bold;
    border: 4px solid ${props => props.theme.orange};
    color: ${props => props.theme.blue};
    background: ${props => props.theme.white};
    line-height: 30px;
    border-radius: 5px;
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
  }
  `;

const StyledSegment = styled(Segment)`
  &&& {
    border: 4px solid ${props => props.theme.orange};
    border-radius: 5px;
    padding-top: 25px;
    background: ${props => props.theme.white};
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
    border: 2px solid ${props => props.theme.blue};
    border-radius: 5px;
    margin-bottom: 10px;
    margin-top: 12px;
  }
  &&& .ui.labeled.input:not([class*="corner labeled"]) .label:first-child + input {
    color: ${props => props.theme.blue};
    font-family: 'Roboto', 'sans-serif';
    font-weight: bold;
    font-size: 1.5em;
    padding-left: 5px;
  }
  &&& .ui.button {
    border: 2px solid ${props => props.theme.orange};
    border-radius: 5px;
    font-size: 2em;
    font-family: 'Roboto','sans-serif';
    color: ${props => props.theme.white};
  }
`;

const StyledError = styled.div`
  &&& {
    font-family: 'Roboto', 'sans-serif';
    font-size: 1.5em;
    color: ${props => props.theme.blue};
  }
`;

 class Signin extends Component {
    onSubmit = (formProps) => { // arrow function makes it so we don't have to worry about binding the context of onSubmit

      this.props.signin(formProps, () => {
            this.props.history.push('/dashboard')
              .then(
                result => {
                  if (result) {
                    this.props.dispatch(initialize('signin', {}));
                  }
                }
              );
        }); // call the signin action creator

      // when we use reduxForm we get a function on our props object called handleSubmit. Use this function     // take email and password out of the form and provide it to the onSubmit callback
    };

    render() {
        const { handleSubmit } = this.props;

        // can't just add onSubmit as a callback directly to form tag. we have to destructure handleSubmit              // function from our props object

      return (
        <Fragment>
          <div className="login">
          <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
          <Grid.Column style={{ maxWidth: 450 }}>

              <StyledMessage info>
                Please log in with your account email and password. If you have neither registered
                nor been assigned account credentials, you are welcome to use the available demo account to log in.
              </StyledMessage>

            <StyledMessage info>
            DEMO ACCOUNT AVAILABLE
            <p>Username: demo <span>
              </span>Password: demopassword</p>
          </StyledMessage>

            <StyledSegment stacked>
              <StyledHeader as="h1">educationELLy account</StyledHeader>

              <StyledForm onSubmit={handleSubmit(this.onSubmit)}>

            {/* now we can add an onSubmit and call handleSubmit and to handleSubmit we'll pass the callback we want to be executed when user submits the form, which is the onSubmit method we just created. we don't call onSubmit as soon as we render the form, however. onSubmit will be called in the future. we pass a reference to the onSubmit function to handleSubmit.*/}

            <Field name="email" component={LabelInputField}
                       label={{ content: <Icon color="orange" name="user outline" size="large" /> }}
                       labelPosition="left" placeholder="Email" />

                       <Field name="password" component={LabelInputField} type="password"
                              label={{ content: <Icon color="orange" name="lock" size="large" /> }}
                              labelPosition="left" placeholder="Password" />

                              <Form.Field control={Button} primary
                                          type="submit">
                                Login
                              </Form.Field>

                <StyledError>
                    {this.props.errorMessage}
                  </StyledError>
              </StyledForm>
            </StyledSegment>
          </Grid.Column>
          </Grid>
          </div>
        </Fragment>
        );
    }
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.errorMessage };
}

export default compose (

  // compose allows us to apply multiple HOC's in series to a single component (Signin in this case) in an easier  // to read way

  connect(mapStateToProps, actions),reduxForm({ form: 'signin' }))(Signin);
