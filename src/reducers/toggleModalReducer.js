import { TOGGLE_MODAL }  from '../actions/types';

const INITIAL_STATE = {
  showModal: false,
}
export default function(state=INITIAL_STATE, { type }) {
  switch (type) {
    case TOGGLE_MODAL:
      return !state;
    default:
      return state;
  }
};
