'use client'
import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'

declare global {
  interface Window {
    Paddle: {
      Initialize: (options: { token: string }) => void
      Checkout: {
        open: (options: {
          items: Array<{ priceId: string; quantity: number }>
          customData: { clerk_user_id: string }
          settings?: {
            successUrl?: string
            displayMode?: string
          }
        }) => void
      }
    }
  }
}

const PLANS = [
  {
    name: 'Free',
    monthlyPrice: 0,
    yearlyPrice: 0,
    monthlyCredits: 1000,
    yearlyCredits: 1000,
    yearlyTotal: 0,
    discount: 0,
    discountAmount: 0,
    description: 'Try the full engine.',
    features: [
      '1,000 credits on signup',
      '20 credits per social post',
      '40 credits per video script',
      'All 5 awareness stages',
      '12 platforms supported',
      'English and Bangla',
      'Generation history',
      'Excel export',
    ],
    cta: 'Start free',
    monthlyPriceId: null,
    yearlyPriceId: null,
    highlight: false,
  },
  {
    name: 'Starter',
    monthlyPrice: 19,
    yearlyPrice: 179,
    monthlyCredits: 5000,
    yearlyCredits: 60000,
    yearlyTotal: 228,
    discount: 21.49,
    discountAmount: 49,
    description: 'For solo brand owners.',
    features: [
      '5,000 credits per month',
      '60,000 credits per year',
      '5 hooks per generation',
      'Single awareness stage',
      'Visual brief included',
      'Campaign context engine',
      'A/B hook variants',
      'English and Bangla',
    ],
    cta: 'Get Starter',
    monthlyPriceId: 'pri_01kpacsp2y8zhqdkzc8mes760d',
    yearlyPriceId: 'pri_01kpad3f5eyyxvjge98ytkcfkz',
    highlight: false,
  },
  {
    name: 'Pro',
    monthlyPrice: 49,
    yearlyPrice: 449,
    monthlyCredits: 9000,
    yearlyCredits: 108000,
    yearlyTotal: 588,
    discount: 23.64,
    discountAmount: 139,
    description: 'For performance marketers.',
    features: [
      '9,000 credits per month',
      '108,000 credits per year',
      '10 hooks per generation',
      'All 5 awareness stages at once',
      'Video and reel script mode',
      'Hook anatomy breakdown',
      'Save and organise library',
      'CSV and Excel export',
    ],
    cta: 'Get Pro',
    monthlyPriceId: 'pri_01kpad6ba2eespyvnzvyfdx82d',
    yearlyPriceId: 'pri_01kpad7kq5pyq2wj6qnkvsxqb3',
    highlight: true,
  },
  {
    name: 'Agency',
    monthlyPrice: 99,
    yearlyPrice: 769,
    monthlyCredits: 20000,
    yearlyCredits: 240000,
    yearlyTotal: 1188,
    discount: 35.27,
    discountAmount: 419,
    description: 'For agencies and teams.',
    features: [
      '20,000 credits per month',
      '240,000 credits per year',
      'Everything in Pro',
      'Multi-brand workspaces',
      '5 team seats included',
      'White-label PDF export',
      'Priority generation speed',
      'Dedicated onboarding call',
    ],
    cta: 'Get Agency',
    monthlyPriceId: 'pri_01kpadakmx9b669bcpgfw0yact',
    yearlyPriceId: 'pri_01kpadcgqbkjgbtxfs7swe1gf0',
    highlight: false,
  },
]

export default function PricingPage() {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly')
  const [paddleReady, setPaddleReady] = useState(false)
  const { user } = useUser()

  useEffect(() => {
    if (document.getElementById('paddle-js')) {
      setPaddleReady(true)
      return
    }
    const script = document.createElement('script')
    script.id = 'paddle-js'
    script.src = 'https://cdn.paddle.com/paddle/v2/paddle.js'
    script.onload = () => {
      window.Paddle.Initialize({ token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN! })
      setPaddleReady(true)
    }
    document.head.appendChild(script)
  }, [])

  const handleCheckout = (plan: typeof PLANS[0]) => {
    const priceId = billing === 'yearly' ? plan.yearlyPriceId : plan.monthlyPriceId
    if (!priceId) {
      window.location.href = '/sign-up'
      return
    }
    if (!user) {
      window.location.href = '/sign-up'
      return
    }
    if (!paddleReady || !window.Paddle) {
      alert('Payment system loading. Please try again.')
      return
    }
    window.Paddle.Checkout.open({
      items: [{ priceId, quantity: 1 }],
      customData: { clerk_user_id: user.id },
      settings: {
        successUrl: `${window.location.origin}/dashboard?upgraded=true`,
      },
    })
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', fontFamily: 'var(--font-sans)' }}>
      <nav style={{ borderBottom: '1px solid var(--border)', padding: '0 40px', height: 58, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="/" style={{ fontFamily: 'var(--font-serif)', fontSize: 18, color: 'var(--ink)', textDecoration: 'none' }}>
          Hook<span style={{ color: 'var(--accent)' }}>Me</span>Daddy
        </a>
        <a href="/sign-in" style={{ fontSize: 13, color: 'var(--muted)', textDecoration: 'none' }}>Sign in</a>
      </nav>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 40px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 16 }}>Pricing</div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 48, fontWeight: 400, letterSpacing: '-1px', lineHeight: 1.1, marginBottom: 16 }}>
            Start free. Scale when ready.
          </h1>
          <p style={{ fontSize: 16, color: 'var(--muted)', maxWidth: 480, margin: '0 auto 32px' }}>
            No credit card required to start. 1,000 free credits on signup. Cancel anytime.
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', background: 'white', border: '1px solid var(--border)', borderRadius: 4, padding: 4, gap: 4 }}>
            <button onClick={() => setBilling('monthly')} style={{ padding: '8px 20px', fontSize: 13, fontWeight: 600, borderRadius: 2, border: 'none', cursor: 'pointer', background: billing === 'monthly' ? 'var(--ink)' : 'transparent', color: billing === 'monthly' ? 'white' : 'var(--muted)', transition: 'all 0.15s' }}>
              Monthly
            </button>
            <button onClick={() => setBilling('yearly')} style={{ padding: '8px 20px', fontSize: 13, fontWeight: 600, borderRadius: 2, border: 'none', cursor: 'pointer', background: billing === 'yearly' ? 'var(--ink)' : 'transparent', color: billing === 'yearly' ? 'white' : 'var(--muted)', transition: 'all 0.15s', display: 'flex', alignItems: 'center', gap: 8 }}>
              Yearly
              <span style={{ background: 'var(--accent)', color: 'white', fontSize: 10, fontWeight: 700, padding: '2px 6px', borderRadius: 2 }}>Save up to 35%</span>
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {PLANS.map((plan) => {
            const price = billing === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice
            const credits = billing === 'yearly' ? plan.yearlyCredits : plan.monthlyCredits
            const showDiscount = billing === 'yearly' && plan.discount > 0
            return (
              <div key={plan.name} style={{ background: plan.highlight ? 'var(--ink)' : 'white', border: `1px solid ${plan.highlight ? 'var(--ink)' : 'var(--border)'}`, borderRadius: 4, padding: '32px 24px', position: 'relative', display: 'flex', flexDirection: 'column' }}>
                {plan.highlight && (
                  <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: 'var(--accent)', color: 'white', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '4px 12px', borderRadius: 2, whiteSpace: 'nowrap' }}>Most popular</div>
                )}
                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: plan.highlight ? 'rgba(255,255,255,0.5)' : 'var(--muted)', marginBottom: 8 }}>{plan.name}</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
                    <span style={{ fontFamily: 'var(--font-serif)', fontSize: 40, color: plan.highlight ? 'white' : 'var(--ink)', fontWeight: 400 }}>{price === 0 ? 'Free' : `$${price}`}</span>
                    {price > 0 && <span style={{ fontSize: 13, color: plan.highlight ? 'rgba(255,255,255,0.5)' : 'var(--muted)' }}>/{billing === 'yearly' ? 'year' : 'mo'}</span>}
                  </div>
                  {showDiscount && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                      <span style={{ fontSize: 12, color: plan.highlight ? 'rgba(255,255,255,0.4)' : 'var(--muted)', textDecoration: 'line-through' }}>${plan.yearlyTotal}/year</span>
                      <span style={{ background: plan.highlight ? 'var(--accent)' : '#E8F5E9', color: plan.highlight ? 'white' : '#2E7D32', fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 2 }}>Save ${plan.discountAmount} ({plan.discount}% off)</span>
                    </div>
                  )}
                  <div style={{ fontSize: 12, color: plan.highlight ? 'rgba(255,255,255,0.6)' : 'var(--muted)', marginTop: 4 }}>{credits.toLocaleString()} credits {billing === 'yearly' ? 'per year' : 'per month'}</div>
                  <div style={{ fontSize: 13, color: plan.highlight ? 'rgba(255,255,255,0.7)' : 'var(--muted)', marginTop: 8 }}>{plan.description}</div>
                </div>
                <div style={{ flex: 1, marginBottom: 24 }}>
                  {plan.features.map((f) => (
                    <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 10 }}>
                      <span style={{ color: 'var(--accent)', fontSize: 14, marginTop: 1, flexShrink: 0 }}>✓</span>
                      <span style={{ fontSize: 13, color: plan.highlight ? 'rgba(255,255,255,0.8)' : 'var(--ink)', lineHeight: 1.4 }}>{f}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => handleCheckout(plan)}
                  style={{ display: 'block', width: '100%', textAlign: 'center', padding: '12px', fontSize: 13, fontWeight: 600, borderRadius: 2, cursor: 'pointer', background: plan.highlight ? 'var(--accent)' : 'transparent', color: plan.highlight ? 'white' : 'var(--ink)', border: `1px solid ${plan.highlight ? 'var(--accent)' : 'var(--border)'}` }}>
                  {plan.cta}
                </button>
              </div>
            )
          })}
        </div>

        <div style={{ marginTop: 64, background: 'white', border: '1px solid var(--border)', borderRadius: 4, padding: '40px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 12 }}>Credit costs</div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 24, fontWeight: 400, marginBottom: 24 }}>How credits work</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {[
              { action: 'Social post generation', cost: '20 credits', note: 'Hook + caption + CTA + visual brief' },
              { action: 'Video script generation', cost: '40 credits', note: 'Full reel or short-form script' },
              { action: 'All 5 stages at once', cost: '80 credits', note: 'Complete awareness pyramid stack' },
            ].map((item) => (
              <div key={item.action} style={{ padding: '20px', background: 'var(--bg)', borderRadius: 2 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 4 }}>{item.action}</div>
                <div style={{ fontSize: 22, fontFamily: 'var(--font-serif)', color: 'var(--accent)', marginBottom: 4 }}>{item.cost}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>{item.note}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 64 }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 400, marginBottom: 32, textAlign: 'center' }}>Common questions</h2>
          <div style={{ maxWidth: 640, margin: '0 auto' }}>
            {[
              { q: 'Do unused credits roll over?', a: 'Free tier credits do not expire. Monthly paid plan credits reset each month. Yearly plan credits are available for the full year.' },
              { q: 'Can I cancel anytime?', a: 'Yes. Cancel from your account settings anytime. No questions asked.' },
              { q: 'What languages are supported?', a: 'English and Bangla with native cultural intelligence. More languages coming.' },
              { q: 'What is the Schwartz Pyramid?', a: 'Eugene Schwartz mapped five stages of buyer awareness in Breakthrough Advertising (1966). Every stage requires a fundamentally different message. HookMeDaddy is built entirely on this framework.' },
              { q: 'Is there a refund policy?', a: 'Yes. If the Service did not work as described, you get your money back. See our refund policy for full details.' },
            ].map((item) => (
              <div key={item.q} style={{ borderBottom: '1px solid var(--border)', padding: '20px 0' }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)', marginBottom: 8 }}>{item.q}</div>
                <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.6 }}>{item.a}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer style={{ borderTop: '1px solid var(--border)', padding: '32px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: 15, color: 'var(--ink)' }}>Hook<span style={{ color: 'var(--accent)' }}>Me</span>Daddy</div>
        <div style={{ display: 'flex', gap: 24 }}>
          {[['About', '/about'], ['Terms', '/terms'], ['Privacy', '/privacy'], ['Refund', '/refund']].map(([label, href]) => (
            <a key={label} href={href} style={{ fontSize: 12, color: 'var(--muted)', textDecoration: 'none' }}>{label}</a>
          ))}
        </div>
      </footer>
    </div>
  )
}
