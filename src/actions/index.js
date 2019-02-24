// Write function to retrieve json
// Make an ajax request

import { API_BASE_URL } from '../config';

import axios from 'axios';
import { AUTH_USER, AUTH_ERROR, FETCH_STUDENTS, DELETE_STUDENT, TOGGLE_SIDEBAR } from './types';

export const signup = (formProps, callback) => async dispatch => {
    try {
        const response = await axios.post(`${API_BASE_URL}/signup`, formProps);
        dispatch({ type: AUTH_USER, payload: response.data.token });

        // store JWT token

        localStorage.setItem('jwtToken', response.data.token);
        callback();
    } catch(e) {
        dispatch({ type: AUTH_ERROR, payload: 'This email is in use. Please register using a different email.' });
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
        dispatch({ type: AUTH_ERROR, payload: 'Invalid login email or password. Please try logging in again.' });
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
    type: TOGGLE_SIDEBAR
});

export const deleteStudent = (id) => async dispatch => {
    let token = localStorage.getItem('jwtToken');
    let config = { headers: {'Authorization': "bearer " + token} };

    const res = await axios.delete(`${API_BASE_URL}/students/${id}`, config);

    dispatch({ type: DELETE_STUDENT, payload: res.data});
};




