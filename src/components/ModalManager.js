import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'semantic-ui-react';
import styled from 'styled-components';

import { hideModal } from '../actions/modalActions';

const StyledModal = styled(Modal)`
  &&& {
    display: grid;
    margin: auto;
    width: 50%;
    border: 5px solid ${props => props.theme.blue};
    border-radius: 5px;
    padding: 5px 10px 10px 10px;
    background-color: ${props => props.theme.white};
    text-align: center;
    align-items: center;
    justify-content: center;
    transition: 1.1s ease-out;
    box-shadow: -2rem 2rem 2rem rgba(black, 0.2);
    filter: blur(0);
    transform: scale(1);  
    opacity: 1;
  &&& i {
      color: red;
      margin: auto;
      cursor: pointer;
    }
  }
`;

class ModalManager extends Component {

  render() {
    const { modalConfiguration } = this.props;

    const defaultProps = {
      defaultOpen: true,
      closeIcon: true,
      onClose: this.props.hideModal,
      closeOnDocumentClick: true
    };

    let renderedComponent;

    if (modalConfiguration) {
      const { modalProps = {} } = modalConfiguration;
      renderedComponent = <StyledModal { ...Object.assign({}, modalProps, defaultProps) } />;
    }
    return <span>{renderedComponent}</span>;
  }
}

const mapStateToProps = (state) => ({
  modalConfiguration: state.modals,
});

export default connect(mapStateToProps, { hideModal })(ModalManager);
