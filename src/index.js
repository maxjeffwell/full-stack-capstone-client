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
import Feature from './components/Feature';
import Signin from './components/auth/Signin';
import Signout from './components/auth/Signout';

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
        <Route path='/feature' component={Feature} />
        <Route path='/signin' component={Signin} />
        <Route path='/signout' component={Signout} />
    </App>
    </BrowserRouter>
    </Provider>,
        document.querySelector('#root')
);

