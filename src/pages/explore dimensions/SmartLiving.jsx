import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import { Calendar, User, Eye, Clock } from 'lucide-react';
import '../../styles/smart_living.css';

export default function SmartLiving() {
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
    <div className="living-page">
      <section className="living-hero">
        <div className="living-hero-content">
          <h1 className="living-hero-title">Smart Living</h1>
          <p className="living-hero-subtitle">
            Berita, Artikel, dan Panduan Terkini tentang Transformasi Digital Kabupaten Tangerang
          </p>
        </div>
      </section>

      <section className="living-main">
        <div className="living-container">
          <aside className="living-sidebar">
            <div className="living-sidebar-card">
              <h3 className="living-sidebar-title">KATEGORI</h3>
              <div className="living-category-list">
                {categories.map(category => (
                  <button
                    key={category.id}
                    className={`living-category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                    onClick={() => handleCategoryChange(category.id)}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <div className="living-content">
            {paginatedArtikel.length > 0 ? (
              <>
                <div className="living-grid">
                  {paginatedArtikel.map(item => (
                    <article key={item.id} className="living-card">
                      {item.category === 'inovasi' ? (
                        <div className="living-card-image">
                          <img src={item.image} alt={item.title} />
                          <div className="living-image-overlay">
                            <span className="living-overlay-text">(animasi)</span>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="living-card-image">
                            <img src={item.image} alt={item.title} />
                            <span className={`living-badge ${getCategoryClass(item.category)}`}>
                              {item.categoryLabel}
                            </span>
                          </div>
                          <div className="living-card-body">
                            <h2 className="living-card-title">{item.title}</h2>
                            <p className="living-card-excerpt">{item.excerpt}</p>

                            <div className="living-card-meta">
                              <div className="living-meta-item">
                                <Calendar size={14} />
                                <span>{item.date}</span>
                              </div>
                              <div className="living-meta-item">
                                <User size={14} />
                                <span>{item.author}</span>
                              </div>
                              <div className="living-meta-item">
                                <Eye size={14} />
                                <span>{item.views}</span>
                              </div>
                            </div>

                            <div className="living-card-footer">
                              <div className="living-read-time">
                                <Clock size={14} />
                                <span>{item.readTime}</span>
                              </div>
                              <Link
                                to={`/artikel/${item.id}`}
                                className="living-read-more"
                              >
                                Baca Selengkapnya
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M5 12h14M12 5l7 7-7 7"/>
                                </svg>
                              </Link>
                            </div>
                          </div>
                        </>
                      )}
                    </article>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="living-pagination">
                    <button
                      className="living-pagination-btn"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(currentPage - 1)}
                    >
                      Sebelumnya
                    </button>

                    <div className="living-pagination-numbers">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                          key={page}
                          className={`living-pagination-number ${currentPage === page ? 'active' : ''}`}
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </button>
                      ))}
                    </div>

                    <button
                      className="living-pagination-btn"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(currentPage + 1)}
                    >
                      Selanjutnya
                    </button>
                  </div>
                )}
            </>
            ) : (
              <div className="living-empty">
                <p>Tidak ada artikel dalam kategori ini.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}