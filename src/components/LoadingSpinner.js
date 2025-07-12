import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <Dimmer active>
      <Loader size="large">{message}</Loader>
    </Dimmer>
  );
};

export default LoadingSpinner;
