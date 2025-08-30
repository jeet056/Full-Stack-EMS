import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    try {
      console.log('Fetching user data...');
      const response = await axios.get('https://full-stack-ems.onrender.com/user', { 
        withCredentials: true,
        timeout: 10000 // 10 second timeout
      });
      console.log('User data received:', response.data);
      const userData = response.data;
      setUser({
        email: userData.attributes.email,
        role: userData.authorities[0].authority.replace('ROLE_', '')
      });
    } catch (error) {
      console.error('Failed to fetch user:', error);
      if (error.response) {
        console.error('Error response:', error.response.status, error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up request:', error.message);
      }
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async () => {
    // OAuth2 login is handled by redirect; this can be used for post-login refresh
    await fetchUser();
  };

  const logout = async () => {
    try {
      await axios.post('https://full-stack-ems.onrender.com/logout', {}, { withCredentials: true });
      setUser(null);
    } catch (error) {
      console.error('Logout failed', error);
      // Even if logout fails, clear the user state
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
