'use client'
import { useState } from 'react'

interface Hook { id: number; hook: string; hook_type: string; mechanic: string }
interface Output {
  awareness_stage?: string
  platform?: string
  hooks?: Hook[]
  top_hook?: { hook: string; why: string }
  caption?: string
  cta?: string
  visual_brief?: string
  why_it_works?: string
  ab_variants?: Array<{ variant: string; hook: string; hook_type: string }>
  anatomy?: { first_word_function: string; tension_point: string; forbidden_trigger: string; cta_alignment: string } | null
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1400) }}
      style={{ fontSize: 11, color: copied ? 'var(--accent)' : 'var(--faint)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontWeight: 500 }}>
      {copied ? 'Copied' : 'Copy'}
    </button>
  )
}

function Block({ label, text, accent }: { label: string; text: string; accent?: boolean }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 8 }}>{label}</div>
      <div style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--ink)', background: accent ? 'var(--dark)' : 'var(--bg)', padding: '14px 16px', borderRadius: 2, border: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', gap: 12 }}>
        <span style={{ color: accent ? 'rgba(255,255,255,0.7)' : 'var(--ink)' }}>{text}</span>
        <CopyButton text={text} />
      </div>
    </div>
  )
}

function SingleOutput({ data }: { data: Output }) {
  const [tab, setTab] = useState<'hooks' | 'copy' | 'anatomy'>('hooks')
  const tabs = ['hooks', 'copy', 'anatomy'] as const

  return (
    <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 2, padding: 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 4 }}>{data.awareness_stage}</div>
          <div style={{ fontSize: 13, color: 'var(--muted)' }}>{data.platform}</div>
        </div>
        <div style={{ display: 'flex', gap: 1, background: 'var(--border)' }}>
          {tabs.map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ padding: '8px 18px', fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em', background: tab === t ? 'var(--white)' : 'var(--bg2)', color: tab === t ? 'var(--ink)' : 'var(--muted)', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {tab === 'hooks' && (
        <div>
          {data.top_hook && <Block label="Top hook" text={data.top_hook.hook} />}
          {data.ab_variants && data.ab_variants.length > 0 && data.ab_variants.map(v => (
            <Block key={v.variant} label={`Variant ${v.variant} — ${v.hook_type}`} text={v.hook} />
          ))}
          {data.top_hook?.why && (
            <div style={{ background: 'var(--dark)', padding: 20, borderRadius: 2, marginTop: 8 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 8 }}>Why this hook works</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>{data.top_hook.why}</div>
            </div>
          )}
        </div>
      )}

      {tab === 'copy' && (
        <div>
          {data.caption && <Block label="Caption body" text={data.caption} />}
          {data.cta && <Block label="Call to action" text={data.cta} />}
          {data.visual_brief && <Block label="Visual brief" text={data.visual_brief} />}
          {data.why_it_works && (
            <div style={{ background: 'var(--dark)', padding: 20, borderRadius: 2, marginTop: 8 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 8 }}>Why it works — Schwartz principle</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>{data.why_it_works}</div>
            </div>
          )}
        </div>
      )}

      {tab === 'anatomy' && (
        <div>
          {data.anatomy ? (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {Object.entries(data.anatomy).map(([k, v]) => (
                <div key={k} style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 2, padding: 16 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 8 }}>{k.replace(/_/g, ' ')}</div>
                  <div style={{ fontSize: 13, color: 'var(--ink)', lineHeight: 1.6 }}>{v}</div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--muted)', fontSize: 14 }}>
              Hook anatomy is available on Pro and Agency plans.
              <a href="/pricing" style={{ display: 'block', marginTop: 12, color: 'var(--accent)', fontSize: 13, fontWeight: 500 }}>Upgrade to unlock</a>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function OutputPanel({ output }: { output: Record<string, unknown> | Record<string, unknown>[] }) {
  const isArray = Array.isArray(output)
  const [activeStage, setActiveStage] = useState(0)

  if (isArray) {
    const stages = output as Output[]
    return (
      <div style={{ marginTop: 32 }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 16 }}>All 5 awareness stages generated</div>
        <div style={{ display: 'flex', gap: 1, background: 'var(--border)', marginBottom: 24 }}>
          {stages.map((s, i) => (
            <button key={i} onClick={() => setActiveStage(i)} style={{ flex: 1, padding: '10px 8px', fontSize: 11, fontWeight: activeStage === i ? 600 : 400, background: activeStage === i ? 'var(--ink)' : 'var(--bg2)', color: activeStage === i ? '#fff' : 'var(--muted)', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>
              Stage {i + 1}
            </button>
          ))}
        </div>
        <SingleOutput data={stages[activeStage]} />
      </div>
    )
  }

  return (
    <div style={{ marginTop: 32 }}>
      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 16 }}>Your copy stack</div>
      <SingleOutput data={output as Output} />
    </div>
  )
}
