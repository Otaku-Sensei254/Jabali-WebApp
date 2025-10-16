import React, { useState, useContext } from "react";
import { ChildContext } from "../Components/Context/ChildContext";
import {  useAuth } from "../Components/Context/AuthContext";
import ChildCard from "../Components/ChildCard";
import "../styles/Profiles.css";
import { CgMathPlus } from "react-icons/cg";
import { FaLock, FaUserPlus } from "react-icons/fa";

const Profiles = () => {
  const { childProfiles, addChild, removeChild } = useContext(ChildContext);
  const { isLoggedIn, user } = useAuth(); // Get auth state
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    age: "",
    supportLevel: "",
    interests: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Add parent/caregiver info to the child profile
    const newChild = {
      name: form.name,
      age: parseInt(form.age),
      supportLevel: form.supportLevel,
      interests: form.interests.split(",").map((i) => i.trim()).filter(i => i),
      createdBy: user?.email || "Unknown", // Track who created this profile
      createdAt: new Date().toISOString()
    };
    
    addChild(newChild);
    setForm({ name: "", age: "", supportLevel: "", interests: "" });
    setShowForm(false);
  };

  const handleCancel = () => {
    setForm({ name: "", age: "", supportLevel: "", interests: "" });
    setShowForm(false);
  };

  // Show login prompt if not authenticated
  if (!isLoggedIn) {
    return (
      <div className="profiles-container">
        <div className="login-required">
          <div className="login-icon">
            <FaLock />
          </div>
          <h2>Account Required</h2>
          <p>
            To create and manage child profiles, please create an account or sign in.
            This helps us keep each child's learning journey secure and personalized.
          </p>
          <div className="login-benefits">
            <h3>With an account you can:</h3>
            <ul>
              <li>✅ Create personalized child profiles</li>
              <li>✅ Track learning progress</li>
              <li>✅ Save favorite activities</li>
              <li>✅ Access across multiple devices</li>
              <li>✅ Keep data secure and private</li>
            </ul>
          </div>
          <button 
            className="auth-redirect-btn"
            onClick={() => window.location.href = '/auth'}
          >
            <FaUserPlus />
            Create Account or Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="profiles-container">
      <div className="profiles-header">
        <h1>Child Profiles</h1>
        <p className="welcome-message">
          Welcome back, {user?.email}! Manage profiles for the children you care for.
        </p>
        <p>
          Each profile helps us personalize their learning experience based on their needs and interests.
        </p>
      </div>

      <div className="profiles-grid">
        {childProfiles.length > 0 ? (
          childProfiles.map((child, index) => (
            <ChildCard
              key={index}
              child={child}
              index={index}
              onDelete={removeChild}
            />
          ))
        ) : (
          <div className="no-profiles">
            <div className="no-profiles-icon">
              <CgMathPlus />
            </div>
            <h3>No Child Profiles Yet</h3>
            <p>Create your first child profile to get started with personalized learning!</p>
          </div>
        )}

        <div 
          className="add-profile" 
          onClick={() => setShowForm(true)}
          title="Add new child profile"
        >
          <span>
            <CgMathPlus />
          </span>
          <p>Add Child</p>
        </div>
      </div>

      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Add New Child Profile</h2>
              <p className="modal-subtitle">
                Creating profile as: <strong>{user?.email}</strong>
              </p>
            </div>
            
            <form onSubmit={handleSubmit}>
              {/* Name Section */}
              <div className="form-section">
                <label className="section-label">Child's Name</label>
                <input
                  type="text"
                  placeholder="Enter child's name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="form-input"
                />
              </div>

              <div className="divider"></div>

              {/* Age Section */}
              <div className="form-section">
                <label className="section-label">Age</label>
                <input
                  type="number"
                  placeholder="Enter age"
                  value={form.age}
                  onChange={(e) => setForm({ ...form, age: e.target.value })}
                  required
                  className="form-input"
                  min="1"
                  max="18"
                />
              </div>

              <div className="divider"></div>

              {/* Support Level Section */}
              <div className="form-section">
                <label className="section-label">Support Level</label>
                <p className="helper-text">
                  This helps us personalize content and activities to their needs
                </p>
                <select
                  value={form.supportLevel}
                  onChange={(e) =>
                    setForm({ ...form, supportLevel: e.target.value })
                  }
                  required
                  className="form-select"
                >
                  <option value="">Select support level</option>
                  <option value="mild">Mild Support</option>
                  <option value="moderate">Moderate Support</option>
                  <option value="substantial">Substantial Support</option>
                  <option value="other">Other/Not Sure</option>
                </select>
              </div>

              <div className="divider"></div>

              {/* Interests Section */}
              <div className="form-section">
                <label className="section-label">Interests (optional)</label>
                <p className="helper-text">
                  We'll use these to recommend activities they'll love
                </p>
                <input
                  type="text"
                  placeholder="e.g., music, animals, colors, numbers (comma-separated)"
                  value={form.interests}
                  onChange={(e) =>
                    setForm({ ...form, interests: e.target.value })
                  }
                  className="form-input"
                />
              </div>

              <div className="divider"></div>

              {/* Action Buttons */}
              <div className="form-actions">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="cancel-btn"
                >
                  Cancel
                </button>
                <button type="submit" className="create-btn">
                  Create Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profiles;