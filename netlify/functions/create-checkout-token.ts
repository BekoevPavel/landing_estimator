/**
 * Netlify Function: Create Checkout Token
 *
 * Creates a signed token for authentication handoff
 * between Paddle checkout and the main application.
 *
 * Token format: base64url( JSON_payload + "." + hex_signature )
 * Where:
 *   - JSON_payload is the raw JSON string (no spaces)
 *   - hex_signature is HMAC-SHA256(JSON_payload, SECRET) as hex
 *   - The entire "payload.signature" string is base64url encoded
 */

import type { Handler, HandlerEvent, HandlerResponse } from '@netlify/functions';
import crypto from 'crypto';

// Valid plan types
const VALID_PLANS = ['basic', 'pro', 'max'] as const;
type PlanType = (typeof VALID_PLANS)[number];

// Token expiry time (1 hour in seconds)
const TOKEN_EXPIRY_SECONDS = 3600;

// CORS headers
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

interface TokenRequest {
  email: string;
  plan: PlanType;
}

interface TokenPayload {
  email: string;
  plan: PlanType;
  exp: number;
}

/**
 * Create a successful response
 */
function successResponse(data: object): HandlerResponse {
  return {
    statusCode: 200,
    headers: CORS_HEADERS,
    body: JSON.stringify(data),
  };
}

/**
 * Create an error response
 */
function errorResponse(
  statusCode: number,
  error: string,
  message: string
): HandlerResponse {
  return {
    statusCode,
    headers: CORS_HEADERS,
    body: JSON.stringify({ error, message }),
  };
}

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
 * Validate email format
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate plan type
 */
function isValidPlan(plan: string): plan is PlanType {
  return VALID_PLANS.includes(plan as PlanType);
}

/**
 * Create a signed token
 * Format: base64url( JSON_payload + "." + hex_signature )
 */
function createToken(email: string, plan: PlanType, secret: string): string {
  const now = Math.floor(Date.now() / 1000);
  const payload: TokenPayload = {
    email,
    plan,
    exp: now + TOKEN_EXPIRY_SECONDS,
  };

  // 1. Create JSON payload (no spaces - default JSON.stringify)
  const payloadString = JSON.stringify(payload);

  // 2. Create HMAC-SHA256 signature as hex
  const signature = createSignature(payloadString, secret);

  // 3. Combine payload and signature
  const tokenContent = `${payloadString}.${signature}`;

  // 4. Base64url encode the entire combined string
  return base64UrlEncode(tokenContent);
}

/**
 * Main handler
 */
export const handler: Handler = async (event: HandlerEvent): Promise<HandlerResponse> => {
  console.log('🔐 Netlify Function: create-checkout-token called');

  // Handle preflight request
  if (event.httpMethod === 'OPTIONS') {
    return successResponse({});
  }

  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return errorResponse(405, 'Method not allowed', 'Only POST requests are allowed');
  }

  // Check for AUTH_TOKEN_SECRET
  const secret = process.env.AUTH_TOKEN_SECRET;
  if (!secret) {
    console.error('❌ AUTH_TOKEN_SECRET is not configured');
    return errorResponse(
      500,
      'Server configuration error',
      'AUTH_TOKEN_SECRET not configured'
    );
  }

  if (secret.length < 32) {
    console.error('❌ AUTH_TOKEN_SECRET is too short (must be 32+ chars)');
    return errorResponse(
      500,
      'Server configuration error',
      'AUTH_TOKEN_SECRET must be at least 32 characters'
    );
  }

  // Parse request body
  let requestData: TokenRequest;
  try {
    requestData = JSON.parse(event.body || '{}');
  } catch {
    console.error('❌ Failed to parse request body');
    return errorResponse(400, 'Invalid request', 'Request body must be valid JSON');
  }

  const { email, plan } = requestData;

  // Validate email
  if (!email || typeof email !== 'string') {
    return errorResponse(400, 'Validation error', 'Email is required');
  }

  if (!isValidEmail(email)) {
    return errorResponse(400, 'Validation error', 'Invalid email format');
  }

  // Validate plan
  if (!plan || typeof plan !== 'string') {
    return errorResponse(400, 'Validation error', 'Plan is required');
  }

  if (!isValidPlan(plan)) {
    return errorResponse(
      400,
      'Validation error',
      `Invalid plan. Must be one of: ${VALID_PLANS.join(', ')}`
    );
  }

  console.log('📧 Creating token for:', { email, plan });

  // Create token
  try {
    const token = createToken(email, plan, secret);
    console.log('✅ Token created successfully');

    return successResponse({ token });
  } catch (error) {
    console.error('❌ Failed to create token:', error);
    return errorResponse(500, 'Token creation failed', 'Failed to create authentication token');
  }
};
