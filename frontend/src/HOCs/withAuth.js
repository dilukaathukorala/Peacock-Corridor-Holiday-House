import React from 'react';
import { Navigate } from 'react-router-dom';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const isAuthenticated = !!localStorage.getItem('authToken'); // Check for an authentication token

    if (!isAuthenticated) {
      return <Navigate to="/signin" replace />; // Redirect to Sign-In if not authenticated
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
