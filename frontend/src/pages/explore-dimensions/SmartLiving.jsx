import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Eye, Clock } from 'lucide-react';
import { apiEndpoints } from '../../utils/helpers';
import '../../styles/pages/explore_dimensions.css';

export default function SmartLiving() {
  const [selectedCategory, setSelectedCategory] = useState('inovasi');
  const [currentPage, setCurrentPage] = useState(1);
  const [artikelData, setArtikelData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [inovasiImages, setInovasiImages] = useState([]);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchInovasi = async () => {
      try {
        setLoading(true);
        const response = await apiEndpoints.inovasi.getAll('Smart Living');
        const inovasiData = response.data.data || [];

        // Transform backend data to frontend format
        const transformedData = inovasiData.map(item => ({
          id: item.id,
          title: item.name,
          excerpt: item.description,
          category: 'inovasi',
          categoryLabel: 'INOVASI',
          date: new Date(item.createdAt).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          }),
          author: 'Admin SmartCity',
          views: '0 views',
          readTime: '5 min',
          image: item.image ? item.image.url : '/images/default.jpg'
        }));

        setArtikelData(transformedData);
      } catch (error) {
        console.error('Error fetching inovasi:', error);
        setArtikelData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchInovasi();
  }, []);

  const categories = [
    { id: 'inovasi', label: 'Inovasi' },
    { id: 'berita', label: 'Berita' }
  ];

  const filteredArtikel = artikelData.filter(item => {
    return item.category === selectedCategory;
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

  const handleImageClick = (item) => {
    setSelectedIndex(filteredArtikel.indexOf(item));
    setInovasiImages(filteredArtikel.map(item => ({ src: item.image, title: item.title })));
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedIndex(0);
    setInovasiImages([]);
  };

  const nextImage = () => {
    setSelectedIndex((prevIndex) => (prevIndex + 1) % inovasiImages.length);
  };

  const prevImage = () => {
    setSelectedIndex((prevIndex) => (prevIndex - 1 + inovasiImages.length) % inovasiImages.length);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && inovasiImages.length > 1) {
      nextImage();
    }
    if (isRightSwipe && inovasiImages.length > 1) {
      prevImage();
    }
  };

  return (
    <div className="explore-page">
      <section className="explore-hero">
        <div className="explore-hero-content">
          <h1 className="explore-hero-title">Smart Living</h1>
          <p className="explore-hero-subtitle">
            Berita, Artikel, dan Panduan Terkini tentang Transformasi Digital Kabupaten Tangerang
          </p>
        </div>
      </section>

      <section className="explore-main">
        <div className="explore-container">
          <aside className="explore-sidebar">
            <div className="explore-sidebar-card">
              <h3 className="explore-sidebar-title">KATEGORI</h3>
              <div className="explore-category-list">
                {categories.map(category => (
                  <button
                    key={category.id}
                    className={`explore-category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                    onClick={() => handleCategoryChange(category.id)}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <div className="explore-content">
            {paginatedArtikel.length > 0 ? (
              <>
                <div className="explore-grid">
                  {paginatedArtikel.map(item => (
                    <article key={item.id} className="explore-card">
                      {item.category === 'inovasi' ? (
                        <div className="explore-card-image" onClick={() => handleImageClick(item)} style={{ cursor: 'pointer' }}>
                          <img src={item.image} alt={item.title} />
                          <div className="explore-image-overlay">
                            <span className="explore-overlay-text">{item.title}</span>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="explore-card-image">
                            <img src={item.image} alt={item.title} />
                            <span className={`explore-badge ${getCategoryClass(item.category)}`}>
                              {item.categoryLabel}
                            </span>
                          </div>
                          <div className="explore-card-body">
                            <h2 className="explore-card-title">{item.title}</h2>
                            <p className="explore-card-excerpt">{item.excerpt}</p>

                            <div className="explore-card-meta">
                              <div className="explore-meta-item">
                                <Calendar size={14} />
                                <span>{item.date}</span>
                              </div>
                              <div className="explore-meta-item">
                                <User size={14} />
                                <span>{item.author}</span>
                              </div>
                              <div className="explore-meta-item">
                                <Eye size={14} />
                                <span>{item.views}</span>
                              </div>
                            </div>

                            <div className="explore-card-footer">
                              <div className="explore-read-time">
                                <Clock size={14} />
                                <span>{item.readTime}</span>
                              </div>
                              <Link
                                to={`/artikel/${item.id}`}
                                className="explore-read-more"
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
                  <div className="explore-pagination">
                    <button
                      className="explore-pagination-btn"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(currentPage - 1)}
                    >
                      Sebelumnya
                    </button>

                    <div className="explore-pagination-numbers">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                          key={page}
                          className={`explore-pagination-number ${currentPage === page ? 'active' : ''}`}
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </button>
                      ))}
                    </div>

                    <button
                      className="explore-pagination-btn"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(currentPage + 1)}
                    >
                      Selanjutnya
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="explore-empty">
                <p>Tidak ada artikel dalam kategori ini.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {showModal && inovasiImages.length > 0 && (
        <div
          className="modal-overlay"
          onClick={closeModal}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            cursor: 'pointer'
          }}
        >
          <div
            className="modal-content"
            style={{
              maxWidth: '90vw',
              maxHeight: '90vh',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={inovasiImages[selectedIndex].src}
              alt={inovasiImages[selectedIndex].title}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain'
              }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            />
            <button
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: '-40px',
                right: '0',
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '24px',
                cursor: 'pointer',
                padding: '5px'
              }}
            >
              ×
            </button>
            <h3
              style={{
                position: 'absolute',
                bottom: '-50px',
                left: '0',
                right: '0',
                textAlign: 'center',
                color: 'white',
                fontSize: '18px',
                margin: '0'
              }}
            >
              {inovasiImages[selectedIndex].title}
            </h3>
            {inovasiImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  style={{
                    position: 'absolute',
                    left: '-50px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(0, 0, 0, 0.5)',
                    border: 'none',
                    color: 'white',
                    fontSize: '24px',
                    cursor: 'pointer',
                    padding: '10px',
                    borderRadius: '50%'
                  }}
                >
                  ‹
                </button>
                <button
                  onClick={nextImage}
                  style={{
                    position: 'absolute',
                    right: '-50px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(0, 0, 0, 0.5)',
                    border: 'none',
                    color: 'white',
                    fontSize: '24px',
                    cursor: 'pointer',
                    padding: '10px',
                    borderRadius: '50%'
                  }}
                >
                  ›
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
