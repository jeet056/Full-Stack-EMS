// src/components/ProtectedRoute.js
import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

// Modified to accept an element prop instead of children
const ProtectedRoute = ({ element, requiredRole }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  // If no user is logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If a role is required and the user doesn't have it, redirect to a default route
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/employees" replace />;
  }

  // Render the protected content if authenticated and authorized
  return element;
};

export default ProtectedRoute;