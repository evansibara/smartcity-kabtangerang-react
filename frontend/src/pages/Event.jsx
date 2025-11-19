import React, { useState, useEffect } from 'react';
import '../styles/pages/event_page.css';
import { apiEndpoints } from '../utils/helpers';

const Event = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [imageLoaded, setImageLoaded] = useState({});

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await apiEndpoints.events.getAllPublic();
                setEvents(response.data.data);
            } catch (err) {
                setError('Failed to load events');
                console.error('Error fetching events:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const openPreview = (imageUrl) => {
        setPreviewImage(imageUrl);
        document.body.style.overflow = 'hidden';
    };

    const closePreview = () => {
        setPreviewImage(null);
        document.body.style.overflow = 'auto';
    };

    const handleImageLoad = (eventId) => {
        setImageLoaded(prev => ({ ...prev, [eventId]: true }));
    };

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                closePreview();
            }
        };

        if (previewImage) {
            window.addEventListener('keydown', handleEscape);
        }

        return () => {
            window.removeEventListener('keydown', handleEscape);
        };
    }, [previewImage]);

    if (loading) {
        return (
            <div className="event-page">
                <section className="event-hero-section image-background">
                    <div className="hero-content">
                        <h1>City of Event: Kalender Acara Kabupaten Tangerang</h1>
                    </div>
                </section>
                <section className="event-calendar-container">
                    <div className="loading-placeholder">
                        <div className="spinner"></div>
                        <p>Memuat Acara...</p>
                    </div>
                </section>
            </div>
        );
    }

    if (error) {
        return (
            <div className="event-page">
                <section className="event-hero-section image-background">
                    <div className="hero-content">
                        <h1>City of Event: Kalender Acara Kabupaten Tangerang</h1>
                    </div>
                </section>
                <section className="event-calendar-container">
                    <div className="error-message">
                        <p>{error}</p>
                    </div>
                </section>
            </div>
        );
    }

    return (
        <div className="event-page">
            <section className="event-hero-section image-background">
                <div className="hero-content">
                    <h1>City of Event: Kalender Acara Kabupaten Tangerang</h1>
                </div>
            </section>

            <section className="event-calendar-container">
                <h2 className="section-title">Kalender Resmi Acara Publik</h2>

                {events.length === 0 ? (
                    <div className="no-events">
                        <p>Tidak ada acara yang tersedia saat ini</p>
                    </div>
                ) : (
                    <div className="events-list">
                        {events.map((event) => (
                            <div key={event.id} className="calendar-wrapper">
                                {event.imageUrl && (
                                    <>
                                        {!imageLoaded[event.id] && (
                                            <div className="loading-placeholder">
                                                <div className="spinner"></div>
                                                <p>Memuat gambar...</p>
                                            </div>
                                        )}
                                        <img
                                            src={event.imageUrl}
                                            alt={`Kalender Acara ${event.year || ''}`}
                                            className={`calendar-image ${imageLoaded[event.id] ? 'loaded' : ''}`}
                                            loading="lazy"
                                            onClick={() => openPreview(event.imageUrl)}
                                            onLoad={() => handleImageLoad(event.id)}
                                        />
                                    </>
                                )}
                                <div className="download-info">
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Image Preview Modal */}
            {previewImage && (
                <div 
                    className="image-preview-modal active" 
                    onClick={closePreview}
                >
                    <div className="preview-content" onClick={(e) => e.stopPropagation()}>
                        <button 
                            className="close-preview" 
                            onClick={closePreview}
                            aria-label="Close preview"
                        >
                            ×
                        </button>
                        <img 
                            src={previewImage} 
                            alt="Preview Kalender" 
                            className="preview-image" 
                        />
                        <div className="preview-hint">
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Event;