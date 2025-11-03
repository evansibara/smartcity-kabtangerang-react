// src/components/LoadingSpinner.jsx

import React from 'react';
import '../styles/spinner.css'; 

// --- Komponen Dots (Internal) ---
const RotatingDots = ({ size = 60, color }) => {
  const style = {
    width: `${size}px`,
    height: `${size}px`,
  };

  return (
    <div className="loading-dots" style={style}>
      <div className="dot" style={{ backgroundColor: color }}></div>
      <div className="dot" style={{ backgroundColor: color }}></div>
      <div className="dot" style={{ backgroundColor: color }}></div>
      <div className="dot" style={{ backgroundColor: color }}></div>
      <div className="dot" style={{ backgroundColor: color }}></div>
      <div className="dot" style={{ backgroundColor: color }}></div>
      <div className="dot" style={{ backgroundColor: color }}></div>
      <div className="dot" style={{ backgroundColor: color }}></div>
    </div>
  );
};


// --- Komponen Wrapper (Diekspor) ---
const LoadingSpinner = () => (
    // Menggunakan kelas CSS loading-spinner sebagai container layout
    <div className="loading-spinner"> 
        <RotatingDots size={70} /> 
    </div>
);

export default LoadingSpinner;