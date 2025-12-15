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

// Force cart icon to be visible
document.addEventListener('DOMContentLoaded', function() {
    const cartIcon = document.getElementById('cartIcon');
    const cartBadge = document.getElementById('cartBadge');
    
    if (cartIcon) {
        cartIcon.style.display = 'flex';
        console.log('Cart icon forced visible');
    }
    
    updateCartIcon();
    console.log('Cart initialized with', cart.length, 'items');
});

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

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(name, price, icon) {
    console.log('Adding to cart:', name, price, icon);
    
    try {
        if (!cart.find(item => item.name === name)) {
            cart.push({ name, price, icon });
            saveCart();
            updateCartIcon();
            showAddFeedback();
            console.log('Item added successfully. Cart:', cart);
        } else {
            console.log('Item already in cart:', name);
        }
    } catch (error) {
        console.error('Error adding to cart:', error);
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartIcon();
    updateCartDisplay();
}

function updateCartIcon() {
    const cartBadge = document.getElementById('cartBadge');
    
    if (!cartBadge) {
        console.error('Cart badge element not found');
        return;
    }
    
    if (cart.length > 0) {
        cartBadge.textContent = cart.length;
        cartBadge.style.display = 'flex';
        console.log('Cart badge updated:', cart.length);
    } else {
        cartBadge.style.display = 'none';
        console.log('Cart badge hidden');
    }
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const cartFooter = document.getElementById('cartFooter');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
        cartFooter.style.display = 'none';
        return;
    }
    
    cartItems.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <div class="cart-item-info">
                <div class="cart-item-icon">${item.icon}</div>
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <div class="cart-item-price">₹${item.price}</div>
                </div>
            </div>
            <button class="delete-btn" onclick="removeFromCart(${index})">Remove</button>
        </div>
    `).join('');
    
    // Calculate and display total
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotal.textContent = `₹${total}`;
    cartFooter.style.display = 'flex';
}

function proceedToCheckout() {
    if (cart.length === 0) return;
    
    const cartData = cart.map(item => `${item.name}:${item.price}`).join('|');
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    
    window.location.href = `pay.html?cartItems=${encodeURIComponent(cartData)}&total=${total}`;
}

function toggleCart() {
    const modal = document.getElementById('cartModal');
    
    if (modal.classList.contains('show')) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 400);
    } else {
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('show');
            updateCartDisplay();
        }, 10);
    }
}

function showAddFeedback() {
    const cartIcon = document.getElementById('cartIcon');
    
    if (!cartIcon) {
        console.error('Cart icon element not found');
        return;
    }
    
    cartIcon.style.transform = 'translateY(-50%) scale(1.2)';
    setTimeout(() => {
        cartIcon.style.transform = 'translateY(-50%) scale(1)';
    }, 200);
}

// Test function - call this in console to test
function testCart() {
    console.log('Testing cart functionality...');
    console.log('Cart icon element:', document.getElementById('cartIcon'));
    console.log('Cart badge element:', document.getElementById('cartBadge'));
    console.log('Current cart:', cart);
    addToCart('Test Product', 99, '🧪');
}