import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db/connect'
import { Gallery } from '@/lib/models'
import { requireAdmin } from '@/lib/auth'

export async function GET(req: NextRequest) {
  try {
    await connectDB()
    const { searchParams } = new URL(req.url)
    const category     = searchParams.get('category')
    const tournamentId = searchParams.get('tournamentId')
    const limit        = parseInt(searchParams.get('limit') || '50')
    const page         = parseInt(searchParams.get('page')  || '1')

    const query: Record<string, string> = {}
    if (category)     query.category     = category
    if (tournamentId) query.tournamentId = tournamentId

    const [images, total] = await Promise.all([
      Gallery.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Gallery.countDocuments(query),
    ])

    return NextResponse.json({ success: true, data: images, total, page, limit })
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to fetch gallery' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const auth = requireAdmin(req)
  if (auth instanceof NextResponse) return auth
  try {
    await connectDB()
    const body = await req.json()
    if (!body.imageUrl) {
      return NextResponse.json({ success: false, error: 'imageUrl is required' }, { status: 400 })
    }
    const image = await Gallery.create(body)
    return NextResponse.json({ success: true, data: image }, { status: 201 })
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to add image' }, { status: 500 })
  }
}
