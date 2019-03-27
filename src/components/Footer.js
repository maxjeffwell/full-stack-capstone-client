import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import styled from 'styled-components';

const StyledHeader = styled(Header)`
	&&& {
	  display: grid;
	  grid-template-rows: 1fr auto;
	  height: auto;
	  margin-top: -50px;
    bottom: -4em;
    position: relative;
    width: 100%;
    min-width: 190px;
    z-index: -1;
	  background: ${props => props.theme.white};
	  color: ${props => props.theme.orange};
	  border: 2px solid ${props => props.theme.blue};
	  min-height: 60px;
	  padding: 15px 15px;
	  border-radius: 5px;
	  font-size: 1.5em;
	  text-align: center;
	}
`;

const Footer = () => {
  return (
        <Grid container relaxed>
          <Grid.Row verticalAlign="middle">
            <Grid.Column mobile={16}>
                <StyledHeader as="h3" inverted>
                  <Header.Content>
                    Copyright &copy; 2019 educationELLy
                    <Header.Subheader>
                      </Header.Subheader>
                  </Header.Content>
                </StyledHeader>
            </Grid.Column>
          </Grid.Row>
        </Grid>
  )
}

export default Footer;
