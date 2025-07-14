import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { createGlobalStyle } from 'styled-components';

import Header from './Header';
import Footer from './Footer';
import LoadingSpinner from './LoadingSpinner';
import ErrorBoundary from './ErrorBoundary';
import ModalManager from './ModalManager';
import authRequired from './authRequired';
import SessionManagerWrapper from './SessionManagerWrapper';

// Lazy load components for code splitting
const Landing = React.lazy(() => import('./Landing'));
const Register = React.lazy(() => import('./auth/Register'));
const Students = React.lazy(() => import('./auth/Students'));
const Signin = React.lazy(() => import('./auth/Signin'));
const Dashboard = React.lazy(() => import('./Dashboard'));
const Signout = React.lazy(() => import('./auth/Signout'));
const CreateStudent = React.lazy(() => import('./CreateStudent'));
const UpdateStudent = React.lazy(() => import('./UpdateStudent'));

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
          <Suspense fallback={<LoadingSpinner message="Loading page..." />}>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/signup" element={<Register />} />
              <Route
                path="/students/:id/update"
                element={<ProtectedUpdateStudent />}
              />
              <Route path="/students" element={<ProtectedStudents />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/dashboard" element={<ProtectedDashboard />} />
              <Route path="/signout" element={<Signout />} />
              <Route
                path="/students/new"
                element={<ProtectedCreateStudent />}
              />
            </Routes>
          </Suspense>
          <ModalManager />
          <SessionManagerWrapper />
          <Footer />
        </ErrorBoundary>
      </Container>
    </BrowserRouter>
  );
};

export default App;
