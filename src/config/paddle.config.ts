/**
 * Paddle Payment Configuration
 *
 * Centralized configuration for Paddle.js integration.
 * Contains credentials, price mappings, and checkout settings.
 *
 * PRODUCTION CREDENTIALS - LIVE MODE
 *
 * =============================================================================
 * LOCAL DEVELOPMENT / TESTING NOTES
 * =============================================================================
 *
 * HTTPS REQUIREMENT:
 * Paddle checkout requires HTTPS even for local testing. If you see errors like:
 * "Blocked a frame with origin 'http://localhost:...' from accessing a frame
 * with origin 'https://buy.paddle.com'"
 *
 * SOLUTIONS:
 * 1. Use `netlify dev` instead of `npm run dev` - Netlify CLI provides HTTPS
 *    automatically with a self-signed certificate.
 *
 * 2. Deploy to a staging/preview environment (Netlify deploy previews work).
 *
 * 3. Use ngrok or similar to create an HTTPS tunnel:
 *    `ngrok http 3001` then use the https URL provided.
 *
 * SANDBOX MODE:
 * For testing without real payments, you can:
 * 1. Set `environment: 'sandbox'` below (and use sandbox credentials)
 * 2. Use Paddle's test cards: https://developer.paddle.com/concepts/payment-methods/test-payment-methods
 *
 * Current config uses PRODUCTION credentials for live payments.
 * =============================================================================
 */

/**
 * Paddle Credentials
 *
 * Using environment variables with fallback to hardcoded values for production.
 * In production, these are LIVE credentials.
 */
export const PADDLE_CONFIG = {
  /**
   * Client-side token for Paddle.js initialization
   * Used in the browser to authenticate checkout requests
   */
  clientToken:
    import.meta.env.VITE_PADDLE_CLIENT_TOKEN ||
    'live_ed7863999d9815e348532d2383a',

  /**
   * Seller ID for identifying the merchant account
   */
  sellerId: import.meta.env.VITE_PADDLE_SELLER_ID || '265283',

  /**
   * Environment mode
   * 'sandbox' for testing, 'production' for live payments
   */
  environment: 'production' as const,
} as const;

/**
 * Paddle Price IDs by Plan and A/B Test Variant
 *
 * Maps each pricing plan to its corresponding Paddle price ID
 * for both A/B test variants.
 */
export const PADDLE_PRICE_IDS = {
  /**
   * Variant A: Baseline Pricing
   * Starter: $5, Professional: $15, Max: $50
   */
  variantA: {
    starter: 'pri_01kb843d5331ana8t0a8g2010g', // $5
    professional: 'pri_01kb845pb30ww55997ms9rnr4f', // $15
    agency: 'pri_01kb84727pqrersph1af1071j9', // $50 (Max plan)
  },

  /**
   * Variant B: Higher Pricing Test
   * Starter: $10, Professional: $30, Max: $80
   */
  variantB: {
    starter: 'pri_01kb844n77w7s0rq1pxq47jv4p', // $10
    professional: 'pri_01kb846aqyhtvd6t3adpwz7sa0', // $30
    agency: 'pri_01kb847ykxfy578n87mqq6ksk3', // $80 (Max plan)
  },
} as const;

/**
 * Plan ID type for type safety
 */
export type PaddlePlanId = keyof typeof PADDLE_PRICE_IDS.variantA;

/**
 * Get the Paddle price ID for a specific plan and variant
 *
 * @param planId - The plan identifier (starter, professional, agency)
 * @param variant - The A/B test variant (A or B)
 * @returns The corresponding Paddle price ID
 */
export function getPaddlePriceId(
  planId: PaddlePlanId,
  variant: 'A' | 'B'
): string {
  const variantPrices =
    variant === 'B' ? PADDLE_PRICE_IDS.variantB : PADDLE_PRICE_IDS.variantA;
  return variantPrices[planId];
}

/**
 * Paddle checkout display settings
 */
export const PADDLE_CHECKOUT_SETTINGS = {
  /**
   * Overlay mode - Paddle handles the full checkout UI
   */
  displayMode: 'overlay' as const,

  /**
   * Theme matching our dark UI
   */
  theme: 'dark' as const,

  /**
   * Locale for checkout UI
   */
  locale: 'en' as const,

  /**
   * Allow quantity changes in checkout
   */
  allowQuantity: false,

  /**
   * Show discount code input
   */
  showAddDiscounts: true,
} as const;

/**
 * Validation helpers
 */
export const PADDLE_VALIDATION = {
  emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
} as const;
