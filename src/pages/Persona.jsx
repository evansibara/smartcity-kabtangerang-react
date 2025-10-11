import React, { useEffect, useState } from "react";
import "../styles/header.css";
import "../styles/footer.css";
import "../styles/persona_page.css";

export default function Persona() {
  const [activeTab, setActiveTab] = useState('aparatur');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);

    // Initialize animations
    initializeAnimations();
    
    // Setup intersection observers
    setupIntersectionObservers();
    
    return () => {
      // Cleanup if needed
    };
  }, []);

  const initializeAnimations = () => {
    // Animate intro section
    const introSection = document.querySelector('.intro-section');
    if (introSection) {
      introSection.style.opacity = '0';
      introSection.style.transform = 'translateY(30px)';
      
      setTimeout(() => {
        introSection.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        introSection.style.opacity = '1';
        introSection.style.transform = 'translateY(0)';
      }, 100);
    }
  };

  const setupIntersectionObservers = () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    // Observe person cards with staggered animation
    const personCards = document.querySelectorAll('.person-card');
    personCards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
      observer.observe(card);
    });
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase().trim());
  };

  const handleCardClick = (cardElement) => {
    if (cardElement) {
      cardElement.style.transform = 'scale(0.98)';
      setTimeout(() => {
        cardElement.style.transform = '';
      }, 150);
    }
  };

  const handleCardKeyDown = (event, cardRef) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleCardClick(cardRef.current);
    }
  };

  const filterPersonCards = (cards) => {
    if (!searchTerm) return cards;
    
    return cards.filter(card => {
      const name = card.name?.toLowerCase() || '';
      const position = card.position?.toLowerCase() || '';
      const description = card.description?.toLowerCase() || '';
      
      return name.includes(searchTerm) || 
             position.includes(searchTerm) || 
             description.includes(searchTerm);
    });
  };

  const aparaturData = [
    {
      id: 1,
      name: "Dr. H. Ahmad Zaki Iskandar, S.T., M.T.",
      position: "Kepala Dinas Komunikasi dan Informatika",
      description: "Memimpin dan mengkoordinasikan seluruh program SmartCity di Kabupaten Tangerang",
      image: "/images/placeholder-avatar.jpg",
      isLeadership: true
    },
    {
      id: 2,
      name: "Dra. Siti Nurhaliza, M.M.",
      position: "Sekretaris Dinas",
      description: "Mengelola administrasi dan koordinasi internal dinas untuk mendukung program SmartCity",
      image: "/images/placeholder-avatar.jpg"
    },
    {
      id: 3,
      name: "Ir. Muhammad Rizki Pratama, M.T.",
      position: "Kepala Bidang Teknologi Informasi",
      description: "Bertanggung jawab atas pengembangan infrastruktur teknologi dan sistem informasi SmartCity",
      image: "/images/placeholder-avatar.jpg"
    },
    {
      id: 4,
      name: "Dr. Indah Permata Sari, S.Kom., M.Kom.",
      position: "Kepala Bidang Manajemen Data",
      description: "Mengelola data dan analitik untuk mendukung pengambilan keputusan berbasis data",
      image: "/images/placeholder-avatar.jpg"
    },
    {
      id: 5,
      name: "Drs. Budi Santoso, M.Si.",
      position: "Kepala Bidang Inovasi Digital",
      description: "Mendorong inovasi dan pengembangan solusi digital untuk pelayanan publik",
      image: "/images/placeholder-avatar.jpg"
    }
  ];

  const tenagaAhliData = [
    {
      id: 1,
      name: "Dr. Siti Aminah, M.Kom.",
      position: "Tenaga Ahli Teknologi",
      description: "Memberikan masukan teknis dan strategis terkait implementasi teknologi",
      image: "/images/placeholder-avatar.jpg"
    }
  ];

  const PersonCard = ({ person }) => {
    const cardRef = React.useRef(null);

    return (
      <div 
        ref={cardRef}
        className={`person-card ${person.isLeadership ? 'leadership' : ''}`}
        tabIndex="0"
        role="button"
        aria-label={`Lihat detail ${person.name}`}
        onClick={() => handleCardClick(cardRef.current)}
        onKeyDown={(e) => handleCardKeyDown(e, cardRef)}
      >
        <div className="person-image">
          <img 
            src={person.image} 
            alt={person.name}
            onError={(e) => {
              e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI0MCIgdmlld0JveD0iMCAwIDIwMCAyNDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjQwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjgwIiByPSIzMCIgZmlsbD0iI0Q1REJEQiIvPgo8cGF0aCBkPSJNNTAgMTgwVjE2MEM1MCAxNDAuOTU3IDY1Ljk1NzMgMTI1IDg1IDEyNUgxMTVDMTM0LjA0MyAxMjUgMTUwIDE0MC45NTcgMTUwIDE2MFYxODAiIGZpbGw9IiNENURCREIiLz4KPC9zdmc+"; 
            }}
          />
        </div>
        <div className="person-info">
          <h3>{person.name}</h3>
          <p className="position">{person.position}</p>
          <p className="description">{person.description}</p>
        </div>
      </div>
    );
  };

  return (
    <main className="persona-main">
      {/* Hero Section with Background */}
      <div className="persona-hero">
        <div className="persona-hero-content">
          <h1>Tim SmartCity Kabupaten Tangerang</h1>
          <p>Struktur organisasi SmartCity Kabupaten Tangerang yang terdiri dari berbagai divisi dan unit kerja yang berkolaborasi untuk mewujudkan kota cerdas yang terintegrasi dan berkelanjutan.</p>
        </div>
      </div>

      <div className="container">
        {/* Search Bar */}
        <div className="search-section">
          <input
            type="text"
            id="searchBar"
            placeholder="Cari berdasarkan nama, jabatan, atau deskripsi..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
        </div>

        <div className="org-navigation">
          <div className="nav-tabs">
            <button 
              className={`nav-tab ${activeTab === 'aparatur' ? 'active' : ''}`}
              onClick={() => handleTabClick('aparatur')}
            >
              Aparatur Sipil Negara
            </button>
            <button 
              className={`nav-tab ${activeTab === 'tenaga-ahli' ? 'active' : ''}`}
              onClick={() => handleTabClick('tenaga-ahli')}
            >
              Tenaga Ahli
            </button>
          </div>
        </div>

        <section 
          id="aparatur" 
          className={`org-section ${activeTab === 'aparatur' ? 'active' : ''}`}
        >
          <div className="org-grid">
            {filterPersonCards(aparaturData).map(person => (
              <PersonCard key={person.id} person={person} />
            ))}
            {filterPersonCards(aparaturData).length === 0 && (
              <div className="no-results">
                <p>Tidak ada hasil yang ditemukan untuk "{searchTerm}"</p>
              </div>
            )}
          </div>
        </section>

        <section 
          id="tenaga-ahli" 
          className={`org-section ${activeTab === 'tenaga-ahli' ? 'active' : ''}`}
        >
          <div className="org-grid">
            {filterPersonCards(tenagaAhliData).map(person => (
              <PersonCard key={person.id} person={person} />
            ))}
            {filterPersonCards(tenagaAhliData).length === 0 && (
              <div className="no-results">
                <p>Tidak ada hasil yang ditemukan untuk "{searchTerm}"</p>
              </div>
            )}
          </div>
        </section>
      </div>

      <style jsx>{`
        .search-section {
          margin: 2rem 0;
          text-align: center;
        }
        
        .search-input {
          width: 100%;
          max-width: 400px;
          padding: 12px 20px;
          border: 2px solid #ddd;
          border-radius: 25px;
          font-size: 16px;
          outline: none;
          transition: border-color 0.3s ease;
        }
        
        .search-input:focus {
          border-color: #667eea;
        }
        
        .no-results {
          grid-column: 1 / -1;
          text-align: center;
          padding: 2rem;
          color: #666;
          font-style: italic;
        }
        
        .person-card:focus {
          outline: 3px solid #667eea;
          outline-offset: 2px;
        }
        
        @media (max-width: 768px) {
          .search-input {
            font-size: 16px;
          }
        }
      `}</style>
    </main>
  );
}