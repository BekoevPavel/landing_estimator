# 🎯 Google Tag Manager Setup Guide

## ✅ What's Already Done

1. **GTM Script Installed** - Container ID: `GTM-5DJL576W`
2. **Purchase Event Implemented** - Fires when payment succeeds
3. **DataLayer Push Working** - Sends conversion data to GTM

---

## 📋 Next Steps: Configure GTM Dashboard

### Step 1: Go to GTM Dashboard
1. Open [Google Tag Manager](https://tagmanager.google.com)
2. Select container: `GTM-5DJL576W`

---

### Step 2: Create a Trigger for Purchase Event

**Purpose:** This tells GTM to listen for the "purchase" event

1. Click **Triggers** in left sidebar
2. Click **New**
3. Click on the trigger configuration area
4. Choose **Custom Event**
5. Fill in:
   - **Event name:** `purchase`
   - **This trigger fires on:** All Custom Events
6. Name it: `Purchase Event`
7. Click **Save**

---

### Step 3: Create Google Ads Conversion Tag

**Purpose:** Send conversion to Google Ads when purchase happens

#### Option A: If you already have a Google Ads account

1. Click **Tags** in left sidebar
2. Click **New**
3. Click on tag configuration area
4. Choose **Google Ads Conversion Tracking**
5. Fill in:
   - **Conversion ID:** Your Google Ads ID (format: `AW-XXXXXXXXXX`)
   - **Conversion Label:** Your conversion label
   - **Conversion Value:** `{{transaction value}}` (from ecommerce object)
   - **Currency Code:** `USD`
6. Under **Triggering**, select the **Purchase Event** trigger you created
7. Name it: `Google Ads - Purchase Conversion`
8. Click **Save**

#### Option B: If you DON'T have Google Ads conversion setup yet

**First, create a conversion in Google Ads:**
1. Go to [Google Ads](https://ads.google.com)
2. Click **Tools & Settings** (wrench icon)
3. Under **Measurement**, click **Conversions**
4. Click **+ New Conversion Action**
5. Choose **Website**
6. Choose **Manually add code** (we already have GTM)
7. Fill in:
   - **Category:** Purchase
   - **Conversion name:** `EstimateFast Purchase`
   - **Value:** Use different values for each conversion
   - **Count:** One
   - **Conversion window:** 30 days
8. Click **Done**
9. Copy the **Conversion ID** (AW-XXXXXXXXXX) and **Conversion Label**
10. Go back to GTM and follow **Option A** above

---

### Step 4: Set Up DataLayer Variables (For Conversion Value)

1. Click **Variables** in left sidebar
2. Scroll down to **User-Defined Variables**
3. Click **New**
4. Click variable configuration
5. Choose **Data Layer Variable**
6. Variable name: `ecommerce.value`
7. Name it: `Transaction Value`
8. Click **Save**

Repeat for:
- **Variable:** `ecommerce.transaction_id` → Name: `Transaction ID`
- **Variable:** `user_data.email` → Name: `User Email`
- **Variable:** `pricing_variant` → Name: `Pricing Variant`

---

### Step 5: Update Google Ads Tag with Variables

1. Go back to your **Google Ads - Purchase Conversion** tag
2. Update:
   - **Conversion Value:** Change to `{{Transaction Value}}`
   - **Order ID:** `{{Transaction ID}}`
3. Click **Save**

---

### Step 6: Test with GTM Preview Mode

1. In GTM, click **Preview** button (top right)
2. Enter your website URL: `http://localhost:8888` (or your Netlify URL)
3. Click **Connect**
4. Your website will open with GTM Debug panel
5. Go through the payment flow:
   - Select a plan
   - Enter email
   - Click "Simulate Payment Success"
6. In GTM Debug panel, you should see:
   - ✅ **purchase** event fired
   - ✅ **Google Ads Conversion** tag fired
   - ✅ Variables populated (value, email, etc.)

---

### Step 7: Publish Changes

1. Click **Submit** (top right in GTM)
2. Add version name: `Added Purchase Conversion Tracking`
3. Click **Publish**

---

## 🧪 Testing on Your Live Site

### Method 1: Use Dev Mode (Recommended for testing)

1. Run: `netlify dev`
2. Go to `http://localhost:8888`
3. Open **Chrome DevTools** → **Console**
4. Go through checkout flow
5. Look for console log: `🎯 [GTM] Purchase event sent`
6. Check `window.dataLayer` in console:
   ```javascript
   window.dataLayer
   ```
   You should see the purchase event!

### Method 2: Test on Production

1. Deploy your changes: `git push origin main`
2. Wait for Netlify deploy (~2 min)
3. Go to your live site
4. Use GTM Preview mode (see Step 6)
5. Complete a test purchase with test card: `4242 4242 4242 4242`

---

## 📊 Verify Conversions in Google Ads

1. Go to [Google Ads](https://ads.google.com)
2. Click **Tools & Settings**
3. Click **Conversions**
4. Find your `EstimateFast Purchase` conversion
5. You should see conversions appearing (may take a few hours)

---

## 🎨 What Data is Being Sent?

When someone pays, this data goes to GTM:

```javascript
{
  event: 'purchase',
  ecommerce: {
    transaction_id: 'txn_1234567890',
    value: 149,              // Amount paid
    currency: 'USD',
    items: [{
      item_name: 'Pro Plan',
      price: 149,
      quantity: 1
    }]
  },
  user_data: {
    email: 'user@example.com'
  },
  pricing_variant: 'A'       // For A/B test tracking
}
```

---

## 🆘 Troubleshooting

### GTM Preview not working?
- Make sure you're on the same browser
- Disable ad blockers
- Try incognito mode

### Purchase event not firing?
- Check browser console for `🎯 [GTM] Purchase event sent`
- Check `window.dataLayer` in console
- Make sure GTM container published

### Google Ads not showing conversions?
- Can take up to 24 hours to appear
- Check conversion settings (are they enabled?)
- Verify Conversion ID and Label are correct

---

## 🚀 Advanced: Track More Events

You can track other events too! Example:

**Track when someone starts quiz:**
```typescript
import { trackCustomEvent } from './services/gtm.service';

// In your component
trackCustomEvent('quiz_started', {
  user_id: userId,
  page: 'hero'
});
```

**Then create a trigger in GTM for `quiz_started` event!**

---

## 📝 Quick Reference

| What | Where |
|------|-------|
| **GTM Container ID** | `GTM-5DJL576W` |
| **Purchase Event Name** | `purchase` |
| **Code Location** | `src/services/gtm.service.ts` |
| **Fires When** | Payment success (both real & dev mode) |
| **Test Card** | `4242 4242 4242 4242` |

---

## ✅ Checklist

- [ ] Create **Purchase Event** trigger in GTM
- [ ] Create **Google Ads Conversion** in Google Ads
- [ ] Create **Google Ads Conversion Tag** in GTM
- [ ] Set up **DataLayer Variables** in GTM
- [ ] Test with **GTM Preview Mode**
- [ ] **Publish** GTM container
- [ ] Verify conversions in **Google Ads dashboard**

---

**Need help?** Check the console logs - they'll show you exactly what's being sent! 🎯
