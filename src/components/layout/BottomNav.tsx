'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const BOTTOM_TABS = [
  { href: '/',         label: 'Home',     icon: '⌂' },
  { href: '/schedule', label: 'Schedule', icon: '📅' },
  { href: '/players',  label: 'Players',  icon: '👥' },
  { href: '/gallery',  label: 'Gallery',  icon: '📸' },
  { href: '/register', label: 'Register', icon: '✍' },
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <>
      <nav style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50,
        height: 'var(--bottom-nav-h)',
        background: 'rgba(10,10,10,0.97)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', alignItems: 'stretch',
      }} className="bottom-nav">
        {BOTTOM_TABS.map(tab => {
          const active = pathname === tab.href || (tab.href !== '/' && pathname.startsWith(tab.href))
          return (
            <Link
              key={tab.href}
              href={tab.href}
              style={{
                flex: 1, display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: '3px',
                textDecoration: 'none', minHeight: '44px',
                transition: 'opacity 0.15s',
                borderTop: active ? '2px solid var(--red)' : '2px solid transparent',
                background: active ? 'rgba(192,57,43,0.06)' : 'transparent',
              }}
            >
              <span style={{ fontSize: tab.href === '/register' ? '16px' : '18px' }}>{tab.icon}</span>
              <span style={{
                fontFamily: 'var(--font-body)', fontSize: '9px',
                fontWeight: active ? 700 : 500,
                letterSpacing: '0.06em', textTransform: 'uppercase',
                color: active ? 'var(--red)' : 'var(--white-muted)',
              }}>
                {tab.label}
              </span>
            </Link>
          )
        })}
      </nav>
      {/* Spacer so content isn't hidden behind bottom nav */}
      <div className="bottom-nav-spacer" style={{ height: 'var(--bottom-nav-h)' }} />
      <style>{`
        @media (min-width: 769px) {
          .bottom-nav { display: none !important; }
          .bottom-nav-spacer { display: none !important; }
        }
      `}</style>
    </>
  )
}
