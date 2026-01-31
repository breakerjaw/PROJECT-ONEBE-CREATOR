document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Simple form validation and submission
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            form.reset();
        });
    }

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe struktur cards
    document.querySelectorAll('.struktur-card').forEach(card => {
        observer.observe(card);
    });

    // Observe student cards
    document.querySelectorAll('.student-card').forEach(card => {
        observer.observe(card);
    });

    // Observe project cards
    document.querySelectorAll('.project').forEach(project => {
        observer.observe(project);
    });

    // Observe album items
    document.querySelectorAll('.album-item').forEach(item => {
        observer.observe(item);
    });

    // Add hover effect to navigation
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });

    // --- SAFE PARALLAX: apply to welcome image/area, NOT header ---
    // Previous implementation moved the <header> itself which made the header disappear on scroll.
    // New approach: parallax transforms a non-sticky element (.welcome-photo / .welcome-img).
    const enableParallax = !window.matchMedia('(max-width: 768px)').matches;
    if (enableParallax) {
        const parallaxTarget = document.querySelector('.welcome-photo') || document.querySelector('.welcome-img') || null;
        if (parallaxTarget) {
            const onParallax = () => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                // small, subtle parallax on welcome image for visual depth
                parallaxTarget.style.transform = `translateY(${Math.min(scrollTop * 0.15, 120)}px)`;
                parallaxTarget.style.willChange = 'transform';
            };
            // initialize and attach
            onParallax();
            window.addEventListener('scroll', onParallax, { passive: true });
        }
    } else {
        // ensure any previous transforms are reset on small screens
        const parallaxTarget = document.querySelector('.welcome-photo') || document.querySelector('.welcome-img');
        if (parallaxTarget) parallaxTarget.style.transform = 'translateY(0)';
    }

    // Add ripple effect on button clicks
    const buttons = document.querySelectorAll('button, .btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Mobile optimization: Reduce animations on mobile devices
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) {
        // Disable heavy animations on mobile
        const animatedElements = document.querySelectorAll('.student-card, .project, .struktur-card');
        animatedElements.forEach(el => {
            el.style.animation = 'none';
        });
    }
});