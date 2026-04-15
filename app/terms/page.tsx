export default function TermsPage() {
  const sections = [
    { title: "1. Acceptance of Terms", body: "By accessing or using HookMeDaddy, you agree to be bound by these Terms of Service. If you do not agree, do not use the Service." },
    { title: "2. Description of Service", body: "HookMeDaddy is an AI-powered copy generation platform built on the Schwartz Pyramid of Awareness. The Service generates marketing hooks, captions, and CTAs calibrated to audience awareness stages." },
    { title: "3. Account Registration", body: "You must provide accurate information when creating an account. You are responsible for maintaining the security of your credentials. You must be at least 18 years old to use the Service." },
    { title: "4. Credits and Payments", body: "Credits are consumed per generation as described on the pricing page. Paid plan credits reset monthly. Free tier credits do not expire. All payments are processed securely through Paddle. Prices are in USD." },
    { title: "5. Acceptable Use", body: "You may not use the Service to generate content that is illegal, harmful, defamatory, or violates the rights of others. You may not attempt to reverse engineer, copy, or redistribute the underlying system or prompts." },
    { title: "6. Intellectual Property", body: "You own the copy generated using the Service. HookMeDaddy retains ownership of the platform, system, and underlying technology." },
    { title: "7. Limitation of Liability", body: "The Service is provided as-is. HookMeDaddy is not liable for any damages arising from the use or inability to use the Service, including lost revenue or business interruption." },
    { title: "8. Termination", body: "We reserve the right to suspend or terminate accounts that violate these terms. You may cancel your account at any time." },
    { title: "9. Changes to Terms", body: "We may update these terms at any time. Continued use of the Service after changes constitutes acceptance." },
    { title: "10. Contact", body: "For questions about these terms, contact us at hello@hookmedaddy.com" },
  ]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', fontFamily: 'var(--font-sans)' }}>
      <nav style={{ borderBottom: '1px solid var(--border)', padding: '0 40px', height: 58, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="/" style={{ fontFamily: 'var(--font-serif)', fontSize: 18, color: 'var(--ink)', textDecoration: 'none' }}>Hook<span style={{ color: 'var(--accent)' }}>Me</span>Daddy</a>
        <a href="/sign-in" style={{ fontSize: 13, color: 'var(--muted)', textDecoration: 'none' }}>Sign in</a>
      </nav>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '80px 40px' }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 16 }}>Legal</div>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 42, fontWeight: 400, letterSpacing: '-0.5px', marginBottom: 8 }}>Terms of Service</h1>
        <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 56 }}>Last updated: April 2026</p>
        {sections.map((s) => (
          <div key={s.title} style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', marginBottom: 10 }}>{s.title}</h2>
            <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.8 }}>{s.body}</p>
          </div>
        ))}
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
