import React, { useState } from 'react';
import { Calendar, User, Eye, Clock } from 'lucide-react';
import '../../styles/smart_environment.css';

export default function SmartEnvironment() {
  const [selectedCategory, setSelectedCategory] = useState('semua');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const artikelData = [
    {
      id: 1,
      title: 'Peluncuran Sistem Monitoring Kualitas Udara Real-Time',
      excerpt: 'Kabupaten Tangerang memasang sensor pintar di berbagai lokasi untuk menyediakan data kualitas udara yang akurat dan dapat diakses publik.',
      category: 'berita',
      categoryLabel: 'BERITA',
      date: '10 Desember 2025',
      author: 'Admin Lingkungan',
      views: '1400 views',
      readTime: '4 min',
      image: '/images/air_quality_sensor.jpg'
    },
    {
      id: 2,
      title: 'Optimalisasi Pengelolaan Sampah dengan Teknologi Smart Bin',
      excerpt: 'Implementasi tempat sampah pintar (Smart Bin) yang memberikan notifikasi otomatis saat penuh untuk efisiensi pengumpulan sampah.',
      category: 'inovasi',
      categoryLabel: 'INOVASI',
      date: '05 Desember 2025',
      author: 'Prof. Tania Dewi',
      views: '1050 views',
      readTime: '7 min',
      image: '/images/smart_waste_management.jpg'
    },
    {
      id: 4,
      title: 'Konservasi Air Pintar Melalui Irigasi Otomatis IoT',
      excerpt: 'Penerapan sistem irigasi berbasis IoT untuk menghemat penggunaan air pada lahan pertanian dan ruang hijau kota.',
      category: 'inovasi',
      categoryLabel: 'INOVASI',
      date: '25 November 2025',
      author: 'Dr. Eko Prasetyo',
      views: '920 views',
      readTime: '5 min',
      image: '/images/smart_waste_management.jpg'
    },
    {
      id: 5,
      title: 'Penghargaan Kota Hijau Terbaik se-Jawa Barat',
      excerpt: 'Kabupaten Tangerang meraih penghargaan atas komitmennya dalam pembangunan infrastruktur ramah lingkungan dan berkelanjutan.',
      category: 'berita',
      categoryLabel: 'BERITA',
      date: '20 November 2025',
      author: 'Admin Lingkungan',
      views: '1150 views',
      readTime: '4 min',
      image: '/images/air_quality_sensor.jpg'
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
    <div className="environment-page">
      {/* Hero Section */}
      <section className="environment-hero">
        <div className="environment-hero-content">
          <h1 className="environment-hero-title">Smart Environment</h1>
          <p className="environment-hero-subtitle">
            Berita, Inovasi, dan Panduan tentang Pengelolaan Lingkungan Berkelanjutan Berbasis Teknologi
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="environment-main">
        <div className="environment-container">
          {/* Sidebar Category */}
          <aside className="environment-sidebar">
            <div className="environment-sidebar-card">
              <h3 className="environment-sidebar-title">KATEGORI</h3>
              <div className="environment-category-list">
                {categories.map(category => (
                  <button
                    key={category.id}
                    className={`environment-category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                    onClick={() => handleCategoryChange(category.id)}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Content Area */}
          <div className="environment-content">
            {paginatedArtikel.length > 0 ? (
              <>
                {/* Article Grid */}
                <div className="environment-grid">
                  {paginatedArtikel.map(item => (
                    <article key={item.id} className="environment-card">
                      {item.category === 'inovasi' ? (
                        <div className="environment-card-image">
                          <img src={item.image} alt={item.title} />
                          <div className="environment-image-overlay">
                            <span className="environment-overlay-text">(animasi)</span>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="environment-card-image">
                            <img src={item.image} alt={item.title} />
                            <span className={`environment-badge ${getCategoryClass(item.category)}`}>
                              {item.categoryLabel}
                            </span>
                          </div>
                          <div className="environment-card-body">
                            <h2 className="environment-card-title">{item.title}</h2>
                            <p className="environment-card-excerpt">{item.excerpt}</p>

                            <div className="environment-card-meta">
                              <div className="environment-meta-item">
                                <Calendar size={14} />
                                <span>{item.date}</span>
                              </div>
                              <div className="environment-meta-item">
                                <User size={14} />
                                <span>{item.author}</span>
                              </div>
                              <div className="environment-meta-item">
                                <Eye size={14} />
                                <span>{item.views}</span>
                              </div>
                            </div>

                            <div className="environment-card-footer">
                              <div className="environment-read-time">
                                <Clock size={14} />
                                <span>{item.readTime}</span>
                              </div>
                              <a href={`#artikel/${item.id}`} className="environment-read-more">
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
                  <div className="environment-pagination">
                    <button
                      className="environment-pagination-btn"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(currentPage - 1)}
                    >
                      Sebelumnya
                    </button>

                    <div className="environment-pagination-numbers">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                          key={page}
                          className={`environment-pagination-number ${currentPage === page ? 'active' : ''}`}
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </button>
                      ))}
                    </div>

                    <button
                      className="environment-pagination-btn"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(currentPage + 1)}
                    >
                      Selanjutnya
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="environment-empty">
                <p>Tidak ada artikel dalam kategori ini.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}