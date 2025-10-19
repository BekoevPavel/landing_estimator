/**
 * Тестовый компонент для проверки Stripe интеграции
 * Рефакторинг: использует новую архитектуру с конфигурацией и хуком usePayment
 */

import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Alert, AlertDescription } from "./ui/alert";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Loader2, CreditCard, XCircle, X } from "lucide-react";
import StripeCheckoutForm from "./StripeCheckoutForm";
import FoundersCircleScreen from "./FoundersCircleScreen";
import { usePayment } from "../hooks/usePayment";
import {
  STRIPE_KEYS,
  STRIPE_APPEARANCE_LIGHT,
  STRIPE_TEST_CARDS,
} from "../config/stripe.config";

// Инициализация Stripe
const stripePromise = loadStripe(STRIPE_KEYS.publishableKey);

interface TestStripePaymentProps {
  onClose?: () => void;
}

/**
 * Главный компонент тестирования Stripe
 */
export default function TestStripePayment({ onClose }: TestStripePaymentProps) {
  const [amount, setAmount] = useState("10.00");
  const [email, setEmail] = useState("test@example.com");

  const payment = usePayment();

  const handleInitializePayment = () => {
    const numAmount = parseFloat(amount);
    payment.createPayment(numAmount, "Test Payment", email);
  };

  const { status, error, clientSecret } = payment;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <Card className="w-full max-w-lg shadow-2xl">
        <CardHeader className="relative">
          {onClose && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <CreditCard className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl">Тестирование Stripe</CardTitle>
              <CardDescription>
                Проверка интеграции платёжной системы
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Форма настройки платежа */}
          {status === 'idle' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Сумма (USD)</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="0.01"
                  max="999999"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="10.00"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email (опционально)</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="test@example.com"
                />
              </div>

              <Button
                onClick={handleInitializePayment}
                className="w-full"
                size="lg"
              >
                <CreditCard className="mr-2 h-5 w-5" />
                Оплатить через Stripe
              </Button>

              <Alert>
                <AlertDescription className="text-sm">
                  <strong>Тестовая карта:</strong> {STRIPE_TEST_CARDS.success.number}
                  <br />
                  <strong>Срок действия:</strong> любая будущая дата
                  <br />
                  <strong>CVC:</strong> любые 3 цифры
                </AlertDescription>
              </Alert>
            </div>
          )}

          {/* Состояние загрузки */}
          {status === 'creating-intent' && (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="text-lg font-medium">Создаём платёжную сессию...</p>
              <p className="text-sm text-muted-foreground">
                Подключаемся к Stripe API
              </p>
            </div>
          )}

          {/* Форма оплаты Stripe */}
          {status === 'processing' && clientSecret && (
            <Elements
              stripe={stripePromise}
              options={{
                clientSecret,
                appearance: STRIPE_APPEARANCE_LIGHT,
              }}
            >
              <div className="space-y-4">
                <Alert>
                  <AlertDescription>
                    Введите данные тестовой карты для оплаты ${amount}
                  </AlertDescription>
                </Alert>
                <StripeCheckoutForm
                  onSuccess={payment.handlePaymentSuccess}
                  onError={payment.handlePaymentError}
                />
              </div>
            </Elements>
          )}

          {/* Успешная оплата - показываем Founder's Circle Screen */}
          {status === 'success' && (
            <div className="fixed inset-0 z-50 bg-background">
              <FoundersCircleScreen initialEmail={email} />
            </div>
          )}

          {/* Ошибка */}
          {status === 'error' && error && (
            <div className="space-y-4">
              <div className="flex flex-col items-center justify-center py-8 space-y-4">
                <div className="p-4 rounded-full bg-red-100 dark:bg-red-900/20">
                  <XCircle className="h-12 w-12 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-red-600 dark:text-red-400">
                  Ошибка платежа
                </h3>
              </div>
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
              <Button onClick={payment.reset} variant="outline" className="w-full">
                Попробовать снова
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

