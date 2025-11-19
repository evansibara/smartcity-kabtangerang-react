// src/components/PageLoader.jsx

import React from 'react';
import '../../styles/components/page_loader.css';

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
const PageLoader = ({ fullscreen = false, message = "Memuat halaman..." }) => (
    // Menggunakan kelas CSS loading-spinner sebagai container layout
    // Tambahkan 'fullscreen' jika prop fullscreen true
    <div className={`loading-spinner ${fullscreen ? 'fullscreen' : ''}`}>
        <RotatingDots size={70} />
    </div>
);

export default PageLoader;
