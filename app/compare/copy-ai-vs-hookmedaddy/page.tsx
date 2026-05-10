import type { Metadata } from 'next'
import {
  LandingNav, LandingFooter, PageHero, PageBody, Section, P, Lead,
  ComparisonTable, FaqBlock, RelatedPages, Cta, FaqSchema, ArticleSchema, Callout,
} from '@/components/LandingShell'

const URL = 'https://hookmedaddy.com/compare/copy-ai-vs-hookmedaddy'
const TITLE = 'Copy.ai vs HookMeDaddy: Broad Copy Tool vs Awareness-Led Hook Generator'
const DESCRIPTION = 'Copy.ai vs HookMeDaddy compared. Broad AI copy production versus awareness-stage hook generation. Where each one wins, real output examples, and how to choose.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ['Copy.ai vs HookMeDaddy', 'Copy.ai alternative', 'AI ad copy tool', 'Copy.ai for Facebook ads', 'best AI hook generator', 'awareness stage marketing'],
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: URL, siteName: 'HookMeDaddy', type: 'article' },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
  robots: { index: true, follow: true },
}

const FAQS = [
  {
    q: 'Does Copy.ai have better AI than HookMeDaddy?',
    a: 'The underlying AI quality is not the differentiator. Both tools use capable language models. The difference is what the tool instructs the model to do. HookMeDaddy builds awareness-stage logic into the generation request. Copy.ai does not.',
  },
  {
    q: 'What if I already pay for Copy.ai? Should I switch?',
    a: 'Not necessarily. If Copy.ai is working for your content production workflow, keep it. Consider HookMeDaddy specifically for paid social hook testing where awareness stage precision will directly affect your ad results.',
  },
  {
    q: 'Is HookMeDaddy cheaper than Copy.ai?',
    a: 'HookMeDaddy uses a credit-based model with a free entry tier. For teams that primarily need hook generation rather than full copy production, it is typically more cost-effective.',
  },
  {
    q: 'Can Copy.ai generate awareness-stage hooks at all?',
    a: 'Yes, with manual prompting. If you write a custom prompt that explains the Schwartz model, defines the audience stage, and specifies the output structure, Copy.ai can produce stage-matched output. The default templates do not.',
  },
]

export default function CompareCopyAi() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', fontFamily: 'var(--font-sans)' }}>
      <ArticleSchema url={URL} title={TITLE} description={DESCRIPTION} datePublished="2026-05-10" />
      <FaqSchema items={FAQS} />

      <LandingNav />

      <PageHero
        kicker="Comparison"
        title="Copy.ai vs HookMeDaddy"
        subtitle="Copy.ai is a broad copy production tool. HookMeDaddy is an awareness-led hook generator. The overlap is ad hooks. That is where the comparison matters."
      />

      <PageBody>
        <Section kicker="The positioning">
          <Lead>
            Copy.ai is a broad AI copywriting tool. It covers ad copy, email sequences, product descriptions, and social posts. It has solid output quality and workflow features for teams managing content at scale.
          </Lead>
          <P>HookMeDaddy does one thing. It generates hooks, captions, and CTAs calibrated to audience awareness stage. The overlap between the two tools is ad hook generation. That is where the comparison matters.</P>
        </Section>

        <Section kicker="Feature comparison" title="Side by side">
          <ComparisonTable
            headers={['Feature', 'Copy.ai', 'HookMeDaddy']}
            rows={[
              ['Hook-specific output', 'One template among many', 'Primary product'],
              ['Awareness stage logic', 'Not built in', 'Core architecture'],
              ['Workflow tools', 'Strong', 'Lightweight'],
              ['Platform targeting', 'General', 'Platform-specific output'],
              ['Output formats', 'Broad', 'Hooks, captions, CTAs'],
              ['Pricing', '$36/mo and up', 'Credit-based tiers'],
            ]}
          />
        </Section>

        <Section kicker="The gap" title="What Copy.ai does not fill">
          <P>Copy.ai produces serviceable ad hooks. The issue is the same as with every generalist AI copy tool: the output is not calibrated to where your audience is in their buying journey.</P>
          <P>A hook written for a cold, unaware audience looks completely different from a hook written for a retargeting audience that already knows your product. Copy.ai does not build this distinction into its generation process. You can get there with careful prompting, but the default output treats all audiences the same.</P>
          <P>HookMeDaddy&apos;s entire value proposition is that it makes this distinction the starting point, not an afterthought.</P>
        </Section>

        <Section kicker="Same product, different tools" title="Output comparison">
          <P><strong>Product:</strong> online fitness coaching. <strong>Platform:</strong> Instagram. <strong>Audience:</strong> cold.</P>
          <ComparisonTable
            headers={['Tool', 'Generated hook']}
            rows={[
              ['Copy.ai (ad copy template)', 'Transform your body with personalized online coaching. Get started today.'],
              ['HookMeDaddy (Unaware)', 'You are not unmotivated. You are training for a goal you have never clearly decided on.'],
              ['HookMeDaddy (Problem Aware)', 'Every program works for someone. Most people never figure out which one works for them.'],
              ['HookMeDaddy (Solution Aware)', 'Personal training online sounds like a compromise. It is not. Here is why the data disagrees.'],
            ]}
          />
          <Callout label="The pattern again">
            Copy.ai produces a single generic ad opener. HookMeDaddy produces three completely different doors into the conversion, each calibrated to a different level of audience awareness.
          </Callout>
        </Section>

        <Section kicker="Decision framework" title="Which one to choose">
          <P>If you need a full content production suite and hooks are one output among many, Copy.ai is a reasonable all-in-one choice.</P>
          <P>If your primary goal is improving the performance of paid social ads and you need awareness-stage precision in every hook, HookMeDaddy is the more targeted and more cost-effective option.</P>
          <P>For teams running serious paid social campaigns where hook quality directly impacts ROAS, the awareness-stage gap between the two tools is meaningful, not marginal.</P>
        </Section>

        <FaqBlock items={FAQS} />

        <RelatedPages links={[
          { href: '/what-is-hookmedaddy', title: 'What is HookMeDaddy', desc: 'The product overview, who it is for, and how the awareness engine works.' },
          { href: '/best-ai-hook-generator', title: 'Best AI Hook Generator in 2025', desc: 'Honest ranked comparison across HookMeDaddy, Jasper, Copy.ai, AdCreative, and ChatGPT.' },
          { href: '/schwartz-awareness-pyramid', title: 'The Schwartz Pyramid', desc: 'The framework that makes the awareness engine possible in the first place.' },
        ]} />

        <Cta headline="Test the awareness gap yourself" sub="Generate the same hook in three different awareness stages and run them as separate ad sets. The difference will show up in your CTR." />
      </PageBody>

      <LandingFooter />
    </div>
  )
}
