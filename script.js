document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. SLIDER FUNCTIONALITY
    // ==========================================
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');
    const prevBtn = document.getElementById('hero-prev');
    const nextBtn = document.getElementById('hero-next');
    const slider = document.getElementById('hero-slider');

    let current = 0;
    const intervalTime = 5000; // 5 seconds
    let autoSlide;

    function showSlide(index) {
        slides.forEach((s, i) => {
            s.classList.toggle('active', i === index);
        });
        dots.forEach((d, i) => {
            d.classList.toggle('active', i === index);
        });
        current = index;
    }

    function nextSlide() {
        let newIndex = current + 1;
        if (newIndex >= slides.length) newIndex = 0;
        showSlide(newIndex);
    }

    function prevSlide() {
        let newIndex = current - 1;
        if (newIndex < 0) newIndex = slides.length - 1;
        showSlide(newIndex);
    }

    // Auto play functions
    function startAuto() {
        // Clear any existing interval just in case
        clearInterval(autoSlide);
        autoSlide = setInterval(nextSlide, intervalTime);
    }

    function stopAuto() {
        clearInterval(autoSlide);
    }

    // Event Listeners for Controls
    if(nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            stopAuto();
            nextSlide();
            startAuto();
        });

        prevBtn.addEventListener('click', () => {
            stopAuto();
            prevSlide();
            startAuto();
        });
    }

    // Dot click events
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            stopAuto();
            const index = parseInt(dot.dataset.index, 10);
            showSlide(index);
            startAuto();
        });
    });

    // Pause on hover
    if(slider) {
        slider.addEventListener('mouseenter', stopAuto);
        slider.addEventListener('mouseleave', startAuto);
    }

    // Initialize Slider
    startAuto();


    // ==========================================
    // 2. GALLERY GENERATION
    // ==========================================
    const gallery = document.getElementById("gallery");
    const folder = "Resources/Photos-Index/";
    const imageCount = 12; // Number of images you have

    if (gallery) {
        for (let i = 1; i <= imageCount; i++) {
            const div = document.createElement("div");
            div.className = "gallery-item";

            const img = document.createElement("img");
            // Expects images named Photo-Index-1.jpeg, Photo-Index-2.jpeg, etc.
            img.src = `${folder}Photo-Index-${i}.jpeg`; 
            img.alt = `Gallery Image ${i}`;
            
            // Optional: Add error handling if image doesn't exist
            img.onerror = function() {
                this.style.display = 'none';
            };

            div.appendChild(img);
            gallery.appendChild(div);
        }
    }
});