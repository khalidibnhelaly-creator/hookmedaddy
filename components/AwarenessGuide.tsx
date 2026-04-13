'use client'
import { useState } from 'react'

const STAGES = [
  {
    n: '01',
    name: 'Unaware',
    pct: '60% of your market',
    color: '#7B4F3A',
    problem: 'They do not know they have a problem. They are living inside it without naming it.',
    content: 'Pattern interruption. Bold statements. Emotional hooks. Never mention your product.',
    hook: '"The honey in your kitchen might not legally qualify as honey."',
    cta: 'Soft only: Save, Follow, Share. Never: Buy, Click, Purchase.',
    wrong: 'Mentioning your product name. Using solution language. Any urgency.'
  },
  {
    n: '02',
    name: 'Problem Aware',
    pct: '20% of your market',
    color: '#3A5F7B',
    problem: 'They know the problem exists but have not looked for a solution yet.',
    content: 'Name the pain precisely. Validate their frustration. Show the cost of ignoring it.',
    hook: '"Your skin is not dehydrated. It is overstimulated. Every product you add makes it worse."',
    cta: 'Medium: "Comment if this is you." "There is a reason this keeps happening."',
    wrong: 'Jumping to your solution. Offering before the pain is fully felt.'
  },
  {
    n: '03',
    name: 'Solution Aware',
    pct: '10% of your market',
    color: '#3A7B52',
    problem: 'They know solutions exist but have not chosen one. They are comparing options.',
    content: 'Educate on the category. Show how your approach is structurally different.',
    hook: '"Most spas sell relaxation. That wears off in 48 hours. Recovery science works differently."',
    cta: 'Educational: "Here is what separates X from Y." "This is why most solutions fail."',
    wrong: 'Selling too early. Claiming without proving. Generic differentiation.'
  },
  {
    n: '04',
    name: 'Product Aware',
    pct: '7% of your market',
    color: '#7B6B3A',
    problem: 'They know your product exists but have not bought. Something is holding them back.',
    content: 'Specific proof, testimonials, objection removal, price framing.',
    hook: '"She came in managing weekly migraines. After 8 weeks: zero. Her words, not ours."',
    cta: 'Direct: "Book now." "See the full breakdown." "Here is what you get."',
    wrong: 'Vague claims. Fluffy language. Anything that does not remove hesitation.'
  },
  {
    n: '05',
    name: 'Most Aware',
    pct: '3% of your market',
    color: '#5F3A7B',
    problem: 'They are ready to buy. They just need a reason to act right now.',
    content: 'The offer. Urgency. Scarcity. Remove every reason not to act.',
    hook: '"April intake: 3 slots remaining. We limit new members intentionally."',
    cta: 'Hardest possible: "Buy now." "Claim your spot." "Offer ends Friday."',
    wrong: 'Education. Backstory. Any content that delays the offer.'
  },
]

export default function AwarenessGuide() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{
          fontSize: 11, fontWeight: 600, color: 'var(--accent)',
          background: 'none', border: 'none', cursor: 'pointer',
          fontFamily: 'var(--font-sans)', letterSpacing: '0.06em',
          textDecoration: 'underline', padding: 0,
          textTransform: 'uppercase'
        }}
      >
        What is this?
      </button>

      {open && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false) }}
          style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            background: 'rgba(15,14,11,0.7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 24,
          }}
        >
          <div style={{
            background: 'var(--white)', borderRadius: 4,
            width: '100%', maxWidth: 780,
            maxHeight: '90vh', overflowY: 'auto',
            border: '1px solid var(--border)',
          }}>
            {/* Header */}
            <div style={{ padding: '28px 32px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 6 }}>The Schwartz Pyramid</div>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 26, fontWeight: 400, lineHeight: 1.1 }}>Which awareness stage am I targeting?</h2>
                <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 8, lineHeight: 1.7, maxWidth: 480 }}>
                  Every potential customer sits at one of five stages. Getting this wrong is the most expensive mistake in marketing. Pick the stage that matches where your audience is right now, not where you want them to be.
                </p>
              </div>
              <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: 'var(--muted)', padding: '0 0 0 16px', lineHeight: 1 }}>
                &times;
              </button>
            </div>

            {/* Stage selector */}
            <div style={{ display: 'flex', gap: 1, background: 'var(--border)', margin: '24px 32px 0' }}>
              {STAGES.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  style={{
                    flex: 1, padding: '10px 4px', fontSize: 11,
                    fontWeight: active === i ? 700 : 400,
                    background: active === i ? 'var(--ink)' : 'var(--bg2)',
                    color: active === i ? '#fff' : 'var(--muted)',
                    border: 'none', cursor: 'pointer',
                    fontFamily: 'var(--font-sans)',
                    letterSpacing: '0.04em'
                  }}
                >
                  {s.n}
                </button>
              ))}
            </div>

            {/* Stage detail */}
            <div style={{ padding: '24px 32px 32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: STAGES[active].color }} />
                <div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 400 }}>{STAGES[active].name}</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{STAGES[active].pct}</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                {[
                  { label: 'Where they are', text: STAGES[active].problem },
                  { label: 'What your content does', text: STAGES[active].content },
                ].map(({ label, text }) => (
                  <div key={label} style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 2, padding: 16 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 8 }}>{label}</div>
                    <div style={{ fontSize: 13, color: 'var(--ink)', lineHeight: 1.65 }}>{text}</div>
                  </div>
                ))}
              </div>

              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 8 }}>Example hook</div>
                <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 15, color: 'var(--ink)', background: 'var(--dark)', padding: '16px 20px', borderRadius: 2, lineHeight: 1.6, color: 'rgba(255,255,255,0.75)' }}>
                  {STAGES[active].hook}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 2, padding: 16 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 8 }}>CTA style</div>
                  <div style={{ fontSize: 13, color: 'var(--ink)', lineHeight: 1.65 }}>{STAGES[active].cta}</div>
                </div>
                <div style={{ background: '#FFF5F5', border: '1px solid #FFD5D5', borderRadius: 2, padding: 16 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C0392B', marginBottom: 8 }}>Never do this</div>
                  <div style={{ fontSize: 13, color: '#C0392B', lineHeight: 1.65 }}>{STAGES[active].wrong}</div>
                </div>
              </div>

              <div style={{ marginTop: 24, display: 'flex', gap: 8 }}>
                <button
                  onClick={() => setActive(Math.max(0, active - 1))}
                  disabled={active === 0}
                  style={{ padding: '9px 20px', fontSize: 12, fontWeight: 500, background: 'transparent', border: '1px solid var(--border)', borderRadius: 2, cursor: active === 0 ? 'not-allowed' : 'pointer', color: active === 0 ? 'var(--faint)' : 'var(--ink)', fontFamily: 'var(--font-sans)' }}
                >
                  Previous
                </button>
                <button
                  onClick={() => setActive(Math.min(4, active + 1))}
                  disabled={active === 4}
                  style={{ padding: '9px 20px', fontSize: 12, fontWeight: 500, background: active === 4 ? 'var(--bg2)' : 'var(--ink)', border: 'none', borderRadius: 2, cursor: active === 4 ? 'not-allowed' : 'pointer', color: active === 4 ? 'var(--faint)' : '#fff', fontFamily: 'var(--font-sans)' }}
                >
                  Next stage
                </button>
                <button
                  onClick={() => setOpen(false)}
                  style={{ marginLeft: 'auto', padding: '9px 20px', fontSize: 12, fontWeight: 600, background: 'var(--accent)', border: 'none', borderRadius: 2, cursor: 'pointer', color: '#fff', fontFamily: 'var(--font-sans)' }}
                >
                  Got it, close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
