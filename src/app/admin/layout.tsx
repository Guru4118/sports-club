'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const NAV_ITEMS = [
  { href: '/admin',               icon: '📊', label: 'Dashboard' },
  { href: '/admin/tournaments',   icon: '🏆', label: 'Tournaments' },
  { href: '/admin/matches',       icon: '📅', label: 'Matches' },
  { href: '/admin/players',       icon: '👥', label: 'Players' },
  { href: '/admin/registrations', icon: '📋', label: 'Registrations' },
  { href: '/admin/sponsorships',  icon: '🤝', label: 'Sponsorships' },
  { href: '/admin/gallery',       icon: '📸', label: 'Gallery' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed]         = useState<boolean | null>(null)
  const [sidebarOpen, setSidebar]   = useState(false)
  const pathname = usePathname()
  const router   = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (!token && pathname !== '/admin/login') {
      router.replace('/admin/login')
    } else {
      setAuthed(true)
    }
  }, [pathname, router])

  const handleLogout = async () => {
    await fetch('/api/auth/login', { method: 'DELETE' })
    localStorage.removeItem('admin_token')
    router.replace('/admin/login')
  }

  // Show login page without sidebar
  if (pathname === '/admin/login') return <>{children}</>
  if (authed === null) return (
    <div style={{ minHeight: '100vh', background: 'var(--black)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ fontFamily: 'var(--font-body)', color: 'var(--white-muted)' }}>Loading…</div>
    </div>
  )

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0D0D0F' }}>
      {/* ── Sidebar ── */}
      <aside style={{
        width: '240px', flexShrink: 0,
        background: '#111113',
        borderRight: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', flexDirection: 'column',
        position: 'fixed', top: 0, bottom: 0, left: 0, zIndex: 40,
        transform: sidebarOpen ? 'translateX(0)' : undefined,
        transition: 'transform 0.3s',
      }} className="admin-sidebar">

        {/* Logo */}
        <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '8px',
              background: 'linear-gradient(135deg, var(--red), var(--red-dark))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '16px', color: 'var(--gold)', fontWeight: 700 }}>JO</span>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', letterSpacing: '0.04em', color: 'var(--white)', lineHeight: 1 }}>JOF Admin</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: 'var(--white-muted)', marginTop: '1px' }}>Control Panel</div>
            </div>
          </div>
        </div>

        {/* Nav links */}
        <nav style={{ flex: 1, padding: '12px 10px', overflowY: 'auto' }}>
          {NAV_ITEMS.map(item => {
            const active = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '10px 12px', borderRadius: '6px',
                  marginBottom: '2px', textDecoration: 'none',
                  background: active ? 'rgba(192,57,43,0.12)' : 'transparent',
                  borderLeft: active ? '2px solid var(--red)' : '2px solid transparent',
                  transition: 'all 0.15s',
                }}
              >
                <span style={{ fontSize: '16px', flexShrink: 0 }}>{item.icon}</span>
                <span style={{
                  fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: active ? 600 : 400,
                  color: active ? 'var(--white)' : 'var(--white-muted)',
                  letterSpacing: '0.02em',
                }}>
                  {item.label}
                </span>
              </Link>
            )
          })}
        </nav>

        {/* Footer / logout */}
        <div style={{ padding: '16px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <Link href="/" target="_blank" style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            padding: '8px 12px', borderRadius: '6px', marginBottom: '4px',
            textDecoration: 'none', color: 'var(--white-muted)',
            fontFamily: 'var(--font-body)', fontSize: '12px',
          }}>
            <span>🌐</span> View Website
          </Link>
          <button
            onClick={handleLogout}
            style={{
              display: 'flex', alignItems: 'center', gap: '10px', width: '100%',
              padding: '8px 12px', borderRadius: '6px',
              background: 'none', border: 'none', cursor: 'pointer',
              color: '#E8735A', fontFamily: 'var(--font-body)', fontSize: '12px',
              textAlign: 'left',
            }}
          >
            <span>🚪</span> Logout
          </button>
        </div>
      </aside>

      {/* ── Main content ── */}
      <div style={{ marginLeft: '240px', flex: 1, display: 'flex', flexDirection: 'column' }} className="admin-main">
        {/* Top bar */}
        <div style={{
          height: '56px', background: '#111113',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', alignItems: 'center',
          padding: '0 24px', justifyContent: 'space-between',
          position: 'sticky', top: 0, zIndex: 30,
        }}>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--white-muted)' }}>
            {pathname.split('/').filter(Boolean).map((seg, i, arr) => (
              <span key={i}>
                <span style={{ color: i === arr.length - 1 ? 'var(--white)' : 'var(--white-muted)', textTransform: 'capitalize' }}>{seg}</span>
                {i < arr.length - 1 && <span style={{ margin: '0 6px', color: 'rgba(255,255,255,0.2)' }}>/</span>}
              </span>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '8px', height: '8px', borderRadius: '50%',
              background: '#3DB86D', boxShadow: '0 0 6px #3DB86D',
            }} />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--white-muted)' }}>Admin</span>
          </div>
        </div>

        {/* Page content */}
        <main style={{ flex: 1, padding: '28px 28px 48px' }}>
          {children}
        </main>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .admin-sidebar { transform: translateX(-100%); }
          .admin-main    { margin-left: 0 !important; }
        }
      `}</style>
    </div>
  )
}
