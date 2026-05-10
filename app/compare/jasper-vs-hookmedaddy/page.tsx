import type { Metadata } from 'next'
import {
  LandingNav, LandingFooter, PageHero, PageBody, Section, Sub, P, Lead,
  ComparisonTable, FaqBlock, RelatedPages, Cta, FaqSchema, ArticleSchema, Callout,
} from '@/components/LandingShell'

const URL = 'https://hookmedaddy.com/compare/jasper-vs-hookmedaddy'
const TITLE = 'Jasper vs HookMeDaddy: Full-Suite Copy vs Hook Specialist'
const DESCRIPTION = 'Jasper vs HookMeDaddy honest comparison. Where Jasper wins (volume, formats, team workflows), where HookMeDaddy wins (awareness-stage hooks for paid social), and how to decide.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ['Jasper vs HookMeDaddy', 'Jasper alternative', 'AI ad copy comparison', 'Jasper for Facebook ads', 'best AI copywriting tool', 'AI hook generator comparison'],
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: URL, siteName: 'HookMeDaddy', type: 'article' },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
  robots: { index: true, follow: true },
}

const FAQS = [
  {
    q: 'Can I use both Jasper and HookMeDaddy together?',
    a: 'Yes. A practical workflow is using HookMeDaddy to generate and test hooks, then using Jasper to write the full ad copy once you know which hook angle performs. They do different things well.',
  },
  {
    q: 'Is Jasper worth the price over HookMeDaddy for a solo advertiser?',
    a: 'Depends on your use case. If you are primarily running paid social ads and hook quality is the main variable, HookMeDaddy is more cost-effective and more precise. If you need blog content, emails, and other copy formats too, Jasper offers more breadth.',
  },
  {
    q: 'Does Jasper have an awareness-stage feature?',
    a: 'Not natively. Jasper has dozens of templates including Facebook ad copy, but awareness-stage logic is not built into any of them. You can guide Jasper toward stage-matched output through prompting, but the default behavior is generic.',
  },
  {
    q: 'Which has better team features?',
    a: 'Jasper. It has more mature workspace, role, and brand voice features for teams managing multiple writers and clients. HookMeDaddy is lighter on collaboration and heavier on per-output precision.',
  },
]

export default function CompareJasper() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', fontFamily: 'var(--font-sans)' }}>
      <ArticleSchema url={URL} title={TITLE} description={DESCRIPTION} datePublished="2026-05-10" />
      <FaqSchema items={FAQS} />

      <LandingNav />

      <PageHero
        kicker="Comparison"
        title="Jasper vs HookMeDaddy"
        subtitle="Two different tools for two different problems. Jasper is a full-suite content engine. HookMeDaddy is a precision instrument for the part of copy that decides whether anyone reads the rest."
      />

      <PageBody>
        <Section kicker="The setup" title="Two different tools for two different problems">
          <Lead>
            Jasper is a full-suite AI writing platform. It writes blog posts, emails, social copy, product descriptions, and ad creative. It is built for teams that need writing output at scale across multiple formats.
          </Lead>
          <P>HookMeDaddy is a specialist. It writes hooks, captions, and CTAs matched to audience awareness stage. That is the entire product. If Jasper is a content production engine, HookMeDaddy is the precision instrument you use when the hook is the variable you need to get right.</P>
          <P>They are not really competing. But if your specific problem is hook quality for paid social ads, the comparison matters.</P>
        </Section>

        <Section kicker="Feature comparison" title="Side by side">
          <ComparisonTable
            headers={['Feature', 'Jasper', 'HookMeDaddy']}
            rows={[
              ['Primary output', 'All copy formats', 'Hooks, captions, CTAs only'],
              ['Awareness stage logic', 'Manual prompting required', 'Built in'],
              ['Paid ad focus', 'One of many use cases', 'Primary use case'],
              ['Team workflows', 'Strong', 'Lightweight'],
              ['Learning curve', 'Moderate', 'Low'],
              ['Price range', '$49/mo and up', 'Credit tiers, free entry'],
              ['Best for', 'Content teams at volume', 'Performance marketers'],
            ]}
          />
        </Section>

        <Section kicker="The core distinction" title="Jasper writes copy. HookMeDaddy writes the part that gets read.">
          <P>A hook is not just the opening line. It is the reason the audience stays long enough to see the product. A well-written ad with a weak hook performs worse than an average ad with a strong hook. This is consistently what Facebook ad data shows. The hook has more impact on CTR than creative quality, headline, or offer in most cold audience campaigns.</P>
          <P>Jasper can produce hooks as part of its ad copy output. But it does not build awareness-stage logic into that process. You will get competent copy. You will not get copy that is calibrated to where your specific audience is in their decision journey.</P>
        </Section>

        <Section kicker="Real output comparison" title="Same brief, two tools">
          <P><strong>Product:</strong> project management tool. <strong>Platform:</strong> Facebook. <strong>Audience:</strong> cold.</P>
          <ComparisonTable
            headers={['Tool', 'Hook output']}
            rows={[
              ['Jasper (Facebook ad template)', 'Manage your team’s projects with ease. Try it free for 14 days.'],
              ['HookMeDaddy (Problem Aware)', 'Your team is busy. Nobody can name what moved forward last week.'],
              ['HookMeDaddy (Solution Aware)', 'Spreadsheets track tasks. They do not show you where projects are dying.'],
              ['HookMeDaddy (Unaware)', 'The meeting went well. You have no idea what anyone is actually doing.'],
            ]}
          />
          <Callout label="The pattern">
            Jasper produces a competent generic hook. HookMeDaddy produces three different angles, each calibrated to a specific level of audience intent, so you can test which stage your audience is actually at.
          </Callout>
        </Section>

        <Section kicker="Decision framework" title="When to use each">
          <Sub>Jasper is the better choice when</Sub>
          <ul style={listStyle}>
            <li>You need a full content production system across formats</li>
            <li>You have a team managing copy at scale</li>
            <li>Hooks are one deliverable among many, not the core bottleneck</li>
            <li>You need blog, email, and social output under one tool</li>
          </ul>

          <Sub>HookMeDaddy is the better choice when</Sub>
          <ul style={listStyle}>
            <li>Paid social ad performance is the primary goal</li>
            <li>Hook quality and awareness-stage precision matter more than volume</li>
            <li>You are testing cold audiences where generic hooks consistently underperform</li>
            <li>You want to run full-funnel hook testing across all five awareness stages</li>
          </ul>
        </Section>

        <FaqBlock items={FAQS} />

        <RelatedPages links={[
          { href: '/what-is-hookmedaddy', title: 'What is HookMeDaddy', desc: 'How the awareness engine works and why it produces stage-matched hooks by default.' },
          { href: '/best-ai-hook-generator', title: 'Best AI Hook Generator in 2025', desc: 'The full ranked comparison of HookMeDaddy, Jasper, Copy.ai, AdCreative, and ChatGPT.' },
          { href: '/schwartz-awareness-pyramid', title: 'The Schwartz Pyramid', desc: 'The framework underneath every HookMeDaddy output.' },
        ]} />

        <Cta headline="Try the precision instrument" sub="If hook performance is your bottleneck, generate awareness-stage variants in under a minute. Free credits on signup." />
      </PageBody>

      <LandingFooter />
    </div>
  )
}

const listStyle: React.CSSProperties = { paddingLeft: 22, margin: '0 0 16px', lineHeight: 2, fontSize: 16 }
