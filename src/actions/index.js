import axios from 'axios';

import { API_BASE_URL } from '../config';
import {
  AUTH_USER,
  AUTH_ERROR,
  FETCH_STUDENTS,
  FETCH_STUDENT,
  DELETE_STUDENT,
  TOGGLE_SIDEBAR,
  REGISTER_USER_REQUEST,
  REGISTER_USER_ERROR,
} from './types';
import authService from '../utils/auth';

export const signup = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup`, formProps);
    dispatch({ type: AUTH_USER, payload: response.data.token });

    // Use secure auth service instead of localStorage
    authService.setToken(response.data.token);
    if (response.data.refreshToken) {
      authService.setTokens(response.data.token, response.data.refreshToken);
    }
    callback();
  } catch (e) {
    dispatch({
      type: REGISTER_USER_ERROR,
      payload: 'This email is in use. Please register using a different email.',
    });
  }
};

export const signin = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signin`, formProps);
    dispatch({ type: AUTH_USER, payload: response.data.token });

    // Use secure auth service instead of localStorage
    authService.setToken(response.data.token);
    if (response.data.refreshToken) {
      authService.setTokens(response.data.token, response.data.refreshToken);
    }
    callback();
  } catch (e) {
    dispatch({
      type: AUTH_ERROR,
      payload: 'Invalid login email or password. Please try logging in again.',
    });
  }
};

export const fetchStudents = () => async dispatch => {
  // Auth interceptor handles token automatically
  if (!authService.isAuthenticated()) {
    dispatch({ type: AUTH_ERROR, payload: 'No authentication token found' });
    return;
  }

  try {
    const res = await axios.get(`${API_BASE_URL}/students`);
    dispatch({ type: FETCH_STUDENTS, payload: res.data });
  } catch (e) {
    if (e.response && e.response.status === 401) {
      authService.clearTokens();
      dispatch({
        type: AUTH_ERROR,
        payload: 'Session expired. Please log in again.',
      });
    } else {
      dispatch({ type: AUTH_ERROR, payload: 'Failed to fetch students' });
    }
  }
};

export const fetchStudent = id => async dispatch => {
  // Auth interceptor handles token automatically
  if (!authService.isAuthenticated()) {
    dispatch({ type: AUTH_ERROR, payload: 'No authentication token found' });
    return;
  }

  try {
    const res = await axios.get(`${API_BASE_URL}/students/${id}`);
    dispatch({ type: FETCH_STUDENT, payload: res.data });
  } catch (e) {
    if (e.response && e.response.status === 401) {
      authService.clearTokens();
      dispatch({
        type: AUTH_ERROR,
        payload: 'Session expired. Please log in again.',
      });
    } else {
      dispatch({ type: AUTH_ERROR, payload: 'Failed to fetch student' });
    }
  }
};

export const signout = () => {
  authService.clearTokens();
  return {
    type: AUTH_USER,
    payload: '', // clear authenticated piece of state
  };
};

export const toggleSidebar = () => ({
  type: TOGGLE_SIDEBAR,
});

export const registerUserRequest = () => ({
  type: REGISTER_USER_REQUEST,
});

export const deleteStudent = id => async dispatch => {
  // Auth interceptor handles token automatically
  if (!authService.isAuthenticated()) {
    dispatch({ type: AUTH_ERROR, payload: 'No authentication token found' });
    return;
  }

  try {
    await axios.delete(`${API_BASE_URL}/students/${id}`);
    dispatch({ type: DELETE_STUDENT, payload: id });
  } catch (e) {
    if (e.response && e.response.status === 401) {
      authService.clearTokens();
      dispatch({
        type: AUTH_ERROR,
        payload: 'Session expired. Please log in again.',
      });
    } else {
      dispatch({ type: AUTH_ERROR, payload: 'Failed to delete student' });
    }
  }
};
