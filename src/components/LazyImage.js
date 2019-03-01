import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Visibility, Image, Loader } from 'semantic-ui-react'

export default class LazyImage extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    size: PropTypes.string,
  }

  static defaultProps = {
    size: `medium`,
  }

  state = {
    show: false,
  }

  showImage = () => {
    this.setState({
      show: true,
    })
  }

  render() {
    const { size } = this.props
    if (!this.state.show) {
      return (
        <Visibility as="span" fireOnMount onOnScreen={this.showImage}>
          <Loader active inline="centered" size={size} />
        </Visibility>
      )
    }
    return <Image {...this.props} />
  }
}
