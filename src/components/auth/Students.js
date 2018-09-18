import React, { Component } from 'react';
import authRequired from '../authRequired';

class Students extends Component { // class-based component because we'll use a lifecycle method to fetch protected data from backend api anytime the feature component is shown
    render() {
        return <div>
            <button onClick={
                () => console.log('This should take you to Students endpoint')}>Search All</button>
        </div>;
    }
}

export default authRequired(Students);
