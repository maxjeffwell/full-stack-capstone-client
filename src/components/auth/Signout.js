import React, { Component } from 'react';
import { connect } from 'react-redux';

import { StyledMessage } from './Signin';
import * as actions from '../../actions';

class Signout extends Component { // create class based component in order to use lifecycle method
    componentDidMount() {
        this.props.signout();

        // as soon as component is rendered call action creator and that signs user out of app by
        // removing authenticated JWT from reducer
    }

    render() {

        return (

          <StyledMessage success>
            You have successfully logged out.
          </StyledMessage>
              );
    };
}

export default connect(null, actions)(Signout);

