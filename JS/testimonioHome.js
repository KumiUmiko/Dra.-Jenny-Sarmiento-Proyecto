document.addEventListener('DOMContentLoaded', function() {
    const carouselContainer = document.getElementById('carouselContainer');
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dots = document.querySelectorAll('.dot');
    
    let currentIndex = 2; // Start with the middle testimonial active
    const totalTestimonials = testimonials.length;
    
    // Initialize the carousel
    updateCarousel();
    
    // Set up event listeners for the controls
    prevBtn.addEventListener('click', goToPrevious);
    nextBtn.addEventListener('click', goToNext);
    
    // Set up event listeners for the dots
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            currentIndex = parseInt(this.getAttribute('data-index'));
            updateCarousel();
        });
    });
    
    // Set up touch events for mobile swipe
    let touchStartX = 0;
    let touchEndX = 0;
    
    carouselContainer.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    carouselContainer.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            // Swipe left
            goToNext();
        } else if (touchEndX > touchStartX + 50) {
            // Swipe right
            goToPrevious();
        }
    }
    
    // Set up auto-rotation
    let autoRotateInterval = setInterval(goToNext, 5000);
    
    carouselContainer.addEventListener('mouseenter', function() {
        clearInterval(autoRotateInterval);
    });
    
    carouselContainer.addEventListener('mouseleave', function() {
        autoRotateInterval = setInterval(goToNext, 5000);
    });
    
    // Navigation functions
    function goToPrevious() {
        currentIndex = (currentIndex - 1 + totalTestimonials) % totalTestimonials;
        updateCarousel();
    }
    
    function goToNext() {
        currentIndex = (currentIndex + 1) % totalTestimonials;
        updateCarousel();
    }
    
    function updateCarousel() {
        const isMobile = window.innerWidth <= 576;
        
        testimonials.forEach((testimonial, index) => {
            testimonial.classList.remove('active');
            
            if (index === currentIndex) {
                testimonial.classList.add('active');
            }
        });
        
        // Update the dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
        
        // Calculate the transform offset
        let offset = 0;
        
        if (!isMobile) {
            // For desktop/tablet: Center the active testimonial
            const testimonialWidth = testimonials[0].offsetWidth + 40; // width + margin
            offset = -currentIndex * testimonialWidth + (carouselContainer.offsetWidth / 2) - (testimonialWidth / 2);
            
            // Limit the offset to prevent empty space
            const minOffset = -(totalTestimonials * testimonialWidth - carouselContainer.offsetWidth);
            offset = Math.max(minOffset, Math.min(0, offset));
        } else {
            // For mobile: Show only the active testimonial
            const testimonialWidth = carouselContainer.offsetWidth;
            offset = -currentIndex * testimonialWidth;
        }
        
        carouselContainer.style.transform = `translateX(${offset}px)`;
        
        // Handle visibility of testimonials for better performance
        testimonials.forEach((testimonial, index) => {
            const distance = Math.abs(index - currentIndex);
            
            if (isMobile) {
                // On mobile, only show the active testimonial
                testimonial.style.display = index === currentIndex ? 'block' : 'none';
            } else {
                // On desktop, show the nearby testimonials
                if (distance > 2) {
                    testimonial.classList.add('hidden-mobile');
                } else {
                    testimonial.classList.remove('hidden-mobile');
                }
            }
        });
    }
    
    // Update on window resize
    window.addEventListener('resize', updateCarousel);
});