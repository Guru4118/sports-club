import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { connectDB } from '@/lib/db/connect'
import { Admin } from '@/lib/models'
import { signToken } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const { username, password } = await req.json()

    if (!username || !password) {
      return NextResponse.json({ success: false, error: 'Username and password required' }, { status: 400 })
    }

    // Find admin
    const admin = await Admin.findOne({ username: username.toLowerCase() })
    if (!admin) {
      // Timing-safe: still compare to prevent user enumeration
      await bcrypt.compare(password, '$2a$10$invalidhashpadding000000000000000000000000000000000000000')
      return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 })
    }

    // Verify password
    const valid = await bcrypt.compare(password, admin.password)
    if (!valid) {
      return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 })
    }

    // Update last login
    admin.lastLogin = new Date()
    await admin.save()

    // Sign JWT
    const token = signToken({
      adminId:  admin._id.toString(),
      username: admin.username,
      role:     admin.role,
    })

    // Set HTTP-only cookie + return token in body
    const response = NextResponse.json({
      success: true,
      data: { token, username: admin.username, role: admin.role },
    })

    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure:   process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge:   60 * 60 * 24 * 7, // 7 days
      path:     '/',
    })

    return response
  } catch (err) {
    console.error('[POST /api/auth/login]', err)
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  // Logout — clear cookie
  const response = NextResponse.json({ success: true })
  response.cookies.set('admin_token', '', { maxAge: 0, path: '/' })
  return response
}
