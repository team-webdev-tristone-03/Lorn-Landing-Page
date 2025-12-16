# Post-Payment Email Automation Setup

## Overview
This setup implements secure post-payment email automation that sends product access links after successful Razorpay payments.

## Setup Steps

### 1. Configure Email Credentials

#### Option A: Gmail (Recommended)
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. Set Firebase environment variables:
```bash
firebase functions:config:set email.user="your-email@gmail.com"
firebase functions:config:set email.password="your-16-digit-app-password"
```

#### Option B: SendGrid
1. Create SendGrid account and get API key
2. Set environment variable:
```bash
firebase functions:config:set sendgrid.apikey="your-sendgrid-api-key"
```

### 2. Update Product Links
Edit `functions/index.js` and update the `PRODUCT_LINKS` object with your actual Google Drive links:

```javascript
const PRODUCT_LINKS = {
  'digital_marketing_course': 'https://drive.google.com/drive/folders/YOUR_ACTUAL_LINK_1',
  'seo_toolkit': 'https://drive.google.com/drive/folders/YOUR_ACTUAL_LINK_2',
  'social_media_templates': 'https://drive.google.com/drive/folders/YOUR_ACTUAL_LINK_3',
  'business_plan_template': 'https://drive.google.com/drive/folders/YOUR_ACTUAL_LINK_4',
  'multiple_products': 'https://drive.google.com/drive/folders/YOUR_BUNDLE_LINK'
};
```

### 3. Deploy Cloud Function
```bash
cd functions
npm install
firebase deploy --only functions
```

### 4. Test the System
1. Make a test payment through your website
2. Check Firebase Console → Firestore → payments collection
3. Verify email is sent automatically
4. Check function logs: `firebase functions:log`

## How It Works

1. **Payment Success**: After Razorpay payment, frontend stores payment data in Firestore `payments` collection
2. **Trigger**: Cloud Function automatically triggers when new document added to `payments`
3. **Processing**: Function reads `cartItems` array and maps to Google Drive links
4. **Email**: Sends HTML email with product access links using Nodemailer
5. **Tracking**: Updates payment document with email status

## Security Features

- Email credentials stored in Firebase environment (not in code)
- Product links mapped server-side (not exposed to frontend)
- Function only triggers on successful payment storage
- Cannot be called directly from browser
- Email sent only once per payment

## Troubleshooting

### Function not triggering:
- Check Firebase Console → Functions for errors
- Verify Firestore rules allow writes to `payments` collection

### Email not sending:
- Check function logs: `firebase functions:log`
- Verify email credentials are set correctly
- Test with `firebase functions:config:get`

### Wrong product links:
- Update `PRODUCT_LINKS` in `functions/index.js`
- Redeploy: `firebase deploy --only functions`

## File Structure
```
functions/
├── index.js          # Main Cloud Function
├── package.json      # Dependencies
├── .env.example      # Environment template
└── deploy.bat        # Windows deployment script
```