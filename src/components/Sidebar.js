import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Header } from 'semantic-ui-react';
import styled from 'styled-components';

const StyledLink = styled.a`
  &&& a.sc-chPdSV.gGDmaF { 
    font-size: 1.2em;
    font-family: "Roboto", "sans-serif";
    font-weight: bold;
    color: ${props => props.theme.blue};
    text-align: center;
    margin: auto;
    padding-bottom: 50px;
    white-space: nowrap;
    justify-self: center;
   }
  &&& a.sc-chPdSV.gGDmaFg:hover {
      box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
      text-decoration: underline;
  }
  &&& a.sc-chPdSV.gGDmaF:active, a.sc-chPdSV.gGDmaF:visited {
      color: rebeccapurple;
      text-decoration: none;
  }
`;

const StyledGrid = styled(Grid)`
  &&& {
  margin: auto;
  }
`;

const StyledHeader = styled(Header)`
  &&& {
    font-size: 1em;
    font-family: "Roboto", "sans-serif";
    font-weight: bold;
    background-color: ${props => props.theme.blue};
    border: 3px solid ${props => props.theme.orange};
    color: ${props => props.theme.white};
    border-radius: 5px;
    padding: .25em;
    text-align: center;
    margin: auto;
    width: fit-content;
    white-space: nowrap;
  }
`;

class SideBar extends Component {
  render() {
    return <StyledGrid container columns={1} centered>
         <Grid.Row centered verticalAlign="middle">
             <StyledLink as={Link} to="/students">
               Access Your Student List
             </StyledLink>
         </Grid.Row>
         <Grid.Row centered verticalAlign="middle">
             <StyledHeader>
               Create A New Student
             </StyledHeader>
         </Grid.Row>
    </StyledGrid>
  }
}

export default SideBar;
