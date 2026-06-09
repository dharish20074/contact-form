/* ========================================
   CONTACTPRO - ENHANCED JAVASCRIPT
   ======================================== */

// ========================================
// THEME MANAGEMENT
// ========================================

class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || this.getSystemTheme();
        this.themeToggle = document.getElementById('themeToggle');
        this.init();
    }

    getSystemTheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    init() {
        this.applyTheme(this.theme);
        this.themeToggle.addEventListener('click', () => this.toggle());
        
        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            this.theme = e.matches ? 'dark' : 'light';
            this.applyTheme(this.theme);
        });
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }

    toggle() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        this.applyTheme(this.theme);
    }
}

// Initialize theme on page load
const themeManager = new ThemeManager();

// ========================================
// PARTICLES BACKGROUND
// ========================================

class ParticlesBackground {
    constructor() {
        this.container = document.getElementById('particlesContainer');
        this.particleCount = window.innerWidth > 768 ? 50 : 20;
        this.init();
        window.addEventListener('resize', () => this.adjustParticles());
    }

    init() {
        this.createParticles();
    }

    createParticles() {
        this.container.innerHTML = '';
        for (let i = 0; i < this.particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const size = Math.random() * 3 + 2;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.setProperty('--delay', Math.random() * 20 + 's');
            
            this.container.appendChild(particle);
        }
    }

    adjustParticles() {
        const newCount = window.innerWidth > 768 ? 50 : 20;
        if (newCount !== this.particleCount) {
            this.particleCount = newCount;
            this.createParticles();
        }
    }
}

const particles = new ParticlesBackground();

// ========================================
// NAVIGATION
// ========================================

class Navigation {
    constructor() {
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.init();
    }

    init() {
        // Hamburger menu toggle
        this.hamburger.addEventListener('click', () => this.toggleMenu());
        
        // Close menu on link click
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMenu();
                this.updateActiveLink(link);
            });
        });

        // Update active link on scroll
        window.addEventListener('scroll', () => this.updateActiveOnScroll());
    }

    toggleMenu() {
        this.navMenu.classList.toggle('active');
        this.hamburger.classList.toggle('active');
    }

    closeMenu() {
        this.navMenu.classList.remove('active');
        this.hamburger.classList.remove('active');
    }

    updateActiveLink(clickedLink) {
        this.navLinks.forEach(link => link.classList.remove('active'));
        clickedLink.classList.add('active');
    }

    updateActiveOnScroll() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    }
}

const navigation = new Navigation();

// ========================================
// TOAST NOTIFICATIONS
// ========================================

class ToastNotification {
    constructor() {
        this.container = document.getElementById('toastContainer');
    }

    show(message, type = 'info', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icons = {
            'success': '✓',
            'error': '✕',
            'info': 'ℹ'
        };

        toast.innerHTML = `
            <div class="toast-icon">${icons[type]}</div>
            <div class="toast-message">${message}</div>
        `;

        this.container.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }

    success(message, duration = 3000) {
        this.show(message, 'success', duration);
    }

    error(message, duration = 3000) {
        this.show(message, 'error', duration);
    }

    info(message, duration = 3000) {
        this.show(message, 'info', duration);
    }
}

const toast = new ToastNotification();

// ========================================
// SCROLL REVEAL ANIMATION
// ========================================

class ScrollReveal {
    constructor() {
        this.elements = document.querySelectorAll('[data-scroll]');
        this.init();
    }

    init() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    this.observer.unobserve(entry.target);
                }
            });
        }, this.observerOptions);

        this.elements.forEach(el => this.observer.observe(el));
    }
}

const scrollReveal = new ScrollReveal();

// ========================================
// FORM VALIDATION & SUBMISSION
// ========================================

class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.nameInput = document.getElementById('name');
        this.emailInput = document.getElementById('email');
        this.messageInput = document.getElementById('message');
        this.submitBtn = document.getElementById('submitBtn');
        this.successMessage = document.getElementById('successMessage');

        this.init();
    }

    init() {
        // Form submission
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));

        // Real-time validation
        this.nameInput.addEventListener('blur', () => this.validateName());
        this.nameInput.addEventListener('input', () => {
            if (this.nameInput.classList.contains('error')) {
                this.validateName();
            }
        });

        this.emailInput.addEventListener('blur', () => this.validateEmail());
        this.emailInput.addEventListener('input', () => {
            if (this.emailInput.classList.contains('error')) {
                this.validateEmail();
            }
        });

        this.messageInput.addEventListener('blur', () => this.validateMessage());
        this.messageInput.addEventListener('input', () => {
            if (this.messageInput.classList.contains('error')) {
                this.validateMessage();
            }
        });
    }

    validateName() {
        const name = this.nameInput.value.trim();
        const errorEl = document.getElementById('nameError');

        if (!name) {
            this.setError(this.nameInput, errorEl, 'Name is required');
            return false;
        }
        if (name.length < 2) {
            this.setError(this.nameInput, errorEl, 'Name must be at least 2 characters');
            return false;
        }
        if (name.length > 100) {
            this.setError(this.nameInput, errorEl, 'Name must not exceed 100 characters');
            return false;
        }

        this.clearError(this.nameInput, errorEl);
        return true;
    }

    validateEmail() {
        const email = this.emailInput.value.trim();
        const errorEl = document.getElementById('emailError');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) {
            this.setError(this.emailInput, errorEl, 'Email is required');
            return false;
        }
        if (!emailRegex.test(email)) {
            this.setError(this.emailInput, errorEl, 'Please enter a valid email');
            return false;
        }

        this.clearError(this.emailInput, errorEl);
        return true;
    }

    validateMessage() {
        const message = this.messageInput.value.trim();
        const errorEl = document.getElementById('messageError');

        if (!message) {
            this.setError(this.messageInput, errorEl, 'Message is required');
            return false;
        }
        if (message.length < 10) {
            this.setError(this.messageInput, errorEl, 'Message must be at least 10 characters');
            return false;
        }
        if (message.length > 5000) {
            this.setError(this.messageInput, errorEl, 'Message must not exceed 5000 characters');
            return false;
        }

        this.clearError(this.messageInput, errorEl);
        return true;
    }

    validateForm() {
        return this.validateName() && this.validateEmail() && this.validateMessage();
    }

    setError(input, errorEl, message) {
        input.classList.add('error');
        errorEl.textContent = message;
        errorEl.classList.add('show');
    }

    clearError(input, errorEl) {
        input.classList.remove('error');
        errorEl.textContent = '';
        errorEl.classList.remove('show');
    }

    async handleSubmit(e) {
        e.preventDefault();

        // Validate form
        if (!this.validateForm()) {
            toast.error('Please fix the errors above');
            return;
        }

        // Show loading state
        this.submitBtn.classList.add('loading');
        this.submitBtn.disabled = true;

        try {
            // Prepare data
            const formData = {
                name: this.nameInput.value.trim(),
                email: this.emailInput.value.trim(),
                message: this.messageInput.value.trim()
            };

            // Send to backend
            const response = await fetch('/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                // Show success message
                this.form.style.display = 'none';
                this.successMessage.classList.add('show');
                toast.success('Message sent successfully!');
                console.log('✓ Message sent:', formData);
            } else {
                toast.error(data.message || 'Failed to send message');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Network error. Please try again.');
        } finally {
            this.submitBtn.classList.remove('loading');
            this.submitBtn.disabled = false;
        }
    }
}

const contactForm = new ContactForm();

// ========================================
// RESET FORM FUNCTION
// ========================================

function resetForm() {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');

    form.reset();
    form.style.display = 'flex';
    successMessage.classList.remove('show');
    
    // Clear all errors
    document.querySelectorAll('.error-message').forEach(el => {
        el.classList.remove('show');
    });
    document.querySelectorAll('.form-group input, .form-group textarea').forEach(el => {
        el.classList.remove('error');
    });

    // Focus on name field
    document.getElementById('name').focus();
    
    // Scroll to form
    document.querySelector('.contact-form-wrapper').scrollIntoView({ behavior: 'smooth' });
    
    toast.success('Form reset. Ready to send another message!');
}

// ========================================
// SMOOTH SCROLL
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ========================================
// PAGE LOAD INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('💌 ContactPro - Modern Contact Solution');
    console.log('✓ Ready to receive messages at: http://localhost:8080/contact');
    
    // Add fade-in animation to body
    document.body.style.animation = 'fadeIn 0.3s ease-in';
});

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.src = entry.target.dataset.src;
                imageObserver.unobserve(entry.target);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ========================================
// ERROR HANDLING
// ========================================

window.addEventListener('error', (e) => {
    console.error('Unexpected error:', e);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});

// ========================================
// UTILITY: Animate buttons on hover
// ========================================

document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
    });
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ========================================
// KEYBOARD SHORTCUTS
// ========================================

document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Shift + M: Toggle theme
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'M') {
        e.preventDefault();
        themeManager.toggle();
    }

    // Ctrl/Cmd + Enter: Submit form
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        const submitBtn = document.getElementById('submitBtn');
        if (submitBtn && !submitBtn.disabled) {
            document.getElementById('contactForm').dispatchEvent(new Event('submit'));
        }
    }
});

// ========================================
// ACCESSIBILITY IMPROVEMENTS
// ========================================

// Focus visible polyfill
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// Announce to screen readers
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.textContent = message;
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    document.body.appendChild(announcement);

    setTimeout(() => announcement.remove(), 5000);
}

// ========================================
// ANALYTICS (Optional)
// ========================================

function trackEvent(eventName, data = {}) {
    console.log(`📊 Event: ${eventName}`, data);
    // You can integrate with Google Analytics, Mixpanel, etc. here
}

// Track form interactions
document.getElementById('name')?.addEventListener('change', () => {
    trackEvent('form_name_entered');
});

document.getElementById('email')?.addEventListener('change', () => {
    trackEvent('form_email_entered');
});

document.getElementById('message')?.addEventListener('change', () => {
    trackEvent('form_message_entered');
});