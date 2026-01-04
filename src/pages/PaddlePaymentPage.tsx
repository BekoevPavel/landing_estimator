/**
 * Paddle Payment Test Page
 *
 * Uses the same pricing card design as the main pricing page.
 * Path: /paddle_payment
 */

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Check, Loader2, Lock, ArrowLeft } from 'lucide-react';
import { getPricingPlans, type PricingPlan } from '../config/pricing.ab-test';
import { Button } from '../components/ui/button';

// Environment detection
const isDev = import.meta.env.DEV && import.meta.env.VITE_PADDLE_ENV !== 'production';

// Paddle credentials - auto-switch between sandbox (dev) and production (deployed)
const PADDLE_CLIENT_TOKEN = isDev
  ? 'test_3da85ec98dee6288aaa410ee359'
  : (import.meta.env.VITE_PADDLE_CLIENT_TOKEN || 'live_ed7863999d9815e348532d2383a');

const PADDLE_ENVIRONMENT: 'sandbox' | 'production' = isDev ? 'sandbox' : 'production';

// Auth redirect config
const TOKEN_ENDPOINT = isDev
  ? 'http://localhost:8888/.netlify/functions/create-checkout-token'
  : '/.netlify/functions/create-checkout-token';

const MAIN_APP_URL = isDev
  ? 'http://localhost:3050'
  : (import.meta.env.VITE_MAIN_APP_URL || 'https://app.estimatefast.ink');

// Plan type mapping
const PLAN_TYPE_MAP: Record<string, string> = {
  starter: 'basic',
  professional: 'pro',
  agency: 'max',
};

declare global {
  interface Window {
    Paddle?: {
      Environment: {
        set: (env: 'sandbox' | 'production') => void;
      };
      Initialize: (options: {
        token: string;
        eventCallback?: (event: { name: string; data?: { customer?: { email?: string } } }) => void;
      }) => void;
      Checkout: {
        open: (options: {
          items: Array<{ priceId: string; quantity: number }>;
          customer?: { email?: string };
          settings?: {
            displayMode?: 'overlay' | 'inline';
            frameTarget?: string;
            frameInitialHeight?: number;
            frameStyle?: string;
            theme?: 'light' | 'dark';
            locale?: string;
            allowLogout?: boolean;
            showAddDiscounts?: boolean;
          };
        }) => void;
      };
    };
  }
}

export default function PaddlePaymentPage() {
  const [isReady, setIsReady] = useState(false);
  const [email, setEmail] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  // Refs to track current email and plan for event callback
  const emailRef = useRef(email);
  const selectedPlanRef = useRef(selectedPlan);

  // Keep refs in sync
  useEffect(() => {
    emailRef.current = email;
  }, [email]);

  useEffect(() => {
    selectedPlanRef.current = selectedPlan;
  }, [selectedPlan]);

  // Get pricing plans from A/B test config
  const plans = getPricingPlans();

  // Handle successful payment - generate token and redirect
  const handlePaymentSuccess = async (customerEmail: string, planId: string) => {
    setRedirecting(true);
    console.log('🎉 Payment successful! Generating auth token...');

    try {
      const authPlan = PLAN_TYPE_MAP[planId] || 'basic';

      const response = await fetch(TOKEN_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: customerEmail, plan: authPlan }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate token');
      }

      const { token } = await response.json();
      console.log('✅ Token generated, redirecting to main app...');

      // Redirect to main app with token
      window.location.href = `${MAIN_APP_URL}/auth?token=${encodeURIComponent(token)}`;
    } catch (error) {
      console.error('❌ Token generation failed:', error);
      setRedirecting(false);
      alert('Payment successful but redirect failed. Please contact support.');
    }
  };

  useEffect(() => {
    const checkPaddle = setInterval(() => {
      if (window.Paddle) {
        clearInterval(checkPaddle);

        // 1. Set environment FIRST (sandbox for dev, production for deployed)
        window.Paddle.Environment.set(PADDLE_ENVIRONMENT);
        console.log(`✅ Paddle.Environment.set("${PADDLE_ENVIRONMENT}")`);

        // 2. Initialize with token and event callback
        window.Paddle.Initialize({
          token: PADDLE_CLIENT_TOKEN,
          eventCallback: (event) => {
            console.log('🎯 Paddle event:', event.name);

            if (event.name === 'checkout.completed') {
              const customerEmail = event.data?.customer?.email || emailRef.current;
              const planId = selectedPlanRef.current?.id || 'starter';

              console.log('✅ Checkout completed!', { customerEmail, planId });
              handlePaymentSuccess(customerEmail, planId);
            }
          },
        });
        console.log('✅ Paddle.Initialize() called with event callback');

        setIsReady(true);
        setStatus('ready');
      }
    }, 100);

    setTimeout(() => {
      clearInterval(checkPaddle);
      if (!isReady) {
        setStatus('error');
      }
    }, 10000);

    return () => clearInterval(checkPaddle);
  }, []);

  const handlePlanSelect = (plan: PricingPlan) => {
    setSelectedPlan(plan);
    setShowCheckout(true);
  };

  const handleBack = () => {
    setShowCheckout(false);
    setSelectedPlan(null);
    setEmail('');
  };

  const handleCheckout = () => {
    if (!window.Paddle || !email || !selectedPlan) return;

    setIsProcessing(true);

    try {
      window.Paddle.Checkout.open({
        items: [{ priceId: selectedPlan.paddlePriceId, quantity: 1 }],
        customer: { email },
        settings: {
          displayMode: 'overlay',
          theme: 'dark',
          locale: 'en',
          allowLogout: false,
          showAddDiscounts: false,
        },
      });
      setTimeout(() => setIsProcessing(false), 1000);
    } catch (error) {
      console.error('Checkout error:', error);
      setIsProcessing(false);
    }
  };

  // Show redirecting screen
  if (redirecting) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6 py-12">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
          <p className="text-muted-foreground">Redirecting you to the app...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-7xl">
        <AnimatePresence mode="wait">
          {!showCheckout ? (
            // Pricing Cards Screen
            <motion.div
              key="pricing-cards"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Header */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center mb-16"
              >
                {/* Sandbox Badge */}
                <div className="flex justify-center mb-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20 rounded-full backdrop-blur-sm">
                    <Sparkles className="w-4 h-4 text-violet-400" />
                    <span className="text-sm font-medium bg-gradient-to-r from-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
                      Paddle Sandbox Test
                    </span>
                    {status === 'ready' && (
                      <span className="flex items-center gap-1 text-emerald-400 text-xs">
                        <Check className="w-3 h-3" />
                        Ready
                      </span>
                    )}
                  </div>
                </div>

                <h1 className="text-4xl font-bold mb-4">Get Your Estimate</h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  An AI team of experts will estimate your project more accurately than you — in 2 minutes.
                </p>
              </motion.div>

              {/* Pricing Cards - Same as main pricing page */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan, index) => (
                  <motion.div
                    key={plan.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className={`relative group ${plan.popular ? 'md:-mt-4' : ''}`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-primary to-accent text-sm z-10">
                        Most Popular
                      </div>
                    )}

                    <div
                      className={`relative h-full bg-card/50 backdrop-blur-xl border-2 rounded-3xl p-8 transition-all duration-300 ${
                        selectedPlan?.id === plan.id
                          ? 'border-primary shadow-lg shadow-primary/20 scale-105'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity`}
                      />

                      <div className="relative">
                        <div
                          className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${plan.borderGradient} mb-6`}
                        >
                          <plan.icon className="w-6 h-6 text-white" />
                        </div>

                        <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                        <p className="text-sm text-muted-foreground mb-6">
                          {plan.description}
                        </p>

                        <div className="mb-6">
                          <span className="text-4xl font-bold">{plan.displayPrice}</span>
                          <span className="text-muted-foreground">{plan.period}</span>
                        </div>

                        <ul className="space-y-3 mb-8">
                          {plan.features.map((feature) => (
                            <li key={feature} className="flex items-start gap-3">
                              <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>

                        <Button
                          variant={selectedPlan?.id === plan.id ? 'default' : 'outline'}
                          className="w-full rounded-xl"
                          onClick={() => handlePlanSelect(plan)}
                          disabled={!isReady}
                        >
                          Select Plan
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Test Card Info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-12 text-center"
              >
                <div className="inline-flex items-center gap-3 px-5 py-3 bg-card/50 border border-border rounded-full backdrop-blur-sm">
                  <span className="text-muted-foreground text-sm">Test Card:</span>
                  <code className="text-violet-400 font-mono font-medium">4242 4242 4242 4242</code>
                </div>
                <p className="text-muted-foreground text-xs mt-2">Any future date • Any 3-digit CVC</p>
              </motion.div>
            </motion.div>
          ) : (
            // Checkout Form Screen
            <motion.div
              key="checkout-form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-lg mx-auto"
            >
              {/* Back Button */}
              <Button
                variant="ghost"
                onClick={handleBack}
                className="mb-6"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>

              {/* Selected Plan Summary */}
              {selectedPlan && (
                <div className="bg-card/50 backdrop-blur-xl border border-border rounded-3xl p-8 mb-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${selectedPlan.borderGradient}`}
                    >
                      <selectedPlan.icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{selectedPlan.name}</h2>
                      <p className="text-muted-foreground">{selectedPlan.description}</p>
                    </div>
                  </div>

                  <div className="flex items-baseline justify-between border-t border-border pt-4">
                    <span className="text-muted-foreground">Total</span>
                    <div>
                      <span className="text-3xl font-bold">{selectedPlan.displayPrice}</span>
                      <span className="text-muted-foreground ml-1">USD</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Email Input & Pay Button */}
              <div className="bg-card/50 backdrop-blur-xl border border-border rounded-3xl p-8">
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>

                <Button
                  onClick={handleCheckout}
                  disabled={!isReady || !email || isProcessing}
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-primary to-accent font-semibold"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Opening Checkout...
                    </>
                  ) : (
                    <>Pay {selectedPlan?.displayPrice}</>
                  )}
                </Button>

                {/* Security Note */}
                <div className="flex items-center justify-center gap-2 mt-4 text-muted-foreground text-xs">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Secure payment powered by Paddle</span>
                </div>
              </div>

              {/* Test Card Reminder */}
              <div className="mt-6 text-center">
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-card/50 border border-border rounded-full">
                  <span className="text-muted-foreground text-sm">Test Card:</span>
                  <code className="text-violet-400 font-mono text-sm">4242 4242 4242 4242</code>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
