// src/Home.jsx
import React from "react";
import { useAuth } from "../Components/Context/AuthContext";
import { useChild } from "../Components/Context/useChild"; // Import from ChildContext
import { useNavigate } from "react-router-dom";
import Fam from "../Assets/fam4.jpeg";
import { FaUser } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa6";
import { IoMusicalNotes } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import "../styles/home.css";

const Home = () => {
  const { userName, setActivePage } = useAuth();
  const { selectedChild } = useChild(); // Get selectedChild from ChildContext
  const navigate = useNavigate();

  const modules = [
    {
      id: 1,
      icon: <FaBookOpen />,
      name: "Learning Modules",
      description: "Interactive lessons designed for different learning styles and sensory needs.",
      link: "/learning"
    },
    {
      id: 2,
      icon: <IoMusicalNotes />,
      name: "Music & Melodies",
      description: "Calming music, rhythmic activities, and sound exploration for sensory regulation.",
      link: "/music"
    },
    {
      id: 3,
      icon: <CiHeart />,
      name: "Progress & Dashboard",
      description: "Track learning progress, save favorites, and monitor your child's journey.",
      link: "/dashboard"
    },
  ];

  const handleStartLearning = () => {
    setActivePage("learning");
    navigate("/learning");
  };

  return (
    <div className="home-container">
      {/* Top Section */}
      <section className="top-box">
        <div className="lft">
          <span className="userIn">
            Welcome back{userName ? `, ${userName}` : ""}!
          </span>
          <h2>Empowering Children, Supporting Parents</h2>
          <p className="intro-text">
            A calm, inclusive learning space designed for autistic children and their caregivers. 
            Every child learns differently — and that's what makes them special.
          </p>

          {/* Child Profile Section */}
          {selectedChild ? (
            <div className="selected-profile">
              <div className="profile-header">
                <div className="profile-avatar">
                  <FaUser className="Uicon" />
                </div>
                <div className="profile-info">
                  <h3>{selectedChild.name}</h3>
                  <p className="profile-age">Age {selectedChild.age}</p>
                </div>
              </div>
              
              <div className="profile-details">
                <div className="support-level">
                  <span className="support-badge">{selectedChild.supportLevel}</span>
                </div>
                
                {selectedChild.interests && selectedChild.interests.length > 0 && (
                  <div className="interests-section">
                    <div className="interests-tags">
                      {selectedChild.interests.map((interest, index) => (
                        <span key={index} className="interest-tag">
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="profile-actions">
                <button className="start-learning-btn" onClick={handleStartLearning}>
                  Start Learning <MdKeyboardArrowRight />
                </button>
                <Link to="/profiles">
                  <button className="manage-profiles-btn">
                    Change Profile
                  </button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="profiles">
              <FaUser className="Uicon" />
              <h3>No Child Profile Selected</h3>
              <p>Create or select a child profile to get started.</p>
              <Link to="/profiles">
                <button className="manage-btn">Manage Child Profiles</button>
              </Link>
            </div>
          )}
        </div>

        <div className="rgt">
          <img src={Fam} alt="Family illustration" />
        </div>
      </section>

      {/* Middle Section */}
      <section className="mid-box">
        <h1>What We Offer</h1>
        <p className="mid-subtext">
          Thoughtfully designed resources to support learning, growth, and well-being.
        </p>

        <div className="grid">
          {modules.map((module) => (
            <div key={module.id} className="module-card">
              <i className="Micon">{module.icon}</i>
              <h3>{module.name}</h3>
              <p>{module.description}</p>
              <Link to={module.link}>
                <button>
                  Explore <MdKeyboardArrowRight />
                </button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Section */}
      <section className="btm-box">
        <i className="Micon"><CiHeart /></i>
        <h2>A Safe Space for Everyone</h2>
        <p>
          Jabali is built on accessibility, inclusivity, and calmness. 
          Every child deserves a learning environment where they feel safe, understood, 
          and empowered to grow at their own pace.
        </p>
      </section>
    </div>
  );
};

export default Home;