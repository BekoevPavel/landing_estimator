# Google Ads Conversion Tracking - Complete Guide

**Status:** ✅ INSTALLED (Direct Google Ads Tag + GTM)

## 📚 Table of Contents
1. [How It Works - Overview](#how-it-works---overview)
2. [What's Installed](#whats-installed)
3. [The Flow - Start to End](#the-flow---start-to-end)
4. [Code Integration](#code-integration)
5. [Testing & Verification](#testing--verification)

---

## How It Works - Overview

**The Goal:** Track when users complete a purchase on your website and send that data to Google Ads so you can measure ROI and optimize campaigns.

**The Journey:**
```
User clicks Google Ad
  → Lands on your site
  → Fills quiz
  → Selects pricing plan
  → Clicks "Pay Now"
  → [YOUR CODE FIRES EVENT] ✅
  → Google Ads gtag receives conversion
  → Google Ads shows: "1 conversion, cost $0.70"
```

---

## What's Installed

### ✅ Google Ads Tag (Direct)
- **File:** `index.html` (lines 9-16)
- **Conversion ID:** `AW-17653593916`
- **Conversion Label:** `c5_ZCNavirsbELzu8eFB`
- **Purpose:** Tracks conversions and sends directly to Google Ads

### ✅ Google Tag Manager (GTM)
- **File:** `index.html` (lines 18-24)
- **Container ID:** `GTM-5DJL576W`
- **Purpose:** Additional event tracking and flexibility

---

## Key Concepts

### 1. **Tags** (What to Send)

**What is a Tag?**
A tag is a snippet of code that sends data somewhere. Think of it as a "message sender."

**Types of Tags:**
- **Google Tag Manager (GTM)**: The "mailbox" that receives events from your code
- **Google Ads Conversion Tag**: Sends conversion data from GTM to Google Ads
- **Facebook Pixel**: Would send data to Facebook (not used in this project)

**In This Project:**
- We have **GTM tag** installed in `index.html` (receives all events)
- We have **Google Ads Conversion tag** in GTM dashboard (sends purchase events to Google Ads)

### 2. **Triggers** (When to Send)

**What is a Trigger?**
A trigger decides WHEN a tag should fire. It's like a "doorbell" - when someone presses it (trigger), the tag activates.

**Example Triggers:**
- Page View: Fires when any page loads
- Click: Fires when user clicks a button
- Custom Event: Fires when your code sends a specific event (like "purchase")

**In This Project:**
- Trigger: "Custom Event = purchase"
- Meaning: "Fire the Google Ads tag ONLY when we send a 'purchase' event"

### 3. **Conversion Actions** (What to Track)

**What is a Conversion Action?**
A conversion action is a specific goal you want to track in Google Ads (purchase, sign-up, call, etc.)

**In This Project:**
- Conversion Action: "Purchase"
- Conversion ID: `AW-17653593916`
- Conversion Label: `c5_ZCNavirsbELzu8eFB`
- These are unique identifiers so Google Ads knows which conversion action to increment

### 4. **Data Layer** (The Messenger)

**What is Data Layer?**
`window.dataLayer` is a JavaScript array that acts as a communication channel between your code and GTM.

**How it Works:**
```javascript
// Your code "speaks" to GTM by pushing events:
window.dataLayer.push({
  event: 'purchase',           // Event name
  ecommerce: {
    value: 65,                 // Purchase amount
    transaction_id: 'txn_123'  // Unique order ID
  }
});

// GTM "listens" for these events and fires tags
```

---

## The Flow - Start to End

### Step 1: User Clicks Ad (Google Ads)
```
User searches "project estimation tool" on Google
  → Sees your ad
  → Clicks it
  → Google adds tracking parameters to URL: ?gclid=abc123
```

The `gclid` parameter lets Google know this visitor came from your ad.

### Step 2: User Lands on Your Site (Your Code)
```
index.html loads
  → GTM script executes
  → GTM initializes window.dataLayer
  → GTM starts listening for events
```

**Code Location:** `/Users/pavelbekoev/landing_estimator/index.html` (lines 9-15)

### Step 3: User Completes Quiz & Selects Plan (Your App)
```
User goes through quiz
  → Sees pricing page
  → Selects "Professional Pack" for $65
  → Enters email
  → Clicks "Pay Now"
```

### Step 4: Payment Success (Your Code Fires Event)
```
StripeCheckoutForm.tsx
  → stripe.confirmPayment() succeeds
  → Code calls trackPurchase() function
  → trackPurchase() pushes event to dataLayer
```

**Code Location:** `/Users/pavelbekoev/landing_estimator/src/services/gtm.service.ts`

```typescript
export const trackPurchase = (params) => {
  // Send event to GTM
  window.dataLayer.push({
    event: 'purchase',              // ← GTM trigger watches for this
    ecommerce: {
      transaction_id: 'txn_123',    // Unique order ID
      value: 65,                     // Purchase amount
      currency: 'USD',               // Currency
      items: [{
        item_name: 'Professional Pack',
        price: 65
      }]
    },
    user_data: { email: 'user@example.com' }
  });
};
```

### Step 5: GTM Receives Event (Google Tag Manager)
```
GTM sees: window.dataLayer received "purchase" event
  → Checks triggers: "Does any trigger match this event?"
  → Finds trigger: "Custom Event = purchase" ✅
  → Fires associated tags
```

### Step 6: GTM Sends to Google Ads (Google Tag Manager)
```
Google Ads Conversion Tag fires
  → Reads data from dataLayer:
    - Conversion ID: 17653593916
    - Conversion Label: c5_ZCNavirsbELzu8eFB
    - Value: 65
    - Transaction ID: txn_123
  → Sends HTTP request to Google Ads API
```

**GTM Tag Configuration:**
- Tag Type: Google Ads Conversion Tracking
- Conversion ID: `17653593916`
- Conversion Label: `c5_ZCNavirsbELzu8eFB`
- Conversion Value: `{{ecommerce.value}}` (reads from dataLayer)
- Transaction ID: `{{ecommerce.transaction_id}}`

### Step 7: Google Ads Records Conversion (Google Ads Dashboard)
```
Google Ads receives conversion data:
  → Matches gclid from URL (step 1) to ad click
  → Records: "This click resulted in $65 purchase"
  → Updates campaign metrics:
    - Conversions: +1
    - Conversion Value: +$65
    - Cost per Conversion: $0.70 (if CPC was $0.70)
```

Now you can see in Google Ads dashboard:
- **Clicks:** 10
- **Conversions:** 2
- **Conversion Rate:** 20%
- **Cost per Conversion:** $3.50

---

## Code Integration

### File 1: `index.html` (GTM Installation)

**Location:** `/Users/pavelbekoev/landing_estimator/index.html`

**What it does:** Installs Google Tag Manager on every page

```html
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5DJL576W');</script>
<!-- End Google Tag Manager -->
```

**Why here:** Must be in `<head>` so GTM loads before any events fire

### File 2: `src/services/gtm.service.ts` (Event Tracking)

**Location:** `/Users/pavelbekoev/landing_estimator/src/services/gtm.service.ts`

**What it does:** Sends purchase events to GTM

```typescript
declare global {
  interface Window {
    dataLayer: any[];
  }
}

export const trackPurchase = (params: {
  transactionId?: string;
  value: number;
  currency?: string;
  email?: string;
  planName?: string;
  variant?: string;
}) => {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'purchase',                    // Event name (matches GTM trigger)
    ecommerce: {
      transaction_id: params.transactionId || `txn_${Date.now()}`,
      value: params.value,                // Purchase amount
      currency: params.currency || 'USD',
      items: [{
        item_name: params.planName || 'Subscription Plan',
        price: params.value,
        quantity: 1,
      }]
    },
    user_data: { email: params.email },   // Additional data
    pricing_variant: params.variant,      // A/B test variant
  });

  console.log('🎯 [GTM] Purchase event sent:', {
    event: 'purchase',
    value: params.value,
    transactionId: params.transactionId
  });
};
```

**Why this structure:**
- `event: 'purchase'` → Matches GTM trigger
- `ecommerce` → Standard format for e-commerce tracking
- `value` → Used by Google Ads for conversion value
- `transaction_id` → Prevents duplicate conversions

### File 3: `src/components/StripeCheckoutForm.tsx` (Fire Event on Payment Success)

**Location:** `/Users/pavelbekoev/landing_estimator/src/components/StripeCheckoutForm.tsx`

**What it does:** Calls `trackPurchase()` when payment succeeds

```typescript
import { trackPurchase } from "../services/gtm.service";

const handleSubmit = async (e: any) => {
  // ... payment logic ...

  const { error } = await stripe.confirmPayment({
    elements,
    confirmParams: { return_url: window.location.origin },
    redirect: "if_required",
  });

  if (error) {
    onError(error.message);
  } else {
    // ✅ Payment successful!

    // 1. Send conversion to Google Ads via GTM
    if (amount && planName) {
      trackPurchase({
        value: amount,              // $65
        currency: 'USD',
        email: email,
        planName: planName,         // "Professional Pack"
        variant: variant || 'A',    // A/B test variant
      });
    }

    // 2. Continue with success flow
    onSuccess();
  }
};
```

**Why here:** This is where we know payment succeeded, so it's the perfect place to fire the conversion event

### File 4: `src/components/pricing/CheckoutForm.tsx` (Alternative: Dev Mode Testing)

**Location:** `/Users/pavelbekoev/landing_estimator/src/components/pricing/CheckoutForm.tsx`

**What it does:** Also fires conversion event (currently disabled in your code)

This was used for dev mode simulation, but you've disabled it to use real Stripe in all modes.

---

## Google Tag Manager Setup

### Step 1: Create Variables

**Go to:** GTM Dashboard → Variables → New

**Variable 1: ecommerce.value**
- Variable Type: Data Layer Variable
- Data Layer Variable Name: `ecommerce.value`
- This reads the purchase amount from dataLayer

**Variable 2: ecommerce.transaction_id**
- Variable Type: Data Layer Variable
- Data Layer Variable Name: `ecommerce.transaction_id`
- This reads the transaction ID to prevent duplicates

### Step 2: Create Trigger

**Go to:** GTM Dashboard → Triggers → New

**Trigger Configuration:**
- Trigger Type: Custom Event
- Event name: `purchase`
- This trigger fires on ALL events: `All Custom Events`

**What this means:** "Fire associated tags whenever dataLayer receives event: 'purchase'"

### Step 3: Create Tag

**Go to:** GTM Dashboard → Tags → New

**Tag Configuration:**
- Tag Type: **Google Ads Conversion Tracking**
- Conversion ID: `17653593916`
- Conversion Label: `c5_ZCNavirsbELzu8eFB`
- Conversion Value: Click `+` → Select Variable → `ecommerce.value`
- Transaction ID: Click `+` → Select Variable → `ecommerce.transaction_id`
- Currency Code: `USD`

**Triggering:**
- Select the "purchase" trigger you created in Step 2

**Tag Name:** "Google Ads - Purchase Conversion"

### Step 4: Test with Preview Mode

**Go to:** GTM Dashboard → Preview (top right)

1. Enter your site URL: `localhost:8888`
2. GTM opens your site in preview mode
3. Complete a test purchase
4. Check GTM debugger:
   - Look for "purchase" event
   - Verify "Google Ads - Purchase Conversion" tag fired
   - Check values: ecommerce.value = 65, transaction_id = txn_123

### Step 5: Publish

**Go to:** GTM Dashboard → Submit (top right)

- Version Name: "Add Google Ads conversion tracking"
- Description: "Track purchase conversions with value and transaction ID"
- Click **Publish**

---

## Testing & Verification

### Test 1: Check dataLayer (Browser Console)

1. Open your site
2. Open browser DevTools (F12) → Console
3. Complete a test purchase
4. Type in console: `window.dataLayer`
5. Look for your purchase event:

```javascript
[
  // ... other events ...
  {
    event: "purchase",
    ecommerce: {
      transaction_id: "txn_1699123456",
      value: 65,
      currency: "USD",
      items: [{item_name: "Professional Pack", price: 65, quantity: 1}]
    },
    user_data: {email: "test@example.com"},
    pricing_variant: "A"
  }
]
```

✅ **Success:** If you see this, your code is working!

### Test 2: GTM Preview Mode

1. GTM Dashboard → Preview
2. Enter site URL
3. Complete purchase
4. Check GTM debugger:
   - **Tags Fired:** Should show "Google Ads - Purchase Conversion"
   - **Variables:** Click to see `ecommerce.value = 65`

✅ **Success:** Tag fired with correct values

### Test 3: Google Ads (Real Conversion)

**Note:** Conversions take 24-48 hours to appear in Google Ads

1. Complete a real purchase on production site
2. Wait 24-48 hours
3. Go to Google Ads → Campaigns
4. Check "Conversions" column
5. Should show: **1 conversion**

✅ **Success:** Conversion tracked!

### Common Issues

**Issue 1: "Conversion tracking incomplete"**
- **Cause:** GTM tag not configured or not published
- **Fix:** Complete GTM setup steps above, click Publish

**Issue 2: dataLayer is empty**
- **Cause:** GTM script not loaded
- **Fix:** Check `index.html` has GTM script in `<head>`

**Issue 3: Tag not firing in GTM preview**
- **Cause:** Trigger doesn't match event name
- **Fix:** Ensure trigger event name = "purchase" (exact match)

**Issue 4: No conversions in Google Ads after 48 hours**
- **Cause:** User didn't come from Google Ad (no gclid)
- **Fix:** Click your own ad, then complete purchase

---

## How Google Knows You Clicked to Purchase

### The Magic: gclid Parameter

**When user clicks your Google Ad:**
```
User sees ad at: google.com/search?q=project+estimation
  ↓ User clicks ad
Google redirects to: https://yoursite.com/?gclid=abc123xyz
```

The `gclid` (Google Click ID) is a unique identifier for that specific ad click.

**Google stores in cookie:**
```javascript
// Browser cookie after clicking ad:
_gac_UA-123456 = "1.1699123456.abc123xyz"
```

**When conversion fires:**
```javascript
// Your code sends:
window.dataLayer.push({ event: 'purchase', value: 65 })

// GTM sends to Google Ads:
{
  conversion_id: "17653593916",
  value: 65,
  gclid: "abc123xyz"  // ← Read from cookie!
}
```

**Google Ads matches:**
```
Ad Click (gclid: abc123xyz) → Conversion (gclid: abc123xyz)
= "This $65 conversion came from Campaign #1"
```

### Without gclid (Organic Traffic)

If user comes from organic search or direct URL:
- No gclid in URL
- Conversion still fires and recorded
- But Google Ads can't attribute it to any campaign
- Conversion shows as "unattributed"

---

## Summary: The Complete Picture

```
┌─────────────────────────────────────────────────────────────┐
│  1. USER CLICKS AD                                          │
│     Google adds ?gclid=abc123 to URL                        │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  2. USER LANDS ON SITE                                      │
│     index.html → GTM script loads → dataLayer initialized   │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  3. USER COMPLETES PURCHASE                                 │
│     StripeCheckoutForm.tsx → trackPurchase() called         │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  4. YOUR CODE SENDS EVENT                                   │
│     gtm.service.ts → window.dataLayer.push({                │
│       event: 'purchase',                                    │
│       ecommerce: { value: 65, transaction_id: 'txn_123' }   │
│     })                                                      │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  5. GTM RECEIVES EVENT                                      │
│     GTM checks triggers → "purchase" trigger matches ✅     │
│     GTM fires Google Ads Conversion Tag                     │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  6. GTM SENDS TO GOOGLE ADS                                 │
│     HTTP request to googleadservices.com/pagead/conversion  │
│     with: {                                                 │
│       conversion_id: 17653593916,                           │
│       conversion_label: c5_ZCNavirsbELzu8eFB,              │
│       value: 65,                                            │
│       transaction_id: txn_123,                              │
│       gclid: abc123  ← from cookie                          │
│     }                                                       │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  7. GOOGLE ADS RECORDS CONVERSION                           │
│     Matches gclid to original ad click                      │
│     Updates campaign: +1 conversion, +$65 value             │
│     Shows in dashboard: "Campaign #1: 1 conversion"         │
└─────────────────────────────────────────────────────────────┘
```

---

## Quick Reference

**Your GTM Container:** `GTM-5DJL576W`
**Google Ads Conversion ID:** `17653593916`
**Conversion Label:** `c5_ZCNavirsbELzu8eFB`
**Event Name:** `purchase`

**Code Files:**
- GTM Install: `index.html` (line 9-15)
- Event Sender: `src/services/gtm.service.ts`
- Event Trigger: `src/components/StripeCheckoutForm.tsx` (line 46-55)

**GTM Dashboard:**
- Variables: `ecommerce.value`, `ecommerce.transaction_id`
- Trigger: Custom Event = "purchase"
- Tag: Google Ads Conversion Tracking

**Testing:**
1. `window.dataLayer` in console → See events
2. GTM Preview Mode → See tags fire
3. Google Ads dashboard (24-48h) → See conversions

---

**Last Updated:** November 7, 2025
**Status:** ✅ Code integrated, ⚠️ GTM tag setup needed
**Next Step:** Configure Google Ads Conversion Tag in GTM → Publish → Test
