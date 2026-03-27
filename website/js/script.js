// Set Hero Background Image dynamically
document.addEventListener('DOMContentLoaded', () => {
    const heroBg = document.getElementById('hero-bg');
    if (heroBg) {
        // High quality unsplash organic farm image
        heroBg.style.backgroundImage = "url('https://images.unsplash.com/photo-1590682680695-43b964a3ae17?auto=format&fit=crop&q=80&w=2000')";
    }

    // Set About Us Background Image dynamically (Secondary Asset)
    const aboutHeroBg = document.getElementById('about-hero-bg');
    if (aboutHeroBg) {
        // Beautiful green agricultural farming landscape
        aboutHeroBg.style.backgroundImage = "url('https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=2000')";
    }

    // Rotating Text Logic
    const rotatingTextEl = document.getElementById('rotating-text');
    if (rotatingTextEl) {
        const phrases = ["South Indian farmers", "grassroots partnerships", "our future"];
        let currentIndex = 0;

        setInterval(() => {
            rotatingTextEl.classList.remove('fade');
            void rotatingTextEl.offsetWidth; // trigger reflow
            
            currentIndex = (currentIndex + 1) % phrases.length;
            rotatingTextEl.textContent = phrases[currentIndex];
            
            rotatingTextEl.classList.add('fade');
        }, 4000); // 4 seconds per text
    }

    // Slideshow Logic
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');

        const showSlide = (index) => {
            slides.forEach(slide => slide.classList.remove('active'));
            slides[index].classList.add('active');
        };

        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        });

        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        });
    }

    // Number Counter Logic
    const counterEl = document.getElementById('counter');
    if (counterEl) {
        let hasCounted = false;
        const targetNumber = 1000;
        const duration = 2000; // ms

        const animateCounter = () => {
            let start = null;
            const step = (timestamp) => {
                if (!start) start = timestamp;
                const progress = Math.min((timestamp - start) / duration, 1);
                counterEl.innerText = Math.floor(progress * targetNumber);
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        };

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !hasCounted) {
                hasCounted = true;
                animateCounter();
            }
        });

        observer.observe(counterEl);
    }

    // Apple-style Continuous Scroll Zoom Animation
    const stickyContainer = document.querySelector('.intro-video-container');
    const zoomElement = document.querySelector('.zoom-in-scroll');
    const titleElement = document.querySelector('.video-title-scroll');
    
    if (stickyContainer && zoomElement && titleElement) {
        window.addEventListener('scroll', () => {
            window.requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                const maxScroll = 600; 
                
                let progress = scrollY / maxScroll;
                progress = Math.max(0, Math.min(progress, 1));
                
                // --- Text Animation ---
                // Text scales down slightly and moves upwards exactly 300px 
                // to sit beautifully and persistently as a title above the expanded video!
                const textY = -(progress * 300); 
                const textScale = 1 - (progress * 0.3); // scales from 1.0 to 0.7
                
                titleElement.style.opacity = 1;
                titleElement.style.transform = `translateY(${textY}px) scale(${textScale})`;
                
                // --- Video Animation ---
                const scale = progress; 
                const opacity = progress * 1.5; // reaches full opacity early
                
                zoomElement.style.transform = `scale(${scale})`;
                zoomElement.style.opacity = Math.min(opacity, 1);
                
                if (progress > 0.95) {
                    zoomElement.style.pointerEvents = 'auto'; // allow clicking
                } else {
                    zoomElement.style.pointerEvents = 'none'; // prevent clicking while animating
                }
            });
        });
        
        // Initialize immediately
        window.dispatchEvent(new Event('scroll'));
    }

    // --- Staggered Scroll Cascades (Team Page) ---
    const staggerElements = document.querySelectorAll('.stagger-enter');
    if (staggerElements.length > 0) {
        const staggerObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Stagger the delay slightly for each card in the row
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 100); 
                    staggerObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 }); // Trigger when 10% visible
        
        staggerElements.forEach(el => staggerObserver.observe(el));
    }

    // --- Team Popout Modal Logic ---
    const teamMembers = document.querySelectorAll('.member-photo-container');
    const modal = document.getElementById('team-modal');
    
    if (teamMembers.length > 0 && modal) {
        const closeBtn = document.querySelector('.close-btn');
        const modalImg = document.getElementById('modal-img');
        const modalName = document.getElementById('modal-name');
        const modalTitle = document.getElementById('modal-title');
        const modalDesc = document.getElementById('modal-desc');
        
        teamMembers.forEach(container => {
            container.addEventListener('click', () => {
                const parent = container.closest('.team-member');
                const img = container.querySelector('img').src;
                const name = parent.querySelector('h3').textContent;
                const title = parent.querySelector('.member-title').textContent;
                const desc = parent.querySelector('.member-desc').textContent;
                
                modalImg.src = img;
                modalName.textContent = name;
                modalTitle.textContent = title;
                modalDesc.textContent = desc;
                
                // Show modal and prevent background scrolling
                modal.classList.add('show');
                document.body.style.overflow = 'hidden'; 
            });
        });
        
        const closeModal = () => {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        };
        
        // Close on X btn click
        closeBtn.addEventListener('click', closeModal);
        
        // Close if clicking outside the modal content
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
});
