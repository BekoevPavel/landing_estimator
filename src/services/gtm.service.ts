/**
 * Google Tag Manager Service
 *
 * Handles all GTM dataLayer events for tracking conversions
 */

// Extend Window interface to include dataLayer
declare global {
  interface Window {
    dataLayer: any[];
  }
}

/**
 * Push a purchase/conversion event to Google Tag Manager
 * This will be picked up by GTM and sent to Google Ads
 */
export const trackPurchase = (params: {
  transactionId?: string;
  value: number;
  currency?: string;
  email?: string;
  planName?: string;
  variant?: string;
}) => {
  if (typeof window === 'undefined') return;

  // Initialize dataLayer if it doesn't exist
  window.dataLayer = window.dataLayer || [];

  // Push purchase event to GTM
  window.dataLayer.push({
    event: 'purchase',
    ecommerce: {
      transaction_id: params.transactionId || `txn_${Date.now()}`,
      value: params.value,
      currency: params.currency || 'USD',
      items: [
        {
          item_name: params.planName || 'Subscription Plan',
          price: params.value,
          quantity: 1,
        }
      ]
    },
    user_data: {
      email: params.email,
    },
    // Custom parameters for internal tracking
    pricing_variant: params.variant,
  });

  console.log('🎯 [GTM] Purchase event sent:', {
    value: params.value,
    plan: params.planName,
    variant: params.variant,
  });
};

/**
 * Track email input (lead generation)
 */
export const trackEmailCapture = (email: string) => {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];

  window.dataLayer.push({
    event: 'lead_capture',
    user_data: {
      email,
    },
  });

  console.log('🎯 [GTM] Email captured:', email);
};

/**
 * Track custom events
 */
export const trackCustomEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];

  window.dataLayer.push({
    event: eventName,
    ...params,
  });

  console.log(`🎯 [GTM] Custom event: ${eventName}`, params);
};
