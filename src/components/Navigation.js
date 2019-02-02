import React from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { toggleSidebar as toggleSidebarAction } from '../actions';

const StyledNavDiv = styled.div`
  margin-top: 20px;
`;

const Navigation = ({ toggleSidebar }) => {
  return <StyledNavDiv role="navigation" className="flex-container">
    <Button id="menu-button" className="flex-item" icon="sidebar"
            circular onClick={toggleSidebar}
            disabled
            color="orange"
            size="huge"
    />
    <div className="flex-item">
      <Link to={'/signin'}/>
    </div>
  </StyledNavDiv>;
};

  Navigation.propTypes = {
    toggleSidebar: PropTypes.func.isRequired
  };

  const mapDispatchToProps = dispatch => ({
    toggleSidebar: bindActionCreators(toggleSidebarAction, dispatch)
  });

  export default connect(null, mapDispatchToProps)(Navigation);
