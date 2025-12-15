// Payment page script to display cart total
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const total = urlParams.get('total');
    
    if (total) {
        // Find and update the price display element
        const priceElements = document.querySelectorAll('*');
        
        priceElements.forEach(element => {
            if (element.textContent && element.textContent.includes('₹0')) {
                element.textContent = element.textContent.replace('₹0', `₹${total}`);
                console.log('Updated price display to:', `₹${total}`);
            }
        });
    }
});