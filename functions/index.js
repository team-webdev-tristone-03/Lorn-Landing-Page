const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();

// ========================================
// 🔗 ADD YOUR GOOGLE DRIVE LINKS HERE
// ========================================
// Replace the placeholder links below with your actual Google Drive folder/file links
// Products from your website with their prices:

const PRODUCT_LINKS = {
  // ₹99 Products
  'all_india_leads': 'https://drive.google.com/drive/folders/YOUR_ALL_INDIA_LEADS_LINK_HERE',
  'pan_india_database': 'https://drive.google.com/drive/folders/YOUR_PAN_INDIA_DATABASE_LINK_HERE', 
  '1_crore_bulk_leads': 'https://drive.google.com/drive/folders/YOUR_1_CRORE_BULK_LEADS_LINK_HERE',
  '10000_reels_ads_for_instagram': 'https://drive.google.com/drive/folders/YOUR_10000_REELS_ADS_LINK_HERE',
  '1_million_reels_videos': 'https://drive.google.com/drive/folders/YOUR_1_MILLION_REELS_VIDEOS_LINK_HERE',
  '1000_mobile_apps_to_publish': 'https://drive.google.com/drive/folders/YOUR_1000_MOBILE_APPS_LINK_HERE',
  '1000_mobile_apps': 'https://drive.google.com/drive/folders/YOUR_1000_MOBILE_APPS_LINK_HERE', // Alternative name
  
  // ₹49 Products  
  'salaried_employee_verified_leads': 'https://drive.google.com/drive/folders/YOUR_SALARIED_EMPLOYEE_LEADS_LINK_HERE',
  'verified_employees_leads': 'https://drive.google.com/drive/folders/YOUR_VERIFIED_EMPLOYEES_LEADS_LINK_HERE',
  
  // Default fallback link for unmatched products
  'default': 'https://drive.google.com/drive/folders/YOUR_DEFAULT_LINK_HERE'
};

// Product prices for validation (optional)
const PRODUCT_PRICES = {
  'all_india_leads': 99,
  'pan_india_database': 99,
  '1_crore_bulk_leads': 99,
  '10000_reels_ads_for_instagram': 99,
  '1_million_reels_videos': 99,
  '1000_mobile_apps_to_publish': 99,
  '1000_mobile_apps': 99,
  'salaried_employee_verified_leads': 49,
  'verified_employees_leads': 49
};

// Email transporter configuration
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: functions.config().email.user,
      pass: functions.config().email.password
    }
  });
};

// Generate HTML email template
const generateEmailHTML = (customerName, cartItems, accessLinks) => {
  const productList = cartItems.map((item, index) => `
    <tr>
      <td style="padding: 15px; border-bottom: 1px solid #eee;">
        <strong>${item.name}</strong>
      </td>
      <td style="padding: 15px; border-bottom: 1px solid #eee;">
        <a href="${accessLinks[index]}" 
           style="background: linear-gradient(45deg, #ff00ff, #00ffff); 
                  color: white; 
                  padding: 8px 16px; 
                  text-decoration: none; 
                  border-radius: 5px; 
                  font-weight: bold;">
          Access Now
        </a>
      </td>
    </tr>
  `).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Your LORN VINGEST Purchase</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #000000 0%, #1a0033 50%, #000000 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: #ff00ff; margin: 0; font-size: 28px; text-shadow: 0 0 10px rgba(255, 0, 255, 0.5);">
          LORN VINGEST
        </h1>
        <p style="color: #00ffff; margin: 10px 0 0 0; font-size: 16px;">
          Digital Products & Services
        </p>
      </div>
      
      <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
        <h2 style="color: #333; margin-top: 0;">Hi ${customerName},</h2>
        
        <p style="font-size: 16px; margin-bottom: 20px;">
          Thank you for your purchase! Your payment has been successfully processed, and your digital products are now ready for access.
        </p>
        
        <div style="background: white; border-radius: 8px; overflow: hidden; margin: 20px 0; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h3 style="background: #ff00ff; color: white; margin: 0; padding: 15px; text-align: center;">
            Your Products & Access Links
          </h3>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background: #f8f9fa;">
                <th style="padding: 15px; text-align: left; border-bottom: 2px solid #dee2e6;">Product</th>
                <th style="padding: 15px; text-align: center; border-bottom: 2px solid #dee2e6;">Access</th>
              </tr>
            </thead>
            <tbody>
              ${productList}
            </tbody>
          </table>
        </div>
        
        <div style="background: #e8f5e8; border-left: 4px solid #28a745; padding: 15px; margin: 20px 0; border-radius: 4px;">
          <h4 style="margin: 0 0 10px 0; color: #155724;">Important Notes:</h4>
          <ul style="margin: 0; padding-left: 20px; color: #155724;">
            <li>These links provide lifetime access to your purchased products</li>
            <li>Please save these links in a secure location</li>
            <li>If you have any issues accessing your products, contact our support team</li>
          </ul>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
          <p style="margin: 0; color: #666;">
            Need help? Contact us at 
            <a href="mailto:support@lornvingest.com" style="color: #ff00ff;">support@lornvingest.com</a>
          </p>
          <p style="margin: 10px 0 0 0; font-size: 14px; color: #999;">
            © 2025 LORN VINGEST. All Rights Reserved.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Main Cloud Function
exports.sendProductAccessEmail = functions.firestore
  .document('payments/{paymentId}')
  .onCreate(async (snap, context) => {
    try {
      const paymentData = snap.data();
      const { name, email, cartItems, paymentId } = paymentData;

      console.log('Processing payment:', paymentId);
      console.log('Cart items:', cartItems);
      console.log('Email from payment form:', email);

      // ✅ VALIDATION: Only send email if cart has products
      if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
        console.log('No cart items found - skipping email');
        return { success: false, reason: 'No cart items' };
      }

      // ✅ VALIDATION: Only send email if email is from payment form
      if (!email || !email.includes('@')) {
        console.log('Invalid email from payment form - skipping email');
        return { success: false, reason: 'Invalid email' };
      }

      console.log(`Sending email to payment form email: ${email} for ${cartItems.length} products`);

      // Map products to access links
      const accessLinks = cartItems.map(item => {
        const productKey = item.name.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
        const link = PRODUCT_LINKS[productKey] || PRODUCT_LINKS['default'];
        const expectedPrice = PRODUCT_PRICES[productKey];
        
        console.log(`Mapping product "${item.name}" to key "${productKey}" -> ${link}`);
        if (expectedPrice) {
          console.log(`Expected price: ₹${expectedPrice}`);
        }
        return link;
      });

      // Create email transporter
      const transporter = createTransporter();

      // Email options
      const mailOptions = {
        from: `"LORN VINGEST" <${functions.config().email.user}>`,
        to: email,
        subject: '🎉 Your LORN VINGEST Products Are Ready!',
        html: generateEmailHTML(name, cartItems, accessLinks)
      };

      // ✅ SEND EMAIL ONLY TO PAYMENT FORM EMAIL FOR CART PRODUCTS
      await transporter.sendMail(mailOptions);
      
      console.log(`✅ Email sent successfully to payment form email: ${email}`);
      console.log(`✅ Products sent: ${cartItems.map(item => item.name).join(', ')}`);
      
      // Update payment document to mark email as sent
      await snap.ref.update({
        emailSent: true,
        emailSentAt: admin.firestore.FieldValue.serverTimestamp()
      });

      return { 
        success: true, 
        emailSent: email,
        productsCount: cartItems.length,
        products: cartItems.map(item => item.name)
      };
      
    } catch (error) {
      console.error('Error sending email:', error);
      
      // Update payment document to mark email as failed
      await snap.ref.update({
        emailSent: false,
        emailError: error.message,
        emailAttemptedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      
      throw new functions.https.HttpsError('internal', 'Failed to send email');
    }
  });