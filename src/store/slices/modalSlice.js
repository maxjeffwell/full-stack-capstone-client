import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modals',
  initialState: null,
  reducers: {
    showModal: (state, action) => {
      console.log('🔧 showModal reducer called with payload:', action.payload);
      console.log('🔧 action.payload.modalType:', action.payload.modalType);
      console.log('🔧 action.payload.modalProps:', action.payload.modalProps);

      try {
        const newState = {
          modalType: action.payload.modalType,
          modalProps: action.payload.modalProps || {},
        };
        console.log('🔧 showModal created newState:', newState);
        console.log('🔧 About to return newState');
        return newState;
      } catch (error) {
        console.error('🔧 Error in showModal reducer:', error);
        return state;
      }
    },
    hideModal: (state, action) => {
      console.log('🔧 hideModal reducer called');
      return null;
    },
  },
});

// Export actions
export const { showModal, hideModal } = modalSlice.actions;

// Export reducer
export default modalSlice.reducer;

// Selectors
export const selectModal = state => state.modals;
export const selectModalType = state => state.modals?.modalType;
export const selectModalProps = state => state.modals?.modalProps;
