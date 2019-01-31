import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import styled from 'styled-components';

export const StyledFooter = styled.footer`
	width: 100%;
	display: flex;
	align-items: center;
	background-color: white;
	color: orange;
	height: 72px;
	min-height: 72px;
	.footer-inner {
		padding: 15px 1rem;
	}
	`;

const Footer = () => {
  return (
    <StyledFooter>
      <div className="footer-inner">
        <Grid relaxed>
          <Grid.Row verticalAlign="middle">
            <Grid.Column width={12} mobile={16}>
                <Header as="h3" inverted>
                  <Header.Content>
                    <Header as="h3">Copyright 2019 eductionELLy</Header>
                    <Header.Subheader as="h4">
                      Collaborative tools for teachers of language learning students
                      </Header.Subheader>
                  </Header.Content>
                </Header>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </StyledFooter>
  )
}

export default Footer;
