'use client'
import { useEffect, useState } from 'react'
import OutputPanel from './OutputPanel'

interface Generation {
  id: string
  created_at: string
  product_name: string
  platform: string
  awareness_stage: string
  content_type: string
  credits_used: number
  output: Record<string, unknown>
}

export default function HistoryPanel() {
  const [history, setHistory] = useState<Generation[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Generation | null>(null)

  useEffect(() => {
    fetch('/api/history')
      .then(r => r.json())
      .then(d => { setHistory(d.data || []); setLoading(false) })
  }, [])

  if (loading) return (
    <div style={{ padding: '48px 0', textAlign: 'center', color: 'var(--muted)', fontSize: 14 }}>
      Loading history...
    </div>
  )

  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 8 }}>History</div>
      <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 32, fontWeight: 400, marginBottom: 24 }}>Past generations</h1>

      {history.length === 0 ? (
        <div style={{ padding: '48px 0', color: 'var(--muted)', fontSize: 14 }}>No generations yet. Generate your first copy stack.</div>
      ) : (
        <div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: 'var(--border)', border: '1px solid var(--border)', marginBottom: 32 }}>
            {history.map(g => (
              <div
                key={g.id}
                onClick={() => setSelected(selected?.id === g.id ? null : g)}
                style={{
                  background: selected?.id === g.id ? 'var(--ink)' : 'var(--white)',
                  padding: '16px 20px', cursor: 'pointer',
                  display: 'grid', gridTemplateColumns: '1fr auto',
                  alignItems: 'center', gap: 16,
                  transition: 'background .15s'
                }}
              >
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: selected?.id === g.id ? '#fff' : 'var(--ink)', marginBottom: 3 }}>
                    {g.product_name || 'Unnamed product'}
                  </div>
                  <div style={{ fontSize: 12, color: selected?.id === g.id ? 'rgba(255,255,255,0.4)' : 'var(--muted)' }}>
                    {g.platform} · {g.awareness_stage?.replace(/_/g, ' ')} · {g.credits_used} credits used
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 11, color: selected?.id === g.id ? 'rgba(255,255,255,0.3)' : 'var(--faint)' }}>
                    {new Date(g.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                  <div style={{ fontSize: 10, color: selected?.id === g.id ? 'rgba(255,255,255,0.3)' : 'var(--faint)', marginTop: 2 }}>
                    {selected?.id === g.id ? 'Click to collapse' : 'Click to expand'}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {selected && selected.output && (
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 16 }}>
                Viewing: {selected.product_name}
              </div>
              <OutputPanel output={selected.output} productName={selected.product_name} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
