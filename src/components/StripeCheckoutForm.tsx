import React, { useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { googleSheetsService } from "../services/googleSheets";

interface StripeCheckoutFormProps {
  onSuccess: () => void;
  onError: (error: string) => void;
  email?: string;
  planName?: string;
  amount?: number;
  variant?: string;
}

export default function StripeCheckoutForm({ onSuccess, onError, email, planName, amount, variant }: StripeCheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.origin,
        },
        redirect: "if_required",
      });

      if (error) {
        onError(error.message || "Payment failed");
        setIsProcessing(false);
      } else {
        // Payment successful - send data to Google Sheets
        if (email && planName && amount) {
          try {
            await googleSheetsService.appendRow({
              email,
              timestamp: new Date().toISOString(),
              amount,
              planType: planName,
              variant: variant || 'A',
            });
            console.log("✅ Data sent to Google Sheets");
          } catch (sheetError) {
            console.error("Failed to save to Google Sheets:", sheetError);
            // Don't block the user flow if Google Sheets fails
          }
        }

        onSuccess();
      }
    } catch (err) {
      onError("An unexpected error occurred");
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      
      <Button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full rounded-xl bg-gradient-to-r from-primary to-accent"
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Processing...
          </>
        ) : (
          "Pay Now"
        )}
      </Button>
    </form>
  );
}

