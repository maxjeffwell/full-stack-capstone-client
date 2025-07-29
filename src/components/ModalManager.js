import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { hideModal } from '../store/actions';
import { selectModal } from '../store/slices/modalSlice';

const backdropStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999,
};

const modalStyle = {
  backgroundColor: 'white',
  borderRadius: '8px',
  padding: '0',
  maxWidth: '500px',
  width: '90%',
  maxHeight: '90vh',
  overflow: 'auto',
};

const ModalManager = () => {
  const dispatch = useDispatch();
  const modal = useSelector(selectModal);

  const handleKeyDown = React.useCallback(
    e => {
      if (e.key === 'Escape' && modal?.modalProps?.closeOnEscape) {
        dispatch(hideModal());
      }
    },
    [dispatch, modal?.modalProps?.closeOnEscape]
  );

  React.useEffect(() => {
    if (modal?.modalProps?.closeOnEscape) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [modal?.modalProps?.closeOnEscape, handleKeyDown]);

  if (!modal) {
    console.log('ModalManager - no modal, returning null');
    return null;
  }

  console.log('ModalManager - about to render modal');
  const { modalProps } = modal;

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget && modalProps.closeOnDimmerClick) {
      dispatch(hideModal());
    }
  };

  console.log(
    'ModalManager - rendering JSX with backdrop style:',
    backdropStyle
  );
  console.log('ModalManager - rendering JSX with modal style:', modalStyle);
  console.log('ModalManager - modalProps.children:', modalProps.children);

  return (
    <div
      style={backdropStyle}
      onClick={handleBackdropClick}
      data-testid="modal-backdrop"
    >
      <div
        style={modalStyle}
        onClick={e => e.stopPropagation()}
        data-testid="modal-content"
      >
        {modalProps.children}
      </div>
    </div>
  );
};

export default ModalManager;
