// Hide preloader immediately when script loads
(function() {
    function hidePreloader() {
        var preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.classList.add('hidden');
        }
    }
    
    // Hide preloader on window load or after timeout (whichever comes first)
    if (document.readyState === 'complete') {
        setTimeout(hidePreloader, 500);
    } else {
        window.addEventListener('load', function() {
            setTimeout(hidePreloader, 500);
        });
        // Fallback: hide after 2 seconds even if load event doesn't fire
        setTimeout(hidePreloader, 2000);
    }
})();

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }

    // Set current year in footer
    var currentYearEl = document.getElementById('currentYear');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    // Initialize all functionality
    initNavbar();
    initCounters();
    initFlavorFilter();
    initGalleryLightbox();
    initBackToTop();
    initForms();
    initParticles();
    initRevealElements();
});

// Navbar scroll effect
function initNavbar() {
    var navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });

    // Close mobile menu when clicking a link
    var navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            var navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                var bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) {
                    bsCollapse.hide();
                }
            }
        });
    });

    // Active nav link on scroll
    var sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', function() {
        var current = '';
        sections.forEach(function(section) {
            var sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.navbar-nav .nav-link').forEach(function(link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// Counter Animation
function initCounters() {
    var counters = document.querySelectorAll('.stat-number');
    
    var counterObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                var counter = entry.target;
                var target = parseInt(counter.getAttribute('data-target'));
                var duration = 2000;
                var step = target / (duration / 16);
                var current = 0;

                function updateCounter() {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.floor(current).toLocaleString();
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target.toLocaleString() + '+';
                    }
                }

                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(function(counter) {
        counterObserver.observe(counter);
    });
}

// Flavor Filter
function initFlavorFilter() {
    var filterBtns = document.querySelectorAll('.filter-btn');
    var flavorItems = document.querySelectorAll('.flavor-item');

    filterBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(function(b) {
                b.classList.remove('active');
            });
            btn.classList.add('active');

            var filter = btn.getAttribute('data-filter');

            flavorItems.forEach(function(item) {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.5s ease';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Add fadeIn animation
    var style = document.createElement('style');
    style.textContent = '@keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }';
    document.head.appendChild(style);
}

// Gallery Lightbox
function initGalleryLightbox() {
    var galleryItems = document.querySelectorAll('.gallery-item');
    var lightbox = document.getElementById('lightbox');
    var lightboxImg = document.getElementById('lightbox-img');
    var lightboxClose = document.querySelector('.lightbox-close');

    if (!lightbox || !lightboxImg) return;

    galleryItems.forEach(function(item) {
        item.addEventListener('click', function() {
            var img = item.querySelector('img');
            if (img) {
                lightboxImg.src = img.src;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
}

// Back to Top Button
function initBackToTop() {
    var backToTop = document.getElementById('backToTop');
    
    if (!backToTop) return;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Forms
function initForms() {
    // Newsletter Form
    var newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for subscribing! We\'ll keep you updated with delicious news.');
            newsletterForm.reset();
        });
    }

    // Contact Form
    var contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            var name = document.getElementById('name').value;
            alert('Thank you ' + name + '! Your message has been sent. We\'ll get back to you soon.');
            contactForm.reset();
        });
    }
}

// Floating particles in hero
function initParticles() {
    var particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    var particleCount = 20;

    // Add particle animation styles
    var particleStyle = document.createElement('style');
    particleStyle.textContent = '@keyframes floatParticle { 0% { transform: translate(0, 0) rotate(0deg); opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { transform: translate(100px, -100vh) rotate(360deg); opacity: 0; } }';
    document.head.appendChild(particleStyle);

    for (var i = 0; i < particleCount; i++) {
        var particle = document.createElement('div');
        var size = Math.random() * 10 + 5;
        var left = Math.random() * 100;
        var top = Math.random() * 100;
        var duration = Math.random() * 10 + 10;
        var delay = Math.random() * 5;
        var opacity = Math.random() * 0.3 + 0.1;

        particle.style.cssText = 'position: absolute; width: ' + size + 'px; height: ' + size + 'px; background: rgba(255, 255, 255, ' + opacity + '); border-radius: 50%; left: ' + left + '%; top: ' + top + '%; animation: floatParticle ' + duration + 's linear infinite; animation-delay: ' + delay + 's; pointer-events: none;';
        particlesContainer.appendChild(particle);
    }
}

// Smooth reveal on scroll for elements
function initRevealElements() {
    var revealElements = document.querySelectorAll('.flavor-card, .process-card, .contact-item');
    
    var revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(function(el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(el);
    });
}