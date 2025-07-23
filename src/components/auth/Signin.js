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

import * as actions from '../../store/actions';
import { validationRules } from '../../validators/hookFormValidators';
import { LabeledFormInput } from '../forms/FormInput';

export const StyledMessage = styled(Message)`
  &&& {
    display: grid;
    min-width: 372px;
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
    border-top: 3px solid ${props => props.theme.green};
    border-right: 3px solid ${props => props.theme.green};
    border-bottom: 3px solid ${props => props.theme.green};
    border-left: 3px solid ${props => props.theme.green};
    border-radius: 5px;
    margin-bottom: 10px;
    margin-top: 12px;
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
    padding-right: 5px;
  }
  &&& .ui.button {
    border: 2px solid ${props => props.theme.orange};
    border-radius: 5px;
    font-size: 2em;
    font-family: 'Roboto', 'sans-serif';
    color: ${props => props.theme.white};
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

const StyledError = styled.div`
  &&& {
    font-family: 'Roboto', 'sans-serif';
    font-size: 1.5em;
    color: red;
  }
`;

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const errorMessage = useSelector(state => state.auth.errorMessage);
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
    },
    mode: 'onBlur',
  });

  React.useEffect(() => {
    // Focus on email field when there are errors
    if (errors.email) {
      setFocus('email');
    } else if (errors.password && !errors.email) {
      setFocus('password');
    }
  }, [errors, setFocus]);

  const onSubmit = formData => {
    dispatch(
      actions.signin({
        formData,
        callback: () => navigate('/dashboard'),
      })
    );
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <Grid centered style={{ height: '100%' }} verticalAlign="middle">
      <Grid.Column textAlign="center" style={{ maxWidth: 450 }}>
        <StyledMessage info>
          Please log in with your account email and password. If you have
          neither registered nor been assigned account credentials, you are
          welcome to use the available demo account to log in.
        </StyledMessage>

        <StyledMessage info>
          DEMO ACCOUNT AVAILABLE
          <p>Email: demo@example.com</p>
          <p>Password: demopassword</p>
        </StyledMessage>

        <StyledSegment stacked>
          <StyledHeader as="h1">educationELLy login</StyledHeader>

          <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <LabeledFormInput
              name="email"
              control={control}
              rules={validationRules.nonEmpty}
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
              rules={validationRules.nonEmpty}
              type="password"
              label={{
                content: <Icon color="orange" name="lock" size="large" />,
              }}
              labelPosition="left"
              placeholder="Password"
            />

            <Form.Field
              control={Button}
              primary
              type="submit"
              disabled={!isDirty || isSubmitting}
              loading={isSubmitting}
            >
              Login
            </Form.Field>

            {errorMessage && (
              <StyledError className="form-error" aria-live="polite">
                {errorMessage}
              </StyledError>
            )}
          </StyledForm>
        </StyledSegment>
      </Grid.Column>
    </Grid>
  );
};

export default Signin;
