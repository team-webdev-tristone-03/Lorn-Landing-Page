let currentSlide = 0;
const totalSlides = 8;

function initCarousel() {
    const items = document.querySelectorAll('.carousel-item');
    const indicatorsContainer = document.getElementById('indicators');
    
    // Clear existing indicators
    indicatorsContainer.innerHTML = '';
    
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
    const items = document.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
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
    
    // Update button states
    if (prevBtn) {
        prevBtn.disabled = currentSlide === 0;
        prevBtn.style.opacity = currentSlide === 0 ? '0.5' : '1';
    }
    if (nextBtn) {
        nextBtn.disabled = currentSlide === totalSlides - 1;
        nextBtn.style.opacity = currentSlide === totalSlides - 1 ? '0.5' : '1';
    }
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

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initCarousel();
    
    // Add keyboard navigation for carousel
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
    
    // Ensure all buttons have proper focus states
    const buttons = document.querySelectorAll('button, .btn');
    buttons.forEach(button => {
        button.addEventListener('focus', function() {
            this.style.outline = '2px solid #00ffff';
        });
        button.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
});

// Force cart icon to be visible
document.addEventListener('DOMContentLoaded', function() {
    const cartIcon = document.getElementById('cartIcon');
    const cartBadge = document.getElementById('cartBadge');
    
    if (cartIcon) {
        cartIcon.style.display = 'flex';
        console.log('Cart icon forced visible');
    }
    
    updateCartIcon();
    updateCartButtons();
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
    const button = event.target;
    
    slider.classList.toggle('active');
    
    if (slider.classList.contains('active')) {
        button.textContent = 'Hide Products';
        button.style.background = '#ff4444';
        setTimeout(() => {
            slider.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    } else {
        button.textContent = 'Learn More';
        button.style.background = '#00ffff';
    }
}
function initiatePayment(productName, price) {
    // Show loading state
    const button = event.target;
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    button.disabled = true;
    
    // Simulate processing delay for better UX
    setTimeout(() => {
        window.location.href = `pay.html?product=${encodeURIComponent(productName)}&price=${price}`;
    }, 500);
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
            updateCartButtons();
            showAddedPopup(name);
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
    updateCartButtons();
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
                <div class="cart-item-icon"><i class="${item.icon}"></i></div>
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

function updateCartButtons() {
    const cartButtons = document.querySelectorAll('.cart-btn');
    
    cartButtons.forEach(button => {
        const productName = button.getAttribute('onclick').match(/'([^']+)'/)[1];
        const isInCart = cart.find(item => item.name === productName);
        
        if (isInCart) {
            button.textContent = 'Product Added';
            button.style.background = '#00ff88';
            button.style.color = '#000';
            button.style.border = '2px solid #00ff88';
            button.disabled = true;
        } else {
            button.textContent = 'Add to Cart';
            button.style.background = 'transparent';
            button.style.color = '#00ffff';
            button.style.border = '2px solid #00ffff';
            button.disabled = false;
        }
    });
}

function showAddedPopup(productName) {
    const popup = document.createElement('div');
    popup.className = 'added-popup';
    popup.innerHTML = `
        <div class="popup-content">
            <div class="popup-icon">✅</div>
            <div class="popup-text">${productName} added to cart!</div>
        </div>
    `;
    
    document.body.appendChild(popup);
    
    setTimeout(() => {
        popup.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        popup.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(popup);
        }, 300);
    }, 2000);
}

// Test function - call this in console to test
function testCart() {
    console.log('Testing cart functionality...');
    console.log('Cart icon element:', document.getElementById('cartIcon'));
    console.log('Cart badge element:', document.getElementById('cartBadge'));
    console.log('Current cart:', cart);
    addToCart('Test Product', 99, '🧪');
}

// Test all button functionality
function testAllButtons() {
    console.log('Testing all button functionality...');
    
    // Test carousel buttons
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    console.log('Previous button:', prevBtn ? 'Found' : 'Missing');
    console.log('Next button:', nextBtn ? 'Found' : 'Missing');
    
    // Test Learn More button
    const learnMoreBtn = document.querySelector('.product-btn');
    console.log('Learn More button:', learnMoreBtn ? 'Found' : 'Missing');
    
    // Test payment buttons
    const paymentButtons = document.querySelectorAll('.buy-btn:not(.cart-btn)');
    console.log('Payment buttons found:', paymentButtons.length);
    
    // Test cart buttons
    const cartButtons = document.querySelectorAll('.cart-btn');
    console.log('Cart buttons found:', cartButtons.length);
    
    // Test navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    console.log('Navigation links found:', navLinks.length);
    
    console.log('All buttons tested successfully!');
}