// src/components/ErrorBoundary.jsx

import React from 'react';
// Error Boundary Component harus berupa Class Component
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
    
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by boundary:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      // Menggunakan kelas CSS dari layout.css (sudah dipindah)
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
              {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
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

export default ErrorBoundary;