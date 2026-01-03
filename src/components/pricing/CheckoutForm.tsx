/**
 * Компонент формы оформления заказа
 *
 * Supports both Stripe (embedded) and Paddle (overlay) checkout flows.
 * The active provider is controlled by PAYMENT_PROVIDER config flag.
 */

import React, { useState } from "react";
import { motion } from "motion/react";
import { AlertCircle, Loader2 } from "lucide-react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import StripeCheckoutForm from "../StripeCheckoutForm";
import PaddleCheckoutButton from "../PaddleCheckoutButton";
import { STRIPE_KEYS, STRIPE_APPEARANCE_DARK } from "../../config/stripe.config";
import { PAYMENT_PROVIDER, isPaddleProvider } from "../../config/payment-provider.config";
import { isDevelopmentMode } from "../../config/env.config";
import type { PricingPlan, PricingVariant } from "../../config/pricing.ab-test";
import { googleSheetsService } from "../../services/googleSheets";
import { trackPurchase } from "../../services/gtm.service";

// Инициализация Stripe (only loaded when using Stripe provider)
const stripePromise = loadStripe(STRIPE_KEYS.publishableKey);

interface CheckoutFormProps {
  selectedPlan: PricingPlan;
  actualPrice: number;
  abTestVariant: PricingVariant;
  clientSecret: string | null;
  isLoading: boolean;
  error: string | null;
  onEmailChange: (email: string) => void;
  onPaymentSuccess: () => void;
  onPaymentError: (error: string) => void;
}

export function CheckoutForm({
  selectedPlan,
  actualPrice,
  abTestVariant,
  clientSecret,
  isLoading,
  error,
  onEmailChange,
  onPaymentSuccess,
  onPaymentError,
}: CheckoutFormProps) {
  const [email, setEmail] = useState("");

  const handleEmailChange = (value: string) => {
    setEmail(value);
    onEmailChange(value);
  };

  const isDevMode = isDevelopmentMode();
  const usePaddle = isPaddleProvider();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Payment Provider Debug (dev only) */}
      {import.meta.env.DEV && (
        <div className="p-2 bg-blue-500/10 border border-blue-500/20 rounded-lg text-center">
          <span className="text-xs text-blue-400">
            Payment Provider: <strong>{PAYMENT_PROVIDER.toUpperCase()}</strong>
          </span>
        </div>
      )}

      {/* Error Message (only show for Stripe, Paddle handles its own errors) */}
      {error && !usePaddle && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-2"
        >
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-400">{error}</p>
        </motion.div>
      )}

      {/* Email Input */}
      <div className="mb-6">
        <label className="text-sm mb-2 block font-medium">Email Address</label>
        <Input
          type="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => handleEmailChange(e.target.value)}
          className="rounded-xl h-12"
        />
      </div>

      {/* ==================== PADDLE CHECKOUT ==================== */}
      {usePaddle && email && (
        <PaddleCheckoutButton
          priceId={selectedPlan.paddlePriceId}
          email={email}
          planName={selectedPlan.name}
          planId={selectedPlan.id}
          amount={actualPrice}
          variant={abTestVariant}
          onSuccess={onPaymentSuccess}
          onError={onPaymentError}
        />
      )}

      {/* ==================== STRIPE CHECKOUT ==================== */}
      {/* Dev Mode Simulation - Only visible in development when using Stripe */}
      {!usePaddle &&
        isDevMode &&
        clientSecret &&
        email &&
        clientSecret === "demo_mode_no_real_payment" && (
          <div className="space-y-4">
            <div className="p-4 bg-card border border-border rounded-xl">
              <p className="text-sm text-muted-foreground mb-3">
                In production, Stripe payment form will appear here.
              </p>
              <div className="text-sm space-y-1 text-muted-foreground">
                <p>
                  Plan: <span className="text-foreground">{selectedPlan.name}</span>
                </p>
                <p>
                  Amount:{" "}
                  <span className="text-foreground">{selectedPlan.displayPrice}</span>
                </p>
                <p>
                  Email: <span className="text-foreground">{email}</span>
                </p>
              </div>
            </div>
            <Button
              onClick={async () => {
                // 1. Send conversion event to Google Tag Manager
                trackPurchase({
                  value: actualPrice,
                  currency: 'USD',
                  email: email,
                  planName: selectedPlan.name,
                  variant: abTestVariant,
                });

                // 2. Send data to Google Sheets even in dev mode
                if (email) {
                  try {
                    await googleSheetsService.appendRow({
                      email,
                      timestamp: new Date().toISOString(),
                      amount: actualPrice,
                      planType: selectedPlan.name,
                      variant: abTestVariant,
                    });
                    console.log("Dev mode: Data sent to Google Sheets");
                  } catch (sheetError) {
                    console.error("Failed to save to Google Sheets:", sheetError);
                  }
                }
                onPaymentSuccess();
              }}
              className="w-full rounded-xl bg-gradient-to-r from-green-500 to-emerald-500"
            >
              Simulate Payment Success (Dev Mode)
            </Button>
          </div>
        )}

      {/* Real Stripe Form */}
      {!usePaddle &&
        clientSecret &&
        email &&
        clientSecret !== "demo_mode_no_real_payment" && (
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret,
              appearance: STRIPE_APPEARANCE_DARK,
            }}
          >
            <StripeCheckoutForm
              onSuccess={onPaymentSuccess}
              onError={onPaymentError}
              email={email}
              planName={selectedPlan.name}
              amount={actualPrice}
              variant={abTestVariant}
            />
          </Elements>
        )}

      {/* Loading State (Stripe only - Paddle handles its own loading) */}
      {!usePaddle && !clientSecret && email && isLoading && (
        <div className="text-center py-8">
          <Loader2 className="inline-block w-8 h-8 text-primary animate-spin" />
          <p className="mt-4 text-sm text-muted-foreground">
            Initializing payment...
          </p>
        </div>
      )}
    </motion.div>
  );
}

