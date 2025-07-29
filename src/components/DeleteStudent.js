import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import {
  showModal,
  hideModal,
  deleteStudent,
  fetchStudents,
} from '../store/actions';

const StyledConfirmButton = styled.button`
  cursor: pointer;
  font-family: 'Roboto', 'sans-serif';
  margin-top: 0;
  white-space: nowrap;
  font-size: 28px;
  font-weight: 700;
  line-height: 1em;
  margin-bottom: 35px;
  color: ${props => props.theme.white};
  background-color: ${props => props.theme.blue};
  border: 2px solid ${props => props.theme.orange};
  border-radius: 5px;
  padding: 10px;
  &:hover:not([disabled]) {
    box-shadow:
      0 12px 16px 0 rgba(0, 0, 0, 0.24),
      0 17px 50px 0 rgba(0, 0, 0, 0.19);
  }
`;

const StyledFancyButton = styled.button`
  border: 2px solid red;
  background-color: ${props => props.theme.white};
  padding: 5px;
  align-items: center;
  border-radius: 5px;
  font-family: 'Roboto', 'sans-serif';
  font-size: 1em;
  font-weight: 700;
  color: ${props => props.theme.blue};
  cursor: pointer;
  &:hover:not([disabled]) {
    box-shadow: inset 6.5em 0 0 0 var(--hover);
    background-color: red;
    color: ${props => props.theme.white};
  }
`;

const FancyButton = React.forwardRef(({ icon, ...props }, ref) => (
  <StyledFancyButton {...props} ref={ref} />
));

FancyButton.displayName = 'FancyButton';

const ConfirmButton = React.forwardRef(({ icon, ...props }, ref) => (
  <StyledConfirmButton {...props} ref={ref} />
));

ConfirmButton.displayName = 'ConfirmButton';

const DeleteStudent = ({ id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const deleteButtonRef = useRef(null);
  const confirmButtonRef = useRef(null);

  const confirmDelete = () => {
    console.log('Delete button clicked, showing modal');
    console.log('About to dispatch showModal action');
    dispatch(
      showModal({
        modalType: 'DELETE_STUDENT_MODAL',
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
                  className="icon exclamation triangle"
                  style={{
                    fontSize: '3rem',
                    color: '#f39c12',
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
                  Delete Student
                </h3>
                <p
                  style={{
                    fontSize: '1rem',
                    color: '#7f8c8d',
                    lineHeight: '1.5',
                    margin: '0',
                  }}
                >
                  Are you sure you want to delete this student? This action
                  cannot be undone.
                </p>
              </div>
              <div
                style={{
                  display: 'flex',
                  gap: '1rem',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                }}
              >
                <ConfirmButton
                  ref={confirmButtonRef}
                  type="button"
                  onClick={deleteCancelled}
                  style={{
                    backgroundColor: '#95a5a6',
                    borderColor: '#95a5a6',
                    color: 'white',
                    minWidth: '100px',
                  }}
                >
                  Cancel
                </ConfirmButton>
                <ConfirmButton
                  ref={confirmButtonRef}
                  type="submit"
                  onClick={() => deleteConfirmed(id)}
                  style={{
                    backgroundColor: '#e74c3c',
                    borderColor: '#e74c3c',
                    color: 'white',
                    minWidth: '100px',
                  }}
                >
                  <i className="icon trash" style={{ marginRight: '0.5rem' }} />
                  Delete
                </ConfirmButton>
              </div>
            </div>
          ),
        },
      })
    );
  };

  const deleteConfirmed = async studentId => {
    try {
      await dispatch(deleteStudent(studentId)).unwrap();
      dispatch(hideModal());
      // Refresh the students list to ensure clean state
      await dispatch(fetchStudents()).unwrap();

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
                    Student Deleted
                  </h3>
                  <p
                    style={{
                      fontSize: '1rem',
                      color: '#7f8c8d',
                      lineHeight: '1.5',
                      margin: '0',
                    }}
                  >
                    The student has been successfully deleted.
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
      console.error('Error deleting student:', error);
      dispatch(hideModal());
    }
  };

  const deleteCancelled = () => {
    dispatch(hideModal());
  };

  const handleDeleteClick = e => {
    e.preventDefault();
    console.log('Delete button clicked');
    confirmDelete();
  };

  return (
    <>
      <FancyButton
        ref={deleteButtonRef}
        type="button"
        onClick={handleDeleteClick}
      >
        DELETE
      </FancyButton>
    </>
  );
};

export default DeleteStudent;
