/*!
* Start Bootstrap - Resume v7.0.6 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/
//
// Scripts
//

window.addEventListener('DOMContentLoaded', event => {
    // Activate Bootstrap scrollspy on the main nav element
    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Lazy load images for better performance
    const lazyImages = document.querySelectorAll('img[data-src]');
    const lazyLoad = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                observer.unobserve(img);
            }
        });
    };

    const imageObserver = new IntersectionObserver(lazyLoad, {
        rootMargin: '0px 0px 50px 0px',
        threshold: 0.01
    });

    lazyImages.forEach(image => {
        imageObserver.observe(image);
    });

    // Debounce function to limit the rate at which a function can fire
    const debounce = (func, wait) => {
        let timeout;
        return (...args) => {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

    // Adjust header on scroll
    const adjustHeader = () => {
        const header = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            header.classList.add('navbar-scrolled');
        } else {
            header.classList.remove('navbar-scrolled');
        }
    };

    window.addEventListener('scroll', debounce(adjustHeader, 10));
    adjustHeader();

    // Dark mode toggle
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    if (toggleSwitch) {
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme) {
            document.documentElement.setAttribute('data-theme', currentTheme);
            if (currentTheme === 'dark') {
                toggleSwitch.checked = true;
            }
        }

        const switchTheme = (e) => {
            if (e.target.checked) {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
            }
        };

        toggleSwitch.addEventListener('change', switchTheme, false);
    }

    // Back to top button
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '↑';
    backToTopButton.className = 'back-to-top';
    document.body.appendChild(backToTopButton);

    const scrollFunction = () => {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    };

    window.onscroll = function () {
        scrollFunction();
    };

    backToTopButton.addEventListener('click', () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    });

    // Dynamic copyright year
    const currentYear = new Date().getFullYear();
    document.getElementById('year').textContent = currentYear;

    // Tooltip initialization
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Modal video play and stop
    const videoModal = document.getElementById('videoModal');
    const video = document.getElementById('video');
    
    if (videoModal) {
        videoModal.addEventListener('show.bs.modal', () => {
            video.play();
        });
        videoModal.addEventListener('hide.bs.modal', () => {
            video.pause();
            video.currentTime = 0;
        });
    }

    // Form validation
    const forms = document.querySelectorAll('.needs-validation');

    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }

                form.classList.add('was-validated');
            }, false);
        });

    // Dynamic content loading
    const contentAreas = document.querySelectorAll('.dynamic-content');
    contentAreas.forEach(area => {
        fetch(area.dataset.src)
            .then(response => response.text())
            .then(data => {
                area.innerHTML = data;
            });
    });

    // Lightbox gallery
    const lightbox = GLightbox({
        selector: '.glightbox'
    });

    // Accordion functionality
    const accordions = document.querySelectorAll('.accordion');
    accordions.forEach(accordion => {
        accordion.querySelectorAll('.accordion-item').forEach(item => {
            item.querySelector('.accordion-header').addEventListener('click', () => {
                item.querySelector('.accordion-body').classList.toggle('show');
            });
        });
    });

    // Parallax effect for background images
    const parallaxElements = document.querySelectorAll('.parallax');
    window.addEventListener('scroll', () => {
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-speed');
            const yPos = -(window.scrollY * speed / 100);
            element.style.backgroundPosition = `50% ${yPos}px`;
        });
    });

    // Animate on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach(element => {
            const position = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (position < windowHeight - 50) {
                element.classList.add('animated');
            }
        });
    };

    window.addEventListener('scroll', debounce(animateOnScroll, 10));
    animateOnScroll();

    // Countdown timer
    const countdownTimer = () => {
        const countdown = document.getElementById('countdown');
        if (countdown) {
            const targetDate = new Date(countdown.dataset.target);
            const updateTimer = () => {
                const now = new Date();
                const difference = targetDate - now;
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);
                countdown.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
                if (difference < 0) {
                    countdown.innerHTML = 'EXPIRED';
                }
            };
            setInterval(updateTimer, 1000);
            updateTimer();
        }
    };

    countdownTimer();

    // Custom cursor
    const customCursor = document.querySelector('.custom-cursor');
    document.addEventListener('mousemove', (e) => {
        customCursor.style.left = e.pageX + 'px';
        customCursor.style.top = e.pageY + 'px';
    });

    // Slide-in animation
    const slideInElements = document.querySelectorAll('.slide-in');
    const slideInOnScroll = () => {
        slideInElements.forEach(element => {
            const position = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (position < windowHeight - 50) {
                element.classList.add('slide-in-animated');
            }
        });
    };

    window.addEventListener('scroll', debounce(slideInOnScroll, 10));
    slideInOnScroll();
});
