import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Container } from 'semantic-ui-react';
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
          <Menu.Header>
            Create a New Student
          </Menu.Header>
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
