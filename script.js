// DOM Elements
const navbar = document.querySelector('.navbar');
const navMenu = document.getElementById('nav-menu');
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(15, 23, 42, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');

    // Animate hamburger lines
    const spans = hamburger.querySelectorAll('span');
    if (hamburger.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');

        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Smooth scroll for all internal links
document.addEventListener('click', (e) => {
    if (e.target.matches('a[href^="#"]') || e.target.closest('a[href^="#"]')) {
        e.preventDefault();
        const link = e.target.matches('a[href^="#"]') ? e.target : e.target.closest('a[href^="#"]');
        const targetId = link.getAttribute('href').slice(1);
        scrollToSection(targetId);
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.skill-category, .project-card, .achievement-card, .activity-card, .timeline-item, .contact-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });
});

// Typing animation
function typeWriter() {
    const typingElement = document.querySelector('.typing-text');

    if (!typingElement) {
        console.log('Typing element not found');
        return;
    }

    console.log('Starting typing animation...');

    const texts = [
        "Student at Los Alamitos High School",
        "Aspiring Computer Scientist",
        "Violinist & Composer",
        "Published Author"
    ];

    let currentIndex = 0;

    function changeText() {
        // Clear current text
        typingElement.style.opacity = '0';

        setTimeout(() => {
            typingElement.textContent = texts[currentIndex];
            typingElement.style.opacity = '1';
            currentIndex = (currentIndex + 1) % texts.length;
        }, 300);
    }

    // Add transition CSS
    typingElement.style.transition = 'opacity 0.3s ease-in-out';

    // Start the animation after a delay
    setTimeout(() => {
        changeText();
        // Continue changing text every 3 seconds
        setInterval(changeText, 3000);
    }, 2000);
}

// Active navigation highlighting
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        const id = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${id}"]`);

        if (scrollPos >= top && scrollPos < bottom) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// Parallax effect for floating shapes
function parallaxShapes() {
    const shapes = document.querySelectorAll('.shape');
    const scrolled = window.pageYOffset;

    shapes.forEach((shape, index) => {
        const rate = scrolled * -0.5 * (index + 1) * 0.1;
        shape.style.transform = `translateY(${rate}px)`;
    });
}

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Add scroll event with throttling
window.addEventListener('scroll', throttle(parallaxShapes, 16));

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        const target = counter.textContent.replace(/[^0-9]/g, '');
        const increment = target / 200;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }

            // Preserve original formatting (like + suffix)
            const originalText = counter.textContent;
            const suffix = originalText.replace(/[0-9]/g, '');
            counter.textContent = Math.floor(current) + suffix;
        }, 10);
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
function observeElements() {
    const elementsToObserve = document.querySelectorAll(
        '.about-card, .project-card, .timeline-item, .achievement-category, .activity-card'
    );

    elementsToObserve.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Project card hover effects
function addProjectCardEffects() {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Achievement cards stagger animation
function staggerAnimateAchievements() {
    const achievementItems = document.querySelectorAll('.achievement-item');

    achievementItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 100);

        // Set initial state
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'all 0.5s ease';
    });
}

// Activity cards effects
function addActivityCardEffects() {
    const activityCards = document.querySelectorAll('.activity-card');

    activityCards.forEach(card => {
        const icon = card.querySelector('.activity-icon');

        card.addEventListener('mouseenter', () => {
            if (icon) {
                icon.style.transform = 'rotate(10deg) scale(1.1)';
            }
        });

        card.addEventListener('mouseleave', () => {
            if (icon) {
                icon.style.transform = 'rotate(0deg) scale(1)';
            }
        });
    });
}

// Floating icons animation in hero
function animateFloatingIcons() {
    const floatingIcons = document.querySelectorAll('.floating-icon');

    floatingIcons.forEach((icon, index) => {
        icon.style.animationDelay = `${index * 0.5}s`;

        // Add random movement
        setInterval(() => {
            const randomX = Math.random() * 10 - 5;
            const randomY = Math.random() * 10 - 5;
            icon.style.transform = `translate(${randomX}px, ${randomY}px)`;
        }, 3000 + index * 500);
    });
}

// Loading animation
function addLoadingAnimation() {
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
        document.body.style.overflow = 'visible';
        document.body.classList.add('loaded');
    }, 500);
}

// Easter egg: Konami code
function addKonamiCode() {
    const konamiCode = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.code === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                // Easter egg activated!
                document.body.style.filter = 'hue-rotate(180deg)';
                setTimeout(() => {
                    document.body.style.filter = 'none';
                }, 3000);
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Core functionality
    observeElements();
    addLoadingAnimation();
    typeWriter(); // Start typing animation immediately

    // Enhanced interactions
    addProjectCardEffects();
    addActivityCardEffects();
    animateFloatingIcons();

    // Delayed animations
    setTimeout(() => {
        animateCounters();
        staggerAnimateAchievements();
    }, 500);

    // Easter egg
    addKonamiCode();
});

// Handle page visibility change
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when tab is not visible
        document.querySelectorAll('.floating-icon, .shape').forEach(el => {
            el.style.animationPlayState = 'paused';
        });
    } else {
        // Resume animations when tab becomes visible
        document.querySelectorAll('.floating-icon, .shape').forEach(el => {
            el.style.animationPlayState = 'running';
        });
    }
});

// Performance optimization: Reduce motion for users who prefer it
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--transition-fast', '0s');
    document.documentElement.style.setProperty('--transition-base', '0s');
    document.documentElement.style.setProperty('--transition-slow', '0s');

    // Disable complex animations
    const animatedElements = document.querySelectorAll('.floating-icon, .shape, .wave');
    animatedElements.forEach(el => {
        el.style.animation = 'none';
    });
}

// Add touch support for mobile devices
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');

    // Add touch-specific enhancements
    const cards = document.querySelectorAll('.project-card, .about-card, .activity-card');
    cards.forEach(card => {
        card.addEventListener('touchstart', () => {
            card.style.transform = 'scale(0.98)';
        });

        card.addEventListener('touchend', () => {
            card.style.transform = 'scale(1)';
        });
    });
}

// Global functions that can be called from HTML
window.scrollToSection = scrollToSection;