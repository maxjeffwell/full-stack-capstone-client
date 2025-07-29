import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Form, Icon, Button, Grid, Message } from 'semantic-ui-react';

import { createStudent } from '../store/slices/studentsSlice';
import { showModal, hideModal } from '../store/actions';
import { validationRules } from '../validators/hookFormValidators';
import { LabeledFormInput } from './forms/FormInput';
import { StyledForm } from './UpdateStudent';

const CreateStudent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [submitError, setSubmitError] = useState(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    setFocus,
  } = useForm({
    defaultValues: {
      fullName: '',
      school: '',
      teacher: '',
      gradeLevel: '',
      ellStatus: '',
      compositeLevel: '',
      designation: '',
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

  const onSubmit = async formData => {
    setSubmitError(null);

    try {
      const result = await dispatch(createStudent(formData)).unwrap();

      // Show success message
      dispatch(
        showModal({
          modalType: 'SUCCESS_MODAL',
          modalProps: {
            open: true,
            closeOnEscape: true,
            closeOnDimmerClick: true,
            children: (
              <div
                style={{
                  padding: '2rem',
                  textAlign: 'center',
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  fontFamily: 'Roboto, sans-serif',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
                  maxWidth: '400px',
                  margin: '0 auto',
                }}
              >
                <div style={{ marginBottom: '1.5rem' }}>
                  <i
                    className="icon check circle"
                    style={{
                      fontSize: '3rem',
                      color: '#27ae60',
                      marginBottom: '1rem',
                      display: 'block',
                    }}
                  />
                  <h3
                    style={{
                      fontSize: '1.5rem',
                      fontWeight: '600',
                      color: '#2c3e50',
                      margin: '0 0 0.5rem 0',
                    }}
                  >
                    Student Created
                  </h3>
                  <p
                    style={{
                      fontSize: '1rem',
                      color: '#7f8c8d',
                      lineHeight: '1.5',
                      margin: '0',
                    }}
                  >
                    {result.fullName || 'The student'} has been successfully
                    added to the system.
                  </p>
                </div>
                <button
                  onClick={() => dispatch(hideModal())}
                  style={{
                    backgroundColor: '#27ae60',
                    borderColor: '#27ae60',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    padding: '0.75rem 1.5rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontFamily: 'Roboto, sans-serif',
                  }}
                >
                  OK
                </button>
              </div>
            ),
          },
        })
      );

      // Auto-close success modal after 2 seconds and navigate
      setTimeout(() => {
        dispatch(hideModal());
        navigate('/students');
      }, 2000);
    } catch (error) {
      console.error('Error creating student:', error);
      console.error('Error details:', {
        message: error.message || error,
        response: error.response,
        data: error.data,
      });

      // Set error message for display
      setSubmitError(error.message || error || 'Failed to create student');

      // Error handling is done in the slice
      if (error === 'Not authenticated') {
        navigate('/signin');
      }
    }
  };

  return (
    <Grid
      textAlign="center"
      style={{
        marginLeft: '1.5em',
        width: 'auto',
        justifyContent: 'inherit',
        alignItems: 'stretch',
        paddingTop: '0px',
      }}
    >
      <Grid.Row style={{ marginTop: '10px', justifyContent: 'center' }}>
        <h1>Create New Student</h1>
      </Grid.Row>
      <Grid.Row style={{ marginTop: '10px', justifyContent: 'center' }}>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          {submitError && (
            <Message negative>
              <Message.Header>Error Creating Student</Message.Header>
              <p>{submitError}</p>
            </Message>
          )}
          <Form.Group>
            <LabeledFormInput
              control={control}
              name="fullName"
              rules={validationRules.nonEmpty}
              label={{
                content: <Icon color="blue" name="user outline" size="large" />,
              }}
              labelPosition="left"
              placeholder="enter student full name"
            />
          </Form.Group>
          <Form.Group>
            <LabeledFormInput
              control={control}
              name="school"
              rules={validationRules.nonEmpty}
              label={{
                content: (
                  <Icon color="green" name="building outline" size="large" />
                ),
              }}
              labelPosition="left"
              placeholder="enter school"
            />
          </Form.Group>
          <Form.Group>
            <LabeledFormInput
              control={control}
              name="teacher"
              rules={validationRules.nonEmpty}
              label={{
                content: (
                  <Icon color="orange" name="smile outline" size="large" />
                ),
              }}
              labelPosition="left"
              placeholder="enter teacher"
            />
          </Form.Group>
          <Form.Group>
            <LabeledFormInput
              control={control}
              name="gradeLevel"
              rules={validationRules.nonEmpty}
              label={{
                content: (
                  <Icon color="orange" name="graduation cap" size="large" />
                ),
              }}
              labelPosition="left"
              placeholder="enter grade level"
            />
          </Form.Group>
          <Form.Group>
            <LabeledFormInput
              control={control}
              name="ellStatus"
              rules={validationRules.nonEmpty}
              label={{
                content: <Icon color="blue" name="world" size="large" />,
              }}
              labelPosition="left"
              placeholder="enter ELL Status"
            />
          </Form.Group>
          <Form.Group>
            <LabeledFormInput
              control={control}
              name="compositeLevel"
              label={{
                content: <Icon color="green" name="chart line" size="large" />,
              }}
              labelPosition="left"
              placeholder="enter WIDA ACCESS composite level (optional)"
            />
          </Form.Group>
          <Form.Group>
            <LabeledFormInput
              control={control}
              name="designation"
              label={{
                content: (
                  <Icon color="purple" name="file alternate" size="large" />
                ),
              }}
              labelPosition="left"
              placeholder="enter IEP/504/intervention plan (optional)"
            />
          </Form.Group>
          <Button
            type="submit"
            disabled={!isDirty || isSubmitting}
            loading={isSubmitting}
            style={{ marginTop: '20px' }}
          >
            Save Student
          </Button>
        </StyledForm>
      </Grid.Row>
    </Grid>
  );
};

export default CreateStudent;
