import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu } from 'semantic-ui-react';
import styled from 'styled-components';

const StyledMenu = styled(Menu)`
  &&& {
    display: flex;
    border: 2px solid ${props => props.theme.orange};
  }
  &&& .header {
    background: ${props => props.theme.green};
  }
  &&& a.item {
   font-size: 2em;
   font-weight: bold;
   font-family: 'Roboto', 'sans-serif';
   color: ${props => props.theme.green};
   text-align: center;
  }
  &&& header.item {
    background-color: ${props => props.theme.green};
    width: 75px;
  }
`;

class Header extends Component {
    showLinks() {
        if (this.props.authenticated) {
            return (
              <StyledMenu borderless>
                  <Menu.Item as="a" header>
                  </Menu.Item>
                  <Menu.Menu position="left">
                      <Menu.Item as={Link} name="Instructor Dashboard" to="/dashboard">
                      </Menu.Item>
                  </Menu.Menu>
                  <Menu.Menu>
                    <Menu.Item as={Link} name="educationelly" to="/">
                      educationELLy
                    </Menu.Item>
                  </Menu.Menu>
                  <Menu.Menu position="right">
                    <Menu.Item as={Link} name="Students" to="/students">
                    </Menu.Item>
                      <Menu.Item as={Link} name="Logout" to="/signout">
                      </Menu.Item>
                  </Menu.Menu>
              </StyledMenu>
            );
        } else {
            return (
              <StyledMenu>
                <Menu.Menu position="left">
                    <Menu.Item as="header">
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
