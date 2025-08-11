# Supabase Edge Function Setup for Telegram Integration

This guide will help you deploy the feature request form with Telegram bot integration using Supabase Edge Functions.

## Prerequisites

1. Supabase project (you already have: `migpdbkjrycqhjzyhkfd.supabase.co`)
2. Telegram bot token and chat ID (already in your `.env.local`)
3. Supabase CLI installed

## Step 1: Install Supabase CLI

```bash
# Install via npm
npm install -g supabase

# Or via Homebrew (macOS)
brew install supabase/tap/supabase
```

## Step 2: Login to Supabase

```bash
supabase login
```

## Step 3: Link Your Project

```bash
# In your project directory
supabase link --project-ref migpdbkjrycqhjzyhkfd
```

## Step 4: Set Environment Variables

Set your Telegram credentials as secrets in Supabase:

```bash
# Set the Telegram bot token
supabase secrets set TELEGRAM_BOT_TOKEN=8452735934:AAFJo5JncjUkciyNfG4PRDmpIoLXCekaZj0

# Set the Telegram chat ID
supabase secrets set TELEGRAM_CHAT_ID=-4611790303
```

## Step 5: Deploy the Edge Function

```bash
# Deploy the feature-request function
supabase functions deploy feature-request
```

## Step 6: Get Your Anon Key

You can find your anon key in the Supabase dashboard:
1. Go to Settings > API
2. Copy the `anon` public key
3. Add it to your `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://migpdbkjrycqhjzyhkfd.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

## Step 7: Test the Function

You can test the function directly:

```bash
# Test with curl
curl -X POST 'https://migpdbkjrycqhjzyhkfd.supabase.co/functions/v1/feature-request' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer YOUR_ANON_KEY' \
  --data '{
    "name": "Test User",
    "email": "test@example.com",
    "featureType": "enhancement",
    "priority": "medium",
    "description": "Test feature request",
    "useCase": "Testing the integration"
  }'
```

## Optional: Store Requests in Database

You can also store feature requests in your Supabase database:

### Create the table:

```sql
CREATE TABLE feature_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT,
  email TEXT NOT NULL,
  feature_type TEXT NOT NULL,
  priority TEXT NOT NULL,
  description TEXT NOT NULL,
  use_case TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS policies
ALTER TABLE feature_requests ENABLE ROW LEVEL SECURITY;

-- Allow inserts from authenticated users or anon
CREATE POLICY "Allow inserts" ON feature_requests
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- Allow reads for authenticated users only
CREATE POLICY "Allow reads for authenticated" ON feature_requests
  FOR SELECT TO authenticated
  USING (true);
```

### Update the Edge Function to store in database:

Add this to your Edge Function after sending to Telegram:

```typescript
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Create Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
)

// Store in database
const { data: dbData, error: dbError } = await supabase
  .from('feature_requests')
  .insert([{
    name: data.name,
    email: data.email,
    feature_type: data.featureType,
    priority: data.priority,
    description: data.description,
    use_case: data.useCase,
  }])

if (dbError) {
  console.error('Database error:', dbError)
  // Don't fail the request if DB insert fails
}
```

## Environment Variables Summary

For local development (`.env.local`):
```
NEXT_PUBLIC_SUPABASE_URL=https://migpdbkjrycqhjzyhkfd.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

For Supabase Edge Function (set via CLI):
```
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id
```

## Monitoring

View function logs:
```bash
supabase functions logs feature-request
```

## Troubleshooting

### CORS Issues
The function includes CORS headers. If you still have issues, update the `_shared/cors.ts` file to specify your domain:

```typescript
export const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://your-domain.com',
  // ... rest of headers
}
```

### Rate Limiting
The function includes basic rate limiting (5 requests per hour per email). For production, consider storing rate limit data in the database.

### Function Not Found
Make sure you've deployed the function:
```bash
supabase functions deploy feature-request
```

### Authentication Issues
Ensure you're using the correct anon key in the Authorization header.

## Security Notes

1. The Telegram bot token is stored as a secret in Supabase (not exposed to client)
2. Rate limiting prevents spam
3. Input validation prevents malicious data
4. CORS headers restrict access
5. Consider adding CAPTCHA for additional protection

## Testing Checklist

- [ ] Function deployed successfully
- [ ] Environment variables set
- [ ] Form submits without errors
- [ ] Message appears in Telegram
- [ ] Success message shows to user
- [ ] Form clears after submission
- [ ] Rate limiting works
- [ ] Error handling works

## Production Considerations

1. Update CORS headers to your production domain
2. Implement database storage for audit trail
3. Add more sophisticated rate limiting
4. Consider adding CAPTCHA
5. Set up monitoring and alerts
6. Implement retry logic for Telegram API failures