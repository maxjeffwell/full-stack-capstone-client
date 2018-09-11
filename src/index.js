import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import reducers from './reducers';
import App from './components/App';
import Landing from './components/Landing';
import Register from './components/auth/Register';

const store = createStore(
    reducers,
    {},
    applyMiddleware(reduxThunk)
);

ReactDOM.render (
    <Provider store={store}>
    <BrowserRouter>
    <App>
        <Route path='/' exact component={Landing} />
        <Route path='/signup' component={Register} />
    </App>
    </BrowserRouter>
    </Provider>,
        document.querySelector('#root')
);

