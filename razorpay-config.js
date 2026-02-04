// Razorpay Configuration
// Replace with your actual Razorpay credentials from https://dashboard.razorpay.com/

const RAZORPAY_CONFIG = {
    // Test Mode Keys (for development)
    TEST_KEY_ID: "rzp_test_SBatVTvxs4JIEh",
    
    // Live Mode Keys (for production)
    LIVE_KEY_ID: "rzp_live_YOUR_KEY_ID_HERE",
    
    // Current environment (change to 'live' for production)
    ENVIRONMENT: "test"
};

// Get the current key based on environment
function getRazorpayKey() {
    return RAZORPAY_CONFIG.ENVIRONMENT === "live" 
        ? RAZORPAY_CONFIG.LIVE_KEY_ID 
        : RAZORPAY_CONFIG.TEST_KEY_ID;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { RAZORPAY_CONFIG, getRazorpayKey };
}