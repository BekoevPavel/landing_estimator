/**
 * Компонент формы оформления заказа с Stripe
 */

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { AlertCircle, Loader2 } from "lucide-react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import StripeCheckoutForm from "../StripeCheckoutForm";
import { STRIPE_KEYS, STRIPE_APPEARANCE_DARK } from "../../config/stripe.config";
import { isDevelopmentMode } from "../../config/env.config";
import type { PricingPlan } from "../../config/pricing.config";

// Инициализация Stripe
const stripePromise = loadStripe(STRIPE_KEYS.publishableKey);

interface CheckoutFormProps {
  selectedPlan: PricingPlan;
  clientSecret: string | null;
  isLoading: boolean;
  error: string | null;
  onEmailChange: (email: string) => void;
  onPaymentSuccess: () => void;
  onPaymentError: (error: string) => void;
}

export function CheckoutForm({
  selectedPlan,
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto bg-card/50 backdrop-blur-xl border border-border rounded-2xl p-8"
    >
      <h3 className="mb-4">Complete Your Order</h3>

      {/* Dev Mode Notice */}
      {isDevMode && (
        <div className="mb-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
          <p className="text-sm text-yellow-400">
            <strong>🛠️ Dev Mode:</strong> Running on port 3000 - payment
            simulated. Use port 8888 (Netlify Dev) for real Stripe.
          </p>
        </div>
      )}

      {/* Test Mode Notice */}
      {!isDevMode && (
        <div className="mb-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-sm text-blue-400">
            <strong>✓ Stripe Test Mode:</strong> Use card 4242 4242 4242 4242
          </p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-2"
        >
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-400">{error}</p>
        </motion.div>
      )}

      <div className="space-y-6">
        {/* Email Input */}
        <div>
          <label className="text-sm mb-2 block">Email Address</label>
          <Input
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => handleEmailChange(e.target.value)}
            className="rounded-xl"
          />
        </div>

        {/* Dev Mode Simulation */}
        {clientSecret &&
          email &&
          clientSecret === "demo_mode_no_real_payment" && (
            <div className="space-y-4">
              <div className="p-4 bg-card border border-border rounded-xl">
                <p className="text-sm text-muted-foreground mb-3">
                  In production, Stripe payment form will appear here.
                </p>
                <div className="text-sm space-y-1 text-muted-foreground">
                  <p>
                    ✓ Plan: <span className="text-foreground">{selectedPlan.name}</span>
                  </p>
                  <p>
                    ✓ Amount:{" "}
                    <span className="text-foreground">{selectedPlan.displayPrice}</span>
                  </p>
                  <p>
                    ✓ Email: <span className="text-foreground">{email}</span>
                  </p>
                </div>
              </div>
              <Button
                onClick={onPaymentSuccess}
                className="w-full rounded-xl bg-gradient-to-r from-green-500 to-emerald-500"
              >
                ✓ Simulate Payment Success (Dev Mode)
              </Button>
            </div>
          )}

        {/* Real Stripe Form */}
        {clientSecret &&
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
              />
            </Elements>
          )}

        {/* Loading State */}
        {!clientSecret && email && isLoading && (
          <div className="text-center py-8">
            <Loader2 className="inline-block w-8 h-8 text-primary animate-spin" />
            <p className="mt-4 text-sm text-muted-foreground">
              Initializing payment...
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

