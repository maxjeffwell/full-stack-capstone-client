import { HIDE_MODAL, SHOW_MODAL } from '../actions/types';

const INITIAL_STATE = null;

const modalReducer = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        modalProps: action.payload,
      };
    case HIDE_MODAL:
      return null;
    default:
      return state;
  }
};

export default modalReducer;
