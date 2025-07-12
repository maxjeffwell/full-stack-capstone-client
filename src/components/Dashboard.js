import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Navigation from './Navigation';
import authRequired from './authRequired';
import Landing from './Landing';
import Students from './auth/Students';
import SideBar from './Sidebar';
import CreateStudent from './CreateStudent';
import { Grid } from 'semantic-ui-react';
import styled from 'styled-components';
import { selectIsSidebarToggled } from '../store/slices/toggleSlice';

const StyledGrid = styled(Grid)`
  &&& div .ui.centered.grid {
    margin: auto;
  }
`;

const Dashboard = () => {
  const isToggled = useSelector(selectIsSidebarToggled);

  return (
    <StyledGrid
      centered
      style={{ height: '100%' }}
      verticalAlign="middle"
      className={isToggled ? 'toggled' : ''}
      data-testid="dashboard-grid"
    >
      <Navigation />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/students" element={<Students />} />
      </Routes>
      <SideBar />
      <CreateStudent />
    </StyledGrid>
  );
};

export default authRequired(Dashboard);
