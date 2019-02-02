import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
  &&& {
    font-size: 1.5em;
    font-family: "Roboto", "sans-serif";
    font-weight: bold;
  }
  &&& #sidebar.menu {
    font-family: "Roboto", "sans-serif";
    font-weight: bold;
  }
`;

const StyledMenu = styled(Menu.Menu)`
  margin-top: 20px;
`;

class Sidebar extends Component {
  static propTypes = {
    isToggled: PropTypes.bool.isRequired
  };

  handleItemClick = name => this.setState({ activeItem: name });

  render() {
    const { isToggled } = this.props;
    const { activeItem } = this.state || {};

      return (
        <StyledMenu id="sidebar" vertical={this.props.toString()}
                   className={isToggled ? 'toggled' : ''}>
          <Menu.Item>
            <StyledContainer as={Link} name="students" to="/students">
              Access Your Student List
            </StyledContainer>
          </Menu.Item>
          <Menu.Item>
            <Menu.Header>Document Upload Center Coming Soon</Menu.Header>
          </Menu.Item>
          <Menu.Item
            name="File Upload Link Coming Soon"
            active={activeItem === 'File Uploader'}
            onClick={this.handleItemClick}
          />
          <Menu.Item>
            <Menu.Header>Integrated Team Member Messaging Coming Soon</Menu.Header>
          </Menu.Item>
          <Menu.Item
            name="Direct Messaging Link Coming Soon"
            active={activeItem === 'Direct Messages'}
            onClick={this.handleItemClick}
          />
        </StyledMenu>
      );
    }
  }

const mapStateToProps = state => ({
  isToggled: state.isSidebarToggled
});

export default connect(mapStateToProps)(Sidebar);
