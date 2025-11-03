import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home_page.css";

const dimensiData = {
  governance: {
    title: "Smart Governance",
    description: "Smart Governance adalah tata kelola pemerintahan yang efektif dan transparan, memanfaatkan teknologi informasi untuk meningkatkan pelayanan publik, partisipasi warga, dan pengambilan keputusan berbasis data. Sistem ini memungkinkan pemerintah untuk memberikan layanan yang lebih cepat, akurat, dan mudah diakses oleh masyarakat melalui platform digital.",
    details: [
      "Transparansi dan akuntabilitas pemerintah",
      "Layanan publik digital yang mudah diakses",
      "Partisipasi aktif masyarakat dalam pengambilan keputusan",
      "E-Government dan digitalisasi administrasi"
    ],
    url: "/SmartGovernance"
  },
  living: {
    title: "Smart Living",
    description: "Smart Living berfokus pada peningkatan kualitas hidup warga melalui lingkungan yang nyaman, fasilitas kesehatan yang baik, pendidikan yang berkualitas, serta gaya hidup yang sehat dan aman. Konsep ini mencakup penggunaan teknologi untuk menciptakan hunian yang efisien energi, transportasi yang terintegrasi, dan akses mudah ke berbagai fasilitas publik.",
    details: [
      "Infrastruktur rumah pintar (smart home)",
      "Fasilitas kesehatan dan pendidikan berkualitas",
      "Keamanan dan kenyamanan hunian",
      "Aksesibilitas layanan publik yang mudah"
    ],
    url: "/SmartLiving"
  },
  branding: {
    title: "Smart Branding",
    description: "Smart Branding adalah upaya untuk membangun citra dan daya tarik kota yang kuat, baik untuk investasi, pariwisata, maupun peningkatan kualitas sumber daya manusia, melalui promosi yang inovatif dan terencana. Strategi ini melibatkan pemanfaatan teknologi digital dan media sosial untuk mempromosikan keunggulan dan potensi daerah secara efektif.",
    details: [
      "Promosi potensi daerah melalui media digital",
      "Pengembangan identitas dan citra kota",
      "Peningkatan daya tarik investasi dan pariwisata",
      "Branding inovatif berbasis data dan kreativitas"
    ],
    url: "/SmartBranding"
  },
  society: {
    title: "Smart Society",
    description: "Smart Society mendorong masyarakat yang inklusif, kolaboratif, dan adaptif terhadap perubahan, dengan memanfaatkan teknologi untuk memfasilitasi interaksi sosial, akses informasi, dan pengembangan komunitas. Konsep ini menekankan pentingnya literasi digital, partisipasi aktif masyarakat, dan pembangunan modal sosial yang kuat.",
    details: [
      "Literasi digital dan teknologi untuk semua",
      "Kolaborasi dan partisipasi masyarakat",
      "Inklusivitas dan keberagaman sosial",
      "Pengembangan komunitas yang adaptif"
    ],
    url: "/SmartSociety"
  },
  economy: {
    title: "Smart Economy",
    description: "Smart Economy bertujuan untuk menciptakan ekosistem ekonomi yang inovatif dan kompetitif, dengan mendukung startup, pengembangan UMKM, serta pemanfaatan teknologi untuk efisiensi dan pertumbuhan ekonomi lokal. Pendekatan ini mencakup digitalisasi proses bisnis, e-commerce, fintech, dan pengembangan industri kreatif berbasis teknologi.",
    details: [
      "Dukungan untuk startup dan UMKM",
      "Digitalisasi proses bisnis dan e-commerce",
      "Pengembangan industri kreatif dan inovatif",
      "Ekosistem ekonomi yang kompetitif"
    ],
    url: "/SmartEconomy"
  },
  environment: {
    title: "Smart Environment",
    description: "Smart Environment berorientasi pada pengelolaan lingkungan yang berkelanjutan, meliputi pengelolaan sampah, energi terbarukan, kualitas udara dan air, serta mitigasi bencana, untuk menciptakan kota yang hijau dan sehat. Sistem ini menggunakan sensor IoT, big data analytics, dan AI untuk monitoring dan pengelolaan sumber daya alam secara optimal.",
    details: [
      "Pengelolaan sampah dan daur ulang",
      "Energi terbarukan dan efisiensi energi",
      "Monitoring kualitas udara dan air",
      "Mitigasi bencana dan ketahanan lingkungan"
    ],
    url: "/SmartEnvironment"
  }
};

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedDimensi, setSelectedDimensi] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoaded(true);
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleKeydown = (event) => {
      if (event.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [isModalOpen]);

  const showModal = (dimensiType) => {
    const data = dimensiData[dimensiType];
    if (data) {
      setSelectedDimensi(data);
      setIsModalOpen(true);
      document.body.style.overflow = 'hidden';
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDimensi(null);
    document.body.style.overflow = 'auto';
  };

  const handleCardClick = (dimensiType, event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    showModal(dimensiType);
  };

  const handleCardKeyDown = (event, dimensiType) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      showModal(dimensiType);
    }
  };

  const handleModalClick = (event) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  const handleNavigateToDimensi = () => {
    if (selectedDimensi && selectedDimensi.url) {
      navigate(selectedDimensi.url);
      closeModal();
    }
  };

  return (
    <main className={`home-page ${isLoaded ? 'loaded' : ''}`}>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background"></div>
        <div className="hero-content">
          <h1>Selamat Datang di SmartCity<br />Kabupaten Tangerang</h1>
          <p>Mewujudkan Kabupaten Tangerang sebagai kota cerdas dan berkelanjutan</p>
          <button className="btn-explore">Jelajahi Dimensi</button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <h2>Fitur Unggulan SmartCity</h2>
          <p>Discover the innovative features that make our smart city initiative special</p>
        </div>
        
        <div className="features-grid">
          {/* Row 1 */}
          <div 
            className="feature-card"
            tabIndex="0"
            role="button"
            aria-label="Klik untuk melihat detail Smart Governance"
            onClick={(e) => handleCardClick('governance', e)}
            onKeyDown={(e) => handleCardKeyDown(e, 'governance')}
          >
            <div className="feature-icon governance">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
              </svg>
            </div>
            <h3>Smart Governance</h3>
            <p>Tata kelola pemerintahan yang transparan dan efisien dengan dukungan teknologi digital</p>
          </div>

          <div 
            className="feature-card"
            tabIndex="0"
            role="button"
            aria-label="Klik untuk melihat detail Smart Living"
            onClick={(e) => handleCardClick('living', e)}
            onKeyDown={(e) => handleCardKeyDown(e, 'living')}
          >
            <div className="feature-icon living">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              </svg>
            </div>
            <h3>Smart Living</h3>
            <p>Lingkungan hunian yang nyaman, sehat, dan berkelanjutan untuk semua warga</p>
          </div>

          <div 
            className="feature-card"
            tabIndex="0"
            role="button"
            aria-label="Klik untuk melihat detail Smart Society"
            onClick={(e) => handleCardClick('society', e)}
            onKeyDown={(e) => handleCardKeyDown(e, 'society')}
          >
            <div className="feature-icon society">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21c0-2.5-3.5-4-8-4s-8 1.5-8 4"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <h3>Smart Society</h3>
            <p>Masyarakat yang terdidik, berbudaya digital, dan berpartisipasi aktif dalam pembangunan</p>
          </div>

          {/* Row 2 */}
          <div 
            className="feature-card"
            tabIndex="0"
            role="button"
            aria-label="Klik untuk melihat detail Smart Economy"
            onClick={(e) => handleCardClick('economy', e)}
            onKeyDown={(e) => handleCardKeyDown(e, 'economy')}
          >
            <div className="feature-icon economy">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
            </div>
            <h3>Smart Economy</h3>
            <p>Ekonomi yang inovatif, kompetitif, dan berkelanjutan</p>
          </div>

          <div 
            className="feature-card"
            tabIndex="0"
            role="button"
            aria-label="Klik untuk melihat detail Smart Environment"
            onClick={(e) => handleCardClick('environment', e)}
            onKeyDown={(e) => handleCardKeyDown(e, 'environment')}
          >
            <div className="feature-icon environment">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                <line x1="12" y1="22.08" x2="12" y2="12"/>
              </svg>
            </div>
            <h3>Smart Environment</h3>
            <p>Lingkungan yang lestari dan berkelanjutan</p>
          </div>

          <div 
            className="feature-card"
            tabIndex="0"
            role="button"
            aria-label="Klik untuk melihat detail Smart Branding"
            onClick={(e) => handleCardClick('branding', e)}
            onKeyDown={(e) => handleCardKeyDown(e, 'branding')}
          >
            <div className="feature-icon branding">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            </div>
            <h3>Smart Branding</h3>
            <p>Citra dan promosi kota yang menarik</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">6</div>
            <div className="stat-label">Dimensi Smart City</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">1.5JT+</div>
            <div className="stat-label">Penduduk</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">29</div>
            <div className="stat-label">Kecamatan</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">246</div>
            <div className="stat-label">Kelurahan/Desa</div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && selectedDimensi && (
        <div 
          className="modal" 
          style={{ display: 'block', opacity: '1' }}
          onClick={handleModalClick}
        >
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h3>{selectedDimensi.title}</h3>
            
            <p className="modal-description">
              {selectedDimensi.description}
            </p>

            <div className="modal-details">
              <h4>Fokus Utama:</h4>
              <ul>
                {selectedDimensi.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>

            <div className="modal-button-container">
              <button 
                className="modal-btn modal-btn-primary"
                onClick={handleNavigateToDimensi}
              >
                Kunjungi Halaman
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
              <button 
                className="modal-btn modal-btn-secondary"
                onClick={closeModal}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}