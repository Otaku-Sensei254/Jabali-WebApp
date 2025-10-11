import React, { useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import { useTheme } from '../Context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const AuthPage = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    userType: 'parent'
  });

  const { login } = useAuth();
  const { currentTheme } = useTheme();
  const navigate = useNavigate(); // Add this hook

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    let userName = '';
    
    if (!isSignIn && formData.fullName) {
      userName = formData.fullName.split(' ')[0];
    } else if (formData.email) {
      userName = formData.email.split('@')[0];
    } else {
      userName = formData.userType === 'parent' ? 'Parent' : 'Caregiver';
    }
    
    login(formData.userType, userName);
    navigate('/home'); // Add this navigation
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Welcome to Jabali</h1>
          <p>A safe, inclusive learning platform for autistic children and their caregivers</p>
        </div>

        <div className="auth-tabs">
          <button 
            className={`tab ${isSignIn ? 'active' : ''}`}
            onClick={() => setIsSignIn(true)}
          >
            Sign In
          </button>
          <button 
            className={`tab ${!isSignIn ? 'active' : ''}`}
            onClick={() => setIsSignIn(false)}
          >
            Create Account
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {!isSignIn && (
            <>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Your full name"
                  required={!isSignIn}
                />
              </div>

              <div className="form-group">
                <label>I am a...</label>
                <div className="role-buttons">
                  <button
                    type="button"
                    className={`role-btn ${formData.userType === 'parent' ? 'active' : ''}`}
                    onClick={() => setFormData({ ...formData, userType: 'parent' })}
                  >
                    Parent
                  </button>
                  <button
                    type="button"
                    className={`role-btn ${formData.userType === 'caregiver' ? 'active' : ''}`}
                    onClick={() => setFormData({ ...formData, userType: 'caregiver' })}
                  >
                    Caregiver
                  </button>
                </div>
              </div>
            </>
          )}

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={isSignIn ? "Enter your password" : "Create a secure password"}
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            {isSignIn ? 'Sign In' : 'Create Account'}
          </button>

          {isSignIn && (
            <div className="forgot-password">
              <a href="/4GET">Forgot password? Reset it here</a>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AuthPage;