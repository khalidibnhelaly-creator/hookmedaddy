import { auth } from '@clerk/nextjs/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET() {
  try {
    const { userId } = await auth()
    if (!userId) return Response.json({ error: 'unauthorized' }, { status: 401 })

    const { data: profile, error } = await supabaseAdmin
      .from('hookme_profiles')
      .select('credits, plan_tier')
      .eq('clerk_user_id', userId)
      .single()

    if (error || !profile) {
      return Response.json({ error: 'profile_not_found' }, { status: 404 })
    }

    return Response.json({
      credits: profile.credits,
      plan_tier: profile.plan_tier,
    })
  } catch (e: unknown) {
    const err = e as Error
    return Response.json({ error: err.message }, { status: 500 })
  }
}
