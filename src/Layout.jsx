import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by boundary:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="container">
            <div className="error-content">
              <h1>Oops! Terjadi Kesalahan</h1>
              <p>Maaf, terjadi kesalahan yang tidak terduga. Silakan refresh halaman atau coba lagi nanti.</p>
              <button 
                onClick={() => window.location.reload()}
                className="btn btn-primary"
              >
                Refresh Halaman
              </button>
              {process.env.NODE_ENV === 'development' && (
                <details className="error-details">
                  <summary>Detail Error (Development)</summary>
                  <pre>{this.state.error && this.state.error.toString()}</pre>
                  <pre>{this.state.errorInfo.componentStack}</pre>
                </details>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Loading component
const LoadingSpinner = () => (
  <div className="loading-spinner">
    <div className="spinner"></div>
    <p>Memuat halaman...</p>
  </div>
);

// Layout component with enhanced features
export default function Layout() {
  const [isLoading, setIsLoading] = useState(false);
  const [pageTransition, setPageTransition] = useState(false);
  const location = useLocation();

  // Handle route changes with loading states
  useEffect(() => {
    setPageTransition(true);
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
      setPageTransition(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [location]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // Add page-specific body classes
  useEffect(() => {
    const bodyElement = document.body;
    const pathName = location.pathname.substring(1) || 'home';
    const pageClass = `page-${pathName}`;
    
    // Remove any existing page classes
    bodyElement.className = bodyElement.className.replace(/page-\w+/g, '').trim();
    
    // Add current page class
    bodyElement.classList.add(pageClass);
    
    // Add loading class during transitions
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
        {/* Skip to main content link for accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        
        <Header />
        
        {/* Main content area */}
        <main 
          id="main-content" 
          className={`main-content ${isLoading ? 'loading' : ''}`}
          role="main"
        >
          {isLoading ? <LoadingSpinner /> : <Outlet />}
        </main>
        
        <Footer />
        
        {/* Back to top button */}
        <BackToTopButton />
        
        {/* Loading overlay for page transitions */}
        {pageTransition && (
          <div className="page-overlay">
            <LoadingSpinner />
          </div>
        )}
      </div>
      
      <style jsx>{`
        .app-shell {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background-color: #800080;
          transition: opacity 0.3s ease;
        }
        
        .page-transitioning {
          opacity: 0.9;
        }
        
        .main-content {
          flex: 1;
          width: 100%;
          transition: opacity 0.3s ease;
        }
        
        .main-content.loading {
          opacity: 0.7;
        }
        
        .skip-link {
          position: absolute;
          top: -40px;
          left: 6px;
          background: #667eea;
          color: white;
          padding: 8px;
          text-decoration: none;
          border-radius: 0 0 4px 4px;
          z-index: 1001;
          transition: top 0.3s ease;
        }
        
        .skip-link:focus {
          top: 0;
        }
        
        .loading-spinner {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 200px;
          color: white;
        }
        
        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid rgba(255, 255, 255, 0.3);
          border-top: 4px solid #667eea;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 16px;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .page-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(128, 0, 128, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          backdrop-filter: blur(4px);
        }
        
        .error-boundary {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #e74c3c, #c0392b);
          color: white;
          padding: 20px;
        }
        
        .error-content {
          text-align: center;
          max-width: 600px;
        }
        
        .error-content h1 {
          font-size: 2rem;
          margin-bottom: 16px;
          color: white;
        }
        
        .error-content p {
          font-size: 1.1rem;
          margin-bottom: 24px;
          opacity: 0.9;
        }
        
        .error-details {
          margin-top: 24px;
          text-align: left;
          background: rgba(0, 0, 0, 0.2);
          padding: 16px;
          border-radius: 8px;
        }
        
        .error-details pre {
          white-space: pre-wrap;
          word-break: break-word;
          font-size: 0.9rem;
          margin: 8px 0;
        }
        
        .back-to-top {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 50px;
          height: 50px;
          background: #667eea;
          color: white;
          border: none;
          border-radius: 50%;
          font-size: 20px;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
          transition: all 0.3s ease;
          opacity: 0;
          transform: translateY(100px);
          z-index: 1000;
        }
        
        .back-to-top.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .back-to-top:hover {
          background: #764ba2;
          transform: scale(1.1);
        }
        
        @media (max-width: 768px) {
          .back-to-top {
            bottom: 20px;
            right: 20px;
            width: 45px;
            height: 45px;
            font-size: 18px;
          }
        }
        
        /* Page-specific body classes styling */
        :global(body.page-home) {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        :global(body.page-loading) {
          overflow: hidden;
        }
        
        @media (prefers-reduced-motion: reduce) {
          .app-shell,
          .main-content,
          .spinner,
          .back-to-top {
            transition: none;
            animation: none;
          }
        }
      `}</style>
    </ErrorBoundary>
  );
}

// Back to top button component
const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <button
      className={`back-to-top ${isVisible ? 'visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Kembali ke atas"
      title="Kembali ke atas"
    >
      ↑
    </button>
  );
};