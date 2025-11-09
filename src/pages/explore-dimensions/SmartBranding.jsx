import React, { useState } from 'react';
import { Calendar, User, Eye, Clock } from 'lucide-react';
import '../../styles/smart_branding.css';

export default function SmartBranding() {
  const [selectedCategory, setSelectedCategory] = useState('semua');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const artikelData = [
    {
      id: 1,
      title: 'Peluncuran Logo dan Slogan Baru Kabupaten Tangerang',
      excerpt: 'Pemerintah daerah merilis identitas visual baru yang mencerminkan semangat Smart City, inovasi, dan keberlanjutan.',
      category: 'berita',
      categoryLabel: 'BERITA',
      date: '05 Desember 2025',
      author: 'Tim Komunikasi Publik',
      views: '2100 views',
      readTime: '4 min',
      image: '/images/branding_launch.jpg'
    },
    {
      id: 2,
      title: 'Peran Media Sosial dalam Membangun Citra Kota Digital',
      excerpt: 'Strategi pemanfaatan platform digital untuk meningkatkan engagement publik dan mempromosikan destinasi unggulan daerah.',
      category: 'inovasi',
      categoryLabel: 'INOVASI',
      date: '01 Desember 2025',
      author: 'Maya Sari, M.Sc.',
      views: '1450 views',
      readTime: '7 min',
      image: '/images/social_media_strategy.jpg'
    },
    {
      id: 4,
      title: 'Pemasaran Pariwisata Berbasis Data Digital (Big Data)',
      excerpt: 'Analisis big data digunakan untuk mengidentifikasi tren wisatawan dan menyusun kampanye pemasaran pariwisata yang lebih efektif.',
      category: 'inovasi',
      categoryLabel: 'INOVASI',
      date: '20 November 2025',
      author: 'Dr. Taufik Hidayat',
      views: '1100 views',
      readTime: '8 min',
      image: '/images/social_media_strategy.jpg'
    },
    {
      id: 5,
      title: 'Penghargaan Branding Terbaik dari Asosiasi Smart City Nasional',
      excerpt: 'Kabupaten Tangerang diakui atas inovasi komunikasi dan keberhasilan dalam memposisikan diri sebagai kota yang modern dan inklusif.',
      category: 'berita',
      categoryLabel: 'BERITA',
      date: '15 November 2025',
      author: 'Admin Branding',
      views: '1750 views',
      readTime: '5 min',
      image: '/images/branding_launch.jpg'
    }
  ];

  const categories = [
    { id: 'semua', label: 'Semua' },
    { id: 'berita', label: 'Berita' },
    { id: 'inovasi', label: 'Inovasi' }
  ];

  const filteredArtikel = artikelData.filter(item => {
    return selectedCategory === 'semua' || item.category === selectedCategory;
  });

  const totalPages = Math.ceil(filteredArtikel.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedArtikel = filteredArtikel.slice(startIndex, startIndex + itemsPerPage);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  const getCategoryClass = (category) => {
    const classes = {
      berita: 'badge-berita',
      inovasi: 'badge-inovasi'
    };
    return classes[category] || 'badge-berita';
  };

  return (
    <div className="branding-page">
      {/* Hero Section */}
      <section className="branding-hero">
        <div className="branding-hero-content">
          <h1 className="branding-hero-title">Smart Branding</h1>
          <p className="branding-hero-subtitle">
            Strategi Komunikasi, Citra Kota, dan Inovasi Pemasaran Pariwisata Digital Kabupaten Tangerang
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="branding-main">
        <div className="branding-container">
          {/* Sidebar Category */}
          <aside className="branding-sidebar">
            <div className="branding-sidebar-card">
              <h3 className="branding-sidebar-title">KATEGORI</h3>
              <div className="branding-category-list">
                {categories.map(category => (
                  <button
                    key={category.id}
                    className={`branding-category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                    onClick={() => handleCategoryChange(category.id)}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Content Area */}
          <div className="branding-content">
            {paginatedArtikel.length > 0 ? (
              <>
                {/* Article Grid */}
                <div className="branding-grid">
                  {paginatedArtikel.map(item => (
                    <article key={item.id} className="branding-card">
                      {item.category === 'inovasi' ? (
                        <div className="branding-card-image">
                          <img src={item.image} alt={item.title} />
                          <div className="branding-image-overlay">
                            <span className="branding-overlay-text">(animasi)</span>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="branding-card-image">
                            <img src={item.image} alt={item.title} />
                            <span className={`branding-badge ${getCategoryClass(item.category)}`}>
                              {item.categoryLabel}
                            </span>
                          </div>
                          <div className="branding-card-body">
                            <h2 className="branding-card-title">{item.title}</h2>
                            <p className="branding-card-excerpt">{item.excerpt}</p>

                            <div className="branding-card-meta">
                              <div className="branding-meta-item">
                                <Calendar size={14} />
                                <span>{item.date}</span>
                              </div>
                              <div className="branding-meta-item">
                                <User size={14} />
                                <span>{item.author}</span>
                              </div>
                              <div className="branding-meta-item">
                                <Eye size={14} />
                                <span>{item.views}</span>
                              </div>
                            </div>

                            <div className="branding-card-footer">
                              <div className="branding-read-time">
                                <Clock size={14} />
                                <span>{item.readTime}</span>
                              </div>
                              <a href={`#artikel/${item.id}`} className="branding-read-more">
                                Baca Selengkapnya
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M5 12h14M12 5l7 7-7 7"/>
                                </svg>
                              </a>
                            </div>
                          </div>
                        </>
                      )}
                    </article>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="branding-pagination">
                    <button
                      className="branding-pagination-btn"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(currentPage - 1)}
                    >
                      Sebelumnya
                    </button>

                    <div className="branding-pagination-numbers">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                          key={page}
                          className={`branding-pagination-number ${currentPage === page ? 'active' : ''}`}
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </button>
                      ))}
                    </div>

                    <button
                      className="branding-pagination-btn"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(currentPage + 1)}
                    >
                      Selanjutnya
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="branding-empty">
                <p>Tidak ada artikel dalam kategori ini.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}