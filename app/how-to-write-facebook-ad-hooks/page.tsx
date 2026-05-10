import type { Metadata } from 'next'
import {
  LandingNav, LandingFooter, PageHero, PageBody, Section, P, Lead,
  ComparisonTable, FaqBlock, RelatedPages, Cta, FaqSchema, ArticleSchema, Callout, Quote,
} from '@/components/LandingShell'
import { StageDiagram } from '@/components/AwarenessPyramidVisual'

const URL = 'https://hookmedaddy.com/how-to-write-facebook-ad-hooks'
const TITLE = 'How to Write Facebook Ad Hooks That Stop the Scroll (5 Formulas)'
const DESCRIPTION = 'Five Facebook ad hook formulas mapped to each stage of the Schwartz Pyramid of Awareness. Templates, examples, and the 3-second rule that makes or breaks every ad.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ['Facebook ad hooks', 'how to write ad hooks', 'scroll stopping hooks', 'Facebook ad copy', 'Instagram ad hooks', 'TikTok hooks', 'awareness stage hook formulas'],
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: URL, siteName: 'HookMeDaddy', type: 'article' },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
  robots: { index: true, follow: true },
}

const FAQS = [
  {
    q: 'How long should a Facebook ad hook be?',
    a: 'For video: three seconds of audio or the first visual frame. For image and carousel ads: the first line of the primary text, ideally under 10 words. For Stories: the first half second before the skip option appears. Shorter is almost always better for the hook itself. Length belongs in the body copy.',
  },
  {
    q: 'Should a hook always be a question?',
    a: 'No. Questions work well for problem-aware audiences because they provoke internal reflection. For unaware audiences, a statement is often more powerful because the person does not yet know what question to ask. Match the format to the stage.',
  },
  {
    q: 'How many hooks should I test per ad set?',
    a: 'Three to five is a practical range. Too few and you have not learned enough. Too many and your budget thins out before any variant gets meaningful data. Generate five awareness-stage variants, pick the two or three that feel most aligned with your audience, and start there.',
  },
  {
    q: 'Do these formulas work for Instagram and TikTok?',
    a: 'Yes. The five formulas map to audience awareness, not to a specific platform. The platform changes the format (length, voice, pacing), but the underlying logic of matching message to awareness stage is identical across Meta, TikTok, YouTube, and LinkedIn.',
  },
]

export default function HookFormulasPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', fontFamily: 'var(--font-sans)' }}>
      <ArticleSchema url={URL} title={TITLE} description={DESCRIPTION} datePublished="2026-05-10" />
      <FaqSchema items={FAQS} />

      <LandingNav />

      <PageHero
        kicker="Tutorial"
        title="How to Write Facebook Ad Hooks That Stop the Scroll"
        subtitle="Five formulas. One for each stage of audience awareness. Templates, examples, and the framework that determines whether anyone reads the rest of your ad."
      />

      <PageBody>
        <Section kicker="The 3-second rule">
          <Lead>
            Facebook gives you three seconds. That is the window before a person decides whether to keep scrolling or stop and pay attention. In those three seconds, your hook has one job: make them feel something relevant enough to stay.
          </Lead>
          <P>Most ad hooks fail not because they are badly written. They fail because they are written for the wrong person. They assume the audience already cares, already knows the product, or already feels the problem. Most people seeing your ad for the first time do not have any of that context.</P>
          <P>The fix is matching your hook to your audience&apos;s awareness stage before you write a single word.</P>
        </Section>

        <Section kicker="Formula 1" title="The Observation Hook (Unaware audience)">
          <P>Name something your audience experiences without naming it as a problem. This is the hardest formula to write because it requires genuine insight about your audience&apos;s daily life. Done well, it stops the scroll because people feel seen.</P>
          <Quote label="Template">You [specific behavior or experience]. You have no idea it is [outcome they do not see yet].</Quote>
          <StageDiagram stage="Observation hook" position={1} exampleHook="You wake up already behind. You have been doing that for three years." />
        </Section>

        <Section kicker="Formula 2" title="The Problem Reframe Hook (Problem aware audience)">
          <P>They know the problem. Your hook should flip the cause. Most people have an incorrect theory about why their problem exists. Reframing that theory creates the pattern interrupt that gets attention.</P>
          <Quote label="Template">The reason [problem they have] is not [what they blame]. It is [real cause].</Quote>
          <StageDiagram stage="Reframe hook" position={2} exampleHook="The reason your ads do not convert is not your creative. It is your hook." />
        </Section>

        <Section kicker="Formula 3" title="The Category Shift Hook (Solution aware audience)">
          <P>They have tried solutions. Nothing worked well enough. Your hook should redefine what kind of solution they need, not just promote yours as better.</P>
          <Quote label="Template">[Existing solution category] solves [surface problem]. It does not solve [deeper problem].</Quote>
          <StageDiagram stage="Category shift hook" position={3} exampleHook="Most productivity tools help you do more. They do not help you stop doing the wrong things." />
        </Section>

        <Section kicker="Formula 4" title="The Objection Hook (Product aware audience)">
          <P>They know you. They are on the fence. Identify the specific objection and address it head on in the hook itself. Do not avoid the hesitation. Name it.</P>
          <Quote label="Template">Still [hesitation behavior]? Here is the one thing [product] does that [competitor] cannot.</Quote>
          <StageDiagram stage="Objection hook" position={4} exampleHook="Still using spreadsheets? Here is what changes when the tool builds the structure for you." />
        </Section>

        <Section kicker="Formula 5" title="The Urgency Hook (Most aware audience)">
          <P>They are ready. They just need the push. Make the offer, add real urgency, and cut everything else. This audience does not need to be warmed up again.</P>
          <Quote label="Template">[Specific offer] for [audience segment]. [Time or quantity limit]. No catch.</Quote>
          <StageDiagram stage="Urgency hook" position={5} exampleHook="40% off for everyone who visited the pricing page but did not sign up. Ends Friday." />
        </Section>

        <Section kicker="Side by side" title="Generic versus awareness-targeted">
          <ComparisonTable
            headers={['Version', 'Hook copy']}
            rows={[
              ['Generic hook', 'Try our AI tool and grow your business faster.'],
              ['Unaware version', 'You keep adjusting your ads. Your real problem is the first sentence.'],
              ['Problem aware version', 'Bad hooks cost you more than bad targeting. Here is the data.'],
              ['Solution aware version', 'Most AI copy tools write for the product. This one writes for the audience.'],
              ['Product aware version', 'Still comparing? The difference is awareness logic. Here is what that means.'],
              ['Most aware version', 'Your trial expires in 3 days. Lock in your rate before it resets.'],
            ]}
          />
          <P>Same product. Same offer. Six completely different doors into the conversion. The first one is what most AI tools default to. The other five are what HookMeDaddy generates by default.</P>
        </Section>

        <Section kicker="Workflow" title="How to use HookMeDaddy for this process">
          <P>Select your audience awareness stage, the platform you are running on, and a short description of your product or offer. HookMeDaddy generates hooks, captions, and CTAs for that specific combination.</P>
          <P>Run all five stages in one session. You will often find that your intuition about which stage your audience is at is wrong. Testing across all five is the fastest way to find out where they actually are.</P>
          <Callout label="Tactical tip">
            Generate all five stages, run them as separate ad sets with the same creative, and let the platform tell you where your audience actually sits. The winning stage is your launch angle. The other four go into your retargeting funnel.
          </Callout>
        </Section>

        <FaqBlock items={FAQS} />

        <RelatedPages links={[
          { href: '/schwartz-awareness-pyramid', title: 'The Schwartz Pyramid of Awareness', desc: 'The framework underneath the formulas. Five stages, five messages, five complete examples.' },
          { href: '/what-is-hookmedaddy', title: 'What is HookMeDaddy', desc: 'How the awareness engine works and why it produces stage-matched hooks by default.' },
        ]} />

        <Cta headline="Generate all five formulas in one session" sub="Skip the prompting work. HookMeDaddy generates the full Schwartz stack for your offer in under 60 seconds." />
      </PageBody>

      <LandingFooter />
    </div>
  )
}
