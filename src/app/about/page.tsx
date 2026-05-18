import Link from 'next/link'
import { CLUB_STATS, ACHIEVEMENTS } from '@/lib/mockData'

export default function AboutPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--black)' }}>
      {/* Header */}
      <div style={{
        background: 'var(--black-soft)', borderBottom: '1px solid rgba(192,57,43,0.2)',
        padding: '56px 0 48px', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-heading)', fontSize: '180px',
          color: 'transparent', WebkitTextStroke: '1px rgba(192,57,43,0.05)',
          pointerEvents: 'none', userSelect: 'none', lineHeight: 1,
        }}>ABOUT</div>
        <div className="container-xl" style={{ position: 'relative' }}>
          <div className="section-eyebrow" style={{ marginBottom: '8px' }}>Our Story</div>
          <h1 className="section-title">About JOF</h1>
        </div>
      </div>

      <div className="container-xl section-py">
        {/* Story */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '56px', alignItems: 'center', marginBottom: '72px' }}>
          <div>
            <div className="section-eyebrow" style={{ marginBottom: '12px' }}>Founded 2017</div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '48px', letterSpacing: '0.04em', color: 'var(--white)', lineHeight: 1, marginBottom: '24px' }}>
              THE STORY OF<br />
              <span style={{ background: 'linear-gradient(135deg,var(--gold-light),var(--gold))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                JEEVA OLI FRIENDS
              </span>
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--white-dim)', lineHeight: 1.8, marginBottom: '16px' }}>
              Jeeva Oli Friends was born in 2017 from a simple idea: give the youth of Maniyambet a platform to compete, to grow, and to belong. What started as a group of friends playing on a dusty ground has become the most respected Kabaddi club in the region.
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--white-dim)', lineHeight: 1.8, marginBottom: '16px' }}>
              The name <em style={{ color: 'var(--gold)' }}>Jeeva Oli</em> — meaning &ldquo;Light of Life&rdquo; in Tamil — reflects our belief that sports illuminates lives. Every player, every match, every tournament is a chapter in that story of light.
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--white-muted)', lineHeight: 1.8 }}>
              Today, we host annual Kabaddi tournaments that attract teams from across Tamil Nadu, maintain an active squad of championship-calibre players, and continue to be the heartbeat of Maniyambet&apos;s sporting community.
            </p>
          </div>

          {/* Stats block */}
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {CLUB_STATS.map((stat, i) => (
                <div key={i} style={{
                  background: i % 2 === 0 ? 'var(--card-dark)' : 'rgba(192,57,43,0.08)',
                  border: `1px solid ${i % 2 === 0 ? 'rgba(255,255,255,0.06)' : 'rgba(192,57,43,0.2)'}`,
                  borderRadius: '12px', padding: '24px', textAlign: 'center',
                }}>
                  <div style={{
                    fontFamily: 'var(--font-display)', fontSize: '48px', fontWeight: 600,
                    color: i % 2 === 0 ? 'var(--gold-light)' : 'var(--red)',
                    lineHeight: 1, marginBottom: '8px',
                    textShadow: `0 0 20px ${i % 2 === 0 ? 'rgba(232,190,69,0.3)' : 'rgba(192,57,43,0.4)'}`,
                  }}>
                    {stat.value}
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--white-muted)' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mission */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(192,57,43,0.08), rgba(201,162,39,0.04))',
          border: '1px solid rgba(192,57,43,0.2)',
          borderRadius: '16px', padding: '40px 48px', marginBottom: '72px',
          textAlign: 'center', position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-heading)', fontSize: '200px', color: 'transparent',
            WebkitTextStroke: '1px rgba(192,57,43,0.04)', pointerEvents: 'none', lineHeight: 1,
          }}>MISSION</div>
          <div style={{ position: 'relative' }}>
            <div className="section-eyebrow" style={{ marginBottom: '12px' }}>What Drives Us</div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '36px', letterSpacing: '0.04em', color: 'var(--white)', marginBottom: '24px' }}>
              OUR MISSION
            </h2>
            <p style={{
              fontFamily: 'var(--font-display)', fontSize: 'clamp(18px, 3vw, 28px)', fontWeight: 400,
              color: 'var(--white-dim)', lineHeight: 1.5, maxWidth: '700px', margin: '0 auto',
              letterSpacing: '0.02em',
            }}>
              &ldquo;To nurture athletic excellence in Maniyambet, celebrate the spirit of Kabaddi, and build a community where every player finds their light.&rdquo;
            </p>
          </div>
        </div>

        {/* Achievements */}
        <div style={{ marginBottom: '72px' }}>
          <div className="section-eyebrow" style={{ marginBottom: '8px' }}>Track Record</div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '36px', letterSpacing: '0.04em', color: 'var(--white)', marginBottom: '32px' }}>
            HONOURS & ACHIEVEMENTS
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
            {ACHIEVEMENTS.map((a, i) => (
              <div key={i} style={{
                background: 'var(--card-dark)', border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '10px', padding: '16px 20px',
                display: 'flex', gap: '16px', alignItems: 'center',
              }} className="card-hover">
                <div style={{
                  flexShrink: 0, width: '48px', height: '48px', borderRadius: '8px',
                  background: 'rgba(192,57,43,0.1)', border: '1px solid rgba(192,57,43,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 700, color: 'var(--red)',
                }}>
                  {a.year}
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '17px', fontWeight: 600, color: 'var(--gold-light)', marginBottom: '3px' }}>
                    {a.title}
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--white-muted)' }}>
                    {a.event}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact / Location */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div style={{ background: 'var(--card-dark)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '28px' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', letterSpacing: '0.04em', color: 'var(--white)', marginBottom: '20px' }}>
              FIND US
            </h3>
            {[
              { icon: '📍', label: 'Address', value: 'Maniyambet, Dharmapuri District, Tamil Nadu' },
              { icon: '📞', label: 'Phone', value: '+91 98765 43210' },
              { icon: '✉️', label: 'Email', value: 'jeevaoli.friends@gmail.com' },
              { icon: '🕐', label: 'Training Hours', value: 'Mon–Sat · 6:00 AM – 8:00 AM' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: '16px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '16px', flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--white-muted)', marginBottom: '2px' }}>{item.label}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--white-dim)' }}>{item.value}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Link href="/register" className="btn-primary" style={{ justifyContent: 'center', padding: '18px', fontSize: '15px' }}>
              Register Your Team →
            </Link>
            <Link href="/sponsors" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '18px', borderRadius: '4px', border: '1px solid rgba(201,162,39,0.3)', background: 'rgba(201,162,39,0.06)', color: 'var(--gold)', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '15px', letterSpacing: '0.05em', textTransform: 'uppercase', textDecoration: 'none', transition: 'all 0.2s' }}>
              Become a Sponsor →
            </Link>
            <div style={{ background: 'var(--card-dark)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '20px', flex: 1 }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--white-muted)', marginBottom: '10px' }}>Follow JOF</div>
              {['Facebook', 'Instagram', 'YouTube'].map(s => (
                <div key={s} style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--red)', marginBottom: '8px', cursor: 'pointer' }}>
                  → {s}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-story-grid { grid-template-columns: 1fr !important; }
          .about-contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
