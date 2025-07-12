import { REGISTER_USER_REQUEST, REGISTER_USER_ERROR } from '../actions/types';

const INITIAL_STATE = {
  loading: false,
  errorMessage: '',
};

export default function signupReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
      return {
        ...state,
        loading: true,
        errorMessage: action.payload,
      };
    case REGISTER_USER_ERROR:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
}
