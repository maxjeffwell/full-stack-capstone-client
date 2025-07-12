import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { toggleSidebar } from '../store/actions';
import LazyImage from './LazyImage';
import claptrap_vector from '../logo/claptrap_vector.png';

const StyledNav = styled.div`
  margin-top: 20px;
`;

const StyledIcon = styled.i`
  align-self: center;
`;

const Navigation = () => {
  const dispatch = useDispatch();

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  return (
    <StyledNav role="navigation" className="flex-container">
      <StyledIcon icon="claptrap" onClick={handleToggleSidebar}>
        <Link to="/students" className="students" role="button">
          <LazyImage src={claptrap_vector} alt="students" />
        </Link>
      </StyledIcon>
    </StyledNav>
  );
};

export default Navigation;
