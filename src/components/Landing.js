import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import styled from 'styled-components';

import Footer from './Footer';

const StyledContainer = styled(Container)`
  &&& {
    margin-bottom: 20px;
    font-size: .75em;
  }
`;

const StyledHeader = styled(Header)`
  color: ${props => props.theme.blue};
  background: ${props => props.theme.orange};
  border: 2px solid ${props => props.theme.green};
  font-size: 2em;
  font-family: 'Roboto', 'sans-serif';
  padding-left: 10px;
  margin-top: 20px;
`;

const StyledParagraph = styled.p`
  &&& {
    text-align: center;
    font-size: 1.5em;
    font-family: 'Roboto', 'sans-serif';
  }
`;

const Landing = () => (
    <StyledContainer text>
        <StyledHeader as='h1'>
                educationELLy
        </StyledHeader>
      <StyledParagraph>
        <ul>
          <li>Student data at your fingertips</li>
          <li>Quickly access student lists</li>
          <li>Improve collaboration and manage workflows</li>
          <li>Click the "Log in" link in the right hand corner and
            enter your demo account information to access your student
            list and update student ELL student information!</li>
          <li>Please click on the Register button in the right hand corner in order to create an account and access the teacher dashboard             as well as the student list.</li>
          <li>If you'd rather not create an account. you can simply use the demo account provided on both the login and registration                  pages</li>
        </ul>
      </StyledParagraph>
      <Footer />
    </StyledContainer>
    );

export default Landing;
