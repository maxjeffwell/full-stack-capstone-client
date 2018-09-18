import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './HeaderStyle.css';

class Header extends Component {
    showLinks() {
        if (this.props.authenticated) {
            return (
                <div>
                    <Link to="/signout">Log out</Link>
                    <Link to="/students">Students</Link>
                </div>
            );
        } else {
            return (
                <div>
                    <Link to="/signup">Register</Link>
                    <Link to="/signin">Log in</Link>
                </div>
            );
        }
    }

    render() {
        return (
            <div className="header">
                <Link to="/">educationELLy</Link>
                {this.showLinks()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(Header);
