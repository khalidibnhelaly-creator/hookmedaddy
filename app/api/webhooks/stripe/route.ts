import { stripe } from '@/lib/stripe'
import { supabaseAdmin } from '@/lib/supabase'
import { PLANS } from '@/lib/stripe'
import { NextRequest } from 'next/server'

const CREDIT_MAP: Record<string, number> = {
  [process.env.STRIPE_STARTER_PRICE_ID!]: PLANS.starter.credits,
  [process.env.STRIPE_PRO_PRICE_ID!]: PLANS.pro.credits,
  [process.env.STRIPE_AGENCY_PRICE_ID!]: PLANS.agency.credits,
}

const PLAN_MAP: Record<string, string> = {
  [process.env.STRIPE_STARTER_PRICE_ID!]: 'starter',
  [process.env.STRIPE_PRO_PRICE_ID!]: 'pro',
  [process.env.STRIPE_AGENCY_PRICE_ID!]: 'agency',
}

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return Response.json({ error: 'webhook_signature_failed' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as { metadata?: Record<string, string>; subscription?: string }
    const clerkUserId = session.metadata?.clerk_user_id
    const subscriptionId = session.subscription as string

    if (!clerkUserId) return Response.json({ received: true })

    const subscription = await stripe.subscriptions.retrieve(subscriptionId)
    const priceId = subscription.items.data[0].price.id
    const credits = CREDIT_MAP[priceId] || 500
    const planTier = PLAN_MAP[priceId] || 'starter'

    await supabaseAdmin.from('hookme_profiles').upsert({
      clerk_user_id: clerkUserId,
      plan_tier: planTier,
      credits: credits,
      stripe_subscription_id: subscriptionId,
      stripe_customer_id: subscription.customer as string,
    }, { onConflict: 'clerk_user_id' })
  }

  if (event.type === 'invoice.payment_succeeded') {
    const invoice = event.data.object as { subscription?: string; billing_reason?: string }
    if (invoice.billing_reason === 'subscription_cycle') {
      const subscription = await stripe.subscriptions.retrieve(invoice.subscription as string)
      const priceId = subscription.items.data[0].price.id
      const credits = CREDIT_MAP[priceId] || 500
      const planTier = PLAN_MAP[priceId] || 'starter'

      await supabaseAdmin.from('hookme_profiles')
        .update({ credits, plan_tier: planTier })
        .eq('stripe_subscription_id', invoice.subscription)
    }
  }

  if (event.type === 'customer.subscription.deleted') {
    const subscription = event.data.object as { id: string }
    await supabaseAdmin.from('hookme_profiles')
      .update({ plan_tier: 'free', credits: 0, stripe_subscription_id: null })
      .eq('stripe_subscription_id', subscription.id)
  }

  return Response.json({ received: true })
}
