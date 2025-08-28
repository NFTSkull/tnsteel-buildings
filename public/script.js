// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded');
    
    // Initialize all functionality
    initializeHeader();
    initializeMobileMenu();
    initializeReviewSlider();
    initializeGallery();
    initializeModal();
    initializeForm();
    initializeLazyLoading();
    initializeSmoothScrolling();
    initializeAnimations();
    initializeLightbox(); // Initialize lightbox for all galleries
    
    // Initialize RTO Calculator with delay to ensure all elements are ready
    setTimeout(() => {
        initializeRTOCalculator();
    }, 100);
    
    // Initialize commercial product carousel
    initializeCommercialCarousel();
});

// Header Scroll Behavior
function initializeHeader() {
    const header = document.getElementById('header-principal') || document.getElementById('header');
    let lastScrollTop = 0;
    
    if (header) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Add/remove scrolled class based on scroll position
            if (scrollTop > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Hide/show header on scroll
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });
    }
}

// ===== HEADER RESPONSIVE Y MENÚ MÓVIL OPTIMIZADO =====

// ===== MOBILE MENU - SIMPLE Y FUNCIONAL =====

function initializeMobileMenu() {
    const toggleButton = document.querySelector('.mobile-menu-toggle');
    const drawer = document.getElementById('mobile-drawer');
    const overlay = document.getElementById('mobile-drawer-overlay');
    const closeButton = document.querySelector('.mobile-drawer-close');
    
    if (!toggleButton || !drawer || !overlay) {
        return;
    }
    
    // Toggle drawer function
    const toggleDrawer = (open) => {
        if (open) {
            // Open drawer
            toggleButton.setAttribute('aria-expanded', 'true');
            drawer.classList.add('open');
            overlay.classList.add('open');
            document.body.style.overflow = 'hidden';
        } else {
            // Close drawer
            toggleButton.setAttribute('aria-expanded', 'false');
            drawer.classList.remove('open');
            overlay.classList.remove('open');
            document.body.style.overflow = '';
        }
    };
    
    // Event listeners
    toggleButton.addEventListener('click', () => {
        const isOpen = toggleButton.getAttribute('aria-expanded') === 'true';
        toggleDrawer(!isOpen);
    });
    
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            toggleDrawer(false);
        });
    }
    
    // Close drawer when clicking overlay
    overlay.addEventListener('click', () => {
        toggleDrawer(false);
    });
    
    // Close drawer when pressing Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            toggleDrawer(false);
        }
    });
    
    // Close drawer when clicking on links
    const drawerLinks = drawer.querySelectorAll('a');
    drawerLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggleDrawer(false);
        });
    });


}

// Review Slider
function initializeReviewSlider() {
    const slider = document.getElementById('reviewsSlider');
    const slides = document.querySelectorAll('.review-slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dots = document.querySelectorAll('.dot');
    
    if (!slider || slides.length === 0) return;
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Show current slide
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentSlide = index;
    }
    
    function nextSlide() {
        const next = (currentSlide + 1) % totalSlides;
        showSlide(next);
    }
    
    function prevSlide() {
        const prev = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(prev);
    }
    
    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showSlide(index);
        });
    });
    
    // Auto-slide functionality
    setInterval(nextSlide, 5000);
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });
}

// Gallery Filtering and Modal
function initializeGallery() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const galleryGrid = document.querySelector('.gallery-grid');
    
    if (!galleryGrid || filterBtns.length === 0) return;
    
    // Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active filter button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Gallery item click handlers for modal
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const overlay = this.querySelector('.gallery-overlay');
            
            if (img) {
                openModal(img.src, overlay ? overlay.querySelector('h4').textContent : '');
            }
        });
    });
}

// Modal Functionality
function initializeModal() {
    const modal = document.getElementById('galleryModal');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const closeBtn = document.getElementById('modalClose');
    
    if (!modal) return;
    
    // Close modal function
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Close modal event listeners
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
    
    // Global function to open modal
    window.openModal = function(imageSrc, caption) {
        if (modalImage && modalCaption) {
            modalImage.src = imageSrc;
            modalCaption.textContent = caption;
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    };
}

// Form Handling
function initializeForm() {
    const form = document.getElementById('quoteForm');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = {};
        
        formData.forEach((value, key) => {
            data[key] = value;
        });
        
        // Validate form
        if (validateForm(data)) {
            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                showNotification('Thank you! Your quote request has been submitted. We\'ll contact you soon.', 'success');
                form.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        }
    });
    
    // Real-time form validation
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
}

// Form Validation Functions
function validateForm(data) {
    let isValid = true;
    const form = document.getElementById('quoteForm');
    
    // Clear previous errors
    form.querySelectorAll('.error').forEach(error => error.remove());
    
    // Name validation
    if (!data.name || data.name.trim().length < 2) {
        showFieldError(form.querySelector('[name="name"]'), 'Please enter a valid name');
        isValid = false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        showFieldError(form.querySelector('[name="email"]'), 'Please enter a valid email address');
        isValid = false;
    }
    
    // Location validation
    if (!data.location || data.location.trim().length < 2) {
        showFieldError(form.querySelector('[name="location"]'), 'Please enter your location');
        isValid = false;
    }
    
    // Building type validation
    if (!data['building-type']) {
        showFieldError(form.querySelector('[name="building-type"]'), 'Please select a building type');
        isValid = false;
    }
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const name = field.name;
    
    clearFieldError(field);
    
    switch (name) {
        case 'name':
            if (value.length < 2) {
                showFieldError(field, 'Please enter a valid name');
                return false;
            }
            break;
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showFieldError(field, 'Please enter a valid email address');
                return false;
            }
            break;
        case 'location':
            if (value.length < 2) {
                showFieldError(field, 'Please enter your location');
                return false;
            }
            break;
        case 'building-type':
            if (!value) {
                showFieldError(field, 'Please select a building type');
                return false;
            }
            break;
    }
    
    return true;
}

function showFieldError(field, message) {
    clearFieldError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error';
    errorDiv.style.color = '#E10600';
    errorDiv.style.fontSize = '0.9rem';
    errorDiv.style.marginTop = '5px';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
    field.style.borderColor = '#E10600';
}

function clearFieldError(field) {
    const errorDiv = field.parentNode.querySelector('.error');
    if (errorDiv) {
        errorDiv.remove();
    }
    field.style.borderColor = 'rgba(255, 255, 255, 0.3)';
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Styling
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#E10600' : '#333'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 10000;
        max-width: 300px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Hide notification after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Lazy Loading for Images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            img.classList.add('loaded');
        });
    }
}

// Smooth Scrolling for Navigation Links
function initializeSmoothScrolling() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Calculate offset for fixed header (110px for two-line header)
                const headerHeight = 110;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const mobileMenu = document.querySelector('.nav-principal.active');
                const mobileToggle = document.querySelector('.mobile-menu-toggle.active');
                if (mobileMenu && mobileToggle) {
                    mobileMenu.classList.remove('active');
                    mobileToggle.classList.remove('active');
                    const spans = mobileToggle.querySelectorAll('span');
                    spans.forEach(span => span.classList.remove('active'));
                    document.body.style.overflow = 'auto';
                }
            }
        });
    });
}

// Initialize smooth scrolling when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeSmoothScrolling();
});

// Scroll Animations
function initializeAnimations() {
    const animatedElements = document.querySelectorAll('.feature-card, .building-card, .gallery-item, .rto-step');
    
    if ('IntersectionObserver' in window) {
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });
        
        animatedElements.forEach(element => {
            animationObserver.observe(element);
        });
    }
}

// Utility Functions
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
    }
}

// Performance Optimization
window.addEventListener('load', function() {
    console.log('Window fully loaded');
    
    // Remove loading classes
    document.body.classList.remove('loading');
    
    // Initialize any heavy operations after load
    initializeHeavyFeatures();
    
    // Ensure RTO Calculator is initialized
    setTimeout(() => {
        if (!window.rtoCalculatorInitialized) {
            console.log('Re-initializing RTO Calculator after window load');
            initializeRTOCalculator();
        }
    }, 200);
});

function initializeHeavyFeatures() {
    // Any heavy initialization that should happen after page load
    console.log('Website fully loaded and initialized');
}

// Error Handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // You could send this to an error tracking service
});

// Accessibility Improvements
function initializeAccessibility() {
    // Add keyboard navigation for custom elements
    const customButtons = document.querySelectorAll('.filter-btn, .slider-btn, .dot');
    
    customButtons.forEach(button => {
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', initializeAccessibility);

// Rent-to-Own Calculator - SIMPLIFIED VERSION
function initializeRTOCalculator() {
    console.log('=== INITIALIZING RTO CALCULATOR ===');
    
    // Building data
    const buildingData = {
        carport: [
            { size: '12x20', display: '12\' x 20\' - Single Car', price: 1495 },
            { size: '18x20', display: '18\' x 20\' - 1.5 Car', price: 1795 },
            { size: '20x20', display: '20\' x 20\' - Double Car', price: 1995 },
            { size: '24x24', display: '24\' x 24\' - Large Double', price: 2495 },
            { size: '30x20', display: '30\' x 20\' - Triple Car', price: 2995 },
            { size: '36x20', display: '36\' x 20\' - RV/Boat', price: 3495 },
            { size: '40x20', display: '40\' x 20\' - Commercial', price: 3995 }
        ],
        garage: [
            { size: '12x20', display: '12\' x 20\' - Single Car', price: 2995 },
            { size: '18x20', display: '18\' x 20\' - 1.5 Car', price: 3795 },
            { size: '20x20', display: '20\' x 20\' - Double Car', price: 4295 },
            { size: '24x24', display: '24\' x 24\' - Large Double', price: 5495 },
            { size: '30x20', display: '30\' x 20\' - Triple Car', price: 6495 },
            { size: '36x20', display: '36\' x 20\' - Workshop', price: 7995 },
            { size: '40x20', display: '40\' x 20\' - Commercial', price: 8995 }
        ],
        barn: [
            { size: '30x40', display: '30\' x 40\' - Small Barn', price: 7995 },
            { size: '36x40', display: '36\' x 40\' - Medium Barn', price: 9495 },
            { size: '40x60', display: '40\' x 60\' - Large Barn', price: 14995 },
            { size: '50x60', display: '50\' x 60\' - XL Barn', price: 18995 },
            { size: '60x80', display: '60\' x 80\' - Horse Barn', price: 28995 },
            { size: '60x100', display: '60\' x 100\' - Agricultural', price: 35995 },
            { size: '80x100', display: '80\' x 100\' - Commercial', price: 47995 }
        ],
        commercial: [
            { size: '40x60', display: '40\' x 60\' - Small Commercial', price: 19995 },
            { size: '50x80', display: '50\' x 80\' - Medium Commercial', price: 29995 },
            { size: '60x100', display: '60\' x 100\' - Large Commercial', price: 44995 },
            { size: '80x100', display: '80\' x 100\' - Warehouse', price: 59995 },
            { size: '100x120', display: '100\' x 120\' - Industrial', price: 89995 },
            { size: '120x150', display: '120\' x 150\' - Distribution', price: 134995 }
        ]
    };
    
    // Get elements
    const buildingTypeSelect = document.getElementById('building-type');
    const buildingSizeSelect = document.getElementById('building-size');
    const calculateBtn = document.getElementById('calculate-btn');
    const resultsDiv = document.getElementById('calculator-results');
    
    console.log('Found elements:', {
        buildingType: !!buildingTypeSelect,
        buildingSize: !!buildingSizeSelect,
        calculateBtn: !!calculateBtn,
        resultsDiv: !!resultsDiv
    });
    
    if (!buildingTypeSelect || !buildingSizeSelect || !calculateBtn || !resultsDiv) {
        console.error('Missing required elements!');
        return;
    }
    
    // Building type change handler
    buildingTypeSelect.onchange = function() {
        const selectedType = this.value;
        console.log('Building type selected:', selectedType);
        
        // Clear and reset building size
        buildingSizeSelect.innerHTML = '<option value="">Choose Size</option>';
        
        if (selectedType && buildingData[selectedType]) {
            // Enable building size select
            buildingSizeSelect.disabled = false;
            buildingSizeSelect.style.opacity = '1';
            
            // Add options
            buildingData[selectedType].forEach(item => {
                const option = document.createElement('option');
                option.value = item.size;
                option.textContent = item.display;
                option.dataset.price = item.price;
                buildingSizeSelect.appendChild(option);
            });
            
            console.log('Added', buildingData[selectedType].length, 'size options');
        } else {
            // Disable building size select
            buildingSizeSelect.disabled = true;
            buildingSizeSelect.style.opacity = '0.5';
            buildingSizeSelect.innerHTML = '<option value="">Select building type first</option>';
        }
        
        // Hide results
        resultsDiv.classList.remove('show');
    };
    
    // Calculate button handler
    calculateBtn.onclick = function() {
        console.log('=== CALCULATE BUTTON CLICKED ===');
        
        const buildingType = buildingTypeSelect.value;
        const buildingSize = buildingSizeSelect.value;
        const roofStyle = document.getElementById('roof-style').value;
        const termLength = parseInt(document.getElementById('term-length').value);
        const downPayment = parseFloat(document.getElementById('down-payment').value) || 0;
        
        console.log('Form values:', {
            buildingType,
            buildingSize,
            roofStyle,
            termLength,
            downPayment
        });
        
        // Validation
        if (!buildingType) {
            alert('Please select a building type');
            return;
        }
        
        if (!buildingSize) {
            alert('Please select a building size');
            return;
        }
        
        // Get base price
        const selectedOption = buildingSizeSelect.querySelector(`option[value="${buildingSize}"]`);
        if (!selectedOption) {
            alert('Invalid building size selected');
            return;
        }
        
        const basePrice = parseFloat(selectedOption.dataset.price);
        console.log('Base price:', basePrice);
        
        if (!basePrice || basePrice === 0) {
            alert('Please contact us for custom pricing on this size');
            return;
        }
        
        // Calculate costs
        const deliveryCost = Math.round(basePrice * 0.2 + 500); // 20% + $500 base
        const roofCost = roofStyle === 'vertical' ? 300 : 0;
        const totalCost = basePrice + deliveryCost + roofCost;
        const totalFinanced = Math.max(0, totalCost - downPayment);
        
        // Calculate monthly payment with RTO markup
        const rtoMultiplier = {
            12: 1.35,
            24: 1.55,
            36: 1.75,
            48: 1.95,
            60: 2.15
        };
        
        const totalRTOCost = totalFinanced * (rtoMultiplier[termLength] || 1.75);
        const monthlyPayment = totalRTOCost / termLength;
        
        // Update results
        document.getElementById('base-cost').textContent = `$${basePrice.toLocaleString()}`;
        document.getElementById('delivery-cost').textContent = `$${deliveryCost.toLocaleString()}`;
        document.getElementById('roof-cost').textContent = `$${roofCost.toLocaleString()}`;
        document.getElementById('down-payment-display').textContent = `$${downPayment.toLocaleString()}`;
        document.getElementById('total-financed').textContent = `$${Math.round(totalFinanced).toLocaleString()}`;
        document.getElementById('monthly-payment').textContent = `$${Math.round(monthlyPayment).toLocaleString()}`;
        document.getElementById('total-payments').textContent = `$${Math.round(totalRTOCost).toLocaleString()}`;
        
        // Show results
        resultsDiv.classList.add('show');
        
        // Scroll to results
        setTimeout(() => {
            resultsDiv.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }, 300);
        
        console.log('Results displayed successfully');
    };
    
    console.log('RTO Calculator initialized successfully');
    
    // Add global test function
    window.testRTOCalculator = function() {
        console.log('=== TESTING RTO CALCULATOR ===');
        console.log('Building type element:', document.getElementById('building-type'));
        console.log('Building size element:', document.getElementById('building-size'));
        console.log('Calculate button:', document.getElementById('calculate-btn'));
        console.log('Results div:', document.getElementById('calculator-results'));
        
        // Test building type change
        const buildingTypeSelect = document.getElementById('building-type');
        if (buildingTypeSelect) {
            buildingTypeSelect.value = 'garage';
            buildingTypeSelect.onchange();
        }
    };
}

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateForm,
        validateField,
        showNotification,
        debounce,
        throttle,
        initializeRTOCalculator
    };
} 

// Force video playback on mobile devices
function initializeMobileVideoPlayback() {
    const heroVideo = document.getElementById('heroVideo');
    
    if (heroVideo) {
        // Force play on mobile devices
        const playVideo = () => {
            heroVideo.play().catch(error => {
                console.log('Video autoplay failed:', error);
                // Try again with user interaction
                document.addEventListener('touchstart', () => {
                    heroVideo.play().catch(e => console.log('Video play failed:', e));
                }, { once: true });
            });
        };
        
        // Try to play immediately
        playVideo();
        
        // Also try on page load
        window.addEventListener('load', playVideo);
        
        // Try on user interaction
        document.addEventListener('touchstart', playVideo, { once: true });
        document.addEventListener('click', playVideo, { once: true });
        
        // Ensure video is muted and looping
        heroVideo.muted = true;
        heroVideo.loop = true;
        heroVideo.playsInline = true;
    }
}

// Initialize mobile video playback
initializeMobileVideoPlayback();

// Professional Carousel Functionality
function initializeProductCarousels() {
    const carousels = document.querySelectorAll('.carousel-container');
    
    carousels.forEach((carousel, carouselIndex) => {
        const track = carousel.querySelector('.carousel-track');
        const slides = carousel.querySelectorAll('.carousel-slide');
        const prevBtn = carousel.querySelector('.carousel-btn[data-direction="prev"]');
        const nextBtn = carousel.querySelector('.carousel-btn[data-direction="next"]');
        const indicators = carousel.querySelectorAll('.carousel-indicator');
        
        let currentSlide = 0;
        const totalSlides = slides.length;
        
        // Initialize indicators
        if (indicators.length > 0) {
            indicators[0].classList.add('active');
        }
        
        function updateCarousel() {
            const slideWidth = 100;
            const translateX = -currentSlide * slideWidth;
            track.style.transform = `translateX(${translateX}%)`;
            
            // Update indicators
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentSlide);
            });
            
            // Update button states
            if (prevBtn) prevBtn.disabled = currentSlide === 0;
            if (nextBtn) nextBtn.disabled = currentSlide === totalSlides - 1;
        }
        
        function goToSlide(index) {
            currentSlide = Math.max(0, Math.min(index, totalSlides - 1));
            updateCarousel();
        }
        
        function nextSlide() {
            if (currentSlide < totalSlides - 1) {
                currentSlide++;
                updateCarousel();
            }
        }
        
        function prevSlide() {
            if (currentSlide > 0) {
                currentSlide--;
                updateCarousel();
            }
        }
        
        // Event listeners
        if (prevBtn) {
            prevBtn.addEventListener('click', prevSlide);
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', nextSlide);
        }
        
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => goToSlide(index));
        });
        
        // Auto-play functionality
        let autoPlayInterval;
        
        function startAutoPlay() {
            autoPlayInterval = setInterval(() => {
                if (currentSlide < totalSlides - 1) {
                    nextSlide();
                } else {
                    goToSlide(0);
                }
            }, 5000); // Change slide every 5 seconds
        }
        
        function stopAutoPlay() {
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
            }
        }
        
        // Start auto-play
        startAutoPlay();
        
        // Pause auto-play on hover
        carousel.addEventListener('mouseenter', stopAutoPlay);
        carousel.addEventListener('mouseleave', startAutoPlay);
        
        // Touch/swipe support for mobile
        let startX = 0;
        let endX = 0;
        
        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            stopAutoPlay();
        });
        
        carousel.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            
            if (Math.abs(diff) > 50) { // Minimum swipe distance
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
            
            startAutoPlay();
        });
        
        // Keyboard navigation
        carousel.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
            }
        });
        
        // Initialize
        updateCarousel();
    });
}

// Initialize carousels when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeProductCarousels();
});

// Re-initialize carousels if content is dynamically loaded
if (typeof window !== 'undefined') {
    window.initializeProductCarousels = initializeProductCarousels;
}

// Gallery Carousel and Modal Functionality
function initializeGalleryCarousel() {
    const galleryCarousel = document.querySelector('.gallery-carousel-container');
    const galleryModal = document.getElementById('galleryModal');
    const modalImage = document.getElementById('galleryModalImage');
    const modalClose = document.getElementById('galleryModalClose');
    
    if (!galleryCarousel) return;
    
    const track = galleryCarousel.querySelector('.gallery-carousel-track');
    const slides = galleryCarousel.querySelectorAll('.gallery-carousel-slide');
    const prevBtn = galleryCarousel.querySelector('.gallery-carousel-btn[data-direction="prev"]');
    const nextBtn = galleryCarousel.querySelector('.gallery-carousel-btn[data-direction="next"]');
    const indicators = galleryCarousel.querySelectorAll('.gallery-carousel-indicator');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // Initialize indicators
    if (indicators.length > 0) {
        indicators[0].classList.add('active');
    }
    
    function updateGalleryCarousel() {
        const slideWidth = 100;
        const translateX = -currentSlide * slideWidth;
        track.style.transform = `translateX(${translateX}%)`;
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
        
        // Update button states
        if (prevBtn) prevBtn.disabled = currentSlide === 0;
        if (nextBtn) nextBtn.disabled = currentSlide === totalSlides - 1;
    }
    
    function goToSlide(index) {
        currentSlide = Math.max(0, Math.min(index, totalSlides - 1));
        updateGalleryCarousel();
    }
    
    function nextSlide() {
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            updateGalleryCarousel();
        }
    }
    
    function prevSlide() {
        if (currentSlide > 0) {
            currentSlide--;
            updateGalleryCarousel();
        }
    }
    
    // Event listeners for carousel
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToSlide(index));
    });
    
    // Click on slides to open modal
    slides.forEach((slide, index) => {
        slide.addEventListener('click', () => {
            const img = slide.querySelector('.gallery-carousel-image');
            if (img) {
                modalImage.src = img.src;
                modalImage.alt = img.alt;
                galleryModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Modal functionality
    function closeModal() {
        galleryModal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    // Close modal on background click
    galleryModal.addEventListener('click', (e) => {
        if (e.target === galleryModal) {
            closeModal();
        }
    });
    
    // Modal navigation
    const modalPrevBtn = galleryModal.querySelector('.gallery-modal-btn[data-direction="prev"]');
    const modalNextBtn = galleryModal.querySelector('.gallery-modal-btn[data-direction="next"]');
    
    function updateModalImage() {
        const currentSlideImg = slides[currentSlide].querySelector('.gallery-carousel-image');
        if (currentSlideImg) {
            modalImage.src = currentSlideImg.src;
            modalImage.alt = currentSlideImg.alt;
        }
    }
    
    if (modalPrevBtn) {
        modalPrevBtn.addEventListener('click', () => {
            prevSlide();
            updateModalImage();
        });
    }
    
    if (modalNextBtn) {
        modalNextBtn.addEventListener('click', () => {
            nextSlide();
            updateModalImage();
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (galleryModal.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeModal();
            } else if (e.key === 'ArrowLeft') {
                prevSlide();
                updateModalImage();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
                updateModalImage();
            }
        }
    });
    
    // Auto-play functionality
    let autoPlayInterval;
    
    function startAutoPlay() {
        // Clear any existing interval
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
        }
        
        autoPlayInterval = setInterval(() => {
            if (currentSlide < totalSlides - 1) {
                nextSlide();
            } else {
                goToSlide(0);
            }
        }, 4000); // Change slide every 4 seconds
        
        console.log('Gallery auto-play started - changing slides every 4 seconds');
    }
    
    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
        }
    }
    
    // Start auto-play immediately
    startAutoPlay();
    
    // Also start auto-play after a short delay to ensure everything is loaded
    setTimeout(() => {
        startAutoPlay();
    }, 1000);
    
    // Pause auto-play on hover
    galleryCarousel.addEventListener('mouseenter', stopAutoPlay);
    galleryCarousel.addEventListener('mouseleave', startAutoPlay);
    
    // Touch/swipe support for mobile
    let startX = 0;
    let endX = 0;
    
    galleryCarousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        stopAutoPlay();
    });
    
    galleryCarousel.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        
        if (Math.abs(diff) > 50) { // Minimum swipe distance
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
        
        startAutoPlay();
    });
    
    // Initialize
    updateGalleryCarousel();
}

// Initialize gallery carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeGalleryCarousel();
});

// Re-initialize gallery carousel if content is dynamically loaded
if (typeof window !== 'undefined') {
    window.initializeGalleryCarousel = initializeGalleryCarousel;
} 

// Commercial Product Carousel
function initializeCommercialCarousel() {
    const carouselContainer = document.querySelector('.product-showcase .carousel-container');
    if (!carouselContainer) return;
    
    const track = carouselContainer.querySelector('.carousel-track');
    const slides = track.querySelectorAll('.carousel-slide');
    const indicators = carouselContainer.querySelectorAll('.carousel-indicator');
    const prevBtn = carouselContainer.querySelector('[data-direction="prev"]');
    const nextBtn = carouselContainer.querySelector('[data-direction="next"]');
    
    let currentSlide = 0;
    let isTransitioning = false;
    
    function updateCarousel() {
        if (isTransitioning) return;
        
        const translateX = -currentSlide * 100;
        track.style.transform = `translateX(${translateX}%)`;
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
        
        // Update button states
        if (prevBtn) prevBtn.disabled = currentSlide === 0;
        if (nextBtn) nextBtn.disabled = currentSlide === slides.length - 1;
    }
    
    function goToSlide(index) {
        if (index < 0 || index >= slides.length || isTransitioning) return;
        
        isTransitioning = true;
        currentSlide = index;
        updateCarousel();
        
        setTimeout(() => {
            isTransitioning = false;
        }, 300);
    }
    
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }
    
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }
    
    // Event listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToSlide(index));
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
    
    // Touch/swipe support
    let startX = 0;
    let endX = 0;
    
    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });
    
    track.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    });
    
    // Initialize
    updateCarousel();
}

// Lightbox/Carousel Implementation - Industrial/Institutional Style
function initializeLightbox() {
    // Create lightbox overlay structure
    const lightboxHTML = `
        <div id="lightbox-overlay" class="lightbox-overlay" role="dialog" aria-modal="true" aria-label="Image viewer">
            <button class="lightbox-close" aria-label="Close image viewer">&times;</button>
            <button class="lightbox-prev" aria-label="Previous image">‹</button>
            <button class="lightbox-next" aria-label="Next image">›</button>
            <div class="lightbox-content">
                <img class="lightbox-image" alt="">
                <div class="lightbox-counter"></div>
            </div>
        </div>
    `;
    
    // Inject lightbox into body
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);
    
    const overlay = document.getElementById('lightbox-overlay');
    const lightboxImage = overlay.querySelector('.lightbox-image');
    const lightboxCounter = overlay.querySelector('.lightbox-counter');
    const closeBtn = overlay.querySelector('.lightbox-close');
    const prevBtn = overlay.querySelector('.lightbox-prev');
    const nextBtn = overlay.querySelector('.lightbox-next');
    
    let currentImages = [];
    let currentIndex = 0;
    let touchStartX = 0;
    let touchEndX = 0;
    let focusedElement = null;
    
    // Find all gallery images (excluding building style cards to allow proper navigation)
    const gallerySelectors = [
        '.gallery img',
        '.grid img',
        'figure img',
        '.gallery-item img',
        '.product-image img',
        '.benefits-image img',
        '.work-with-us-image img'
    ];
    
    const allImages = document.querySelectorAll(gallerySelectors.join(', '));
    
    // Add click handlers to all gallery images
    allImages.forEach((img, index) => {
        img.style.cursor = 'pointer';
        img.setAttribute('tabindex', '0');
        img.setAttribute('role', 'button');
        img.setAttribute('aria-label', 'Open image in viewer');
        
        const openLightbox = (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Store focus element
            focusedElement = img;
            
            // Get all images from the same container
            const container = img.closest('.gallery, .grid, .building-styles-grid, section');
            if (container) {
                currentImages = Array.from(container.querySelectorAll('img'));
            } else {
                currentImages = [img];
            }
            
            currentIndex = currentImages.indexOf(img);
            if (currentIndex === -1) currentIndex = 0;
            
            showImage();
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Focus on close button
            setTimeout(() => closeBtn.focus(), 100);
        };
        
        img.addEventListener('click', openLightbox);
        img.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox(e);
            }
        });
    });
    
    // Show image function
    function showImage() {
        if (currentImages.length === 0) return;
        
        const img = currentImages[currentIndex];
        const fullSrc = img.dataset.full || img.src;
        
        lightboxImage.src = fullSrc;
        lightboxImage.alt = img.alt || 'Gallery image';
        
        // Update counter
        if (currentImages.length > 1) {
            lightboxCounter.textContent = `${currentIndex + 1} / ${currentImages.length}`;
            lightboxCounter.style.display = 'block';
            prevBtn.style.display = 'block';
            nextBtn.style.display = 'block';
        } else {
            lightboxCounter.style.display = 'none';
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
        }
        
        // Update button states
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === currentImages.length - 1;
    }
    
    // Navigation functions
    function nextImage() {
        if (currentIndex < currentImages.length - 1) {
            currentIndex++;
            showImage();
        }
    }
    
    function prevImage() {
        if (currentIndex > 0) {
            currentIndex--;
            showImage();
        }
    }
    
    function closeLightbox() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        
        // Return focus to original element
        if (focusedElement) {
            focusedElement.focus();
            focusedElement = null;
        }
    }
    
    // Event listeners
    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', prevImage);
    nextBtn.addEventListener('click', nextImage);
    
    // Click outside to close
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay || e.target === overlay.querySelector('.lightbox-content')) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!overlay.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                prevImage();
                break;
            case 'ArrowRight':
                nextImage();
                break;
        }
    });
    
    // Touch support for mobile
    overlay.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    overlay.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next image
                nextImage();
            } else {
                // Swipe right - previous image
                prevImage();
            }
        }
    }
}
// ===== MOBILE MENU - INICIALIZACIÓN =====

// ===== MOBILE MENU - INICIALIZACIÓN =====

// Inicializar menú móvil cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initializeMobileMenu();
});

// ===== MOBILE MENU HARDENING - DIAGNÓSTICO Y FALLBACK ROBUSTO =====

document.addEventListener('DOMContentLoaded', () => {
  // Inyectar CSS de hardening en <head>
  const injectHardeningCSS = () => {
    if (document.getElementById('mobile-menu-hardening')) return;
    const style = document.createElement('style');
    style.id = 'mobile-menu-hardening';
    style.textContent = `
      /* === Mobile Menu Hardening (no tocar escritorio) === */
      @media (max-width: 1024px) {
        .mobile-menu-toggle {
          position: fixed !important;
          top: 14px !important;
          right: 14px !important;
          width: 48px !important;
          height: 48px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          background: #fff !important;
          border-radius: 12px !important;
          box-shadow: 0 6px 18px rgba(0,0,0,.18) !important;
          z-index: 2147483647 !important;
          opacity: 1 !important;
          visibility: visible !important;
          transform: none !important;
          pointer-events: auto !important;
          mix-blend-mode: normal !important;
          filter: none !important;
          -webkit-tap-highlight-color: transparent !important;
          border: none !important;
          cursor: pointer !important;
        }
        .mobile-menu-toggle svg,
        .mobile-menu-toggle svg * {
          stroke: #111 !important;
          fill: none !important;
          stroke-width: 2.2 !important;
        }
        .mobile-menu-toggle .sr-only {
          position: absolute !important;
          width: 1px !important;
          height: 1px !important;
          padding: 0 !important;
          margin: -1px !important;
          overflow: hidden !important;
          clip: rect(0, 0, 0, 0) !important;
          white-space: nowrap !important;
          border: 0 !important;
        }
        /* Drawer visible cuando aria-hidden=false */
        .mobile-drawer[aria-hidden="false"],
        #mobile-drawer[aria-hidden="false"] {
          display: block !important;
          opacity: 1 !important;
          visibility: visible !important;
        }
        .mobile-drawer-overlay[aria-hidden="false"],
        #mobile-drawer-overlay[aria-hidden="false"] {
          display: block !important;
          opacity: .6 !important;
          visibility: visible !important;
        }
      }
      @media (min-width: 1025px) {
        .mobile-menu-toggle { display: none !important; }
      }
    `;
    document.head.appendChild(style);
  };

  // Diagnóstico y fallback del toggle
  const ensureToggle = () => {
    let btn = document.querySelector('button.mobile-menu-toggle');
    if (!btn) {
      btn = document.createElement('button');
      btn.className = 'mobile-menu-toggle';
      btn.type = 'button';
      btn.setAttribute('aria-controls', 'mobile-drawer');
      btn.setAttribute('aria-expanded', 'false');
      btn.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
        <span class="sr-only">Open menu</span>
      `;
      document.body.appendChild(btn);
      console.log('[MOBILE MENU] Toggle button created dynamically');
    }
    return btn;
  };

  // Inyectar CSS antes de crear/modificar elementos
  injectHardeningCSS();
  
  const toggleButton = ensureToggle();
  const drawer = document.getElementById('mobile-drawer');
  const overlay = document.getElementById('mobile-drawer-overlay');
  const closeButton = document.querySelector('.mobile-drawer-close');

  // Diagnóstico y rescate visual
  const cs = getComputedStyle(toggleButton);
  const rect = toggleButton.getBoundingClientRect();
  const hiddenByStyles = 
    cs.display === 'none' ||
    cs.visibility === 'hidden' ||
    parseFloat(cs.opacity) === 0;
  const offscreen = 
    rect.right < 0 || rect.bottom < 0 || rect.left > innerWidth || rect.top > innerHeight;

  console.log('[MOBILE MENU] Diagnosis:', {
    display: cs.display, visibility: cs.visibility, opacity: cs.opacity,
    position: cs.position, zIndex: cs.zIndex, 
    hiddenByStyles, offscreen, rect
  });

  if (hiddenByStyles || offscreen) {
    console.log('[MOBILE MENU] Applying emergency inline styles');
    Object.assign(toggleButton.style, {
      position: 'fixed', top: '14px', right: '14px',
      width: '48px', height: '48px',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#fff', borderRadius: '12px',
      boxShadow: '0 6px 18px rgba(0,0,0,.18)', zIndex: '2147483647',
      opacity: '1', visibility: 'visible', transform: 'none', pointerEvents: 'auto'
    });
  }

  // JS robusto de control ARIA/scroll
  const setOpen = (open) => {
    if (!drawer || !overlay) return;
    drawer.setAttribute('aria-hidden', String(!open));
    overlay.setAttribute('aria-hidden', String(!open));
    toggleButton.setAttribute('aria-expanded', String(open));
    
    if (open) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      console.log('[MOBILE MENU] Opened');
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      console.log('[MOBILE MENU] Closed');
    }
  };

  const toggleMenu = () => {
    const isOpen = toggleButton.getAttribute('aria-expanded') === 'true';
    setOpen(!isOpen);
  };

  // Eventos
  toggleButton.addEventListener('click', toggleMenu);
  overlay?.addEventListener('click', () => setOpen(false));
  closeButton?.addEventListener('click', () => setOpen(false));

  // Solo visible en móvil
  const mq = window.matchMedia('(max-width: 1024px)');
  const sync = () => { 
    toggleButton.hidden = !mq.matches;
    if (mq.matches) {
      console.log('[MOBILE MENU] Mobile viewport detected');
    }
  };
  mq.addEventListener?.('change', sync);
  sync();

  // Helpers de prueba en consola
  window.__openMobileMenu = () => setOpen(true);
  window.__closeMobileMenu = () => setOpen(false);
  
  console.log('[MOBILE MENU] Hardening complete. Test with __openMobileMenu() and __closeMobileMenu()');
});

// === MOBILE MENU DIAGNOSTIC & HARDENING (FINAL SOLUTION) ===
(function(){
  function getChain(el){
    const chain = [];
    let n = el;
    while (n && n !== document.documentElement) {
      const cs = getComputedStyle(n);
      chain.push({
        tag: n.tagName.toLowerCase(),
        id: n.id || null,
        cls: n.className || null,
        display: cs.display,
        visibility: cs.visibility,
        opacity: cs.opacity,
        position: cs.position,
        overflow: `${cs.overflow} / ${cs.overflowX} / ${cs.overflowY}`,
        transform: cs.transform,
        clip: cs.clip,
        clipPath: cs.clipPath,
        contentVisibility: cs.contentVisibility,
        height: cs.height,
        zIndex: cs.zIndex
      });
      n = n.parentElement;
    }
    return chain;
  }

  function ensureToggle(){
    let btn = document.querySelector('button.mobile-menu-toggle');
    if (!btn) {
      btn = document.createElement('button');
      btn.className = 'mobile-menu-toggle';
      btn.type = 'button';
      btn.setAttribute('aria-controls', 'mobile-drawer');
      btn.setAttribute('aria-expanded', 'false');
      btn.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
        <span class="sr-only">Open menu</span>
      `;
      document.body.appendChild(btn);
    }
    return btn;
  }

  function hardenToggle(btn){
    // eliminar atributos que lo oculten
    if (btn.hasAttribute('hidden')) btn.removeAttribute('hidden');
    // forzar estilos críticos
    Object.assign(btn.style, {
      position: 'fixed', top: '14px', right: '14px',
      width: '48px', height: '48px',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#fff', borderRadius: '12px',
      boxShadow: '0 6px 18px rgba(0,0,0,.18)',
      zIndex: '2147483647', opacity: '1', visibility: 'visible',
      transform: 'none', pointerEvents: 'auto'
    });
    // si algún ancestro lo oculta, muévelo al final del <body>
    const chain = getChain(btn);
    const culprit = chain.find(x =>
      x.display === 'none' ||
      x.visibility === 'hidden' ||
      x.contentVisibility === 'hidden' ||
      (x.clip && x.clip !== 'auto') ||
      (x.clipPath && x.clipPath !== 'none') ||
      (x.transform && x.transform.includes('matrix(0')) ||
      parseFloat(x.opacity) === 0 ||
      x.height === '0px'
    );
    if (culprit) {
      if (btn.parentElement !== document.body) {
        document.body.appendChild(btn);
      }
    }
  }

  function setupMenu(){
    const btn = ensureToggle();
    const drawer = document.getElementById('mobile-drawer');
    const overlay = document.getElementById('mobile-drawer-overlay');
    const closeButton = document.querySelector('.mobile-drawer-close');

    // Diagnóstico
    const cs = getComputedStyle(btn);
    const rect = btn.getBoundingClientRect();
    const hiddenByStyles =
      cs.display === 'none' || cs.visibility === 'hidden' || parseFloat(cs.opacity) === 0;
    const offscreen =
      rect.right < 0 || rect.bottom < 0 || rect.left > innerWidth || rect.top > innerHeight;

    console.log('[MOBILE MENU] Diagnosis:', {
      display: cs.display, visibility: cs.visibility, opacity: cs.opacity,
      position: cs.position, zIndex: cs.zIndex, rect,
      hiddenByStyles, offscreen
    });

    // Hardening + mover a body si hace falta
    hardenToggle(btn);

    // Control de apertura/cierre
    const setOpen = (open) => {
      console.log(`[MOBILE MENU] Setting open: ${open}`);
      if (drawer) {
        drawer.setAttribute('aria-hidden', String(!open));
        if (open) {
          drawer.classList.add('open');
          drawer.style.cssText = 'display: block !important; right: 0 !important; opacity: 1 !important; visibility: visible !important;';
        } else {
          drawer.classList.remove('open');
          drawer.style.cssText = '';
        }
      }
      if (overlay) {
        overlay.setAttribute('aria-hidden', String(!open));
        if (open) {
          overlay.classList.add('open');
          overlay.style.cssText = 'display: block !important; opacity: 0.6 !important; visibility: visible !important;';
        } else {
          overlay.classList.remove('open');
          overlay.style.cssText = '';
        }
      }
      btn.setAttribute('aria-expanded', String(open));
      if (open) {
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
        document.body.style.touchAction = 'none';
      } else {
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
        document.body.style.touchAction = '';
      }
    };

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const open = btn.getAttribute('aria-expanded') === 'true';
      console.log(`[MOBILE MENU] Button clicked, current state: ${open ? 'open' : 'closed'}`);
      setOpen(!open);
    });
    overlay?.addEventListener('click', (e) => {
      if (e.target === overlay) {
        console.log('[MOBILE MENU] Overlay clicked');
        setOpen(false);
      }
    });
    closeButton?.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('[MOBILE MENU] Close button clicked');
      setOpen(false);
    });
    
    // Cerrar con Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
        console.log('[MOBILE MENU] Escape pressed');
        setOpen(false);
      }
    });
    
    // Cerrar al hacer click en links del drawer
    const drawerLinks = drawer?.querySelectorAll('a');
    drawerLinks?.forEach(link => {
      link.addEventListener('click', () => {
        console.log('[MOBILE MENU] Drawer link clicked, closing drawer');
        setTimeout(() => setOpen(false), 100);
      });
    });

    // Solo en móvil
    const mq = window.matchMedia('(max-width: 1024px)');
    const sync = () => { btn.hidden = !mq.matches; };
    if (mq.addEventListener) mq.addEventListener('change', sync);
    else mq.addListener && mq.addListener(sync);
    sync();


    // Exponer helpers
    window.__mm = {
      debug(){
        console.table(getChain(btn));
        console.log('btn rect', btn.getBoundingClientRect());
      },
      forceShow(){
        if (btn.hasAttribute('hidden')) btn.removeAttribute('hidden');
        hardenToggle(btn);
      },
      open(){ setOpen(true); },
      close(){ setOpen(false); }
    };
  }

  // Asegurar que corra cuando todo está listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupMenu);
  } else {
    setupMenu();
  }
  window.addEventListener('load', () => console.log('[MOBILE MENU] Window loaded.'));
})();

// ===== MOBILE MENU PATCH ÚNICO =====
(function(){
  // Evitar doble inicialización
  if (window.__MOBILE_MENU_PATCHED__) return;
  window.__MOBILE_MENU_PATCHED__ = true;

  const q = sel => document.querySelector(sel);
  const btn = q('button.mobile-menu-toggle');
  const drawer = q('#mobile-drawer');
  const overlay = q('#mobile-drawer-overlay');
  const closeBtn = q('.mobile-drawer-close');

  if (!btn || !drawer || !overlay) {
    console.warn('[MOBILE MENU] Falta algún elemento esencial (btn/drawer/overlay).');
    return;
  }

  // Fuente de verdad = clase .is-open y ARIA
  const isOpen = () => drawer.classList.contains('is-open');

  const applyState = (open) => {
    drawer.classList.toggle('is-open', open);
    overlay.classList.toggle('is-open', open);
    drawer.setAttribute('aria-hidden', String(!open));
    overlay.setAttribute('aria-hidden', String(!open));
    btn.setAttribute('aria-expanded', String(open));

    // Quitar bloqueos típicos
    drawer.removeAttribute('hidden');
    overlay.removeAttribute('hidden');
    if (open) {
      // Quitar inline styles que oculten
      drawer.style.display = '';
      overlay.style.display = '';
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
  };

  // Limpieza de listeners previos: sustituir nodo por clon (truco para remover handlers viejos)
  function stripListeners(el){
    const clone = el.cloneNode(true);
    el.parentNode.replaceChild(clone, el);
    return clone;
  }

  const btnClean   = stripListeners(btn);
  const overlayClean = stripListeners(overlay);
  const closeClean   = closeBtn ? stripListeners(closeBtn) : null;

  // Estado inicial: cerrado
  applyState(false);

  // ÚNICO listener de toggle
  btnClean.addEventListener('click', (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    const next = !isOpen();
    console.log('[MOBILE MENU] Toggle click. Setting open =', next);
    applyState(next);
  });

  // Cerrar en overlay/close
  overlayClean.addEventListener('click', () => {
    if (isOpen()) applyState(false);
  });
  closeClean && closeClean.addEventListener('click', () => {
    if (isOpen()) applyState(false);
  });

  // Helpers de prueba
  window.__menu = {
    open(){ applyState(true); },
    close(){ applyState(false); },
    state(){ console.log('isOpen =', isOpen()); return isOpen(); }
  };

  console.log('[MOBILE MENU] Patch aplicado. Usa __menu.open(), __menu.close(), __menu.state().');
})();
