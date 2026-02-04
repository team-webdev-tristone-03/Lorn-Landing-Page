// Cart Management System with Firebase
class CartManager {
    constructor() {
        this.sessionId = this.getSessionId();
        this.cart = [];
        this.loadCartFromFirebase();
    }

    getSessionId() {
        let sessionId = sessionStorage.getItem('sessionId');
        if (!sessionId) {
            sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            sessionStorage.setItem('sessionId', sessionId);
        }
        return sessionId;
    }

    async loadCartFromFirebase() {
        try {
            const db = firebase.firestore();
            const doc = await db.collection('carts').doc(this.sessionId).get();
            if (doc.exists) {
                this.cart = doc.data().items || [];
                this.updateCartDisplay();
            }
        } catch (error) {
            console.error('Error loading cart:', error);
        }
    }

    async saveCartToFirebase() {
        try {
            const db = firebase.firestore();
            await db.collection('carts').doc(this.sessionId).set({
                items: this.cart,
                updatedAt: new Date(),
                sessionId: this.sessionId
            });
        } catch (error) {
            console.error('Error saving cart:', error);
        }
    }

    async addToCart(product) {
        const existingItem = this.cart.find(item => item.name === product.name);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({ ...product, quantity: 1 });
        }
        
        await this.saveCartToFirebase();
        this.updateCartDisplay();
        this.showAddedToCartMessage(product.name);
    }

    async removeFromCart(productName) {
        this.cart = this.cart.filter(item => item.name !== productName);
        await this.saveCartToFirebase();
        this.updateCartDisplay();
    }

    async updateQuantity(productName, quantity) {
        const item = this.cart.find(item => item.name === productName);
        if (item) {
            if (quantity <= 0) {
                await this.removeFromCart(productName);
            } else {
                item.quantity = quantity;
                await this.saveCartToFirebase();
                this.updateCartDisplay();
            }
        }
    }

    getCartTotal() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getCartCount() {
        return this.cart.reduce((total, item) => total + item.quantity, 0);
    }

    updateCartDisplay() {
        const cartCount = this.getCartCount();
        const cartTotal = this.getCartTotal();
        
        const cartBadge = document.querySelector('.cart-badge');
        if (cartBadge) {
            cartBadge.textContent = cartCount;
            cartBadge.style.display = cartCount > 0 ? 'block' : 'none';
        }
        
        const cartTotalElement = document.querySelector('.cart-total');
        if (cartTotalElement) {
            cartTotalElement.textContent = `₹${cartTotal}`;
        }

        this.renderCartItems();
    }

    renderCartItems() {
        const cartItemsContainer = document.querySelector('.cart-items');
        if (!cartItemsContainer) return;

        if (this.cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
            return;
        }

        const checkoutButton = this.cart.length > 0 ? `
            <div class="cart-checkout">
                <div class="cart-total-display">Total: ₹${this.getCartTotal()}</div>
                <button class="checkout-btn" onclick="cartManager.proceedToCheckout()">Proceed to Payment</button>
            </div>
        ` : '';

        cartItemsContainer.innerHTML = this.cart.map(item => `
            <div class="cart-item">
                <div class="item-info">
                    <h4>${item.name}</h4>
                    <p class="item-price">₹${item.price}</p>
                </div>
                <div class="item-controls">
                    <button onclick="cartManager.updateQuantity('${item.name}', ${item.quantity - 1})">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button onclick="cartManager.updateQuantity('${item.name}', ${item.quantity + 1})">+</button>
                    <button class="remove-btn" onclick="cartManager.removeFromCart('${item.name}')">Remove</button>
                </div>
            </div>
        `).join('') + checkoutButton;
    }

    showAddedToCartMessage(productName) {
        const message = document.createElement('div');
        message.className = 'cart-message';
        message.textContent = `${productName} added to cart!`;
        message.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(45deg, #00ff88, #00ffff);
            color: #000;
            padding: 15px 20px;
            border-radius: 10px;
            font-weight: bold;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 3000);
    }

    proceedToCheckout() {
        if (this.cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }

        const cartItems = this.cart.map(item => `${item.name}:${item.price}`).join('|');
        const total = this.getCartTotal();
        
        window.location.href = `pay.html?cartItems=${encodeURIComponent(cartItems)}&total=${total}&sessionId=${this.sessionId}`;
    }

    async clearCart() {
        this.cart = [];
        await this.saveCartToFirebase();
        this.updateCartDisplay();
    }
}

// Initialize cart manager
const cartManager = new CartManager();

// Add CSS for cart message animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .cart-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px;
        border-bottom: 1px solid #333;
        background: rgba(0, 0, 0, 0.3);
        margin-bottom: 10px;
        border-radius: 10px;
    }
    
    .item-info h4 {
        color: #ff00ff;
        margin: 0 0 5px 0;
        font-size: 1rem;
    }
    
    .item-price {
        color: #00ff88;
        font-weight: bold;
        margin: 0;
    }
    
    .item-controls {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .item-controls button {
        background: #333;
        color: #fff;
        border: none;
        padding: 5px 10px;
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .item-controls button:hover {
        background: #555;
    }
    
    .remove-btn {
        background: #ff4444 !important;
    }
    
    .remove-btn:hover {
        background: #ff6666 !important;
    }
    
    .quantity {
        color: #00ffff;
        font-weight: bold;
        min-width: 20px;
        text-align: center;
    }
    
    .empty-cart {
        text-align: center;
        color: #666;
        font-style: italic;
        padding: 20px;
    }
    
    .cart-checkout {
        margin-top: 20px;
        padding: 20px;
        background: rgba(255, 0, 255, 0.1);
        border-radius: 10px;
        text-align: center;
    }
    
    .cart-total-display {
        font-size: 1.2rem;
        color: #00ff88;
        font-weight: bold;
        margin-bottom: 15px;
    }
    
    .checkout-btn {
        background: linear-gradient(45deg, #ff00ff, #00ffff);
        color: #fff;
        border: none;
        padding: 12px 30px;
        border-radius: 25px;
        font-size: 1rem;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
        text-transform: uppercase;
        letter-spacing: 1px;
    }
    
    .checkout-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(255, 0, 255, 0.4);
    }
`;
document.head.appendChild(style);