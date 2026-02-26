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

// Initialize cart storage on page load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize other functionality
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
    const menuIcon = document.getElementById('menuIcon');
    
    if (cartIcon) {
        cartIcon.style.display = 'flex';
        console.log('Cart icon forced visible');
    }
    
    if (menuIcon) {
        menuIcon.style.display = 'flex';
        console.log('Menu icon forced visible');
    }
    
    updateCartIcon();
    updateCartButtons();
    updateMenuButtons();
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
    
    // Store email in Firebase
    if (typeof firebase !== 'undefined' && firebase.firestore) {
        const db = firebase.firestore();
        db.collection('email_signups').add({
            email: userEmail,
            timestamp: new Date(),
            source: 'vault_signup',
            userAgent: navigator.userAgent,
            url: window.location.href
        }).then(() => {
            console.log('Email stored successfully');
        }).catch((error) => {
            console.error('Error storing email:', error);
        });
    }
    
    // Send email via EmailJS
    if (typeof emailjs !== 'undefined') {
        emailjs.send('service_7epwwdf', 'template_602e5qj', {
            to_email: 'lornvingest@gmail.com',
            user_email: userEmail,
            signup_date: new Date().toLocaleString('en-IN'),
            message: `New user signed up for Digital Money Codex with email: ${userEmail}`
        }).then(() => {
            console.log('Email sent successfully via EmailJS');
            popup.classList.add('show');
            setTimeout(() => {
                popup.classList.remove('show');
                form.reset();
            }, 2000);
        }).catch((error) => {
            console.error('EmailJS error:', error);
            popup.classList.add('show');
            setTimeout(() => {
                popup.classList.remove('show');
                form.reset();
            }, 2000);
        });
    } else {
        popup.classList.add('show');
        setTimeout(() => {
            popup.classList.remove('show');
            form.reset();
        }, 2000);
    }
});

function toggleProductsSlider() {
    const slider = document.getElementById('productsSlider');
    const carouselSection = document.querySelector('.carousel-section');
    const button = event.target;
    
    slider.classList.toggle('active');
    
    if (slider.classList.contains('active')) {
        button.textContent = 'Hide Products';
        button.style.background = '#ff4444';
        carouselSection.classList.add('pushed-down');
        setTimeout(() => {
            slider.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    } else {
        button.textContent = 'Learn More';
        button.style.background = '#00ffff';
        carouselSection.classList.remove('pushed-down');
    }
}
let buyNowProducts = [];

function initiatePayment(productName, price) {
    showBuyNowModal(productName, price);
}

function showBuyNowModal(productName, price) {
    const modal = document.getElementById('buyNowModal');
    document.getElementById('buyNowProductName').textContent = productName;
    document.getElementById('buyNowProductPrice').textContent = '₹' + price;
    
    buyNowProducts = [{ name: productName, price: price }];
    renderSuggestedProducts(productName);
    updateBuyNowTotal();
    
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('show'), 10);
}

function closeBuyNowModal() {
    const modal = document.getElementById('buyNowModal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
        buyNowProducts = [];
    }, 300);
}

function proceedToPaymentFromBuyNow() {
    const cartItems = buyNowProducts.map(p => `${p.name}:${p.price}`).join('|');
    const total = buyNowProducts.reduce((sum, p) => sum + p.price, 0);
    window.location.href = `pay.html?cartItems=${encodeURIComponent(cartItems)}&total=${total}`;
}

function renderSuggestedProducts(currentProduct) {
    const allProducts = [
        { name: 'All India Leads', price: 99, icon: 'fas fa-phone' },
        { name: 'Salaried Employee Verified Leads', price: 49, icon: 'fas fa-user-tie' },
        { name: 'Verified Employees Leads', price: 49, icon: 'fas fa-check-circle' },
        { name: 'Pan India Database', price: 99, icon: 'fas fa-flag' },
        { name: '1 Crore+ Bulk Leads', price: 99, icon: 'fas fa-chart-bar' },
        { name: '10,000+ Reels & Ads for Instagram', price: 99, icon: 'fas fa-film' },
        { name: '1 Million+ Reels & Videos', price: 99, icon: 'fas fa-video' },
        { name: '1000+ Mobile Apps', price: 99, icon: 'fas fa-mobile-alt' },
        { name: '1000+ Mobile Apps to Publish', price: 99, icon: 'fas fa-mobile-alt' }
    ];
    
    const suggested = allProducts.filter(p => p.name !== currentProduct);
    const container = document.getElementById('suggestedProducts');
    
    container.innerHTML = suggested.map(product => {
        const isAdded = buyNowProducts.some(p => p.name === product.name);
        return `
            <div class="suggested-product-item ${isAdded ? 'added' : ''}">
                <i class="${product.icon}"></i>
                <div class="suggested-product-info">
                    <h5>${product.name}</h5>
                    <p>₹${product.price}</p>
                </div>
                <button 
                    onclick="${isAdded ? `removeFromBuyNow('${product.name}')` : `addToBuyNow('${product.name}', ${product.price}, '${product.icon}')`}" 
                    class="add-suggested-btn ${isAdded ? 'added' : ''}">
                    ${isAdded ? '−' : '+'}
                </button>
            </div>
        `;
    }).join('');
}

function addToBuyNow(name, price, icon) {
    if (!buyNowProducts.some(p => p.name === name)) {
        buyNowProducts.push({ name, price, icon });
        const currentProduct = document.getElementById('buyNowProductName').textContent;
        renderSuggestedProducts(currentProduct);
        updateBuyNowTotal();
    }
}

function removeFromBuyNow(name) {
    buyNowProducts = buyNowProducts.filter(p => p.name !== name);
    const currentProduct = document.getElementById('buyNowProductName').textContent;
    renderSuggestedProducts(currentProduct);
    updateBuyNowTotal();
}

function updateBuyNowTotal() {
    const total = buyNowProducts.reduce((sum, p) => sum + p.price, 0);
    const priceElement = document.getElementById('buyNowProductPrice');
    if (buyNowProducts.length > 1) {
        priceElement.textContent = `Total: ₹${total}`;
    } else {
        priceElement.textContent = `₹${total}`;
    }
}

let cart = [];

function saveCart() {
    // Save to Firebase only
    if (typeof cartManager !== 'undefined') {
        cartManager.saveCartToFirebase();
    }
}

function addToCart(name, price, icon) {
    if (typeof cartManager !== 'undefined') {
        cartManager.addToCart({ name, price, icon });
    }
}

function removeFromCart(index) {
    if (typeof cartManager !== 'undefined' && cartManager.cart[index]) {
        cartManager.removeFromCart(cartManager.cart[index].name);
    }
}

function updateCartIcon() {
    const cartBadge = document.getElementById('cartBadge');
    if (!cartBadge) return;
    
    const count = typeof cartManager !== 'undefined' ? cartManager.getCartCount() : 0;
    if (count > 0) {
        cartBadge.textContent = count;
        cartBadge.style.display = 'flex';
    } else {
        cartBadge.style.display = 'none';
    }
}

function updateCartDisplay() {
    if (typeof cartManager !== 'undefined') {
        cartManager.renderCartItems();
    }
}

function proceedToCheckout() {
    if (typeof cartManager !== 'undefined') {
        cartManager.proceedToCheckout();
    }
}

function toggleCart() {
    const modal = document.getElementById('cartModal');
    
    if (modal.classList.contains('show')) {
        modal.classList.remove('show');
        storeCartToggle('close');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 400);
    } else {
        modal.style.display = 'flex';
        storeCartToggle('open');
        setTimeout(() => {
            modal.classList.add('show');
            updateCartDisplay();
        }, 10);
    }
}

function toggleMenu() {
    const modal = document.getElementById('menuModal');
    
    if (modal.classList.contains('show')) {
        modal.classList.remove('show');
        storeMenuToggle('close');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 400);
    } else {
        modal.style.display = 'flex';
        storeMenuToggle('open');
        setTimeout(() => {
            modal.classList.add('show');
            updateMenuButtons();
        }, 10);
    }
}

function updateCartButtons() {
    const cartButtons = document.querySelectorAll('.cart-btn');
    const currentCart = typeof cartManager !== 'undefined' ? cartManager.cart : [];
    
    cartButtons.forEach(button => {
        const productName = button.getAttribute('onclick').match(/'([^']+)'/)[1];
        const isInCart = currentCart.find(item => item.name === productName);
        
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

function updateMenuButtons() {
    const menuButtons = document.querySelectorAll('.menu-add-btn');
    const currentCart = typeof cartManager !== 'undefined' ? cartManager.cart : [];
    
    menuButtons.forEach(button => {
        const productName = button.getAttribute('onclick').match(/'([^']+)'/)[1];
        const isInCart = currentCart.find(item => item.name === productName);
        
        if (isInCart) {
            button.textContent = 'Added';
            button.style.background = '#666';
            button.style.color = '#999';
            button.disabled = true;
        } else {
            button.textContent = 'Add to Cart';
            button.style.background = 'linear-gradient(45deg, #00ff88, #00ffff)';
            button.style.color = '#000';
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

function getSessionId() {
    let sessionId = sessionStorage.getItem('sessionId');
    if (!sessionId) {
        sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        sessionStorage.setItem('sessionId', sessionId);
    }
    return sessionId;
}

function storeProductView(productName, price) {
    if (typeof firebase !== 'undefined' && firebase.firestore) {
        const db = firebase.firestore();
        db.collection('product_views').add({
            productName: productName,
            price: price,
            timestamp: new Date(),
            userAgent: navigator.userAgent,
            url: window.location.href
        }).catch(error => console.error('Error storing product view:', error));
    }
}

function storeMenuToggle(action) {
    if (typeof firebase !== 'undefined' && firebase.firestore) {
        const db = firebase.firestore();
        db.collection('user_interactions').add({
            type: 'menu_toggle',
            action: action,
            timestamp: new Date(),
            userAgent: navigator.userAgent,
            url: window.location.href
        }).catch(error => console.error('Error storing menu toggle:', error));
    }
}

function storeCartToggle(action) {
    if (typeof firebase !== 'undefined' && firebase.firestore) {
        const db = firebase.firestore();
        const cartCount = typeof cartManager !== 'undefined' ? cartManager.getCartCount() : 0;
        db.collection('user_interactions').add({
            type: 'cart_toggle',
            action: action,
            cartItemCount: cartCount,
            timestamp: new Date(),
            userAgent: navigator.userAgent,
            url: window.location.href
        }).catch(error => console.error('Error storing cart toggle:', error));
    }
}

let currentProductInfo = {};

function showProductInfo(name, price, icon, description) {
    window.location.href = `product-detail.html?product=${encodeURIComponent(name)}`;
}

function closeProductInfo() {
    const modal = document.getElementById('productInfoModal');
    modal.classList.remove('show');
    setTimeout(() => modal.style.display = 'none', 400);
}

function addToCartFromInfo() {
    addToCart(currentProductInfo.name, currentProductInfo.price, currentProductInfo.icon);
    closeProductInfo();
}

function buyFromInfo() {
    initiatePayment(currentProductInfo.name, currentProductInfo.price);
}