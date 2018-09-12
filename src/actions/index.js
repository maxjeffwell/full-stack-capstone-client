const API_SERVER = "http://localhost:8080";


import axios from 'axios';
import { AUTH_USER } from './types';

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

export const signup = formProps => (dispatch) => { // typical redux thunk action creator format
    // making a request, signing up, and calling dispatch with our action will occur inside the function body here
// action creator is returning a single value

    axios.post(`${API_SERVER}/signup`, formProps);
};



