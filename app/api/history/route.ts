import { auth } from '@clerk/nextjs/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET() {
  const { userId } = await auth()
  if (!userId) return Response.json({ error: 'unauthorized' }, { status: 401 })

  const { data } = await supabaseAdmin
    .from('hookme_generations')
    .select('id, created_at, product_name, platform, awareness_stage, content_type, credits_used, output')
    .eq('clerk_user_id', userId)
    .order('created_at', { ascending: false })
    .limit(50)

  return Response.json({ data: data || [] })
}
