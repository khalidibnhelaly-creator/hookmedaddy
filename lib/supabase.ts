import { createClient } from '@supabase/supabase-js'

export function getSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY!
  return createClient(supabaseUrl, supabaseSecretKey)
}

export function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  return createClient(supabaseUrl, supabasePublishableKey)
}

export const supabase = {
  get client() { return getSupabaseClient() }
}

export const supabaseAdmin = {
  from: (table: string) => getSupabaseAdmin().from(table),
  rpc: (fn: string, params?: Record<string, unknown>) => getSupabaseAdmin().rpc(fn, params),
  auth: { getUser: () => getSupabaseAdmin().auth.getUser() }
}
