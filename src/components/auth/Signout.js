import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Header, Grid } from 'semantic-ui-react';

import * as actions from '../../actions';
import { Link } from 'react-router-dom';

class Signout extends Component { // create class based component in order to use lifecycle method
    componentDidMount() {
        this.props.signout();

        // as soon as component is rendered call action creator and that signs user out of app by
        // removing authenticated JWT from reducer

    }

    render() {

        return (
            <Grid centered columns={2}>
                <Header as="h2" textAlign="center">
                    You have successfully logged out
                </Header>
                    <Link to="/signin">Login</Link>
                    <Link to="/dashboard">Home</Link>
            </Grid>
        );
    };
}

export default connect(null, actions)(Signout);

