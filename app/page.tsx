import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function Home() {
  const { userId } = await auth()
  if (userId) redirect('/dashboard')

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-sans)' }}>
      
      {/* Main content centered */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', maxWidth: 560, padding: '0 32px' }}>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: 48, fontWeight: 400, lineHeight: 1.05, letterSpacing: '-1.5px', marginBottom: 24 }}>
            Hook<span style={{ color: 'var(--accent)' }}>Me</span>Daddy
          </div>
          <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 40, fontWeight: 300 }}>
            Copy that knows who it's talking to.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <Link href="/sign-up" style={{ background: 'var(--accent)', color: '#fff', padding: '13px 28px', borderRadius: 2, textDecoration: 'none', fontSize: 13, fontWeight: 600 }}>
              Start free — 1000 credits
            </Link>
            <Link href="/sign-in" style={{ background: 'transparent', color: 'var(--ink)', padding: '13px 28px', borderRadius: 2, textDecoration: 'none', fontSize: 13, fontWeight: 500, border: '1px solid var(--border)' }}>
              Sign in
            </Link>
          </div>
          <p style={{ fontSize: 11, color: 'var(--faint)', marginTop: 20 }}>No credit card required</p>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ padding: '20px 40px', display: 'flex', justifyContent: 'center', gap: 28, borderTop: '1px solid var(--border)' }}>
        {[['About', '/about'], ['Pricing', '/pricing'], ['Terms', '/terms'], ['Privacy', '/privacy'], ['Refund', '/refund']].map(([label, href]) => (
          <Link key={label} href={href} style={{ fontSize: 11, color: 'var(--muted)', textDecoration: 'none', letterSpacing: '0.04em' }}>
            {label}
          </Link>
        ))}
      </footer>

    </div>
  )
}
