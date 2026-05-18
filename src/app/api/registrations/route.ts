import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db/connect'
import { Registration, Tournament } from '@/lib/models'
import { requireAdmin } from '@/lib/auth'
import { sendRegistrationConfirmation, sendAdminRegistrationAlert } from '@/lib/email'

export async function GET(req: NextRequest) {
  const auth = requireAdmin(req)
  if (auth instanceof NextResponse) return auth
  try {
    await connectDB()
    const { searchParams } = new URL(req.url)
    const tournamentId = searchParams.get('tournamentId')
    const status       = searchParams.get('status')
    const query: Record<string, string> = {}
    if (tournamentId) query.tournamentId = tournamentId
    if (status)       query.status       = status

    const registrations = await Registration.find(query).sort({ createdAt: -1 }).lean()
    return NextResponse.json({ success: true, data: registrations, total: registrations.length })
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to fetch registrations' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const body = await req.json()

    // Validate required fields
    const required = ['teamName', 'captainName', 'contactPhone', 'contactEmail', 'location', 'tournamentId']
    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json({ success: false, error: `${field} is required` }, { status: 400 })
      }
    }

    // Get tournament name for emails
    const tournament = await Tournament.findById(body.tournamentId)
    if (!tournament) {
      return NextResponse.json({ success: false, error: 'Tournament not found' }, { status: 404 })
    }
    if (!tournament.registrationOpen) {
      return NextResponse.json({ success: false, error: 'Registration is closed for this tournament' }, { status: 400 })
    }

    // Create registration
    const registration = await Registration.create({
      ...body,
      tournamentName: `${tournament.name} — ${tournament.edition}`,
    })

    // Increment registered teams count
    await Tournament.findByIdAndUpdate(body.tournamentId, { $inc: { registeredTeams: 1 } })

    // Send emails (non-blocking — don't fail if email fails)
    const formData = {
      teamName: body.teamName, captainName: body.captainName,
      contactPhone: body.contactPhone, contactEmail: body.contactEmail,
      playerCount: body.playerCount || 12, location: body.location,
      district: body.district, experience: body.experience,
      message: body.message, tournamentId: body.tournamentId,
    }
    const tournamentLabel = `${tournament.name} — ${tournament.edition}`
    Promise.all([
      sendRegistrationConfirmation(formData, tournamentLabel).catch(console.error),
      sendAdminRegistrationAlert(formData, tournamentLabel).catch(console.error),
    ])

    return NextResponse.json({ success: true, data: { _id: registration._id } }, { status: 201 })
  } catch (err) {
    console.error('[POST /api/registrations]', err)
    return NextResponse.json({ success: false, error: 'Failed to submit registration' }, { status: 500 })
  }
}
