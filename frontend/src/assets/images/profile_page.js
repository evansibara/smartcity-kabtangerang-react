// Profile Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize page animations
    initializeAnimations();
    
    // Initialize interactive features
    initializeInteractivity();
    
    // Initialize scroll effects
    initializeScrollEffects();
    
    // Initialize accessibility
    initializeAccessibility();
    
    // Initialize mobile interactions
    initializeMobileInteractions();
    
    // Initialize smooth scrolling
    initializeSmoothScrolling();
});

function initializeAnimations() {
    // Animate hero section
    const heroSection = document.querySelector('.profile-hero-section');
    if (heroSection) {
        heroSection.style.opacity = '0';
        heroSection.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroSection.style.transition = 'opacity 1s ease, transform 1s ease';
            heroSection.style.opacity = '1';
            heroSection.style.transform = 'translateY(0)';
        }, 100);
    }
    
    // Animate stats with counting effect
    animateStats();
    
    // Animate timeline items
    animateTimelineItems();
    
    // Add loading animations
    addLoadingAnimations();
}

function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent || target.getAttribute('data-target') || '0';
                
                // Extract number from text (handle 1.5M+ format)
                let numericValue = parseFloat(finalValue.replace(/[^\d.]/g, ''));
                let suffix = finalValue.replace(/[\d.]/g, '').replace(/\s/g, '');
                
                if (finalValue.includes('M') || finalValue.includes('m')) {
                    numericValue = numericValue * 1000000;
                    suffix = '+';
                } else if (finalValue.includes('K') || finalValue.includes('k')) {
                    numericValue = numericValue * 1000;
                    suffix = '+';
                }
                
                // Ensure we have a valid number
                if (isNaN(numericValue)) {
                    numericValue = parseInt(finalValue) || 0;
                }
                
                animateNumber(target, 0, numericValue, suffix, 2000);
                observer.unobserve(target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

function animateNumber(element, start, end, suffix, duration) {
    const startTime = performance.now();
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (end - start) * easeOutCubic);
        
        // Format the number
        let displayValue = current.toLocaleString();
        
        if (end >= 1000000) {
            displayValue = (current / 1000000).toFixed(1) + 'M';
        } else if (end >= 1000) {
            displayValue = Math.floor(current / 1000) + 'K';
        }
        
        element.textContent = displayValue + (suffix || '');
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

function animateTimelineItems() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 200);
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });
    
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        if (index % 2 === 0) {
            item.style.transform = 'translateX(-50px)';
        } else {
            item.style.transform = 'translateX(50px)';
        }
        
        observer.observe(item);
    });
}

function initializeInteractivity() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.stat-item, .vm-card, .objective-card');
    
    cards.forEach(card => {
        // Only add hover effects on non-mobile devices
        if (window.innerWidth > 768) {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        }
    });
    
    // Add click interaction to objective cards
    const objectiveCards = document.querySelectorAll('.objective-card');
    
    objectiveCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add a pulse effect
            this.style.animation = 'pulse 0.6s ease-in-out';
            
            setTimeout(() => {
                this.style.animation = '';
            }, 600);
        });
        
        // Add keyboard support
        card.setAttribute('tabindex', '0');
        card.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                this.click();
            }
        });
    });
    
    // Add CSS for pulse animation
    if (!document.querySelector('#pulse-animation')) {
        const style = document.createElement('style');
        style.id = 'pulse-animation';
        style.textContent = `
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
    }
}

function initializeScrollEffects() {
    // Parallax effect for hero section
    const heroSection = document.querySelector('.profile-hero-section');
    
    if (heroSection) {
        const handleScroll = () => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            
            if (scrolled < heroSection.offsetHeight) {
                heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            }
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
    }
    
    // Fade in animation for sections
    const sections = document.querySelectorAll('.profile-overview-section, .vision-mission-section, .objectives-section, .timeline-section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                sectionObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 1s ease, transform 1s ease';
        
        sectionObserver.observe(section);
    });
}

function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.main-header')?.offsetHeight || 0;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function addLoadingAnimations() {
    const animatedElements = document.querySelectorAll('.vm-card, .objective-card, .timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });
    
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(element);
    });
}

function initializeAccessibility() {
    // Add focus indicators
    const style = document.createElement('style');
    style.textContent = `
        .stat-item:focus,
        .vm-card:focus,
        .objective-card:focus,
        .timeline-item:focus {
            outline: 3px solid #3498db;
            outline-offset: 2px;
        }
        
        .stat-item:focus,
        .vm-card:focus,
        .objective-card:focus {
            transform: translateY(-5px) scale(1.02);
        }
    `;
    document.head.appendChild(style);
    
    // Make interactive elements keyboard accessible
    const interactiveElements = document.querySelectorAll('.stat-item, .vm-card, .objective-card');
    
    interactiveElements.forEach(element => {
        element.setAttribute('tabindex', '0');
        element.setAttribute('role', 'button');
        
        element.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                // Trigger hover effect on keyboard interaction
                this.style.transform = 'translateY(-10px) scale(1.02)';
                
                setTimeout(() => {
                    this.style.transform = '';
                }, 200);
            }
        });
    });
}

function initializeMobileInteractions() {
    if ('ontouchstart' in window) {
        const cards = document.querySelectorAll('.stat-item, .vm-card, .objective-card');
        
        cards.forEach(card => {
            card.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            }, { passive: true });
            
            card.addEventListener('touchend', function() {
                this.style.transform = '';
            }, { passive: true });
        });
    }
}

// Performance optimization: Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle window resize with debouncing
const handleResize = debounce(() => {
    // Recalculate animations and effects for new viewport size
    const cards = document.querySelectorAll('.stat-item, .vm-card, .objective-card');
    
    cards.forEach(card => {
        // Reset hover effects based on screen size
        if (window.innerWidth <= 768) {
            card.removeEventListener('mouseenter', () => {});
            card.removeEventListener('mouseleave', () => {});
        }
    });
}, 250);

window.addEventListener('resize', handleResize);