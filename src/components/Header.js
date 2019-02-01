import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Menu } from 'semantic-ui-react';
import styled from 'styled-components';

const StyledMenu = styled(Menu)`
  &&& .header {
    background: ${props => props.theme.green};
  }
  &&& a.item {
   font-size: 1.2em;
   font-weight: bold;
   font-family: 'Roboto', 'sans-serif';
   color: ${props => props.theme.green};
  }
`;

const StyledContainer = styled(Container) `
  &&& {
    margin-bottom: 20px;
  }
`;

class Header extends Component {
    showLinks() {
        if (this.props.authenticated) {
            return (
              <StyledMenu>
                <StyledContainer>
                  <Menu.Item as="a" header>
                  </Menu.Item>
                  <Menu.Menu position="left">
                      <Menu.Item as={Link} name="dashboard" to="/dashboard">
                      </Menu.Item>
                  </Menu.Menu>

                  <Menu.Menu position="right">
                    <Menu.Item as={Link} name="Students" to="/students">
                    </Menu.Item>
                      <Menu.Item as={Link} name="Logout" to="/signout">
                      </Menu.Item>
                  </Menu.Menu>
                </StyledContainer>
              </StyledMenu>
            );
        } else {
            return (
              <StyledMenu>
                  <Container>
                    <Menu.Item as="a" header>
                    </Menu.Item>
                    <Menu.Menu position="right">
                      <Menu.Item as={Link} name="Register" to="/Signup">
                      </Menu.Item>
                        <Menu.Item as={Link} name="Login" to="/Signin">
                      </Menu.Item>
                    </Menu.Menu>

                  </Container>
              </StyledMenu>
            );
        }
    };

    render() {
        return (
            <Menu.Header as={Link} name="educationELLy" to="/">
                {this.showLinks()}
            </Menu.Header>
        );
    };
}

function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(Header);
