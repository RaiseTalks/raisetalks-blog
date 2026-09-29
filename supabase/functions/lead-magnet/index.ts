// Supabase Edge Function for gated lead magnets (e.g. /blog/new-vc-funds-2026).
// No database: every signup is kept in two places so no email is lost -
//   1. a contact in the magnet's Resend Segment (Resend dashboard > Contacts > Segments, CSV export)
//   2. a notification email to hq@raisetalks.ai
// The subscriber gets an email with the download links, and the page shows
// the same links. Files live on the site at an unlisted path under /downloads/.
// Follow the guide at https://supabase.com/docs/guides/functions

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { corsHeaders } from '../_shared/cors.ts';
import { checkRateLimit, getClientIp } from '../_shared/rate-limit.ts';

interface LeadMagnetPayload {
  email: string;
  magnet: string;
  website?: string;
  _formLoadedAt?: number;
}

interface Magnet {
  title: string;
  page: string;
  segmentId: string;
  files: Record<string, string>;
}

const SITE = 'https://raisetalks.com';

const MAGNETS: Record<string, Magnet> = {
  'new-vc-funds-2026': {
    title: 'New VC funds 2026',
    page: '/blog/new-vc-funds-2026',
    segmentId: 'a08dbcf7-a871-4f48-8e9d-934853688593',
    // Folder name must match build_outputs.py (DVOS) and FundsLeadMagnet.tsx
    files: {
      xlsx: `${SITE}/downloads/nvf26-k7q3x9/raisetalks-new-vc-funds-2026.xlsx`,
      csv: `${SITE}/downloads/nvf26-k7q3x9/raisetalks-new-vc-funds-2026.csv`,
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

async function resend(apiKey: string, path: string, payload: Record<string, unknown>): Promise<Response> {
  return fetch(`https://api.resend.com${path}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}

// Resend contacts are global and grouped by Segments. Create the contact inside the
// segment; if it already exists (e.g. a newsletter subscriber), add it to the segment.
async function addToSegment(apiKey: string, email: string, segmentId: string): Promise<Response> {
  const created = await resend(apiKey, '/contacts', { email, unsubscribed: false, segments: [{ id: segmentId }] });
  if (created.ok) return created;
  console.error('Contact create failed, adding existing contact to segment:', await created.text());
  return resend(apiKey, `/contacts/${encodeURIComponent(email)}/segments/${segmentId}`, {});
}

function deliveryEmailHtml(magnet: Magnet): string {
  return `
<div style="font-family: Arial, sans-serif; font-size: 15px; color: #000000; line-height: 1.5;">
  <p>Here is your copy of <strong>${magnet.title}</strong>: 89 early-stage funds writing first cheques.</p>
  <p>
    <a href="${magnet.files.xlsx}" style="color: #0077FF;">Download the Excel</a> &nbsp;|&nbsp;
    <a href="${magnet.files.csv}" style="color: #0077FF;">Download the CSV</a>
  </p>
  <p>Every fund on the list is in the RaiseTalks investor catalogue: see its thesis and team, and contact
  the investors from your workspace at <a href="https://app.raisetalks.com" style="color: #0077FF;">app.raisetalks.com</a>.</p>
  <p>Dariia and the RaiseTalks team</p>
</div>`.trim();
}

function notifyEmailHtml(magnet: Magnet, email: string): string {
  return `
<div style="font-family: Arial, sans-serif; font-size: 14px; color: #000000;">
  <p><strong>New lead: ${magnet.title}</strong></p>
  <p>Email: ${email}</p>
  <p>Page: ${SITE}${magnet.page}</p>
  <p>Signed up at: ${new Date().toISOString()}</p>
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
    if (!RESEND_API_KEY) {
      throw new Error('Resend credentials not configured');
    }

    const data: LeadMagnetPayload = await req.json();

    // Honeypot check: if filled, return fake success (trick the bot)
    if (data.website) {
      return jsonResponse({ success: true, files: {} }, 200);
    }

    // Time validation: reject if submitted too fast (< 1.5s) or too old (> 24h)
    const MIN_ELAPSED_MS = 1500;
    const MAX_ELAPSED_MS = 86400000;
    if (!data._formLoadedAt) {
      return jsonResponse({ error: 'Invalid submission' }, 400);
    }
    const elapsed = Date.now() - data._formLoadedAt;
    if (elapsed < MIN_ELAPSED_MS || elapsed > MAX_ELAPSED_MS) {
      return jsonResponse({ error: 'Invalid submission timing' }, 400);
    }

    const magnet = MAGNETS[data.magnet];
    if (!magnet) {
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

    const rateLimitResult = checkRateLimit(email, getClientIp(req));
    if (!rateLimitResult.allowed) {
      return new Response(
        JSON.stringify({ error: 'Too many requests. Please try again later.' }),
        {
          status: 429,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
            ...(rateLimitResult.retryAfter ? { 'Retry-After': String(rateLimitResult.retryAfter) } : {}),
          },
        },
      );
    }

    // Keep the email in both places. Each is independent, so one failing never loses the lead;
    // only if BOTH fail do we return an error so the visitor can retry.
    const [segment, notify] = await Promise.allSettled([
      addToSegment(RESEND_API_KEY, email, magnet.segmentId),
      resend(RESEND_API_KEY, '/emails', {
        from: FROM_EMAIL,
        to: [HQ_NOTIFY_EMAIL],
        subject: `New lead: ${magnet.title}`,
        html: notifyEmailHtml(magnet, email),
      }),
    ]);
    const saved = [segment, notify].map((r) => r.status === 'fulfilled' && r.value.ok);
    for (const [i, r] of [segment, notify].entries()) {
      if (!saved[i]) {
        const detail = r.status === 'fulfilled' ? await r.value.text() : String(r.reason);
        console.error(`Lead ${i === 0 ? 'segment' : 'notify'} failed:`, detail);
      }
    }
    if (!saved.some(Boolean)) throw new Error('Could not record the lead');

    // Delivery email is best-effort: the page already shows the download buttons.
    try {
      const response = await resend(RESEND_API_KEY, '/emails', {
        from: FROM_EMAIL,
        to: [email],
        subject: `Your list: ${magnet.title}`,
        html: deliveryEmailHtml(magnet),
      });
      if (!response.ok) console.error('Delivery email error:', await response.text());
    } catch (sendError) {
      console.error('Failed to send delivery email:', sendError);
    }

    return jsonResponse({ success: true, files: magnet.files }, 200);
  } catch (error) {
    console.error('Error processing lead magnet request:', error);
    return jsonResponse({ error: 'Failed to process request. Please try again later.' }, 500);
  }
});
