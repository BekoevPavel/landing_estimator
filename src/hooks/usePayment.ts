/**
 * Хук для управления процессом оплаты (Stripe)
 *
 * IMPORTANT: This hook is Stripe-specific. When using Paddle as the payment
 * provider, do NOT call createPayment() - Paddle handles its own checkout flow.
 *
 * Инкапсулирует всю логику создания Payment Intent и обработки состояний
 */

import { useState, useCallback } from "react";
import { stripeService } from "../services/stripe.service";
import { isPaddleProvider } from "../config/payment-provider.config";
import type { PaymentStatus } from "../types/stripe.types";
// import { isDevelopmentMode } from "../config/env.config"; // Temporarily disabled for testing

export interface UsePaymentOptions {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export interface UsePaymentReturn {
  // Состояние
  status: PaymentStatus;
  error: string | null;
  clientSecret: string | null;
  isLoading: boolean;

  // Методы
  createPayment: (amount: number, planName: string, email?: string) => Promise<void>;
  handlePaymentSuccess: () => void;
  handlePaymentError: (error: string) => void;
  reset: () => void;
}

/**
 * Хук для управления процессом оплаты
 */
export function usePayment(options: UsePaymentOptions = {}): UsePaymentReturn {
  const { onSuccess, onError } = options;

  const [status, setStatus] = useState<PaymentStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const createPayment = useCallback(
    async (amount: number, planName: string, email?: string) => {
      // Guard: Do not create Stripe payment intents when Paddle is the active provider
      // Paddle handles its own checkout flow independently
      if (isPaddleProvider()) {
        console.warn(
          "[usePayment] createPayment called but Paddle is the active provider. " +
          "Skipping Stripe payment intent creation. Paddle handles checkout independently."
        );
        return;
      }

      // Валидация
      if (!stripeService.validateAmount(amount)) {
        const errorMsg = "Invalid amount. Please enter a number between 0.01 and 999999";
        setStatus("error");
        setError(errorMsg);
        onError?.(errorMsg);
        return;
      }

      if (email && !stripeService.validateEmail(email)) {
        const errorMsg = "Invalid email address";
        setStatus("error");
        setError(errorMsg);
        onError?.(errorMsg);
        return;
      }

      setStatus("creating-intent");
      setError(null);

      try {
        // TEMPORARILY DISABLED: Dev mode mock (to test real Stripe form)
        // if (isDevelopmentMode()) {
        //   await new Promise((resolve) => setTimeout(resolve, 1000));
        //   setClientSecret("demo_mode_no_real_payment");
        //   setStatus("processing");
        //   return;
        // }

        // Use real Stripe API (even in dev mode)
        const secret = await stripeService.createPaymentIntent({
          amount,
          planName,
          email,
        });

        setClientSecret(secret);
        setStatus("processing");
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : "An error occurred";
        setStatus("error");
        setError(errorMsg);
        onError?.(errorMsg);
      }
    },
    [onError]
  );

  const handlePaymentSuccess = useCallback(() => {
    setStatus("success");
    setError(null);
    onSuccess?.();
  }, [onSuccess]);

  const handlePaymentError = useCallback(
    (errorMessage: string) => {
      setStatus("error");
      setError(errorMessage);
      onError?.(errorMessage);
    },
    [onError]
  );

  const reset = useCallback(() => {
    setStatus("idle");
    setError(null);
    setClientSecret(null);
  }, []);

  return {
    status,
    error,
    clientSecret,
    isLoading: status === "creating-intent" || status === "processing",
    createPayment,
    handlePaymentSuccess,
    handlePaymentError,
    reset,
  };
}

