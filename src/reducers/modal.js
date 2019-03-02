import { SHOW_MODAL, HIDE_MODAL }  from '../actions/types';

const INITIAL_STATE = {
  modalType: null,
  modalProps: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        modalProps: action.modalProps,
        modalType: action.modalType,
        type: action.type
      };
    case HIDE_MODAL:
      return INITIAL_STATE;
    default:
      return state;
  }
};
