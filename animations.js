/**
 * ByteWise Tech Support - Animation Scripts
 * This file contains JavaScript animations to enhance the website's interactivity
 * and create a more dynamic user experience.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations
    initScrollAnimations();
    initParticleEffects();
    initTypingEffects();
    initCounterAnimations();
    init3DEffects();
    initHoverEffects();
});

/**
 * Scroll Animation Functions
 * These functions add animations to elements as they come into view
 */
function initScrollAnimations() {
    // Get all elements with scroll animation classes
    const scrollElements = document.querySelectorAll(
        '.scroll-fade-in, .scroll-slide-left, .scroll-slide-right, .scroll-zoom-in, .scroll-rotate-in'
    );
    
    // Add these classes to elements that should animate on scroll
    addScrollClasses();
    
    // Set up the Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Unobserve after animation is triggered
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    // Observe all scroll animation elements
    scrollElements.forEach(element => {
        observer.observe(element);
    });
    
    // Function to add scroll animation classes to elements
    function addScrollClasses() {
        // Feature cards
        document.querySelectorAll('.feature-card').forEach((card, index) => {
            card.classList.add('scroll-fade-in');
            card.style.transitionDelay = `${index * 0.1}s`;
        });
        
        // Service cards
        document.querySelectorAll('.service-card').forEach((card, index) => {
            card.classList.add('scroll-zoom-in');
            card.style.transitionDelay = `${index * 0.1}s`;
        });
        
        // Testimonials
        document.querySelectorAll('.testimonial').forEach((testimonial, index) => {
            testimonial.classList.add('scroll-slide-right');
            testimonial.style.transitionDelay = `${index * 0.1}s`;
        });
        
        // Section titles
        document.querySelectorAll('.section-title').forEach(title => {
            title.classList.add('scroll-rotate-in');
        });
        
        // Service features
        document.querySelectorAll('.service-features li').forEach((item, index) => {
            item.classList.add('scroll-slide-left');
            item.style.transitionDelay = `${index * 0.1}s`;
        });
    }
}

/**
 * Particle Effects
 * Adds floating particle effects to the hero section
 */
function initParticleEffects() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    // Create particle container
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    particleContainer.style.position = 'absolute';
    particleContainer.style.top = '0';
    particleContainer.style.left = '0';
    particleContainer.style.width = '100%';
    particleContainer.style.height = '100%';
    particleContainer.style.overflow = 'hidden';
    particleContainer.style.zIndex = '0';
    
    // Insert the particle container at the beginning of the hero section
    hero.insertBefore(particleContainer, hero.firstChild);
    
    // Create particles
    for (let i = 0; i < 50; i++) {
        createParticle(particleContainer);
    }
    
    // Function to create a single particle
    function createParticle(container) {
        const particle = document.createElement('div');
        
        // Random particle properties
        const size = Math.random() * 5 + 2;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const opacity = Math.random() * 0.5 + 0.1;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        // Set particle styles
        particle.style.position = 'absolute';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.borderRadius = '50%';
        particle.style.backgroundColor = 'rgba(255, 255, 255, ' + opacity + ')';
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.animation = `float ${duration}s infinite ease-in-out`;
        particle.style.animationDelay = `${delay}s`;
        
        // Add particle to container
        container.appendChild(particle);
    }
}

/**
 * Typing Effects
 * Adds a typewriter effect to headings
 */
function initTypingEffects() {
    // Apply typing effect to hero heading
    const heroHeading = document.querySelector('.hero h2');
    if (heroHeading) {
        const text = heroHeading.textContent;
        heroHeading.textContent = '';
        heroHeading.style.borderRight = '0.1em solid';
        heroHeading.style.animation = 'blink 0.7s step-end infinite';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroHeading.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            } else {
                // Remove cursor after typing is complete
                setTimeout(() => {
                    heroHeading.style.borderRight = 'none';
                    heroHeading.style.animation = 'none';
                }, 1000);
            }
        };
        
        // Start typing after a delay
        setTimeout(typeWriter, 1000);
    }
    
    // Apply typing effect to page headers
    const pageHeader = document.querySelector('.page-header h2');
    if (pageHeader) {
        const text = pageHeader.textContent;
        pageHeader.textContent = '';
        pageHeader.style.borderRight = '0.1em solid';
        pageHeader.style.animation = 'blink 0.7s step-end infinite';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                pageHeader.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            } else {
                // Remove cursor after typing is complete
                setTimeout(() => {
                    pageHeader.style.borderRight = 'none';
                    pageHeader.style.animation = 'none';
                }, 1000);
            }
        };
        
        // Start typing after a delay
        setTimeout(typeWriter, 500);
    }
}

/**
 * Counter Animations
 * Animates numbers counting up to their final value
 */
function initCounterAnimations() {
    // Add counter elements to the page
    addCounterElements();
    
    // Set up the Intersection Observer for counters
    const counterElements = document.querySelectorAll('.counter');
    
    if (counterElements.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                const step = Math.ceil(target / (duration / 16)); // 60fps
                
                let current = 0;
                const updateCounter = () => {
                    current += step;
                    if (current >= target) {
                        counter.textContent = target;
                    } else {
                        counter.textContent = current;
                        requestAnimationFrame(updateCounter);
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    // Observe all counter elements
    counterElements.forEach(counter => {
        observer.observe(counter);
    });
    
    // Function to add counter elements to the page
    function addCounterElements() {
        // Create a stats section if it doesn't exist
        if (!document.querySelector('.stats-section')) {
            const featuresSection = document.querySelector('.features');
            if (!featuresSection) return;
            
            const statsSection = document.createElement('section');
            statsSection.className = 'stats-section';
            statsSection.style.padding = '80px 0';
            statsSection.style.backgroundColor = 'var(--white)';
            statsSection.style.textAlign = 'center';
            
            const container = document.createElement('div');
            container.className = 'container';
            
            const title = document.createElement('h2');
            title.className = 'section-title';
            title.textContent = 'Our Impact';
            
            const statsGrid = document.createElement('div');
            statsGrid.className = 'stats-grid';
            statsGrid.style.display = 'grid';
            statsGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(200px, 1fr))';
            statsGrid.style.gap = '30px';
            statsGrid.style.marginTop = '40px';
            
            // Create stat items
            const stats = [
                { value: 9646, label: 'Happy Clients', icon: 'fa-users' },
                { value: 55896, label: 'Repairs Completed', icon: 'fa-tools' },
                { value: 93, label: 'Satisfaction Rate %', icon: 'fa-thumbs-up' },
                { value: 12, label: 'Hour Support', icon: 'fa-headset' }
            ];
            
            stats.forEach(stat => {
                const statItem = document.createElement('div');
                statItem.className = 'stat-item';
                statItem.style.padding = '30px';
                statItem.style.backgroundColor = 'var(--light-gray)';
                statItem.style.borderRadius = '8px';
                statItem.style.boxShadow = 'var(--box-shadow)';
                statItem.style.transition = 'all 0.3s ease';
                
                const icon = document.createElement('i');
                icon.className = `fas ${stat.icon} stat-icon`;
                icon.style.fontSize = '2.5rem';
                icon.style.color = 'var(--primary-color)';
                icon.style.marginBottom = '15px';
                icon.style.display = 'block';
                
                const counter = document.createElement('div');
                counter.className = 'counter';
                counter.setAttribute('data-target', stat.value);
                counter.textContent = '0';
                counter.style.fontSize = '2.5rem';
                counter.style.fontWeight = 'bold';
                counter.style.color = 'var(--primary-color)';
                counter.style.marginBottom = '10px';
                
                const label = document.createElement('div');
                label.className = 'stat-label';
                label.textContent = stat.label;
                label.style.fontSize = '1.1rem';
                label.style.color = 'var(--dark-gray)';
                
                statItem.appendChild(icon);
                statItem.appendChild(counter);
                statItem.appendChild(label);
                statsGrid.appendChild(statItem);
                
                // Add hover effect
                statItem.addEventListener('mouseenter', () => {
                    statItem.style.transform = 'translateY(-10px)';
                    statItem.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
                    icon.style.transform = 'scale(1.2)';
                    icon.style.color = 'var(--accent-color)';
                });
                
                statItem.addEventListener('mouseleave', () => {
                    statItem.style.transform = 'translateY(0)';
                    statItem.style.boxShadow = 'var(--box-shadow)';
                    icon.style.transform = 'scale(1)';
                    icon.style.color = 'var(--primary-color)';
                });
            });
            
            container.appendChild(title);
            container.appendChild(statsGrid);
            statsSection.appendChild(container);
            
            // Insert the stats section after the features section
            featuresSection.parentNode.insertBefore(statsSection, featuresSection.nextSibling);
        }
    }
}

/**
 * 3D Effects
 * Adds 3D transform effects to cards and other elements
 */
function init3DEffects() {
    // Add 3D effect to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.style.transformStyle = 'preserve-3d';
        card.style.perspective = '1000px';
        card.style.transition = 'transform 0.5s ease';
        
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'rotateX(0) rotateY(0)';
        });
    });
    
    // Add 3D effect to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.style.transformStyle = 'preserve-3d';
        card.style.perspective = '1000px';
        card.style.transition = 'transform 0.5s ease';
        
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'rotateX(0) rotateY(0)';
        });
    });
}

/**
 * Hover Effects
 * Enhances hover effects for buttons and other interactive elements
 */
function initHoverEffects() {
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.position = 'absolute';
            ripple.style.width = '5px';
            ripple.style.height = '5px';
            ripple.style.borderRadius = '50%';
            ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add hover effect to navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-3px)';
            link.style.color = 'var(--accent-color)';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateY(0)';
            link.style.color = link.classList.contains('active') ? 'var(--primary-color)' : 'var(--dark-gray)';
        });
    });
    
    // Add hover effect to social icons
    const socialIcons = document.querySelectorAll('.social-icons a');
    
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'translateY(-5px) rotate(360deg)';
            icon.style.backgroundColor = 'var(--accent-color)';
        });
        
        icon.addEventListener('mouseleave', () => {
            icon.style.transform = 'translateY(0) rotate(0deg)';
            icon.style.backgroundColor = 'var(--primary-color)';
        });
    });
    
    // Add hover effect to FAQ items
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            if (!item.classList.contains('active')) {
                item.style.transform = 'translateY(-5px)';
                item.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            if (!item.classList.contains('active')) {
                item.style.transform = 'translateY(0)';
                item.style.boxShadow = 'none';
            }
        });
    });
}

/**
 * FAQ Accordion Functionality
 * Enhances the FAQ accordion with smooth animations
 */
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            // Check if this item is already active
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
                const faqAnswer = faqItem.querySelector('.faq-answer');
                faqAnswer.style.maxHeight = '0';
                faqAnswer.style.padding = '0 20px';
            });
            
            // If the clicked item wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 40 + 'px'; // 40px for padding
                answer.style.padding = '20px';
                
                // Add animation to the active item
                item.style.transform = 'scale(1.02)';
                item.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
                
                // Scroll to the active item
                setTimeout(() => {
                    item.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 300);
            }
        });
    });
});

/**
 * Mobile Menu Toggle
 * Enhances the mobile menu toggle with smooth animations
 */
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('show');
            
            // Animate the hamburger icon
            const icon = mobileMenu.querySelector('i');
            if (navLinks.classList.contains('show')) {
                icon.className = 'fas fa-times';
                icon.style.transform = 'rotate(90deg)';
            } else {
                icon.className = 'fas fa-bars';
                icon.style.transform = 'rotate(0deg)';
            }
            
            // Animate the nav links
            const links = navLinks.querySelectorAll('li');
            links.forEach((link, index) => {
                if (navLinks.classList.contains('show')) {
                    link.style.animation = `fadeIn 0.5s forwards ${index * 0.1}s`;
                    link.style.opacity = '0';
                } else {
                    link.style.animation = 'none';
                }
            });
        });
    }
});
