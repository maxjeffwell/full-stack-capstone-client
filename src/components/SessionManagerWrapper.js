import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button, Header, Icon } from 'semantic-ui-react';
import { SessionManager } from '../utils/security';
import authService from '../utils/auth';
import * as actions from '../store/actions';

const SessionManagerWrapper = () => {
  const [showWarning, setShowWarning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(5 * 60);
  const authenticated = useSelector(state => state.auth.authenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionManagerRef = useRef(null);
  const warningIntervalRef = useRef(null);

  const handleWarning = useCallback(() => {
    setShowWarning(true);
    setTimeRemaining(5 * 60);

    // Update countdown every second
    warningIntervalRef.current = setInterval(() => {
      setTimeRemaining(prevTime => {
        const newTime = prevTime - 1;
        if (newTime <= 0) {
          clearInterval(warningIntervalRef.current);
          return 0;
        }
        return newTime;
      });
    }, 1000);
  }, []);

  const handleTimeout = useCallback(() => {
    dispatch(actions.signout());
    navigate('/signin');
  }, [dispatch, navigate]);

  const startSessionManager = useCallback(() => {
    sessionManagerRef.current = new SessionManager(
      handleTimeout,
      handleWarning
    );
    sessionManagerRef.current.start();
  }, [handleTimeout, handleWarning]);

  const stopSessionManager = () => {
    if (sessionManagerRef.current) {
      sessionManagerRef.current.destroy();
      sessionManagerRef.current = null;
    }
    if (warningIntervalRef.current) {
      clearInterval(warningIntervalRef.current);
      warningIntervalRef.current = null;
    }
    setShowWarning(false);
  };

  const handleExtendSession = () => {
    // Reset the session timer
    if (sessionManagerRef.current) {
      sessionManagerRef.current.reset();
    }

    // Clear warning
    if (warningIntervalRef.current) {
      clearInterval(warningIntervalRef.current);
      warningIntervalRef.current = null;
    }
    setShowWarning(false);

    // Make a simple API call to refresh the session on the server
    if (authService.isAuthenticated()) {
      dispatch(actions.fetchStudents());
    }
  };

  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (authenticated) {
      startSessionManager();
    } else {
      stopSessionManager();
    }

    return () => {
      stopSessionManager();
    };
  }, [authenticated, startSessionManager]);

  if (!authenticated) {
    return null;
  }

  return (
    <Modal
      open={showWarning}
      size="small"
      onClose={() => {}}
      closeOnEscape={false}
      closeOnDimmerClick={false}
    >
      <Header icon="clock" content="Session Timeout Warning" />
      <Modal.Content>
        <p>
          Your session will expire in {formatTime(timeRemaining)} due to
          inactivity.
        </p>
        <p>Would you like to continue your session?</p>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={handleTimeout}>
          <Icon name="sign out" /> Sign Out
        </Button>
        <Button color="green" onClick={handleExtendSession}>
          <Icon name="checkmark" /> Continue Session
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default SessionManagerWrapper;
