// Dimensi Page JavaScript

// Data definisi untuk setiap dimensi
const dimensiData = {
    governance: {
        title: "Smart Governance",
        description: "Smart Governance adalah tata kelola pemerintahan yang efektif dan transparan, memanfaatkan teknologi informasi untuk meningkatkan pelayanan publik, partisipasi warga, dan pengambilan keputusan berbasis data. Sistem ini memungkinkan pemerintah untuk memberikan layanan yang lebih cepat, akurat, dan mudah diakses oleh masyarakat melalui platform digital."
    },
    living: {
        title: "Smart Living",
        description: "Smart Living berfokus pada peningkatan kualitas hidup warga melalui lingkungan yang nyaman, fasilitas kesehatan yang baik, pendidikan yang berkualitas, serta gaya hidup yang sehat dan aman. Konsep ini mencakup penggunaan teknologi untuk menciptakan hunian yang efisien energi, transportasi yang terintegrasi, dan akses mudah ke berbagai fasilitas publik."
    },
    branding: {
        title: "Smart Branding",
        description: "Smart Branding adalah upaya untuk membangun citra dan daya tarik kota yang kuat, baik untuk investasi, pariwisata, maupun peningkatan kualitas sumber daya manusia, melalui promosi yang inovatif dan terencana. Strategi ini melibatkan pemanfaatan teknologi digital dan media sosial untuk mempromosikan keunggulan dan potensi daerah secara efektif."
    },
    society: {
        title: "Smart Society",
        description: "Smart Society mendorong masyarakat yang inklusif, kolaboratif, dan adaptif terhadap perubahan, dengan memanfaatkan teknologi untuk memfasilitasi interaksi sosial, akses informasi, dan pengembangan komunitas. Konsep ini menekankan pentingnya literasi digital, partisipasi aktif masyarakat, dan pembangunan modal sosial yang kuat."
    },
    economy: {
        title: "Smart Economy",
        description: "Smart Economy bertujuan untuk menciptakan ekosistem ekonomi yang inovatif dan kompetitif, dengan mendukung startup, pengembangan UMKM, serta pemanfaatan teknologi untuk efisiensi dan pertumbuhan ekonomi lokal. Pendekatan ini mencakup digitalisasi proses bisnis, e-commerce, fintech, dan pengembangan industri kreatif berbasis teknologi."
    },
    environment: {
        title: "Smart Environment",
        description: "Smart Environment berorientasi pada pengelolaan lingkungan yang berkelanjutan, meliputi pengelolaan sampah, energi terbarukan, kualitas udara dan air, serta mitigasi bencana, untuk menciptakan kota yang hijau dan sehat. Sistem ini menggunakan sensor IoT, big data analytics, dan AI untuk monitoring dan pengelolaan sumber daya alam secara optimal."
    }
};

// Fungsi untuk menampilkan modal
function showModal(dimensiType) {
    const modal = document.getElementById('dimensi-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    
    const data = dimensiData[dimensiType];
    
    if (data) {
        modalTitle.textContent = data.title;
        modalDescription.textContent = data.description;
        modal.style.display = 'block';
        
        // Disable body scroll when modal is open
        document.body.style.overflow = 'hidden';
        
        // Add fade-in animation
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);
    }
}

// Fungsi untuk menutup modal
function closeModal() {
    const modal = document.getElementById('dimensi-modal');
    modal.style.opacity = '0';
    
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Add click event listeners to all dimensi cards
    const dimensiCards = document.querySelectorAll('.dimensi-card');
    
    dimensiCards.forEach(card => {
        card.addEventListener('click', function() {
            const dimensiType = this.getAttribute('data-dimensi');
            showModal(dimensiType);
        });
        
        // Add hover effect
        card.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                this.style.transform = 'translateY(-10px)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (window.innerWidth > 768) {
                this.style.transform = 'translateY(0)';
            }
        });
        
        // Add touch support
        card.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        card.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });
    
    // Close modal when clicking the X button
    const closeBtn = document.querySelector('.close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    // Close modal when clicking outside of it
    const modal = document.getElementById('dimensi-modal');
    if (modal) {
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const modal = document.getElementById('dimensi-modal');
            if (modal && modal.style.display === 'block') {
                closeModal();
            }
        }
    });
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Initially hide cards for animation
    const cards = document.querySelectorAll('.dimensi-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Add loading animation for hero section
    const heroSection = document.querySelector('.dimensi-hero-section');
    if (heroSection) {
        heroSection.style.opacity = '0';
        heroSection.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroSection.style.transition = 'opacity 1s ease, transform 1s ease';
            heroSection.style.opacity = '1';
            heroSection.style.transform = 'translateY(0)';
        }, 100);
    }
    
    // Add accessibility features
    cards.forEach(card => {
        // Add keyboard support
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        const cardTitle = card.querySelector('h3');
        if (cardTitle) {
            card.setAttribute('aria-label', `Klik untuk melihat detail ${cardTitle.textContent}`);
        }
        
        card.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                const dimensiType = this.getAttribute('data-dimensi');
                showModal(dimensiType);
            }
        });
    });
    
    // Add focus indicators
    const style = document.createElement('style');
    style.textContent = `
        .dimensi-card:focus {
            outline: 3px solid #3498db;
            outline-offset: 2px;
        }
        
        .close:focus {
            outline: 2px solid #3498db;
            outline-offset: 2px;
        }
    `;
    document.head.appendChild(style);
});

// Performance optimization: Debounce resize events
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        // Handle resize if needed
        const modal = document.getElementById('dimensi-modal');
        if (modal && modal.style.display === 'block') {
            // Adjust modal position on resize
            const modalContent = modal.querySelector('.modal-content');
            if (modalContent) {
                if (window.innerWidth < 768) {
                    modalContent.style.margin = '20% auto';
                    modalContent.style.width = '95%';
                } else {
                    modalContent.style.margin = '10% auto';
                    modalContent.style.width = '80%';
                }
            }
        }
    }, 250);
});