import React, { Component } from 'react';
import { reduxForm, Field, focus } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

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
    min-width: 372px;
    border: 4px solid ${props => props.theme.orange};
    border-radius: 5px;
    background: ${props => props.theme.white};
    margin-top: 25px;
  }
`;

const StyledForm = styled(Form)`
  &&& {
  	display: grid;
  }
  &&& .field {
    text-align: center;
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
    border-bottom: 3px solid ${props => props.theme.green};
    border-left: 3px solid ${props => props.theme.green}
  }
  &&& .ui.labeled.input:not([class*="corner labeled"]) .label:first-child + input {
    color: ${props => props.theme.blue};
    font-family: 'Roboto', 'sans-serif';
    font-weight: bold;
    font-size: 1.5em;
    padding-left: 5px;
    padding-right: 10px;
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
  font-size: 1.5em;
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
    min-width: 372px;
    margin-bottom: 10px;
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
    font-family: 'Roboto', 'sans-serif';
    font-size: 2em;
    font-weight: bold;
    color: ${props => props.theme.blue};
    background: ${props => props.theme.green};
    border: 4px solid ${props => props.theme.orange};
    width: 100%;
    height: 50%;
    border-radius: 5px;
    padding-top: 3%;
    padding-bottom: 40px;
    padding-right: 5px;
    line-height: 1em;
    margin-bottom: 15px;
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

		if (this.props.auth) {
			return <Redirect to="/dashboard" />;
		}

		let registrationError = '';

		if (this.props.errorMessage) {
			registrationError = this.props.errorMessage;
		}

		const { handleSubmit, pristine, submitting } = this.props;

        // can't just add onSubmit as a callback directly to form tag -
        // have to destructure handleSubmit function from our props object
		return (
					<Grid centered style={{ height: '100%' }} verticalAlign="middle">
						<Grid.Column textAlign="center"  style={{ maxWidth: 450 }}>

							<StyledMessage info>
								DEMO ACCOUNT AVAILABLE
								<p>If you prefer not to register at this time, an account for demo purposes is available on the login page.</p>
							</StyledMessage>

							<StyledSegment stacked>
								<StyledHeader as="h1">educationELLy registration</StyledHeader>

								<StyledForm onSubmit={handleSubmit(this.onSubmit)}>

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
									            disabled={pristine || submitting}
									>
										Register
									</Form.Field>

									<StyledErrorMessage className="form-error" aria-live="polite">
										{registrationError}
									</StyledErrorMessage>

								</StyledForm>
							</StyledSegment>
						</Grid.Column>
					</Grid>
		);
	}
}

const mapStateToProps = state => ({
	errorMessage: state.signup.errorMessage,
	auth: state.auth.authenticated
})

export default compose (
	connect(mapStateToProps, actions),
	reduxForm({ form: 'register',
		onSubmitFail: (errors, dispatch) =>
			dispatch(focus('register', Object.keys(errors)[0]))
	})
)(Register);
