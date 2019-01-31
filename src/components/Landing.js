import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import { Footer } from './Footer';

const Landing = () => (
    <Container text>
        <Header as='h1'>
                educationELLy
        </Header>
      <p>
            Student data at your fingertips

            Quickly access student lists

            Improve collaboration and manage workflows

            Click the "Log in" link in the right hand corner and
            enter your demo account information to access your student
            list and update student ELL student information!

            Use demo email: Demo and demo password: demopassword
      </p>
      <Footer />
    </Container>
    );

export default Landing;
