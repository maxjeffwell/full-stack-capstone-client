// Higher Order Component

import React, { Component } from 'react';
import { connect } from 'react-redux';

export default ChildComponent => {
    class ComposedComponent extends Component {
        componentDidMount() { // rendered component
            this.shouldNavigateAway();
        }
        componentDidUpdate() { // updated component
            this.shouldNavigateAway();
        }
        shouldNavigateAway() {
            if (!this.props.auth) {
                this.props.history.push('/');
            }
        }
        render() {
            return <ChildComponent {...this.props} />;
        }
    }
    function mapStateToProps(state) {
        return { auth: state.auth.authenticated };

        // auth piece of state is a boolean saying yes signed in or no. Here, it references an object with an authenticated       //  property to check if user is logged in
    }
    return connect(mapStateToProps)(ComposedComponent);
};
