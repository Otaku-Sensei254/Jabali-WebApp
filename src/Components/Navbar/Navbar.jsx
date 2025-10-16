// src/Components/Navbar/Navbar.jsx
import React, { useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import { useChild } from '../Context/useChild';
import ThemeToggle from '../Theme/ThemeToggle';
import { FiMenu, FiX } from 'react-icons/fi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const { userRole, userName, logout } = useAuth();
  const { selectedChild } = useChild();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { key: 'home', label: 'Home', path: '/home' },
    { key: 'learning', label: 'Learning', path: '/learning' },
    { key: 'music', label: 'Music', path: '/music' },
    { key: 'profiles', label: 'Profiles', path: '/profiles' },
    { key: 'games', label: 'Games', path: '/games' },
    { key: 'dashboard', label: 'Dashboard', path: '/dashboard' }
  ];

  const getAvatarLetter = () =>
    userName ? userName.charAt(0).toUpperCase() : userRole ? userRole.charAt(0).toUpperCase() : 'U';

  const getDisplayName = () => (userName ? userName : userRole === 'parent' ? 'Parent' : 'Caregiver');
  const getChildName = () => (selectedChild ? selectedChild.name : 'No Child Selected');  
  const handleLogoutClick = () => setShowLogoutConfirm(true);
  
  const confirmLogout = () => {
    logout();
    setShowLogoutConfirm(false);
    navigate('/auth');
  };
  
  const cancelLogout = () => setShowLogoutConfirm(false);

  return (
    <>
      <nav className="navbar">
        <div className="nav-left">
          <Link to="/home" className="brand-link">
            <h1 className="brand">Jabali</h1>
          </Link>
        </div>

        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
        </div>

        <div className={`nav-center ${menuOpen ? 'open' : ''}`}>
          {navItems.map((item) => (
            <Link
              key={item.key}
              to={item.path}
              className={`nav-item ${pathname === item.path ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="nav-right">
          <ThemeToggle />

          <div className="user-section">
            <span className="username">{getDisplayName()}</span>
            {/*
              <span className="child">{getChildName()}</span>
            */
            }
              
            <div className="user-avatar" onClick={handleLogoutClick}>
              <span className="avatar-icon">{getAvatarLetter()}</span>
            </div>

            {showLogoutConfirm && (
              <div className="logout-dropdown">
                <div className="logout-confirm">
                  <p>Are you sure you want to logout?</p>
                  <div className="logout-actions">
                    <button className="logout-confirm-btn" onClick={confirmLogout}>
                      Yes, Logout
                    </button>
                    <button className="logout-cancel-btn" onClick={cancelLogout}>
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {showLogoutConfirm && <div className="logout-overlay" onClick={cancelLogout}></div>}
    </>
  );
};

export default Navbar;