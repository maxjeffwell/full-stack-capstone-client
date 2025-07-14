// Higher Order Component

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const authRequired = ChildComponent => {
  return props => {
    const navigate = useNavigate();
    const auth = useSelector(state => state.auth.authenticated);

    console.log('authRequired HOC - authenticated:', auth);
    console.log(
      'authRequired HOC - ChildComponent:',
      ChildComponent.name || 'Anonymous'
    );

    useEffect(() => {
      if (!auth) {
        console.log('Not authenticated, redirecting to home');
        navigate('/');
      }
    }, [auth, navigate]);

    return auth ? <ChildComponent {...props} /> : null;
  };
};

export default authRequired;
