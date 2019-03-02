// data layer control for redux (app root) - start up redux side of things in the app,
// render root component but limit react configuration here

import React from 'react';
import ReactDOM from 'react-dom';

// BrowserRouter tells react router what to do - looks at current url and changes components visible on screen
// Route is a react component used to set a rule between a certain route in the application and a set of
// components that will be available on screen

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import { ThemeProvider  } from 'styled-components';
import WebFont from 'webfontloader';

import { composeWithDevTools } from 'redux-devtools-extension';

import 'semantic-ui-css/components/button.css';
import 'semantic-ui-css/components/container.css';
import 'semantic-ui-css/components/grid.css';
import 'semantic-ui-css/components/header.css';
import 'semantic-ui-css/components/form.css';
import 'semantic-ui-css/components/icon.css';
import 'semantic-ui-css/components/image.css';
import 'semantic-ui-css/components/segment.css';
import 'semantic-ui-css/components/message.css';
import 'semantic-ui-css/components/card.css';
import 'semantic-ui-css/components/menu.css';
import 'semantic-ui-css/components/input.css';
import 'semantic-ui-css/components/sidebar.css';

import { rootReducer } from './reducers';
import App from './components/App';

WebFont.load({
    google: {
        families: ['Roboto: 400', 'sans-serif']
    },
    timeout: 2000
});

const store = createStore(
  rootReducer,

      // use starting state object to get initializing state inside redux store, pass to store the key of auth
      // piece of state and then value to be initialized when redux store is created (authenticated) and assign to
      // it whatever is returned from localStorage

  {
          auth: { authenticated: localStorage.getItem('jwtToken') }
      }, composeWithDevTools(
        applyMiddleware(reduxThunk)
        )
    );

    const theme = {
        orange: '#fb9438',
        blue: '#2873b4',
        green: '#86c64e',
        white: '#f5f5f5',
    };

ReactDOM.render (

    // ReactDOM - two arguments - root component and where we want to render that component inside of the DOM
    // root component is the app component
    // create redux store at top level of app and connect it to react by placing provider tag
    // provider is a react component (provided by react-redux store) that can read changes from redux store
    // anytime redux store state changes the provider component informs all of its children components

  <ThemeProvider theme={theme}>
  <Provider store={store}>
        <App />
    </Provider>
  </ThemeProvider>,
document.querySelector('#root')
);

