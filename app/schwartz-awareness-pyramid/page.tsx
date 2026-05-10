import type { Metadata } from 'next'
import {
  LandingNav, LandingFooter, PageHero, PageBody, Section, P, Lead,
  FaqBlock, RelatedPages, Cta, FaqSchema, ArticleSchema, Callout,
} from '@/components/LandingShell'
import { AwarenessPyramidVisual, StageDiagram } from '@/components/AwarenessPyramidVisual'

const URL = 'https://hookmedaddy.com/schwartz-awareness-pyramid'
const TITLE = 'The Schwartz Pyramid of Awareness: 5 Stages Explained for Modern Ad Copy'
const DESCRIPTION = 'Eugene Schwartz’s Pyramid of Awareness mapped the five stages every buyer moves through. Here is the framework, an example hook for each stage, and how to apply it to Facebook, Instagram, and TikTok ads.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ['Schwartz pyramid', 'pyramid of awareness', 'Eugene Schwartz', 'breakthrough advertising', 'customer awareness stages', 'awareness levels marketing', 'cold audience hook', 'product aware copy'],
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: URL, siteName: 'HookMeDaddy', type: 'article' },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
  robots: { index: true, follow: true },
}

const FAQS = [
  {
    q: 'Is the Schwartz model still relevant for digital ads?',
    a: 'It is more relevant than ever. The model was built on direct response mail campaigns in the 1960s. The psychology has not changed. What has changed is the volume of competing messages, which makes getting the awareness stage right more critical, not less.',
  },
  {
    q: 'Do I need to know the framework to use HookMeDaddy?',
    a: 'No. You select your audience stage from a menu and the tool handles the rest. But understanding why the stages exist helps you pick the right one and interpret the output more usefully.',
  },
  {
    q: 'Can the same product have audiences at different stages?',
    a: 'Always. A new product launch is reaching mostly unaware and problem-aware people. A product with an existing customer base has users at every stage. Running all five in a campaign and testing them reveals where most of your audience actually sits.',
  },
  {
    q: 'Where can I read Eugene Schwartz’s original framework?',
    a: 'Schwartz published the model in Breakthrough Advertising in 1966. The book is widely considered one of the most important direct response copywriting texts ever written and is still in print.',
  },
]

export default function PyramidPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', fontFamily: 'var(--font-sans)' }}>
      <ArticleSchema url={URL} title={TITLE} description={DESCRIPTION} datePublished="2026-05-10" />
      <FaqSchema items={FAQS} />

      <LandingNav />

      <PageHero
        kicker="Framework"
        title="The Schwartz Pyramid of Awareness"
        subtitle="Customers do not exist in a single state. They move through stages of understanding. Your message either meets them where they are, or it misses them entirely."
      />

      <PageBody>
        <Section kicker="The framework behind HookMeDaddy">
          <Lead>
            Eugene Schwartz was one of the most analytically rigorous copywriters who ever worked. In his 1966 book Breakthrough Advertising, he introduced a model that still predicts ad performance better than most modern frameworks: the five stages of customer awareness.
          </Lead>
          <P>The insight is simple and brutal. Customers do not exist in a single state. They move through stages of understanding. Your message either meets them where they are, or it misses them entirely.</P>
          <P>HookMeDaddy is built entirely on this model. Every hook, caption, and CTA it generates is calibrated to one of the five stages below.</P>
        </Section>

        <AwarenessPyramidVisual />

        <Section kicker="Stage 1" title="Unaware">
          <P><strong>They do not know they have a problem.</strong></P>
          <P>This is the hardest audience to reach. They are not searching for anything. They are scrolling. Your hook needs to describe an experience they are living, not a problem they recognize, in a way that makes them stop and think: that is me.</P>
          <StageDiagram stage="Unaware" position={1} exampleHook="You finish the day having done a lot. You cannot name one thing that mattered." />
          <P>Notice there is no product mention, no solution, no CTA. The job of this hook is recognition, not conversion. You are naming the problem before they know they have it.</P>
        </Section>

        <Section kicker="Stage 2" title="Problem Aware">
          <P><strong>They know the problem. They do not know a solution exists.</strong></P>
          <P>This audience is frustrated. They know something is wrong. They do not know it is fixable. Your hook should validate the problem and introduce the idea that something can be done about it.</P>
          <StageDiagram stage="Problem Aware" position={2} exampleHook="Most people assume bad focus is just who they are. It is not. It is a system problem." />
          <P>You are still not selling. You are shifting their worldview from &lsquo;this is my life&rsquo; to &lsquo;this is a problem with a solution.&rsquo;</P>
        </Section>

        <Section kicker="Stage 3" title="Solution Aware">
          <P><strong>They know solutions exist. They have not found the right one.</strong></P>
          <P>This audience is actively looking. They have probably tried things. They are skeptical because nothing has worked well enough. Your hook needs to differentiate the category of solution you offer, not just the product.</P>
          <StageDiagram stage="Solution Aware" position={3} exampleHook="Productivity apps do not help people who already know what to do. They help people who do not know what they actually want." />
          <P>You are reframing the solution category, not just promoting your product.</P>
        </Section>

        <Section kicker="Stage 4" title="Product Aware">
          <P><strong>They know about your product. They have not committed.</strong></P>
          <P>This audience has seen you before. They are sitting on the fence. Your hook should address the specific objection keeping them from converting: price, trust, timing, or a comparison with a competitor.</P>
          <StageDiagram stage="Product Aware" position={4} exampleHook="Still comparing? Here is the one thing the other tools do not account for." />
          <P>You are pushing on the hesitation point, not re-selling the product.</P>
        </Section>

        <Section kicker="Stage 5" title="Most Aware">
          <P><strong>They know your product well. They just need the right push.</strong></P>
          <P>This is your retargeting audience, your email list, your existing users. They need urgency, social proof, or an offer. Your hook can be direct because the relationship already exists.</P>
          <StageDiagram stage="Most Aware" position={5} exampleHook="Last 48 hours: 40% off for people who almost signed up last month." />
          <P>Short. Direct. Assumes context. Works because the audience already has it.</P>
        </Section>

        <Section kicker="Why it matters" title="Awareness stage matters more than tone">
          <P>Most copy advice focuses on tone: be conversational, be direct, be emotional. Tone matters. But if your message is pitched at the wrong awareness stage, no amount of tonal polish saves it.</P>
          <P>A product-aware message shown to an unaware audience sounds like spam. An unaware message shown to a most-aware audience feels slow and patronizing. Getting the stage right is the precondition for everything else working.</P>
        </Section>

        <Section kicker="Automation" title="How HookMeDaddy automates this">
          <P>You select the awareness stage and the platform. HookMeDaddy generates hooks, captions, and CTAs matched to that exact combination. You can generate all five stages in a single session and use the outputs to build a full-funnel content system.</P>
          <Callout label="The alternative">
            Knowing the Schwartz model well enough to write stage-matched copy yourself, or knowing how to prompt ChatGPT to do it, which requires understanding the framework you are trying to apply. HookMeDaddy removes that barrier.
          </Callout>
        </Section>

        <FaqBlock items={FAQS} />

        <RelatedPages links={[
          { href: '/what-is-hookmedaddy', title: 'What is HookMeDaddy', desc: 'The product overview. Who it is for, what it solves, and how it differs from generalist AI tools.' },
          { href: '/how-to-write-facebook-ad-hooks', title: 'How to write Facebook ad hooks', desc: 'Five hook formulas mapped to each Schwartz awareness stage with templates and examples.' },
        ]} />

        <Cta headline="Generate stage-matched hooks in one session" sub="Pick your awareness stage and platform. Get hooks, captions, and CTAs calibrated to your audience’s exact level of intent." />
      </PageBody>

      <LandingFooter />
    </div>
  )
}
