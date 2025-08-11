// Supabase Edge Function for handling feature requests and sending to Telegram
// Follow the guide at https://supabase.com/docs/guides/functions

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { corsHeaders } from '../_shared/cors.ts'

interface FeatureRequestPayload {
  name: string
  email: string
  featureType: string
  priority: string
  description: string
  useCase: string
}

// Rate limiting store (in production, use Supabase database)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(email: string): boolean {
  const now = Date.now()
  const limit = 5 // 5 requests per hour
  const window = 3600000 // 1 hour in milliseconds
  
  const record = rateLimitMap.get(email)
  
  if (!record || record.resetTime < now) {
    rateLimitMap.set(email, { count: 1, resetTime: now + window })
    return true
  }
  
  if (record.count >= limit) {
    return false
  }
  
  record.count++
  return true
}

async function sendToTelegram(
  botToken: string,
  chatId: string,
  message: string
): Promise<Response> {
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`
  
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
  })
  
  return response
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Get environment variables
    const TELEGRAM_BOT_TOKEN = Deno.env.get('TELEGRAM_BOT_TOKEN')
    const TELEGRAM_CHAT_ID = Deno.env.get('TELEGRAM_CHAT_ID')
    
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      throw new Error('Telegram credentials not configured')
    }

    // Parse request body
    const data: FeatureRequestPayload = await req.json()
    
    // Validate required fields
    if (!data.email || !data.description) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email address' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }
    
    // Check rate limit
    if (!checkRateLimit(data.email)) {
      return new Response(
        JSON.stringify({ error: 'Too many requests. Please try again later.' }),
        {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }
    
    // Format message for Telegram
    const message = `
🚀 <b>New Feature Request</b>

<b>From:</b> ${data.name || 'Anonymous'} (${data.email})
<b>Type:</b> ${data.featureType.replace('-', ' ').toUpperCase()}
<b>Priority:</b> ${data.priority.toUpperCase()}

<b>Description:</b>
${data.description}

${data.useCase ? `<b>Use Case:</b>\n${data.useCase}` : ''}

---
<i>Submitted via RaiseTalks Feature Request Form</i>
    `.trim()
    
    // Send to Telegram
    const telegramResponse = await sendToTelegram(
      TELEGRAM_BOT_TOKEN,
      TELEGRAM_CHAT_ID,
      message
    )
    
    if (!telegramResponse.ok) {
      const error = await telegramResponse.text()
      console.error('Telegram API error:', error)
      throw new Error('Failed to send message to Telegram')
    }
    
    // Optional: Store in Supabase database for backup
    // const { data: dbData, error: dbError } = await supabase
    //   .from('feature_requests')
    //   .insert([data])
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Feature request submitted successfully' 
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
    
  } catch (error) {
    console.error('Error processing feature request:', error)
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to process request. Please try again later.' 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})