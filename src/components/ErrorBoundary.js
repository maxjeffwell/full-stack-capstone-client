import React from 'react';
import { Container, Header, Message, Button } from 'semantic-ui-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <Container text>
          <Header as="h2" color="red">
            Oops! Something went wrong
          </Header>
          <Message error>
            <Message.Header>An unexpected error occurred</Message.Header>
            <p>
              We apologize for the inconvenience. Please try refreshing the
              page.
            </p>
          </Message>
          <Button primary onClick={this.handleRetry}>
            Try Again
          </Button>
          <Button
            secondary
            onClick={() => window.location.reload()}
            style={{ marginLeft: '10px' }}
          >
            Refresh Page
          </Button>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
