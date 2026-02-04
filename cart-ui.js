// Cart UI Functions for Main Page

// Toggle cart visibility
function toggleCart() {
    let cartModal = document.getElementById('cartModal');
    
    if (!cartModal) {
        createCartModal();
        cartModal = document.getElementById('cartModal');
    }
    
    cartModal.style.display = cartModal.style.display === 'block' ? 'none' : 'block';
    
    // Load cart items when opening
    if (cartModal.style.display === 'block' && typeof cartManager !== 'undefined') {
        cartManager.renderCartItems();
    }
}

// Create cart modal
function createCartModal() {
    const cartModal = document.createElement('div');
    cartModal.id = 'cartModal';
    cartModal.className = 'cart-modal';
    cartModal.innerHTML = `
        <div class="cart-modal-content">
            <div class="cart-header">
                <h3>Shopping Cart</h3>
                <span class="cart-close" onclick="toggleCart()">&times;</span>
            </div>
            <div class="cart-items"></div>
        </div>
    `;
    
    document.body.appendChild(cartModal);
    
    // Add cart modal styles
    const cartStyles = document.createElement('style');
    cartStyles.textContent = `
        .cart-modal {
            display: none;
            position: fixed;
            z-index: 10000;
            right: 20px;
            top: 80px;
            width: 400px;
            max-width: 90vw;
            background: rgba(17, 17, 17, 0.95);
            border: 2px solid #333;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(10px);
        }
        
        .cart-modal-content {
            padding: 0;
        }
        
        .cart-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px;
            border-bottom: 1px solid #333;
            background: linear-gradient(45deg, #ff00ff, #00ffff);
            border-radius: 13px 13px 0 0;
        }
        
        .cart-header h3 {
            margin: 0;
            color: #000;
            font-weight: bold;
        }
        
        .cart-close {
            color: #000;
            font-size: 28px;
            font-weight: bold;
            cursor: pointer;
            line-height: 1;
        }
        
        .cart-close:hover {
            opacity: 0.7;
        }
        
        .cart-items {
            max-height: 400px;
            overflow-y: auto;
            padding: 20px;
        }
        
        @media (max-width: 768px) {
            .cart-modal {
                width: 350px;
                right: 10px;
                top: 70px;
            }
        }
    `;
    
    document.head.appendChild(cartStyles);
}

// Add to cart function for product buttons
function addToCart(productName, price, icon) {
    if (typeof cartManager !== 'undefined') {
        cartManager.addToCart({
            name: productName,
            price: price,
            icon: icon
        });
    } else {
        console.error('Cart manager not initialized');
    }
}

// Close cart when clicking outside
document.addEventListener('click', function(event) {
    const cartModal = document.getElementById('cartModal');
    const cartIcon = document.getElementById('cartIcon');
    
    if (cartModal && cartModal.style.display === 'block') {
        if (!cartModal.contains(event.target) && !cartIcon.contains(event.target)) {
            cartModal.style.display = 'none';
        }
    }
});