import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// Performance monitoring and error handling
const initializeApp = () => {
  // Create root element
  const container = document.getElementById('root');
  
  if (!container) {
    throw new Error('Root container not found');
  }
  
  const root = createRoot(container);
  
  // Performance observer for Core Web Vitals
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          // Log performance metrics
          if (entry.entryType === 'largest-contentful-paint') {
            console.log('LCP:', entry.startTime);
          }
          if (entry.entryType === 'first-input') {
            console.log('FID:', entry.processingStart - entry.startTime);
          }
          if (entry.entryType === 'layout-shift') {
            console.log('CLS:', entry.value);
          }
        });
      });
      
      observer.observe({ type: 'largest-contentful-paint', buffered: true });
      observer.observe({ type: 'first-input', buffered: true });
      observer.observe({ type: 'layout-shift', buffered: true });
    } catch (e) {
      console.log('Performance observer not supported');
    }
  }
  
  // Error boundary for unhandled errors
  window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    
    // Send error to monitoring service in production
    if (process.env.NODE_ENV === 'production') {
      // Replace with your error monitoring service
      // errorMonitoringService.captureException(event.error);
    }
  });
  
  // Unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    
    if (process.env.NODE_ENV === 'production') {
      // errorMonitoringService.captureException(event.reason);
    }
  });
  
  // Initialize app with error boundary
  try {
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  } catch (error) {
    console.error('Failed to render app:', error);
    
    // Fallback UI
    container.innerHTML = `
      <div style="
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        background: linear-gradient(135deg, #e74c3c, #c0392b);
        color: white;
        font-family: Arial, sans-serif;
        text-align: center;
        padding: 20px;
      ">
        <div>
          <h1 style="font-size: 2rem; margin-bottom: 16px;">Aplikasi Tidak Dapat Dimuat</h1>
          <p style="font-size: 1.1rem; margin-bottom: 24px; opacity: 0.9;">
            Maaf, terjadi kesalahan saat memuat aplikasi. Silakan refresh halaman atau hubungi administrator.
          </p>
          <button 
            onclick="window.location.reload()" 
            style="
              background: linear-gradient(135deg, #667eea, #764ba2);
              color: white;
              border: none;
              padding: 12px 24px;
              border-radius: 25px;
              font-size: 1rem;
              font-weight: 600;
              cursor: pointer;
              transition: all 0.3s ease;
            "
            onmouseover="this.style.transform='translateY(-2px)'"
            onmouseout="this.style.transform='translateY(0)'"
          >
            Refresh Halaman
          </button>
        </div>
      </div>
    `;
  }
};

// SEO and meta tags setup
const setupSEO = () => {
  // Set default meta tags if not present
  const defaultMetas = [
    { name: 'description', content: 'SmartCity Kabupaten Tangerang - Mewujudkan kota pintar yang terintegrasi dan berkelanjutan melalui teknologi informasi dan komunikasi.' },
    { name: 'keywords', content: 'smart city, kabupaten tangerang, teknologi, inovasi, pemerintahan digital, kota pintar' },
    { name: 'author', content: 'SmartCity Kabupaten Tangerang' },
    { name: 'robots', content: 'index, follow' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
    { name: 'theme-color', content: '#800080' },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'SmartCity Kabupaten Tangerang' },
    { property: 'og:locale', content: 'id_ID' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:creator', content: '@tangerangkab' }
  ];
  
  defaultMetas.forEach(({ name, property, content }) => {
    const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`;
    const existing = document.querySelector(selector);
    
    if (!existing) {
      const meta = document.createElement('meta');
      if (name) meta.name = name;
      if (property) meta.property = property;
      meta.content = content;
      document.head.appendChild(meta);
    }
  });
  
  // Set default title if not present
  if (!document.title) {
    document.title = 'SmartCity Kabupaten Tangerang';
  }
  
  // Add structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "GovernmentOrganization",
    "name": "SmartCity Kabupaten Tangerang",
    "description": "Inisiatif SmartCity Kabupaten Tangerang untuk mewujudkan kota pintar yang terintegrasi dan berkelanjutan",
    "url": window.location.origin,
    "areaServed": {
      "@type": "Place",
      "name": "Kabupaten Tangerang"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service"
    }
  };
  
  if (!document.querySelector('script[type="application/ld+json"]')) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
  }
};

// PWA setup
const setupPWA = () => {
  // Add manifest link if not present
  if (!document.querySelector('link[rel="manifest"]')) {
    const manifest = document.createElement('link');
    manifest.rel = 'manifest';
    manifest.href = '/manifest.json';
    document.head.appendChild(manifest);
  }
  
  // Add apple touch icon if not present
  if (!document.querySelector('link[rel="apple-touch-icon"]')) {
    const appleIcon = document.createElement('link');
    appleIcon.rel = 'apple-touch-icon';
    appleIcon.href = '/icon-192x192.png';
    document.head.appendChild(appleIcon);
  }
  
  // Handle PWA install prompt
  let deferredPrompt;
  
  window.addEventListener('beforeinstallprompt', (e) => {
    deferredPrompt = e;
    e.preventDefault();
    
    // Show install button or banner if desired
    // showInstallPromotion();
  });
  
  window.addEventListener('appinstalled', () => {
    console.log('PWA was installed');
    deferredPrompt = null;
  });
};

  

// Initialize everything
const init = () => {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
    return;
  }
  
  try {
    setupSEO();
    setupPWA();
    initializeApp();
    
    console.log('SmartCity App initialized successfully');
  } catch (error) {
    console.error('Failed to initialize app:', error);
    
    // Fallback error display
    const root = document.getElementById('root');
    if (root) {
      root.innerHTML = `
        <div style="
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background: #e74c3c;
          color: white;
          font-family: Arial, sans-serif;
          text-align: center;
          padding: 20px;
        ">
          <div>
            <h1>Kesalahan Sistem</h1>
            <p>Aplikasi tidak dapat dimuat. Silakan hubungi administrator atau coba lagi nanti.</p>
            <button onclick="window.location.reload()" style="
              background: white;
              color: #e74c3c;
              border: none;
              padding: 10px 20px;
              border-radius: 5px;
              cursor: pointer;
              margin-top: 20px;
            ">
              Coba Lagi
            </button>
          </div>
        </div>
      `;
    }
  }
};

// Start initialization
init();