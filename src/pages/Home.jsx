import React, { useEffect, useState } from "react";
import "../styles/header.css";
import "../styles/footer.css";
import "../styles/home_page.css";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Set loaded state after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);

    // Add hero section animations
    const heroSection = document.querySelector('.hero-content');
    if (heroSection) {
      heroSection.style.opacity = '0';
      heroSection.style.transform = 'translateY(30px)';
      
      setTimeout(() => {
        heroSection.style.transition = 'opacity 1s ease, transform 1s ease';
        heroSection.style.opacity = '1';
        heroSection.style.transform = 'translateY(0)';
      }, 200);
    }
  }, []);

  return (
    <main className={`home-page ${isLoaded ? 'loaded' : ''}`}>
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <h1>Selamat Datang di SmartCity Kabupaten Tangerang</h1>
          <p>Mewujudkan Kabupaten Tangerang sebagai kota pintar yang terintegrasi dan berkelanjutan melalui inovasi teknologi dan pelayanan digital terdepan.</p>
          <div className="hero-buttons">
            <a href="/dimensi" className="btn btn-primary">
              Jelajahi Dimensi
            </a>
            <a href="/profile" className="btn btn-secondary">
              Pelajari Lebih Lanjut
            </a>
          </div>
        </div>
      </section>
      
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Fitur Unggulan SmartCity</h2>
            <p>Discover the innovative features that make our smart city initiative special</p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                </svg>
              </div>
              <h3>Smart Governance</h3>
              <p>Tata kelola pemerintahan yang transparan dan efisien dengan dukungan teknologi digital</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21c0-2.5-3.5-4-8-4s-8 1.5-8 4"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <h3>Smart Society</h3>
              <p>Masyarakat yang terdidik, berbudaya digital, dan berpartisipasi aktif dalam pembangunan</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                </svg>
              </div>
              <h3>Smart Living</h3>
              <p>Lingkungan hunian yang nyaman, sehat, dan berkelanjutan untuk semua warga</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">6</div>
              <div className="stat-label">Dimensi Smart City</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">1.5M+</div>
              <div className="stat-label">Penduduk</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">29</div>
              <div className="stat-label">Kecamatan</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">246</div>
              <div className="stat-label">Kelurahan/Desa</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}