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
      <Menu id="sidebar" vertical className={isToggled ? 'toggled' : ''}>
        <Menu.Item>
          <Menu.Header>Products</Menu.Header>

        <Menu.Menu>
          <Menu.Item
            name="enterprise"
            active={activeItem === 'enterprise'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="consumer"
            active={activeItem === 'consumer'}
            onClick={this.handleItemClick}
          />
        </Menu.Menu>
      </Menu.Item>

      <Menu.Item>
        <Menu.Header>CMS Solutions</Menu.Header>

        <Menu.Menu>
          <Menu.Item
            name="rails"
            active={activeItem === 'rails'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="python"
            active={activeItem === 'python'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="php"
            active={activeItem === 'php'}
            onClick={this.handleItemClick}
          />
        </Menu.Menu>
      </Menu.Item>
      </Menu>
    );
  }
}

const mapStateToProps = state => ({
  isToggled: state.isSidebarToggled
});

export default connect(mapStateToProps)(Sidebar);
