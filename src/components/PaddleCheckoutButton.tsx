/**
 * Paddle Checkout Button Component
 *
 * Initializes Paddle.js and opens the overlay checkout when clicked.
 * Handles checkout events (success, close, error) and tracks analytics.
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Loader2, CreditCard, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { PADDLE_CONFIG, PADDLE_CHECKOUT_SETTINGS } from '../config/paddle.config';
import { googleSheetsService } from '../services/googleSheets';
import { trackPurchase } from '../services/gtm.service';
import {
  trackPaymentSuccess,
  trackPaymentAttempt,
} from '../analytics/events';
import type { PricingVariant } from '../config/pricing.ab-test';
import type {
  PaddleSDK,
  PaddleEvent,
  PaddlePaymentStatus,
} from '../types/paddle.types';

interface PaddleCheckoutButtonProps {
  /**
   * Paddle price ID for the selected plan
   */
  priceId: string;

  /**
   * Customer email address
   */
  email: string;

  /**
   * Plan name for tracking and display
   */
  planName: string;

  /**
   * Plan ID for tracking
   */
  planId: string;

  /**
   * Price amount for tracking
   */
  amount: number;

  /**
   * A/B test variant for analytics
   */
  variant: PricingVariant;

  /**
   * Callback when payment succeeds
   */
  onSuccess: () => void;

  /**
   * Callback when payment fails
   */
  onError: (error: string) => void;
}

/**
 * Check if Paddle SDK is loaded and ready
 */
function isPaddleReady(): boolean {
  return typeof window !== 'undefined' && typeof window.Paddle !== 'undefined';
}

/**
 * Wait for Paddle SDK to be ready
 */
function waitForPaddle(timeout = 10000): Promise<PaddleSDK> {
  return new Promise((resolve, reject) => {
    if (isPaddleReady()) {
      resolve(window.Paddle as PaddleSDK);
      return;
    }

    const startTime = Date.now();
    const checkInterval = setInterval(() => {
      if (isPaddleReady()) {
        clearInterval(checkInterval);
        resolve(window.Paddle as PaddleSDK);
      } else if (Date.now() - startTime > timeout) {
        clearInterval(checkInterval);
        reject(new Error('Paddle SDK failed to load. Please refresh the page.'));
      }
    }, 100);
  });
}

export default function PaddleCheckoutButton({
  priceId,
  email,
  planName,
  planId,
  amount,
  variant,
  onSuccess,
  onError,
}: PaddleCheckoutButtonProps): React.ReactElement {
  const [status, setStatus] = useState<PaddlePaymentStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  /**
   * Initialize Paddle SDK on mount
   */
  useEffect(() => {
    let isMounted = true;

    const initializePaddle = async (): Promise<void> => {
      try {
        setStatus('loading');
        const paddle = await waitForPaddle();

        if (!isMounted) return;

        // Initialize Paddle with event callback
        paddle.Initialize({
          token: PADDLE_CONFIG.clientToken,
          eventCallback: handlePaddleEvent,
          checkout: {
            settings: {
              ...PADDLE_CHECKOUT_SETTINGS,
              successUrl: `${window.location.origin}/founders-circle`,
            },
          },
        });

        setIsInitialized(true);
        setStatus('idle');
        console.log('Paddle SDK initialized successfully');
      } catch (err) {
        if (!isMounted) return;
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to initialize Paddle';
        setError(errorMessage);
        setStatus('error');
        console.error('Paddle initialization error:', errorMessage);
      }
    };

    initializePaddle();

    return () => {
      isMounted = false;
    };
  }, []);

  /**
   * Handle Paddle checkout events
   */
  const handlePaddleEvent = useCallback(
    (event: PaddleEvent): void => {
      console.log('Paddle event:', event.name, event);

      switch (event.name) {
        case 'checkout.loaded':
          setStatus('checkout-open');
          console.log('Paddle checkout loaded');
          break;

        case 'checkout.closed':
          // User closed without completing
          setStatus('idle');
          console.log('Paddle checkout closed by user');
          break;

        case 'checkout.completed':
          handleCheckoutCompleted(event);
          break;

        case 'checkout.error':
          const errorDetail = event.error?.detail || 'Payment failed';
          setError(errorDetail);
          setStatus('error');
          onError(errorDetail);
          console.error('Paddle checkout error:', errorDetail);
          break;

        case 'checkout.payment.failed':
          setError('Payment was declined. Please try again.');
          setStatus('error');
          onError('Payment was declined. Please try again.');
          break;

        default:
          // Log other events for debugging
          console.log('Unhandled Paddle event:', event.name);
      }
    },
    [onError]
  );

  /**
   * Handle successful checkout completion
   */
  const handleCheckoutCompleted = useCallback(
    async (event: PaddleEvent): Promise<void> => {
      setStatus('processing');
      console.log('Payment successful!', event.data);

      const transactionId = event.data?.transaction?.id || `paddle_${Date.now()}`;

      try {
        // 1. Track analytics - PostHog
        trackPaymentSuccess(variant, planId, amount);

        // 2. Track conversion - Google Tag Manager / Google Ads
        trackPurchase({
          transactionId,
          value: amount,
          currency: 'USD',
          email,
          planName,
          variant,
        });

        // 3. Log to Google Sheets
        await googleSheetsService.appendRow({
          email,
          timestamp: new Date().toISOString(),
          amount,
          planType: `${planName} (Paddle)`,
          variant,
        });
        console.log('Data sent to Google Sheets');
      } catch (trackingError) {
        // Don't block the success flow if tracking fails
        console.error('Tracking error (non-blocking):', trackingError);
      }

      setStatus('success');
      onSuccess();
    },
    [variant, planId, amount, email, planName, onSuccess]
  );

  /**
   * Open Paddle checkout overlay
   */
  const handleOpenCheckout = useCallback(async (): Promise<void> => {
    if (!isInitialized || !isPaddleReady()) {
      setError('Paddle is not ready. Please wait or refresh the page.');
      return;
    }

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    // Clear any previous errors
    setError(null);
    setStatus('loading');

    // Track payment attempt
    trackPaymentAttempt(variant, planId, amount);

    try {
      const paddle = window.Paddle as PaddleSDK;

      paddle.Checkout.open({
        items: [
          {
            priceId,
            quantity: 1,
          },
        ],
        customer: {
          email,
        },
        customData: {
          planName,
          planId,
          variant,
        },
        settings: {
          ...PADDLE_CHECKOUT_SETTINGS,
          successUrl: `${window.location.origin}/founders-circle`,
        },
      });

      console.log('Paddle checkout opened', { priceId, email, planName });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to open checkout';
      setError(errorMessage);
      setStatus('error');
      onError(errorMessage);
      console.error('Failed to open Paddle checkout:', err);
    }
  }, [
    isInitialized,
    email,
    priceId,
    planName,
    planId,
    amount,
    variant,
    onError,
  ]);

  // Determine if button should be disabled
  const isDisabled =
    !isInitialized ||
    !email ||
    status === 'loading' ||
    status === 'processing' ||
    status === 'checkout-open';

  // Determine button text based on status
  const getButtonText = (): string => {
    switch (status) {
      case 'loading':
        return 'Loading...';
      case 'processing':
        return 'Processing...';
      case 'checkout-open':
        return 'Complete checkout...';
      default:
        return 'Pay Now';
    }
  };

  return (
    <div className="space-y-4">
      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      {/* Checkout Button */}
      <Button
        onClick={handleOpenCheckout}
        disabled={isDisabled}
        className="w-full h-12 rounded-xl bg-gradient-to-r from-primary to-accent font-semibold text-base"
      >
        {status === 'loading' || status === 'processing' ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            {getButtonText()}
          </>
        ) : (
          <>
            <CreditCard className="w-4 h-4 mr-2" />
            {getButtonText()}
          </>
        )}
      </Button>

      {/* Security Note */}
      <p className="text-xs text-center text-muted-foreground">
        Secure payment powered by Paddle. Your payment details are encrypted.
      </p>
    </div>
  );
}
