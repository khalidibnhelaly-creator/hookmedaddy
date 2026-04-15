export default function PrivacyPage() {
  const sections = [
    { title: "1. Information We Collect", body: "We collect information you provide when creating an account (email address, name), usage data (generations, credits used, platforms selected), and payment information processed by Paddle. We do not store card details." },
    { title: "2. How We Use Your Information", body: "To provide and improve the Service. To send transactional emails about your account. To analyze usage patterns and improve generation quality. We do not sell your data to third parties." },
    { title: "3. Data Storage", body: "Your account data and generation history are stored in Supabase, hosted in the EU (Frankfurt region). We retain your data for as long as your account is active." },
    { title: "4. Cookies", body: "We use essential cookies for authentication via Clerk. We do not use advertising or tracking cookies." },
    { title: "5. Third-Party Services", body: "We use Clerk for authentication, Supabase for data storage, Paddle for payments, and Anthropic's Claude API for generation. Each has their own privacy policies." },
    { title: "6. Your Rights", body: "You may request deletion of your account and data at any time by emailing hello@hookmedaddy.com. We will process deletion requests within 30 days." },
    { title: "7. Children's Privacy", body: "The Service is not intended for users under 18 years of age." },
    { title: "8. Changes to This Policy", body: "We may update this policy and will notify users of significant changes via email." },
    { title: "9. Contact", body: "For privacy questions, contact hello@hookmedaddy.com" },
  ]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', fontFamily: 'var(--font-sans)' }}>
      <nav style={{ borderBottom: '1px solid var(--border)', padding: '0 40px', height: 58, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="/" style={{ fontFamily: 'var(--font-serif)', fontSize: 18, color: 'var(--ink)', textDecoration: 'none' }}>Hook<span style={{ color: 'var(--accent)' }}>Me</span>Daddy</a>
        <a href="/sign-in" style={{ fontSize: 13, color: 'var(--muted)', textDecoration: 'none' }}>Sign in</a>
      </nav>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '80px 40px' }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 16 }}>Legal</div>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 42, fontWeight: 400, letterSpacing: '-0.5px', marginBottom: 8 }}>Privacy Policy</h1>
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
