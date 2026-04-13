import { auth } from '@clerk/nextjs/server'
import Anthropic from '@anthropic-ai/sdk'
import { supabaseAdmin } from '@/lib/supabase'
import { SYSTEM_PROMPT, buildUserMessageV2 } from '@/lib/prompt'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) return Response.json({ error: 'unauthorized' }, { status: 401 })

    const body = await req.json()
    const creditCost = body.contentType === 'video_script' ? 40 : body.awarenessLevel === 'all_5_stages' ? 80 : 20

    const { data: profile, error: profileError } = await supabaseAdmin
      .from('hookme_profiles')
      .select('credits, plan_tier')
      .eq('clerk_user_id', userId)
      .single()

    if (profileError || !profile) {
      return Response.json({ error: 'profile_not_found' }, { status: 404 })
    }

    if (profile.credits < creditCost) {
      return Response.json({ error: 'insufficient_credits' }, { status: 402 })
    }

    await supabaseAdmin
      .from('hookme_profiles')
      .update({ credits: profile.credits - creditCost })
      .eq('clerk_user_id', userId)

    const userMessage = buildUserMessageV2(body, profile.plan_tier)
    const maxTokens = body.awarenessLevel === 'all_5_stages' ? 10000 : 5000

    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

    const response = await client.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: maxTokens,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userMessage }],
    })

    const rawText = response.content[0].type === 'text' ? response.content[0].text : ''
    
    // Clean JSON — remove markdown fences and find the JSON object
    let cleaned = rawText
      .replace(/```json\s*/gi, '')
      .replace(/```\s*/gi, '')
      .trim()

    // If response contains text before the JSON, extract just the JSON
    const jsonStart = cleaned.indexOf('{')
    const jsonArrayStart = cleaned.indexOf('[')
    
    let jsonStr = cleaned
    if (jsonStart > 0 && (jsonArrayStart === -1 || jsonStart < jsonArrayStart)) {
      jsonStr = cleaned.slice(jsonStart)
    } else if (jsonArrayStart > 0 && (jsonStart === -1 || jsonArrayStart < jsonStart)) {
      jsonStr = cleaned.slice(jsonArrayStart)
    }

    // Find the last valid closing bracket
    const lastBrace = jsonStr.lastIndexOf('}')
    const lastBracket = jsonStr.lastIndexOf(']')
    const lastValid = Math.max(lastBrace, lastBracket)
    if (lastValid > 0) {
      jsonStr = jsonStr.slice(0, lastValid + 1)
    }

    const parsed = JSON.parse(jsonStr)

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
    console.error('GENERATE ERROR:', error.message)
    return Response.json({ success: false, error: 'generation_failed', detail: error.message }, { status: 500 })
  }
}
