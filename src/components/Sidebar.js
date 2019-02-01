import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Sidebar extends Component {
  static propTypes = {
    isToggled: PropTypes.bool.isRequired
  };

  handleItemClick = name => this.setState({ activeItem: name });

  render() {
    const { isToggled } = this.props;
    const { activeItem } = this.state || {};

    return (
      <Menu.Menu id="sidebar" vertical className={isToggled ? 'toggled' : ''}>
        <Menu.Item>
          <Menu.Header>Document Upload Center Coming Soon</Menu.Header>
        </Menu.Item>

          <Menu.Item
            name="File Upload Link Coming Soon"
            active={activeItem === 'File Uploader'}
            onClick={this.handleItemClick}
          />
      <Menu.Item>
        <Menu.Header>Integrated Team Member Messaging</Menu.Header>
      </Menu.Item>
        <Menu.Item
            name="Direct Messaging Link Coming Soon"
            active={activeItem === 'Direct Messages'}
            onClick={this.handleItemClick}
          />
      </Menu.Menu>
    );
  }
}

const mapStateToProps = state => ({
  isToggled: state.isSidebarToggled
});

export default connect(mapStateToProps)(Sidebar);
