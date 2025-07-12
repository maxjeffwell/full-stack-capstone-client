import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import styled from 'styled-components';

import Footer from './Footer';

const StyledContainer = styled(Container)`
  &&& {
    margin-bottom: 20px;
    font-size: 0.75em;
  }
`;

const StyledHeader = styled(Header)`
  &&& {
    color: ${props => props.theme.blue};
    background: ${props => props.theme.orange};
    border: 2px solid ${props => props.theme.green};
    border-radius: 5px;
    font-size: 2.5em;
    font-family: 'Roboto', 'sans-serif';
    padding-left: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
    margin-top: 20px;
    margin-bottom: 25px;
    min-width: 325px;
    text-align: center;
  }
`;

const StyledParagraph = styled.p`
  &&& {
    text-align: center;
    font-size: 1.5em;
    font-family: 'Roboto', 'sans-serif';
  }
  &&& li {
    margin-top: 5px;
    margin-bottom: 5px;
  }
`;

const Landing = () => (
  <StyledContainer text>
    <StyledHeader as="h1">educationELLy</StyledHeader>
    <StyledParagraph>
      <li>Student data at your fingertips</li>
      <li>Quickly access student lists</li>
      <li>Improve collaboration and manage workflows</li>
      <li>
        If you have not already logged in, click the Login link in the right
        hand corner and enter the demo account information to access your
        student list and to create, update, and delete student ELL information!
      </li>
      <li>
        To create an account, please click on the Register button in the
        navigation bar above. Using the demo account, you will be able to access
        all of educationELLy's current features
      </li>
    </StyledParagraph>
    <Footer />
  </StyledContainer>
);

export default Landing;
