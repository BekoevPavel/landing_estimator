/**
 * Сервис для работы с Stripe API
 * Инкапсулирует всю логику взаимодействия с бэкендом
 */

import { API_ENDPOINTS } from "../config/env.config";
import { STRIPE_VALIDATION } from "../config/stripe.config";
import type {
  PaymentIntentRequest,
  PaymentIntentResponse,
  PaymentError,
} from "../types/stripe.types";

class StripeService {
  private readonly apiUrl: string;

  constructor() {
    this.apiUrl = API_ENDPOINTS.createPaymentIntent;
  }

  /**
   * Создаёт Payment Intent через Netlify функцию
   * @throws Error если запрос неуспешен
   */
  async createPaymentIntent(data: PaymentIntentRequest): Promise<string> {
    console.log("🚀 Creating payment intent:", data);

    try {
      const response = await fetch(this.apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      console.log("📡 Response status:", response.status);

      if (!response.ok) {
        const errorData: PaymentError = await response.json();
        const errorMessage = errorData.message
          ? `${errorData.error}: ${errorData.message}`
          : errorData.error || "Failed to create payment intent";

        console.error("❌ Payment error:", errorMessage);
        throw new Error(errorMessage);
      }

      const result: PaymentIntentResponse = await response.json();
      console.log("✅ Payment intent created successfully");

      if (!result.clientSecret) {
        throw new Error("Invalid response: missing clientSecret");
      }

      return result.clientSecret;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(
        "An unexpected error occurred while creating payment intent"
      );
    }
  }

  /**
   * Валидирует сумму платежа
   */
  validateAmount(amount: number): boolean {
    return (
      amount >= STRIPE_VALIDATION.minAmount &&
      amount <= STRIPE_VALIDATION.maxAmount &&
      Number.isFinite(amount)
    );
  }

  /**
   * Валидирует email
   */
  validateEmail(email: string): boolean {
    return STRIPE_VALIDATION.emailRegex.test(email);
  }
}

// Экспортируем singleton instance
export const stripeService = new StripeService();

