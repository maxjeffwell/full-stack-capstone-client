import React, { memo, useMemo, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Menu } from 'semantic-ui-react';
import styled from 'styled-components';

import { selectAuth } from '../store/slices/authSlice';
import LazyImage from './LazyImage';
import logo from '../logo/logo.png';

const CustomNavContainer = styled.div`
  border: 5px solid ${props => props.theme.orange};
  border-radius: 5px;
  margin-top: 5px;
  margin-bottom: 30px;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  background: white;

  .logo-section {
    display: flex;
    align-items: center;
    padding: 0.5em;
  }

  .nav-section {
    display: flex;
    align-items: center;
    gap: 0;
  }

  .nav-item {
    font-size: 1.8em;
    font-weight: 700;
    font-family: 'Roboto', 'sans-serif';
    color: ${props => props.theme.blue};
    text-align: center;
    white-space: nowrap;
    padding: 0.8em 1em;
    box-sizing: border-box;
    cursor: pointer;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    border: none;
    background: none;
    outline: none !important;

    &:hover {
      box-shadow: inset 6.5em 0 0 0 var(--hover);
      background-color: ${props => props.theme.blue};
      color: ${props => props.theme.white};
    }

    &:focus,
    &:focus-visible,
    &:active {
      outline: none !important;
      box-shadow: none !important;
      background-color: transparent !important;
      color: ${props => props.theme.blue} !important;
    }
  }

  /* Responsive font sizing */
  @media (max-width: 1200px) {
    .nav-item {
      font-size: 1.5em;
      padding: 0.7em 0.9em;
    }
  }

  @media (max-width: 1024px) {
    .nav-item {
      font-size: 1.3em;
      padding: 0.6em 0.8em;
    }
  }

  @media (max-width: 900px) {
    .nav-item {
      font-size: 1.1em;
      padding: 0.5em 0.6em;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;

    .nav-section {
      flex-direction: column;
      width: 100%;
    }

    .nav-item {
      font-size: 1em;
      padding: 0.4em 0.5em;
      width: 100%;
      justify-content: center;
    }
  }
`;

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
  @media (max-width: 1200px) {
    &&& a.item,
    &&& .custom-nav-item {
      font-size: 1.5em;
      padding: 0.7em 0.9em;
    }
  }

  @media (max-width: 1024px) {
    &&& a.item,
    &&& .custom-nav-item {
      font-size: 1.3em;
      padding: 0.6em 0.8em;
    }
  }

  @media (max-width: 900px) {
    &&& a.item,
    &&& .custom-nav-item {
      font-size: 1.1em;
      padding: 0.5em 0.6em;
    }
  }

  @media (max-width: 768px) {
    &&& a.item,
    &&& .custom-nav-item {
      font-size: 1em;
      padding: 0.4em 0.5em;
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
  &&& a.item:focus-visible,
  &&& .custom-nav-item:focus,
  &&& .custom-nav-item:focus-visible {
    outline: none !important;
    box-shadow: none !important;
    background-color: transparent !important;
    color: ${props => props.theme.blue} !important;
  }

  &&& .custom-nav-item {
    font-size: 1.8em;
    font-weight: 700;
    font-family: 'Roboto', 'sans-serif';
    color: ${props => props.theme.blue};
    text-align: center;
    white-space: nowrap;
    padding: 0.8em 1em;
    box-sizing: border-box;
    cursor: pointer;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    border: none;
    background: none;
  }

  &&& .custom-nav-item:hover {
    box-shadow: inset 6.5em 0 0 0 var(--hover);
    background-color: ${props => props.theme.blue};
    color: ${props => props.theme.white};
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
    if (isAuthenticated) {
      return (
        <CustomNavContainer>
          <div className="logo-section">
            <LazyImage src={logo} alt="educationELLy logo" />
          </div>
          <div className="nav-section">
            <button
              className="nav-item"
              onClick={e => handleMenuItemClick(e, '/dashboard')}
            >
              Instructor Dashboard
            </button>
            <button
              className="nav-item"
              onClick={e => handleMenuItemClick(e, '/students')}
            >
              Student List
            </button>
            <button
              className="nav-item"
              onClick={e => handleMenuItemClick(e, '/students/new')}
            >
              Add New Student
            </button>
            <button
              className="nav-item"
              onClick={e => handleMenuItemClick(e, '/signout')}
            >
              Log Out
            </button>
          </div>
        </CustomNavContainer>
      );
    }

    return (
      <CustomNavContainer>
        <div className="logo-section">
          <LazyImage src={logo} alt="educationELLy logo" />
        </div>
        <div className="nav-section">
          <button
            className="nav-item"
            onClick={e => handleMenuItemClick(e, '/signup')}
          >
            Register
          </button>
          <button
            className="nav-item"
            onClick={e => handleMenuItemClick(e, '/signin')}
          >
            Log In
          </button>
        </div>
      </CustomNavContainer>
    );
  }, [isAuthenticated, handleMenuItemClick]);

  return navigation;
});

Header.displayName = 'Header';

export default Header;
