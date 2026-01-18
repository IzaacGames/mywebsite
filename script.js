/* ============================================
   ISAAC SHEK - Cyberpunk Portfolio
   Interactive JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initParallaxBackground();
    initTitleCursorTracking();
    initNavbar();
    initScrollAnimations();
    initTypingEffect();
    initBinaryEffect();
    initFlagAnimation();
});

/* ============================================
   PARALLAX BACKGROUND SCROLLING
   Background scrolls slower than content
   Stops when image reaches its bottom
   ============================================ */
function initParallaxBackground() {
    const cyberpunkBg = document.getElementById('cyberpunkBg');
    const bgImage = document.querySelector('.bg-image');
    
    if (!cyberpunkBg || !bgImage) return;

    // Wait for image to load to get its dimensions
    bgImage.addEventListener('load', updateParallax);
    
    // If already loaded
    if (bgImage.complete) {
        updateParallax();
    }

    function updateParallax() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const imageHeight = bgImage.offsetHeight;
            const bgHeight = cyberpunkBg.offsetHeight;
            
            // Calculate the maximum scroll before image runs out
            // The image should stop moving when its bottom aligns with viewport bottom
            const maxScroll = documentHeight - windowHeight;
            const maxImageOffset = imageHeight - windowHeight;
            
            // Calculate parallax with limit
            const parallaxSpeed = 0.3;
            let offset = scrolled * parallaxSpeed;
            
            // Clamp the offset so image doesn't scroll past its bottom
            if (offset > maxImageOffset) {
                offset = maxImageOffset;
            }
            
            cyberpunkBg.style.transform = `translateY(-${offset}px)`;
        });
    }
}

/* ============================================
   3D TITLE CURSOR TRACKING
   Title faces where the cursor is
   ============================================ */
function initTitleCursorTracking() {
    const heroTitle = document.getElementById('heroTitle');
    const heroSection = document.querySelector('.hero-section');
    
    if (!heroTitle || !heroSection) return;

    document.addEventListener('mousemove', (e) => {
        // Get the center of the title
        const rect = heroTitle.getBoundingClientRect();
        const titleCenterX = rect.left + rect.width / 2;
        const titleCenterY = rect.top + rect.height / 2;

        // Calculate the difference from cursor to title center
        const deltaX = e.clientX - titleCenterX;
        const deltaY = e.clientY - titleCenterY;

        // Calculate rotation angles (limited range for subtle effect)
        const maxRotation = 15; // Maximum degrees of rotation
        const rotateY = (deltaX / window.innerWidth) * maxRotation * 2;
        const rotateX = -(deltaY / window.innerHeight) * maxRotation * 2;

        // Apply the 3D rotation
        heroTitle.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
        `;
    });

    // Reset rotation when mouse leaves the viewport
    document.addEventListener('mouseleave', () => {
        heroTitle.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
}

/* ============================================
   NAVBAR SCROLL EFFECT
   ============================================ */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scroll for navigation links
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
}

/* ============================================
   SCROLL ANIMATIONS
   Projects slide in from left/right
   ============================================ */
function initScrollAnimations() {
    const gameCards = document.querySelectorAll('.game-card');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    gameCards.forEach(card => {
        observer.observe(card);
    });

    // Also animate the metallic board
    const metallicBoard = document.querySelector('.metallic-board');
    if (metallicBoard) {
        metallicBoard.style.opacity = '0';
        metallicBoard.style.transform = 'translateY(50px)';
        metallicBoard.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

        const boardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        boardObserver.observe(metallicBoard);
    }

    // Animate section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        title.style.opacity = '0';
        title.style.transform = 'translateY(30px)';
        title.style.transition = 'all 0.6s ease';

        const titleObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.5 });

        titleObserver.observe(title);
    });

    // Animate banner
    const bannerContainer = document.querySelector('.banner-container');
    if (bannerContainer) {
        bannerContainer.style.opacity = '0';
        bannerContainer.style.transform = 'translateY(30px)';
        bannerContainer.style.transition = 'all 0.8s ease';

        const bannerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.3 });

        bannerObserver.observe(bannerContainer);
    }
}

/* ============================================
   TYPING EFFECT FOR SUBTITLE
   ============================================ */
function initTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;

    const text = typingElement.textContent;
    typingElement.textContent = '';
    
    let index = 0;
    const typeSpeed = 80;

    function type() {
        if (index < text.length) {
            typingElement.textContent += text.charAt(index);
            index++;
            setTimeout(type, typeSpeed);
        }
    }

    // Start typing after a short delay
    setTimeout(type, 1000);
}

/* ============================================
   BINARY EFFECT FOR COMPETITIVE PROGRAMMING
   0s and 1s fade in/out around text
   ============================================ */
function initBinaryEffect() {
    const binaryContainer = document.getElementById('binaryContainer');
    if (!binaryContainer) return;

    const binaryDigits = [];
    const numDigits = 20;

    // Create binary digit elements
    for (let i = 0; i < numDigits; i++) {
        const digit = document.createElement('span');
        digit.className = 'binary-digit';
        digit.textContent = Math.random() > 0.5 ? '1' : '0';
        
        // Randomly assign white or black color
        digit.classList.add(Math.random() > 0.5 ? 'white' : 'black');
        
        // Position around the text
        const angle = (i / numDigits) * Math.PI * 2;
        const radius = 60 + Math.random() * 40;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * (radius * 0.4) - 5;
        
        digit.style.left = `calc(50% + ${x}px)`;
        digit.style.top = `calc(50% + ${y}px)`;
        digit.style.animationDelay = `${Math.random() * 2}s`;
        
        binaryContainer.appendChild(digit);
        binaryDigits.push(digit);
    }

    // Periodically change digits
    setInterval(() => {
        binaryDigits.forEach(digit => {
            if (Math.random() > 0.7) {
                digit.textContent = Math.random() > 0.5 ? '1' : '0';
                digit.classList.remove('white', 'black');
                digit.classList.add(Math.random() > 0.5 ? 'white' : 'black');
            }
        });
    }, 500);
}

/* ============================================
   FLAG ANIMATION FOR CTF
   Waving flag effect (smaller)
   ============================================ */
function initFlagAnimation() {
    const flagPath = document.querySelector('.flag-path');
    if (!flagPath) return;

    let phase = 0;
    
    function animateFlag() {
        phase += 0.15;
        
        const wave1 = Math.sin(phase) * 2;
        const wave2 = Math.sin(phase + 1) * 2;
        const wave3 = Math.sin(phase + 2) * 2;
        const wave4 = Math.sin(phase + 3) * 2;
        
        const path = `M0 0 
            Q10 ${wave1} 20 ${wave2 * 0.5} 
            Q30 ${wave2} 40 ${wave3 * 0.5} 
            Q50 ${wave3} 60 ${wave4 * 0.3} 
            L60 20 
            Q50 ${20 - wave3} 40 ${20 - wave3 * 0.5} 
            Q30 ${20 - wave2} 20 ${20 - wave2 * 0.5} 
            Q10 ${20 - wave1} 0 20 Z`;
        
        flagPath.setAttribute('d', path);
        requestAnimationFrame(animateFlag);
    }
    
    animateFlag();
}

/* ============================================
   PARALLAX EFFECT ON SCROLL FOR HERO
   ============================================ */
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroTitle = document.getElementById('heroTitle');
    
    if (heroTitle && scrolled < window.innerHeight) {
        const rate = scrolled * 0.2;
        const currentTransform = heroTitle.style.transform || '';
        // Only apply parallax if not in the first viewport
        if (scrolled > 100) {
            heroTitle.style.opacity = Math.max(0, 1 - scrolled / 500);
        }
    }
});

/* ============================================
   ADDITIONAL INTERACTIVE EFFECTS
   ============================================ */

// Add ripple effect on game cards
document.querySelectorAll('.game-card').forEach(card => {
    card.addEventListener('click', function(e) {
        const ripple = document.createElement('div');
        const rect = this.getBoundingClientRect();
        
        ripple.style.cssText = `
            position: absolute;
            width: 20px;
            height: 20px;
            background: rgba(0, 212, 255, 0.4);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
            left: ${e.clientX - rect.left}px;
            top: ${e.clientY - rect.top}px;
        `;
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation keyframes
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(20);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Console Easter Egg
console.log(`
%c██╗███████╗ █████╗  █████╗  ██████╗    ███████╗██╗  ██╗███████╗██╗  ██╗
%c██║██╔════╝██╔══██╗██╔══██╗██╔════╝    ██╔════╝██║  ██║██╔════╝██║ ██╔╝
%c██║███████╗███████║███████║██║         ███████╗███████║█████╗  █████╔╝ 
%c██║╚════██║██╔══██║██╔══██║██║         ╚════██║██╔══██║██╔══╝  ██╔═██╗ 
%c██║███████║██║  ██║██║  ██║╚██████╗    ███████║██║  ██║███████╗██║  ██╗
%c╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝    ╚══════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝

%cWelcome to my portfolio!
%cBuilt with passion in the neon-lit digital frontier.
`, 
'color: #00d4ff', 
'color: #00d4ff', 
'color: #0077ff', 
'color: #0077ff', 
'color: #00d4ff', 
'color: #00d4ff',
'color: #ff9500; font-size: 14px',
'color: #a0a0b0; font-style: italic'
);
