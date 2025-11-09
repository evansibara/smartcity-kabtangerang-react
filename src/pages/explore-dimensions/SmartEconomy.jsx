import React, { useState } from 'react';
import { Calendar, User, Eye, Clock } from 'lucide-react';
import '../../styles/smart_economy.css';

export default function SmartEconomy() {
  const [selectedCategory, setSelectedCategory] = useState('semua');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const artikelData = [
    {
      id: 1,
      title: 'Akselerasi UMKM Lokal Melalui Platform Digital',
      excerpt: 'Inisiatif pemerintah daerah dalam menyediakan platform e-commerce khusus untuk memajukan produk-produk UMKM Kabupaten Tangerang.',
      category: 'berita',
      categoryLabel: 'BERITA',
      date: '20 November 2025',
      author: 'Admin Ekonomi',
      views: '1500 views',
      readTime: '4 min',
      image: '/images/economic_graph.jpg'
    },
    {
      id: 2,
      title: 'Dampak Digitalisasi Terhadap Sektor Industri Kreatif',
      excerpt: 'Analisis mendalam mengenai bagaimana integrasi teknologi digital telah meningkatkan efisiensi dan jangkauan pasar industri kreatif.',
      category: 'inovasi',
      categoryLabel: 'INOVASI',
      date: '18 November 2025',
      author: 'Dr. Ahmad Kurniawan',
      views: '1120 views',
      readTime: '8 min',
      image: '/images/financial_data.jpg'
    },
    {
      id: 4,
      title: 'Strategi Menarik Investasi Asing di Kawasan Industri',
      excerpt: 'Pemerintah Kabupaten mengoptimalkan infrastruktur dan insentif pajak untuk menarik investor asing di sektor manufaktur dan teknologi.',
      category: 'inovasi',
      categoryLabel: 'INOVASI',
      date: '10 November 2025',
      author: 'Jasmine Lee, MBA',
      views: '950 views',
      readTime: '7 min',
      image: '/images/financial_data.jpg'
    },
    {
      id: 5,
      title: 'Pencanangan Zona Ekonomi Digital Baru',
      excerpt: 'Pengumuman pembentukan area khusus yang fokus pada pengembangan teknologi finansial (fintech) dan startup IT.',
      category: 'berita',
      categoryLabel: 'BERITA',
      date: '05 November 2025',
      author: 'Admin Ekonomi',
      views: '1300 views',
      readTime: '5 min',
      image: '/images/economic_graph.jpg'
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
    <div className="economy-page">
      {/* Hero Section */}
      <section className="economy-hero">
        <div className="economy-hero-content">
          <h1 className="economy-hero-title">Smart Economy</h1>
          <p className="economy-hero-subtitle">
            Informasi Terkini mengenai Inovasi Ekonomi Digital dan Pengembangan Bisnis Lokal di Kabupaten Tangerang
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="economy-main">
        <div className="economy-container">
          {/* Sidebar Category */}
          <aside className="economy-sidebar">
            <div className="economy-sidebar-card">
              <h3 className="economy-sidebar-title">KATEGORI</h3>
              <div className="economy-category-list">
                {categories.map(category => (
                  <button
                    key={category.id}
                    className={`economy-category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                    onClick={() => handleCategoryChange(category.id)}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Content Area */}
          <div className="economy-content">
            {paginatedArtikel.length > 0 ? (
              <>
                {/* Article Grid */}
                <div className="economy-grid">
                  {paginatedArtikel.map(item => (
                    <article key={item.id} className="economy-card">
                      {item.category === 'inovasi' ? (
                        <div className="economy-card-image">
                          <img src={item.image} alt={item.title} />
                          <div className="economy-image-overlay">
                            <span className="economy-overlay-text">(animasi)</span>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="economy-card-image">
                            <img src={item.image} alt={item.title} />
                            <span className={`economy-badge ${getCategoryClass(item.category)}`}>
                              {item.categoryLabel}
                            </span>
                          </div>
                          <div className="economy-card-body">
                            <h2 className="economy-card-title">{item.title}</h2>
                            <p className="economy-card-excerpt">{item.excerpt}</p>

                            <div className="economy-card-meta">
                              <div className="economy-meta-item">
                                <Calendar size={14} />
                                <span>{item.date}</span>
                              </div>
                              <div className="economy-meta-item">
                                <User size={14} />
                                <span>{item.author}</span>
                              </div>
                              <div className="economy-meta-item">
                                <Eye size={14} />
                                <span>{item.views}</span>
                              </div>
                            </div>

                            <div className="economy-card-footer">
                              <div className="economy-read-time">
                                <Clock size={14} />
                                <span>{item.readTime}</span>
                              </div>
                              <a href={`#artikel/${item.id}`} className="economy-read-more">
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
                  <div className="economy-pagination">
                    <button
                      className="economy-pagination-btn"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(currentPage - 1)}
                    >
                      Sebelumnya
                    </button>

                    <div className="economy-pagination-numbers">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                          key={page}
                          className={`economy-pagination-number ${currentPage === page ? 'active' : ''}`}
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </button>
                      ))}
                    </div>

                    <button
                      className="economy-pagination-btn"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(currentPage + 1)}
                    >
                      Selanjutnya
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="economy-empty">
                <p>Tidak ada artikel dalam kategori ini.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}