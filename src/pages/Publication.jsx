import React, { useState } from 'react';
import { Search, Calendar, Download, FileText } from 'lucide-react';
import '../styles/publication_page.css';

export default function Publikasi() {
  const [searchTerm, setSearchTerm] = useState('');

  const publikasiData = [
    {
      id: 1,
      title: 'Master Plan Buku 1',
      description: 'UNDUH PDF',
      date: '2024/06/19',
      fileUrl: '/documents/masterplan-buku1.pdf'
    },
    {
      id: 2,
      title: 'Master Plan Buku 2',
      description: 'UNDUH PDF',
      date: '2024/06/19',
      fileUrl: '/documents/masterplan-buku2.pdf'
    },
    {
      id: 3,
      title: 'Master Plan Buku 3',
      description: 'UNDUH PDF',
      date: '2024/06/19',
      fileUrl: '/documents/masterplan-buku3.pdf'
    },
    {
      id: 4,
      title: 'Master Plan Buku 4',
      description: 'UNDUH PDF',
      date: '2024/06/19',
      fileUrl: '/documents/masterplan-buku4.pdf'
    },
    {
      id: 5,
      title: 'Master Plan Buku 5',
      description: 'UNDUH PDF',
      date: '2024/06/19',
      fileUrl: '/documents/masterplan-buku5.pdf'
    },
    {
      id: 6,
      title: 'Master Plan Buku 6',
      description: 'UNDUH PDF',
      date: '2024/06/19',
      fileUrl: '/documents/masterplan-buku6.pdf'
    }
  ];

  const filteredPublikasi = publikasiData.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDownload = (fileUrl) => {
    // Handle file download
    window.open(fileUrl, '_blank');
  };

  const handleReview = (fileUrl) => {
    // Handle PDF review - open in new tab for viewing
    window.open(fileUrl, '_blank');
  };

  return (
    <div className="publikasi-container">
      {/* Hero Section */}
      <section className="publikasi-hero">
        <div className="publikasi-hero-content">
          <h1 className="publikasi-hero-title">Publikasi SmartCity</h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="publikasi-main">
        <div className="publikasi-content-wrapper">
          {/* Document List Card */}
          <div className="publikasi-document-card">
            <div className="publikasi-document-header">
              <h2 className="publikasi-document-title">Daftar Dokumen</h2>
              
              {/* Search Box */}
              <div className="publikasi-search-box">
                <Search className="publikasi-search-icon" size={18} />
                <input
                  type="text"
                  placeholder="Search"
                  className="publikasi-search-input"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>

            {/* Table */}
            <div className="publikasi-table-container">
              <table className="publikasi-table">
                <thead>
                  <tr>
                    <th>Judul</th>
                    <th>Deskripsi</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPublikasi.length > 0 ? (
                    filteredPublikasi.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <div className="publikasi-title-cell">
                            <FileText className="publikasi-file-icon" size={18} />
                            <span
                              className="publikasi-title-link"
                              onClick={() => handleReview(item.fileUrl)}
                              style={{ cursor: 'pointer', color: '#007bff', textDecoration: 'underline' }}
                            >
                              {item.title}
                            </span>
                          </div>
                        </td>
                        <td>
                          <button 
                            className="publikasi-download-btn"
                            onClick={() => handleDownload(item.fileUrl)}
                          >
                            {item.description}
                          </button>
                        </td>
                        <td>
                          <div className="publikasi-date-cell">
                            <Calendar className="publikasi-calendar-icon" size={14} />
                            <span>{item.date}</span>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="publikasi-empty-row">
                        Tidak ada dokumen yang sesuai dengan pencarian Anda.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}