// src/Components/Context/AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(''); // 'parent' or 'caregiver'
  const [userName, setUserName] = useState(''); // Store user's name
  const [activePage, setActivePage] = useState('home');

  const login = (role, name = '') => {
    console.log('LOGIN CALLED - setting isLoggedIn to true');
    setIsLoggedIn(true);
    setUserRole(role);
    setUserName(name || getDefaultName(role));
  };

  const logout = () => {
    console.log('LOGOUT CALLED - setting isLoggedIn to false');
    setIsLoggedIn(false);
    setUserRole('');
    setUserName('');
    setActivePage('home');
  };

  // Helper function to generate default name based on role
  const getDefaultName = (role) => {
    return role === 'parent' ? 'Parent User' : 'Caregiver';
  };

  return (
    <AuthContext.Provider value={{
      isLoggedIn,
      userRole,
      userName,
      activePage,
      setActivePage,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};