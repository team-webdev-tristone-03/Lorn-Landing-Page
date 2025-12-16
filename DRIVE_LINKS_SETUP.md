# 🔗 Google Drive Links Configuration

## Where to Add Your Drive Links

Open `functions/index.js` and find the `PRODUCT_LINKS` section (around line 7-20).

## How Product Matching Works

The system automatically converts your product names to keys:
- **"SEO Course"** → `seo_course`
- **"Digital Marketing Bundle"** → `digital_marketing_bundle`  
- **"Social Media Templates"** → `social_media_templates`

## Step-by-Step Setup

### 1. Get Your Google Drive Links
- Create folders in Google Drive for each product
- Set sharing to "Anyone with the link can view"
- Copy the folder URLs

### 2. Add Links to Code
Replace the placeholder links in `functions/index.js`:

```javascript
const PRODUCT_LINKS = {
  'seo_course': 'https://drive.google.com/drive/folders/1ABC123XYZ...',
  'digital_marketing_bundle': 'https://drive.google.com/drive/folders/1DEF456ABC...',
  'social_media_templates': 'https://drive.google.com/drive/folders/1GHI789DEF...',
  
  // Add your actual products here:
  'your_product_name': 'https://drive.google.com/drive/folders/YOUR_ACTUAL_LINK',
  
  'default': 'https://drive.google.com/drive/folders/YOUR_DEFAULT_FOLDER'
};
```

### 3. Test Product Mapping
After deployment, check the function logs to see how products are mapped:
```bash
firebase functions:log
```

You'll see logs like:
```
Mapping product "SEO Course" to key "seo_course" -> https://drive.google.com/...
```

## Example Configuration

If your products are:
- "Advanced SEO Masterclass"
- "Social Media Growth Kit" 
- "Email Marketing Templates"

Your configuration would be:
```javascript
const PRODUCT_LINKS = {
  'advanced_seo_masterclass': 'https://drive.google.com/drive/folders/1ABC...',
  'social_media_growth_kit': 'https://drive.google.com/drive/folders/1DEF...',
  'email_marketing_templates': 'https://drive.google.com/drive/folders/1GHI...',
  'default': 'https://drive.google.com/drive/folders/1DEFAULT...'
};
```

## Important Notes

- ✅ Email is automatically taken from the payment form
- ✅ Links are sent only after successful payment
- ✅ Each product gets its specific Drive link
- ✅ Fallback to 'default' link if product not found
- ✅ Cannot be triggered from browser (secure server-side only)