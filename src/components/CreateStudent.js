import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Form, Icon, Button, Grid, Message } from 'semantic-ui-react';

import { createStudent } from '../store/slices/studentsSlice';
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
      await dispatch(createStudent(formData)).unwrap();
      navigate('/students');
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
          >
            Save Student
          </Button>
        </StyledForm>
      </Grid.Row>
    </Grid>
  );
};

export default CreateStudent;
