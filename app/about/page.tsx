export default function AboutPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', fontFamily: 'var(--font-sans)' }}>
      <nav style={{ borderBottom: '1px solid var(--border)', padding: '0 40px', height: 58, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="/" style={{ fontFamily: 'var(--font-serif)', fontSize: 18, color: 'var(--ink)', textDecoration: 'none' }}>Hook<span style={{ color: 'var(--accent)' }}>Me</span>Daddy</a>
        <a href="/sign-in" style={{ fontSize: 13, color: 'var(--muted)', textDecoration: 'none' }}>Sign in</a>
      </nav>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '80px 40px' }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 16 }}>About</div>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 48, fontWeight: 400, letterSpacing: '-1px', lineHeight: 1.1, marginBottom: 56 }}>
          Copy that knows who it's talking to.
        </h1>

        <div style={{ fontSize: 15, color: 'var(--ink)', lineHeight: 2, marginBottom: 56 }}>
          <p style={{ marginBottom: 24 }}>HookMeDaddy was built out of frustration.</p>
          <p style={{ marginBottom: 24 }}>After producing over 500 AI-driven commercials for brands across Bangladesh, we kept running into the same problem: AI tools generate words. They do not understand who they are writing for.</p>
          <p style={{ marginBottom: 24 }}>Every potential customer exists at a different stage of awareness. Someone who has never heard of your product needs a completely different message than someone who has been to your website three times and almost bought. Give both of them the same hook and one of them ignores you.</p>
          <p style={{ marginBottom: 24 }}>Eugene Schwartz mapped this out in Breakthrough Advertising in 1966. Five stages. Each requiring a fundamentally different type of message. The psychology has not changed. What changed is that we can now generate those messages at scale, if the model underneath actually understands the framework.</p>
          <p style={{ marginBottom: 24 }}>Most do not. HookMeDaddy does.</p>
          <p>We built this tool for ecommerce brand owners, performance marketers, and agencies who are tired of editing generic AI output. And for brands in Bangladesh and South Asia who deserve tools built with their language and culture in mind, not translated from English.</p>
        </div>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontFamily: 'var(--font-serif)', fontSize: 22 }}>K</div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)' }}>Khalid Bin Helaly</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 2 }}>Founder, HookMeDaddy</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4, lineHeight: 1.6 }}>AI creative entrepreneur. 13 years in digital marketing. Generative AI consultant, filmmaker, and brand builder. Based in Bangladesh.</div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 56, background: 'white', border: '1px solid var(--border)', borderRadius: 4, padding: '32px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 16 }}>By the numbers</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[['500+', 'AI commercials produced'], ['13', 'Years in digital marketing'], ['5', 'Awareness stages supported']].map(([num, label]) => (
              <div key={label}>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: 36, color: 'var(--accent)', marginBottom: 4 }}>{num}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 40, textAlign: 'center' }}>
          <a href="/sign-up" style={{ display: 'inline-block', background: 'var(--accent)', color: 'white', padding: '14px 32px', borderRadius: 2, textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>
            Start free — 1000 credits
          </a>
          <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 12 }}>No credit card required</p>
        </div>
      </div>

      <footer style={{ borderTop: '1px solid var(--border)', padding: '32px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: 15, color: 'var(--ink)' }}>Hook<span style={{ color: 'var(--accent)' }}>Me</span>Daddy</div>
        <div style={{ display: 'flex', gap: 24 }}>
          {[['About', '/about'], ['Pricing', '/pricing'], ['Terms', '/terms'], ['Privacy', '/privacy'], ['Refund', '/refund']].map(([label, href]) => (
            <a key={label} href={href} style={{ fontSize: 12, color: 'var(--muted)', textDecoration: 'none' }}>{label}</a>
          ))}
        </div>
      </footer>
    </div>
  )
}
