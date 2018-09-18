// this reducer records whether user is logged in

import { AUTH_USER, AUTH_ERROR, FETCH_STUDENTS } from '../actions/types';

// By default user is not authenticated and by default there is no error message

const INITIAL_STATE = { // all caps because it is a truly constant variable
    authenticated: '',
    errorMessage: ''
};

export default function(state = INITIAL_STATE, action) {
    console.log(action);
    switch (action.type) {
        case AUTH_USER:
            return {...state, authenticated: action.payload};
        case AUTH_ERROR:
            return {...state, errorMessage: action.payload};
        case FETCH_STUDENTS:
            return action.payload || false;
        default:
            return state;
    }
}


