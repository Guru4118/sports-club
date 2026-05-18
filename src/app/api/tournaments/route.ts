import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db/connect'
import { Tournament } from '@/lib/models'
import { requireAdmin } from '@/lib/auth'

export async function GET(req: NextRequest) {
  try {
    await connectDB()
    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status')

    const query = status ? { status } : {}
    const tournaments = await Tournament.find(query).sort({ startDate: -1 }).lean()

    return NextResponse.json({ success: true, data: tournaments })
  } catch (err) {
    console.error('[GET /api/tournaments]', err)
    return NextResponse.json({ success: false, error: 'Failed to fetch tournaments' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const auth = requireAdmin(req)
  if (auth instanceof NextResponse) return auth

  try {
    await connectDB()
    const body = await req.json()

    // Auto-generate slug from name + edition
    if (!body.slug) {
      body.slug = `${body.name}-${body.edition}`
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
    }

    const tournament = await Tournament.create(body)
    return NextResponse.json({ success: true, data: tournament }, { status: 201 })
  } catch (err: any) {
    if (err.code === 11000) {
      return NextResponse.json({ success: false, error: 'Slug already exists' }, { status: 409 })
    }
    console.error('[POST /api/tournaments]', err)
    return NextResponse.json({ success: false, error: 'Failed to create tournament' }, { status: 500 })
  }
}
