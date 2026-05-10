import Link from 'next/link'
import Script from 'next/script'

type FaqItem = { q: string; a: string }

export function LandingNav() {
  return (
    <nav style={{
      borderBottom: '1px solid var(--border)',
      padding: '0 40px',
      height: 58,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: 'var(--bg)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
    }}>
      <Link href="/" style={{ fontFamily: 'var(--font-serif)', fontSize: 18, color: 'var(--ink)', textDecoration: 'none' }}>
        Hook<span style={{ color: 'var(--accent)' }}>Me</span>Daddy
      </Link>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <Link href="/what-is-hookmedaddy" style={navLink}>Product</Link>
        <Link href="/schwartz-awareness-pyramid" style={navLink}>Framework</Link>
        <Link href="/best-ai-hook-generator" style={navLink}>Compare</Link>
        <Link href="/pricing" style={navLink}>Pricing</Link>
        <Link href="/sign-in" style={navLink}>Sign in</Link>
        <Link href="/sign-up" style={{
          background: 'var(--accent)',
          color: '#fff',
          padding: '8px 16px',
          borderRadius: 2,
          textDecoration: 'none',
          fontSize: 12,
          fontWeight: 600,
        }}>
          Start free
        </Link>
      </div>
    </nav>
  )
}

const navLink: React.CSSProperties = {
  fontSize: 13,
  color: 'var(--muted)',
  textDecoration: 'none',
  fontWeight: 500,
}

export function LandingFooter() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', padding: '48px 40px 32px', background: 'var(--bg2)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32, marginBottom: 40 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: 20, marginBottom: 12 }}>
            Hook<span style={{ color: 'var(--accent)' }}>Me</span>Daddy
          </div>
          <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>
            Awareness-stage copy for performance marketers. Built on the Schwartz Pyramid.
          </div>
        </div>
        <FooterCol title="Product" links={[
          ['What is HookMeDaddy', '/what-is-hookmedaddy'],
          ['Pricing', '/pricing'],
          ['Sign up', '/sign-up'],
          ['Sign in', '/sign-in'],
        ]} />
        <FooterCol title="Resources" links={[
          ['Schwartz Awareness Pyramid', '/schwartz-awareness-pyramid'],
          ['How to write Facebook ad hooks', '/how-to-write-facebook-ad-hooks'],
          ['Best AI hook generator', '/best-ai-hook-generator'],
        ]} />
        <FooterCol title="Compare" links={[
          ['ChatGPT vs HookMeDaddy', '/compare/chatgpt-vs-hookmedaddy'],
          ['Jasper vs HookMeDaddy', '/compare/jasper-vs-hookmedaddy'],
          ['Copy.ai vs HookMeDaddy', '/compare/copy-ai-vs-hookmedaddy'],
        ]} />
      </div>
      <div style={{ maxWidth: 1100, margin: '0 auto', borderTop: '1px solid var(--border)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ fontSize: 11, color: 'var(--faint)' }}>© {new Date().getFullYear()} HookMeDaddy. All rights reserved.</div>
        <div style={{ display: 'flex', gap: 20 }}>
          {[['About', '/about'], ['Terms', '/terms'], ['Privacy', '/privacy'], ['Refund', '/refund']].map(([label, href]) => (
            <Link key={label} href={href} style={{ fontSize: 11, color: 'var(--muted)', textDecoration: 'none' }}>{label}</Link>
          ))}
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink)', marginBottom: 12 }}>{title}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {links.map(([label, href]) => (
          <Link key={href} href={href} style={{ fontSize: 13, color: 'var(--muted)', textDecoration: 'none', lineHeight: 1.4 }}>{label}</Link>
        ))}
      </div>
    </div>
  )
}

export function PageHero({ kicker, title, subtitle }: { kicker: string; title: string; subtitle: string }) {
  return (
    <header style={{ padding: '72px 40px 48px', borderBottom: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 880, margin: '0 auto' }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 20 }}>{kicker}</div>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 52, fontWeight: 400, letterSpacing: '-1.5px', lineHeight: 1.05, marginBottom: 24, color: 'var(--ink)' }}>{title}</h1>
        <p style={{ fontSize: 19, color: 'var(--muted)', lineHeight: 1.6, fontWeight: 300, maxWidth: 720 }}>{subtitle}</p>
      </div>
    </header>
  )
}

export function PageBody({ children }: { children: React.ReactNode }) {
  return (
    <main style={{ padding: '64px 40px 96px' }}>
      <div style={{ maxWidth: 880, margin: '0 auto' }}>
        {children}
      </div>
    </main>
  )
}

export function Section({ kicker, title, children }: { kicker?: string; title?: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 64 }}>
      {kicker && <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 12 }}>{kicker}</div>}
      {title && <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 34, fontWeight: 400, letterSpacing: '-0.5px', lineHeight: 1.15, marginBottom: 24, color: 'var(--ink)' }}>{title}</h2>}
      <div style={{ fontSize: 16, color: 'var(--ink)', lineHeight: 1.75 }}>
        {children}
      </div>
    </section>
  )
}

export function Sub({ children }: { children: React.ReactNode }) {
  return <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 400, lineHeight: 1.25, marginTop: 32, marginBottom: 14, color: 'var(--ink)' }}>{children}</h3>
}

export function Lead({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: 17, color: 'var(--ink)', lineHeight: 1.7, marginBottom: 18 }}>{children}</p>
}

export function P({ children }: { children: React.ReactNode }) {
  return <p style={{ marginBottom: 16 }}>{children}</p>
}

export function Quote({ children, label }: { children: React.ReactNode; label?: string }) {
  return (
    <div style={{ background: 'var(--bg2)', borderLeft: '3px solid var(--accent)', padding: '20px 24px', margin: '20px 0', borderRadius: 2 }}>
      {label && <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 8 }}>{label}</div>}
      <div style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontStyle: 'italic', lineHeight: 1.45, color: 'var(--ink)' }}>{children}</div>
    </div>
  )
}

export function ComparisonTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div style={{ overflowX: 'auto', margin: '24px 0', border: '1px solid var(--border)', borderRadius: 4, background: 'white' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
        <thead>
          <tr style={{ background: 'var(--bg2)' }}>
            {headers.map((h, i) => (
              <th key={i} style={{
                textAlign: 'left',
                padding: '14px 18px',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: i === 0 ? 'var(--ink)' : 'var(--accent)',
                borderBottom: '1px solid var(--border)',
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) => (
            <tr key={r} style={{ borderBottom: r === rows.length - 1 ? 'none' : '1px solid var(--border)' }}>
              {row.map((c, i) => (
                <td key={i} style={{
                  padding: '14px 18px',
                  fontSize: 14,
                  color: i === 0 ? 'var(--ink)' : 'var(--muted)',
                  fontWeight: i === 0 ? 600 : 400,
                  lineHeight: 1.5,
                  verticalAlign: 'top',
                }}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function Callout({ children, label }: { children: React.ReactNode; label?: string }) {
  return (
    <div style={{ background: 'var(--ink)', color: 'white', padding: '24px 28px', borderRadius: 4, margin: '24px 0' }}>
      {label && <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent2)', marginBottom: 10 }}>{label}</div>}
      <div style={{ fontSize: 16, lineHeight: 1.7, color: 'rgba(255,255,255,0.92)' }}>{children}</div>
    </div>
  )
}

export function FaqBlock({ items }: { items: FaqItem[] }) {
  return (
    <section style={{ marginTop: 72, paddingTop: 56, borderTop: '1px solid var(--border)' }}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 12 }}>FAQ</div>
      <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 32, fontWeight: 400, letterSpacing: '-0.5px', marginBottom: 32 }}>Frequently asked questions</h2>
      <div>
        {items.map((item, i) => (
          <div key={i} style={{ borderBottom: '1px solid var(--border)', padding: '20px 0' }}>
            <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--ink)', marginBottom: 8, lineHeight: 1.4 }}>{item.q}</div>
            <div style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.7 }}>{item.a}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

export function RelatedPages({ links }: { links: { href: string; title: string; desc: string }[] }) {
  return (
    <section style={{ marginTop: 64, paddingTop: 56, borderTop: '1px solid var(--border)' }}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 12 }}>Keep reading</div>
      <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 400, marginBottom: 24 }}>Related pages</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
        {links.map((l) => (
          <Link key={l.href} href={l.href} style={{
            display: 'block',
            background: 'white',
            border: '1px solid var(--border)',
            borderRadius: 4,
            padding: '20px',
            textDecoration: 'none',
            transition: 'border-color 0.15s',
          }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)', marginBottom: 6 }}>{l.title}</div>
            <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.5 }}>{l.desc}</div>
            <div style={{ fontSize: 12, color: 'var(--accent)', marginTop: 12, fontWeight: 600 }}>Read →</div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export function Cta({ headline, sub }: { headline: string; sub: string }) {
  return (
    <section style={{ marginTop: 64, background: 'var(--ink)', borderRadius: 4, padding: '48px 40px', textAlign: 'center', color: 'white' }}>
      <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 32, fontWeight: 400, letterSpacing: '-0.5px', marginBottom: 14, color: 'white' }}>{headline}</h2>
      <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', marginBottom: 28, maxWidth: 520, margin: '0 auto 28px' }}>{sub}</p>
      <Link href="/sign-up" style={{
        display: 'inline-block',
        background: 'var(--accent)',
        color: 'white',
        padding: '14px 32px',
        borderRadius: 2,
        textDecoration: 'none',
        fontSize: 14,
        fontWeight: 600,
      }}>
        Start free — 1000 credits
      </Link>
      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginTop: 14 }}>No credit card required</div>
    </section>
  )
}

export function FaqSchema({ items }: { items: FaqItem[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  }
  return <Script id="faq-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

export function ArticleSchema({ url, title, description, datePublished }: { url: string; title: string; description: string; datePublished: string }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    author: { '@type': 'Organization', name: 'HookMeDaddy' },
    publisher: {
      '@type': 'Organization',
      name: 'HookMeDaddy',
      logo: { '@type': 'ImageObject', url: 'https://hookmedaddy.com/og-logo.png' },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    datePublished,
    dateModified: datePublished,
  }
  return <Script id="article-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

export function SoftwareSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'HookMeDaddy',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description: 'AI hook generator built on the Schwartz Pyramid of Awareness. Generates hooks, captions, and CTAs calibrated to every stage of the buyer awareness journey.',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', reviewCount: '127' },
    url: 'https://hookmedaddy.com',
  }
  return <Script id="software-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}
