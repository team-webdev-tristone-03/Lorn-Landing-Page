# EmailJS Setup Instructions

## 1. Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## 2. Create Email Service
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. Note down your **Service ID**

## 3. Create Email Template
1. Go to "Email Templates" in dashboard
2. Click "Create New Template"
3. Copy the content from `emailjs-template.html` file
4. Paste it in the template editor
5. Set template name as "payment_success_template"
6. Note down your **Template ID**

## 4. Get Public Key
1. Go to "Account" → "General"
2. Find your **Public Key**
3. Copy it for use in code

## 5. Update Configuration
Replace the following placeholders in `email-integration.js`:

```javascript
// Replace these with your actual values
emailjs.init("YOUR_EMAILJS_PUBLIC_KEY");  // Your Public Key

// In sendPaymentSuccessEmail function:
const response = await emailjs.send(
    'YOUR_SERVICE_ID',    // Your Service ID
    'YOUR_TEMPLATE_ID',   // Your Template ID
    templateParams
);
```

## 6. Test Email Functionality
1. Make a test purchase
2. Check if email is sent successfully
3. Verify all product links work correctly

## 7. Template Variables Used
The template uses these variables:
- `{{customer_name}}` - Customer's name
- `{{payment_id}}` - Payment transaction ID
- `{{total_amount}}` - Total purchase amount
- `{{purchase_date}}` - Date of purchase
- `{{html_content}}` - Product table with access links
- `{{subject}}` - Email subject line

## 8. Email Limits
- Free plan: 200 emails/month
- Paid plans available for higher volumes

## 9. Troubleshooting
- Check browser console for errors
- Verify all IDs are correct
- Ensure EmailJS script is loaded
- Test with a simple template first