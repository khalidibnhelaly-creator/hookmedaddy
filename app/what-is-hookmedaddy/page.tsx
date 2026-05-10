import type { Metadata } from 'next'
import {
  LandingNav, LandingFooter, PageHero, PageBody, Section, P, Lead,
  ComparisonTable, FaqBlock, RelatedPages, Cta, FaqSchema, ArticleSchema, SoftwareSchema, Callout,
} from '@/components/LandingShell'

const URL = 'https://hookmedaddy.com/what-is-hookmedaddy'
const TITLE = 'What is HookMeDaddy? AI Hook Generator Built on the Schwartz Pyramid'
const DESCRIPTION = 'HookMeDaddy is an AI hook generator that calibrates copy to your audience’s awareness stage using the Schwartz Pyramid. Built for performance marketers, copywriters, and brand teams.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ['HookMeDaddy', 'AI hook generator', 'Schwartz pyramid of awareness', 'Facebook ad hooks', 'awareness stage copy', 'performance marketing copy', 'AI ad copy tool'],
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    siteName: 'HookMeDaddy',
    type: 'article',
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
  robots: { index: true, follow: true },
}

const FAQS = [
  {
    q: 'What makes a hook awareness-aware?',
    a: 'A standard hook tries to grab attention. An awareness-aware hook grabs the attention of a specific audience at a specific moment in their decision process. For a cold audience, that means leading with the problem, not the product. For a warm audience, it means addressing the objection they already have.',
  },
  {
    q: 'Can I use HookMeDaddy for organic social, not just paid ads?',
    a: 'Yes. The awareness model applies to organic content too. A viral organic post typically works because it speaks to the problem awareness stage. People share it because it names something they already feel but have not seen stated clearly.',
  },
  {
    q: 'How is this different from just prompting ChatGPT?',
    a: 'You can get awareness-stage hooks from ChatGPT if you know the Schwartz model and write a detailed prompt. HookMeDaddy has that prompt logic built in. You do not need to know the framework to get framework-level output.',
  },
  {
    q: 'What platforms does HookMeDaddy generate content for?',
    a: 'Facebook ads, Instagram reels, TikTok, YouTube pre-roll, and LinkedIn. Each platform has different attention mechanics and HookMeDaddy accounts for format when generating.',
  },
  {
    q: 'Is there a free trial?',
    a: 'Yes. New accounts get a free credit allocation to generate and test before committing to a paid plan.',
  },
]

export default function WhatIsPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', fontFamily: 'var(--font-sans)' }}>
      <ArticleSchema url={URL} title={TITLE} description={DESCRIPTION} datePublished="2026-05-10" />
      <FaqSchema items={FAQS} />
      <SoftwareSchema />

      <LandingNav />

      <PageHero
        kicker="Product"
        title="What is HookMeDaddy?"
        subtitle="An AI hook generator built on Eugene Schwartz’s Pyramid of Awareness. It writes hooks, captions, and CTAs matched to where your audience actually is in their buying journey, not just how you want them to feel."
      />

      <PageBody>
        <Section kicker="Definition">
          <Lead>
            HookMeDaddy is an AI-powered hook generator built on Eugene Schwartz&apos;s awareness pyramid. It generates hooks, captions, and CTAs matched to where your audience actually is in their buying journey, not just how you want them to feel.
          </Lead>
          <P>Most AI copy tools write for everyone. HookMeDaddy writes for the right person at the right moment.</P>
        </Section>

        <Section kicker="Audience" title="Who it is for">
          <ul style={listStyle}>
            <li>Performance marketers running Facebook, Instagram, and TikTok ads</li>
            <li>Copywriters who need to produce volume without sacrificing precision</li>
            <li>Brand teams testing multiple angles across cold and warm audiences</li>
            <li>Solopreneurs and agency owners who do not have time to rewrite hooks from scratch</li>
            <li>Media buyers who know their CTR problem is a hook problem</li>
          </ul>
        </Section>

        <Section kicker="The problem" title="Why generic AI copy keeps failing">
          <P>Generic AI tools produce generic output. You put in a product description, you get copy that sounds like every other ad in the feed. It is polished. It is forgettable.</P>
          <P>The real issue is not the writing quality. It is that the hook assumes everyone is ready to buy. A cold audience that has never heard of your product does not respond to the same message as someone who already knows they have a problem. Writing the same hook for both is the fastest way to kill your ROAS.</P>
          <P>HookMeDaddy solves this by building awareness stage logic into the generation process. You tell it which stage your audience is at, and it produces hooks calibrated to that exact level of intent.</P>
        </Section>

        <Section kicker="How it works" title="Built on the Schwartz Pyramid">
          <P>The product is built around the Schwartz Pyramid of Awareness, a five-stage model developed by legendary copywriter Eugene Schwartz. The five stages are:</P>
          <ol style={listStyle}>
            <li><strong>Unaware:</strong> The audience does not know they have a problem</li>
            <li><strong>Problem Aware:</strong> They know the problem but do not know solutions exist</li>
            <li><strong>Solution Aware:</strong> They know solutions exist but have not picked one</li>
            <li><strong>Product Aware:</strong> They know about your product but have not committed</li>
            <li><strong>Most Aware:</strong> They know your product well and just need the right push</li>
          </ol>
          <P>Each stage requires a completely different message. HookMeDaddy generates hooks, captions, and CTAs for all five stages simultaneously, so you can test the full awareness spectrum in one session.</P>
        </Section>

        <Section kicker="Comparison" title="HookMeDaddy vs generic AI copy">
          <ComparisonTable
            headers={['Feature', 'HookMeDaddy']}
            rows={[
              ['Awareness stage logic', 'Built into every output'],
              ['Output type', 'Hooks, captions, CTAs (not full copy)'],
              ['Framework', 'Schwartz Pyramid of Awareness'],
              ['Platform targeting', 'Facebook, Instagram, TikTok, YouTube, LinkedIn'],
              ['Use case', 'Paid ads, organic social, content testing'],
              ['Pricing model', 'Credit-based with subscription tiers'],
            ]}
          />
        </Section>

        <Section kicker="Differentiation" title="How it is different from Jasper and Copy.ai">
          <P>Jasper and Copy.ai are full-suite copy tools. They write blog posts, emails, product descriptions, ad copy, and more. They are built for volume and variety.</P>
          <P>HookMeDaddy is not a full-suite tool. It is a specialist. It does one thing that generalist tools cannot: it matches your message to your audience&apos;s awareness stage before it generates a single word.</P>
          <P>Jasper will write you a great Facebook ad. HookMeDaddy will write you five versions of that ad, each calibrated to a different level of audience intent, so you can find which stage your audience is actually at through testing.</P>
          <Callout label="Bottom line">
            Jasper and Copy.ai are content production engines. HookMeDaddy is the precision instrument you reach for when the hook is the variable that decides whether anyone reads the rest.
          </Callout>
        </Section>

        <FaqBlock items={FAQS} />

        <RelatedPages links={[
          { href: '/schwartz-awareness-pyramid', title: 'The Schwartz Pyramid of Awareness', desc: 'Inside the framework HookMeDaddy is built on. Five stages, five messages.' },
          { href: '/best-ai-hook-generator', title: 'Best AI Hook Generator in 2025', desc: 'How HookMeDaddy stacks up against Jasper, Copy.ai, AdCreative, and ChatGPT.' },
          { href: '/how-to-write-facebook-ad-hooks', title: 'How to write Facebook ad hooks', desc: 'Five hook formulas matched to each awareness stage, with templates.' },
        ]} />

        <Cta headline="Try the awareness engine" sub="1,000 free credits on signup. Generate hooks calibrated to all five Schwartz stages in one session." />
      </PageBody>

      <LandingFooter />
    </div>
  )
}

const listStyle: React.CSSProperties = {
  paddingLeft: 22,
  margin: '0 0 16px',
  lineHeight: 2,
  fontSize: 16,
}
