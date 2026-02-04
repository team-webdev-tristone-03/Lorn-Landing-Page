# Razorpay Integration Setup Guide

## 🚀 Quick Setup Steps

### 1. Get Your Razorpay API Keys

1. **Sign up/Login** to [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. **Navigate** to Settings → API Keys
3. **Generate** API Keys if not already created
4. **Copy** both:
   - Key ID (starts with `rzp_test_` for test mode)
   - Key Secret (keep this secure!)

### 2. Configure Your Keys

**Option A: Using razorpay-config.js (Recommended)**
1. Open `razorpay-config.js`
2. Replace `rzp_test_YOUR_KEY_ID_HERE` with your actual test key
3. Replace `rzp_live_YOUR_KEY_ID_HERE` with your actual live key (when ready for production)

```javascript
const RAZORPAY_CONFIG = {
    TEST_KEY_ID: "rzp_test_SBatVTvxs4JIEh",  // Your actual test key
    LIVE_KEY_ID: "rzp_live_1234567890abcdef",  // Your actual live key
    ENVIRONMENT: "test"  // Change to "live" for production
};
```

**Option B: Direct in pay.html**
1. Open `pay.html`
2. Find line with `key: getRazorpayKey()`
3. Replace with: `key: "your_actual_razorpay_key_id"`

### 3. Test Your Integration

1. **Test Mode**: Use test key (starts with `rzp_test_`)
   - Use test card numbers from [Razorpay Test Cards](https://razorpay.com/docs/payments/payments/test-card-details/)
   - Test Card: 4111 1111 1111 1111, CVV: 123, Expiry: Any future date

2. **Live Mode**: Switch to live key (starts with `rzp_live_`)
   - Only use when ready for real transactions
   - Change `ENVIRONMENT: "live"` in razorpay-config.js

### 4. Verify Integration

✅ **Check these items:**
- [ ] Razorpay script loads: `https://checkout.razorpay.com/v1/checkout.js`
- [ ] API key is set correctly (not empty)
- [ ] Payment form submits without errors
- [ ] Razorpay popup opens when clicking "Proceed to Payment"
- [ ] Test payment completes successfully
- [ ] Success popup shows after payment
- [ ] Invoice PDF downloads
- [ ] Email confirmation is sent

### 5. Common Issues & Solutions

**Issue: "Key ID is required"**
- Solution: Make sure your API key is properly set in razorpay-config.js

**Issue: "Invalid key id provided"**
- Solution: Double-check your key from Razorpay dashboard

**Issue: Payment popup doesn't open**
- Solution: Check browser console for JavaScript errors

**Issue: Payment succeeds but no email/PDF**
- Solution: Check EmailJS configuration and Firebase setup

### 6. Security Best Practices

🔒 **Important Security Notes:**
- Never expose your Key Secret in frontend code
- Use test keys for development
- Switch to live keys only for production
- Keep your webhook secret secure
- Validate payments on your backend

### 7. Production Checklist

Before going live:
- [ ] Switch to live Razorpay keys
- [ ] Test with small real amounts
- [ ] Set up webhooks for payment verification
- [ ] Configure proper error handling
- [ ] Set up monitoring and alerts
- [ ] Update ENVIRONMENT to "live" in config

### 8. Support & Documentation

- **Razorpay Docs**: https://razorpay.com/docs/
- **Integration Guide**: https://razorpay.com/docs/payments/payment-gateway/web-integration/
- **Test Cards**: https://razorpay.com/docs/payments/payments/test-card-details/
- **Dashboard**: https://dashboard.razorpay.com/

---

## 🔧 Current Integration Status

Your Razorpay integration includes:
- ✅ Razorpay checkout script loaded
- ✅ Payment form with customer details
- ✅ Dynamic product pricing
- ✅ Success handling with PDF generation
- ✅ Email notifications via EmailJS
- ✅ Firebase data storage
- ⚠️ **NEEDS**: Your actual API keys

**Next Step**: Add your Razorpay API keys to complete the setup!