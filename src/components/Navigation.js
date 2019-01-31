import React from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { toggleSidebar as toggleSidebarAction } from '../actions';

const Navigation = ({ toggleSidebar }) => (
  <div role="navigation" className="flex-container">
    <Button id="menu-button" className="flex-item" icon="sidebar" onClick={toggleSidebar}
            />

            <div className="flex-item">
              <Link to={'/signin'}>
              </Link>
            </div>
  </div>
);

  Navigation.propTypes = {
    toggleSidebar: PropTypes.func.isRequired
  };

  const mapDispatchToProps = dispatch => ({
    toggleSidebar: bindActionCreators(toggleSidebarAction, dispatch)
  });

  export default connect(null, mapDispatchToProps)(Navigation);
