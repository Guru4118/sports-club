import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db/connect'
import { Player } from '@/lib/models'
import { requireAdmin } from '@/lib/auth'

export async function GET(req: NextRequest) {
  try {
    await connectDB()
    const { searchParams } = new URL(req.url)
    const role   = searchParams.get('role')
    const active = searchParams.get('active')
    const query: Record<string, unknown> = {}
    if (role)   query.role   = role
    if (active !== null) query.active = active === 'true'
    const players = await Player.find(query).sort({ jerseyNumber: 1 }).lean()
    return NextResponse.json({ success: true, data: players })
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to fetch players' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const auth = requireAdmin(req)
  if (auth instanceof NextResponse) return auth
  try {
    await connectDB()
    const body = await req.json()
    const player = await Player.create(body)
    return NextResponse.json({ success: true, data: player }, { status: 201 })
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to create player' }, { status: 500 })
  }
}
