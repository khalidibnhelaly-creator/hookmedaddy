'use client'
import { useEffect, useState } from 'react'

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
    fetch('/api/history').then(r => r.json()).then(d => {
      setHistory(d.data || [])
      setLoading(false)
    })
  }, [])

  if (loading) return <div style={{ padding: '48px 0', textAlign: 'center', color: 'var(--muted)', fontSize: 14 }}>Loading history...</div>

  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 8 }}>History</div>
      <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 32, fontWeight: 400, marginBottom: 24 }}>Past generations</h1>
      {history.length === 0 ? (
        <div style={{ padding: '48px 0', color: 'var(--muted)', fontSize: 14 }}>No generations yet. Generate your first copy stack.</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: 'var(--border)', border: '1px solid var(--border)' }}>
          {history.map(g => (
            <div key={g.id} onClick={() => setSelected(selected?.id === g.id ? null : g)}
              style={{ background: selected?.id === g.id ? 'var(--bg2)' : 'var(--white)', padding: '16px 20px', cursor: 'pointer', display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', gap: 16 }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink)', marginBottom: 3 }}>{g.product_name || 'Unnamed product'}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>{g.platform} · {g.awareness_stage?.replace(/_/g, ' ')} · {g.credits_used} credits</div>
              </div>
              <div style={{ fontSize: 11, color: 'var(--faint)' }}>{new Date(g.created_at).toLocaleDateString()}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
