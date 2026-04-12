import { supabaseAdmin } from '@/lib/supabase'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()

  if (body.type === 'user.created') {
    await supabaseAdmin.from('hookme_profiles').insert({
      clerk_user_id: body.data.id,
      plan_tier: 'free',
      credits: 100,
    })
  }

  return Response.json({ received: true })
}
