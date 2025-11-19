import React from "react";
import { Link } from "react-router-dom";
import "../../styles/components/notfound.css";

const NotFound = () => {
  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <div className="error-code">
          <span className="four">4</span>
          <span className="zero">0</span>
          <span className="four">4</span>
        </div>
        
        <h1 className="error-title">Halaman Tidak Ditemukan</h1>
        <p className="error-description">
          Ups! Sepertinya halaman yang Anda cari sedang bersembunyi atau tidak ada.
        </p>
        
        <div className="button-group">
          <Link to="/" className="btn-primary">
            <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Kembali ke Beranda
          </Link>
          <button onClick={() => window.history.back()} className="btn-secondary">
            Halaman Sebelumnya
          </button>
        </div>
      </div>
      
      <div className="background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
    </div>
  );
};

export default NotFound;