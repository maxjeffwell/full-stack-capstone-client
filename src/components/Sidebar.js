import React, { Component, Fragment } from 'react';
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
  &:hover:not([disabled]) {
      box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
      background-color: ${props => props.theme.orange};
      border: 5px solid ${props => props.theme.green};
      border-radius: 5px;
      padding: 0px 5px 0px 5px;
      text-decoration: none;
    }
`;

const StyledMenu = styled(Menu.Menu)`
  margin-top: 20px;
  display: grid;
`;

const StyledHeader = styled(Header)`
  &&& {
    min-width: 290px;
    font-family: 'Roboto', 'sans-serif';
    font-size: 1.25em;
    font-weight: bold;
    color: ${props => props.theme.blue};
    background: ${props => props.theme.green};
    border: 2px solid ${props => props.theme.orange};
    height: 50%;
    width: fit-content;
    border-radius: 5px;
    text-align: center;
    padding: 2px 10px 10px 5px;
    white-space: nowrap;
    margin-top: 15px;
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
            Create New Student
          </StyledHeader>
          <Menu.Item>
            <Fragment>
              <CreateStudent />
            </Fragment>
          </Menu.Item>
        </StyledMenu>
      );
    }
  }

const mapStateToProps = state => ({
  isToggled: state.isSidebarToggled
});

export default connect(mapStateToProps)(Sidebar);
