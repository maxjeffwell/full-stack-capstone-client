import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modals',
  initialState: null,
  reducers: {
    showModal: (state, action) => ({
      modalType: action.payload.modalType,
      modalProps: action.payload.modalProps || {},
    }),
    hideModal: () => null,
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
