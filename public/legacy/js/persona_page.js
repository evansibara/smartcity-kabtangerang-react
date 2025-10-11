/* js/persona_page.js */

document.addEventListener('DOMContentLoaded', function() {
    // Force header to always show background on persona page
    const mainHeader = document.querySelector('.main-header');
    if (mainHeader) {
        mainHeader.classList.add('scrolled');
        mainHeader.style.backgroundColor = '#800080';
    }

    // Tab Navigation Functionality
    const navTabs = document.querySelectorAll('.nav-tab');
    const orgSections = document.querySelectorAll('.org-section');

    navTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            
            // Remove active class from all tabs and sections
            navTabs.forEach(t => t.classList.remove('active'));
            orgSections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding section
            this.classList.add('active');
            const targetSection = document.getElementById(target);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });

    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Apply animation to person cards
    const personCards = document.querySelectorAll('.person-card');
    personCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Apply animation to other sections
    const animatedElements = document.querySelectorAll('.intro-section, .org-chart-section, .contact-section');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(element);
    });

    // Search functionality (if search bar is available)
    const searchInput = document.getElementById('searchBar');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            const personCards = document.querySelectorAll('.person-card');
            
            personCards.forEach(card => {
                const nameElement = card.querySelector('h3');
                const positionElement = card.querySelector('.position');
                const descriptionElement = card.querySelector('.description');
                
                const name = nameElement ? nameElement.textContent.toLowerCase() : '';
                const position = positionElement ? positionElement.textContent.toLowerCase() : '';
                const description = descriptionElement ? descriptionElement.textContent.toLowerCase() : '';
                
                if (name.includes(searchTerm) || position.includes(searchTerm) || description.includes(searchTerm)) {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                } else {
                    card.style.display = 'none';
                }
            });
            
            // If search is empty, show all cards
            if (searchTerm === '') {
                personCards.forEach(card => {
                    card.style.display = 'block';
                });
            }
        });
    }

    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
                
                // Add loading animation
                img.style.opacity = '0';
                img.onload = function() {
                    this.style.transition = 'opacity 0.3s ease';
                    this.style.opacity = '1';
                };
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Add click effect to person cards
    personCards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
        
        // Add keyboard accessibility
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        
        const nameElement = card.querySelector('h3');
        if (nameElement) {
            card.setAttribute('aria-label', `Lihat detail ${nameElement.textContent}`);
        }
        
        card.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                this.click();
            }
        });
    });

    // Print functionality
    function printOrganization() {
        const printContent = document.querySelector('.main-content');
        if (!printContent) return;
        
        const originalContent = document.body.innerHTML;
        
        document.body.innerHTML = `
            <div style="padding: 20px; font-family: Arial, sans-serif;">
                <h1 style="text-align: center; margin-bottom: 30px;">Struktur Organisasi SmartCity Kabupaten Tangerang</h1>
                ${printContent.innerHTML}
            </div>
        `;
        
        window.print();
        document.body.innerHTML = originalContent;
        
        // Re-initialize scripts after content restore
        setTimeout(() => {
            location.reload();
        }, 100);
    }

    // Add print button if needed
    const printButton = document.querySelector('.print-button');
    if (printButton) {
        printButton.addEventListener('click', printOrganization);
    }

    // Back to top functionality
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '↑';
    backToTopButton.className = 'back-to-top';
    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #667eea;
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        transition: all 0.3s ease;
        opacity: 0;
        transform: translateY(100px);
        z-index: 1000;
    `;

    document.body.appendChild(backToTopButton);

    // Show/hide back to top button
    const toggleBackToTop = () => {
        if (window.pageYOffset > 300) {
            backToTopButton.style.opacity = '1';
            backToTopButton.style.transform = 'translateY(0)';
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.transform = 'translateY(100px)';
        }
    };

    window.addEventListener('scroll', toggleBackToTop);

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    backToTopButton.addEventListener('mouseenter', () => {
        backToTopButton.style.background = '#764ba2';
        backToTopButton.style.transform = 'scale(1.1) translateY(0)';
    });

    backToTopButton.addEventListener('mouseleave', () => {
        backToTopButton.style.background = '#667eea';
        backToTopButton.style.transform = 'scale(1) translateY(0)';
    });

    // Mobile responsiveness for cards
    const handleResize = () => {
        const cards = document.querySelectorAll('.person-card');
        cards.forEach(card => {
            if (window.innerWidth <= 768) {
                card.style.margin = '10px 0';
            } else {
                card.style.margin = '';
            }
        });
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call

    // Add focus styles
    const focusStyles = document.createElement('style');
    focusStyles.textContent = `
        .person-card:focus {
            outline: 3px solid #667eea;
            outline-offset: 2px;
        }
        .nav-tab:focus {
            outline: 2px solid #667eea;
            outline-offset: 2px;
        }
    `;
    document.head.appendChild(focusStyles);
});