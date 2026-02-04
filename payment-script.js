// Payment Page Script
function goBack() {
    window.history.back();
}

document.addEventListener('DOMContentLoaded', function() {
    // Get product details from URL
    const urlParams = new URLSearchParams(window.location.search);
    const cartItemsParam = urlParams.get('cartItems');
    const total = urlParams.get('total');
    
    let productName = "Select a product";
    let productPrice = 0;
    let cartItems = [];
    
    if (cartItemsParam && total) {
        const items = decodeURIComponent(cartItemsParam).split("|");
        cartItems = items.map(item => {
            const [itemName, itemPrice] = item.split(":");
            return { name: itemName, price: parseInt(itemPrice) };
        });
        
        const itemNames = cartItems.map(item => item.name).join(", ");
        productName = itemNames.length > 50 ? `Multiple Products (${cartItems.length} items)` : itemNames;
        productPrice = parseInt(total);
    }
    
    // Update UI
    document.getElementById('productName').textContent = productName;
    document.getElementById('productPrice').textContent = `₹${productPrice}`;
    
    // Payment form submission
    document.getElementById('paymentForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (productPrice === 0) {
            alert('Please select a product first!');
            return;
        }
        
        const customerName = document.getElementById('customerName').value;
        const customerEmail = document.getElementById('customerEmail').value;
        const phoneNumber = document.getElementById('phoneNumber').value;
        
        openRazorpay(customerName, customerEmail, '+91' + phoneNumber);
    });
    
    function openRazorpay(name, email, contact) {
        const options = {
            key: getRazorpayKey(),
            amount: productPrice * 100,
            currency: "INR",
            name: "LORN VINGEST",
            description: productName,
            image: "image/lorn.png",
            handler: function(response) {
                // Payment successful
                const paymentDetails = {
                    name: name,
                    email: email,
                    contact: contact,
                    productName: productName,
                    productPrice: productPrice,
                    paymentId: response.razorpay_payment_id,
                    cartItems: cartItems,
                    timestamp: new Date(),
                    status: "completed"
                };
                
                // Store in Firebase
                if (typeof firebase !== 'undefined') {
                    firebase.firestore().collection('payments').add(paymentDetails);
                }
                
                // Send email
                if (typeof handlePaymentSuccess === 'function') {
                    handlePaymentSuccess({
                        customerEmail: email,
                        customerName: name,
                        cartItems: cartItems,
                        totalAmount: productPrice,
                        paymentId: response.razorpay_payment_id,
                        sessionId: urlParams.get('sessionId')
                    });
                }
                
                // Show success and redirect
                alert('Payment Successful!');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 2000);
            },
            prefill: { name, email, contact },
            theme: { color: "#ff00ff" }
        };
        
        const rzp = new Razorpay(options);
        rzp.open();
    }
});