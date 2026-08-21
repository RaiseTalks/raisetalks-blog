// Supabase Edge Function for newsletter signups
// Sends the subscriber a welcome email and notifies the RaiseTalks team.
// Follow the guide at https://supabase.com/docs/guides/functions

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { corsHeaders } from '../_shared/cors.ts';
import { checkRateLimit, getClientIp } from '../_shared/rate-limit.ts';

interface NewsletterPayload {
  email: string;
  website?: string;
  _formLoadedAt?: number;
}

const FROM_EMAIL = 'RaiseTalks <hello@raisetalks.com>';
const HQ_NOTIFY_EMAIL = 'emmanuel@raisetalks.ai';

function jsonResponse(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function sendResendRequest(
  apiKey: string,
  payload: Record<string, unknown>,
): Promise<void> {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('Resend send error:', error);
    throw new Error('Failed to send email via Resend');
  }
}

async function sendWelcomeEmail(
  apiKey: string,
  templateId: string,
  email: string,
): Promise<void> {
  await sendResendRequest(apiKey, {
    from: FROM_EMAIL,
    to: [email],
    subject: 'Welcome to RaiseTalks',
    template: { id: templateId, variables: {} },
  });
}

function notifyEmailHtml(email: string): string {
  return `
<div style="font-family: Arial, sans-serif; font-size: 14px; color: #000000;">
  <p><strong>New newsletter subscriber</strong></p>
  <p>Email: ${email}</p>
  <p>Subscribed at: ${new Date().toISOString()}</p>
</div>`.trim();
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405);
  }

  try {
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    const RESEND_TEMPLATE_NEWSLETTER_WELCOME = Deno.env.get('RESEND_TEMPLATE_NEWSLETTER_WELCOME');

    if (!RESEND_API_KEY || !RESEND_TEMPLATE_NEWSLETTER_WELCOME) {
      throw new Error('Resend credentials not configured');
    }

    const data: NewsletterPayload = await req.json();

    // Honeypot check: if filled, return fake success (trick the bot)
    if (data.website) {
      return jsonResponse({ success: true }, 200);
    }

    // Time validation: reject if submitted too fast (< 1.5s) or too old (> 24h)
    const MIN_ELAPSED_MS = 1500;
    const MAX_ELAPSED_MS = 86400000;
    if (data._formLoadedAt) {
      const elapsed = Date.now() - data._formLoadedAt;
      if (elapsed < MIN_ELAPSED_MS || elapsed > MAX_ELAPSED_MS) {
        return jsonResponse({ error: 'Invalid submission timing' }, 400);
      }
    } else {
      return jsonResponse({ error: 'Invalid submission' }, 400);
    }

    if (!data.email) {
      return jsonResponse({ error: 'Email is required' }, 400);
    }

    const email = data.email.trim().toLowerCase();

    if (email.length > 254) {
      return jsonResponse({ error: 'Field exceeds maximum length' }, 400);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return jsonResponse({ error: 'Invalid email address' }, 400);
    }

    const clientIp = getClientIp(req);
    const rateLimitResult = checkRateLimit(email, clientIp);
    if (!rateLimitResult.allowed) {
      return new Response(
        JSON.stringify({ error: 'Too many requests. Please try again later.' }),
        {
          status: 429,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
            ...(rateLimitResult.retryAfter
              ? { 'Retry-After': String(rateLimitResult.retryAfter) }
              : {}),
          },
        },
      );
    }

    await sendWelcomeEmail(RESEND_API_KEY, RESEND_TEMPLATE_NEWSLETTER_WELCOME, email);

    // Internal notification is best-effort — don't fail the subscription over it
    try {
      await sendResendRequest(RESEND_API_KEY, {
        from: FROM_EMAIL,
        to: [HQ_NOTIFY_EMAIL],
        subject: 'New newsletter subscriber',
        html: notifyEmailHtml(email),
      });
    } catch (notifyError) {
      console.error('Failed to send internal notification:', notifyError);
    }

    return jsonResponse({ success: true }, 200);
  } catch (error) {
    console.error('Error processing newsletter subscription:', error);
    return jsonResponse(
      { error: 'Failed to process request. Please try again later.' },
      500,
    );
  }
});
