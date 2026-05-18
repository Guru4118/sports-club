import Link from 'next/link'
import { MOCK_MATCHES } from '@/lib/mockData'

export default function MatchHighlights() {
  const recent = MOCK_MATCHES.filter(m => m.status === 'completed').slice(0, 3)
  const upcoming = MOCK_MATCHES.filter(m => m.status === 'scheduled').slice(0, 2)

  return (
    <section className="section-py" style={{ background: 'var(--black-soft)', position: 'relative' }}>
      <div className="container-xl">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div className="section-eyebrow" style={{ marginBottom: '8px' }}>Live & Results</div>
            <h2 className="section-title">Match Centre</h2>
          </div>
          <Link href="/schedule" style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, color: 'var(--red)', textDecoration: 'none', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Full Schedule →
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {/* Recent Results */}
          {recent.map((match) => (
            <div key={match._id} style={{
              background: 'var(--card-dark)', borderRadius: '10px',
              border: '1px solid rgba(255,255,255,0.06)', padding: '20px',
              position: 'relative', overflow: 'hidden',
            }} className="card-hover">
              {/* Completed indicator */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: '#3DB86D' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--white-muted)' }}>
                  {match.round}
                </span>
                <span className="status-completed" style={{ padding: '3px 10px', borderRadius: '20px', fontSize: '10px', fontWeight: 700, fontFamily: 'var(--font-body)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  FT
                </span>
              </div>

              {/* Teams & Score */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <div style={{
                    fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 600,
                    color: match.winner === match.teamA ? 'var(--gold-light)' : 'var(--white-muted)',
                    marginBottom: '6px', lineHeight: 1.2,
                  }}>
                    {match.teamA}
                    {match.winner === match.teamA && <span style={{ marginLeft: '6px', fontSize: '12px' }}>🏆</span>}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-heading)', fontSize: '36px',
                    color: match.winner === match.teamA ? 'var(--white)' : 'var(--white-muted)',
                    lineHeight: 1,
                  }}>{match.scoreA}</div>
                </div>

                <div style={{ fontFamily: 'var(--font-display)', fontSize: '14px', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em', flexShrink: 0 }}>VS</div>

                <div style={{ flex: 1, textAlign: 'right' }}>
                  <div style={{
                    fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 600,
                    color: match.winner === match.teamB ? 'var(--gold-light)' : 'var(--white-muted)',
                    marginBottom: '6px', lineHeight: 1.2,
                  }}>
                    {match.winner === match.teamB && <span style={{ marginRight: '6px', fontSize: '12px' }}>🏆</span>}
                    {match.teamB}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-heading)', fontSize: '36px',
                    color: match.winner === match.teamB ? 'var(--white)' : 'var(--white-muted)',
                    lineHeight: 1,
                  }}>{match.scoreB}</div>
                </div>
              </div>

              <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.05)', fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--white-muted)' }}>
                {new Date(match.matchDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                {match.tournamentName && <span> · {match.tournamentName}</span>}
              </div>
            </div>
          ))}

          {/* Upcoming matches */}
          {upcoming.map((match) => (
            <div key={match._id} style={{
              background: 'var(--card-dark)', borderRadius: '10px',
              border: '1px solid rgba(201,162,39,0.15)', padding: '20px',
              position: 'relative', overflow: 'hidden',
            }} className="card-hover">
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'var(--gold)' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--white-muted)' }}>
                  {match.round}
                </span>
                <span className="status-upcoming" style={{ padding: '3px 10px', borderRadius: '20px', fontSize: '10px', fontWeight: 700, fontFamily: 'var(--font-body)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  Upcoming
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 600, color: 'var(--white)', lineHeight: 1.2 }}>
                    {match.teamA}
                  </div>
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '22px', color: 'var(--red)', letterSpacing: '0.1em', fontWeight: 600, flexShrink: 0 }}>VS</div>
                <div style={{ flex: 1, textAlign: 'right' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 600, color: 'var(--white)', lineHeight: 1.2 }}>
                    {match.teamB}
                  </div>
                </div>
              </div>

              <div style={{
                marginTop: '16px', padding: '10px 12px',
                background: 'rgba(201,162,39,0.06)', borderRadius: '6px',
                display: 'flex', alignItems: 'center', gap: '8px',
              }}>
                <span style={{ fontSize: '14px' }}>📅</span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 500, color: 'var(--gold)' }}>
                  {new Date(match.matchDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  {match.matchTime && ` · ${match.matchTime}`}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
