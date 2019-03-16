import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
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
	padding: 0;
	margin: 0;
	font-size: 1.5rem;
	line-height: 2;
	font-family: Roboto, sans-serif;
	}
`;

class App extends Component {

    render() {
        return (
          <BrowserRouter>
              <Container>
                  <GlobalStyle />
                  <Header />
                  <Switch>
                      <Route exact path='/' component={Landing} />
                      <Route exact path='/signup' component={Register} />
                      <Route path='/students/:id/update' render={(props) => <UpdateStudent {...props} />} />
                      <Route exact path='/students/:id/update' render={ModalManager} />
                      <Route exact path='/students' component={Students} />
                      <Route exact path='/signin' component={Signin} />
                      <Route exact path='/dashboard' component={Dashboard} />
                      <Route exact path='/signout' component={Signout} />
                      <Route path='/students/new' render={(props) => <CreateStudent {...props} />} />
                  </Switch>
              </Container>
          </BrowserRouter>
        );
    }
}

export default App;


