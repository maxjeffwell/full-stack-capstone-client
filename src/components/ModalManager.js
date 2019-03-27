import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'semantic-ui-react';

import { hideModal } from '../actions/modalActions';

const backdropStyle = function() {
  return {
    filter: 'blur(20px)',
    position: 'fixed',
    zIndex: '1040',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    backgroundColor: 'blue',
    opacity: '0.8',
    boxShadow: '0px 0px 20px 20px rgba(255,255,255,1)',
    textShadow: '0px 0px 10px rgba(51, 51, 51, 0.9)',
    transform: 'scale(0.9)',
  };
};

const modalStyle = function() {
  return {
    position: 'absolute',
    textAlign: 'center',
    width: 'auto',
    zIndex: '1040',
    left: '50%',
    top: '75%',
    marginLeft: '-150px',
    marginRight: '-200px',
    border: '1px solid #2873b4',
    backgroundColor: 'white',
    boxShadow: '0 5px 15px rgba(0,0,0,.5)',
    padding: '20px 20px 20px 20px',
    fontSize: '12px'
  };
};

class ModalManager extends Component {

  static renderbackdrop(props) {
    return <div {...props} style={backdropStyle} />;
  }

  render() {
    const { modalConfiguration } = this.props;

    const defaultProps = {
      defaultOpen: true,
      closeIcon: true,
      onClose: this.props.hideModal,
      closeOnDocumentClick: false
    };

    let renderedComponent;

    if (modalConfiguration) {
      const { modalProps = {} } = modalConfiguration;
      renderedComponent = <Modal renderbackdrop={ModalManager.renderbackdrop()} style={modalStyle()}
                                 { ...Object.assign({}, modalProps, defaultProps) } />;
    }
    return <span ref={el => { this.el = el; }}>
        {renderedComponent}
    </span>;
  }
}

const mapStateToProps = (state) => ({
  modalConfiguration: state.modals,
});

export default connect(mapStateToProps, { hideModal })(ModalManager);
