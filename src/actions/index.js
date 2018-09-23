// Write function to retrieve json
// Make an ajax request

import axios from 'axios';
import { AUTH_USER, AUTH_ERROR, FETCH_STUDENTS } from './types';

export const signup = (formProps, callback) => async dispatch => {
    try {
        const response = await axios.post('http://jmaxwell-fullstack-server.herokuapp.com/signup', formProps);
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
        const response = await axios.post('https://jmaxwell-fullstack-server.herokuapp.com/signin', formProps);
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

    const res = await axios.get('https://jmaxwell-fullstack-server.herokuapp.com/students', config);

    dispatch({ type: FETCH_STUDENTS, payload: res.data });
};

export const signout = () => {
    localStorage.removeItem('jwtToken');
    return {
        type: AUTH_USER,
        payload: '' // clear authenticated piece of state
    };
};




