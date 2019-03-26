import React, { Component, createRef, forwardRef } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import axios from 'axios';
import FocusLock from 'react-focus-lock';

import { API_BASE_URL } from '../config';
import { showModal, hideModal } from '../actions/modalActions';
import { deleteStudent } from '../actions/index';
import ModalManager from './ModalManager';

const StyledConfirmButton = styled.button`
		cursor: pointer;
		font-family: 'Roboto', 'sans-serif';
    font-size: 28px;
    font-weight: 700;
    text-align: center;
    line-height: 1em;
    margin-top: 10px;
    margin-bottom: 25px;
    color: ${props => props.theme.white};
    background-color: ${props => props.theme.blue}; 
    border: 2px solid ${props => props.theme.orange};
    border-radius: 5px;
    padding: 10px;
     &:hover:not([disabled]) {
      box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
      }
`;

const StyledFancyButton = styled.button`
    border: 2px solid red;
    background-color: ${props => props.theme.white};
    alignment: center;
    justify-content: center;
    padding: 5px;
    border-radius: 5px;
    margin: auto;
    font-family: 'Roboto','sans-serif';
    font-size: 1em;
    font-weight: 700;
    color: ${props => props.theme.blue};
    cursor: pointer;
    white-space: nowrap;
   &:hover:not([disabled]) {
      box-shadow: inset 6.5em 0 0 0 var(--hover);
      background-color: red;
      color: ${props => props.theme.white};
    }
`;

const StyledHeader = styled.h1`
	font-family: 'Roboto', 'sans-serif';
	font-weight: 700;
	font-size: 1.25em;
	color: ${props => props.theme.blue};
`;

class DeleteStudent extends Component {

	render() {

		const FancyConfirmButton = forwardRef((props, ref) => (
			<StyledFancyButton ref={ref} className="FancyButton"
			        onClick={() => axios.delete(`${API_BASE_URL}/students/${this.props.match.params.id}`)
				        .then(this.props.hideModal)
				        .then(() => this.props.history.push('/students'))}>
				{props.children}
			</StyledFancyButton>
		));

		const ref = createRef();

		return (
				<FocusLock>
					<ModalManager />
				<StyledConfirmButton onClick={() => this.props.showModal({
					header: <StyledHeader>Please confirm your deletion of this student</StyledHeader>,
					content: <FancyConfirmButton ref={ref}>Confirm Deletion</FancyConfirmButton>
				})}>
					Delete Student
				</StyledConfirmButton>
				</FocusLock>
		);
	}
}

function mapStateToProps(state) {
	return {
		students: state.students.students
	}
}
function mapDispatchToProps(dispatch) {
	return {
		showModal: bindActionCreators(showModal, dispatch),
		hideModal: bindActionCreators(hideModal, dispatch),
		deleteStudent: bindActionCreators(deleteStudent, dispatch)
	}
}

export default compose (
	connect(mapStateToProps, mapDispatchToProps))(withRouter(DeleteStudent));


