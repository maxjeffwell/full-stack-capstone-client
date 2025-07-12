import { TOGGLE_SIDEBAR } from '../actions/types';

const toggleReducer = (state = false, { type }) => {
  switch (type) {
    case TOGGLE_SIDEBAR:
      return !state;
    default:
      return state;
  }
};

export default toggleReducer;
