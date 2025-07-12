import React, { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Menu } from 'semantic-ui-react';
import styled from 'styled-components';

import { selectAuth } from '../store/slices/authSlice';
import LazyImage from './LazyImage';
import logo from '../logo/logo.png';

const StyledMenu = styled(Menu)`
  &&& {
    border: 5px solid ${props => props.theme.orange};
    border-radius: 5px;
    margin-top: 5px;
    margin-bottom: 30px;
  }
  &&& a.item {
    font-size: 2em;
    font-weight: 700;
    font-family: 'Roboto', 'sans-serif';
    color: ${props => props.theme.blue};
    text-align: center;
    white-space: nowrap;
  }
  &&& :hover:not([disabled]),
  :focus {
    box-shadow: inset 6.5em 0 0 0 var(--hover);
    background-color: ${props => props.theme.blue};
    color: ${props => props.theme.white};
  }
  &&& :active:not([disabled]),
  :focus {
    color: mediumpurple;
    background-color: white;
  }
`;

const Header = memo(() => {
  const isAuthenticated = useSelector(selectAuth);

  const navigation = useMemo(() => {
    const logoItem = (
      <Menu.Menu position="left" key="logo">
        <Menu.Item as="header">
          <LazyImage src={logo} alt="educationELLy logo" />
        </Menu.Item>
      </Menu.Menu>
    );

    if (isAuthenticated) {
      return (
        <StyledMenu stackable size="small" borderless>
          {logoItem}
          <Menu.Menu position="right">
            <Menu.Item as={Link} name="Instructor Dashboard" to="/dashboard">
              Instructor Dashboard
            </Menu.Item>
            <Menu.Item as={Link} name="Student List" to="/students">
              Student List
            </Menu.Item>
            <Menu.Item as={Link} name="Add New Student" to="/students/new">
              Add New Student
            </Menu.Item>
            <Menu.Item as={Link} name="Log Out" to="/signout">
              Log Out
            </Menu.Item>
          </Menu.Menu>
        </StyledMenu>
      );
    }

    return (
      <StyledMenu stackable size="small" borderless>
        {logoItem}
        <Menu.Menu position="right">
          <Menu.Item as={Link} name="Register" to="/signup">
            Register
          </Menu.Item>
          <Menu.Item as={Link} name="Log In" to="/signin">
            Log In
          </Menu.Item>
        </Menu.Menu>
      </StyledMenu>
    );
  }, [isAuthenticated]);

  return navigation;
});

Header.displayName = 'Header';

export default Header;
