import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { createGlobalStyle } from 'styled-components';

import Header from './Header';
import Landing from './Landing';
import Register from './auth/Register';
import Students from './auth/Students';
import Signin from './auth/Signin';
import Dashboard from './Dashboard';
import Signout from './auth/Signout';
import CreateStudent from './CreateStudent';
import UpdateStudent from './UpdateStudent';
import ModalManager from './ModalManager';
import authRequired from './authRequired';
import SessionManagerWrapper from './SessionManagerWrapper';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    src: url('https://fonts.googleapis.com/css?family=Roboto');
  }

html {
  box-sizing: border-box;
  font-size: 14px;
  }

*, *:before, *:after {
		box-sizing: inherit; // then inherit box sizing on everything else
	}
	
	i {
	color: #2873b4;
	:hover{
	cursor: pointer;
	color: red;
	}
	}
	
body {  
  margin: auto;
	font-size: 1.5rem;
	line-height: 2;
	font-family: Roboto, sans-serif;
	width: 100%;
	}
`;

const App = () => {
    return (
        <BrowserRouter>
            <Container>
                <GlobalStyle />
                <Header />
                <Routes>
                    <Route path='/' element={<Landing />} />
                    <Route path='/signup' element={<Register />} />
                    <Route path='/students/:id/update' element={authRequired(UpdateStudent)} />
                    <Route path='/students' element={authRequired(Students)} />
                    <Route path='/signin' element={<Signin />} />
                    <Route path='/dashboard' element={authRequired(Dashboard)} />
                    <Route path='/signout' element={<Signout />} />
                    <Route path='/students/new' element={authRequired(CreateStudent)} />
                </Routes>
                <ModalManager />
                <SessionManagerWrapper />
            </Container>
        </BrowserRouter>
    );
};

export default App;


