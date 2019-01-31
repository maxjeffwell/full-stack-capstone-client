// Write function to retrieve json
// Make an ajax request

import { API_BASE_URL } from '../config';

import axios from 'axios';
import { AUTH_USER, AUTH_ERROR, FETCH_STUDENTS, TOGGLE_SIDEBAR } from './types';

export const signup = (formProps, callback) => async dispatch => {
    try {
        const response = await axios.post(`${API_BASE_URL}/signup`, formProps);
        dispatch({ type: AUTH_USER, payload: response.data.token });

        // store JWT token

        localStorage.setItem('jwtToken', response.data.token);
        callback();
    } catch(e) {
        dispatch({ type: AUTH_ERROR, payload: 'This email is in use' });
    }
};

export const signin = (formProps, callback) => async dispatch => {
    try {
        const response = await axios.post(`${API_BASE_URL}/signin`, formProps);
        dispatch({ type: AUTH_USER, payload: response.data.token });

        // store JWT token

        localStorage.setItem('jwtToken', response.data.token);
        callback();

    } catch(e) {
        dispatch({ type: AUTH_ERROR, payload: 'Invalid login email or password' });
    }
};

export const fetchStudents = () => async dispatch => {
    let token = localStorage.getItem('jwtToken');
    let config = { headers: {'Authorization': "bearer " + token} };

    const res = await axios.get(`${API_BASE_URL}/students`, config);

    dispatch({ type: FETCH_STUDENTS, payload: res.data });
};

export const signout = () => {
    localStorage.removeItem('jwtToken');
    return {
        type: AUTH_USER,
        payload: '' // clear authenticated piece of state
    };
};

export const toggleSidebar = () => ({
    type: TOGGLE_SIDEBAR,
});




