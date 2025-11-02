import React, { useState, useEffect, useRef } from 'react';
import { Search, Menu, X, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../styles/header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownTimeoutRef = useRef(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setIsMobileMenuOpen(false);
      }
      if (window.innerWidth > 768) {
        setIsAboutDropdownOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMobileMenu = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isMobileMenuOpen) {
      setIsAboutDropdownOpen(false);
    }
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      e.preventDefault();
      if (searchQuery.trim()) {
        console.log('Searching for:', searchQuery);
        setSearchQuery('');
      }
    }
  };

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
    setIsAboutDropdownOpen(false);
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
  };

  const toggleAboutDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAboutDropdownOpen(!isAboutDropdownOpen);
  };

  const handleDropdownMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setIsAboutDropdownOpen(true);
  };

  const handleDropdownMouseLeave = () => {
    if (window.innerWidth > 768) {
      dropdownTimeoutRef.current = setTimeout(() => {
        setIsAboutDropdownOpen(false);
      }, 300);
    }
  };

  return (
    <>
      <header className={`main-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-content">
          <div className="logo">
            <Link to="/" className="logo-text" onClick={handleNavClick}>
              SmartCity
            </Link>
          </div>

          <nav className="desktop-nav">
            <ul>
              <li><Link to="/" onClick={handleNavClick}>Beranda</Link></li>

              <li
                className="dropdown"
                onMouseEnter={handleDropdownMouseEnter}
                onMouseLeave={handleDropdownMouseLeave}
              >
                <a href="#" onClick={(e) => e.preventDefault()}>
                  Tentang <ChevronDown className={`arrow-icon ${isAboutDropdownOpen ? 'rotated' : ''}`} size={16}/>
                </a>
                <div className={`dropdown-content ${isAboutDropdownOpen ? 'show' : ''}`}>
                  <Link to="/profile" onClick={handleNavClick}>Profile</Link>
                </div>
              </li>

              <li><Link to="/event" onClick={handleNavClick}>City of Event</Link></li>
              <li><Link to="/dimensi" onClick={handleNavClick}>Dimensi</Link></li>
              <li><Link to="/publication" onClick={handleNavClick}>Publikasi</Link></li>
            </ul>
          </nav>

          <div className="header-controls">
            <div className="search-container">
              <input
                type="text"
                className="search-input"
                placeholder="Cari..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleSearch}
              />
              <button
                type="button"
                className="search-icon"
                onClick={handleSearch}
                aria-label="Search"
                title="Search"
              >
                <Search size={22} />
              </button>
            </div>

            <button
              className={`mobile-menu-btn ${isMobileMenuOpen ? 'active' : ''}`}
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
              title="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <nav className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
        <ul>
          <li><Link to="/" onClick={handleNavClick}>Beranda</Link></li>

          <li className={`dropdown-mobile ${isAboutDropdownOpen ? 'open' : ''}`}>
            <button type="button" className="dropbtn-mobile" onClick={toggleAboutDropdown}>
              Tentang <ChevronDown className={`arrow-icon ${isAboutDropdownOpen ? 'rotated' : ''}`} size={16}/>
            </button>
            <div className="dropdown-content-mobile">
              <Link to="/profile" onClick={handleNavClick}>Profile</Link>
            </div>
          </li>

          <li><Link to="/event" onClick={handleNavClick}>City of Event</Link></li>
          <li><Link to="/dimensi" onClick={handleNavClick}>Dimensi</Link></li>
          <li><Link to="/publication" onClick={handleNavClick}>Publikasi</Link></li>
        </ul>
      </nav>

      {isMobileMenuOpen && (
        <div className={`mobile-overlay ${isMobileMenuOpen ? 'show' : ''}`} onClick={toggleMobileMenu}></div>
      )}
    </>
  );
};

export default Header;