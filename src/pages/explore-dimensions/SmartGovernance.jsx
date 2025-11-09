import React, { useState } from 'react';
import { Calendar, User, Eye, Clock } from 'lucide-react';
import '../../styles/smart_governance.css';

export default function SmartGovernance() {
  const [selectedCategory, setSelectedCategory] = useState('semua');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const artikelData = [
    {
      id: 1,
      title: 'Peluncuran Platform SmartCity Tangerang 2025',
      excerpt: 'Kabupaten Tangerang meluncurkan platform digital terbaru untuk meningkatkan kualitas layanan publik dengan teknologi inovatif dan berkelanjutan.',
      category: 'berita',
      categoryLabel: 'BERITA',
      date: '15 Oktober 2025',
      author: 'Admin SmartCity',
      views: '1250 views',
      readTime: '5 min',
      image: '/images/cityscape_background.jpg'
    },
    {
      id: 2,
      title: 'Integrasi Teknologi IoT di Sistem Transportasi Tangerang',
      excerpt: 'Implementasi sensor IoT membantu monitoring real-time kondisi jalan dan kemacetan di berbagai titik Kabupaten Tangerang.',
      category: 'inovasi',
      categoryLabel: 'INOVASI',
      date: '12 Oktober 2025',
      author: 'Budi Santoso',
      views: '980 views',
      readTime: '7 min',
      image: '/images/background_meeting.jpg'
    },
    {
      id: 4,
      title: 'Keamanan Data Warga dalam Platform SmartCity',
      excerpt: 'Enkripsi tingkat tinggi dan protokol keamanan berlapis menjamin privasi data pengguna di SmartCity Kabupaten Tangerang.',
      category: 'inovasi',
      categoryLabel: 'INOVASI',
      date: '08 Oktober 2025',
      author: 'Dr. Rini Wijaya',
      views: '645 views',
      readTime: '6 min',
      image: '/images/background_meeting.jpg'
    },
    {
      id: 5,
      title: 'Penghargaan SmartCity dari Kementerian Komunikasi',
      excerpt: 'Kabupaten Tangerang meraih penghargaan sebagai kota pintar terbaik di kategori transformasi digital nasional.',
      category: 'berita',
      categoryLabel: 'BERITA',
      date: '05 Oktober 2025',
      author: 'Admin SmartCity',
      views: '1100 views',
      readTime: '4 min',
      image: '/images/cityscape_background.jpg'
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
    <div className="governance-page">
      {/* Hero Section */}
      <section className="governance-hero">
        <div className="governance-hero-content">
          <h1 className="governance-hero-title">Smart Governance</h1>
          <p className="governance-hero-subtitle">
            Berita, Artikel, dan Panduan Terkini tentang Transformasi Digital Kabupaten Tangerang
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="governance-main">
        <div className="governance-container">
          {/* Sidebar Category */}
          <aside className="governance-sidebar">
            <div className="governance-sidebar-card">
              <h3 className="governance-sidebar-title">KATEGORI</h3>
              <div className="governance-category-list">
                {categories.map(category => (
                  <button
                    key={category.id}
                    className={`governance-category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                    onClick={() => handleCategoryChange(category.id)}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Content Area */}
          <div className="governance-content">
            {paginatedArtikel.length > 0 ? (
              <>
                {/* Article Grid */}
                <div className="governance-grid">
                  {paginatedArtikel.map(item => (
                    <article key={item.id} className="governance-card">
                      {item.category === 'inovasi' ? (
                        <div className="governance-card-image">
                          <img src={item.image} alt={item.title} />
                          <div className="governance-image-overlay">
                            <span className="governance-overlay-text">(animasi)</span>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="governance-card-image">
                            <img src={item.image} alt={item.title} />
                            <span className={`governance-badge ${getCategoryClass(item.category)}`}>
                              {item.categoryLabel}
                            </span>
                          </div>
                          <div className="governance-card-body">
                            <h2 className="governance-card-title">{item.title}</h2>
                            <p className="governance-card-excerpt">{item.excerpt}</p>

                            <div className="governance-card-meta">
                              <div className="governance-meta-item">
                                <Calendar size={14} />
                                <span>{item.date}</span>
                              </div>
                              <div className="governance-meta-item">
                                <User size={14} />
                                <span>{item.author}</span>
                              </div>
                              <div className="governance-meta-item">
                                <Eye size={14} />
                                <span>{item.views}</span>
                              </div>
                            </div>

                            <div className="governance-card-footer">
                              <div className="governance-read-time">
                                <Clock size={14} />
                                <span>{item.readTime}</span>
                              </div>
                              <a href={`#artikel/${item.id}`} className="governance-read-more">
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
                  <div className="governance-pagination">
                    <button
                      className="governance-pagination-btn"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(currentPage - 1)}
                    >
                      Sebelumnya
                    </button>

                    <div className="governance-pagination-numbers">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                          key={page}
                          className={`governance-pagination-number ${currentPage === page ? 'active' : ''}`}
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </button>
                      ))}
                    </div>

                    <button
                      className="governance-pagination-btn"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(currentPage + 1)}
                    >
                      Selanjutnya
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="governance-empty">
                <p>Tidak ada artikel dalam kategori ini.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}