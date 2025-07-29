import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Form, Icon, Button } from 'semantic-ui-react';
import styled from 'styled-components';

import {
  fetchStudent,
  updateStudent,
  showModal,
  hideModal,
} from '../store/actions';
import { selectStudentById } from '../store/slices/studentsSlice';
import { validationRules } from '../validators/hookFormValidators';
import { LabeledFormInput } from './forms/FormInput';
import DeleteStudent from './DeleteStudent';

export const StyledForm = styled(Form)`
 &&& form.ui.form {
    display: grid;
    min-width: 372px;
    padding-bottom: 0;
    align-items: flex-start;
  }
  &&& div.field {
    text-align: center;
  }
  &&& .icon {
    size: 100px;
  }
  }
  &&& .ui.labeled.input:not([class*="corner labeled"]) 
  .label:first-child+input {
    font-family: 'Roboto', 'sans-serif';
    font-size: 2em;
    font-weight: 700;
    color: ${props => props.theme.blue};
    padding: 5px 5px 5px 10px;
    background-color: ${props => props.theme.white};
    border-top: 2px solid ${props => props.theme.green};
    border-right: 2px solid ${props => props.theme.green};
    border-bottom: 2px solid ${props => props.theme.green};
    margin-right: auto;
  }
  &&& .ui.label {
    border: 2px solid ${props => props.theme.orange};
    border-radius: 5px;
    width: 50px;
    text-align: center;
  }
  &&& .ui.red {
    color: red;
    font-family: 'Roboto','sans-serif';
    font-size: 1.5em;
    font-weight: bold;
    border: none;
  }
`;

const UpdateStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const student = useSelector(state => selectStudentById(state, id));

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    setFocus,
    reset,
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

  useEffect(() => {
    // Fetch student data if not already in store
    if (!student) {
      dispatch(fetchStudent(id))
        .unwrap()
        .catch(error => {
          console.error('Error fetching student:', error);
          if (error === 'Not authenticated') {
            navigate('/signin');
          }
        });
    } else {
      // Reset form with student data
      reset(student);
    }
  }, [id, student, dispatch, navigate, reset]);

  useEffect(() => {
    // Focus on first field with error
    const firstErrorField = Object.keys(errors)[0];
    if (firstErrorField) {
      setFocus(firstErrorField);
    }
  }, [errors, setFocus]);

  const onSubmit = async formData => {
    try {
      const result = await dispatch(
        updateStudent({ id, ...formData })
      ).unwrap();

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
                    Student Updated
                  </h3>
                  <p
                    style={{
                      fontSize: '1rem',
                      color: '#7f8c8d',
                      lineHeight: '1.5',
                      margin: '0',
                    }}
                  >
                    {result.fullName || student?.fullName || 'The student'}'s
                    information has been successfully updated.
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
      console.error('Error updating student:', error);
      if (error === 'Not authenticated') {
        navigate('/signin');
      }
    }
  };

  return (
    <Grid textAlign="center" style={{ width: 'auto' }}>
      <Grid.Row centered columns={1}>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <LabeledFormInput
            name="fullName"
            control={control}
            rules={validationRules.required}
            label={{
              content: <Icon color="green" name="student" size="large" />,
            }}
            labelPosition="left"
            placeholder="enter full student name"
          />

          <LabeledFormInput
            name="school"
            control={control}
            label={{
              content: (
                <Icon color="blue" name="building outline" size="large" />
              ),
            }}
            labelPosition="left"
            placeholder="enter school"
          />

          <LabeledFormInput
            name="teacher"
            control={control}
            label={{
              content: <Icon color="orange" name="apple" size="large" />,
            }}
            labelPosition="left"
            placeholder="enter teacher"
          />

          <LabeledFormInput
            name="gradeLevel"
            control={control}
            label={{
              content: <Icon color="green" name="chart line" size="large" />,
            }}
            labelPosition="left"
            placeholder="enter grade level"
          />

          <LabeledFormInput
            name="ellStatus"
            control={control}
            label={{
              content: <Icon color="orange" name="world" size="large" />,
            }}
            labelPosition="left"
            placeholder="enter ELL Status"
          />

          <LabeledFormInput
            name="compositeLevel"
            control={control}
            label={{
              content: <Icon color="green" name="percent" size="large" />,
            }}
            labelPosition="left"
            placeholder="enter composite level (overall)"
          />

          <LabeledFormInput
            name="designation"
            control={control}
            label={{
              content: (
                <Icon color="blue" name="universal access" size="large" />
              ),
            }}
            labelPosition="left"
            placeholder="enter ELL, Special Education, or Intervention designation"
          />

          <Button
            disabled={!isDirty || isSubmitting}
            loading={isSubmitting}
            type="submit"
          >
            Save Student
          </Button>
        </StyledForm>
      </Grid.Row>
      <Grid.Row centered>
        <Grid.Column textAlign="center">
          <DeleteStudent id={id} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default UpdateStudent;
