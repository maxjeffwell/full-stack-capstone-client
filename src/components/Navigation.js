import React from 'react';
// import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import { bindActionCreators } from 'redux';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

// import { toggleSidebar as toggleSidebarAction } from '../actions';
import LazyImage from './LazyImage';
import claptrap_vector from '../logo/claptrap_vector.png';

const StyledNav = styled.div`
  margin-top: 20px;
`;

const StyledIcon = styled.i`
  align-self: center;
`;

const Navigation = ({ toggleSidebar }) => {
  return <StyledNav role="navigation" className="flex-container">
    <StyledIcon icon='claptrap' onClick={toggleSidebar}>
      <Link to="/students" className="students" role="button">
      <LazyImage src={claptrap_vector} alt="students" />
      </Link>
    </StyledIcon>
  </StyledNav>;
};

  // Navigation.propTypes = {
  //   toggleSidebar: PropTypes.func.isRequired
  // };

  // const mapDispatchToProps = dispatch => ({
  //   toggleSidebar: bindActionCreators(toggleSidebarAction, dispatch)
  // });

  // export default connect(null, mapDispatchToProps)(Navigation);

export default Navigation;