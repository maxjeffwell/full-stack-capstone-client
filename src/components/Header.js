import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Menu } from 'semantic-ui-react';
import styled from 'styled-components';

const StyledMenu = styled(Menu)`
  &&& .header {
    margin-bottom: 20px;
    font-size: 2em;
    font-weight: bold;
    font-family: 'Roboto', 'sans-serif';
    background: ${props => props.theme.green};
  }
    &&& a {
      font-size: 1.5em;
      font-weight: bold;
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
                    <Menu.Item name="authenticated">
                      <Link to="/dashboard">Teacher Dashboard</Link>
                    </Menu.Item>
                  </Menu.Menu>

                  <Menu.Menu position="right">
                    <Menu.Item name="authenticated">
                      <Link to="/signout">Log out</Link>
                      <Link to="/students">Students</Link>
                    </Menu.Item>
                  </Menu.Menu>
                </StyledContainer>
              </StyledMenu>
            );
        } else {
            return (
              <Menu>
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
              </Menu>
            );
        }
    };

    render() {
        return (
            <Menu.Header>
                <Link to="/">educationELLy</Link>
                {this.showLinks()}
            </Menu.Header>
        );
    };
}

function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(Header);
