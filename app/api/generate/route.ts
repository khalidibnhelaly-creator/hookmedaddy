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

    const encoder = new TextEncoder()
    let fullText = ''

    const stream = new ReadableStream({
      async start(controller) {
        try {
          const anthropicStream = await client.messages.stream({
            model: 'claude-haiku-4-5',
            max_tokens: maxTokens,
            system: SYSTEM_PROMPT,
            messages: [{ role: 'user', content: userMessage }],
          })

          for await (const chunk of anthropicStream) {
            if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
              fullText += chunk.delta.text
              controller.enqueue(encoder.encode(chunk.delta.text))
            }
          }

          let cleaned = fullText
            .replace(/```json\s*/gi, '')
            .replace(/```\s*/gi, '')
            .trim()

          const jsonStart = cleaned.indexOf('{')
          const jsonArrayStart = cleaned.indexOf('[')
          let jsonStr = cleaned

          if (jsonStart > 0 && (jsonArrayStart === -1 || jsonStart < jsonArrayStart)) {
            jsonStr = cleaned.slice(jsonStart)
          } else if (jsonArrayStart > 0 && (jsonStart === -1 || jsonArrayStart < jsonStart)) {
            jsonStr = cleaned.slice(jsonArrayStart)
          }

          const lastBrace = jsonStr.lastIndexOf('}')
          const lastBracket = jsonStr.lastIndexOf(']')
          const lastValid = Math.max(lastBrace, lastBracket)
          if (lastValid > 0) jsonStr = jsonStr.slice(0, lastValid + 1)

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

          controller.enqueue(encoder.encode(`\n__DONE__${JSON.stringify({ success: true, data: parsed, credits_remaining: profile.credits - creditCost })}`))
          controller.close()

        } catch (err) {
          const e = err as Error
          controller.enqueue(encoder.encode(`\n__ERROR__${e.message}`))
          controller.close()
        }
      }
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
        'X-Accel-Buffering': 'no',
      },
    })

  } catch (e: unknown) {
    const error = e as Error
    console.error('GENERATE ERROR:', error.message)
    return Response.json({ success: false, error: 'generation_failed', detail: error.message }, { status: 500 })
  }
}
