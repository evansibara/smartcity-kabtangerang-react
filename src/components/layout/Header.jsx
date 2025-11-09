import React, { useState, useEffect, useRef } from 'react';
import { Search, Menu, X, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/components/header.css';

const Header = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const dropdownTimeoutRef = useRef(null);
  const searchInputRef = useRef(null);

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

  // Close dropdown if on profile page
  useEffect(() => {
    if (pathname === '/profile') {
      setIsAboutDropdownOpen(false);
    }
  }, [pathname]);

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
        setIsSearchExpanded(false);
      }
    }
  };

  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded);
    if (!isSearchExpanded) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  };

  const handleSearchBlur = () => {
    if (!searchQuery.trim()) {
      setIsSearchExpanded(false);
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
              <li><Link to="/" className={pathname === '/' ? 'active-nav-link' : ''} onClick={handleNavClick}>Beranda</Link></li>

              <li
                className="dropdown"
                onMouseEnter={handleDropdownMouseEnter}
                onMouseLeave={handleDropdownMouseLeave}
              >
                <a href="#" className={isAboutDropdownOpen ? 'dropdown-active' : ''} onClick={(e) => e.preventDefault()}>
                  Tentang <ChevronDown className={`arrow-icon ${isAboutDropdownOpen ? 'rotated' : ''}`} size={16}/>
                </a>
                <div className={`dropdown-content ${isAboutDropdownOpen ? 'show' : ''}`}>
                  <Link to="/profile" className={pathname === '/profile' ? 'active-nav-link' : ''} onClick={handleNavClick}>Profil</Link>
                </div>
              </li>

              <li><Link to="/event" className={pathname === '/event' ? 'active-nav-link' : ''} onClick={handleNavClick}>City of Event</Link></li>
              <li><Link to="/dimensi" className={pathname === '/dimensi' ? 'active-nav-link' : ''} onClick={handleNavClick}>Dimensi</Link></li>
              <li><Link to="/publication" className={pathname === '/publication' ? 'active-nav-link' : ''} onClick={handleNavClick}>Publikasi</Link></li>
            </ul>
          </nav>

          <div className="header-controls">
            <div className={`search-container ${isSearchExpanded ? 'expanded' : ''}`}>
              <input
                ref={searchInputRef}
                type="text"
                className="search-input"
                placeholder="Cari..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleSearch}
                onBlur={handleSearchBlur}
              />
              <button
                type="button"
                className="search-icon"
                onClick={isSearchExpanded ? handleSearch : toggleSearch}
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
          <li><Link to="/" className={pathname === '/' ? 'active-nav-link' : ''} onClick={handleNavClick}>Beranda</Link></li>

          <li className={`dropdown-mobile ${isAboutDropdownOpen ? 'open' : ''}`}>
            <button type="button" className={`dropbtn-mobile ${isAboutDropdownOpen ? 'dropdown-active' : ''}`} onClick={toggleAboutDropdown}>
              Tentang <ChevronDown className={`arrow-icon ${isAboutDropdownOpen ? 'rotated' : ''}`} size={16}/>
            </button>
            <div className="dropdown-content-mobile">
              <Link to="/profile" className={pathname === '/profile' ? 'active-nav-link' : ''} onClick={handleNavClick}>profil</Link>
            </div>
          </li>

          <li><Link to="/event" className={pathname === '/event' ? 'active-nav-link' : ''} onClick={handleNavClick}>City of Event</Link></li>
          <li><Link to="/dimensi" className={pathname === '/dimensi' ? 'active-nav-link' : ''} onClick={handleNavClick}>Dimensi</Link></li>
          <li><Link to="/publication" className={pathname === '/publication' ? 'active-nav-link' : ''} onClick={handleNavClick}>Publikasi</Link></li>
        </ul>
      </nav>

      {isMobileMenuOpen && (
        <div className={`mobile-overlay ${isMobileMenuOpen ? 'show' : ''}`} onClick={toggleMobileMenu}></div>
      )}
    </>
  );
};

export default Header;