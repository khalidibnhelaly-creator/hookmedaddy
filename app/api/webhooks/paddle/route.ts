import { supabaseAdmin } from '@/lib/supabase'
import { NextRequest } from 'next/server'
import crypto from 'crypto'

const CREDIT_MAP: Record<string, number> = {
  [process.env.PADDLE_STARTER_MONTHLY_PRICE_ID!]: 5000,
  [process.env.PADDLE_STARTER_YEARLY_PRICE_ID!]: 60000,
  [process.env.PADDLE_PRO_MONTHLY_PRICE_ID!]: 9000,
  [process.env.PADDLE_PRO_YEARLY_PRICE_ID!]: 108000,
  [process.env.PADDLE_AGENCY_MONTHLY_PRICE_ID!]: 20000,
  [process.env.PADDLE_AGENCY_YEARLY_PRICE_ID!]: 240000,
}

const PLAN_MAP: Record<string, string> = {
  [process.env.PADDLE_STARTER_MONTHLY_PRICE_ID!]: 'starter',
  [process.env.PADDLE_STARTER_YEARLY_PRICE_ID!]: 'starter',
  [process.env.PADDLE_PRO_MONTHLY_PRICE_ID!]: 'pro',
  [process.env.PADDLE_PRO_YEARLY_PRICE_ID!]: 'pro',
  [process.env.PADDLE_AGENCY_MONTHLY_PRICE_ID!]: 'agency',
  [process.env.PADDLE_AGENCY_YEARLY_PRICE_ID!]: 'agency',
}

function verifyPaddleWebhook(rawBody: string, signature: string, secret: string): boolean {
  try {
    const parts = signature.split(';')
    const tsPart = parts.find(p => p.startsWith('ts='))
    const h1Part = parts.find(p => p.startsWith('h1='))
    if (!tsPart || !h1Part) return false
    const ts = tsPart.split('=')[1]
    const h1 = h1Part.split('=')[1]
    const signedPayload = `${ts}:${rawBody}`
    const expectedSig = crypto.createHmac('sha256', secret).update(signedPayload).digest('hex')
    return crypto.timingSafeEqual(Buffer.from(h1), Buffer.from(expectedSig))
  } catch {
    return false
  }
}

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text()
    const signature = req.headers.get('paddle-signature') || ''
    const secret = process.env.PADDLE_WEBHOOK_SECRET!

    if (secret && !verifyPaddleWebhook(rawBody, signature, secret)) {
      console.error('Paddle webhook signature verification failed')
      return Response.json({ error: 'invalid_signature' }, { status: 401 })
    }

    const event = JSON.parse(rawBody)
    const eventType = event.event_type
    console.log('Paddle webhook event:', eventType)

    if (eventType === 'subscription.activated' || eventType === 'transaction.completed') {
      const clerkUserId = event.data?.custom_data?.clerk_user_id
      const items = event.data?.items || []
      const priceId = items[0]?.price?.id

      console.log('Paddle event data:', { clerkUserId, priceId, eventType })

      if (!clerkUserId || !priceId) {
        console.error('Missing clerkUserId or priceId', { clerkUserId, priceId })
        return Response.json({ received: true })
      }

      const credits = CREDIT_MAP[priceId]
      const planTier = PLAN_MAP[priceId]

      if (!credits || !planTier) {
        console.error('Unknown price ID:', priceId)
        return Response.json({ received: true })
      }

      const { error } = await supabaseAdmin
        .from('hookme_profiles')
        .update({
          credits,
          plan_tier: planTier,
          paddle_subscription_id: event.data?.id || null,
          paddle_customer_id: event.data?.customer_id || null,
        })
        .eq('clerk_user_id', clerkUserId)

      if (error) {
        console.error('Supabase update error:', error)
        return Response.json({ error: 'db_error' }, { status: 500 })
      }

      console.log(`Credits assigned: ${credits} to user ${clerkUserId} on plan ${planTier}`)
    }

    if (eventType === 'subscription.updated') {
      const clerkUserId = event.data?.custom_data?.clerk_user_id
      const items = event.data?.items || []
      const priceId = items[0]?.price?.id

      if (clerkUserId && priceId && CREDIT_MAP[priceId]) {
        await supabaseAdmin
          .from('hookme_profiles')
          .update({
            credits: CREDIT_MAP[priceId],
            plan_tier: PLAN_MAP[priceId],
          })
          .eq('clerk_user_id', clerkUserId)
      }
    }

    if (eventType === 'subscription.canceled') {
      const clerkUserId = event.data?.custom_data?.clerk_user_id
      if (clerkUserId) {
        await supabaseAdmin
          .from('hookme_profiles')
          .update({ plan_tier: 'free', credits: 0, paddle_subscription_id: null })
          .eq('clerk_user_id', clerkUserId)
        console.log('Subscription canceled for:', clerkUserId)
      }
    }

    return Response.json({ received: true })
  } catch (e: unknown) {
    const err = e as Error
    console.error('Paddle webhook error:', err.message)
    return Response.json({ error: err.message }, { status: 500 })
  }
}
