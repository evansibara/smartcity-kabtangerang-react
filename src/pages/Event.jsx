import React, { useState } from 'react';
import '../styles/event_page.css'; 

const CALENDAR_IMAGE_URL = '/path/to/calendar_of_events_2024.jpg';

const Event = () => {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <div className="event-page">
            
            <section className="event-hero-section image-background">
                <div className="hero-content">
                    <h1>City of Event: Kalender Acara Kabupaten Tangerang</h1>
                </div>
            </section>
            
            <section className="event-calendar-container">
                <h2 className="section-title">Kalender Resmi Acara Publik</h2>
                
                <div className="calendar-wrapper">
                    {!imageLoaded && (
                        <div className="loading-placeholder">
                            <div className="spinner"></div>
                            <p>Memuat Kalender Acara...</p>
                        </div>
                    )}
                    
                    <img 
                        src={CALENDAR_IMAGE_URL} 
                        alt="Kalender Acara Tahunan Kabupaten Tangerang" 
                        className={`calendar-image ${imageLoaded ? 'loaded' : ''}`}
                        onLoad={() => setImageLoaded(true)}
                        loading="lazy"
                    />
                </div>
                
                <p className="download-info">
                    Unduh versi resolusi tinggi: <a href={CALENDAR_IMAGE_URL} download>Download Kalender Acara (PDF/JPG)</a>
                </p>

            </section>
        </div>
    );
};

export default Event;