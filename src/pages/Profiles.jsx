import React, { useState, useContext } from "react";
import { ChildContext } from "../Components/Context/ChildContext";
import ChildCard from "../Components/ChildCard";
import "../styles/Profiles.css";
import { CgMathPlus } from "react-icons/cg";

const Profiles = () => {
  const { childProfiles, addChild, removeChild } = useContext(ChildContext);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    age: "",
    supportLevel: "",
    interests: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newChild = {
      name: form.name,
      age: parseInt(form.age),
      supportLevel: form.supportLevel,
      interests: form.interests.split(",").map((i) => i.trim()).filter(i => i),
    };
    addChild(newChild);
    setForm({ name: "", age: "", supportLevel: "", interests: "" });
    setShowForm(false);
  };

  const handleCancel = () => {
    setForm({ name: "", age: "", supportLevel: "", interests: "" });
    setShowForm(false);
  };

  return (
    <div className="profiles-container">
      <h1>Child Profiles</h1>
      <p>
        Create and manage profiles for the children you care for. Each profile
        helps us personalize their learning experience.
      </p>

      <div className="profiles-grid">
        {childProfiles.map((child, index) => (
          <ChildCard
            key={index}
            child={child}
            index={index}
            onDelete={removeChild}
          />
        ))}

        <div className="add-profile" onClick={() => setShowForm(true)}>
          <span>
            <CgMathPlus />
          </span>
          <p>Add Child</p>
        </div>
      </div>

      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add New Child Profile</h2>
            
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
                  <option value="Mild Support">Mild Support</option>
                  <option value="Moderate Support">Moderate Support</option>
                  <option value="Substantial Support">Substantial Support</option>
                  <option value="Other/Not Sure">Other/Not Sure</option>
                </select>
              </div>

              <div className="divider"></div>

              {/* Interests Section */}
              <div className="form-section">
                <label className="section-label">Interests (optional)</label>
                <input
                  type="text"
                  placeholder="e.g., music, animals, colors (comma-separated)"
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