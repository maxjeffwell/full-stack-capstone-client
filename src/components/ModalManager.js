import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'semantic-ui-react';

import { hideModal } from '../store/actions';
import { selectModal } from '../store/slices/modalSlice';

const backdropStyle = {
  filter: 'blur(20px)',
  position: 'fixed',
  zIndex: '1040',
  top: '0',
  bottom: '0',
  left: '0',
  right: '0',
  backgroundColor: 'blue',
  opacity: '0.8',
  boxShadow: '0px 0px 20px 20px rgba(255,255,255,1)',
  textShadow: '0px 0px 10px rgba(51, 51, 51, 0.9)',
  transform: 'scale(0.9)',
};

const modalStyle = {
  position: 'absolute',
  textAlign: 'center',
  width: 'auto',
  zIndex: '1040',
  left: '50%',
  top: '25%',
  transform: 'translate(-50%, -50%)',
};

const ModalManager = () => {
  const dispatch = useDispatch();
  const modal = useSelector(selectModal);

  console.log('ModalManager - modal state:', modal);

  if (!modal) {
    console.log('ModalManager - no modal to show');
    return null;
  }

  const { modalProps } = modal;

  return (
    <>
      <div style={backdropStyle} />
      <Modal
        open={true}
        onClose={() => dispatch(hideModal())}
        style={modalStyle}
        {...modalProps}
      >
        {modalProps.children}
      </Modal>
    </>
  );
};

export default ModalManager;
