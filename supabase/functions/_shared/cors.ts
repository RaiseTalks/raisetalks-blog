// Shared CORS headers for Supabase Edge Functions

export const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://raisetalks.com',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}