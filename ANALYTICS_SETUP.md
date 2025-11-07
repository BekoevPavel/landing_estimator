# Analytics & Payment Setup

## ✅ What's Implemented

### 1. Google Tag Manager (GTM)
- **Container ID**: `GTM-5DJL576W`
- **Location**: `index.html` (head + body noscript)
- **Events**: Purchase tracking on successful payments
- **Service**: `src/services/gtm.service.ts`

### 2. Google Ads Conversion Tracking
- **Conversion ID**: `AW-17653593916`
- **Conversion Label**: `c5_ZCNavirsbELzu8eFB`
- **Configured in**: GTM Dashboard
- **Triggers on**: Payment success (both real & dev mode)

### 3. PostHog Analytics
- **Events tracked**:
  - Landing CTA clicks
  - Quiz start/answers/completion
  - Language changes
  - Results viewed
  - Continue to pricing
  - Payment attempts & success
- **Session Recording**: Enabled (records user interactions)
- **A/B Testing**: Pricing variant tracking (Variant A/B)
- **Location**: `src/analytics/events.ts`

### 4. Dev Mode Helpers
**Show only on localhost (ports 3000/8888)**:
- PostHog Debug Panel (top-left) - displays A/B test variant & pricing
- "Тест Stripe" button (bottom-right) - opens test payment modal
- Stripe simulation helper - "Simulate Payment Success" button

**Hidden on production domain**: All debug helpers auto-hide

### 5. Stripe Payment Integration
- **Improved styling**: Better gaps, padding, form height
- **Email input**: Enhanced with better spacing (mb-6, h-12)
- **Payment form**: Wrapped in card with subtle background
- **Button**: Increased height (h-12), better typography

## Files Modified

### Core Setup
- `index.html` - GTM scripts
- `src/services/gtm.service.ts` - Purchase tracking
- `src/analytics/events.ts` - All PostHog events
- `src/config/env.config.ts` - Unified dev mode detection

### Components with Tracking
- `src/components/pricing/CheckoutForm.tsx` - Stripe helper (dev only)
- `src/components/StripeCheckoutForm.tsx` - GTM tracking + improved styling
- `src/components/landing/sections/LandingHeroSection.tsx` - CTA tracking
- `src/components/HeroSection.tsx` - Quiz start tracking
- `src/components/LanguageSwitcher.tsx` - Language change tracking
- `src/components/ResultScreen.tsx` - Results tracking
- `src/App.tsx` - Dev mode helpers visibility

## Dev vs Production

| Feature | Dev Mode (localhost) | Production (real domain) |
|---------|---------------------|--------------------------|
| PostHog Debug Panel | ✅ Visible | ❌ Hidden |
| Stripe Test Button | ✅ Visible | ❌ Hidden |
| Stripe Helper | ✅ Visible | ❌ Hidden |
| Real Stripe Form | ✅ Works | ✅ Works |
| GTM Tracking | ✅ Works | ✅ Works |
| PostHog Events | ✅ Works | ✅ Works |

## Testing

### Dev Mode
```bash
netlify dev
# Open http://localhost:8888
# See all debug helpers
```

### Production
Deploy to Netlify - all helpers auto-hide, only real payment form shows.
