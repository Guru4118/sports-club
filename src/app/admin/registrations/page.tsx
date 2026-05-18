'use client'
import { useState } from 'react'
import { MOCK_TOURNAMENTS } from '@/lib/mockData'
import type { Registration, RegistrationStatus } from '@/types'

// Seeded mock registrations for UI
const MOCK_REGS: Registration[] = [
  { _id: '1', tournamentId: '1', tournamentName: 'JOF Kabaddi Cup 5th Edition', teamName: 'Hosur Hawks',       captainName: 'Ravi Kumar',   contactPhone: '9876543210', contactEmail: 'ravi@example.com',    playerCount: 12, location: 'Hosur',      district: 'Krishnagiri', status: 'pending',  submittedAt: '2025-01-10T10:30:00Z' },
  { _id: '2', tournamentId: '1', tournamentName: 'JOF Kabaddi Cup 5th Edition', teamName: 'Salem Strikers',    captainName: 'Murugan P',    contactPhone: '9876123456', contactEmail: 'murugan@example.com', playerCount: 12, location: 'Salem',      district: 'Salem',       status: 'approved', submittedAt: '2025-01-09T08:00:00Z' },
  { _id: '3', tournamentId: '1', tournamentName: 'JOF Kabaddi Cup 5th Edition', teamName: 'Dharmapuri Lions',  captainName: 'Selvam T',     contactPhone: '9123456789', contactEmail: 'selvam@example.com',  playerCount: 12, location: 'Dharmapuri', district: 'Dharmapuri',  status: 'approved', submittedAt: '2025-01-08T14:20:00Z' },
  { _id: '4', tournamentId: '1', tournamentName: 'JOF Kabaddi Cup 5th Edition', teamName: 'Erode Eagles',      captainName: 'Bala R',       contactPhone: '8765432109', contactEmail: 'bala@example.com',    playerCount: 11, location: 'Erode',      district: 'Erode',       status: 'pending',  submittedAt: '2025-01-12T11:45:00Z' },
  { _id: '5', tournamentId: '1', tournamentName: 'JOF Kabaddi Cup 5th Edition', teamName: 'Coimbatore Cobras', captainName: 'Vijay S',      contactPhone: '9988776655', contactEmail: 'vijay@example.com',   playerCount: 12, location: 'Coimbatore', district: 'Coimbatore',  status: 'rejected', submittedAt: '2025-01-07T09:00:00Z' },
]

const STATUS_COLORS: Record<RegistrationStatus, { bg: string; text: string; border: string }> = {
  pending:  { bg: 'rgba(201,162,39,0.1)',  text: 'var(--gold)',   border: 'rgba(201,162,39,0.25)' },
  approved: { bg: 'rgba(60,200,60,0.1)',   text: '#6DB86D',      border: 'rgba(60,200,60,0.25)'  },
  rejected: { bg: 'rgba(192,57,43,0.1)',   text: '#E8735A',      border: 'rgba(192,57,43,0.3)'   },
}

export default function AdminRegistrationsPage() {
  const [regs, setRegs]       = useState<Registration[]>(MOCK_REGS)
  const [filter, setFilter]   = useState<RegistrationStatus | 'all'>('all')
  const [tourney, setTourney] = useState<string>('all')

  const filtered = regs.filter(r =>
    (filter  === 'all' || r.status      === filter) &&
    (tourney === 'all' || r.tournamentId === tourney)
  )

  const updateStatus = (id: string, status: RegistrationStatus) => {
    setRegs(prev => prev.map(r => r._id === id ? { ...r, status } : r))
    // In production: fetch(`/api/registrations/${id}`, { method:'PATCH', body: JSON.stringify({status}), headers:{'Authorization':`Bearer ${localStorage.getItem('admin_token')}`,'Content-Type':'application/json'} })
  }

  const counts = {
    all:      regs.length,
    pending:  regs.filter(r => r.status === 'pending').length,
    approved: regs.filter(r => r.status === 'approved').length,
    rejected: regs.filter(r => r.status === 'rejected').length,
  }

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', letterSpacing: '0.04em', color: 'var(--white)', lineHeight: 1 }}>REGISTRATIONS</h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--white-muted)', marginTop: '4px' }}>
          Review and manage team registrations for all tournaments.
        </p>
      </div>

      {/* Summary pills */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
        {(['all', 'pending', 'approved', 'rejected'] as const).map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            style={{
              fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600,
              letterSpacing: '0.06em', textTransform: 'capitalize',
              padding: '7px 16px', borderRadius: '20px', cursor: 'pointer',
              border: '1px solid',
              background: filter === s ? (s === 'all' ? 'var(--red)' : STATUS_COLORS[s as RegistrationStatus]?.bg || 'var(--red)') : 'transparent',
              borderColor: filter === s ? (s === 'all' ? 'var(--red)' : STATUS_COLORS[s as RegistrationStatus]?.border || 'var(--red)') : 'rgba(255,255,255,0.1)',
              color: filter === s ? 'var(--white)' : 'var(--white-muted)',
              minHeight: '36px',
            }}
          >
            {s} ({counts[s]})
          </button>
        ))}
        <select
          value={tourney}
          onChange={e => setTourney(e.target.value)}
          style={{ background: '#222226', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '7px 14px', color: 'var(--white)', fontFamily: 'var(--font-body)', fontSize: '12px', cursor: 'pointer', minHeight: '36px', outline: 'none', marginLeft: 'auto' }}
        >
          <option value="all">All Tournaments</option>
          {MOCK_TOURNAMENTS.map(t => <option key={t._id} value={t._id}>{t.name}</option>)}
        </select>
      </div>

      {/* Table */}
      <div style={{ background: '#1A1A1C', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                {['Team', 'Captain', 'Contact', 'Location', 'Players', 'Tournament', 'Submitted', 'Status', 'Actions'].map(h => (
                  <th key={h} style={{
                    fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 700,
                    letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--white-muted)',
                    padding: '12px 14px', textAlign: 'left', whiteSpace: 'nowrap',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} style={{ textAlign: 'center', padding: '40px', fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--white-muted)' }}>
                    No registrations found.
                  </td>
                </tr>
              ) : filtered.map((reg, i) => {
                const sc = STATUS_COLORS[reg.status]
                return (
                  <tr key={reg._id} style={{ borderBottom: i < filtered.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none', transition: 'background 0.15s' }}>
                    <td style={{ padding: '14px 14px' }}>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 600, color: 'var(--white)' }}>{reg.teamName}</div>
                    </td>
                    <td style={{ padding: '14px', fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--white-dim)', whiteSpace: 'nowrap' }}>{reg.captainName}</td>
                    <td style={{ padding: '14px' }}>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--white-dim)' }}>{reg.contactPhone}</div>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--white-muted)' }}>{reg.contactEmail}</div>
                    </td>
                    <td style={{ padding: '14px', fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--white-muted)', whiteSpace: 'nowrap' }}>{reg.location}</td>
                    <td style={{ padding: '14px', fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--white-dim)', textAlign: 'center' }}>{reg.playerCount}</td>
                    <td style={{ padding: '14px', fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--white-muted)', maxWidth: '140px' }}>{reg.tournamentName}</td>
                    <td style={{ padding: '14px', fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--white-muted)', whiteSpace: 'nowrap' }}>
                      {new Date(reg.submittedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </td>
                    <td style={{ padding: '14px' }}>
                      <span style={{
                        display: 'inline-block', padding: '3px 10px', borderRadius: '20px',
                        fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 700,
                        letterSpacing: '0.06em', textTransform: 'capitalize',
                        background: sc.bg, color: sc.text, border: `1px solid ${sc.border}`,
                      }}>{reg.status}</span>
                    </td>
                    <td style={{ padding: '14px' }}>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        {reg.status !== 'approved' && (
                          <button
                            onClick={() => updateStatus(reg._id, 'approved')}
                            style={{
                              fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600,
                              padding: '5px 10px', borderRadius: '4px', cursor: 'pointer',
                              background: 'rgba(60,200,60,0.1)', border: '1px solid rgba(60,200,60,0.3)',
                              color: '#6DB86D', whiteSpace: 'nowrap',
                            }}
                          >✓ Approve</button>
                        )}
                        {reg.status !== 'rejected' && (
                          <button
                            onClick={() => updateStatus(reg._id, 'rejected')}
                            style={{
                              fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600,
                              padding: '5px 10px', borderRadius: '4px', cursor: 'pointer',
                              background: 'rgba(192,57,43,0.1)', border: '1px solid rgba(192,57,43,0.3)',
                              color: '#E8735A', whiteSpace: 'nowrap',
                            }}
                          >✕ Reject</button>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
