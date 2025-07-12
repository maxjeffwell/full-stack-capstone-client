import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { StyledMessage } from './Signin';
import { signout } from '../../store/actions';

const Signout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Sign user out by removing authenticated JWT from reducer
    dispatch(signout());
  }, [dispatch]);

  return (
    <StyledMessage success>You have successfully logged out.</StyledMessage>
  );
};

export default Signout;
