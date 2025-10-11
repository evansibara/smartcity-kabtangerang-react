import React, { useEffect, useState } from "react";
import "../styles/header.css";
import "../styles/footer.css";
import "../styles/profile_page.css";

export default function Profile() {
  const [animatedStats, setAnimatedStats] = useState({});

  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);

    // Initialize animations
    initializeAnimations();
    
    return () => {
      // Cleanup any event listeners if needed
    };
  }, []);

  const initializeAnimations = () => {
    // Setup intersection observers for animations
    setupIntersectionObservers();
  };

  const setupIntersectionObservers = () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          
          // Animate stats
          if (entry.target.classList.contains('stat-number')) {
            animateStatNumber(entry.target);
          }
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    // Observe sections
    const sections = document.querySelectorAll('.profile-overview-section, .vision-mission-section, .timeline-section');
    sections.forEach(section => {
      section.style.opacity = '0';
      section.style.transform = 'translateY(50px)';
      section.style.transition = 'opacity 1s ease, transform 1s ease';
      observer.observe(section);
    });

    // Observe cards
    const cards = document.querySelectorAll('.vm-card, .objective-card, .timeline-item');
    cards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
      observer.observe(card);
    });

    // Observe stats
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
      observer.observe(stat);
    });
  };

  const animateStatNumber = (element) => {
    const finalValue = element.textContent;
    let numericValue = parseFloat(finalValue.replace(/[^\d.]/g, ''));
    let suffix = finalValue.replace(/[\d.]/g, '').replace(/\s/g, '');

    if (finalValue.includes('M') || finalValue.includes('m')) {
      numericValue = numericValue * 1000000;
      suffix = '+';
    } else if (finalValue.includes('K') || finalValue.includes('k')) {
      numericValue = numericValue * 1000;
      suffix = '+';
    }

    if (isNaN(numericValue)) {
      numericValue = parseInt(finalValue) || 0;
    }

    animateNumber(element, 0, numericValue, suffix, 2000);
  };

  const animateNumber = (element, start, end, suffix, duration) => {
    const startTime = performance.now();
    
    const updateNumber = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + (end - start) * easeOutCubic);
      
      let displayValue = current.toLocaleString();
      
      if (end >= 1000000) {
        displayValue = (current / 1000000).toFixed(1) + 'M';
      } else if (end >= 1000) {
        displayValue = Math.floor(current / 1000) + 'K';
      }
      
      element.textContent = displayValue + (suffix || '');
      
      if (progress < 1) {
        requestAnimationFrame(updateNumber);
      }
    };
    
    requestAnimationFrame(updateNumber);
  };

  const handleCardClick = (cardType) => {
    // Add pulse animation
    const cards = document.querySelectorAll(`.${cardType}`);
    cards.forEach(card => {
      card.style.animation = 'pulse 0.6s ease-in-out';
      setTimeout(() => {
        card.style.animation = '';
      }, 600);
    });
  };

  const handleKeyDown = (event, cardType) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleCardClick(cardType);
    }
  };

  return (
    <main className="profile-main">
      <section className="profile-hero-section">
        <div className="container">
          <h1>Profile SmartCity</h1>
          <p>Mengenal lebih dalam visi, misi, dan strategi pengembangan Kabupaten Tangerang sebagai kota pintar yang berkelanjutan.</p>
        </div>
      </section>

      <section className="profile-overview-section">
        <div className="container">
          <div className="overview-grid">
            <div className="overview-content">
              <h2>Tentang SmartCity Kabupaten Tangerang</h2>
              <p>SmartCity Kabupaten Tangerang adalah inisiatif transformasi digital yang bertujuan untuk meningkatkan kualitas hidup masyarakat melalui penerapan teknologi informasi dan komunikasi yang terintegrasi. Program ini dirancang untuk menciptakan tata kelola pemerintahan yang efisien, pelayanan publik yang prima, dan pembangunan ekonomi yang berkelanjutan.</p>
              
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
            <div className="overview-image">
              <div className="image-placeholder">
                <div className="placeholder-content">
                  <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                    <polyline points="3.27,6.96 12,12.01 20.73,6.96"/>
                    <line x1="12" y1="22.08" x2="12" y2="12"/>
                  </svg>
                  <p>Smart Infrastructure</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="vision-mission-section">
        <div className="container">
          <div className="section-header">
            <h2>Visi dan Misi</h2>
          </div>
          <div className="vm-grid">
            <div 
              className="vm-card"
              tabIndex="0"
              role="button"
              onClick={() => handleCardClick('vm-card')}
              onKeyDown={(e) => handleKeyDown(e, 'vm-card')}
            >
              <h3>Visi</h3>
              <p>Terwujudnya Kabupaten Tangerang sebagai Smart City yang terintegrasi, inovatif, dan berkelanjutan menuju masyarakat sejahtera dan berdaya saing global.</p>
            </div>
            <div 
              className="vm-card"
              tabIndex="0"
              role="button"
              onClick={() => handleCardClick('vm-card')}
              onKeyDown={(e) => handleKeyDown(e, 'vm-card')}
            >
              <h3>Misi</h3>
              <ul>
                <li>Mengembangkan tata kelola pemerintahan yang cerdas dan transparan.</li>
                <li>Meningkatkan kualitas pelayanan publik berbasis digital.</li>
                <li>Mendorong pertumbuhan ekonomi kreatif dan inovatif.</li>
                <li>Menciptakan lingkungan yang bersih dan berkelanjutan.</li>
                <li>Memperkuat partisipasi masyarakat dalam pembangunan kota.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="timeline-section">
        <div className="container">
          <div className="section-header">
            <h2>Roadmap SmartCity</h2>
          </div>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-date">2022</div>
              <div className="timeline-content">
                <h4>Fase Perencanaan</h4>
                <p>Studi kelayakan dan penyusunan masterplan SmartCity</p>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-date">2023</div>
              <div className="timeline-content">
                <h4>Fase Pengembangan</h4>
                <p>Pengembangan platform digital dan sistem informasi</p>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-date">2024</div>
              <div className="timeline-content">
                <h4>Fase Implementasi</h4>
                <p>Peluncuran aplikasi layanan publik dan sistem monitoring kota</p>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-date">2025</div>
              <div className="timeline-content">
                <h4>Fase Integrasi</h4>
                <p>Integrasi penuh semua dimensi SmartCity dan evaluasi komprehensif</p>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-date">2026+</div>
              <div className="timeline-content">
                <h4>Fase Optimasi</h4>
                <p>Pengembangan berkelanjutan dan inovasi teknologi terdepan</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
      `}</style>
    </main>
  );
}