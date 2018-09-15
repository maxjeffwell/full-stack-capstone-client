import axios from 'axios';
import { AUTH_USER, AUTH_ERROR } from './types';

// export const signup  = ({ email, password }) => { // creating an action creator called signup
//     return { // inside action creator we always return an object that has a type property and a payload
//         type: auth_user, // action creators usually return an action that is sent to redux thunk middleware, is then sent to the reducers, and reducers produce our news state that flows back into our components
//         payload: 'asdfasdf' // process is made possible by the redux dispatch function. we give it an action (a plain JS object with the type property and the dispatch function funnels that action object through our middleware and through our reducers and application state updates. dispatch function is how we initiate change in our redux app
//     };
// };

// redux thunk will allow us to return a different value type from our action creators. with redux thunk installed we can return either an action object or a function from our action creators. if we return a function it will be automatically called with the dispatch function - gives us total control over dispatch process.

// export const signup = ({ email, password }) => {
//     return function(dispatch) {
//         dispatch({type: AUTH_USER}); // dispatch gives us the ability to return as many actions as we
//         dispatch({type: AUTH_USER}); // want at any time that we want from a single action creator
//         request.then(() => {
//             dispatch({type: AUTH_USER}); // async request with request object - can wait for promise to       resolve and inside of the callback we could dispatch an action
//     })
//     }
// };

export const signup = (formProps, callback) => async dispatch => {
    try {
        const response = await axios.post('http://localhost:8080/signup', formProps);
        dispatch({type: AUTH_USER, payload: response.data.token});
        // store JWT token
        localStorage.setItem('jwtToken', response.data.token);
        callback();
    } catch(e) {
        dispatch({ type: AUTH_ERROR, payload: 'Email is in use' });
    }
};

export const signin = (formProps, callback) => async dispatch => { // typical redux
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
        type: AUTH_USER, // re-use same type we used to sign up user
        payload: '' // clear authenticated piece of state
    };
};


