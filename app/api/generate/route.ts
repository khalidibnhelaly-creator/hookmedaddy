import { auth } from '@clerk/nextjs/server'
import Anthropic from '@anthropic-ai/sdk'
import { supabaseAdmin } from '@/lib/supabase'
import { SYSTEM_PROMPT, buildUserMessage } from '@/lib/prompt'
import { NextRequest } from 'next/server'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth()
    console.log('AUTH userId:', userId)
    if (!userId) return Response.json({ error: 'unauthorized' }, { status: 401 })

    const body = await req.json()
    console.log('BODY received:', JSON.stringify(body).slice(0, 100))

    const creditCost = body.contentType === 'video_script' ? 40 : body.awarenessLevel === 'all_5_stages' ? 80 : 20

    const { data: profile, error: profileError } = await supabaseAdmin
      .from('hookme_profiles')
      .select('credits, plan_tier')
      .eq('clerk_user_id', userId)
      .single()

    console.log('PROFILE:', profile, 'ERROR:', profileError)

    if (profileError || !profile) {
      return Response.json({ error: 'profile_not_found', detail: profileError?.message }, { status: 404 })
    }

    if (profile.credits < creditCost) {
      return Response.json({ error: 'insufficient_credits' }, { status: 402 })
    }

    const { error: deductError } = await supabaseAdmin
      .from('hookme_profiles')
      .update({ credits: profile.credits - creditCost })
      .eq('clerk_user_id', userId)

    if (deductError) {
      console.log('DEDUCT ERROR:', deductError)
      return Response.json({ error: 'credit_deduction_failed' }, { status: 500 })
    }

    const userMessage = buildUserMessage(body, profile.plan_tier)
    const maxTokens = body.awarenessLevel === 'all_5_stages' ? 6000 : 2048

    console.log('Calling Anthropic API...')
    const response = await client.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: maxTokens,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userMessage }],
    })

    const rawText = response.content[0].type === 'text' ? response.content[0].text : ''
    console.log('RAW response length:', rawText.length)

    const cleaned = rawText.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim()
    const parsed = JSON.parse(cleaned)

    await supabaseAdmin.from('hookme_generations').insert({
      clerk_user_id: userId,
      credits_used: creditCost,
      content_type: body.contentType,
      platform: body.platform,
      awareness_stage: body.awarenessLevel,
      product_name: body.productName,
      output: parsed,
    })

    return Response.json({
      success: true,
      data: parsed,
      credits_remaining: profile.credits - creditCost
    })

  } catch (e: unknown) {
    const error = e as Error
    console.error('GENERATE ERROR:', error.message, error.stack)
    return Response.json({ success: false, error: 'generation_failed', detail: error.message }, { status: 500 })
  }
}
