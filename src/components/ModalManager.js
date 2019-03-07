import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'semantic-ui-react';

import { hideModal } from '../actions/modalActions';

export class ModalManager extends Component {
  render() {
    const { modalConfiguration } = this.props;

    const defaultProps = {
      defaultOpen: true,
      closeIcon: true,
      onClose: this.props.hideModal
    };

    let renderedComponent;

    if (modalConfiguration) {
      const { modalProps = {} } = modalConfiguration;
      renderedComponent = <Modal { ...Object.assign({}, modalProps, defaultProps) } />;
    }
    return <span>{renderedComponent}</span>;
  }
}

const mapStateToProps = (state) => ({
  modalConfiguration: state.modals
});

export default connect(mapStateToProps, { hideModal })(ModalManager);
