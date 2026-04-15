'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const PLANS = [
  {
    name: 'Free',
    price: 0,
    credits: 1000,
    period: 'one time',
    description: 'Try the full engine.',
    features: [
      '1000 credits on signup',
      '20 credits per social post',
      '40 credits per video script',
      'All 5 awareness stages',
      '12 platforms supported',
      'English and Bangla',
      'Generation history',
      'Excel export',
    ],
    cta: 'Start free',
    href: '/sign-up',
    highlight: false,
  },
  {
    name: 'Starter',
    price: 19,
    credits: 20000,
    period: 'per month',
    description: 'For solo brand owners.',
    features: [
      '20000 credits per month',
      'All Free features',
      '5 hooks per generation',
      'Single awareness stage',
      'Visual brief included',
      'Campaign context engine',
      'A/B hook variants',
    ],
    cta: 'Get Starter',
    href: '/sign-up',
    highlight: false,
  },
  {
    name: 'Pro',
    price: 49,
    credits: 9000,
    period: 'per month',
    description: 'For performance marketers.',
    features: [
      '9000 credits per month',
      'All Starter features',
      '10 hooks per generation',
      'All 5 stages at once',
      'Video and reel script mode',
      'Hook anatomy breakdown',
      'Save and organise library',
      'CSV and Excel export',
    ],
    cta: 'Get Pro',
    href: '/sign-up',
    highlight: true,
  },
  {
    name: 'Agency',
    price: 99,
    credits: 20000,
    period: 'per month',
    description: 'For agencies and teams.',
    features: [
      '20000 credits per month',
      'All Pro features',
      'Multi-brand workspaces',
      '5 team seats included',
      'White-label PDF export',
      'Priority generation speed',
      'Dedicated onboarding call',
    ],
    cta: 'Get Agency',
    href: '/sign-up',
    highlight: false,
  },
]

export default function PricingPage() {
  const router = useRouter()

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', fontFamily: 'var(--font-sans)' }}>

      {/* Nav */}
      <nav style={{ borderBottom: '1px solid var(--border)', padding: '0 40px', height: 58, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="/" style={{ fontFamily: 'var(--font-serif)', fontSize: 18, color: 'var(--ink)', textDecoration: 'none', fontWeight: 400 }}>
          Hook<span style={{ color: 'var(--accent)' }}>Me</span>Daddy
        </a>
        <a href="/sign-in" style={{ fontSize: 13, color: 'var(--muted)', textDecoration: 'none' }}>Sign in</a>
      </nav>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 40px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 16 }}>Pricing</div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 48, fontWeight: 400, letterSpacing: '-1px', lineHeight: 1.1, marginBottom: 16 }}>
            Start free. Scale when ready.
          </h1>
          <p style={{ fontSize: 16, color: 'var(--muted)', maxWidth: 480, margin: '0 auto' }}>
            No credit card required to start. 1000 free credits on signup. Cancel anytime.
          </p>
        </div>

        {/* Plans grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {PLANS.map((plan) => (
            <div key={plan.name} style={{
              background: plan.highlight ? 'var(--ink)' : 'white',
              border: `1px solid ${plan.highlight ? 'var(--ink)' : 'var(--border)'}`,
              borderRadius: 4,
              padding: '32px 24px',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
            }}>
              {plan.highlight && (
                <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: 'var(--accent)', color: 'white', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '4px 12px', borderRadius: 2 }}>
                  Most popular
                </div>
              )}

              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: plan.highlight ? 'rgba(255,255,255,0.5)' : 'var(--muted)', marginBottom: 8 }}>{plan.name}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
                  <span style={{ fontFamily: 'var(--font-serif)', fontSize: 40, color: plan.highlight ? 'white' : 'var(--ink)', fontWeight: 400 }}>${plan.price}</span>
                  {plan.price > 0 && <span style={{ fontSize: 13, color: plan.highlight ? 'rgba(255,255,255,0.5)' : 'var(--muted)' }}>/mo</span>}
                </div>
                <div style={{ fontSize: 12, color: plan.highlight ? 'rgba(255,255,255,0.6)' : 'var(--muted)' }}>{plan.credits.toLocaleString()} credits {plan.period}</div>
                <div style={{ fontSize: 13, color: plan.highlight ? 'rgba(255,255,255,0.7)' : 'var(--muted)', marginTop: 8 }}>{plan.description}</div>
              </div>

              <div style={{ flex: 1, marginBottom: 24 }}>
                {plan.features.map((f) => (
                  <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 10 }}>
                    <span style={{ color: plan.highlight ? 'var(--accent)' : 'var(--accent)', fontSize: 14, marginTop: 1 }}>✓</span>
                    <span style={{ fontSize: 13, color: plan.highlight ? 'rgba(255,255,255,0.8)' : 'var(--ink)', lineHeight: 1.4 }}>{f}</span>
                  </div>
                ))}
              </div>

              <a href={plan.href} style={{
                display: 'block',
                textAlign: 'center',
                padding: '12px',
                fontSize: 13,
                fontWeight: 600,
                borderRadius: 2,
                textDecoration: 'none',
                background: plan.highlight ? 'var(--accent)' : 'transparent',
                color: plan.highlight ? 'white' : 'var(--ink)',
                border: `1px solid ${plan.highlight ? 'var(--accent)' : 'var(--border)'}`,
                transition: 'opacity 0.15s',
              }}>
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        {/* Credit calculator */}
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

        {/* FAQ */}
        <div style={{ marginTop: 64 }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 400, marginBottom: 32, textAlign: 'center' }}>Common questions</h2>
          <div style={{ maxWidth: 640, margin: '0 auto' }}>
            {[
              { q: 'Do unused credits roll over?', a: 'Free tier credits do not expire. Paid plan credits reset monthly.' },
              { q: 'Can I cancel anytime?', a: 'Yes. Cancel from your account settings. No questions asked.' },
              { q: 'What languages are supported?', a: 'English and Bangla with native cultural intelligence. More languages coming.' },
              { q: 'What is the Schwartz Pyramid?', a: 'Eugene Schwartz mapped five stages of buyer awareness in Breakthrough Advertising (1966). Every stage requires a fundamentally different message. HookMeDaddy is built on this framework.' },
              { q: 'Is there a refund policy?', a: 'Yes. See our refund policy for full details.' },
            ].map((item) => (
              <div key={item.q} style={{ borderBottom: '1px solid var(--border)', padding: '20px 0' }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)', marginBottom: 8 }}>{item.q}</div>
                <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.6 }}>{item.a}</div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border)', padding: '32px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
