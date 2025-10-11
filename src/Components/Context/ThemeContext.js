import React, { createContext, useContext, useState, useEffect } from 'react';
import { themeConfig } from '../../styles/theme';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  // Load saved theme from localStorage and apply class
  useEffect(() => {
    const savedTheme = localStorage.getItem('jabali-theme') || 'light';
    setTheme(savedTheme);
    document.body.setAttribute('data-theme', savedTheme);
    applyThemeVariables(savedTheme);
  }, []);

  // Function to toggle and persist the theme
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('jabali-theme', newTheme);
    applyThemeVariables(newTheme);
  };

  // Apply the themeConfig colors as CSS variables
  const applyThemeVariables = (themeName) => {
    const themeObj = themeConfig[themeName];
    const root = document.documentElement;

    Object.entries(themeObj.colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
  };

  const currentTheme = themeConfig[theme];

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, currentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
