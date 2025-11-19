// src/components/Layout.jsx - Revisi Final

import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header.jsx"; 
import Footer from "./Footer.jsx";

// Impor komponen modular
import ErrorBoundary from "../common/ErrorBoundary.jsx";
import BackToTopButton from "../common/BackToTopButton.jsx";
import PageLoader from "../common/PageLoader.jsx";

// Import CSS Layout
import "../../styles/base/layout.css";

export default function Layout() {
  const [isLoading, setIsLoading] = useState(false);
  const [pageTransition, setPageTransition] = useState(false);
  const location = useLocation();

  // Handle route changes (Simulasi Transisi 300ms)
  useEffect(() => {
    // pageTransition bisa dipertahankan jika Anda masih ingin kelas app-shell 'page-transitioning'
    setPageTransition(true);
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
      setPageTransition(false);
    }, 150);

    return () => clearTimeout(timer);
  }, [location]);

  // Scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // Add body classes
  useEffect(() => {
    const bodyElement = document.body;
    const pathName = location.pathname.substring(1) || 'home';
    const pageClass = `page-${pathName.split('/')[0]}`; 

    bodyElement.className = bodyElement.className.replace(/page-\w+/g, '').trim();
    bodyElement.classList.add(pageClass);

    if (isLoading) {
      bodyElement.classList.add('page-loading');
    } else {
      bodyElement.classList.remove('page-loading');
    }

    return () => {
      bodyElement.classList.remove(pageClass, 'page-loading');
    };
  }, [location, isLoading]);

  return (
    <ErrorBoundary>
      <div className={`app-shell ${pageTransition ? 'page-transitioning' : ''}`}>

        <Header />
        
        <main 
          id="main-content" 
          // Kelas 'loading' akan meredupkan konten saat transisi (300ms)
          className={`main-content ${isLoading ? 'loading' : ''}`} 
          role="main"
        >
          {/* Ini adalah tempat halaman dimuat oleh Suspense dari App.jsx */}
          <Outlet /> 
          
          {/* Spinner ini akan muncul di tengah main content saat isLoading */}
          {isLoading && <PageLoader />}
        </main>
        
        <Footer />
        
        <BackToTopButton />
        
        { }
      </div>
    </ErrorBoundary>
  );
}