'use client'
import { useState } from 'react'
import { MOCK_MATCHES, MOCK_TOURNAMENTS } from '@/lib/mockData'
import type { Match, MatchStatus } from '@/types'

export default function AdminMatchesPage() {
  const [matches, setMatches] = useState<Match[]>(MOCK_MATCHES)
  const [editId, setEditId]   = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)

  const [editData, setEditData] = useState<{ scoreA: string; scoreB: string; winner: string; status: MatchStatus }>({
    scoreA: '', scoreB: '', winner: '', status: 'scheduled',
  })

  const startEdit = (m: Match) => {
    setEditId(m._id)
    setEditData({ scoreA: String(m.scoreA ?? ''), scoreB: String(m.scoreB ?? ''), winner: m.winner || '', status: m.status })
  }

  const saveEdit = (id: string) => {
    setMatches(prev => prev.map(m => m._id === id ? {
      ...m,
      scoreA: editData.scoreA !== '' ? Number(editData.scoreA) : m.scoreA,
      scoreB: editData.scoreB !== '' ? Number(editData.scoreB) : m.scoreB,
      winner: editData.winner || m.winner,
      status: editData.status,
    } : m))
    setEditId(null)
  }

  const grouped = MOCK_TOURNAMENTS.map(t => ({
    tournament: t,
    matches: matches.filter(m => m.tournamentId === t._id),
  })).filter(g => g.matches.length > 0)

  const statusStyle: Record<MatchStatus, { bg: string; text: string; border: string }> = {
    scheduled: { bg: 'rgba(201,162,39,0.1)', text: 'var(--gold)',   border: 'rgba(201,162,39,0.25)' },
    live:      { bg: 'rgba(192,57,43,0.1)',  text: '#E8735A',      border: 'rgba(192,57,43,0.3)'   },
    completed: { bg: 'rgba(60,200,60,0.1)',  text: '#6DB86D',      border: 'rgba(60,200,60,0.25)'  },
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', letterSpacing: '0.04em', color: 'var(--white)', lineHeight: 1 }}>MATCHES</h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--white-muted)', marginTop: '4px' }}>
            Schedule fixtures and update match results.
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary"
          style={{ fontSize: '13px', padding: '10px 20px' }}
        >
          + Add Match
        </button>
      </div>

      {/* Add match form */}
      {showForm && (
        <div style={{ background: '#1A1A1C', border: '1px solid rgba(192,57,43,0.3)', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--white-muted)', marginBottom: '16px' }}>
            New Match
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
            {[
              { label: 'Tournament', type: 'select' },
              { label: 'Team A',     type: 'text', placeholder: 'Team name' },
              { label: 'Team B',     type: 'text', placeholder: 'Team name' },
              { label: 'Round',      type: 'text', placeholder: 'e.g. Quarter Final' },
              { label: 'Date',       type: 'date' },
              { label: 'Time',       type: 'time' },
              { label: 'Venue',      type: 'text', placeholder: 'Ground A' },
            ].map(field => (
              <div key={field.label}>
                <label className="form-label">{field.label}</label>
                {field.type === 'select' ? (
                  <select className="form-input" style={{ cursor: 'pointer' }}>
                    {MOCK_TOURNAMENTS.map(t => <option key={t._id} value={t._id}>{t.name}</option>)}
                  </select>
                ) : (
                  <input type={field.type} placeholder={field.placeholder} className="form-input" />
                )}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
            <button className="btn-primary" style={{ fontSize: '13px', padding: '10px 24px' }}>Save Match</button>
            <button onClick={() => setShowForm(false)} className="btn-primary" style={{ fontSize: '13px', padding: '10px 24px', background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: 'var(--white)' }}>Cancel</button>
          </div>
        </div>
      )}

      {/* Matches by tournament */}
      {grouped.map(({ tournament, matches: tMatches }) => (
        <div key={tournament._id} style={{ marginBottom: '28px' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px',
            paddingBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', letterSpacing: '0.04em', color: 'var(--white)' }}>
              {tournament.name}
            </span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--gold)', letterSpacing: '0.08em' }}>
              {tournament.edition}
            </span>
          </div>

          <div style={{ background: '#1A1A1C', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    {['Round', 'Match', 'Score', 'Date & Time', 'Status', 'Actions'].map(h => (
                      <th key={h} style={{ fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--white-muted)', padding: '12px 14px', textAlign: 'left', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tMatches.map((m, i) => {
                    const sc = statusStyle[m.status]
                    const isEditing = editId === m._id
                    return (
                      <tr key={m._id} style={{ borderBottom: i < tMatches.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                        <td style={{ padding: '12px 14px' }}>
                          <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, color: 'var(--red)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{m.round}</span>
                        </td>
                        <td style={{ padding: '12px 14px' }}>
                          <div style={{ fontFamily: 'var(--font-display)', fontSize: '14px', color: 'var(--white)', whiteSpace: 'nowrap' }}>
                            <span style={{ color: m.winner === m.teamA ? 'var(--gold-light)' : 'var(--white)' }}>{m.teamA}</span>
                            <span style={{ color: 'rgba(255,255,255,0.25)', margin: '0 8px' }}>vs</span>
                            <span style={{ color: m.winner === m.teamB ? 'var(--gold-light)' : 'var(--white)' }}>{m.teamB}</span>
                          </div>
                        </td>
                        <td style={{ padding: '12px 14px' }}>
                          {isEditing ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <input type="number" value={editData.scoreA} onChange={e => setEditData(d => ({ ...d, scoreA: e.target.value }))} style={{ width: '48px', background: '#222226', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '4px', color: 'var(--white)', padding: '4px 8px', fontFamily: 'var(--font-body)', fontSize: '14px', outline: 'none' }} />
                              <span style={{ color: 'rgba(255,255,255,0.3)' }}>–</span>
                              <input type="number" value={editData.scoreB} onChange={e => setEditData(d => ({ ...d, scoreB: e.target.value }))} style={{ width: '48px', background: '#222226', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '4px', color: 'var(--white)', padding: '4px 8px', fontFamily: 'var(--font-body)', fontSize: '14px', outline: 'none' }} />
                            </div>
                          ) : (
                            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', color: 'var(--white)' }}>
                              {m.scoreA !== undefined ? `${m.scoreA}–${m.scoreB}` : '–'}
                            </span>
                          )}
                        </td>
                        <td style={{ padding: '12px 14px', whiteSpace: 'nowrap' }}>
                          <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--white-dim)' }}>
                            {new Date(m.matchDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                          </div>
                          {m.matchTime && <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--white-muted)' }}>{m.matchTime}</div>}
                        </td>
                        <td style={{ padding: '12px 14px' }}>
                          {isEditing ? (
                            <select
                              value={editData.status}
                              onChange={e => setEditData(d => ({ ...d, status: e.target.value as MatchStatus }))}
                              style={{ background: '#222226', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '4px', color: 'var(--white)', padding: '4px 8px', fontFamily: 'var(--font-body)', fontSize: '12px', outline: 'none' }}
                            >
                              <option value="scheduled">Scheduled</option>
                              <option value="live">Live</option>
                              <option value="completed">Completed</option>
                            </select>
                          ) : (
                            <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: '20px', fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'capitalize', background: sc.bg, color: sc.text, border: `1px solid ${sc.border}` }}>
                              {m.status}
                            </span>
                          )}
                        </td>
                        <td style={{ padding: '12px 14px' }}>
                          {isEditing ? (
                            <div style={{ display: 'flex', gap: '6px' }}>
                              <button onClick={() => saveEdit(m._id)} style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', background: 'rgba(60,200,60,0.1)', border: '1px solid rgba(60,200,60,0.3)', color: '#6DB86D' }}>Save</button>
                              <button onClick={() => setEditId(null)} style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--white-muted)' }}>Cancel</button>
                            </div>
                          ) : (
                            <button onClick={() => startEdit(m)} style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, padding: '5px 12px', borderRadius: '4px', cursor: 'pointer', background: 'rgba(192,57,43,0.1)', border: '1px solid rgba(192,57,43,0.25)', color: '#E8735A' }}>
                              ✏️ Edit
                            </button>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
