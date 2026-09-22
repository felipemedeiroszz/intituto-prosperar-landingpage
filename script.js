// Scroll Animations
document.addEventListener('DOMContentLoaded', function() {
    // =========================================================
    // Fade-in animation observer
    // =========================================================
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

    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });

    // Observe cards
    const cards = document.querySelectorAll('.payment-card, .step-card, .course-card, .testimonial-card, .journey-card, .benefit-card');
    cards.forEach(card => {
        card.classList.add('fade-in');
        observer.observe(card);
    });

    // =========================================================
    // Header scroll effect (moved to optimized scroll function)
    // =========================================================

    // =========================================================
    // Button hover effects
    // =========================================================
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-register-header');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });
    });

    // =========================================================
    // Parallax effect for hero section (moved to optimized scroll function)
    // =========================================================

    // =========================================================
    // Smooth scroll for anchor links
    // =========================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

    // =========================================================
    // Counter animation for stats
    // =========================================================
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target;
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current);
            }
        }, 30);
    });

    // =========================================================
    // Glow effect on mouse move for cards
    // =========================================================
    const glowCards = document.querySelectorAll('.payment-card, .step-card, .course-card, .testimonial-card, .journey-card, .benefit-card');
    glowCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // =========================================================
    // Benefits Section - Top images + cards animations
    // =========================================================
    const benefitsSection = document.querySelector('.benefits-section');
    const benefitsImageWrapper = document.querySelector('.benefits-image-wrapper');
    const benefitCards = document.querySelectorAll('.benefit-card');

    if (benefitsSection) {
        const benefitsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (benefitsImageWrapper) {
                        benefitsImageWrapper.classList.add('animate');
                    }

                    if (benefitCards.length > 0) {
                        benefitCards.forEach((card, index) => {
                            setTimeout(() => {
                                card.style.transition = 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
                                card.classList.add('animate-in');
                            }, 900 + (index * 180));
                        });
                    }

                    benefitsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        benefitsObserver.observe(benefitsSection);
    }

    // =========================================================
    // Journey Section - Progress Line Animation
    // =========================================================
    const journeySection = document.querySelector('.journey-section');
    const progressFill = document.querySelector('.progress-fill');
    const progressDots = document.querySelectorAll('.progress-dot');
    const journeyCards = document.querySelectorAll('.journey-card');

    if (journeySection && progressFill) {
        const journeyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        progressFill.style.width = '100%';
                    }, 300);

                    progressDots.forEach((dot, index) => {
                        setTimeout(() => {
                            dot.classList.add('active');
                        }, 500 + (index * 300));
                    });

                    journeyObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        journeyObserver.observe(journeySection);
    }

    // Journey Card Interactions
    journeyCards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            const step = card.getAttribute('data-step');
            const correspondingDot = document.querySelector(`.progress-dot[data-step="${step}"]`);
            if (correspondingDot) {
                correspondingDot.style.transform = 'scale(1.2)';
                correspondingDot.style.borderColor = 'var(--neon-green)';
            }
        });

        card.addEventListener('mouseleave', () => {
            const step = card.getAttribute('data-step');
            const correspondingDot = document.querySelector(`.progress-dot[data-step="${step}"]`);
            if (correspondingDot) {
                correspondingDot.style.transform = '';
                correspondingDot.style.borderColor = '';
            }
        });

        card.addEventListener('click', () => {
            const step = card.getAttribute('data-step');
            progressDots.forEach(dot => dot.classList.remove('active'));
            const targetDot = document.querySelector(`.progress-dot[data-step="${step}"]`);
            if (targetDot) {
                targetDot.classList.add('active');
                const progressPercentage = ((step - 1) / 3) * 100;
                progressFill.style.width = `${progressPercentage}%`;
            }
        });
    });

    // Progress Dot Click Interactions
    progressDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            progressDots.forEach(d => d.classList.remove('active'));
            dot.classList.add('active');

            const progressPercentage = (index / 3) * 100;
            progressFill.style.width = `${progressPercentage}%`;

            journeyCards.forEach(card => {
                card.style.transform = '';
                card.style.borderColor = '';
            });

            const targetCard = document.querySelector(`.journey-card[data-step="${index + 1}"]`);
            if (targetCard) {
                targetCard.style.transform = 'translateY(-12px) scale(1.02)';
                targetCard.style.borderColor = 'rgba(0, 255, 136, 0.5)';
            }
        });
    });

    // Journey Button Animation
    const journeyBtn = document.querySelector('.btn-journey');
    if (journeyBtn) {
        journeyBtn.addEventListener('click', () => {
            const hero = document.querySelector('.hero');
            if (hero) {
                hero.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }

    // =========================================================
    // TESTIMONIALS — CARROSSEL SIMPLES POR CLICK
    // =========================================================
    const testimonialsSection = document.getElementById('testimonials');
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const indicators = document.querySelectorAll('.indicator');
    const testimonialsTrack = document.querySelector('.testimonials-track');
    const prevButton = document.querySelector('.testimonial-nav-prev');
    const nextButton = document.querySelector('.testimonial-nav-next');
    let currentActiveIndex = 0;
    let autoScrollInterval = null;
    let isUserInteracting = false;

    function updateTestimonialStyles(activeIndex) {
        currentActiveIndex = activeIndex;

        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === activeIndex);
        });

        // Scroll para o item ativo
        if (testimonialsTrack && testimonialItems[activeIndex]) {
            const itemWidth = testimonialItems[activeIndex].offsetWidth;
            const gap = 20; // gap do CSS atualizado
            const scrollPosition = (itemWidth + gap) * activeIndex - (testimonialsTrack.offsetWidth / 2) + (itemWidth / 2);
            testimonialsTrack.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        }
    }

    function startAutoScroll() {
        if (autoScrollInterval) {
            clearInterval(autoScrollInterval);
        }
        autoScrollInterval = setInterval(() => {
            if (!isUserInteracting) {
                const nextIndex = (currentActiveIndex + 1) % testimonialItems.length;
                updateTestimonialStyles(nextIndex);
            }
        }, 3000);
    }

    function stopAutoScroll() {
        if (autoScrollInterval) {
            clearInterval(autoScrollInterval);
            autoScrollInterval = null;
        }
    }

    updateTestimonialStyles(0);
    startAutoScroll();

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            isUserInteracting = true;
            stopAutoScroll();
            updateTestimonialStyles(index);
            setTimeout(() => {
                isUserInteracting = false;
                startAutoScroll();
            }, 5000);
        });
    });

    // Botões de navegação
    if (prevButton) {
        prevButton.addEventListener('click', (e) => {
            e.preventDefault();
            isUserInteracting = true;
            stopAutoScroll();
            const prevIndex = (currentActiveIndex - 1 + testimonialItems.length) % testimonialItems.length;
            updateTestimonialStyles(prevIndex);
            setTimeout(() => {
                isUserInteracting = false;
                startAutoScroll();
            }, 5000);
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', (e) => {
            e.preventDefault();
            isUserInteracting = true;
            stopAutoScroll();
            const nextIndex = (currentActiveIndex + 1) % testimonialItems.length;
            updateTestimonialStyles(nextIndex);
            setTimeout(() => {
                isUserInteracting = false;
                startAutoScroll();
            }, 5000);
        });
    }

    // Navegação por teclado
    testimonialsSection.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            isUserInteracting = true;
            stopAutoScroll();
            const prevIndex = (currentActiveIndex - 1 + testimonialItems.length) % testimonialItems.length;
            updateTestimonialStyles(prevIndex);
            e.preventDefault();
            setTimeout(() => {
                isUserInteracting = false;
                startAutoScroll();
            }, 5000);
        } else if (e.key === 'ArrowRight') {
            isUserInteracting = true;
            stopAutoScroll();
            const nextIndex = (currentActiveIndex + 1) % testimonialItems.length;
            updateTestimonialStyles(nextIndex);
            e.preventDefault();
            setTimeout(() => {
                isUserInteracting = false;
                startAutoScroll();
            }, 5000);
        }
    });

    // Drag-to-scroll para desktop e touch
    let isDown = false;
    let startX;
    let scrollLeft;

    testimonialsTrack.addEventListener('mousedown', (e) => {
        isDown = true;
        isUserInteracting = true;
        stopAutoScroll();
        startX = e.pageX - testimonialsTrack.offsetLeft;
        scrollLeft = testimonialsTrack.scrollLeft;
        testimonialsTrack.style.cursor = 'grabbing';
    });

    testimonialsTrack.addEventListener('mouseleave', () => {
        isDown = false;
        testimonialsTrack.style.cursor = 'grab';
        setTimeout(() => {
            isUserInteracting = false;
            startAutoScroll();
        }, 3000);
    });

    testimonialsTrack.addEventListener('mouseup', () => {
        isDown = false;
        testimonialsTrack.style.cursor = 'grab';
        setTimeout(() => {
            isUserInteracting = false;
            startAutoScroll();
        }, 3000);
    });

    testimonialsTrack.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - testimonialsTrack.offsetLeft;
        const walk = (x - startX) * 2; // scroll speed
        testimonialsTrack.scrollLeft = scrollLeft - walk;
    });

    // Touch events para mobile
    testimonialsTrack.addEventListener('touchstart', (e) => {
        isDown = true;
        isUserInteracting = true;
        stopAutoScroll();
        startX = e.touches[0].pageX - testimonialsTrack.offsetLeft;
        scrollLeft = testimonialsTrack.scrollLeft;
    });

    testimonialsTrack.addEventListener('touchend', () => {
        isDown = false;
        setTimeout(() => {
            isUserInteracting = false;
            startAutoScroll();
        }, 3000);
    });

    testimonialsTrack.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        const x = e.touches[0].pageX - testimonialsTrack.offsetLeft;
        const walk = (x - startX) * 2;
        testimonialsTrack.scrollLeft = scrollLeft - walk;
    });

    // =========================================================
    // Mobile menu toggle
    // =========================================================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileCloseBtn = document.querySelector('.mobile-close-btn');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu with X button
        if (mobileCloseBtn) {
            mobileCloseBtn.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        }

        // Close menu when clicking on nav links
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu) {
                mobileMenuBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // =========================================================
    // CTA Section - Enhanced Conversion Tracking
    // =========================================================
    const ctaSection = document.getElementById('cta');
    const ctaLink = document.querySelector('.cta-link');
    const registerButtons = document.querySelectorAll('.btn-register-header, .mobile-register-btn');

    // Track CTA visibility for analytics
    if (ctaSection) {
        const ctaObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // CTA is now visible - could trigger analytics event
                    console.log('CTA section visible - potential conversion opportunity');
                    ctaObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        ctaObserver.observe(ctaSection);
    }

    // Enhanced click tracking for CTA button
    if (ctaLink) {
        ctaLink.addEventListener('click', (e) => {
            // Track CTA clicks for conversion analytics
            console.log('CTA clicked - conversion initiated');
            
            // Add visual feedback
            ctaLink.style.transform = 'scale(0.98)';
            setTimeout(() => {
                ctaLink.style.transform = '';
            }, 150);
        });
    }

    // Enhanced click tracking for register buttons
    registerButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Track register button clicks for conversion analytics
            console.log('Register button clicked - conversion initiated');
            
            // Add visual feedback to the image inside
            const img = button.querySelector('img');
            if (img) {
                img.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    img.style.transform = '';
                }, 150);
            }
        });
    });

    // =========================================================
    // Courses Section - Entry Animations
    // =========================================================
    const coursesSection = document.querySelector('.courses-section');
    const courseLinks = document.querySelectorAll('.course-animate');

    if (coursesSection && courseLinks.length > 0) {
        const coursesObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    courseLinks.forEach((course, index) => {
                        const delay = parseInt(course.getAttribute('data-delay')) || (index * 100);
                        setTimeout(() => {
                            course.classList.add('visible');
                        }, delay);
                    });
                    coursesObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        coursesObserver.observe(coursesSection);
    }

    // =========================================================
    // Scroll Performance Optimization
    // =========================================================
    
    // Enable passive event listeners for better scroll performance
    document.addEventListener('touchstart', function() {}, { passive: true });
    document.addEventListener('touchmove', function() {}, { passive: true });
    
    // Optimize scroll-based animations using requestAnimationFrame
    let ticking = false;
    
    function updateScrollEffects() {
        const scrolled = window.pageYOffset;
        
        // Header scroll effect (optimized)
        const header = document.querySelector('.header');
        const navLinks = document.querySelectorAll('.nav-link');
        
        if (header) {
            if (scrolled > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = '0 2px 20px rgba(0, 255, 136, 0.2)';
                navLinks.forEach(link => {
                    link.style.color = '#000000';
                });
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.9)';
                header.style.boxShadow = 'none';
                navLinks.forEach(link => {
                    link.style.color = '#000000';
                });
            }
        }
        
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }, { passive: true });
    
    // Disable heavy parallax effects for better performance
    // Only enable on devices with sufficient hardware
    const isLowEndDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
    
    if (!isLowEndDevice) {
        // Keep parallax for better devices (optional - currently disabled for performance)
        // window.addEventListener('scroll', () => {
        //     const scrolled = window.pageYOffset;
        //     const hero = document.querySelector('.hero');
        //     const heroImage = document.querySelector('.hero-image');

        //     if (hero && heroImage) {
        //         const speed = 0.3;
        //         heroImage.style.transform = `translateY(${scrolled * speed}px)`;
        //     }
        // }, { passive: true });
    }
    
    // Optimize image loading with lazy loading
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.loading = 'lazy';
    });
    
    // Reduce animation complexity on low-end devices
    if (isLowEndDevice) {
        document.body.classList.add('low-end-device');
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
