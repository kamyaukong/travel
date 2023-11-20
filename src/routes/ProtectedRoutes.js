// src/routes/ProtectedRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isAuthenticated, ...rest }) => {
  if (!isAuthenticated) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they log in, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" replace state={{ from: rest.location }} />;
  }

  return children ? children : <Route {...rest} />;
};

export default ProtectedRoute;
