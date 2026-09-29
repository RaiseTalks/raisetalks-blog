// Supabase Edge Function for newsletter signups
// Sends the subscriber a welcome email and notifies the RaiseTalks team.
// Also serves gated lead magnets: a signup with `magnet` is added to that
// magnet's Resend Segment (the mailing list) and gets the download links back.
// Follow the guide at https://supabase.com/docs/guides/functions

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { corsHeaders } from '../_shared/cors.ts';
import { checkRateLimit, getClientIp } from '../_shared/rate-limit.ts';

interface NewsletterPayload {
  email: string;
  magnet?: string;
  website?: string;
  _formLoadedAt?: number;
}

interface LeadMagnet {
  title: string;
  segmentId: string;
  files: Record<string, string>;
}

// Download folder must match TOKEN in build_outputs.py (DVOS) and static/downloads/
const LEAD_MAGNETS: Record<string, LeadMagnet> = {
  'new-vc-funds-2026': {
    title: 'New VC funds 2026',
    segmentId: 'a08dbcf7-a871-4f48-8e9d-934853688593',
    files: {
      xlsx: 'https://raisetalks.com/downloads/nvf26-k7q3x9/raisetalks-new-vc-funds-2026.xlsx',
      csv: 'https://raisetalks.com/downloads/nvf26-k7q3x9/raisetalks-new-vc-funds-2026.csv',
    },
  },
};

const FROM_EMAIL = 'RaiseTalks <noreply@raisetalks.com>';
const HQ_NOTIFY_EMAIL = 'hq@raisetalks.ai';

function jsonResponse(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function sendResendRequest(
  apiKey: string,
  payload: Record<string, unknown>,
  path = '/emails',
): Promise<void> {
  const response = await fetch(`https://api.resend.com${path}`, {
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

// Resend groups contacts by Segments: create the contact inside the segment, or
// add it to the segment if the contact already exists.
async function addToSegment(apiKey: string, email: string, segmentId: string): Promise<void> {
  try {
    await sendResendRequest(apiKey, { email, unsubscribed: false, segments: [{ id: segmentId }] }, '/contacts');
  } catch {
    await sendResendRequest(apiKey, {}, `/contacts/${encodeURIComponent(email)}/segments/${segmentId}`);
  }
}

function notifyEmailHtml(email: string, magnet?: LeadMagnet): string {
  return `
<div style="font-family: Arial, sans-serif; font-size: 14px; color: #000000;">
  <p><strong>${magnet ? `New lead: ${magnet.title}` : 'New newsletter subscriber'}</strong></p>
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

    const magnet = data.magnet ? LEAD_MAGNETS[data.magnet] : undefined;
    if (data.magnet && !magnet) {
      return jsonResponse({ error: 'Unknown resource' }, 400);
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

    // Lead magnet signups join that magnet's mailing list. The hq@ notification below is the
    // second record of the email, so a segment failure is logged, not fatal.
    if (magnet) {
      try {
        await addToSegment(RESEND_API_KEY, email, magnet.segmentId);
      } catch (segmentError) {
        console.error('Failed to add lead to segment:', segmentError);
      }
    }

    await sendWelcomeEmail(RESEND_API_KEY, RESEND_TEMPLATE_NEWSLETTER_WELCOME, email);

    // Internal notification is best-effort — don't fail the subscription over it
    try {
      await sendResendRequest(RESEND_API_KEY, {
        from: FROM_EMAIL,
        to: [HQ_NOTIFY_EMAIL],
        subject: magnet ? `New lead: ${magnet.title}` : 'New newsletter subscriber',
        html: notifyEmailHtml(email, magnet),
      });
    } catch (notifyError) {
      console.error('Failed to send internal notification:', notifyError);
    }

    return jsonResponse({ success: true, ...(magnet ? { files: magnet.files } : {}) }, 200);
  } catch (error) {
    console.error('Error processing newsletter subscription:', error);
    return jsonResponse(
      { error: 'Failed to process request. Please try again later.' },
      500,
    );
  }
});
