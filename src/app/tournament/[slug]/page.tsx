import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MOCK_TOURNAMENTS, MOCK_MATCHES } from '@/lib/mockData'
import type { Metadata } from 'next'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const t = MOCK_TOURNAMENTS.find(t => t.slug === slug)
  if (!t) return { title: 'Tournament Not Found' }
  return { title: `${t.name} — ${t.edition}` }
}

export default async function TournamentDetailPage({ params }: Props) {
  const { slug } = await params
  const t = MOCK_TOURNAMENTS.find(t => t.slug === slug)
  if (!t) notFound()

  const matches = MOCK_MATCHES.filter(m => m.tournamentId === t._id)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--black)' }}>
      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, var(--black-soft) 0%, rgba(139,26,20,0.3) 100%)',
        borderBottom: '1px solid rgba(192,57,43,0.2)',
        padding: '56px 0 48px', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(-45deg,transparent,transparent 20px,rgba(192,57,43,0.03) 20px,rgba(192,57,43,0.03) 40px)' }} />
        <div style={{ position: 'absolute', top: '50%', right: '-5%', transform: 'translateY(-50%)', fontFamily: 'var(--font-heading)', fontSize: '220px', color: 'transparent', WebkitTextStroke: '1px rgba(192,57,43,0.07)', lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>JOF</div>

        <div className="container-xl" style={{ position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <Link href="/tournament" style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--white-muted)', textDecoration: 'none' }}>Tournaments</Link>
            <span style={{ color: 'var(--red)', fontSize: '10px' }}>▶</span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--white-dim)' }}>{t.name}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)' }}>{t.edition}</span>
            <span className={`status-${t.status}`} style={{ padding: '4px 14px', borderRadius: '20px', fontSize: '10px', fontWeight: 700, fontFamily: 'var(--font-body)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              {t.status === 'upcoming' ? '🔴 Registrations Open' : t.status === 'ongoing' ? '🟡 Live' : '✅ Completed'}
            </span>
          </div>

          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(40px, 8vw, 80px)', letterSpacing: '0.02em', color: 'var(--white)', lineHeight: 0.92, marginBottom: '20px' }}>
            {t.name}
          </h1>

          {t.description && (
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'var(--white-muted)', maxWidth: '540px', lineHeight: 1.6, marginBottom: '28px' }}>{t.description}</p>
          )}

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', marginBottom: '32px' }}>
            {[
              { icon: '📅', label: 'Dates', value: `${new Date(t.startDate).toLocaleDateString('en-IN',{day:'numeric',month:'long'})} – ${new Date(t.endDate).toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'})}` },
              { icon: '📍', label: 'Venue',  value: `${t.venue}, ${t.location}` },
              { icon: '👥', label: 'Teams',  value: `${t.registeredTeams} / ${t.maxTeams} registered` },
              { icon: '🏆', label: 'Prize',  value: t.totalPrize || '₹75,000' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '16px', flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--white-muted)', marginBottom: '2px' }}>{item.label}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600, color: 'var(--white)' }}>{item.value}</div>
                </div>
              </div>
            ))}
          </div>

          {t.registrationOpen && (
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/register" className="btn-primary" style={{ fontSize: '14px' }}>Register Your Team →</Link>
              <a href="#schedule" className="btn-primary" style={{ background: 'transparent', borderColor: 'rgba(255,255,255,0.2)', color: 'var(--white)', fontSize: '14px' }}>View Schedule</a>
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="container-xl section-py">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '32px', alignItems: 'start' }}>
          <div>
            {/* Prize Pool */}
            <div style={{ marginBottom: '48px' }}>
              <div className="section-eyebrow" style={{ marginBottom: '8px' }}>What You Win</div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '32px', letterSpacing: '0.04em', color: 'var(--white)', marginBottom: '20px', lineHeight: 1 }}>PRIZE POOL</h2>
              <div style={{ display: 'grid', gap: '10px' }}>
                {t.prizePool.map((prize, i) => (
                  <div key={i} className={i===0?'prize-first':i===1?'prize-second':'prize-third'} style={{ borderRadius: '10px', padding: '18px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', transform: i===0?'scale(1.02)':'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <span style={{ fontSize: i===0?'36px':'24px', filter: i===0?'drop-shadow(0 0 8px rgba(201,162,39,0.5))':'none' }}>{prize.trophy}</span>
                      <div>
                        <div style={{ fontFamily: 'var(--font-heading)', fontSize: i===0?'24px':'20px', letterSpacing: '0.04em', color: i===0?'var(--gold-light)':i===1?'#C8C8C8':'#CD7F32', lineHeight: 1 }}>{prize.label}</div>
                        <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--white-muted)', marginTop: '3px' }}>Rank #{prize.rank}</div>
                      </div>
                    </div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: i===0?'32px':'24px', fontWeight: 600, color: i===0?'var(--gold-light)':i===1?'#C8C8C8':'#CD7F32' }}>{prize.amount}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Rules */}
            <div style={{ marginBottom: '48px' }}>
              <div className="section-eyebrow" style={{ marginBottom: '8px' }}>Guidelines</div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', letterSpacing: '0.04em', color: 'var(--white)', marginBottom: '20px', lineHeight: 1 }}>RULES & REGULATIONS</h2>
              <div style={{ background: 'var(--card-dark)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '24px' }}>
                {t.rules.map((rule, i) => (
                  <div key={i} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', paddingBottom: i<t.rules.length-1?'14px':0, marginBottom: i<t.rules.length-1?'14px':0, borderBottom: i<t.rules.length-1?'1px solid rgba(255,255,255,0.04)':'none' }}>
                    <div style={{ flexShrink: 0, width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(192,57,43,0.15)', border: '1px solid rgba(192,57,43,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, color: 'var(--red)' }}>{i+1}</div>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--white-dim)', lineHeight: 1.6 }}>{rule}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Schedule */}
            {matches.length > 0 && (
              <div id="schedule">
                <div className="section-eyebrow" style={{ marginBottom: '8px' }}>Fixtures & Results</div>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', letterSpacing: '0.04em', color: 'var(--white)', marginBottom: '20px', lineHeight: 1 }}>MATCH SCHEDULE</h2>
                <div style={{ display: 'grid', gap: '10px' }}>
                  {matches.map(m => (
                    <div key={m._id} style={{ background: 'var(--card-dark)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                      <div style={{ minWidth: '80px' }}>
                        <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--red)', marginBottom: '2px' }}>{m.round}</div>
                        <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--white-muted)' }}>{m.matchTime}</div>
                      </div>
                      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center' }}>
                        <div style={{ textAlign: 'right', flex: 1 }}>
                          <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 600, color: m.winner===m.teamA?'var(--gold-light)':'var(--white)', lineHeight: 1.2 }}>{m.teamA}</div>
                          {m.scoreA !== undefined && <div style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', color: m.winner===m.teamA?'var(--white)':'var(--white-muted)', lineHeight: 1 }}>{m.scoreA}</div>}
                        </div>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: '14px', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em' }}>VS</div>
                        <div style={{ textAlign: 'left', flex: 1 }}>
                          <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 600, color: m.winner===m.teamB?'var(--gold-light)':'var(--white)', lineHeight: 1.2 }}>{m.teamB}</div>
                          {m.scoreB !== undefined && <div style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', color: m.winner===m.teamB?'var(--white)':'var(--white-muted)', lineHeight: 1 }}>{m.scoreB}</div>}
                        </div>
                      </div>
                      <span className={`status-${m.status}`} style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '10px', fontWeight: 700, fontFamily: 'var(--font-body)', letterSpacing: '0.06em', textTransform: 'uppercase', flexShrink: 0 }}>
                        {m.status==='completed'?'FT':m.status==='live'?'🔴 LIVE':'Upcoming'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div style={{ position: 'sticky', top: '100px' }}>
            {t.registrationOpen && (
              <div style={{ background: 'var(--card-dark)', border: '1px solid rgba(192,57,43,0.3)', borderRadius: '12px', padding: '24px', marginBottom: '16px' }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', letterSpacing: '0.04em', color: 'var(--white)', marginBottom: '4px' }}>REGISTER YOUR TEAM</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--white-muted)', marginBottom: '16px' }}>{t.maxTeams - t.registeredTeams} slots remaining</div>
                <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden', marginBottom: '16px' }}>
                  <div style={{ height: '100%', borderRadius: '3px', width: `${(t.registeredTeams/t.maxTeams)*100}%`, background: 'linear-gradient(90deg, var(--red), var(--gold))' }} />
                </div>
                <Link href="/register" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginBottom: '10px', display: 'flex' }}>Register Now →</Link>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--white-muted)', textAlign: 'center' }}>Free registration · Email confirmation within 24h</div>
              </div>
            )}
            <div style={{ background: 'var(--card-dark)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '20px' }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--white-muted)', marginBottom: '16px' }}>Tournament Info</div>
              {[
                { label: 'Format',   value: 'Knockout + Group Stage' },
                { label: 'Teams',    value: `${t.maxTeams} teams` },
                { label: 'Venue',    value: t.venue },
                { label: 'Location', value: t.location },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', marginBottom: '10px', paddingBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--white-muted)' }}>{item.label}</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, color: 'var(--white)', textAlign: 'right' }}>{item.value}</span>
                </div>
              ))}
              <Link href="/sponsors" style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, color: 'var(--gold)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                🤝 Become a Sponsor →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
