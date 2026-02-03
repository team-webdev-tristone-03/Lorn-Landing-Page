// EmailJS Integration for Payment Success Emails
// Initialize EmailJS with your public key
// Replace 'YOUR_EMAILJS_PUBLIC_KEY' with your actual EmailJS public key
if (typeof emailjs !== 'undefined') {
    emailjs.init("5j9Iy-_b437ZZJXJ3");
} else {
    console.error('EmailJS library not loaded. Please include EmailJS script in your HTML.');
}

// Product to access link mapping
const PRODUCT_LINKS = {
    "All India Leads": "https://drive.google.com/drive/folders/1K2T07_eJizP0C-k5NZt1rdIlFh8vYhG9?usp=sharing",
    "Salaried Employee Verified Leads": "https://drive.google.com/drive/folders/1SLosz2Np_ONd3beyfa-94Xs92BBRj08S?usp=sharing",
    "Verified Employees Leads": "https://drive.google.com/drive/folders/1kBDqtdwjdkKj54aJFBbD3AqYj8kIZX_8?usp=sharing",
    "Pan India Database": "https://drive.google.com/drive/folders/13dNVzV1BvdpmDi0-YZ5YR5f7tkQ2uctn?usp=sharing",
    "1 Crore+ Bulk Leads": "https://drive.google.com/drive/folders/1g41XPgN_V70ditroHacBPlA7dwRfpqQt?usp=sharing",
    "10,000+ Reels & Ads for Instagram": "https://drive.google.com/drive/folders/1BLv2mYcyYsMCQeuTaOeuD2zLyYGbCPT5?usp=sharing",
    "1 Million+ Reels & Videos": "https://drive.google.com/drive/folders/1dGo1nY01o86pYmRudMXT-09hxGqb2PRo?usp=sharing",
    "1000+ Mobile Apps to Publish": "https://drive.google.com/drive/folders/15rOKATx9AfGJsLCWhQ4m7DJ96xu0xxUw?usp=sharing",
    "1000+ Mobile Apps for Play Store & App Store": "https://drive.google.com/drive/folders/10Z1xQf_Nxpq4ohgDz7oWZBs9ShRsP1tB?usp=sharing"
};

// Format cart items into HTML email content
function formatCartItemsForEmail(cartItems) {
    if (!cartItems || cartItems.length === 0) {
        return '<p>No items found in cart.</p>';
    }

    let itemsHtml = '';
    cartItems.forEach((item, index) => {
        const accessLink = PRODUCT_LINKS[item.name] || '#';
        itemsHtml += `
            <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 15px; text-align: left;">
                    <strong>${item.name}</strong>
                </td>
                <td style="padding: 15px; text-align: center;">
                    ₹${item.price}
                </td>
                <td style="padding: 15px; text-align: center;">
                    <a href="${accessLink}" 
                       style="background: linear-gradient(45deg, #ff00ff, #00ffff); 
                              color: white; 
                              padding: 8px 16px; 
                              text-decoration: none; 
                              border-radius: 5px; 
                              font-weight: bold;
                              display: inline-block;">
                        Access Now
                    </a>
                </td>
            </tr>
        `;
    });

    return `
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <thead>
                <tr style="background: linear-gradient(45deg, #ff00ff, #00ffff); color: white;">
                    <th style="padding: 15px; text-align: left;">Product</th>
                    <th style="padding: 15px; text-align: center;">Price</th>
                    <th style="padding: 15px; text-align: center;">Access Link</th>
                </tr>
            </thead>
            <tbody>
                ${itemsHtml}
            </tbody>
        </table>
    `;
}

// Generate complete email HTML content
function generateEmailContent(customerName, cartItems, totalAmount, paymentId) {
    const currentDate = new Date().toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const productsTable = formatCartItemsForEmail(cartItems);

    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Payment Successful - LORN VINGEST</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            
            <!-- Header -->
            <div style="text-align: center; background: linear-gradient(135deg, #000000 0%, #1a0033 50%, #000000 100%); padding: 30px; border-radius: 10px; margin-bottom: 30px;">
                <h1 style="color: #ff00ff; margin: 0; font-size: 28px; text-shadow: 0 0 10px rgba(255, 0, 255, 0.5);">
                    LORN VINGEST
                </h1>
                <p style="color: #00ffff; margin: 10px 0 0 0; font-size: 14px;">
                    Digital Products & Services
                </p>
            </div>

            <!-- Success Message -->
            <div style="background: #f8f9fa; padding: 25px; border-radius: 10px; border-left: 5px solid #00ff88; margin-bottom: 30px;">
                <h2 style="color: #00ff88; margin: 0 0 10px 0; font-size: 24px;">
                    🎉 Payment Successful!
                </h2>
                <p style="margin: 0; font-size: 16px;">
                    Dear <strong>${customerName}</strong>, thank you for your purchase! Your payment has been processed successfully.
                </p>
            </div>

            <!-- Payment Details -->
            <div style="background: #fff; padding: 20px; border-radius: 10px; border: 1px solid #ddd; margin-bottom: 30px;">
                <h3 style="color: #333; margin: 0 0 15px 0; font-size: 18px; border-bottom: 2px solid #ff00ff; padding-bottom: 5px;">
                    Payment Details
                </h3>
                <p><strong>Payment ID:</strong> ${paymentId}</p>
                <p><strong>Date:</strong> ${currentDate}</p>
                <p><strong>Total Amount:</strong> <span style="color: #00ff88; font-size: 18px; font-weight: bold;">₹${totalAmount}</span></p>
            </div>

            <!-- Products & Access Links -->
            <div style="background: #fff; padding: 20px; border-radius: 10px; border: 1px solid #ddd; margin-bottom: 30px;">
                <h3 style="color: #333; margin: 0 0 15px 0; font-size: 18px; border-bottom: 2px solid #00ffff; padding-bottom: 5px;">
                    Your Products & Access Links
                </h3>
                ${productsTable}
                <div style="background: #e8f4fd; padding: 15px; border-radius: 5px; margin-top: 20px;">
                    <p style="margin: 0; font-size: 14px; color: #0066cc;">
                        <strong>📌 Important:</strong> Click on the "Access Now" buttons above to access your purchased products. Save these links for future reference.
                    </p>
                </div>
            </div>

            <!-- Support Information -->
            <div style="background: #fff3cd; padding: 20px; border-radius: 10px; border: 1px solid #ffeaa7; margin-bottom: 30px;">
                <h3 style="color: #856404; margin: 0 0 10px 0; font-size: 16px;">
                    Need Help?
                </h3>
                <p style="margin: 0; font-size: 14px; color: #856404;">
                    If you have any questions or need assistance accessing your products, please contact us at:
                    <br><strong>Email:</strong> info@lornvingest.com
                    <br><strong>Support:</strong> Available 24/7
                </p>
            </div>

            <!-- Footer -->
            <div style="text-align: center; padding: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
                <p style="margin: 0 0 10px 0;">
                    This is an automated email. Please do not reply to this email.
                </p>
                <p style="margin: 0;">
                    © 2025 LORN VINGEST. All Rights Reserved.
                </p>
                <div style="margin-top: 15px;">
                    <a href="https://www.instagram.com/lornvingest" style="color: #ff00ff; text-decoration: none; margin: 0 10px;">Instagram</a>
                    <a href="https://x.com/LornVingest" style="color: #00ffff; text-decoration: none; margin: 0 10px;">Twitter</a>
                </div>
            </div>

        </body>
        </html>
    `;
}

// Send email using EmailJS
async function sendPaymentSuccessEmail(customerEmail, customerName, cartItems, totalAmount, paymentId) {
    try {
        console.log('Preparing to send email to:', customerEmail);
        
        const emailContent = generateEmailContent(customerName, cartItems, totalAmount, paymentId);
        
        const templateParams = {
            to_email: customerEmail,
            to_name: customerName,
            subject: `Payment Successful - Your LORN VINGEST Products Are Ready!`,
            html_content: emailContent,
            customer_name: customerName,
            payment_id: paymentId,
            total_amount: totalAmount,
            purchase_date: new Date().toLocaleDateString('en-IN')
        };

        const response = await emailjs.send(
            'service_7epwwdf',    // Replace with your EmailJS service ID
            'template_vx1jz5a',   // Replace with your EmailJS template ID
            templateParams
        );

        console.log('Email sent successfully:', response);
        return { success: true, response };
        
    } catch (error) {
        console.error('Failed to send email:', error);
        return { success: false, error };
    }
}

// Example usage after successful payment
function handlePaymentSuccess(paymentData) {
    const { customerEmail, customerName, cartItems, totalAmount, paymentId, sessionId } = paymentData;
    
    // Send confirmation email
    sendPaymentSuccessEmail(customerEmail, customerName, cartItems, totalAmount, paymentId)
        .then(result => {
            if (result.success) {
                console.log('Confirmation email sent successfully');
                // Clear cart from Firebase after successful payment
                clearCartFromFirebase(sessionId);
            } else {
                console.error('Failed to send confirmation email:', result.error);
                // Still clear cart even if email fails
                clearCartFromFirebase(sessionId);
            }
        });
}

// Clear cart from Firebase
async function clearCartFromFirebase(sessionId) {
    try {
        const db = firebase.firestore();
        await db.collection('carts').doc(sessionId).delete();
        console.log('Cart cleared from Firebase');
        if (typeof cartManager !== 'undefined') {
            cartManager.cart = [];
            cartManager.updateCartDisplay();
        }
    } catch (error) {
        console.error('Error clearing cart from Firebase:', error);
    }
}