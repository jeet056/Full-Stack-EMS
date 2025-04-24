import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const response = await axios.get('https://full-stack-ems.onrender.com/user', { withCredentials: true });
      const userData = response.data;
      setUser({
        email: userData.attributes.email,
        role: userData.authorities[0].authority.replace('ROLE_', '')
      });
    } catch (error) {
      console.error('Failed to fetch user', error);
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
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
