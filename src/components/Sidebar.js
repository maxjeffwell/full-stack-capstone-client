import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Container, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components'

import CreateStudent from './CreateStudent';

const StyledContainer = styled(Container)`
  &&& {
    font-size: 1.5em;
    font-family: "Roboto", "sans-serif";
    font-weight: bold;
    color: ${props => props.theme.blue};
  }
 &&& #sidebar.menu {
    font-family: "Roboto", "sans-serif";
    font-weight: bold;
  }
`;

const StyledMenu = styled(Menu.Menu)`
  margin-top: 20px;
`;

const StyledHeader = styled(Header)`
  &&& {
    font-family: 'Roboto', 'sans-serif';
    font-size: 1em;
    font-weight: bold;
    color: ${props => props.theme.blue};
    background: ${props => props.theme.green};
    border: 2px solid ${props => props.theme.orange};
    height: 50%;
    width: 25%;
    border-radius: 5px;
    text-align: center;
  }
  `;

class Sidebar extends Component {
  static propTypes = {
    isToggled: PropTypes.bool.isRequired
  };

  render() {
    const { isToggled } = this.props;

      return (
        <StyledMenu id="sidebar" vertical={this.props.toString()}
                   className={isToggled ? 'toggled' : ''}>
          <Menu.Item>
            <StyledContainer as={Link} name="students" to="/students">
              Access Your Student List
            </StyledContainer>
          </Menu.Item>
          <StyledHeader>
            Create a New Student
          </StyledHeader>
          <Menu.Item>
            <StyledContainer>
              <CreateStudent />
            </StyledContainer>
          </Menu.Item>
        </StyledMenu>
      );
    }
  }

const mapStateToProps = state => ({
  isToggled: state.isSidebarToggled
});

export default connect(mapStateToProps)(Sidebar);
