/**
 * Paddle Payment Configuration
 *
 * Centralized configuration for Paddle.js integration.
 * Contains credentials, price mappings, and checkout settings.
 *
 * =============================================================================
 * ENVIRONMENT DETECTION
 * =============================================================================
 *
 * DEV (localhost / import.meta.env.DEV):
 *   - Uses SANDBOX Paddle credentials
 *   - Redirects to http://localhost:3050
 *   - Test card: 4242 4242 4242 4242
 *
 * PROD (deployed on Netlify):
 *   - Uses PRODUCTION Paddle credentials
 *   - Redirects to https://app.estimatefast.ink
 *   - Real payments processed
 *
 * =============================================================================
 * LOCAL DEVELOPMENT NOTES
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
 * =============================================================================
 */

/**
 * Detect if we're in development mode
 * - import.meta.env.DEV is true when running locally with Vite
 * - Can be overridden with VITE_PADDLE_ENV=production for testing prod locally
 */
const isDev = import.meta.env.DEV && import.meta.env.VITE_PADDLE_ENV !== 'production';

/**
 * Paddle Credentials
 *
 * Automatically switches between sandbox (dev) and production (deployed) credentials.
 */
export const PADDLE_CONFIG = {
  /**
   * Client-side token for Paddle.js initialization
   * SANDBOX: test_3da85ec98dee6288aaa410ee359
   * PRODUCTION: Set VITE_PADDLE_CLIENT_TOKEN in Netlify env vars
   */
  clientToken: isDev
    ? 'test_3da85ec98dee6288aaa410ee359'
    : (import.meta.env.VITE_PADDLE_CLIENT_TOKEN || 'live_ed7863999d9815e348532d2383a'),

  /**
   * Seller ID for identifying the merchant account
   */
  sellerId: import.meta.env.VITE_PADDLE_SELLER_ID || '265283',

  /**
   * Environment mode - automatically set based on dev/prod
   * 'sandbox' for local development, 'production' for deployed app
   */
  environment: (isDev ? 'sandbox' : 'production') as 'sandbox' | 'production',
} as const;

/**
 * Paddle Price IDs - Sandbox (for local development)
 */
const SANDBOX_PRICE_IDS = {
  variantA: {
    starter: 'pri_01kb9zcgbhrh4c9gtke0ppspq4',     // $5
    professional: 'pri_01kb9zdn868qm2wjt8rswtjxb1', // $15
    max: 'pri_01kb9zezvwpjzb2f8xwc4ay7bv',         // $50
  },
  variantB: {
    starter: 'pri_01kb9zd3yxap1x24w00gjefhqk',     // $10
    professional: 'pri_01kb9zed3v16wsecwtfqefk6sd', // $30
    max: 'pri_01kb9zfng1mamqdak665qtf62c',         // $80
  },
};

/**
 * Paddle Price IDs - Production (for deployed app)
 */
const PRODUCTION_PRICE_IDS = {
  variantA: {
    starter: 'pri_01kb843d5331ana8t0a8g2010g',     // $5
    professional: 'pri_01kb845pb30ww55997ms9rnr4f', // $15
    max: 'pri_01kb84727pqrersph1af1071j9',         // $50
  },
  variantB: {
    starter: 'pri_01kb844n77w7s0rq1pxq47jv4p',     // $10
    professional: 'pri_01kb846aqyhtvd6t3adpwz7sa0', // $30
    max: 'pri_01kb847ykxfy578n87mqq6ksk3',         // $80
  },
};

/**
 * Paddle Price IDs by Plan and A/B Test Variant
 * Automatically selects sandbox or production based on environment
 */
export const PADDLE_PRICE_IDS = isDev ? SANDBOX_PRICE_IDS : PRODUCTION_PRICE_IDS;

/**
 * Plan ID type for type safety
 */
export type PaddlePlanId = keyof typeof PADDLE_PRICE_IDS.variantA;

/**
 * Get the Paddle price ID for a specific plan and variant
 *
 * @param planId - The plan identifier (starter, professional, max)
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

/**
 * Plan type mapping for auth token generation
 * Maps plan IDs to auth token plan types
 */
export const PLAN_TYPE_MAPPING = {
  starter: 'basic',
  professional: 'pro',
  max: 'max',
} as const;

export type AuthPlanType = (typeof PLAN_TYPE_MAPPING)[keyof typeof PLAN_TYPE_MAPPING];

/**
 * Get auth plan type from plan ID
 */
export function getAuthPlanType(planId: PaddlePlanId): AuthPlanType {
  return PLAN_TYPE_MAPPING[planId];
}

/**
 * Main app URL for auth redirect after successful Paddle checkout
 * DEV: http://localhost:3050
 * PROD: https://app.estimatefast.ink
 */
export const MAIN_APP_URL = isDev
  ? 'http://localhost:3050'
  : (import.meta.env.VITE_MAIN_APP_URL || 'https://app.estimatefast.ink');

/**
 * Token generation endpoint
 * In dev mode with HTTPS, we need to call the Netlify functions server on port 8888
 */
export const TOKEN_ENDPOINT = import.meta.env.DEV
  ? 'http://localhost:8888/.netlify/functions/create-checkout-token'
  : '/.netlify/functions/create-checkout-token';
