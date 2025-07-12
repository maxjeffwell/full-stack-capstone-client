import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { showModal, hideModal, deleteStudent } from '../store/actions';

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

const FancyButton = React.forwardRef((props, ref) => (
  <StyledFancyButton {...props} ref={ref} />
));

FancyButton.displayName = 'FancyButton';

const ConfirmButton = React.forwardRef((props, ref) => (
  <StyledConfirmButton {...props} ref={ref} />
));

ConfirmButton.displayName = 'ConfirmButton';

const DeleteStudent = ({ id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const deleteButtonRef = useRef(null);
  const confirmButtonRef = useRef(null);

  const confirmDelete = () => {
    dispatch(
      showModal({
        modalType: 'DELETE_STUDENT_MODAL',
        modalProps: {
          open: true,
          closeOnEscape: false,
          closeOnDimmerClick: false,
          children: (
            <div
              style={{
                padding: 40,
                textAlign: 'center',
                backgroundColor: 'lightgreen',
                borderRadius: 5,
                fontFamily: 'Roboto, sans-serif',
              }}
            >
              <p style={{ fontSize: 20, fontWeight: 900, lineHeight: 2 }}>
                Are you sure you want to delete this student? This action cannot
                be undone.
              </p>
              <ConfirmButton
                ref={confirmButtonRef}
                type="submit"
                onClick={() => deleteConfirmed(id)}
              >
                <i className="icon delete" />
                Delete
              </ConfirmButton>
              <br />
              <ConfirmButton
                ref={confirmButtonRef}
                type="button"
                onClick={deleteCancelled}
              >
                <i className="icon cancel" />
                Cancel
              </ConfirmButton>
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
      navigate('/students');
    } catch (error) {
      console.error('Error deleting student:', error);
      dispatch(hideModal());
    }
  };

  const deleteCancelled = () => {
    dispatch(hideModal());
  };

  return (
    <>
      <FancyButton ref={deleteButtonRef} type="button" onClick={confirmDelete}>
        DELETE
      </FancyButton>
    </>
  );
};

export default DeleteStudent;
