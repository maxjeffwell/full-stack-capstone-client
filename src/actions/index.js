import axios from 'axios';
import { AUTH_USER, AUTH_ERROR } from './types';

export const signup = (formProps, callback) => async dispatch => {
    try {
        const response = await axios.post('http://localhost:8080/signup', formProps);
        dispatch({type: AUTH_USER, payload: response.data.token});

        // store JWT token

        localStorage.setItem('jwtToken', response.data.token);
        callback();
    } catch(e) {
        dispatch({ type: AUTH_ERROR, payload: 'Email is in use'});
    }
};

export const signin = (formProps, callback) => async dispatch => {
    try {
        const response = await axios.post('http://localhost:8080/signin', formProps);
        dispatch({type: AUTH_USER, payload: response.data.token});
        callback();
    } catch(e) {
        dispatch({ type: AUTH_ERROR, payload: 'Invalid login email or password' });
    }
};

export const signout = () => {
    localStorage.removeItem('jwtToken');
    return {
        type: AUTH_USER,
        payload: '' // clear authenticated piece of state
    };
};


