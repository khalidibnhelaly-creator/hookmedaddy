import { auth } from '@clerk/nextjs/server'
import Stripe from 'stripe'
import { PLANS } from '@/lib/stripe'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return Response.json({ error: 'unauthorized' }, { status: 401 })

  const { planKey } = await req.json()
  const plan = PLANS[planKey as keyof typeof PLANS]
  if (!plan) return Response.json({ error: 'invalid_plan' }, { status: 400 })

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2026-03-25.dahlia' as const,
  })

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [{ price: plan.priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?upgraded=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
    metadata: { clerk_user_id: userId },
  })

  return Response.json({ url: session.url })
}
