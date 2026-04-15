import { supabaseAdmin } from '@/lib/supabase'
import { headers } from 'next/headers'

export async function POST(req: Request) {
  try {
    const headersList = await headers()
    const svix_id = headersList.get('svix-id')

    if (!svix_id) {
      return Response.json({ error: 'Missing svix headers' }, { status: 400 })
    }

    const body = await req.text()
    const payload = JSON.parse(body)
    const eventType = payload.type as string
    console.log('Clerk webhook received:', eventType)

    if (eventType === 'user.created') {
      const userId = payload.data.id as string
      console.log('Creating profile for user:', userId)

      const { error } = await supabaseAdmin
        .from('hookme_profiles')
        .insert({
          clerk_user_id: userId,
          plan_tier: 'free',
          credits: 1000,
        })

      if (error) {
        console.error('Supabase insert error:', JSON.stringify(error))
        return Response.json({ error: 'Database error', detail: error.message }, { status: 500 })
      }

      console.log('Profile created successfully for:', userId)
    }

    return Response.json({ received: true }, { status: 200 })
  } catch (e: unknown) {
    const err = e as Error
    console.error('Webhook error:', err.message)
    return Response.json({ error: err.message }, { status: 500 })
  }
}
