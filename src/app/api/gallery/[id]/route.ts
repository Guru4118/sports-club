import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db/connect'
import { Gallery } from '@/lib/models'
import { requireAdmin } from '@/lib/auth'

type Ctx = { params: Promise<{ id: string }> }

export async function DELETE(req: NextRequest, { params }: Ctx) {
  const { id } = await params
  const auth = requireAdmin(req)
  if (auth instanceof NextResponse) return auth
  try {
    await connectDB()
    await Gallery.findByIdAndDelete(id)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to delete' }, { status: 500 })
  }
}
