import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import styled from 'styled-components';

const FooterWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${props => props.theme.white};
  border-top: 2px solid ${props => props.theme.blue};
  padding: 10px 0;
  z-index: 100;
`;

const StyledHeader = styled(Header)`
  &&& {
    margin: 0;
    background: transparent;
    color: ${props => props.theme.orange};
    font-size: 1.2em;
    text-align: center;
  }
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterWrapper>
      <Grid container>
        <Grid.Row>
          <Grid.Column width={16}>
            <StyledHeader as="h4">
              <Header.Content>
                Copyright &copy; {currentYear} educationELLy
              </Header.Content>
            </StyledHeader>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </FooterWrapper>
  );
};

export default Footer;
