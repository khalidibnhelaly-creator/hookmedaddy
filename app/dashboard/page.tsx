'use client'
import { useState } from 'react'
import { UserButton, Show } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import GeneratorForm from '@/components/GeneratorForm'
import OutputPanel from '@/components/OutputPanel'
import HistoryPanel from '@/components/HistoryPanel'
import GeneratingOverlay from '@/components/GeneratingOverlay'

type Tab = 'generate' | 'history' | 'saved'

export default function Dashboard() {
  const [tab, setTab] = useState<Tab>('generate')
  const [output, setOutput] = useState<Record<string, unknown> | null>(null)
  const [loading, setLoading] = useState(false)
  const [credits, setCredits] = useState<number | null>(null)
  const [productName, setProductName] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()

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
      const data = await res.json()
      if (data.success) {
        setOutput(data.data)
        setCredits(data.credits_remaining)
      } else if (data.error === 'insufficient_credits') {
        alert('Not enough credits. Please upgrade your plan.')
        router.push('/pricing')
      } else {
        alert('Generation failed. Please try again.')
      }
    } catch {
      alert('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

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
              {credits} credits
            </div>
          )}
          <Show when="signed-in"><UserButton /></Show>
          {/* Mobile menu button */}
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
            position: fixed !important; 
            top: 58px !important; 
            left: 0 !important; 
            right: 0 !important;
            height: auto !important;
            z-index: 99 !important;
            border-right: none !important;
            border-bottom: 1px solid var(--border) !important;
            display: none;
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
