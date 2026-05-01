'use client'
import { useState, useEffect } from 'react'
import { UserButton, Show } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import GeneratorForm from '@/components/GeneratorForm'
import OutputPanel from '@/components/OutputPanel'
import HistoryPanel from '@/components/HistoryPanel'
import GeneratingOverlay from '@/components/GeneratingOverlay'

type Tab = 'generate' | 'history' | 'saved'

const PLAN_MAX_CREDITS: Record<string, number> = {
  free: 1000,
  starter: 5000,
  pro: 9000,
  agency: 20000,
}

const PLAN_LABELS: Record<string, string> = {
  free: 'Free',
  starter: 'Starter',
  pro: 'Pro',
  agency: 'Agency',
}

export default function Dashboard() {
  const [tab, setTab] = useState<Tab>('generate')
  const [output, setOutput] = useState<Record<string, unknown> | null>(null)
  const [loading, setLoading] = useState(false)
  const [credits, setCredits] = useState<number | null>(null)
  const [maxCredits, setMaxCredits] = useState<number>(1000)
  const [planTier, setPlanTier] = useState<string>('free')
  const [productName, setProductName] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()

  // Fetch profile on load to get current credits and plan
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('/api/profile')
        const data = await res.json()
        if (data.credits !== undefined) {
          setCredits(data.credits)
          setPlanTier(data.plan_tier || 'free')
          setMaxCredits(PLAN_MAX_CREDITS[data.plan_tier] || 1000)
        }
      } catch {
        console.error('Failed to fetch profile')
      }
    }
    fetchProfile()
  }, [])

  const handleGenerate = async (formData: Record<string, string>) => {
    setLoading(true)
    setOutput(null)
    setProductName(formData.productName || '')
    setMobileMenuOpen(false)
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const ok = res.ok
      const body = res.body
      if (!ok || !body) {
        alert('Generation failed. Please try again.')
        return
      }

      const reader = body.getReader()
      const decoder = new TextDecoder()
      let fullText = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        fullText += decoder.decode(value, { stream: true })

        if (fullText.includes('__DONE__')) {
          const doneIndex = fullText.indexOf('__DONE__')
          const jsonStr = fullText.slice(doneIndex + 8)
          const data = JSON.parse(jsonStr)
          setOutput(data.data)
          setCredits(data.credits_remaining)
          break
        }

        if (fullText.includes('__ERROR__')) {
          alert('Generation failed. Please try again.')
          break
        }
      }

    } catch {
      alert('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const creditsUsed = credits !== null ? maxCredits - credits : 0
  const creditsPercent = credits !== null ? Math.max(0, Math.min(100, (credits / maxCredits) * 100)) : 100
  const barColor = creditsPercent > 50 ? 'var(--accent)' : creditsPercent > 20 ? '#E8A000' : '#D32F2F'

  const navItem = (t: Tab, label: string) => (
    <button key={t} onClick={() => { setTab(t); setMobileMenuOpen(false) }}
      style={{
        display: 'block', width: '100%', textAlign: 'left',
        padding: '11px 14px', fontSize: 14,
        fontWeight: tab === t ? 500 : 400,
        color: tab === t ? 'var(--ink)' : 'var(--muted)',
        background: tab === t ? 'var(--bg2)' : 'transparent',
        border: 'none', borderRadius: 2, cursor: 'pointer',
        marginBottom: 4, fontFamily: 'var(--font-sans)',
      }}>
      {label}
    </button>
  )

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <GeneratingOverlay visible={loading} />

      {/* Top Nav */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'rgba(249,247,242,0.97)', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border)', height: 58,
        display: 'flex', alignItems: 'center', padding: '0 20px',
        justifyContent: 'space-between'
      }}>
        <a href="/" style={{ fontFamily: 'var(--font-serif)', fontSize: 17, color: 'var(--ink)', textDecoration: 'none' }}>
          Hook<span style={{ color: 'var(--accent)' }}>Me</span>Daddy
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {credits !== null && (
            <div style={{ fontSize: 11, color: 'var(--muted)', background: 'var(--bg2)', padding: '3px 10px', borderRadius: 2, border: '1px solid var(--border)' }}>
              {credits.toLocaleString()} credits
            </div>
          )}
          <Show when="signed-in"><UserButton /></Show>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: 'var(--ink)', fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 500 }}
            className="mobile-menu-btn"
          >
            {mobileMenuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </nav>

      <style>{`
        @media (max-width: 768px) {
          .dashboard-layout { grid-template-columns: 1fr !important; }
          .dashboard-sidebar { 
            position: fixed !important; top: 58px !important; left: 0 !important; right: 0 !important;
            height: auto !important; z-index: 99 !important; border-right: none !important;
            border-bottom: 1px solid var(--border) !important; display: none;
          }
          .dashboard-sidebar.open { display: block !important; }
          .mobile-menu-btn { display: block !important; }
          .dashboard-main { padding: 24px 20px !important; }
        }
      `}</style>

      <div className="dashboard-layout" style={{ paddingTop: 58, display: 'grid', gridTemplateColumns: '260px 1fr', minHeight: '100vh' }}>
        
        {/* Sidebar */}
        <aside className={`dashboard-sidebar${mobileMenuOpen ? ' open' : ''}`}
          style={{ borderRight: '1px solid var(--border)', padding: '24px 20px', position: 'sticky', top: 58, height: 'calc(100vh - 58px)', overflowY: 'auto', background: 'var(--bg)' }}>
          
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--faint)', marginBottom: 10 }}>Menu</div>
            {navItem('generate', 'Generate copy')}
            {navItem('history', 'History')}
            {navItem('saved', 'Saved hooks')}
          </div>

          {/* Credit meter */}
          {credits !== null && (
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 20, marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--faint)' }}>Credits</div>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)', background: 'rgba(200,67,15,0.08)', padding: '2px 6px', borderRadius: 2 }}>
                  {PLAN_LABELS[planTier]}
                </div>
              </div>

              {/* Numbers */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                <span style={{ fontSize: 22, fontFamily: 'var(--font-serif)', color: 'var(--ink)', fontWeight: 400 }}>
                  {credits.toLocaleString()}
                </span>
                <span style={{ fontSize: 11, color: 'var(--muted)' }}>
                  of {maxCredits.toLocaleString()}
                </span>
              </div>

              {/* Progress bar */}
              <div style={{ height: 6, background: 'var(--border)', borderRadius: 3, overflow: 'hidden', marginBottom: 8 }}>
                <div style={{
                  height: '100%',
                  width: `${creditsPercent}%`,
                  background: barColor,
                  borderRadius: 3,
                  transition: 'width 0.4s ease',
                }} />
              </div>

              {/* Used */}
              <div style={{ fontSize: 11, color: 'var(--muted)' }}>
                {creditsUsed.toLocaleString()} credits used
              </div>

              {/* Low credit warning */}
              {creditsPercent <= 20 && (
                <div style={{ marginTop: 10, padding: '8px 10px', background: 'rgba(211,47,47,0.06)', border: '1px solid rgba(211,47,47,0.2)', borderRadius: 2 }}>
                  <div style={{ fontSize: 11, color: '#D32F2F', fontWeight: 600 }}>Running low</div>
                  <div style={{ fontSize: 11, color: '#D32F2F', opacity: 0.8, marginTop: 2 }}>Upgrade to keep generating</div>
                </div>
              )}
            </div>
          )}

          <div style={{ borderTop: '1px solid var(--border)', paddingTop: 20, marginBottom: 20 }}>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--faint)', marginBottom: 10 }}>Credit costs</div>
            {[['Social post', '20 credits'], ['Video script', '40 credits'], ['All 5 stages', '80 credits']].map(([l, c]) => (
              <div key={l} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--muted)', marginBottom: 6 }}>
                <span>{l}</span><span style={{ color: 'var(--accent)', fontWeight: 500 }}>{c}</span>
              </div>
            ))}
          </div>

          <a href="/pricing" style={{ display: 'block', textAlign: 'center', padding: '10px', fontSize: 12, fontWeight: 600, color: 'var(--accent)', border: '1px solid var(--accent)', borderRadius: 2, textDecoration: 'none' }}>
            Upgrade plan
          </a>
        </aside>

        {/* Main */}
        <main className="dashboard-main" style={{ padding: '40px 48px', maxWidth: 900 }}>
          {tab === 'generate' && (
            <div>
              <div style={{ marginBottom: 28 }}>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 6 }}>Generate</div>
                <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 400, lineHeight: 1.1, letterSpacing: '-0.5px' }}>What are you writing for?</h1>
              </div>
              <GeneratorForm onGenerate={handleGenerate} loading={loading} />
              {output && <OutputPanel output={output} productName={productName} />}
            </div>
          )}
          {tab === 'history' && <HistoryPanel />}
          {tab === 'saved' && (
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 6 }}>Library</div>
              <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 400 }}>Saved hooks</h1>
              <p style={{ color: 'var(--muted)', fontSize: 14, marginTop: 8 }}>Save hooks from any generation to build your permanent library.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
