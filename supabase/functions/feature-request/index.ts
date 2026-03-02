// Supabase Edge Function for handling feature requests and sending to Telegram
// Follow the guide at https://supabase.com/docs/guides/functions

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { corsHeaders } from '../_shared/cors.ts';
import { checkRateLimit, getClientIp } from '../_shared/rate-limit.ts';

interface FeatureRequestPayload {
  name: string;
  email: string;
  featureType: string;
  priority: string;
  description: string;
  useCase: string;
  website?: string;
  _formLoadedAt?: number;
}

/**
 * Escape HTML special characters to prevent injection in Telegram HTML messages.
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

async function sendToTelegram(
  botToken: string,
  chatId: string,
  message: string,
): Promise<Response> {
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    }),
  });

  return response;
}

serve(async (req) => {
  // 1. Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Get environment variables
    const TELEGRAM_BOT_TOKEN = Deno.env.get('TELEGRAM_BOT_TOKEN');
    const TELEGRAM_CHAT_ID = Deno.env.get('TELEGRAM_CHAT_ID');

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      throw new Error('Telegram credentials not configured');
    }

    // 2. Parse request body
    const data: FeatureRequestPayload = await req.json();

    // 3. Honeypot check: if filled, return fake success (trick the bot)
    if (data.website) {
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Feature request submitted successfully',
        }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        },
      );
    }

    // 4. Time validation: reject if submitted too fast (< 3s) or too old (> 24h)
    const MIN_ELAPSED_MS = 3000;
    const MAX_ELAPSED_MS = 86400000; // 24 hours
    if (data._formLoadedAt) {
      const elapsed = Date.now() - data._formLoadedAt;
      if (elapsed < MIN_ELAPSED_MS || elapsed > MAX_ELAPSED_MS) {
        return new Response(
          JSON.stringify({ error: 'Invalid submission timing' }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          },
        );
      }
    } else {
      // Missing timestamp — reject as suspicious
      return new Response(
        JSON.stringify({ error: 'Invalid submission' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        },
      );
    }

    // 5. Field validation: email + description required
    if (!data.email || !data.description) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        },
      );
    }

    // 6. Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email address' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        },
      );
    }

    // 7. Max-length validation
    if (
      (data.name && data.name.length > 200) ||
      data.email.length > 254 ||
      data.description.length > 2000
    ) {
      return new Response(
        JSON.stringify({ error: 'Field exceeds maximum length' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        },
      );
    }

    // 8. Rate limit check (dual-key: email + IP)
    const clientIp = getClientIp(req);
    const rateLimitResult = checkRateLimit(data.email, clientIp);

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

    // 9. Escape HTML in all user-provided fields before Telegram interpolation
    const safeName = escapeHtml(data.name || '');
    const safeEmail = escapeHtml(data.email);
    const safeFeatureType = escapeHtml(data.featureType || '');
    const safePriority = escapeHtml(data.priority || '');
    const safeDescription = escapeHtml(data.description);
    const safeUseCase = escapeHtml(data.useCase || '');

    // 10. Format message for Telegram
    const message = `
<b>New Feature Request</b>

<b>From:</b> ${safeName || 'Anonymous'} (${safeEmail})
<b>Type:</b> ${safeFeatureType.replace('-', ' ').toUpperCase()}
<b>Priority:</b> ${safePriority.toUpperCase()}

<b>Description:</b>
${safeDescription}

${safeUseCase ? `<b>Use Case:</b>\n${safeUseCase}` : ''}

---
<i>Submitted via RaiseTalks Feature Request Form</i>
    `.trim();

    // 11. Send to Telegram
    const telegramResponse = await sendToTelegram(
      TELEGRAM_BOT_TOKEN,
      TELEGRAM_CHAT_ID,
      message,
    );

    if (!telegramResponse.ok) {
      const error = await telegramResponse.text();
      console.error('Telegram API error:', error);
      throw new Error('Failed to send message to Telegram');
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Feature request submitted successfully',
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  } catch (error) {
    console.error('Error processing feature request:', error);

    return new Response(
      JSON.stringify({
        error: 'Failed to process request. Please try again later.',
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  }
});
