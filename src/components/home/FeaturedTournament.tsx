import Link from 'next/link'
import { MOCK_TOURNAMENTS } from '@/lib/mockData'

export default function FeaturedTournament() {
  const t = MOCK_TOURNAMENTS[0]
  if (!t) return null

  return (
    <section className="section-py" style={{ background: 'var(--black)', position: 'relative' }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: '600px', height: '400px',
        background: 'radial-gradient(ellipse, rgba(192,57,43,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container-xl" style={{ position: 'relative' }}>
        {/* Section header */}
        <div style={{ marginBottom: '40px' }}>
          <div className="section-eyebrow" style={{ marginBottom: '8px' }}>Next Tournament</div>
          <h2 className="section-title">Upcoming Event</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', alignItems: 'start' }}>

          {/* Main event card */}
          <div style={{
            background: 'var(--card-dark)',
            border: '1px solid rgba(192,57,43,0.3)',
            borderRadius: '12px',
            overflow: 'hidden',
            position: 'relative',
          }} className="card-hover">
            {/* Poster area */}
            <div style={{
              height: '220px', background: 'linear-gradient(135deg, var(--red-dark) 0%, var(--black-soft) 100%)',
              position: 'relative', overflow: 'hidden',
            }}>
              {/* Abstract kabaddi graphic */}
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{
                  fontFamily: 'var(--font-heading)', fontSize: '96px',
                  color: 'transparent', WebkitTextStroke: '1px rgba(201,162,39,0.15)',
                  letterSpacing: '0.04em',
                }}>KABADDI</div>
              </div>
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to bottom, transparent 40%, var(--card-dark) 100%)',
              }} />
              {/* Status badge */}
              <div style={{ position: 'absolute', top: '16px', left: '16px' }}>
                <span className="status-upcoming" style={{ padding: '5px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, fontFamily: 'var(--font-body)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Registrations Open
                </span>
              </div>
              {/* Edition badge */}
              <div style={{ position: 'absolute', top: '16px', right: '16px' }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--gold)', background: 'rgba(201,162,39,0.1)', border: '1px solid rgba(201,162,39,0.2)', padding: '4px 10px', borderRadius: '4px', textTransform: 'uppercase' }}>
                  {t.edition}
                </span>
              </div>
            </div>

            {/* Content */}
            <div style={{ padding: '24px' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '32px', letterSpacing: '0.04em', color: 'var(--white)', marginBottom: '16px', lineHeight: 1 }}>
                {t.name}
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                {[
                  { icon: '📅', label: 'Date', value: 'June 15–17, 2025' },
                  { icon: '📍', label: 'Venue', value: t.venue },
                  { icon: '👥', label: 'Slots', value: `${t.registeredTeams}/${t.maxTeams} teams` },
                  { icon: '🏆', label: 'Total Prize', value: t.totalPrize || '₹75,000' },
                ].map((item, i) => (
                  <div key={i} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '8px', padding: '10px 12px' }}>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--white-muted)', marginBottom: '4px' }}>
                      {item.icon} {item.label}
                    </div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, color: 'var(--white)' }}>{item.value}</div>
                  </div>
                ))}
              </div>

              {/* Progress bar */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--white-muted)' }}>Registration Progress</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, color: 'var(--gold)' }}>
                    {Math.round((t.registeredTeams / t.maxTeams) * 100)}%
                  </span>
                </div>
                <div style={{ height: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', borderRadius: '2px',
                    width: `${(t.registeredTeams / t.maxTeams) * 100}%`,
                    background: 'linear-gradient(90deg, var(--red), var(--gold))',
                  }} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <Link href={`/tournament/${t.slug}`} className="btn-primary" style={{ flex: 1, justifyContent: 'center', fontSize: '13px', padding: '12px' }}>
                  View Details
                </Link>
                <Link href="/register" style={{ flex: 1, fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', padding: '12px', borderRadius: '4px', background: 'rgba(201,162,39,0.1)', color: 'var(--gold)', border: '1px solid rgba(201,162,39,0.3)', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
                  Register →
                </Link>
              </div>
            </div>
          </div>

          {/* Prize pool card */}
          <div>
            <div style={{
              background: 'var(--card-dark)', border: '1px solid rgba(201,162,39,0.2)',
              borderRadius: '12px', padding: '24px', marginBottom: '16px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <span style={{ fontSize: '24px' }}>🏆</span>
                <div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', letterSpacing: '0.04em', color: 'var(--white)', lineHeight: 1 }}>PRIZE POOL</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--gold)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Total: {t.totalPrize}</div>
                </div>
              </div>

              {t.prizePool.map((prize, i) => (
                <div
                  key={i}
                  className={i === 0 ? 'prize-first' : i === 1 ? 'prize-second' : 'prize-third'}
                  style={{
                    borderRadius: '8px', padding: '14px 16px',
                    marginBottom: i < t.prizePool.length - 1 ? '8px' : 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    transform: i === 0 ? 'scale(1.02)' : 'none',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: i === 0 ? '22px' : '18px' }}>{prize.trophy}</span>
                    <div>
                      <div style={{
                        fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 700,
                        color: i === 0 ? 'var(--gold-light)' : i === 1 ? '#C8C8C8' : '#CD7F32',
                      }}>
                        {prize.label}
                      </div>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: 'var(--white-muted)', letterSpacing: '0.04em' }}>
                        Rank #{prize.rank}
                      </div>
                    </div>
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 600,
                    color: i === 0 ? 'var(--gold-light)' : i === 1 ? '#C8C8C8' : '#CD7F32',
                  }}>
                    {prize.amount}
                  </div>
                </div>
              ))}
            </div>

            {/* Rules teaser */}
            <div style={{
              background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '12px', padding: '20px',
            }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--white-muted)', marginBottom: '12px' }}>
                Key Rules
              </div>
              {t.rules.slice(0, 3).map((rule, i) => (
                <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ color: 'var(--red)', fontSize: '12px', flexShrink: 0, marginTop: '3px' }}>▶</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--white-dim)', lineHeight: 1.5 }}>{rule}</span>
                </div>
              ))}
              <Link href={`/tournament/${t.slug}`} style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, color: 'var(--red)', textDecoration: 'none', letterSpacing: '0.06em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '12px' }}>
                All Rules →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
