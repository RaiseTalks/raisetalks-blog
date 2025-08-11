// API endpoint for handling feature requests and sending to Telegram
// This file should be placed in the appropriate API directory for your setup
// For Docusaurus, you might need to create a separate Express server or use a serverless function

interface FeatureRequestPayload {
  name: string;
  email: string;
  featureType: string;
  priority: string;
  description: string;
  useCase: string;
  message: string;
}

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Clean up old entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimitStore.entries()) {
    if (value.resetTime < now) {
      rateLimitStore.delete(key);
    }
  }
}, 60000); // Clean up every minute

function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const limit = 5; // 5 requests per hour
  const window = 3600000; // 1 hour in milliseconds
  
  const record = rateLimitStore.get(identifier);
  
  if (!record || record.resetTime < now) {
    rateLimitStore.set(identifier, { count: 1, resetTime: now + window });
    return true;
  }
  
  if (record.count >= limit) {
    return false;
  }
  
  record.count++;
  return true;
}

async function sendToTelegram(message: string): Promise<boolean> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  
  if (!botToken || !chatId) {
    console.error('Telegram credentials not configured');
    return false;
  }
  
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown',
        disable_web_page_preview: true,
      }),
    });
    
    if (!response.ok) {
      const error = await response.text();
      console.error('Telegram API error:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Failed to send Telegram message:', error);
    return false;
  }
}

// Email fallback function (implement with your email service)
async function sendEmailFallback(data: FeatureRequestPayload): Promise<void> {
  // Implement email sending logic here
  // You can use services like SendGrid, AWS SES, or Nodemailer
  console.log('Email fallback:', data);
}

// Main handler function (adapt this based on your server setup)
export async function handleFeatureRequest(req: Request): Promise<Response> {
  // CORS headers
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': process.env.NODE_ENV === 'production' 
      ? 'https://your-domain.com' 
      : '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
  
  // Handle preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers });
  }
  
  // Only accept POST
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers }
    );
  }
  
  try {
    const data: FeatureRequestPayload = await req.json();
    
    // Validate required fields
    if (!data.email || !data.description) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers }
      );
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email address' }),
        { status: 400, headers }
      );
    }
    
    // Rate limiting
    const clientIp = req.headers.get('x-forwarded-for') || 
                     req.headers.get('x-real-ip') || 
                     'unknown';
    
    if (!checkRateLimit(`${clientIp}-${data.email}`)) {
      return new Response(
        JSON.stringify({ error: 'Too many requests. Please try again later.' }),
        { status: 429, headers }
      );
    }
    
    // Sanitize input (basic XSS prevention)
    const sanitize = (str: string) => str
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
    
    const sanitizedData = {
      ...data,
      name: sanitize(data.name || ''),
      email: sanitize(data.email),
      description: sanitize(data.description),
      useCase: sanitize(data.useCase || ''),
    };
    
    // Send to Telegram
    const telegramSuccess = await sendToTelegram(data.message);
    
    // Fallback to email if Telegram fails
    if (!telegramSuccess) {
      await sendEmailFallback(sanitizedData);
    }
    
    // Log for analytics (implement your logging)
    console.log('Feature request submitted:', {
      email: sanitizedData.email,
      type: sanitizedData.featureType,
      priority: sanitizedData.priority,
      timestamp: new Date().toISOString(),
    });
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Feature request submitted successfully' 
      }),
      { status: 200, headers }
    );
    
  } catch (error) {
    console.error('Error processing feature request:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error. Please try again later.' 
      }),
      { status: 500, headers }
    );
  }
}

// For Express.js integration
export function expressHandler(req: any, res: any) {
  const request = new Request('http://localhost' + req.url, {
    method: req.method,
    headers: req.headers,
    body: req.method === 'POST' ? JSON.stringify(req.body) : undefined,
  });
  
  handleFeatureRequest(request).then(response => {
    res.status(response.status);
    response.json().then(data => res.json(data));
  });
}

// For Vercel/Netlify Functions
export default handleFeatureRequest;