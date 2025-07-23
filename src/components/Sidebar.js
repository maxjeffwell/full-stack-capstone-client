import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import styled from 'styled-components';

const StyledGrid = styled(Grid)`
  &&& {
    margin: auto;
  }
`;

class SideBar extends Component {
  render() {
    return (
      <StyledGrid container columns={1} centered data-testid="sidebar">
        {/* Sidebar content removed */}
      </StyledGrid>
    );
  }
}

export default SideBar;
