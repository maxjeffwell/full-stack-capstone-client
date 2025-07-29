import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { createGlobalStyle } from 'styled-components';

import Header from './Header';
import Footer from './Footer';
import ErrorBoundary from './ErrorBoundary';
import ModalManager from './ModalManager';
import authRequired from './authRequired';
import SessionManagerWrapper from './SessionManagerWrapper';

// Temporarily disable lazy loading for debugging
import Landing from './Landing';
import Register from './auth/Register';
import Students from './auth/Students';
import Signin from './auth/Signin';
import Dashboard from './Dashboard';
import Signout from './auth/Signout';
import CreateStudent from './CreateStudent';
import UpdateStudent from './UpdateStudent';

// Create protected components
const ProtectedStudents = authRequired(Students);
const ProtectedDashboard = authRequired(Dashboard);
const ProtectedCreateStudent = authRequired(CreateStudent);
const ProtectedUpdateStudent = authRequired(UpdateStudent);

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 14px;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  i {
    color: #2873b4;
    transition: color 0.2s ease;

    :hover{
      cursor: pointer;
      color: red;
    }
  }

  body {
    margin: auto;
    font-size: 1.5rem;
    line-height: 2;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    width: 100%;
    font-display: swap; /* Improve font loading performance */
    min-height: 100vh;
    padding-bottom: 50px; /* Space for fixed footer */
  }

  /* Font loading optimization */
  .fonts-loaded body {
    font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  }

  .fonts-failed body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  }

  /* Improve rendering performance */
  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

const App = () => {
  return (
    <BrowserRouter>
      <Container>
        <GlobalStyle />
        <ErrorBoundary>
          <Header />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<Register />} />
            <Route
              path="/students/:id/update"
              element={<ProtectedUpdateStudent />}
            />
            <Route path="/students" element={<ProtectedStudents />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/dashboard/*" element={<ProtectedDashboard />} />
            <Route path="/signout" element={<Signout />} />
            <Route path="/students/new" element={<ProtectedCreateStudent />} />
          </Routes>
          <ModalManager />
          <SessionManagerWrapper />
          <Footer />
        </ErrorBoundary>
      </Container>
    </BrowserRouter>
  );
};

export default App;
