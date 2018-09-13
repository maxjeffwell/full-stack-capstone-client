// placeholder for now

import React, { Component } from 'react';
import authRequired from './authRequired';

class Feature extends Component { // class-based component because we'll use a lifecycle method to fetch protected data from backend api anytime the feature component is shown
    render() {
        return <div>Feature</div>;
    }
}

export default authRequired(Feature);
