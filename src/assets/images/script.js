document.addEventListener('DOMContentLoaded', function() {
    const headerPlaceholder = document.getElementById('header-placeholder');

    if (headerPlaceholder) {
        fetch('html/header.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.text();
            })
            .then(data => {
                headerPlaceholder.innerHTML = data;
                initializeHeaderScripts();
            })
            .catch(error => {
                console.error('Error loading header:', error);
                // Fallback: create basic header structure
                headerPlaceholder.innerHTML = `
                    <header class="main-header">
                        <div class="header-container">
                            <div class="logo">SmartCity Kabupaten Tangerang</div>
                            <nav class="main-nav">
                                <ul>
                                    <li><a href="/" class="nav-link-beranda">Beranda</a></li>
                                    <li><a href="/dimensi_page.html" class="nav-link-dimensi">Dimensi</a></li>
                                    <li class="dropdown">
                                        <button class="dropbtn">Tentang ▼</button>
                                        <div class="dropdown-content">
                                            <a href="/profile_page.html">Profile</a>
                                            <a href="/persona_page.html">Tim</a>
                                        </div>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </header>
                `;
                initializeHeaderScripts();
            });
    } else {
        console.warn('Placeholder untuk header (#header-placeholder) tidak ditemukan.');
        // Still initialize header scripts in case header exists directly
        initializeHeaderScripts();
    }

    function initializeHeaderScripts() {
        // --- LOGIKA UTAMA: Header Scroll Background ---
        const mainHeader = document.querySelector('.main-header');

        if (mainHeader) {
            const scrollThreshold = 50;
            const handleScroll = () => {
                if (window.scrollY > scrollThreshold) {
                    mainHeader.classList.add('scrolled');
                } else {
                    mainHeader.classList.remove('scrolled');
                }
            };
            
            // Use passive listener for better performance
            window.addEventListener('scroll', handleScroll, { passive: true });
            handleScroll(); // Call once for initial position
        } else {
            console.warn('Elemen .main-header tidak ditemukan.');
        }

        // ---- LOGIKA SEARCH BAR TOGGLE ----
        const searchToggle = document.getElementById('searchToggle');
        const searchInput = document.getElementById('searchBar');

        if (searchToggle && searchInput) {
            searchToggle.addEventListener('click', function(e) {
                e.stopPropagation();
                searchInput.classList.toggle('active');
                if (searchInput.classList.contains('active')) {
                    searchInput.focus();
                    searchInput.style.pointerEvents = 'auto';
                } else {
                    searchInput.value = '';
                    searchInput.style.pointerEvents = 'none';
                }
            });

            // Close search when clicking outside
            document.addEventListener('click', function(event) {
                if (!searchInput.contains(event.target) && !searchToggle.contains(event.target)) {
                    if (searchInput.classList.contains('active')) {
                        searchInput.classList.remove('active');
                        searchInput.value = '';
                        searchInput.style.pointerEvents = 'none';
                    }
                }
            });

            // Close search on escape key
            document.addEventListener('keydown', function(event) {
                if (event.key === 'Escape' && searchInput.classList.contains('active')) {
                    searchInput.classList.remove('active');
                    searchInput.value = '';
                    searchInput.style.pointerEvents = 'none';
                }
            });
        }

        // ---- LOGIKA DROPDOWN NAVIGASI ----
        const dropdowns = document.querySelectorAll('.main-nav .dropdown');
        dropdowns.forEach(dropdown => {
            const dropdownContent = dropdown.querySelector('.dropdown-content');
            const dropBtn = dropdown.querySelector('.dropbtn');
            
            if (dropdownContent && dropBtn) {
                // Mobile dropdown toggle
                if (window.innerWidth <= 768) {
                    dropBtn.addEventListener('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        dropdownContent.style.display = 
                            dropdownContent.style.display === 'block' ? 'none' : 'block';
                    });
                }
                
                // Close dropdown when clicking outside
                document.addEventListener('click', function(event) {
                    if (!dropdown.contains(event.target)) {
                        dropdownContent.style.display = 'none';
                    }
                });
            }
        });

        // --- LOGIKA UNTUK MENANDAI LINK NAVIGASI AKTIF ---
        const currentPath = window.location.pathname;
        const currentFileName = currentPath.substring(currentPath.lastIndexOf('/') + 1);

        // Remove active class from all navigation links first
        document.querySelectorAll('.main-nav ul li a').forEach(link => {
            link.classList.remove('active-nav-link');
        });

        // Determine which link is active based on filename
        if (currentFileName === '' || currentFileName === 'index.html' || currentFileName === 'home_page.html' || currentPath === '/') {
            const homeNavLink = document.querySelector('.nav-link-beranda');
            if (homeNavLink) {
                homeNavLink.classList.add('active-nav-link');
                // Scroll to top functionality for home
                homeNavLink.addEventListener('click', function(event) {
                    if (window.scrollY > 0 && (currentPath === '/' || currentFileName === '' || currentFileName === 'index.html')) {
                        event.preventDefault();
                        window.scrollTo({
                            top: 0,
                            behavior: 'smooth'
                        });
                    }
                });
            }
        } else if (currentFileName === 'dimensi_page.html') {
            const dimensiNavLink = document.querySelector('.nav-link-dimensi');
            if (dimensiNavLink) {
                dimensiNavLink.classList.add('active-nav-link');
                // Scroll to top functionality for dimensi
                dimensiNavLink.addEventListener('click', function(event) {
                    if (window.scrollY > 0 && currentFileName === 'dimensi_page.html') {
                        event.preventDefault();
                        window.scrollTo({
                            top: 0,
                            behavior: 'smooth'
                        });
                    }
                });
            }
        } else if (currentFileName === 'profile_page.html') {
            const tentangDropdown = document.querySelector('.dropdown .dropbtn');
            if (tentangDropdown) {
                tentangDropdown.classList.add('active-nav-link');
            }
        } else if (currentFileName === 'persona_page.html') {
            const tentangDropdown = document.querySelector('.dropdown .dropbtn');
            if (tentangDropdown) {
                tentangDropdown.classList.add('active-nav-link');
            }
        } else if (currentFileName === 'city_of_event.html') {
            const cityEventNavLink = document.querySelector('.nav-link-cityevent');
            if (cityEventNavLink) {
                cityEventNavLink.classList.add('active-nav-link');
                cityEventNavLink.addEventListener('click', function(event) {
                    if (window.scrollY > 0 && currentFileName === 'city_of_event.html') {
                        event.preventDefault();
                        window.scrollTo({
                            top: 0,
                            behavior: 'smooth'
                        });
                    }
                });
            }
        }
        
        // Accordion functionality
        const accordionHeaders = document.querySelectorAll('.accordion-header');

        accordionHeaders.forEach(header => {
            header.addEventListener('click', function() {
                const accordionContent = this.nextElementSibling;
                
                if (!accordionContent) return;

                // Close all other accordions
                accordionHeaders.forEach(otherHeader => {
                    if (otherHeader !== this) {
                        otherHeader.classList.remove('active');
                        const otherContent = otherHeader.nextElementSibling;
                        if (otherContent) {
                            otherContent.classList.remove('show');
                            otherContent.style.maxHeight = null;
                        }
                    }
                });

                // Toggle current accordion
                this.classList.toggle('active');
                accordionContent.classList.toggle('show');

                if (accordionContent.classList.contains('show')) {
                    accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
                } else {
                    accordionContent.style.maxHeight = null;
                }
            });
        });

        // Mobile menu toggle (if exists)
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const mainNav = document.querySelector('.main-nav');
        
        if (mobileMenuToggle && mainNav) {
            mobileMenuToggle.addEventListener('click', function() {
                mainNav.classList.toggle('active');
                this.classList.toggle('active');
            });
        }

        // Handle window resize
        const handleResize = () => {
            const dropdowns = document.querySelectorAll('.main-nav .dropdown');
            dropdowns.forEach(dropdown => {
                const dropdownContent = dropdown.querySelector('.dropdown-content');
                if (dropdownContent) {
                    // Reset dropdown display on resize
                    if (window.innerWidth > 768) {
                        dropdownContent.style.display = '';
                    } else {
                        dropdownContent.style.display = 'none';
                    }
                }
            });
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial call
    }

    // Load footer
    loadFooter();
});

// Footer loading function
function loadFooter() {
    const footerPlaceholder = document.getElementById('footer-placeholder');
    const existingFooter = document.querySelector('.main-footer');
    
    const fallbackFooter = `
        <footer class="main-footer">
            <div class="container">
                <div class="footer-bottom">
                    <p>&copy; 2024 SmartCity Kabupaten Tangerang. Hak Cipta Dilindungi Undang-Undang.</p>
                </div>
            </div>
        </footer>
    `;
    
    if (footerPlaceholder) {
        fetch('footer.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Footer not found');
                }
                return response.text();
            })
            .then(data => {
                footerPlaceholder.innerHTML = data;
            })
            .catch(error => {
                console.error('Error loading footer:', error);
                footerPlaceholder.innerHTML = fallbackFooter;
            });
    } else if (existingFooter) {
        fetch('footer.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Footer not found');
                }
                return response.text();
            })
            .then(data => {
                existingFooter.outerHTML = data;
            })
            .catch(error => {
                console.error('Error loading footer:', error);
            });
    } else {
        fetch('footer.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Footer not found');
                }
                return response.text();
            })
            .then(data => {
                document.body.insertAdjacentHTML('beforeend', data);
            })
            .catch(error => {
                console.error('Error loading footer:', error);
                document.body.insertAdjacentHTML('beforeend', fallbackFooter);
            });
    }
}