/* ============================================
   ISAAC SHEK - Cyberpunk Portfolio
   Interactive JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initGlowCircles();
    initNavbar();
    initScrollAnimations();
    initTypingEffect();
});

/* ============================================
   INTERACTIVE GLOW CIRCLES
   Circles react to mouse movement
   ============================================ */
function initGlowCircles() {
    const glowCircles = document.querySelectorAll('.glow-circle');
    const container = document.getElementById('glowContainer');
    
    // Store original positions and sizes
    const circleData = [];
    glowCircles.forEach((circle, index) => {
        const rect = circle.getBoundingClientRect();
        circleData.push({
            element: circle,
            originalX: rect.left + rect.width / 2,
            originalY: rect.top + rect.height / 2,
            originalSize: rect.width,
            speed: parseFloat(circle.dataset.speed) || 0.05,
            currentX: 0,
            currentY: 0,
            currentScale: 1
        });
    });

    // Mouse move handler
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let targetX = mouseX;
    let targetY = mouseY;

    document.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
    });

    // Animation loop for smooth movement
    function animateGlowCircles() {
        // Smooth interpolation for mouse position
        mouseX += (targetX - mouseX) * 0.1;
        mouseY += (targetY - mouseY) * 0.1;

        glowCircles.forEach((circle, index) => {
            const data = circleData[index];
            const rect = circle.getBoundingClientRect();
            const circleCenterX = rect.left + rect.width / 2;
            const circleCenterY = rect.top + rect.height / 2;

            // Calculate distance from mouse
            const deltaX = mouseX - circleCenterX;
            const deltaY = mouseY - circleCenterY;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

            // Circles move away from mouse (repel effect)
            const maxDistance = 400;
            const influence = Math.max(0, 1 - distance / maxDistance);
            
            // Calculate repel direction (opposite of mouse direction)
            const repelX = -deltaX * influence * data.speed * 5;
            const repelY = -deltaY * influence * data.speed * 5;

            // Size change based on proximity (grow when mouse is close)
            const targetScale = 1 + influence * 0.3;
            data.currentScale += (targetScale - data.currentScale) * 0.1;

            // Smooth movement
            data.currentX += (repelX - data.currentX) * 0.08;
            data.currentY += (repelY - data.currentY) * 0.08;

            // Apply transforms
            circle.style.transform = `translate(${data.currentX}px, ${data.currentY}px) scale(${data.currentScale})`;
            
            // Adjust opacity based on scale
            circle.style.opacity = 0.4 + influence * 0.4;
        });

        requestAnimationFrame(animateGlowCircles);
    }

    animateGlowCircles();

    // Add floating animation
    glowCircles.forEach((circle, index) => {
        const delay = index * 0.5;
        const duration = 4 + Math.random() * 2;
        circle.style.animation = `floatGlow ${duration}s ease-in-out ${delay}s infinite`;
    });

    // Add keyframes for floating
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatGlow {
            0%, 100% { 
                margin-top: 0; 
            }
            50% { 
                margin-top: -20px; 
            }
        }
    `;
    document.head.appendChild(style);
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
   Games slide in from left/right
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
   PARALLAX EFFECT ON SCROLL
   ============================================ */
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroTitle = document.querySelector('.hero-title');
    
    if (heroTitle) {
        const rate = scrolled * 0.3;
        heroTitle.style.transform = `translateY(${rate}px)`;
        heroTitle.style.opacity = 1 - scrolled / 600;
    }
});

/* ============================================
   ADDITIONAL INTERACTIVE EFFECTS
   ============================================ */

// Add sparkle effect on hero title hover
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    heroTitle.addEventListener('mouseenter', () => {
        heroTitle.style.animation = 'none';
        setTimeout(() => {
            heroTitle.style.animation = '';
        }, 10);
    });
}

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

%cWelcome to my portfolio! 🚀
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
