// this reducer records whether user is logged in

import { AUTH_USER, AUTH_ERROR } from '../actions/types';

// By default user is not authenticated and by default there is no error message

const INITIAL_STATE = {
  authenticated: '',
  errorMessage: '',
};

export default function authReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, authenticated: action.payload };
    case AUTH_ERROR:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
}
