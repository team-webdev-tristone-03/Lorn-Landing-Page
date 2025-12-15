let currentSlide = 0;
const totalSlides = 8;
const items = document.querySelectorAll('.carousel-item');

function initCarousel() {
    const indicatorsContainer = document.getElementById('indicators');
    for (let i = 0; i < totalSlides; i++) {
        const indicator = document.createElement('div');
        indicator.className = 'indicator';
        if (i === 0) indicator.classList.add('active');
        indicator.onclick = () => goToSlide(i);
        indicatorsContainer.appendChild(indicator);
    }
    updateCarousel();
}

function updateCarousel() {
    const indicators = document.querySelectorAll('.indicator');
    items.forEach((item, index) => {
        item.classList.remove('active', 'prev', 'next');
        if (index === currentSlide) {
            item.classList.add('active');
        } else if (index === currentSlide - 1) {
            item.classList.add('prev');
        } else if (index === currentSlide + 1) {
            item.classList.add('next');
        }
    });
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
    document.getElementById('prevBtn').disabled = currentSlide === 0;
    document.getElementById('nextBtn').disabled = currentSlide === totalSlides - 1;
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

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
}

// Redirect to pay.html page
function initiatePayment(productName, price) {
    window.location.href = 'pay.html';
}

initCarousel();

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

const form = document.getElementById('vaultForm');
const popup = document.getElementById('popup');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const userEmail = document.getElementById('userEmail').value;
    popup.classList.add('show');
    setTimeout(() => {
        const subject = encodeURIComponent("New Vault Signup");
        const body = encodeURIComponent("A new user joined the vault with email: " + userEmail);
        window.location.href = `mailto:info@lornvingest.com?subject=${subject}&body=${body}`;
        popup.classList.remove('show');
        form.reset();
    }, 1000);
});

function toggleProductsSlider() {
    const slider = document.getElementById('productsSlider');
    slider.classList.toggle('active');
    if (slider.classList.contains('active')) {
        setTimeout(() => {
            slider.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    }
}
function initiatePayment(productName, price) {
    window.location.href = `pay.html?product=${encodeURIComponent(productName)}&price=${price}`;
}