'use client'
import { useState } from 'react'
import { MOCK_TOURNAMENTS } from '@/lib/mockData'
import type { Tournament, TournamentStatus } from '@/types'
import Link from 'next/link'

const STATUS_STYLE: Record<TournamentStatus, { text: string; bg: string; border: string }> = {
  upcoming:  { text: 'var(--gold)',  bg: 'rgba(201,162,39,0.1)', border: 'rgba(201,162,39,0.25)' },
  ongoing:   { text: '#E8735A',      bg: 'rgba(192,57,43,0.1)', border: 'rgba(192,57,43,0.3)'  },
  completed: { text: '#6DB86D',      bg: 'rgba(60,200,60,0.1)', border: 'rgba(60,200,60,0.25)' },
}

export default function AdminTournamentsPage() {
  const [tournaments, setTournaments] = useState<Tournament[]>(MOCK_TOURNAMENTS)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    name: '', edition: '', startDate: '', endDate: '',
    venue: '', location: '', totalPrize: '', description: '',
    maxTeams: '32', registrationOpen: true,
  })

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value }))

  const handleSave = () => {
    if (!form.name || !form.startDate) return
    const slug = `${form.name}-${form.edition}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    const newT: Tournament = {
      _id: Date.now().toString(), slug,
      name: form.name, edition: form.edition,
      startDate: form.startDate, endDate: form.endDate,
      venue: form.venue, location: form.location,
      totalPrize: form.totalPrize, description: form.description,
      maxTeams: Number(form.maxTeams), registeredTeams: 0,
      registrationOpen: form.registrationOpen,
      status: 'upcoming', prizePool: [], rules: [],
      createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
    }
    setTournaments(prev => [newT, ...prev])
    setShowForm(false)
    setForm({ name: '', edition: '', startDate: '', endDate: '', venue: '', location: '', totalPrize: '', description: '', maxTeams: '32', registrationOpen: true })
  }

  const updateStatus = (id: string, status: TournamentStatus) =>
    setTournaments(prev => prev.map(t => t._id === id ? { ...t, status } : t))

  const toggleRegistration = (id: string) =>
    setTournaments(prev => prev.map(t => t._id === id ? { ...t, registrationOpen: !t.registrationOpen } : t))

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', letterSpacing: '0.04em', color: 'var(--white)', lineHeight: 1 }}>TOURNAMENTS</h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--white-muted)', marginTop: '4px' }}>
            {tournaments.filter(t => t.status === 'upcoming').length} upcoming · {tournaments.length} total
          </p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary" style={{ fontSize: '13px', padding: '10px 20px' }}>
          + New Tournament
        </button>
      </div>

      {/* Create form */}
      {showForm && (
        <div style={{ background: '#1A1A1C', border: '1px solid rgba(192,57,43,0.3)', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--white-muted)', marginBottom: '16px' }}>
            New Tournament
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '14px' }}>
            {[
              { label: 'Tournament Name *', key: 'name',       type: 'text', placeholder: 'e.g. JOF Kabaddi Cup' },
              { label: 'Edition',           key: 'edition',    type: 'text', placeholder: 'e.g. 5th Edition' },
              { label: 'Start Date *',      key: 'startDate',  type: 'date' },
              { label: 'End Date',          key: 'endDate',    type: 'date' },
              { label: 'Venue',             key: 'venue',      type: 'text', placeholder: 'Ground name' },
              { label: 'Location',          key: 'location',   type: 'text', placeholder: 'City, District' },
              { label: 'Total Prize Pool',  key: 'totalPrize', type: 'text', placeholder: '₹75,000' },
              { label: 'Max Teams',         key: 'maxTeams',   type: 'number', placeholder: '32' },
            ].map((f) => (
              <div key={f.key}>
                <label className="form-label">{f.label}</label>
                <input type={f.type} value={form[f.key as keyof typeof form] as string} onChange={set(f.key as keyof typeof form)} className="form-input" placeholder={f.placeholder} />
              </div>
            ))}
            <div style={{ gridColumn: 'span 2' }}>
              <label className="form-label">Description</label>
              <textarea value={form.description} onChange={set('description')} className="form-input" rows={2} placeholder="Brief description of the tournament…" style={{ resize: 'vertical' }} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <input type="checkbox" id="regOpen" checked={form.registrationOpen} onChange={e => setForm(f => ({ ...f, registrationOpen: e.target.checked }))} style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: 'var(--red)' }} />
            <label htmlFor="regOpen" style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--white-dim)', cursor: 'pointer' }}>Registration Open</label>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={handleSave} className="btn-primary" style={{ fontSize: '13px', padding: '10px 24px' }}>Create Tournament</button>
            <button onClick={() => setShowForm(false)} className="btn-primary" style={{ fontSize: '13px', padding: '10px 24px', background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: 'var(--white)' }}>Cancel</button>
          </div>
        </div>
      )}

      {/* Tournament cards */}
      <div style={{ display: 'grid', gap: '14px' }}>
        {tournaments.map(t => {
          const style = STATUS_STYLE[t.status]
          return (
            <div key={t._id} style={{ background: '#1A1A1C', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '14px' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '6px' }}>
                    <span style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', letterSpacing: '0.04em', color: 'var(--white)', lineHeight: 1 }}>{t.name}</span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--gold)', letterSpacing: '0.08em' }}>{t.edition}</span>
                    <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: '20px', fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 700, background: style.bg, color: style.text, border: `1px solid ${style.border}`, letterSpacing: '0.06em', textTransform: 'capitalize' }}>
                      {t.status}
                    </span>
                    {t.registrationOpen && (
                      <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: '20px', fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 700, background: 'rgba(60,200,60,0.08)', color: '#6DB86D', border: '1px solid rgba(60,200,60,0.2)' }}>
                        Reg Open
                      </span>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--white-muted)' }}>📅 {new Date(t.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--white-muted)' }}>📍 {t.venue}</span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--white-muted)' }}>👥 {t.registeredTeams}/{t.maxTeams} teams</span>
                    {t.totalPrize && <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--gold)' }}>🏆 {t.totalPrize}</span>}
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', flexShrink: 0 }}>
                  <Link href={`/tournament/${t.slug}`} target="_blank" style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, padding: '6px 10px', borderRadius: '4px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--white-dim)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    🌐 View
                  </Link>
                  <button onClick={() => toggleRegistration(t._id)} style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, padding: '6px 10px', borderRadius: '4px', cursor: 'pointer', background: 'rgba(201,162,39,0.08)', border: '1px solid rgba(201,162,39,0.2)', color: 'var(--gold)' }}>
                    {t.registrationOpen ? '🔒 Close Reg' : '🔓 Open Reg'}
                  </button>
                  <select
                    value={t.status}
                    onChange={e => updateStatus(t._id, e.target.value as TournamentStatus)}
                    style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, padding: '6px 10px', borderRadius: '4px', cursor: 'pointer', background: 'rgba(192,57,43,0.08)', border: '1px solid rgba(192,57,43,0.2)', color: '#E8735A', outline: 'none' }}
                  >
                    <option value="upcoming">→ Upcoming</option>
                    <option value="ongoing">→ Ongoing</option>
                    <option value="completed">→ Completed</option>
                  </select>
                </div>
              </div>

              {/* Registration progress */}
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <div style={{ flex: 1, height: '3px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', borderRadius: '2px', width: `${(t.registeredTeams / t.maxTeams) * 100}%`, background: 'linear-gradient(90deg, var(--red), var(--gold))' }} />
                </div>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--white-muted)', flexShrink: 0 }}>
                  {Math.round((t.registeredTeams / t.maxTeams) * 100)}% full
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
