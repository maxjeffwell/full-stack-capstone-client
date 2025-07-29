import React, { memo, useMemo, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
    overflow: hidden;
    box-sizing: border-box;
  }
  &&& a.item {
    font-size: 1.8em;
    font-weight: 700;
    font-family: 'Roboto', 'sans-serif';
    color: ${props => props.theme.blue};
    text-align: center;
    white-space: nowrap;
    padding: 0.8em 1em;
    box-sizing: border-box;
  }

  /* Responsive font sizing */
  @media (max-width: 1024px) {
    &&& a.item {
      font-size: 1.4em;
      padding: 0.6em 0.8em;
    }
  }

  @media (max-width: 900px) {
    &&& a.item {
      font-size: 1.2em;
      padding: 0.5em 0.6em;
    }
  }
  &&& :hover:not([disabled]) {
    box-shadow: inset 6.5em 0 0 0 var(--hover);
    background-color: ${props => props.theme.blue};
    color: ${props => props.theme.white};
  }
  &&& :active:not([disabled]) {
    color: mediumpurple;
    background-color: white;
  }
  &&& :focus,
  &&& :focus-visible {
    outline: none !important;
    box-shadow: none !important;
    background-color: transparent !important;
    color: ${props => props.theme.blue} !important;
  }

  &&& a.item:focus,
  &&& a.item:focus-visible {
    outline: none !important;
    box-shadow: none !important;
    background-color: transparent !important;
    color: ${props => props.theme.blue} !important;
  }

  /* Prevent stacking on larger screens */
  @media (min-width: 769px) {
    &&&
      .ui.menu:not(.secondary):not(.text):not(.tabular):not(.borderless)
      > .dropdown.item:before,
    &&&
      .ui.menu:not(.secondary):not(.text):not(.tabular):not(.borderless)
      > .item:before {
      position: absolute;
      content: '';
      top: 0%;
      right: 0px;
      height: 100%;
      width: 1px;
      background: rgba(34, 36, 38, 0.1);
    }

    &&& .ui.stackable.menu {
      flex-direction: row !important;
    }

    &&& .ui.stackable.menu .item {
      width: auto !important;
      display: inline-flex !important;
    }

    &&& .ui.stackable.menu .right.menu {
      display: flex !important;
      flex-direction: row !important;
      margin-left: auto !important;
      flex-wrap: wrap !important;
    }

    &&& .ui.stackable.menu .right.menu .item {
      flex: 0 0 auto !important;
      min-width: 0 !important;
    }
  }
`;

const Header = memo(() => {
  const isAuthenticated = useSelector(selectAuth);
  const navigate = useNavigate();

  const handleMenuItemClick = useCallback(
    (e, to) => {
      // Prevent default behavior that might cause highlighting
      e.preventDefault();

      // Remove focus to prevent persistent highlighting
      const target = e.currentTarget || e.target;
      if (target && target.blur) {
        target.blur();
      }

      // Also blur any focused element immediately
      if (document.activeElement && document.activeElement.blur) {
        document.activeElement.blur();
      }

      // Navigate using React Router
      if (to) {
        navigate(to);
      }
    },
    [navigate]
  );

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
            <Menu.Item
              as={Link}
              name="Instructor Dashboard"
              to="/dashboard"
              onClick={e => handleMenuItemClick(e, '/dashboard')}
            >
              Instructor Dashboard
            </Menu.Item>
            <Menu.Item
              as={Link}
              name="Student List"
              to="/students"
              onClick={e => handleMenuItemClick(e, '/students')}
            >
              Student List
            </Menu.Item>
            <Menu.Item
              as={Link}
              name="Add New Student"
              to="/students/new"
              onClick={e => handleMenuItemClick(e, '/students/new')}
            >
              Add New Student
            </Menu.Item>
            <Menu.Item
              as={Link}
              name="Log Out"
              to="/signout"
              onClick={e => handleMenuItemClick(e, '/signout')}
            >
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
          <Menu.Item
            as={Link}
            name="Register"
            to="/signup"
            onClick={e => handleMenuItemClick(e, '/signup')}
          >
            Register
          </Menu.Item>
          <Menu.Item
            as={Link}
            name="Log In"
            to="/signin"
            onClick={e => handleMenuItemClick(e, '/signin')}
          >
            Log In
          </Menu.Item>
        </Menu.Menu>
      </StyledMenu>
    );
  }, [isAuthenticated, handleMenuItemClick]);

  return navigation;
});

Header.displayName = 'Header';

export default Header;
