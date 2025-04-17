import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ element, requiredRole }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://localhost:8080/user', { withCredentials: true });
        const userData = response.data;
        setUser({
          email: userData.attributes.email,
          role: userData.authorities[0].authority.replace('ROLE_', '') // e.g., 'ADMIN' or 'USER'
        });
      } catch (error) {
        console.error('Authentication check failed', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/employees" replace />;
  }

  return element;
};

export default ProtectedRoute;