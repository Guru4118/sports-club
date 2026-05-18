import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{
      background: 'var(--black-soft)',
      borderTop: '1px solid rgba(192,57,43,0.2)',
      paddingBottom: '80px', // extra for mobile bottom nav
    }}>
      {/* Red accent bar */}
      <div style={{ height: '3px', background: 'linear-gradient(90deg, var(--red) 0%, var(--gold) 50%, var(--red) 100%)' }} />

      <div className="container-xl" style={{ paddingTop: '56px', paddingBottom: '40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '48px' }}>

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--red), var(--red-dark))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '1px solid rgba(201,162,39,0.3)',
              }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: 'var(--gold)' }}>JO</span>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', color: 'var(--white)', letterSpacing: '0.04em' }}>JEEVA OLI</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: 'var(--gold)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>FRIENDS</div>
              </div>
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--white-muted)', lineHeight: 1.7, marginBottom: '8px' }}>
              Maniyambet&apos;s premier Kabaddi club.<br />
              Building champions. Building community.
            </p>
            <p style={{ fontFamily: 'var(--font-tamil)', fontSize: '13px', color: 'var(--white-muted)', lineHeight: 1.7 }}>
              மணியம்பேட்டின் சிறந்த கபடி குழு
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', color: 'var(--white)', letterSpacing: '0.06em', marginBottom: '16px' }}>QUICK LINKS</h4>
            {[
              ['/', 'Home'],
              ['/tournament', 'Tournaments'],
              ['/schedule', 'Match Schedule'],
              ['/players', 'Our Players'],
              ['/gallery', 'Gallery'],
              ['/register', 'Register Team'],
            ].map(([href, label]) => (
              <div key={href} style={{ marginBottom: '10px' }}>
                <Link href={href} style={{
                  fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--white-dim)',
                  textDecoration: 'none', transition: 'color 0.2s',
                  display: 'flex', alignItems: 'center', gap: '8px',
                }}>
                  <span style={{ color: 'var(--red)', fontSize: '10px' }}>▶</span>
                  {label}
                </Link>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', color: 'var(--white)', letterSpacing: '0.06em', marginBottom: '16px' }}>CONTACT</h4>
            {[
              { icon: '📍', text: 'Maniyambet, Dharmapuri District, Tamil Nadu' },
              { icon: '📞', text: '+91 98765 43210' },
              { icon: '✉️', text: 'jeevaoli.friends@gmail.com' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '12px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '14px', marginTop: '1px' }}>{item.icon}</span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--white-muted)', lineHeight: 1.5 }}>{item.text}</span>
              </div>
            ))}

            <div style={{ marginTop: '20px' }}>
              <h5 style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--white-muted)', marginBottom: '12px' }}>FOLLOW US</h5>
              <div style={{ display: 'flex', gap: '10px' }}>
                {['Facebook', 'Instagram', 'YouTube'].map(s => (
                  <a key={s} href="#" style={{
                    fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600,
                    color: 'var(--white)', background: 'var(--card-dark)',
                    padding: '8px 12px', borderRadius: '4px',
                    border: '1px solid rgba(255,255,255,0.08)',
                    textDecoration: 'none', letterSpacing: '0.04em',
                    transition: 'border-color 0.2s',
                  }}>
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          marginTop: '48px', paddingTop: '24px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', flexWrap: 'wrap', gap: '12px',
          justifyContent: 'space-between', alignItems: 'center',
        }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--white-muted)' }}>
            © {year} Jeeva Oli Friends, Maniyambet. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--white-muted)' }}>Built with</span>
            <span style={{ color: 'var(--red)', fontSize: '12px' }}>♥</span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--white-muted)' }}>for Kabaddi</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
