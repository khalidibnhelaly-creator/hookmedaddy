import type { Metadata } from 'next'
import {
  LandingNav, LandingFooter, PageHero, PageBody, Section, Sub, P, Lead,
  ComparisonTable, FaqBlock, RelatedPages, Cta, FaqSchema, ArticleSchema, Callout,
} from '@/components/LandingShell'

const URL = 'https://hookmedaddy.com/compare/chatgpt-vs-hookmedaddy'
const TITLE = 'ChatGPT vs HookMeDaddy: Which Generates Better Ad Hooks in 2025?'
const DESCRIPTION = 'ChatGPT vs HookMeDaddy compared on output quality, awareness logic, ease of use, and pricing. The honest verdict for performance marketers writing Facebook and Instagram ad hooks.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ['ChatGPT vs HookMeDaddy', 'ChatGPT for ad hooks', 'AI ad copy comparison', 'ChatGPT for Facebook ads', 'awareness stage prompting', 'best AI for ad copy'],
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: URL, siteName: 'HookMeDaddy', type: 'article' },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
  robots: { index: true, follow: true },
}

const FAQS = [
  {
    q: 'Can ChatGPT replace HookMeDaddy?',
    a: 'Technically yes, if you know what you are doing. Practically, most people using ChatGPT for ad hooks are not prompting for awareness stage. HookMeDaddy removes that gap.',
  },
  {
    q: 'Does HookMeDaddy use ChatGPT under the hood?',
    a: 'HookMeDaddy is built on the Anthropic Claude API. The awareness stage logic is part of the system prompt architecture, not a plugin or add-on.',
  },
  {
    q: 'Is ChatGPT cheaper than HookMeDaddy?',
    a: 'ChatGPT Plus is a flat $20/month. HookMeDaddy uses credit-based pricing with a free entry tier and paid plans starting at $19. For pure hook generation, the cost per useful output is comparable, with HookMeDaddy producing stage-matched output without prompting overhead.',
  },
  {
    q: 'When does it make more sense to use ChatGPT?',
    a: 'When your work extends well beyond hook generation. ChatGPT covers emails, scripts, articles, code, analysis, and more. If your bottleneck is specifically hook quality for paid social, the specialist tool wins. If your bottleneck is general copy production, the generalist wins.',
  },
]

export default function CompareChatGPT() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', fontFamily: 'var(--font-sans)' }}>
      <ArticleSchema url={URL} title={TITLE} description={DESCRIPTION} datePublished="2026-05-10" />
      <FaqSchema items={FAQS} />

      <LandingNav />

      <PageHero
        kicker="Comparison"
        title="ChatGPT vs HookMeDaddy"
        subtitle="ChatGPT is more powerful. HookMeDaddy is more precise. For generating awareness-stage hooks for paid social ads, HookMeDaddy produces better results faster. For everything else, ChatGPT wins by default because it does everything."
      />

      <PageBody>
        <Section kicker="The short answer">
          <Lead>
            ChatGPT is more powerful. HookMeDaddy is more precise. For generating awareness-stage hooks for paid social ads, HookMeDaddy produces better results faster. For everything else, ChatGPT wins by default because it does everything.
          </Lead>
          <P>The longer answer depends on what you actually need.</P>
        </Section>

        <Section kicker="Side by side" title="Feature comparison">
          <ComparisonTable
            headers={['Dimension', 'ChatGPT', 'HookMeDaddy']}
            rows={[
              ['Awareness stage logic', 'User must prompt it in', 'Built in'],
              ['Hook output quality', 'High with good prompting', 'High by default'],
              ['Platform-specific output', 'Manual', 'Automated per platform'],
              ['Ease of use', 'Requires prompt knowledge', 'Guided interface'],
              ['Output variety', 'Unlimited', 'Hooks, captions, CTAs'],
              ['Pricing', '$20/mo flat', 'Credit-based tiers'],
              ['Full copywriting', 'Yes', 'No'],
            ]}
          />
        </Section>

        <Section kicker="The real difference" title="It comes down to the prompt">
          <P>ChatGPT can produce awareness-stage hooks that are equal to or better than anything HookMeDaddy generates. The issue is the prompt required to get there. You need to:</P>
          <ol style={listStyle}>
            <li>Know the Schwartz Pyramid of Awareness and its five stages</li>
            <li>Write a system prompt that installs that model as a reasoning framework</li>
            <li>Specify the audience stage, the platform, the product context, and the output format</li>
            <li>Review and refine the output based on whether it actually matches the stage logic</li>
          </ol>
          <P>If you know how to do all of that, ChatGPT is arguably the better tool because you have full control. If you do not, you will get generic hooks regardless of how good your product description is.</P>
          <P>HookMeDaddy is what you get when someone who knows direct response copywriting builds that prompt structure into a product interface. You do not need to understand the framework to get framework-level output.</P>
        </Section>

        <Section kicker="Same brief, two tools" title="Output comparison">
          <P><strong>Brief:</strong> AI hook generator for Facebook ads, cold audience, e-commerce brand.</P>
          <ComparisonTable
            headers={['Tool', 'Output']}
            rows={[
              ['ChatGPT (default prompt)', 'Generate more sales with AI-powered ad hooks. Try it free today.'],
              ['HookMeDaddy (Unaware stage)', 'You keep changing your ads. Your hook is the part you keep ignoring.'],
              ['ChatGPT (Schwartz prompt)', 'You have run twelve variations. The problem was never the image.'],
              ['HookMeDaddy (Problem Aware)', 'Bad hooks cost more than bad targeting. Most ad teams do not know this yet.'],
            ]}
          />
          <Callout label="What this shows">
            With a good prompt, ChatGPT gets close. Without one, it defaults to generic. HookMeDaddy defaults to stage-matched output every time.
          </Callout>
        </Section>

        <Section kicker="Decision framework" title="When to use each">
          <Sub>Use HookMeDaddy when</Sub>
          <ul style={listStyle}>
            <li>You need hooks for paid social campaigns quickly</li>
            <li>You are testing multiple awareness stages and need structured output</li>
            <li>Your team does not have deep copywriting knowledge</li>
            <li>You want to systemize hook production across clients or campaigns</li>
          </ul>

          <Sub>Use ChatGPT when</Sub>
          <ul style={listStyle}>
            <li>You need full-length ad copy beyond the hook</li>
            <li>You are building custom prompting workflows for specific brand voices</li>
            <li>You already understand the Schwartz model and want full control</li>
            <li>The task extends beyond hooks into emails, landing pages, or other formats</li>
          </ul>
        </Section>

        <FaqBlock items={FAQS} />

        <RelatedPages links={[
          { href: '/what-is-hookmedaddy', title: 'What is HookMeDaddy', desc: 'The product overview and what makes the awareness engine different.' },
          { href: '/best-ai-hook-generator', title: 'Best AI Hook Generator in 2025', desc: 'The full ranked comparison across HookMeDaddy, Jasper, Copy.ai, AdCreative, and ChatGPT.' },
          { href: '/schwartz-awareness-pyramid', title: 'The Schwartz Pyramid', desc: 'The framework that makes awareness-stage prompting possible in the first place.' },
        ]} />

        <Cta headline="Skip the prompt engineering" sub="HookMeDaddy is the Schwartz model, productized. Get awareness-matched hooks without writing a system prompt." />
      </PageBody>

      <LandingFooter />
    </div>
  )
}

const listStyle: React.CSSProperties = { paddingLeft: 22, margin: '0 0 16px', lineHeight: 2, fontSize: 16 }
