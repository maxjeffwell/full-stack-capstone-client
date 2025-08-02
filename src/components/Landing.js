import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import styled from 'styled-components';
import SEO from './SEO';

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

const Landing = () => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'educationELLy',
    description:
      'A comprehensive platform helping mainstream teachers engage with English Language Learning (ELL) students through integrated curriculum development, student tracking, and language proficiency assessment tools.',
    url: 'https://educationelly.com',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    author: {
      '@type': 'Person',
      name: 'Jeff Maxwell',
    },
  };

  return (
    <>
      <SEO
        title="educationELLy: Where All Teachers Are Language Teachers - Home"
        description="Discover educationELLy, the comprehensive platform helping mainstream teachers engage with English Language Learning students. Access student data, track proficiency, and manage ELL workflows efficiently."
        keywords="ELL platform, English Language Learning, teacher tools, student tracking, language proficiency, mainstream integration, education technology"
        canonicalUrl="/"
        structuredData={structuredData}
      />
      <StyledContainer text>
        <StyledHeader as="h1">educationELLy</StyledHeader>
        <section>
          <StyledParagraph as="ul" role="list">
            <li>Student data at your fingertips</li>
            <li>Quickly access student lists</li>
            <li>Improve collaboration and manage workflows</li>
            <li>
              If you have not already logged in, click the Login link in the
              right hand corner and enter the demo account information to access
              your student list and to create, update, and delete student ELL
              information!
            </li>
            <li>
              To create an account, please click on the Register button in the
              navigation bar above. Using the demo account, you will be able to
              access all of educationELLy's current features
            </li>
          </StyledParagraph>
        </section>
      </StyledContainer>
    </>
  );
};

export default Landing;
