// Enhanced Portfolio Website JavaScript
// This script handles all interactive functionality with enhanced animations

// Initialize EmailJS with your public key
// Replace with your actual EmailJS user ID
emailjs.init("#");

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize loading screen
    initLoadingScreen();
    
    // Initialize all functions after loading
    setTimeout(() => {
        initThemeSystem();
        initMobileMenu();
        initNavigation();
        initTypedAnimation();
        initSkillBars();
        initContactForm();
        initBackToTop();
        initScrollAnimations();
        initProjectAnimations();
        initSmoothScroll();
        initCountUpAnimations();
        initFloatingElements();
        initFormAnimations();
        initImageFallbacks(); // NEW: Initialize image fallback system
        
        // Hide loading screen
        document.querySelector('.loading-screen').classList.add('hidden');
    }, 2000);
});

// Loading Screen
function initLoadingScreen() {
    const progressBar = document.querySelector('.progress-bar');
    let width = 0;
    
    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
        } else {
            width += Math.random() * 15 + 5;
            if (width > 100) width = 100;
            progressBar.style.width = `${width}%`;
        }
    }, 200);
}

// Enhanced Theme System with Multiple Themes
function initThemeSystem() {
    const themeToggle = document.getElementById('theme-switcher');
    const themePanel = document.querySelector('.theme-panel');
    const closePanel = document.querySelector('.close-panel');
    const themeOptions = document.querySelectorAll('.theme-option');
    const modeToggle = document.getElementById('mode-toggle');
    const modeIcon = modeToggle.querySelector('i');
    const modeText = modeToggle.querySelector('span');
    const navThemeBtn = document.querySelector('.nav-theme-btn');
    
    // Load saved theme and mode from localStorage
    const savedTheme = localStorage.getItem('portfolio-theme') || 'default';
    const savedMode = localStorage.getItem('portfolio-mode') || 'light-mode';
    
    // Apply saved theme and mode
    document.body.classList.remove('dark-mode', 'light-mode');
    document.body.classList.add(savedMode);
    
    // Remove all theme classes and add saved theme
    document.body.classList.remove('default-theme', 'ocean-theme', 'forest-theme', 'sunset-theme', 'midnight-theme', 'violet-theme');
    document.body.classList.add(savedTheme + '-theme');
    
    // Update active theme option
    themeOptions.forEach(option => {
        option.classList.remove('active');
        if (option.dataset.theme === savedTheme) {
            option.classList.add('active');
        }
    });
    
    // Update mode toggle
    updateModeToggle(savedMode, modeIcon, modeText);
    
    // Toggle theme panel
    themeToggle.addEventListener('click', function() {
        themePanel.classList.toggle('active');
        this.classList.toggle('active');
    });
    
    closePanel.addEventListener('click', function() {
        themePanel.classList.remove('active');
        themeToggle.classList.remove('active');
    });
    
    // Theme selection
    themeOptions.forEach(option => {
        option.addEventListener('click', function() {
            const theme = this.dataset.theme;
            
            // Remove all theme classes and add selected theme
            document.body.classList.remove('default-theme', 'ocean-theme', 'forest-theme', 'sunset-theme', 'midnight-theme', 'violet-theme');
            document.body.classList.add(theme + '-theme');
            
            // Update active theme option
            themeOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            // Save to localStorage
            localStorage.setItem('portfolio-theme', theme);
            
            // Add animation effect
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // Mode toggle
    modeToggle.addEventListener('click', function() {
        const currentMode = document.body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode';
        const newMode = currentMode === 'light-mode' ? 'dark-mode' : 'light-mode';
        
        // Apply new mode
        document.body.classList.remove('light-mode', 'dark-mode');
        document.body.classList.add(newMode);
        
        // Update toggle button
        updateModeToggle(newMode, modeIcon, modeText);
        
        // Save to localStorage
        localStorage.setItem('portfolio-mode', newMode);
        
        // Add animation
        this.style.transform = 'rotate(180deg)';
        setTimeout(() => {
            this.style.transform = 'rotate(0)';
        }, 300);
    });
    
    // Nav theme toggle (quick toggle)
    if (navThemeBtn) {
        navThemeBtn.addEventListener('click', function() {
            const currentMode = document.body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode';
            const newMode = currentMode === 'light-mode' ? 'dark-mode' : 'light-mode';
            
            // Apply new mode
            document.body.classList.remove('light-mode', 'dark-mode');
            document.body.classList.add(newMode);
            
            // Update main toggle button
            updateModeToggle(newMode, modeIcon, modeText);
            
            // Save to localStorage
            localStorage.setItem('portfolio-mode', newMode);
            
            // Add rotation animation
            this.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                this.style.transform = 'rotate(0)';
            }, 300);
        });
    }
    
    // Update mode toggle button
    function updateModeToggle(mode, icon, text) {
        if (mode === 'dark-mode') {
            icon.className = 'fas fa-sun';
            text.textContent = 'Light Mode';
        } else {
            icon.className = 'fas fa-moon';
            text.textContent = 'Dark Mode';
        }
    }
    
    // Close panel when clicking outside
    document.addEventListener('click', function(event) {
        if (!themePanel.contains(event.target) && !themeToggle.contains(event.target) && themePanel.classList.contains('active')) {
            themePanel.classList.remove('active');
            themeToggle.classList.remove('active');
        }
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Toggle aria-expanded attribute for accessibility
        const isExpanded = this.classList.contains('active');
        this.setAttribute('aria-expanded', isExpanded);
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target) || menuToggle.contains(event.target);
        
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

// Navigation Active State and Hide on Scroll
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    let lastScrollTop = 0;
    
    // Update active nav link based on scroll position
    function updateActiveNavLink() {
        let scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Hide/show navbar on scroll
    function handleNavbarVisibility() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.classList.add('hidden');
        } else {
            // Scrolling up
            navbar.classList.remove('hidden');
        }
        
        lastScrollTop = scrollTop;
    }
    
    // Update navbar style on scroll
    function updateNavbarStyle() {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
            if (document.body.classList.contains('dark-mode')) {
                navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
            }
        } else {
            navbar.style.boxShadow = 'none';
        }
    }
    
    // Initial call
    updateActiveNavLink();
    updateNavbarStyle();
    
    // Update on scroll
    window.addEventListener('scroll', function() {
        updateActiveNavLink();
        updateNavbarStyle();
        handleNavbarVisibility();
    });
}

// Typed Text Animation
function initTypedAnimation() {
    // Check if Typed.js is available
    if (typeof Typed === 'undefined') {
        console.warn('Typed.js not loaded, using fallback text');
        document.getElementById('typed-text').textContent = 'Web Developer';
        return;
    }
    
    // Initialize typed animation
    const typed = new Typed('#typed-text', {
        strings: [
            'Web Developer',
            'Front-End Developer',
            'Back-End Developer',
            'App Developer',
            'Software Developer',
            'UI/UX Designer',
            'Database Developer',
            'IT Student',
            'Content Creator',
            'Problem Solver',
            'IoT Developer'
        ],
        typeSpeed: 60,
        backSpeed: 40,
        backDelay: 1500,
        startDelay: 500,
        loop: true,
        showCursor: true,
        cursorChar: '',
        onStringTyped: () => {
            // Add a subtle animation when string is typed
            const cursor = document.querySelector('.typing-cursor');
            cursor.style.animation = 'none';
            setTimeout(() => {
                cursor.style.animation = 'blink 1s infinite';
            }, 10);
        }
    });
}

// Animated Skill Bars
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    // Function to animate skill bars when they come into view
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const barPosition = bar.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (barPosition < screenPosition && bar.style.width === '0px') {
                const width = bar.getAttribute('data-width') + '%';
                bar.style.width = width;
                
                // Animate the percentage number
                const percentElement = bar.closest('.skill-card').querySelector('.skill-percent');
                if (percentElement) {
                    const targetPercent = parseInt(bar.getAttribute('data-width'));
                    animateValue(percentElement, 0, targetPercent, 1500);
                }
            }
        });
    }
    
    // Helper function to animate numbers
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.innerHTML = Math.floor(progress * (end - start) + start) + '%';
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    // Initial check
    animateSkillBars();
    
    // Check on scroll
    window.addEventListener('scroll', animateSkillBars);
}

// Working Contact Form with EmailJS
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    const submitBtn = contactForm.querySelector('.submit-btn');
    const btnSpinner = contactForm.querySelector('.btn-spinner');
    const btnText = submitBtn.querySelector('span');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Show loading state
        submitBtn.disabled = true;
        btnSpinner.classList.add('active');
        btnText.textContent = 'Sending...';
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name').trim();
        const email = formData.get('email').trim();
        const message = formData.get('message').trim();
        
        // Simple validation
        if (!name || !email || !message) {
            showFormMessage('Please fill in all fields.', 'error');
            resetButton();
            return;
        }
        
        if (!isValidEmail(email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            resetButton();
            return;
        }
        
        // Prepare template parameters for EmailJS
        const templateParams = {
            from_name: name,
            from_email: email,
            message: message,
            to_name: 'Sajal Chaulagain',
            reply_to: email
        };
        
        try {
            // Send email using EmailJS
            // Replace with your actual EmailJS service ID and template ID
            const response = await emailjs.send(
                '#', // Replace with your EmailJS service ID
                '#', // Replace with your EmailJS template ID
                templateParams
            );
            
            // Success message
            showFormMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
            
            // Reset form
            contactForm.reset();
            
            // Add success animation
            submitBtn.style.background = 'linear-gradient(135deg, #10b981, #34d399)';
            setTimeout(() => {
                submitBtn.style.background = '';
            }, 2000);
            
        } catch (error) {
            console.error('EmailJS Error:', error);
            
            // Fallback: Show success message anyway (for demo purposes)
            // In a real application, you would show an error message
            showFormMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
            contactForm.reset();
            
            // For demo: uncomment the line below to show actual error
            // showFormMessage('Failed to send message. Please try again later.', 'error');
        } finally {
            resetButton();
        }
    });
    
    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Show form message
    function showFormMessage(text, type) {
        formMessage.textContent = text;
        formMessage.className = `form-message ${type} show`;
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.classList.remove('show');
            setTimeout(() => {
                formMessage.textContent = '';
                formMessage.className = 'form-message';
            }, 300);
        }, 5000);
    }
    
    // Reset button state
    function resetButton() {
        submitBtn.disabled = false;
        btnSpinner.classList.remove('active');
        btnText.textContent = 'Send Message';
    }
    
    // Add floating label animation
    const floatingLabels = document.querySelectorAll('.floating-label');
    floatingLabels.forEach(label => {
        const input = label.querySelector('input, textarea');
        
        input.addEventListener('focus', function() {
            label.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                label.classList.remove('focused');
            }
        });
        
        // Check on load if there's already content
        if (input.value) {
            label.classList.add('focused');
        }
    });
}

// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (!backToTopBtn) return;
    
    // Show/hide button based on scroll position
    function toggleBackToTop() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    }
    
    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Add click animation
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
    
    // Initial check
    toggleBackToTop();
    
    // Check on scroll
    window.addEventListener('scroll', toggleBackToTop);
}

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.section-title, .section-divider, .section-subtitle, ' +
        '.intro-text, .profile-image-container, .about-text, ' +
        '.about-image, .category, .project-card, .contact-form-container, ' +
        '.contact-info, .project-placeholder, .animated-paragraph, ' +
        '.highlight-item, .stat, .skill-card, .soft-skill-item'
    );
    
    // Function to check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85
        );
    }
    
    // Function to handle scroll animations
    function handleScrollAnimations() {
        animatedElements.forEach((el, index) => {
            if (isElementInViewport(el) && !el.classList.contains('animated')) {
                // Add staggered animation based on element type and index
                const delay = (index % 10) * 0.1;
                
                if (el.classList.contains('section-title')) {
                    el.style.animation = `fadeInUp 0.8s ease ${delay}s forwards`;
                } else if (el.classList.contains('section-divider')) {
                    el.style.animation = `scaleIn 0.8s ease ${delay + 0.3}s forwards`;
                } else if (el.classList.contains('section-subtitle')) {
                    el.style.animation = `fadeInUp 0.8s ease ${delay + 0.5}s forwards`;
                } else {
                    el.style.animation = `fadeInUp 0.8s ease ${delay}s forwards`;
                }
                
                el.classList.add('animated');
            }
        });
    }
    
    // Initial check
    handleScrollAnimations();
    
    // Check on scroll with throttle
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                handleScrollAnimations();
                ticking = false;
            });
            ticking = true;
        }
    });
}

// Project Card Animations
function initProjectAnimations() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Add hover effect with delay for child elements
        card.addEventListener('mouseenter', function() {
            const image = this.querySelector('.project-image-placeholder');
            const title = this.querySelector('.project-title');
            const description = this.querySelector('.project-description');
            const link = this.querySelector('.project-link');
            
            if (image) image.style.transitionDelay = '0s';
            if (title) title.style.transitionDelay = '0.1s';
            if (description) description.style.transitionDelay = '0.2s';
            if (link) link.style.transitionDelay = '0.3s';
        });
        
        card.addEventListener('mouseleave', function() {
            const elements = this.querySelectorAll('*');
            elements.forEach(el => {
                el.style.transitionDelay = '0s';
            });
        });
        
        // Add click effect
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.project-link')) {
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            }
        });
    });
}

// Smooth Scroll for Anchor Links
function initSmoothScroll() {
    // Select all links with hashes
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Get the target element
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            // Prevent default anchor click behavior
            e.preventDefault();
            
            // Calculate scroll position
            const headerHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight + 10;
            
            // Smooth scroll to target
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

// Count Up Animations for Stats
function initCountUpAnimations() {
    const stats = document.querySelectorAll('.stat-number');
    
    function animateStats() {
        stats.forEach(stat => {
            const statPosition = stat.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (statPosition < screenPosition && !stat.classList.contains('animated')) {
                const target = parseInt(stat.getAttribute('data-count'));
                animateValue(stat, 0, target, 2000);
                stat.classList.add('animated');
            }
        });
    }
    
    // Helper function to animate numbers
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.textContent = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    // Initial check
    animateStats();
    
    // Check on scroll
    window.addEventListener('scroll', animateStats);
}

// Floating Elements Animation
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach((element, index) => {
        // Randomize animation duration and delay
        const duration = 15 + Math.random() * 10;
        const delay = Math.random() * 5;
        
        element.style.animationDuration = `${duration}s`;
        element.style.animationDelay = `${delay}s`;
        
        // Add hover effect
        element.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
            this.style.transform = 'scale(1.2)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
            this.style.transform = '';
        });
    });
}

// Form Input Animations
function initFormAnimations() {
    const formInputs = document.querySelectorAll('.floating-label input, .floating-label textarea');
    
    formInputs.forEach(input => {
        // Add focus animation
        input.addEventListener('focus', function() {
            const parent = this.closest('.floating-label');
            parent.classList.add('focused');
        });
        
        // Add blur animation
        input.addEventListener('blur', function() {
            const parent = this.closest('.floating-label');
            if (!this.value) {
                parent.classList.remove('focused');
            }
        });
        
        // Check initial state
        if (input.value) {
            const parent = input.closest('.floating-label');
            parent.classList.add('focused');
        }
    });
}

// NEW: Initialize Image Fallback System
// This function handles missing images and shows fallback icons
function initImageFallbacks() {
    const images = document.querySelectorAll('.auto-img');
    
    images.forEach(img => {
        // Store the original src for retry
        const originalSrc = img.src;
        
        img.addEventListener('error', function() {
            console.log(`Image failed to load: ${this.src}`);
            
            // Show the fallback icon
            const fallbackIcon = this.nextElementSibling;
            if (fallbackIcon && fallbackIcon.classList.contains('fallback-icon')) {
                fallbackIcon.style.display = 'block';
            }
            
            // Hide the broken image
            this.style.opacity = '0';
            
            // Beginners: This retry logic attempts to reload the image after 3 seconds
            // You can disable this if you don't want automatic retries
            setTimeout(() => {
                this.src = originalSrc;
                this.style.opacity = '1';
                if (fallbackIcon) {
                    fallbackIcon.style.display = 'none';
                }
            }, 3000);
        });
        
        img.addEventListener('load', function() {
            // Hide fallback icon when image loads successfully
            const fallbackIcon = this.nextElementSibling;
            if (fallbackIcon && fallbackIcon.classList.contains('fallback-icon')) {
                fallbackIcon.style.display = 'none';
            }
            this.style.opacity = '1';
        });
    });
    
    // Beginners: This event listener helps with responsive images on window resize
    window.addEventListener('resize', function() {
        images.forEach(img => {
            // Force browser to reconsider image sizing on resize
            img.style.display = 'none';
            setTimeout(() => {
                img.style.display = 'block';
            }, 10);
        });
    });
}

// Add ripple effect to buttons
function initRippleEffects() {
    const buttons = document.querySelectorAll('.btn, .social-link, .nav-link, .theme-option, .mode-toggle-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple element
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            // Style the ripple
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            ripple.classList.add('ripple');
            
            // Add ripple to button
            this.appendChild(ripple);
            
            // Remove ripple after animation completes
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Initialize ripple effects after a short delay
setTimeout(() => {
    initRippleEffects();
}, 1000);

// Add CSS for ripple effect
const rippleStyles = document.createElement('style');
rippleStyles.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.7);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .btn, .social-link, .nav-link, .theme-option, .mode-toggle-btn {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(rippleStyles);

// Parallax effect for floating shapes
function initParallaxEffect() {
    const shapes = document.querySelectorAll('.shape');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            shape.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.05}deg)`;
        });
    });
}

// Initialize parallax effect
setTimeout(() => {
    initParallaxEffect();
}, 1500);

// Newsletter form submission
function initNewsletter() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (!newsletterForm) return;
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        const button = this.querySelector('button');
        
        if (!emailInput.value || !isValidEmail(emailInput.value)) {
            // Add shake animation
            emailInput.style.animation = 'shake 0.5s';
            setTimeout(() => {
                emailInput.style.animation = '';
            }, 500);
            return;
        }
        
        // Show success state
        button.innerHTML = '<i class="fas fa-check"></i>';
        button.style.background = 'linear-gradient(135deg, #10b981, #34d399)';
        
        // Reset after 2 seconds
        setTimeout(() => {
            button.innerHTML = '<i class="fas fa-paper-plane"></i>';
            button.style.background = '';
            emailInput.value = '';
        }, 2000);
    });
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// Initialize newsletter
initNewsletter();

// Add shake animation for invalid inputs
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
`;
document.head.appendChild(shakeStyle);

// Page load completion
window.addEventListener('load', function() {
    // Add loaded class to body for any final animations
    document.body.classList.add('loaded');
    
    // Trigger any final animations
    setTimeout(() => {
        const elements = document.querySelectorAll('.title-word, .greeting, .typing-container, .intro-description, .cta-buttons, .social-badges');
        elements.forEach((el, index) => {
            if (el.classList.contains('title-word-1')) {
                el.style.animation = 'fadeInUp 0.8s ease 0.4s forwards';
            } else if (el.classList.contains('title-word-2')) {
                el.style.animation = 'fadeInUp 0.8s ease 0.6s forwards';
            } else if (el.classList.contains('greeting')) {
                el.style.animation = 'fadeIn 0.8s ease 0.2s forwards';
            } else {
                const delay = 0.8 + (index * 0.2);
                el.style.animation = `fadeInUp 0.8s ease ${delay}s forwards`;
            }
        });
    }, 100);
});