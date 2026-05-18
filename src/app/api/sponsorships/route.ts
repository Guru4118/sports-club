import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db/connect'
import { Sponsorship } from '@/lib/models'
import { requireAdmin } from '@/lib/auth'
import { sendSponsorshipAlert } from '@/lib/email'

export async function GET(req: NextRequest) {
  const auth = requireAdmin(req)
  if (auth instanceof NextResponse) return auth
  try {
    await connectDB()
    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status')
    const query = status ? { status } : {}
    const sponsorships = await Sponsorship.find(query).sort({ createdAt: -1 }).lean()
    return NextResponse.json({ success: true, data: sponsorships, total: sponsorships.length })
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to fetch sponsorships' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const body = await req.json()
    const required = ['businessName', 'contactName', 'phone', 'email']
    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json({ success: false, error: `${field} is required` }, { status: 400 })
      }
    }
    const sponsorship = await Sponsorship.create(body)
    // Fire-and-forget admin alert
    sendSponsorshipAlert(body).catch(console.error)
    return NextResponse.json({ success: true, data: { _id: sponsorship._id } }, { status: 201 })
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to submit sponsorship' }, { status: 500 })
  }
}
