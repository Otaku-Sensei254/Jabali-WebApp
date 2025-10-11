// src/Components/Context/ChildContext.js
import React, { createContext, useState, useEffect, useContext } from "react";

export const ChildContext = createContext();

export const ChildProvider = ({ children }) => {
  const [childProfiles, setChildProfiles] = useState(() => {
    const saved = localStorage.getItem("childProfiles");
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedChild, setSelectedChild] = useState(() => {
    const saved = localStorage.getItem("selectedChild");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem("childProfiles", JSON.stringify(childProfiles));
  }, [childProfiles]);

  useEffect(() => {
    localStorage.setItem("selectedChild", JSON.stringify(selectedChild));
  }, [selectedChild]);

  const addChild = (child) => {
    setChildProfiles((prev) => [...prev, child]);
  };

  const removeChild = (index) => {
    setChildProfiles((prev) => prev.filter((_, i) => i !== index));
    // If we're deleting the selected child, clear selection
    if (selectedChild && childProfiles[index]?.name === selectedChild.name) {
      setSelectedChild(null);
    }
  };

  const selectChild = (child) => {
    setSelectedChild(child);
  };

  const clearSelectedChild = () => {
    setSelectedChild(null);
  };

  return (
    <ChildContext.Provider value={{ 
      childProfiles, 
      selectedChild,
      addChild, 
      removeChild,
      selectChild,
      clearSelectedChild
    }}>
      {children}
    </ChildContext.Provider>
  );
};