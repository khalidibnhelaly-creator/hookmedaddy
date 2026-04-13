import { supabaseAdmin } from '@/lib/supabase'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    console.log('Clerk webhook event:', body.type)

    if (body.type === 'user.created') {
      const { error } = await supabaseAdmin
        .from('hookme_profiles')
        .insert({
          clerk_user_id: body.data.id,
          plan_tier: 'free',
          credits: 100,
        })
      console.log('Profile created for:', body.data.id, 'Error:', error)
    }

    return Response.json({ received: true })
  } catch (e) {
    console.error('Webhook error:', e)
    return Response.json({ error: 'webhook_failed' }, { status: 500 })
  }
}
