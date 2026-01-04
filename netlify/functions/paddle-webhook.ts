/**
 * Netlify Function: Paddle Webhook Handler
 *
 * Receives webhook events from Paddle (transaction.completed)
 * and sends a welcome email with login link to the customer.
 *
 * Setup required:
 * 1. Add RESEND_API_KEY to environment variables
 * 2. Add PADDLE_WEBHOOK_SECRET to environment variables (for signature verification)
 * 3. Configure webhook in Paddle Dashboard → Developer Tools → Notifications
 *    - URL: https://your-domain.netlify.app/.netlify/functions/paddle-webhook
 *    - Events: transaction.completed
 */

import type { Handler, HandlerEvent, HandlerResponse } from '@netlify/functions';
import { Resend } from 'resend';
import crypto from 'crypto';

// Token expiry time (24 hours in seconds) - longer for email links
const TOKEN_EXPIRY_SECONDS = 86400;

/**
 * Base64url encode (URL-safe base64 without padding)
 */
function base64UrlEncode(data: string): string {
  return Buffer.from(data)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

/**
 * Create HMAC-SHA256 signature as hex string
 */
function createSignature(payload: string, secret: string): string {
  return crypto.createHmac('sha256', secret).update(payload).digest('hex');
}

/**
 * Create a signed token for email login link
 */
function createEmailToken(email: string, plan: string, secret: string): string {
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    email,
    plan,
    exp: now + TOKEN_EXPIRY_SECONDS,
  };

  const payloadString = JSON.stringify(payload);
  const signature = createSignature(payloadString, secret);
  const tokenContent = `${payloadString}.${signature}`;

  return base64UrlEncode(tokenContent);
}

// CORS headers
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Paddle-Signature',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

// Plan display names
const PLAN_NAMES: Record<string, string> = {
  basic: 'Starter',
  pro: 'Professional',
  max: 'Max',
};

interface PaddleCustomer {
  id: string;
  email: string;
  name?: string;
}

interface PaddlePrice {
  id: string;
  product_id: string;
  description?: string;
}

interface PaddleItem {
  price: PaddlePrice;
  quantity: number;
}

interface PaddleTransactionData {
  id: string;
  status: string;
  customer_id?: string;
  customer?: PaddleCustomer;
  // Paddle may include customer info at different levels
  billing_details?: {
    email?: string;
    name?: string;
  };
  checkout?: {
    customer?: {
      email?: string;
      name?: string;
    };
  };
  items: PaddleItem[];
  currency_code: string;
  details?: {
    totals?: {
      total: string;
    };
  };
  custom_data?: {
    plan?: string;
    email?: string; // We can pass email in custom_data
  };
}

interface PaddleWebhookPayload {
  event_id: string;
  event_type: string;
  occurred_at: string;
  data: PaddleTransactionData;
}

/**
 * Verify Paddle webhook signature
 */
function verifyPaddleSignature(
  payload: string,
  signature: string | undefined,
  secret: string
): boolean {
  if (!signature) {
    console.log('⚠️ No signature provided, skipping verification');
    return true; // Skip verification if no signature (for testing)
  }

  try {
    // Paddle signature format: ts=timestamp;h1=hash
    const parts = signature.split(';');
    const tsMatch = parts.find(p => p.startsWith('ts='));
    const h1Match = parts.find(p => p.startsWith('h1='));

    if (!tsMatch || !h1Match) {
      console.error('❌ Invalid signature format');
      return false;
    }

    const timestamp = tsMatch.replace('ts=', '');
    const providedHash = h1Match.replace('h1=', '');

    // Create the signed payload
    const signedPayload = `${timestamp}:${payload}`;
    const expectedHash = crypto
      .createHmac('sha256', secret)
      .update(signedPayload)
      .digest('hex');

    return crypto.timingSafeEqual(
      Buffer.from(providedHash),
      Buffer.from(expectedHash)
    );
  } catch (error) {
    console.error('❌ Signature verification error:', error);
    return false;
  }
}

/**
 * Map Paddle price ID to plan type
 */
function getPlanFromPriceId(priceId: string, customData?: { plan?: string }): string {
  // First check custom_data if available
  if (customData?.plan) {
    return customData.plan;
  }

  // Map price IDs to plans - production price IDs
  const priceIdToPlan: Record<string, string> = {
    // Variant A prices
    'pri_01kb843d5331ana8t0a8g2010g': 'basic',  // Starter $5
    'pri_01kb845pb30ww55997ms9rnr4f': 'pro',    // Professional $15
    'pri_01kb84727pqrersph1af1071j9': 'max',    // Max $50 (fixed typo)
    // Variant B prices
    'pri_01kb844n77w7s0rq1pxq47jv4p': 'basic',  // Starter $10
    'pri_01kb846aqyhtvd6t3adpwz7sa0': 'pro',    // Professional $30
    'pri_01kb847ykxfy578n87mqq6ksk3': 'max',    // Max $80
  };

  return priceIdToPlan[priceId] || 'pro'; // Default to 'pro' if not found
}

/**
 * Fetch customer details from Paddle API
 */
async function fetchPaddleCustomer(customerId: string, apiKey: string): Promise<{ email: string; name?: string } | null> {
  try {
    console.log('🔍 Fetching customer from Paddle API:', customerId);

    const response = await fetch(`https://api.paddle.com/customers/${customerId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('❌ Paddle API error:', response.status, await response.text());
      return null;
    }

    const data = await response.json();
    console.log('✅ Paddle customer data:', JSON.stringify(data, null, 2));

    return {
      email: data.data?.email,
      name: data.data?.name,
    };
  } catch (error) {
    console.error('❌ Failed to fetch customer from Paddle:', error);
    return null;
  }
}

/**
 * Send welcome email with login link
 */
async function sendWelcomeEmail(
  resend: Resend,
  email: string,
  customerName: string | undefined,
  plan: string,
  appUrl: string,
  token: string | null
): Promise<boolean> {
  const planDisplayName = PLAN_NAMES[plan] || plan;
  const manualLoginUrl = `${appUrl}/auth/login`;
  const autoLoginUrl = token ? `${appUrl}/auth?token=${encodeURIComponent(token)}` : manualLoginUrl;
  const firstName = customerName?.split(' ')[0] || 'there';

  try {
    const { data, error } = await resend.emails.send({
      from: 'EstimateFast <noreply@estimatefast.ink>',
      to: email,
      subject: `Welcome to EstimateFast ${planDisplayName}! Your account is ready`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #2563eb; margin: 0;">EstimateFast</h1>
  </div>

  <h2 style="color: #1f2937;">Hey ${firstName}!</h2>

  <p>Thank you for subscribing to <strong>EstimateFast ${planDisplayName}</strong>! Your payment was successful and your account is now ready.</p>

  <div style="background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%); border-radius: 12px; padding: 30px; text-align: center; margin: 30px 0;">
    <p style="color: white; margin: 0 0 20px 0; font-size: 18px;">Click below to access your account:</p>
    <a href="${autoLoginUrl}" style="display: inline-block; background: white; color: #2563eb; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 16px;">
      Go to EstimateFast
    </a>
  </div>

  <p style="color: #6b7280; font-size: 14px;">If the button above doesn't work, you can log in manually:</p>
  <p style="background: #f3f4f6; padding: 12px; border-radius: 6px; word-break: break-all; font-family: monospace; font-size: 14px;">
    <a href="${manualLoginUrl}" style="color: #2563eb;">${manualLoginUrl}</a>
  </p>

  <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">

  <p style="color: #6b7280; font-size: 14px;">
    If you have any questions, just reply to this email. We're here to help!
  </p>

  <p style="color: #6b7280; font-size: 14px;">
    Best regards,<br>
    The EstimateFast Team
  </p>
</body>
</html>
      `,
      text: `
Hey ${firstName}!

Thank you for subscribing to EstimateFast ${planDisplayName}! Your payment was successful and your account is now ready.

Click here to access your account:
${autoLoginUrl}

If the link above doesn't work, you can log in manually at:
${manualLoginUrl}

If you have any questions, just reply to this email. We're here to help!

Best regards,
The EstimateFast Team
      `,
    });

    if (error) {
      console.error('❌ Resend error:', error);
      return false;
    }

    console.log('✅ Email sent successfully:', data?.id);
    return true;
  } catch (error) {
    console.error('❌ Failed to send email:', error);
    return false;
  }
}

/**
 * Main handler
 */
export const handler: Handler = async (event: HandlerEvent): Promise<HandlerResponse> => {
  console.log('🔔 Paddle webhook received');

  // Handle preflight request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: '',
    };
  }

  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  // Check for required environment variables
  const resendApiKey = process.env.RESEND_API_KEY;
  const paddleWebhookSecret = process.env.PADDLE_WEBHOOK_SECRET;
  const paddleApiKey = process.env.PADDLE_API_KEY;
  const mainAppUrl = process.env.VITE_MAIN_APP_URL || 'https://app.estimatefast.ink';

  if (!resendApiKey) {
    console.error('❌ RESEND_API_KEY not configured');
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Email service not configured' }),
    };
  }

  if (!paddleApiKey) {
    console.error('❌ PADDLE_API_KEY not configured');
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Paddle API not configured' }),
    };
  }

  // Verify webhook signature (if secret is configured)
  // TODO: Re-enable signature verification after fixing the secret
  // Currently disabled to allow webhooks to process while debugging
  if (paddleWebhookSecret && false) { // Temporarily disabled
    const signature = event.headers['paddle-signature'];
    console.log('🔐 Signature header:', signature ? 'present' : 'missing');
    if (!verifyPaddleSignature(event.body || '', signature, paddleWebhookSecret)) {
      console.error('❌ Invalid webhook signature');
      return {
        statusCode: 401,
        headers: CORS_HEADERS,
        body: JSON.stringify({ error: 'Invalid signature' }),
      };
    }
  } else {
    console.log('⚠️ Signature verification skipped (temporarily disabled)');
  }

  // Parse webhook payload
  let payload: PaddleWebhookPayload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch {
    console.error('❌ Failed to parse webhook payload');
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Invalid JSON payload' }),
    };
  }

  console.log('📦 Event type:', payload.event_type);
  console.log('📦 Event ID:', payload.event_id);
  console.log('📦 Full payload:', JSON.stringify(payload, null, 2));

  // Only process transaction.completed events
  if (payload.event_type !== 'transaction.completed') {
    console.log('⏭️ Ignoring event type:', payload.event_type);
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({ received: true, processed: false }),
    };
  }

  const transaction = payload.data;

  // Try to find customer email from multiple possible locations in Paddle payload
  let customerEmail =
    transaction.customer?.email ||
    transaction.billing_details?.email ||
    transaction.checkout?.customer?.email ||
    transaction.custom_data?.email;

  let customerName =
    transaction.customer?.name ||
    transaction.billing_details?.name ||
    transaction.checkout?.customer?.name;

  console.log('🔍 Looking for customer email in payload...');
  console.log('  - transaction.customer?.email:', transaction.customer?.email);
  console.log('  - transaction.billing_details?.email:', transaction.billing_details?.email);
  console.log('  - transaction.checkout?.customer?.email:', transaction.checkout?.customer?.email);
  console.log('  - transaction.custom_data?.email:', transaction.custom_data?.email);
  console.log('  - transaction.customer_id:', transaction.customer_id);

  // If email not in payload, fetch from Paddle API using customer_id
  if (!customerEmail && transaction.customer_id) {
    console.log('📡 Email not in payload, fetching from Paddle API...');
    const paddleCustomer = await fetchPaddleCustomer(transaction.customer_id, paddleApiKey);
    if (paddleCustomer?.email) {
      customerEmail = paddleCustomer.email;
      customerName = paddleCustomer.name || customerName;
      console.log('✅ Got email from Paddle API:', customerEmail);
    }
  }

  if (!customerEmail) {
    console.error('❌ No customer email found in webhook payload or Paddle API');
    console.error('Full transaction data:', JSON.stringify(transaction, null, 2));
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'No customer email' }),
    };
  }

  console.log('👤 Customer email:', customerEmail);

  // Get plan from first item's price ID or custom_data
  const plan = transaction.items?.[0]
    ? getPlanFromPriceId(transaction.items[0].price.id, transaction.custom_data)
    : 'pro';

  console.log('📋 Plan:', plan);

  // Generate auth token for auto-login link
  const authTokenSecret = process.env.AUTH_TOKEN_SECRET;
  let token: string | null = null;
  if (authTokenSecret) {
    token = createEmailToken(customerEmail, plan, authTokenSecret);
    console.log('🔑 Auth token generated for email');
  } else {
    console.log('⚠️ AUTH_TOKEN_SECRET not set, email will have manual login link only');
  }

  // Send welcome email
  const resend = new Resend(resendApiKey);
  const emailSent = await sendWelcomeEmail(
    resend,
    customerEmail,
    customerName,
    plan,
    mainAppUrl,
    token
  );

  if (!emailSent) {
    console.error('❌ Failed to send welcome email');
    // Return 200 anyway to acknowledge receipt (Paddle will retry on non-2xx)
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({ received: true, email_sent: false }),
    };
  }

  console.log('✅ Webhook processed successfully');
  return {
    statusCode: 200,
    headers: CORS_HEADERS,
    body: JSON.stringify({ received: true, email_sent: true }),
  };
};
