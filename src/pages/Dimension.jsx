import React, { useEffect, useState } from "react";
import "../styles/dimension_page.css";

const dimensiData = {
    governance: {
        title: "Smart Governance",
        description: "Smart Governance adalah tata kelola pemerintahan yang efektif dan transparan, memanfaatkan teknologi informasi untuk meningkatkan pelayanan publik, partisipasi warga, dan pengambilan keputusan berbasis data. Sistem ini memungkinkan pemerintah untuk memberikan layanan yang lebih cepat, akurat, dan mudah diakses oleh masyarakat melalui platform digital."
    },
    living: {
        title: "Smart Living",
        description: "Smart Living berfokus pada peningkatan kualitas hidup warga melalui lingkungan yang nyaman, fasilitas kesehatan yang baik, pendidikan yang berkualitas, serta gaya hidup yang sehat dan aman. Konsep ini mencakup penggunaan teknologi untuk menciptakan hunian yang efisien energi, transportasi yang terintegrasi, dan akses mudah ke berbagai fasilitas publik."
    },
    branding: {
        title: "Smart Branding",
        description: "Smart Branding adalah upaya untuk membangun citra dan daya tarik kota yang kuat, baik untuk investasi, pariwisata, maupun peningkatan kualitas sumber daya manusia, melalui promosi yang inovatif dan terencana. Strategi ini melibatkan pemanfaatan teknologi digital dan media sosial untuk mempromosikan keunggulan dan potensi daerah secara efektif."
    },
    society: {
        title: "Smart Society",
        description: "Smart Society mendorong masyarakat yang inklusif, kolaboratif, dan adaptif terhadap perubahan, dengan memanfaatkan teknologi untuk memfasilitasi interaksi sosial, akses informasi, dan pengembangan komunitas. Konsep ini menekankan pentingnya literasi digital, partisipasi aktif masyarakat, dan pembangunan modal sosial yang kuat."
    },
    economy: {
        title: "Smart Economy",
        description: "Smart Economy bertujuan untuk menciptakan ekosistem ekonomi yang inovatif dan kompetitif, dengan mendukung startup, pengembangan UMKM, serta pemanfaatan teknologi untuk efisiensi dan pertumbuhan ekonomi lokal. Pendekatan ini mencakup digitalisasi proses bisnis, e-commerce, fintech, dan pengembangan industri kreatif berbasis teknologi."
    },
    environment: {
        title: "Smart Environment",
        description: "Smart Environment berorientasi pada pengelolaan lingkungan yang berkelanjutan, meliputi pengelolaan sampah, energi terbarukan, kualitas udara dan air, serta mitigasi bencana, untuk menciptakan kota yang hijau dan sehat. Sistem ini menggunakan sensor IoT, big data analytics, dan AI untuk monitoring dan pengelolaan sumber daya alam secara optimal."
    }
};

export default function Dimensi() {
  const [selectedDimensi, setSelectedDimensi] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

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

  const handleCardClick = (dimensiType) => {
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

  return (
    <div className="dimensi-page">
      <section className="dimensi-hero-section">
        <div className="container">
          <h1>Dimensi Smart City</h1>
          <p>Mendefinisikan pilar-pilar penting untuk mewujudkan Kabupaten Tangerang sebagai kota pintar yang terintegrasi dan berkelanjutan.</p>
        </div>
      </section>

      <section className="dimensi-content-section">
        <div className="container">
          <h2>Dimensi Smart City</h2>
          
          <div className="dimensi-grid">
            <div 
              className="dimensi-card" 
              tabIndex="0"
              role="button"
              aria-label="Klik untuk melihat detail Smart Governance"
              onClick={() => handleCardClick('governance')}
              onKeyDown={(e) => handleCardKeyDown(e, 'governance')}
            >
              <div className="card-icon">
                <img src="images/smart-governance-icon.png" alt="Smart Governance Icon" 
                     onError={(e) => {e.target.style.display='none'}} />
              </div>
              <h3>Smart Governance</h3>
              <p>Tata kelola pemerintahan yang efisien dan transparan</p>
            </div>
            
            <div 
              className="dimensi-card" 
              tabIndex="0"
              role="button"
              aria-label="Klik untuk melihat detail Smart Living"
              onClick={() => handleCardClick('living')}
              onKeyDown={(e) => handleCardKeyDown(e, 'living')}
            >
              <div className="card-icon">
                <img src="images/smart-living-icon.png" alt="Smart Living Icon" 
                     onError={(e) => {e.target.style.display='none'}} />
              </div>
              <h3>Smart Living</h3>
              <p>Kualitas hidup yang baik dan layak huni</p>
            </div>
            
            <div 
              className="dimensi-card" 
              tabIndex="0"
              role="button"
              aria-label="Klik untuk melihat detail Smart Society"
              onClick={() => handleCardClick('society')}
              onKeyDown={(e) => handleCardKeyDown(e, 'society')}
            >
              <div className="card-icon">
                <img src="images/smart-society-icon.png" alt="Smart Society Icon" 
                     onError={(e) => {e.target.style.display='none'}} />
              </div>
              <h3>Smart Society</h3>
              <p>Masyarakat yang berbudaya digital dan toleran</p>
            </div>
            
            <div 
              className="dimensi-card" 
              tabIndex="0"
              role="button"
              aria-label="Klik untuk melihat detail Smart Economy"
              onClick={() => handleCardClick('economy')}
              onKeyDown={(e) => handleCardKeyDown(e, 'economy')}
            >
              <div className="card-icon">
                <img src="images/smart-economy-icon.png" alt="Smart Economy Icon" 
                     onError={(e) => {e.target.style.display='none'}} />
              </div>
              <h3>Smart Economy</h3>
              <p>Ekonomi yang inovatif, kompetitif, dan berkelanjutan</p>
            </div>
            
            <div 
              className="dimensi-card" 
              tabIndex="0"
              role="button"
              aria-label="Klik untuk melihat detail Smart Environment"
              onClick={() => handleCardClick('environment')}
              onKeyDown={(e) => handleCardKeyDown(e, 'environment')}
            >
              <div className="card-icon">
                <img src="images/smart-environment-icon.png" alt="Smart Environment Icon" 
                     onError={(e) => {e.target.style.display='none'}} />
              </div>
              <h3>Smart Environment</h3>
              <p>Lingkungan yang lestari dan berkelanjutan</p>
            </div>
            
            <div 
              className="dimensi-card" 
              tabIndex="0"
              role="button"
              aria-label="Klik untuk melihat detail Smart Branding"
              onClick={() => handleCardClick('branding')}
              onKeyDown={(e) => handleCardKeyDown(e, 'branding')}
            >
              <div className="card-icon">
                <img src="images/smart-branding-icon.png" alt="Smart Branding Icon" 
                     onError={(e) => {e.target.style.display='none'}} />
              </div>
              <h3>Smart Branding</h3>
              <p>Citra dan promosi kota yang menarik</p>
            </div>
          </div>
        </div>
      </section>

      {isModalOpen && selectedDimensi && (
        <div 
          className="modal" 
          style={{ display: 'block', opacity: '1' }}
          onClick={handleModalClick}
        >
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h3>{selectedDimensi.title}</h3>
            <p>{selectedDimensi.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}