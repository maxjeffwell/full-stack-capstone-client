import React, { memo, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
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
    padding-right: 10px;
  }

  .nav-item {
    font-size: 1.3em;
    font-weight: 700;
    font-family: 'Roboto', 'sans-serif';
    color: ${props => props.theme.blue};
    text-align: center;
    white-space: nowrap;
    padding: 0.6em 0.5em;
    box-sizing: border-box;
    cursor: pointer;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    border: none;
    background: none;
    outline: none !important;
    transition: all 0.2s ease;

    &:hover {
      box-shadow: inset 6.5em 0 0 0 var(--hover);
      background-color: ${props => props.theme.blue};
      color: ${props => props.theme.white};
    }

    &:focus,
    &:focus-visible,
    &:active,
    &:focus-within {
      outline: none !important;
      box-shadow: none !important;
      background-color: transparent !important;
      color: ${props => props.theme.blue} !important;
    }
  }

  /* Responsive font sizing */
  @media (max-width: 1200px) {
    .nav-item {
      font-size: 1.1em;
      padding: 0.5em 0.4em;
    }
  }

  @media (max-width: 1024px) {
    .nav-item {
      font-size: 1em;
      padding: 0.4em 0.3em;
    }
  }

  @media (max-width: 900px) {
    .nav-item {
      font-size: 0.9em;
      padding: 0.3em 0.2em;
    }
  }

  @media (max-width: 820px) {
    .nav-item {
      font-size: 0.8em;
      padding: 0.25em 0.15em;
    }
  }

  @media (max-width: 790px) {
    .nav-item {
      font-size: 0.75em;
      padding: 0.2em 0.1em;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;

    .logo-section {
      padding: 1em;
    }

    .nav-section {
      flex-direction: column;
      width: 100%;
      padding-right: 0;
    }

    .nav-item {
      font-size: 0.9em;
      padding: 0.4em 0.3em;
      width: 100%;
      justify-content: center;
      white-space: normal;
      text-align: center;
      line-height: 1.2;
    }
  }

  /* Ensure logo is always visible and properly sized */
  .logo-section img {
    max-height: 60px;
    width: auto;
  }

  @media (min-width: 769px) {
    .logo-section {
      min-width: 120px;
      flex-shrink: 0;
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
