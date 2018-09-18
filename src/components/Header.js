import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './HeaderStyle.css';

class Header extends Component {
    showLinks() {
        // check to see if user is signed in - if they are, show Log Out and Feature components. If not, show Sign Up and Sign In components
    if (this.props.authenticated) {
        return (
            <div className="nav-wrapper">
                <a className="brand-logo center">educationELLy</a>
                <Link to="/signout">Log Out</Link>
                <Link to="/students">Students</Link>
            </div>
        );
    } else {
        return (
            <div className="nav-wrapper">
                <a className="brand-logo center">educationELLy</a>
                <Link to="/signup">Register</Link>
                <Link to="/signin">Sign In</Link>
            </div>
        )
    }
    }

    render() {
        return (
            <div className="header">
                <Link to="/">Home</Link>
                {this.showLinks()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated
    };
} // now header component knows whether the user is authenticated

export default connect(mapStateToProps)(Header);
