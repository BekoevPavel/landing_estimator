/**
 * Типы для Stripe интеграции
 * Централизованное место для всех типов, связанных с платежами
 */

export interface PaymentIntentRequest {
  amount: number;
  planName: string;
  email?: string;
}

export interface PaymentIntentResponse {
  clientSecret: string;
}

export interface PaymentError {
  error: string;
  message: string;
}

export type PaymentStatus = 'idle' | 'creating-intent' | 'processing' | 'success' | 'error';

export interface PaymentState {
  status: PaymentStatus;
  error: string | null;
  clientSecret: string | null;
}

