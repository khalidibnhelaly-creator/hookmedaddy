export default function RefundPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', fontFamily: 'var(--font-sans)' }}>
      <nav style={{ borderBottom: '1px solid var(--border)', padding: '0 40px', height: 58, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="/" style={{ fontFamily: 'var(--font-serif)', fontSize: 18, color: 'var(--ink)', textDecoration: 'none' }}>Hook<span style={{ color: 'var(--accent)' }}>Me</span>Daddy</a>
        <a href="/sign-in" style={{ fontSize: 13, color: 'var(--muted)', textDecoration: 'none' }}>Sign in</a>
      </nav>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '80px 40px' }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 16 }}>Legal</div>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 42, fontWeight: 400, letterSpacing: '-0.5px', marginBottom: 8 }}>Refund Policy</h1>
        <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 56 }}>Last updated: April 2026</p>
        <p style={{ fontSize: 15, color: 'var(--ink)', lineHeight: 1.8, marginBottom: 40 }}>Our goal is simple: if the Service did not work as described, you get your money back.</p>
        {[
          { title: "Eligible for a full refund", items: ["You were charged but the generation feature was non-functional during that billing period", "You were double-charged due to a billing error", "You cancelled within 48 hours of your first paid subscription charge and have not used the credits"] },
          { title: "Not eligible for a refund", items: ["You changed your mind after using credits", "You did not like the quality of the generated copy", "Credits were used before requesting a refund"] },
        ].map((block) => (
          <div key={block.title} style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', marginBottom: 16 }}>{block.title}</h2>
            {block.items.map((item) => (
              <div key={item} style={{ display: 'flex', gap: 12, marginBottom: 10, alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--accent)', fontSize: 14, marginTop: 2 }}>—</span>
                <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7, margin: 0 }}>{item}</p>
              </div>
            ))}
          </div>
        ))}
        <div style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>How to request a refund</h2>
          <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.8 }}>Email <a href="mailto:hello@hookmedaddy.com" style={{ color: 'var(--accent)' }}>hello@hookmedaddy.com</a> with your account email and the reason for your request. We will respond within 2 business days. Approved refunds are processed within 5-10 business days through Paddle.</p>
        </div>
        <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.8 }}>We handle every refund request individually and try to do right by our users.</p>
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
