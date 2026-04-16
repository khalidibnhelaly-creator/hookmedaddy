import { auth } from '@clerk/nextjs/server'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return Response.json({ error: 'unauthorized' }, { status: 401 })

  const { priceId } = await req.json()
  if (!priceId) return Response.json({ error: 'missing_price_id' }, { status: 400 })

  return Response.json({ priceId, userId })
}
