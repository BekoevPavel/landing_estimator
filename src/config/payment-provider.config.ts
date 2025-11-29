/**
 * Payment Provider Configuration
 *
 * Hardcoded feature flag to switch between Stripe and Paddle payment providers.
 * This allows testing Paddle integration while keeping Stripe code intact.
 */

/**
 * Available payment providers
 */
export type PaymentProvider = 'stripe' | 'paddle';

/**
 * HARDCODED FEATURE FLAG
 *
 * Change this value to switch between payment providers:
 * - 'stripe': Use Stripe Elements embedded checkout
 * - 'paddle': Use Paddle overlay checkout
 *
 * @default 'paddle'
 */
export const PAYMENT_PROVIDER: PaymentProvider = 'paddle';

/**
 * Helper function to get the current payment provider
 * Useful for conditional logic throughout the app
 */
export function getPaymentProvider(): PaymentProvider {
  return PAYMENT_PROVIDER;
}

/**
 * Check if Stripe is the active payment provider
 */
export function isStripeProvider(): boolean {
  return PAYMENT_PROVIDER === 'stripe';
}

/**
 * Check if Paddle is the active payment provider
 */
export function isPaddleProvider(): boolean {
  return PAYMENT_PROVIDER === 'paddle';
}
