import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import Navigation from './Navigation';
import authRequired from './authRequired';
import Landing from './Landing';
import Students from './auth/Students';
import SideBar from './Sidebar';
import CreateStudent from './CreateStudent';
import { Grid } from "semantic-ui-react";
import styled from 'styled-components';

const StyledGrid = styled(Grid)`
  &&& div .ui.centered.grid {
    margin: auto;
  }
`;

const Dashboard = ({ isToggled }) => (

  <StyledGrid centered style={{height: '100%'}} verticalAlign="middle"
              className={isToggled ? 'toggled' : ''}>
    <Navigation/>
    <Switch>
      <Route exact path='/' component={Landing}/>
      <Route exact path='/students' component={Students}/>
    </Switch>
    <SideBar/>
    <CreateStudent/>
  </StyledGrid>
);

Dashboard.propTypes = {
  isToggled: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isToggled: state.isSidebarToggled
});

export default connect(mapStateToProps)(authRequired(Dashboard));
