'use client'
import { useEffect, useState } from 'react'

const MESSAGES = [
  'Analysing your product brief...',
  'Mapping audience awareness stage...',
  'Applying Schwartz Pyramid rules...',
  'Writing hooks that stop the scroll...',
  'Calibrating CTA to awareness stage...',
  'Generating visual brief...',
  'Running anti-AI language check...',
  'Finalising your copy stack...',
]

export default function GeneratingOverlay({ visible }: { visible: boolean }) {
  const [msgIndex, setMsgIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!visible) { setProgress(0); setMsgIndex(0); return }

    const msgTimer = setInterval(() => {
      setMsgIndex(i => (i + 1) % MESSAGES.length)
    }, 3200)

    const progTimer = setInterval(() => {
      setProgress(p => {
        if (p >= 92) return p
        return p + Math.random() * 3
      })
    }, 400)

    return () => { clearInterval(msgTimer); clearInterval(progTimer) }
  }, [visible])

  if (!visible) return null

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 500,
      background: 'rgba(15,14,11,0.75)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        background: 'var(--white)', borderRadius: 4,
        padding: '48px 56px', maxWidth: 480, width: '100%',
        border: '1px solid var(--border)', textAlign: 'center',
        margin: '0 24px'
      }}>
        {/* Animated icon */}
        <div style={{ marginBottom: 28 }}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" style={{ animation: 'spin 2s linear infinite' }}>
            <circle cx="20" cy="20" r="17" stroke="var(--border)" strokeWidth="2"/>
            <path d="M20 3 A17 17 0 0 1 37 20" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
          <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        </div>

        <div style={{ fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 400, marginBottom: 8, lineHeight: 1.2 }}>
          Generating your copy stack
        </div>
        <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 32, minHeight: 20, transition: 'opacity 0.3s' }}>
          {MESSAGES[msgIndex]}
        </div>

        {/* Progress bar */}
        <div style={{ background: 'var(--bg2)', borderRadius: 2, height: 4, overflow: 'hidden', marginBottom: 16 }}>
          <div style={{
            height: '100%', borderRadius: 2,
            background: 'var(--accent)',
            width: `${Math.min(progress, 92)}%`,
            transition: 'width 0.4s ease',
          }} />
        </div>
        <div style={{ fontSize: 11, color: 'var(--faint)', letterSpacing: '0.06em' }}>
          Takes 20-45 seconds · Do not close this window
        </div>
      </div>
    </div>
  )
}
