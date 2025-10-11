import React, { useState } from 'react';
import { Search, Calendar, User, Eye, ChevronRight } from 'lucide-react';
import '../styles/publication_page.css';

export default function Publikasi() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('semua');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const publikasiData = [
    {
      id: 1,
      title: 'Peluncuran Platform SmartCity Tangerang 2025',
      category: 'berita',
      date: '15 Oktober 2025',
      author: 'Admin SmartCity',
      views: 1250,
      image: '/images/cityscape_background.jpg',
      excerpt: 'Kabupaten Tangerang meluncurkan platform digital terbaru untuk meningkatkan kualitas layanan publik dengan teknologi inovatif dan berkelanjutan.'
    },
    {
      id: 2,
      title: 'Integrasi Teknologi IoT di Sistem Transportasi Tangerang',
      category: 'artikel',
      date: '12 Oktober 2025',
      author: 'Budi Santoso',
      views: 980,
      image: '/images/background_meeting.jpg',
      excerpt: 'Implementasi sensor IoT membantu monitoring real-time kondisi jalan dan kemacetan di berbagai titik Kabupaten Tangerang.'
    },
    {
      id: 3,
      title: 'Panduan Penggunaan Aplikasi SmartCity untuk Masyarakat',
      category: 'panduan',
      date: '10 Oktober 2025',
      author: 'Tim Komunikasi',
      views: 756,
      image: '/images/cityscape_background.jpg',
      excerpt: 'Langkah demi langkah cara menggunakan aplikasi SmartCity untuk mengakses berbagai layanan publik digital dengan mudah.'
    },
    {
      id: 4,
      title: 'Keamanan Data Warga dalam Platform SmartCity',
      category: 'artikel',
      date: '08 Oktober 2025',
      author: 'Dr. Rini Wijaya',
      views: 645,
      image: '/images/background_meeting.jpg',
      excerpt: 'Enkripsi tingkat tinggi dan protokol keamanan berlapis menjamin privasi data pengguna di SmartCity Kabupaten Tangerang.'
    },
    {
      id: 5,
      title: 'Penghargaan SmartCity dari Kementerian Komunikasi',
      category: 'berita',
      date: '05 Oktober 2025',
      author: 'Admin SmartCity',
      views: 1100,
      image: '/images/cityscape_background.jpg',
      excerpt: 'Kabupaten Tangerang meraih penghargaan sebagai kota pintar terbaik di kategori transformasi digital nasional.'
    },
    {
      id: 6,
      title: 'Workshop Smart City untuk Aparatur Pemerintah',
      category: 'acara',
      date: '01 Oktober 2025',
      author: 'Biro Pengembangan',
      views: 523,
      image: '/images/background_meeting.jpg',
      excerpt: 'Program pelatihan intensif untuk meningkatkan kompetensi aparatur dalam mengoperasikan sistem SmartCity secara optimal.'
    },
    {
      id: 7,
      title: 'Kolaborasi SmartCity dengan Universitas Lokal',
      category: 'berita',
      date: '28 September 2025',
      author: 'Admin SmartCity',
      views: 890,
      image: '/images/cityscape_background.jpg',
      excerpt: 'Kerjasama strategis dengan institusi pendidikan untuk mengembangkan riset dan inovasi teknologi smart city.'
    },
    {
      id: 8,
      title: 'Efisiensi Energi Melalui Smart Grid Technology',
      category: 'artikel',
      date: '25 September 2025',
      author: 'Eng. Ahmad Hidayat',
      views: 734,
      image: '/images/background_meeting.jpg',
      excerpt: 'Implementasi smart grid mengurangi konsumsi energi dan meningkatkan efisiensi distribusi listrik di seluruh wilayah.'
    },
    {
      id: 9,
      title: 'Update Aplikasi SmartCity Versi 2.5',
      category: 'panduan',
      date: '20 September 2025',
      author: 'Tim IT',
      views: 612,
      image: '/images/cityscape_background.jpg',
      excerpt: 'Fitur-fitur baru termasuk dashboard interaktif, notifikasi real-time, dan peningkatan keamanan aplikasi mobile.'
    }
  ];

  const categories = [
    { id: 'semua', label: 'Semua' },
    { id: 'berita', label: 'Berita' },
    { id: 'artikel', label: 'Artikel' },
    { id: 'panduan', label: 'Panduan' },
    { id: 'acara', label: 'Acara' }
  ];

  const filteredPublikasi = publikasiData.filter(item => {
    const matchesCategory = selectedCategory === 'semua' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredPublikasi.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPublikasi = filteredPublikasi.slice(startIndex, startIndex + itemsPerPage);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const getCategoryBadgeClass = (category) => {
    const badges = {
      berita: 'badge-berita',
      artikel: 'badge-artikel',
      panduan: 'badge-panduan',
      acara: 'badge-acara'
    };
    return badges[category] || 'badge-berita';
  };

  return (
    <>
      <div className="publikasi-container">
        {/* Hero Section */}
        <section className="publikasi-hero">
          <div className="publikasi-hero-content">
            <h1 className="publikasi-hero-title">Publikasi SmartCity</h1>
            <p className="publikasi-hero-subtitle">
              Berita, Artikel, dan Panduan Terkini tentang Transformasi Digital Kabupaten Tangerang
            </p>
          </div>
        </section>

        {/* Search Section */}
        <section className="publikasi-search-section">
          <div className="publikasi-search-container">
            <div className="publikasi-search-box">
              <Search className="publikasi-search-icon" size={20} />
              <input
                type="text"
                placeholder="Cari publikasi..."
                className="publikasi-search-input"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="publikasi-main">
          <div className="publikasi-wrapper">
            {/* Filter Categories */}
            <div className="publikasi-filters">
              <h3 className="publikasi-filter-title">Kategori</h3>
              <div className="publikasi-category-list">
                {categories.map(category => (
                  <button
                    key={category.id}
                    className={`publikasi-category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                    onClick={() => handleCategoryChange(category.id)}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Publikasi Grid */}
            <div className="publikasi-content">
              {paginatedPublikasi.length > 0 ? (
                <>
                  <div className="publikasi-grid">
                    {paginatedPublikasi.map(item => (
                      <article key={item.id} className="publikasi-card">
                        <div className="publikasi-card-image">
                          <img src={item.image} alt={item.title} />
                          <span className={`publikasi-badge ${getCategoryBadgeClass(item.category)}`}>
                            {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                          </span>
                        </div>
                        <div className="publikasi-card-body">
                          <h2 className="publikasi-card-title">{item.title}</h2>
                          <p className="publikasi-card-excerpt">{item.excerpt}</p>
                          
                          <div className="publikasi-card-meta">
                            <div className="publikasi-meta-item">
                              <Calendar size={14} />
                              <span>{item.date}</span>
                            </div>
                            <div className="publikasi-meta-item">
                              <User size={14} />
                              <span>{item.author}</span>
                            </div>
                            <div className="publikasi-meta-item">
                              <Eye size={14} />
                              <span>{item.views} views</span>
                            </div>
                          </div>

                          <a href={`#publikasi/${item.id}`} className="publikasi-card-link">
                            Baca Selengkapnya
                            <ChevronRight size={16} />
                          </a>
                        </div>
                      </article>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="publikasi-pagination">
                      <button
                        className="publikasi-pagination-btn"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                      >
                        Sebelumnya
                      </button>

                      <div className="publikasi-pagination-numbers">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                          <button
                            key={page}
                            className={`publikasi-pagination-number ${currentPage === page ? 'active' : ''}`}
                            onClick={() => setCurrentPage(page)}
                          >
                            {page}
                          </button>
                        ))}
                      </div>

                      <button
                        className="publikasi-pagination-btn"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                      >
                        Selanjutnya
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="publikasi-empty">
                  <p>Tidak ada publikasi yang sesuai dengan pencarian Anda.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}