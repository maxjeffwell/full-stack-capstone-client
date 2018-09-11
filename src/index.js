import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducers from './reducers';
import App from './components/App';
import Landing from './components/Landing';
import Register from './components/auth/Register';

ReactDOM.render (
    <Provider store={createStore(reducers, {})}>
    <BrowserRouter>
    <App>
        <Route path='/' exact component={Landing} />
        <Route path='/register' component={Register} />
    </App>
    </BrowserRouter>
    </Provider>,
        document.querySelector('#root')
);

