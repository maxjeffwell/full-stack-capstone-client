import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Menu } from 'semantic-ui-react';

class Header extends Component {
    showLinks() {
        if (this.props.authenticated) {
            return (
              <Menu>
                <Container>
                  <Menu.Item as="a" header>
                  </Menu.Item>

                  <Menu.Menu position="right">
                    <Menu.Item as="a" name="authenticated">
                      <Link to="/signout">Log out</Link>
                      <Link to="/students">Students</Link>
                    </Menu.Item>
                  </Menu.Menu>
                </Container>
              </Menu>
            );
        } else {
            return (
              <Menu>
                  <Container>
                    <Menu.Item as="a" header>
                    </Menu.Item>

                    <Menu.Menu position="right">
                      <Menu.Item as="a" name="unauthenticated">
                        <Link to="/signup">Register</Link>
                        <Link to="/signin">Log in</Link>
                      </Menu.Item>
                    </Menu.Menu>
                  </Container>
              </Menu>
            );
        }
    }

    render() {
        return (
            <Menu.Header>
                <Link to="/">educationELLy</Link>
                {this.showLinks()}
            </Menu.Header>
        );
    }
}

function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(Header);
