import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import "../styles/footer.css";

// Komponen SVG untuk TikTok
const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <img 
            src="https://smartcity.tangerangkab.go.id/media_library/images/9c55b512c3f8e5f2998a07f677d2d1fe.png" 
            alt="Logo Smart City" 
            className="logo-smartcity"
          />
          <p>
            Smart City Kab. Tangerang merupakan program pengembangan smart city 
            terintegrasi yang bertujuan untuk meningkatkan kualitas hidup masyarakat 
            melalui pemanfaatan teknologi informasi dan komunikasi.
          </p>
        </div>
        
        <div className="footer-section links">
          <h3>Tautan Cepat</h3>
          <ul>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/dimensi">Dimensi</Link></li>
            <li><Link to="/event">Event</Link></li>
            <li><Link to="/publication">Publikasi</Link></li>
          </ul>
        </div>
        
        <div className="footer-section contact">
          <h3>Kontak Kami</h3>
          <p>
            Jl. H. Somawinata No.1, Kadu Agung, Kec. Tigaraksa, 
            Kabupaten Tangerang, Banten 15119
          </p>
          <p>Email: diskominfo@tangerangkab.go.id</p>
          <p>Telepon: (021) 5523456</p>
        </div>
        
        <div className="footer-section socials">
          <h3>Ikuti Kami</h3>
          <div className="social-icons">
            <a 
              href="https://facebook.com/tangerangkab" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Facebook" 
              title="Facebook"
            >
              <Facebook size={22} />
            </a>
            <a 
              href="https://twitter.com/tangerangkab" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Twitter" 
              title="Twitter"
            >
              <Twitter size={22} />
            </a>
            <a 
              href="https://instagram.com/tangerangkab" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Instagram" 
              title="Instagram"
            >
              <Instagram size={22} />
            </a>
            <a 
              href="https://youtube.com/tangerangkab" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Youtube" 
              title="Youtube"
            >
              <Youtube size={22} />
            </a>
            <a 
              href="https://tiktok.com/@tangerangkab" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="TikTok" 
              title="TikTok"
            >
              <TikTokIcon />
            </a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        &copy; 2025 Smart City Kab. Tangerang | All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;