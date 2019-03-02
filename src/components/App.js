import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { createGlobalStyle } from 'styled-components';

import { showModal, hideModal } from '../actions';

import ModalRoot from '../ModalRoot';
import Header from './Header';
import Landing from './Landing';
import Register from './auth/Register';
import Students from './auth/Students';
import Signin from './auth/Signin';
import Dashboard from './Dashboard';
import Signout from './auth/Signout';
import CreateStudent from './CreateStudent';
import UpdateStudent from './UpdateStudent';

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
	
body {
	padding: 0;
	margin: 0;
	font-size: 1.5rem;
	line-height: 2;
	font-family: Roboto, sans-serif;
	}
`;

class App extends Component {
    constructor(props) {
        super(props);

        this.openDeleteModal = this.openDeleteModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    closeModal(event) {
        this.props.hideModal();
    }

    openDeleteModal(event) {
        this.props.showModal({
            open: true,
            title: 'Delete Modal',
            message: 'Please confirm your deletion of this student',
            deleteAction: this.closeModal,
            closeModal: this.closeModal,
            deleteText: 'delete'
        }, 'delete')
    }

    render() {
        return (
          <div>
          <BrowserRouter>
              <Container>
                  <GlobalStyle />
                  <Header />
                  <Switch>
                      <Route exact path='/' component={Landing} />
                      <Route exact path='/signup' component={Register} />
                      <Route path='/students/:id/update' render={(props) => <UpdateStudent {...props} />} />
                      <Route exact path='/students' component={Students} />
                      <Route exact path='/signin' component={Signin} />
                      <Route exact path='/dashboard' component={Dashboard} />
                      <Route exact path='/signout' component={Signout} />
                      <Route path='/students/new' render={(props) => <CreateStudent {...props} />} />
                  </Switch>
              </Container>
          </BrowserRouter>
          <ModalRoot />
          </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    hideModal: () => dispatch(hideModal()),
    showModal: (modalProps, modalType) => {
        dispatch(showModal({ modalProps, modalType }))
    }
});

export default connect(null, mapDispatchToProps)(App);


