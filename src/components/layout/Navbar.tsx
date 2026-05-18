'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [
  { href: '/',           label: 'Home' },
  { href: '/tournament', label: 'Tournaments' },
  { href: '/schedule',   label: 'Schedule' },
  { href: '/players',    label: 'Players' },
  { href: '/gallery',    label: 'Gallery' },
  { href: '/sponsors',   label: 'Sponsors' },
  { href: '/about',      label: 'About' },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  return (
    <>
      {/* Ticker spacer */}
      <div style={{ height: '32px' }} />

      <header
        style={{
          position: 'fixed',
          top: '32px',
          left: 0,
          right: 0,
          zIndex: 50,
          height: 'var(--nav-h)',
          transition: 'all 0.3s ease',
          background: scrolled
            ? 'rgba(10,10,10,0.96)'
            : 'rgba(10,10,10,0.6)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: scrolled
            ? '1px solid rgba(192,57,43,0.3)'
            : '1px solid rgba(255,255,255,0.04)',
        }}
      >
        <div className="container-xl" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
            {/* Emblem */}
            <div style={{
              width: '40px', height: '40px', borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--red) 0%, var(--red-dark) 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '1px solid rgba(201,162,39,0.3)',
              boxShadow: '0 0 12px rgba(192,57,43,0.4)',
              flexShrink: 0,
            }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, color: 'var(--gold)' }}>JO</span>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', letterSpacing: '0.04em', color: 'var(--white)', lineHeight: 1 }}>
                JEEVA OLI
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600, lineHeight: 1, marginTop: '1px' }}>
                FRIENDS · MANIYAMBET
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav style={{ display: 'flex', gap: '4px', alignItems: 'center' }} className="hidden-mobile">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  fontWeight: 500,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  color: pathname === link.href ? 'var(--red)' : 'var(--white-dim)',
                  textDecoration: 'none',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  transition: 'color 0.2s',
                  borderBottom: pathname === link.href ? '2px solid var(--red)' : '2px solid transparent',
                }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/register"
              className="btn-primary"
              style={{ marginLeft: '8px', padding: '10px 20px', fontSize: '12px', minHeight: '40px' }}
            >
              Register Team
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              color: 'var(--white)',
              flexDirection: 'column',
              gap: '5px',
            }}
            className="show-mobile"
          >
            {[0,1,2].map(i => (
              <span key={i} style={{
                display: 'block', width: '22px', height: '2px',
                background: menuOpen && i === 1 ? 'transparent' : 'var(--white)',
                transition: 'all 0.3s',
                transform: menuOpen
                  ? i === 0 ? 'rotate(45deg) translateY(7px)'
                  : i === 2 ? 'rotate(-45deg) translateY(-7px)'
                  : 'none'
                  : 'none',
              }} />
            ))}
          </button>
        </div>
      </header>

      {/* Mobile dropdown menu */}
      <div style={{
        position: 'fixed', top: 'calc(32px + var(--nav-h))', left: 0, right: 0, zIndex: 49,
        background: 'rgba(10,10,10,0.98)', backdropFilter: 'blur(20px)',
        transform: menuOpen ? 'translateY(0)' : 'translateY(-100%)',
        opacity: menuOpen ? 1 : 0, transition: 'all 0.3s ease',
        padding: '16px', borderBottom: '1px solid rgba(192,57,43,0.2)',
        pointerEvents: menuOpen ? 'auto' : 'none',
      }}>
        {NAV_LINKS.map(link => (
          <Link key={link.href} href={link.href} style={{
            display: 'block', padding: '14px 16px',
            fontFamily: 'var(--font-body)', fontSize: '16px', fontWeight: 500,
            color: pathname === link.href ? 'var(--red)' : 'var(--white)',
            textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.05)',
            letterSpacing: '0.04em', textTransform: 'uppercase',
          }}>
            {link.label}
          </Link>
        ))}
        <Link href="/register" className="btn-primary" style={{ display: 'flex', marginTop: '16px' }}>
          Register Your Team →
        </Link>
      </div>

      <style>{`
        @media (min-width: 769px) { .show-mobile { display: none !important; } }
        @media (max-width: 768px)  { .hidden-mobile { display: none !important; } .show-mobile { display: flex !important; } }
      `}</style>
    </>
  )
}
