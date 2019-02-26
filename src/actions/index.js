// Write function to retrieve json
// Make an ajax request

import { API_BASE_URL } from '../config';

import axios from 'axios';
import { AUTH_USER, AUTH_ERROR, FETCH_STUDENTS, FETCH_STUDENT, DELETE_STUDENT, TOGGLE_SIDEBAR, REGISTER_USER_REQUEST, REGISTER_USER_ERROR, TOGGLE_MODAL } from './types';

export const signup = (formProps, callback) => async dispatch => {
    try {
        const response = await axios.post(`${API_BASE_URL}/signup`, formProps);
        dispatch({ type: AUTH_USER, payload: response.data.token });

        localStorage.setItem('jwtToken', response.data.token);
        callback();
    } catch(e) {
        dispatch({ type: REGISTER_USER_ERROR, payload: 'This email is in use. Please register using a different email.' });
    }
};

export const signin = (formProps, callback) => async dispatch => {
    try {
        const response = await axios.post(`${API_BASE_URL}/signin`, formProps);
        dispatch({ type: AUTH_USER, payload: response.data.token });

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

export const fetchStudent = id => async dispatch => {
    let token = localStorage.getItem('jwtToken');
    let config = { headers: {'Authorization': "bearer " + token} };

    const res = await axios.get(`${API_BASE_URL}/students/${id}`, config)

    dispatch({ type: FETCH_STUDENT, payload: res.data });
};

export const signout = () => {
    localStorage.removeItem('jwtToken');
    return {
        type: AUTH_USER,
        payload: '' // clear authenticated piece of state
    };
};

export const toggleSidebar = () => ({
    type: TOGGLE_SIDEBAR });

export const deleteStudent = (id) => async dispatch => {
    let token = localStorage.getItem('jwtToken');
    let config = { headers: {'Authorization': "bearer " + token} };

    await axios.delete(`${API_BASE_URL}/students/${id}`, config);

    return dispatch({ type: DELETE_STUDENT, payload: id });
};

export const registerUserRequest = () => ({
    type: REGISTER_USER_REQUEST });

export const toggleModal = () => ({
    type: TOGGLE_MODAL });




