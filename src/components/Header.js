import React from 'react';
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
   &&& :hover:not([disabled]), :focus {
    box-shadow: inset 6.5em 0 0 0 var(--hover);
    background-color: ${props => props.theme.blue};
    color: ${props => props.theme.white};
    }
    &&& :active:not([disabled]), :focus {
    color: mediumpurple;
    background-color: white;
    }
`;

const Header = () => {
    const isAuthenticated = useSelector(selectAuth);

    const showLinks = () => {
        if (isAuthenticated) {
            return (
              <StyledMenu stackable size="small" borderless>
                <Menu.Menu position="left">
                    <Menu.Item as="header">
                      <LazyImage src={logo} />
                    </Menu.Item>
                </Menu.Menu>
                <Menu.Menu position="right">
                  <Menu.Item as={Link} name="Instructor Dashboard" to="/dashboard">
                  </Menu.Item>
                </Menu.Menu>
                <Menu.Menu position="right">
                  <Menu.Item as={Link} name="Student List" to="/students">
                  </Menu.Item>
                </Menu.Menu>
                <Menu.Menu position="right">
                  <Menu.Item as={Link} name="Add New Student" to="/students/new">
                  </Menu.Item>
                </Menu.Menu>
                <Menu.Menu position="right">
                  <Menu.Item as={Link} name="Log Out" to="/signout">
                  </Menu.Item>
                </Menu.Menu>
              </StyledMenu>
            );
        } else {
            return (
              <StyledMenu stackable size="small" borderless>
                <Menu.Menu position="left">
                  <Menu.Item as="header">
                    <LazyImage src={logo} />
                  </Menu.Item>
                </Menu.Menu>
                <Menu.Menu position="right">
                  <Menu.Item as={Link} name="Register" to="/signup">
                  </Menu.Item>
                </Menu.Menu>
                <Menu.Menu position="right">
                  <Menu.Item as={Link} name="Log In" to="/signin">
                  </Menu.Item>
                </Menu.Menu>
              </StyledMenu>
            );
        }
    };

    return (
        <>
            {showLinks()}
        </>
    );
};

export default Header;