// data layer control for redux (app root) - start up redux side of things in the app,
// render root component but limit react configuration here

import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter, Route } from 'react-router-dom';

// BrowserRouter tells react router what to do - looks at current url and changes components visible on screen
// Route is a react component used to set a rule between a certain route in the application and a set of
// components that will be available on screen

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import reducers from './reducers';
import App from './components/App';
import Landing from './components/Landing';
import Register from './components/auth/Register';
import Students from './components/auth/Students';
import Signin from './components/auth/Signin';
import Signout from './components/auth/Signout';
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import UpdateStudent from "./components/UpdateStudent";

const store = createStore(
    reducers,

    // use starting state object to get initializing state inside redux store, pass to store the key of auth        //  piece of state and then value to be initialized when redux store is created (authenticated) and assign to    //  it whatever is returned from localStorage

    {
        auth: { authenticated: localStorage.getItem('jwtToken') }
    },
    applyMiddleware(reduxThunk)
);

ReactDOM.render (

    // ReactDOM - two arguments - root component and where we want to render that component inside of the DOM
    // root component is the app component
    // create redux store at top level of app and connect it to react by placing provider tag
    // provider is a react component (provided by react-redux store) that can read changes from redux store
    // anytime redux store state changes the provider component informs all of its children components

    <Provider store={store}>
    <BrowserRouter>
    <App>
        <Header />
        <Route exact path='/' component={Landing} />
        <Route path='/signup' component={Register} />
        <Route exact path='/students/:id/update' component={UpdateStudent} />
        <Route exact path='/students' component={Students} />
        <Route path='/signin' component={Signin} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/signout' component={Signout} />

    </App>
    </BrowserRouter>
    </Provider>,
        document.querySelector('#root')
);

