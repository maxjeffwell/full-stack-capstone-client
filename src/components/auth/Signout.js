// create class-based component in order to use lifecycle method

import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signout extends Component {
    componentDidMount() {
        this.props.signout(); // as soon as component is rendered call action creator and that signs user out of app by removing authenticated JWT out of reducer
    }
    render() {
        return <div>You have been logged out</div>;
    }
}

export default connect(null, actions)(Signout);
