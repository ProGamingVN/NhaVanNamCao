// ===================================
// WEBSITE ANIMATION & INTERACTION SCRIPT
// Tố Hữu - Nhà Thơ Cách Mạng
// ===================================

// Page Loader
window.addEventListener('load', function() {
    const loader = document.querySelector('.page-loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 800);
    }
});

// ===================================
// NAVIGATION EFFECTS
// ===================================

// Sticky Navigation with Scroll Effect
let lastScroll = 0;
const nav = document.querySelector('nav');

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    // Add scrolled class for styling
    if (currentScroll > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Active Page Highlighting
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('nav a');

navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
        link.classList.add('active');
    }
});

// ===================================
// SCROLL TO TOP BUTTON
// ===================================

// Create and append scroll to top button
function createScrollTopButton() {
    const scrollBtn = document.createElement('div');
    scrollBtn.className = 'scroll-top';
    scrollBtn.innerHTML = '↑';
    scrollBtn.setAttribute('title', 'Về đầu trang');
    document.body.appendChild(scrollBtn);
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top on click
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize scroll button
createScrollTopButton();

// ===================================
// BOOK SLIDER FUNCTIONALITY
// ===================================

let currentSlideIndex = 0;
const slides = document.querySelectorAll('.book-slide');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
}

function nextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    showSlide(currentSlideIndex);
}

function prevSlide() {
    currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
    showSlide(currentSlideIndex);
}

// Auto-advance slides (optional)
if (slides.length > 0) {
    // Uncomment to enable auto-play
    // setInterval(nextSlide, 5000);
}

// ===================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ===================================

// Animate elements on scroll into view
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

// Observe all cards and timeline items
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.card-value, .book-info, .img-box');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ===================================
// IMAGE LAZY LOADING
// ===================================

function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

lazyLoadImages();

// ===================================
// PARALLAX EFFECT FOR IMAGES
// ===================================

window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.img-box img');
    
    parallaxElements.forEach(el => {
        const speed = 0.3;
        const rect = el.getBoundingClientRect();
        
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const yPos = -(scrolled * speed);
            el.style.transform = `translateY(${yPos}px) scale(1.1)`;
        }
    });
});

// ===================================
// SMOOTH REVEAL FOR TIMELINE ITEMS
// ===================================

function revealTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 100);
                timelineObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        timelineObserver.observe(item);
    });
}

revealTimeline();

// ===================================
// FLIP CARD INTERACTIONS
// ===================================

document.querySelectorAll('.flip-card').forEach(card => {
    // Touch support for mobile
    card.addEventListener('touchstart', function() {
        this.classList.toggle('flipped');
    });
    
    // Add click for better mobile experience
    card.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            this.classList.toggle('flipped');
        }
    });
});

// ===================================
// KEYBOARD NAVIGATION FOR BOOK SLIDER
// ===================================

document.addEventListener('keydown', function(e) {
    if (slides.length > 0) {
        if (e.key === 'ArrowRight') {
            nextSlide();
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
        }
    }
});

// ===================================
// HOVER EFFECTS FOR CARDS
// ===================================

document.querySelectorAll('.card-value').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ===================================
// DYNAMIC COPYRIGHT YEAR
// ===================================

const footer = document.querySelector('footer p');
if (footer) {
    const currentYear = new Date().getFullYear();
    footer.innerHTML = footer.innerHTML.replace('2024', currentYear);
}

// ===================================
// PERFORMANCE: Debounce Scroll Events
// ===================================

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

// Apply debounce to scroll-heavy functions
const debouncedParallax = debounce(() => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.img-box img');
    
    parallaxElements.forEach(el => {
        const speed = 0.2;
        const rect = el.getBoundingClientRect();
        
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const yPos = -(scrolled * speed);
            el.style.transform = `translateY(${yPos}px) scale(1.05)`;
        }
    });
}, 10);

window.addEventListener('scroll', debouncedParallax);

// ===================================
// ADD READING PROGRESS BAR
// ===================================

function createProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 4px;
        background: linear-gradient(90deg, var(--gold), var(--primary-red));
        width: 0%;
        z-index: 10000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

createProgressBar();

// ===================================
// ENHANCED NAVIGATION: Smooth Section Scrolling
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// ===================================
// EASTER EGG: Konami Code
// ===================================

let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Easter egg activated!
        document.body.style.animation = 'rainbow 2s ease-in-out';
        setTimeout(() => {
            alert('🎉 Bạn đã tìm ra bí mật! Tố Hữu sẽ tự hào về bạn! 🎉');
            document.body.style.animation = '';
        }, 500);
    }
});

// Add rainbow animation
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

// ===================================
// LOG: Script Loaded Successfully
// ===================================

console.log('%c🎨 Website Tố Hữu được tải thành công!', 'color: #d4af37; font-size: 16px; font-weight: bold;');
console.log('%c✨ Với tình yêu và kính trọng đến nhà thơ vĩ đại', 'color: #8b0000; font-size: 12px;');
