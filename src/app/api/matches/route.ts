import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db/connect'
import { Match } from '@/lib/models'
import { requireAdmin } from '@/lib/auth'

export async function GET(req: NextRequest) {
  try {
    await connectDB()
    const { searchParams } = new URL(req.url)
    const tournamentId = searchParams.get('tournamentId')
    const status       = searchParams.get('status')
    const query: Record<string, string> = {}
    if (tournamentId) query.tournamentId = tournamentId
    if (status)       query.status       = status
    const matches = await Match.find(query).sort({ matchDate: 1 }).lean()
    return NextResponse.json({ success: true, data: matches })
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to fetch matches' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const auth = requireAdmin(req)
  if (auth instanceof NextResponse) return auth
  try {
    await connectDB()
    const body = await req.json()
    const match = await Match.create(body)
    return NextResponse.json({ success: true, data: match }, { status: 201 })
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to create match' }, { status: 500 })
  }
}
