import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  Form,
  Icon,
  Button,
  Grid,
  Segment,
  Header,
  Message,
} from 'semantic-ui-react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import SEO from '../SEO';

import * as actions from '../../store/actions';
import {
  validationRules,
  combineRules,
} from '../../validators/hookFormValidators';
import { LabeledFormInput } from '../forms/FormInput';

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
    border-left: 3px solid ${props => props.theme.green};
  }
  &&&
    .ui.labeled.input:not([class*='corner labeled'])
    .label:first-child
    + input {
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
    font-family: 'Roboto', 'sans-serif';
    color: ${props => props.theme.white};
    margin-top: 15px;
    &:hover:not([disabled]) {
      box-shadow:
        0 12px 16px 0 rgba(0, 0, 0, 0.24),
        0 17px 50px 0 rgba(0, 0, 0, 0.19);
    }
  }
  &&& .ui.label.label {
    padding-right: 10px;
    padding-left: 10px;
  }
  &&& .ui.red {
    color: red;
    font-family: 'Roboto', 'sans-serif';
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
    font-family: 'Roboto', 'Arimo', 'sans-serif';
    font-size: 2.2em;
    font-weight: bold;
    color: ${props => props.theme.blue};
    background: ${props => props.theme.green};
    border: 4px solid ${props => props.theme.orange};
    width: 100%;
    border-radius: 5px;
    padding: 15px 10px;
    line-height: 1.1em;
    margin-bottom: 15px;
    text-align: center;
    text-transform: capitalize;
    letter-spacing: 1px;
  }
`;

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const errorMessage = useSelector(state => state.signup.errorMessage);
  const isAuthenticated = useSelector(state => state.auth.authenticated);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    setFocus,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      passwordConfirmation: '',
    },
    mode: 'onBlur',
  });

  React.useEffect(() => {
    // Focus on first field with error
    const firstErrorField = Object.keys(errors)[0];
    if (firstErrorField) {
      setFocus(firstErrorField);
    }
  }, [errors, setFocus]);

  const onSubmit = formData => {
    dispatch(
      actions.signup({
        formData,
        callback: () => navigate('/dashboard'),
      })
    );
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <>
      <SEO
        title="Register - educationELLy"
        description="Create your educationELLy account to start managing English Language Learning students, tracking proficiency, and organizing your teaching workflows."
        keywords="ELL registration, teacher signup, education platform registration, create account"
        canonicalUrl="/signup"
      />
      <Grid centered style={{ height: '100%' }} verticalAlign="middle">
        <Grid.Column textAlign="center" style={{ maxWidth: 450 }}>
          <StyledMessage info>
            DEMO ACCOUNT AVAILABLE
            <p>
              If you prefer not to register at this time, an account for demo
              purposes is available on the login page.
            </p>
          </StyledMessage>

          <StyledSegment stacked>
            <StyledHeader as="h1">registration</StyledHeader>

            <StyledForm onSubmit={handleSubmit(onSubmit)}>
              <LabeledFormInput
                name="email"
                control={control}
                rules={combineRules(
                  validationRules.email,
                  validationRules.isTrimmed
                )}
                label={{
                  content: (
                    <Icon color="orange" name="user outline" size="large" />
                  ),
                }}
                labelPosition="left"
                placeholder="Email"
              />

              <LabeledFormInput
                name="password"
                control={control}
                rules={combineRules(
                  validationRules.password(7, 42),
                  validationRules.isTrimmed
                )}
                type="password"
                label={{
                  content: <Icon color="orange" name="lock" size="large" />,
                }}
                labelPosition="left"
                placeholder="Password"
              />

              <LabeledFormInput
                name="passwordConfirmation"
                control={control}
                rules={validationRules.passwordConfirmation}
                type="password"
                label={{
                  content: <Icon color="orange" name="lock" size="large" />,
                }}
                labelPosition="left"
                placeholder="Confirm Password"
              />

              <Form.Field
                control={Button}
                primary
                type="submit"
                disabled={!isDirty || isSubmitting}
                loading={isSubmitting}
              >
                Register
              </Form.Field>

              {errorMessage && (
                <StyledErrorMessage className="form-error" aria-live="polite">
                  {errorMessage}
                </StyledErrorMessage>
              )}
            </StyledForm>
          </StyledSegment>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default Register;
