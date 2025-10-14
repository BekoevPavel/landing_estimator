/**
 * Netlify Function: Create Payment Intent
 * Создаёт Payment Intent для Stripe через серверную функцию
 */

// 🔧 ВРЕМЕННО: Хардкод ключа для тестирования
const STRIPE_SECRET_KEY =
  "sk_test_51SHG8eHMmvX1TBOSHyi6dEj4kfMOFhR2EZjH4i5RJ106DVja65n5niY9XDhxMOsZJt9kh1MToG6F6MzqvueLVAzT00NoSw96lX";

// CORS headers
const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

/**
 * Создаёт успешный ответ
 */
function successResponse(data) {
  return {
    statusCode: 200,
    headers: CORS_HEADERS,
    body: JSON.stringify(data),
  };
}

/**
 * Создаёт ответ с ошибкой
 */
function errorResponse(statusCode, error, message) {
  return {
    statusCode,
    headers: CORS_HEADERS,
    body: JSON.stringify({
      error,
      message,
    }),
  };
}

/**
 * Валидирует входные данные
 */
function validateRequest(data) {
  if (!data.amount || !data.planName) {
    return "Missing required fields: amount and planName";
  }

  if (typeof data.amount !== "number" || data.amount <= 0) {
    return "Invalid amount";
  }

  if (data.amount > 999999) {
    return "Amount too large";
  }

  return null;
}

/**
 * Main handler
 */
exports.handler = async (event) => {
  console.log("🔍 Netlify Function: create-payment-intent called");

  // Handle preflight request
  if (event.httpMethod === "OPTIONS") {
    return successResponse({});
  }

  // Only allow POST
  if (event.httpMethod !== "POST") {
    return errorResponse(405, "Method not allowed", "Only POST requests are allowed");
  }

  // Проверка ключа
  if (!STRIPE_SECRET_KEY) {
    console.error("❌ STRIPE_SECRET_KEY is not configured");
    return errorResponse(
      500,
      "Server configuration error",
      "STRIPE_SECRET_KEY not configured"
    );
  }

  // Инициализация Stripe
  let stripe;
  try {
    stripe = require("stripe")(STRIPE_SECRET_KEY);
    console.log("✅ Stripe initialized successfully");
  } catch (initError) {
    console.error("❌ Failed to initialize Stripe:", initError.message);
    return errorResponse(
      500,
      "Failed to initialize payment system",
      initError.message
    );
  }

  // Парсинг и валидация данных
  let requestData;
  try {
    requestData = JSON.parse(event.body);
  } catch (parseError) {
    console.error("❌ Failed to parse request body:", parseError.message);
    return errorResponse(400, "Invalid request", "Request body must be valid JSON");
  }

  console.log("📦 Request data:", {
    amount: requestData.amount,
    planName: requestData.planName,
    email: requestData.email || "not provided",
  });

  const validationError = validateRequest(requestData);
  if (validationError) {
    console.log("❌ Validation failed:", validationError);
    return errorResponse(400, "Validation error", validationError);
  }

  // Создание Payment Intent
  try {
    console.log("💳 Creating PaymentIntent with Stripe...");

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(requestData.amount * 100), // Конвертируем в центы
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        planName: requestData.planName,
        email: requestData.email || "not provided",
      },
    });

    console.log("✅ PaymentIntent created:", paymentIntent.id);

    return successResponse({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (stripeError) {
    console.error("❌ Stripe error:", stripeError.type, stripeError.message);
    console.error("Full error:", stripeError);

    return errorResponse(
      500,
      "Payment processing error",
      stripeError.message || "Failed to create payment intent"
    );
  }
};

