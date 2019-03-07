import { HIDE_MODAL, SHOW_MODAL } from '../actions/types';

const INITIAL_STATE = null

export default (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        modalProps: action.payload
      };
    case HIDE_MODAL:
      return null;
    default:
      return state;
  }
};
