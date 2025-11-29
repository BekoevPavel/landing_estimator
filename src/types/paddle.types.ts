/**
 * Type definitions for Paddle.js v2 integration
 *
 * These types provide TypeScript support for the Paddle.js SDK
 * which is loaded via CDN script tag.
 */

/**
 * Paddle checkout item
 */
export interface PaddleCheckoutItem {
  priceId: string;
  quantity: number;
}

/**
 * Customer data for checkout
 */
export interface PaddleCustomerData {
  email?: string;
  address?: {
    countryCode?: string;
    postalCode?: string;
  };
}

/**
 * Custom metadata to pass through checkout
 */
export interface PaddleCustomData {
  planName?: string;
  planId?: string;
  variant?: string;
  userId?: string;
  [key: string]: string | undefined;
}

/**
 * Checkout display settings
 */
export interface PaddleCheckoutSettings {
  displayMode?: 'overlay' | 'inline';
  theme?: 'light' | 'dark';
  locale?: string;
  allowQuantity?: boolean;
  showAddDiscounts?: boolean;
  frameTarget?: string;
  frameInitialHeight?: number;
  frameStyle?: string;
  successUrl?: string;
}

/**
 * Options for Paddle.Checkout.open()
 */
export interface PaddleCheckoutOptions {
  items: PaddleCheckoutItem[];
  customer?: PaddleCustomerData;
  customData?: PaddleCustomData;
  settings?: PaddleCheckoutSettings;
}

/**
 * Checkout event data structure
 */
export interface PaddleCheckoutEventData {
  checkout: {
    id: string;
    customer_id?: string;
    customer?: {
      email: string;
    };
    items: Array<{
      price_id: string;
      product: {
        id: string;
        name: string;
      };
      price: {
        id: string;
        product_id: string;
        unit_price: {
          amount: string;
          currency_code: string;
        };
      };
      quantity: number;
    }>;
    totals: {
      subtotal: string;
      discount: string;
      tax: string;
      total: string;
      currency_code: string;
    };
    recurring_totals?: {
      subtotal: string;
      discount: string;
      tax: string;
      total: string;
      currency_code: string;
    };
    custom_data?: PaddleCustomData;
    status?: string;
  };
  transaction?: {
    id: string;
    status: string;
  };
}

/**
 * Paddle event types
 */
export type PaddleEventName =
  | 'checkout.loaded'
  | 'checkout.closed'
  | 'checkout.completed'
  | 'checkout.error'
  | 'checkout.customer.created'
  | 'checkout.payment.selected'
  | 'checkout.payment.initiated'
  | 'checkout.payment.failed';

/**
 * Paddle event callback
 */
export interface PaddleEvent {
  name: PaddleEventName;
  data?: PaddleCheckoutEventData;
  error?: {
    code: string;
    detail: string;
  };
}

/**
 * Paddle initialization options
 */
export interface PaddleInitializeOptions {
  token: string;
  environment?: 'sandbox' | 'production';
  eventCallback?: (event: PaddleEvent) => void;
  checkout?: {
    settings?: PaddleCheckoutSettings;
  };
}

/**
 * Paddle SDK interface
 * Represents the global Paddle object loaded from CDN
 */
export interface PaddleSDK {
  Initialize: (options: PaddleInitializeOptions) => void;
  Checkout: {
    open: (options: PaddleCheckoutOptions) => void;
    close: () => void;
  };
  Environment: {
    set: (env: 'sandbox' | 'production') => void;
  };
}

/**
 * Extend the global Window interface to include Paddle
 */
declare global {
  interface Window {
    Paddle?: PaddleSDK;
  }
}

/**
 * Payment status for Paddle checkout flow
 */
export type PaddlePaymentStatus =
  | 'idle'
  | 'loading'
  | 'checkout-open'
  | 'processing'
  | 'success'
  | 'error';

/**
 * Paddle payment state
 */
export interface PaddlePaymentState {
  status: PaddlePaymentStatus;
  error: string | null;
  transactionId: string | null;
}
