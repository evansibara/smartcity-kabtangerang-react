import React from 'react';
import '../styles/event.css'; 

// Data Event Dummy (Ganti dengan data asli dari API Anda)
const eventsData = [
    {
        id: 1,
        title: 'Festival Inovasi Teknologi 2025',
        date: '10 - 12 Agustus 2025',
        location: 'Pusat Pemerintahan Kab. Tangerang',
        category: 'Teknologi',
        image: 'https://via.placeholder.com/800x450/400d31/FFFFFF?text=Festival+Teknologi',
        description: 'Pameran solusi SmartCity terbaru dan kompetisi startup lokal.'
    },
    {
        id: 2,
        title: 'Bazar UMKM dan Kuliner Nusantara',
        date: '01 - 30 September 2025',
        location: 'Lapangan Dadap',
        category: 'Kuliner',
        image: 'https://via.placeholder.com/800x450/400d31/FFFFFF?text=Bazar+Kuliner',
        description: 'Menampilkan produk UMKM terbaik dari 29 kecamatan dan wisata kuliner.'
    },
    {
        id: 3,
        title: 'Lomba Desain Aplikasi Smart Service',
        date: 'Pendaftaran sampai 15 Juli 2025',
        location: 'Online / Kantor Diskominfo',
        category: 'Edukasi',
        image: 'https://via.placeholder.com/800x450/400d31/FFFFFF?text=Lomba+Desain',
        description: 'Kompetisi terbuka untuk pelajar dan mahasiswa dalam menciptakan aplikasi layanan publik.'
    },
    {
        id: 4,
        title: 'Pekan Raya Pembangunan Tangerang',
        date: '20 - 27 November 2025',
        location: 'Tangerang Expo Center',
        category: 'Pembangunan',
        image: 'https://via.placeholder.com/800x450/400d31/FFFFFF?text=Pekan+Raya',
        description: 'Pameran capaian pembangunan infrastruktur dan investasi daerah.'
    },
];

const EventCard = ({ event }) => (
    <div className="event-card">
        <div className="event-image-container">
            <img src={event.image} alt={event.title} className="event-image" />
        </div>
        <div className="event-info">
            <span className={`event-category ${event.category.toLowerCase().replace(/\s/g, '-')}`}>{event.category}</span>
            <h3 className="event-title">{event.title}</h3>
            <p className="event-description">{event.description}</p>
            <div className="event-meta">
                <p>🗓️ **{event.date}**</p>
                <p>📍 {event.location}</p>
            </div>
            <a href="#" className="event-detail-link">Lihat Detail →</a>
        </div>
    </div>
);

const Event = () => {
    // Data event ditampilkan tanpa filtering
    const displayedEvents = eventsData;

    return (
        <div className="event-page">
            
            {/* Hero Section - Menggunakan gambar background sendiri */}
            <section className="event-hero-section image-background">
                <div className="hero-content">
                    <h1>City of Event: Kalender Acara Kabupaten Tangerang</h1>
                    <p>Temukan informasi terkini mengenai festival, pameran, kompetisi, dan acara publik yang mendukung visi SmartCity di wilayah Kabupaten Tangerang.</p>
                </div>
            </section>
            
            {/* Main Content */}
            <section className="event-main-content">
                {/* Judul Konten */}
                <div className="event-header-content">
                    <h2>Daftar Acara Mendatang</h2>
                </div>

                <div className="event-list">
                    {displayedEvents.length > 0 ? (
                        displayedEvents.map(event => (
                            <EventCard key={event.id} event={event} />
                        ))
                    ) : (
                        <p className="no-events-found">Maaf, tidak ada acara yang ditemukan.</p>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Event;