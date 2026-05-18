'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const [form, setForm]     = useState({ username: '', password: '' })
  const [error, setError]   = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.success) {
        localStorage.setItem('admin_token', data.data.token)
        router.replace('/admin')
      } else {
        setError(data.error || 'Invalid credentials')
      }
    } catch {
      setError('Server error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--black)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px', position: 'relative', overflow: 'hidden',
    }}>
      {/* Background */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'repeating-linear-gradient(-45deg,transparent,transparent 20px,rgba(192,57,43,0.02) 20px,rgba(192,57,43,0.02) 40px)',
      }} />
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
        fontFamily: 'var(--font-heading)', fontSize: '300px',
        color: 'transparent', WebkitTextStroke: '1px rgba(192,57,43,0.04)',
        pointerEvents: 'none', userSelect: 'none', lineHeight: 1,
      }}>JOF</div>

      <div style={{
        position: 'relative', width: '100%', maxWidth: '400px',
        background: 'var(--card-dark)', border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '16px', overflow: 'hidden',
      }}>
        {/* Top accent */}
        <div style={{ height: '3px', background: 'linear-gradient(90deg, var(--red), var(--gold))' }} />

        <div style={{ padding: '40px 36px' }}>
          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <div style={{
              width: '56px', height: '56px', borderRadius: '12px',
              background: 'linear-gradient(135deg, var(--red), var(--red-dark))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 14px', border: '1px solid rgba(201,162,39,0.2)',
              boxShadow: '0 8px 24px rgba(192,57,43,0.3)',
            }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: 'var(--gold)', fontWeight: 700 }}>JO</span>
            </div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', letterSpacing: '0.04em', color: 'var(--white)' }}>
              ADMIN PANEL
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--white-muted)', marginTop: '4px' }}>
              Jeeva Oli Friends · Maniyambet
            </div>
          </div>

          {error && (
            <div style={{
              background: 'rgba(192,57,43,0.1)', border: '1px solid rgba(192,57,43,0.35)',
              borderRadius: '6px', padding: '11px 14px', marginBottom: '20px',
              fontFamily: 'var(--font-body)', fontSize: '13px', color: '#E8735A',
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '16px' }}>
              <label className="form-label">Username</label>
              <input
                type="text" autoComplete="username"
                value={form.username}
                onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
                className="form-input"
                placeholder="admin"
                required
              />
            </div>
            <div style={{ marginBottom: '24px' }}>
              <label className="form-label">Password</label>
              <input
                type="password" autoComplete="current-password"
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                className="form-input"
                placeholder="••••••••"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', opacity: loading ? 0.7 : 1 }}
            >
              {loading ? 'Signing in…' : 'Sign In →'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
