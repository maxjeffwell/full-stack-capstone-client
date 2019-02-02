import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import Navigation from './Navigation';
import authRequired from './authRequired';
import Landing from './Landing';
import Students from './auth/Students';
import Sidebar from './Sidebar';

const Dashboard = ({ isToggled }) => (
  <div id="dashboard">
    <div id="main" className={isToggled ? 'toggled' : ''}>
      <Navigation />
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path='/students' component={Students} />
      </Switch>
    </div>
    <Sidebar />
  </div>
);

Dashboard.propTypes = {
  isToggled: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isToggled: state.isSidebarToggled
});

export default connect(mapStateToProps)(authRequired(Dashboard));
