import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Form, Icon, Button } from 'semantic-ui-react';
import styled from 'styled-components';

import { fetchStudent, updateStudent } from '../store/actions';
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
    reset
  } = useForm({
    defaultValues: {
      fullName: '',
      school: '',
      teacher: '',
      gradeLevel: '',
      ellStatus: '',
      compositeLevel: '',
      designation: ''
    },
    mode: 'onBlur'
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

  const onSubmit = async (formData) => {
    try {
      await dispatch(updateStudent({ id, ...formData })).unwrap();
      navigate('/students');
    } catch (error) {
      console.error('Error updating student:', error);
      if (error === 'Not authenticated') {
        navigate('/signin');
      }
    }
  };

  return (
    <Grid textAlign="center" style={{width: 'auto'}}>
      <Grid.Row centered columns={1}>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>

          <LabeledFormInput
            name="fullName"
            control={control}
            rules={validationRules.required}
            label={{content: <Icon color="green" name="student" size="large"/>}}
            labelPosition="left"
            placeholder="enter full student name"
          />

          <LabeledFormInput
            name="school"
            control={control}
            label={{content: <Icon color="blue" name="building outline" size="large"/>}}
            labelPosition="left"
            placeholder="enter school"
          />

          <LabeledFormInput
            name="teacher"
            control={control}
            label={{content: <Icon color="orange" name="apple" size="large"/>}}
            labelPosition="left"
            placeholder="enter teacher"
          />

          <LabeledFormInput
            name="gradeLevel"
            control={control}
            label={{content: <Icon color="green" name="chart line" size="large"/>}}
            labelPosition="left"
            placeholder="enter grade level"
          />

          <LabeledFormInput
            name="ellStatus"
            control={control}
            label={{content: <Icon color="orange" name="world" size="large"/>}}
            labelPosition="left"
            placeholder="enter ELL Status"
          />

          <LabeledFormInput
            name="compositeLevel"
            control={control}
            label={{content: <Icon color="green" name="percent" size="large"/>}}
            labelPosition="left"
            placeholder="enter composite level (overall)"
          />

          <LabeledFormInput
            name="designation"
            control={control}
            label={{content: <Icon color="blue" name="universal access" size="large"/>}}
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
      <Grid.Row>
        <DeleteStudent id={id} />
      </Grid.Row>
    </Grid>
  );
};

export default UpdateStudent;