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
    background-color: ${props => props.theme.orange};
    border: 3px solid ${props => props.theme.green};
    border-radius: 5px;
    text-decoration: none;
    text-align: center;
    margin: auto;
    padding: 2px 10px 0 10px;
  }
 &&& #sidebar.menu {
    font-family: "Roboto", "sans-serif";
    font-weight: bold;
  }
 &:hover:not([disabled]) {
      background-color: ${props => props.theme.blue};
      color: ${props => props.theme.white};
      border: 5px solid ${props => props.theme.orange};
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
    padding: 0 5px 22px 5px;
    white-space: nowrap;
    margin: 15px auto 0;
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
            Create A New Student
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
