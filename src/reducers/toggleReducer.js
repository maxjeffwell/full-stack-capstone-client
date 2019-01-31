import { TOGGLE_SIDEBAR }  from '../actions/types';

export default function (state=false, { type }) {
  switch (type) {
    case TOGGLE_SIDEBAR:
      return !state;
    default:
      return state;
  }
};
