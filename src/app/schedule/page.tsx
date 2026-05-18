'use client'
import { useState } from 'react'
import { MOCK_MATCHES, MOCK_TOURNAMENTS } from '@/lib/mockData'
import type { MatchStatus } from '@/types'

const STATUS_TABS: { key: MatchStatus | 'all'; label: string }[] = [
  { key: 'all',       label: 'All Matches' },
  { key: 'scheduled', label: 'Upcoming' },
  { key: 'live',      label: '🔴 Live' },
  { key: 'completed', label: 'Results' },
]

export default function SchedulePage() {
  const [statusFilter, setStatusFilter] = useState<MatchStatus | 'all'>('all')
  const [tourneyFilter, setTourneyFilter] = useState<string>('all')

  const filtered = MOCK_MATCHES.filter(m => {
    const statusOk  = statusFilter  === 'all' || m.status === statusFilter
    const tourneyOk = tourneyFilter === 'all' || m.tournamentId === tourneyFilter
    return statusOk && tourneyOk
  })

  const groupedByDate = filtered.reduce<Record<string, typeof filtered>>((acc, m) => {
    const key = m.matchDate
    if (!acc[key]) acc[key] = []
    acc[key].push(m)
    return acc
  }, {})

  return (
    <div style={{ minHeight: '100vh', background: 'var(--black)' }}>
      {/* Header */}
      <div style={{
        background: 'var(--black-soft)',
        borderBottom: '1px solid rgba(192,57,43,0.2)',
        padding: '48px 0 40px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-heading)', fontSize: '180px',
          color: 'transparent', WebkitTextStroke: '1px rgba(192,57,43,0.05)',
          pointerEvents: 'none', userSelect: 'none', lineHeight: 1,
        }}>SCHEDULE</div>
        <div className="container-xl" style={{ position: 'relative' }}>
          <div className="section-eyebrow" style={{ marginBottom: '8px' }}>Fixtures & Results</div>
          <h1 className="section-title">Match Schedule</h1>
        </div>
      </div>

      <div className="container-xl section-py">
        {/* Filters */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', marginBottom: '36px', alignItems: 'center' }}>
          {/* Status tabs */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {STATUS_TABS.map(tab => (
              <button
                key={tab.key}
                onClick={() => setStatusFilter(tab.key)}
                style={{
                  fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600,
                  letterSpacing: '0.06em', textTransform: 'uppercase',
                  padding: '8px 16px', borderRadius: '4px', cursor: 'pointer',
                  border: '1px solid',
                  transition: 'all 0.2s',
                  background: statusFilter === tab.key ? 'var(--red)' : 'transparent',
                  borderColor: statusFilter === tab.key ? 'var(--red)' : 'rgba(255,255,255,0.12)',
                  color: statusFilter === tab.key ? 'var(--white)' : 'var(--white-muted)',
                  minHeight: '40px',
                }}
              >{tab.label}</button>
            ))}
          </div>

          {/* Tournament filter */}
          <select
            value={tourneyFilter}
            onChange={e => setTourneyFilter(e.target.value)}
            style={{
              background: 'var(--card-mid)', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '4px', padding: '8px 14px', color: 'var(--white)',
              fontFamily: 'var(--font-body)', fontSize: '13px', cursor: 'pointer',
              minHeight: '40px', outline: 'none',
            }}
          >
            <option value="all">All Tournaments</option>
            {MOCK_TOURNAMENTS.map(t => (
              <option key={t._id} value={t._id}>{t.name} — {t.edition}</option>
            ))}
          </select>
        </div>

        {/* Match list grouped by date */}
        {Object.keys(groupedByDate).length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--white-muted)', fontFamily: 'var(--font-body)' }}>
            No matches found for the selected filters.
          </div>
        ) : (
          Object.entries(groupedByDate)
            .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
            .map(([date, matches]) => (
              <div key={date} style={{ marginBottom: '40px' }}>
                {/* Date header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ height: '1px', flex: 1, background: 'rgba(255,255,255,0.06)' }} />
                  <span style={{
                    fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700,
                    letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--white-muted)',
                    background: 'var(--card-dark)', border: '1px solid rgba(255,255,255,0.06)',
                    padding: '5px 14px', borderRadius: '20px',
                  }}>
                    {new Date(date).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                  <div style={{ height: '1px', flex: 1, background: 'rgba(255,255,255,0.06)' }} />
                </div>

                {/* Matches for that date */}
                <div style={{ display: 'grid', gap: '10px' }}>
                  {matches.map(m => (
                    <div key={m._id} style={{
                      background: 'var(--card-dark)',
                      border: `1px solid ${m.status === 'live' ? 'rgba(192,57,43,0.4)' : 'rgba(255,255,255,0.06)'}`,
                      borderRadius: '10px', padding: '20px 24px',
                      position: 'relative', overflow: 'hidden',
                    }}>
                      {/* Live indicator */}
                      {m.status === 'live' && (
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'var(--red)', animation: 'pulse-bar 1s ease-in-out infinite' }} />
                      )}
                      {m.status === 'completed' && (
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: '#3DB86D' }} />
                      )}

                      <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr 120px', gap: '16px', alignItems: 'center' }}>
                        {/* Left meta */}
                        <div>
                          <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--red)', marginBottom: '4px' }}>
                            {m.round}
                          </div>
                          <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--white-muted)' }}>
                            {m.matchTime}
                          </div>
                          {m.venue && (
                            <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--white-muted)', marginTop: '2px' }}>
                              📍 {m.venue}
                            </div>
                          )}
                        </div>

                        {/* Center: teams vs score */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', justifyContent: 'center' }}>
                          {/* Team A */}
                          <div style={{ flex: 1, textAlign: 'right' }}>
                            <div style={{
                              fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 600,
                              color: m.winner === m.teamA ? 'var(--gold-light)' : 'var(--white)',
                              lineHeight: 1.1,
                            }}>
                              {m.teamA}
                              {m.winner === m.teamA && <span style={{ marginLeft: '6px' }}>🏆</span>}
                            </div>
                          </div>

                          {/* Score / VS */}
                          <div style={{ textAlign: 'center', flexShrink: 0, minWidth: '80px' }}>
                            {m.status === 'completed' ? (
                              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', letterSpacing: '0.04em', color: 'var(--white)', lineHeight: 1 }}>
                                {m.scoreA} <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '20px' }}>–</span> {m.scoreB}
                              </div>
                            ) : (
                              <div style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 600, color: 'var(--red)', letterSpacing: '0.1em' }}>VS</div>
                            )}
                          </div>

                          {/* Team B */}
                          <div style={{ flex: 1, textAlign: 'left' }}>
                            <div style={{
                              fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 600,
                              color: m.winner === m.teamB ? 'var(--gold-light)' : 'var(--white)',
                              lineHeight: 1.1,
                            }}>
                              {m.winner === m.teamB && <span style={{ marginRight: '6px' }}>🏆</span>}
                              {m.teamB}
                            </div>
                          </div>
                        </div>

                        {/* Right: status */}
                        <div style={{ textAlign: 'right' }}>
                          <span className={`status-${m.status}`} style={{
                            display: 'inline-block', padding: '5px 12px', borderRadius: '20px',
                            fontSize: '10px', fontWeight: 700, fontFamily: 'var(--font-body)',
                            letterSpacing: '0.08em', textTransform: 'uppercase',
                          }}>
                            {m.status === 'completed' ? 'Full Time' : m.status === 'live' ? '🔴 LIVE' : 'Upcoming'}
                          </span>
                          {m.tournamentName && (
                            <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: 'var(--white-muted)', marginTop: '6px' }}>
                              {m.tournamentName}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
        )}
      </div>

      <style>{`
        @keyframes pulse-bar { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @media (max-width: 640px) {
          .match-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
