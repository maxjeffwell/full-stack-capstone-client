import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <div>
                <Link to="/">Home</Link>
                <Link to="/signup">Register</Link>
                <Link to="/signin">Sign In</Link>
                <Link to="/logout">Log Out</Link>
                <Link to="/feature">Feature</Link>
            </div>
        );
    }
}

export default Header;
