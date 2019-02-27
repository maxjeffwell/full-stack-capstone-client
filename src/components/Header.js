import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu } from 'semantic-ui-react';
import styled from 'styled-components';

import LazyImage from './LazyImage';
import logo from '../logo/logo.png';

const StyledMenu = styled(Menu)`
  &&& {
    display: flex;
    border: 5px solid ${props => props.theme.orange};
    border-radius: 5px;
    margin-bottom: 50px;
    flex-wrap: wrap;
    min-width: 420px;
    height: auto;
  }
  &&& .header {
    background: ${props => props.theme.green};
  }
  &&& a.header.item {
    width: 75px;
    position: absolute;
    white-space: nowrap;
  }
  &&& a.item {
   font-size: 2em;
   font-weight: 700;
   font-family: 'Roboto', 'sans-serif';
   color: ${props => props.theme.blue};
   text-align: center;
   white-space: nowrap;
   &:hover:not([disabled]) {
    box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
    border: 5px solid ${props => props.theme.green};
    background-color: ${props => props.theme.blue};
    color: ${props => props.theme.white};
    }
  }
  &&& header.item {
    width: 75px;
    position: static;
  }
`;

class Header extends Component {
    showLinks() {
        if (this.props.authenticated) {
            return (
              <StyledMenu stackable borderless>
                  <Menu.Item as="header">
                    <LazyImage src={logo} />
                  </Menu.Item>
                  <Menu.Menu position="left">
                      <Menu.Item as={Link} name="Instructor Dashboard" to="/dashboard">
                      </Menu.Item>
                  </Menu.Menu>
                <Menu.Menu position="right">
                    <Menu.Item as={Link} name="Student List" to="/students">
                    </Menu.Item>
                      <Menu.Item as={Link} name="Logout" to="/signout">
                      </Menu.Item>
                  </Menu.Menu>
              </StyledMenu>
            );
        } else {
            return (
              <StyledMenu stackable borderless>
                <Menu.Menu position="left">
                    <Menu.Item as="header">
                      <LazyImage src={logo} />
                    </Menu.Item>
                </Menu.Menu>
                <Menu.Menu>
                  <Menu.Item as={Link} name="educationelly" to="/">
                    educationELLy
                  </Menu.Item>
                </Menu.Menu>
                    <Menu.Menu position="right">
                      <Menu.Item as={Link} name="Register" to="/Signup">
                      </Menu.Item>
                      <Menu.Item as={Link} name="Login" to="/Signin">
                      </Menu.Item>
                </Menu.Menu>
              </StyledMenu>
            );
        }
    };

    render() {
        return (
            <Menu.Header>
            {this.showLinks()}
            </Menu.Header>
        );
    };
}

function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(Header);
