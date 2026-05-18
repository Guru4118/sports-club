'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { MOCK_TOURNAMENTS, MOCK_MATCHES, MOCK_PLAYERS } from '@/lib/mockData'

interface StatCard { label: string; value: string | number; icon: string; color: string; href: string }

const QUICK_ACTIONS = [
  { label: 'Add Tournament',   href: '/admin/tournaments',   icon: '🏆', desc: 'Create new event' },
  { label: 'Add Match',        href: '/admin/matches',       icon: '📅', desc: 'Schedule a fixture' },
  { label: 'Add Player',       href: '/admin/players',       icon: '👤', desc: 'Add squad member' },
  { label: 'Upload Photo',     href: '/admin/gallery',       icon: '📸', desc: 'Add to gallery' },
  { label: 'Registrations',    href: '/admin/registrations', icon: '📋', desc: 'Review team signups' },
  { label: 'Sponsorships',     href: '/admin/sponsorships',  icon: '🤝', desc: 'Manage sponsors' },
]

export default function AdminDashboard() {
  const [stats] = useState<StatCard[]>([
    { label: 'Tournaments',      value: MOCK_TOURNAMENTS.length,                          icon: '🏆', color: 'var(--gold)',    href: '/admin/tournaments' },
    { label: 'Active Players',   value: MOCK_PLAYERS.filter(p => p.active).length,       icon: '👥', color: 'var(--red)',     href: '/admin/players' },
    { label: 'Matches Played',   value: MOCK_MATCHES.filter(m => m.status === 'completed').length, icon: '📅', color: '#3DB86D', href: '/admin/matches' },
    { label: 'Pending Signups',  value: 4,                                                icon: '📋', color: '#E8BE45',        href: '/admin/registrations' },
  ])

  const recentMatches = MOCK_MATCHES.filter(m => m.status === 'completed').slice(0, 4)
  const upcomingMatches = MOCK_MATCHES.filter(m => m.status === 'scheduled').slice(0, 3)
  const upcomingTournament = MOCK_TOURNAMENTS.find(t => t.status === 'upcoming')

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '32px', letterSpacing: '0.04em', color: 'var(--white)', lineHeight: 1 }}>
          DASHBOARD
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--white-muted)', marginTop: '6px' }}>
          Welcome back. Here&apos;s what&apos;s happening at Jeeva Oli Friends.
        </p>
      </div>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '28px' }}>
        {stats.map((stat, i) => (
          <Link key={i} href={stat.href} style={{ textDecoration: 'none' }}>
            <div style={{
              background: '#1A1A1C', border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '10px', padding: '20px',
              transition: 'border-color 0.2s, transform 0.2s',
              cursor: 'pointer',
            }} className="card-hover">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <span style={{ fontSize: '22px' }}>{stat.icon}</span>
                <div style={{
                  width: '8px', height: '8px', borderRadius: '50%',
                  background: stat.color, boxShadow: `0 0 6px ${stat.color}`,
                }} />
              </div>
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: '40px', fontWeight: 600,
                color: stat.color, lineHeight: 1, marginBottom: '6px',
              }}>
                {stat.value}
              </div>
              <div style={{
                fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600,
                letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--white-muted)',
              }}>
                {stat.label}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '20px' }}>
        {/* Left column */}
        <div>
          {/* Quick actions */}
          <div style={{ background: '#1A1A1C', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--white-muted)', marginBottom: '16px' }}>
              Quick Actions
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              {QUICK_ACTIONS.map((action, i) => (
                <Link key={i} href={action.href} style={{ textDecoration: 'none' }}>
                  <div style={{
                    background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '8px', padding: '14px 12px', cursor: 'pointer',
                    transition: 'border-color 0.2s, background 0.2s',
                  }} className="card-hover">
                    <span style={{ fontSize: '20px', display: 'block', marginBottom: '8px' }}>{action.icon}</span>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, color: 'var(--white)', marginBottom: '2px' }}>{action.label}</div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--white-muted)' }}>{action.desc}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent results */}
          <div style={{ background: '#1A1A1C', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--white-muted)' }}>
                Recent Results
              </div>
              <Link href="/admin/matches" style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--red)', textDecoration: 'none', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                Manage →
              </Link>
            </div>
            {recentMatches.map(m => (
              <div key={m._id} style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '10px 12px', borderRadius: '6px', marginBottom: '6px',
                background: 'rgba(255,255,255,0.02)',
              }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--red)', flexShrink: 0, minWidth: '80px' }}>
                  {m.round}
                </span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '14px', fontWeight: 600, color: m.winner === m.teamA ? 'var(--gold-light)' : 'var(--white-dim)', flex: 1 }}>
                  {m.teamA}
                </span>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', color: 'var(--white)', flexShrink: 0 }}>
                  {m.scoreA}–{m.scoreB}
                </span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '14px', fontWeight: 600, color: m.winner === m.teamB ? 'var(--gold-light)' : 'var(--white-dim)', flex: 1, textAlign: 'right' }}>
                  {m.teamB}
                </span>
              </div>
            ))}
          </div>

          {/* Upcoming fixtures */}
          <div style={{ background: '#1A1A1C', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '20px' }}>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--white-muted)', marginBottom: '16px' }}>
              Upcoming Fixtures
            </div>
            {upcomingMatches.length === 0 ? (
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--white-muted)', textAlign: 'center', padding: '20px 0' }}>
                No upcoming matches scheduled.
              </div>
            ) : upcomingMatches.map(m => (
              <div key={m._id} style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '10px 12px', borderRadius: '6px', marginBottom: '6px',
                background: 'rgba(201,162,39,0.04)', border: '1px solid rgba(201,162,39,0.1)',
              }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 700, color: 'var(--gold)', flexShrink: 0 }}>
                  {new Date(m.matchDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                </span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '14px', color: 'var(--white)', flex: 1 }}>{m.teamA}</span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '13px', color: 'var(--red)', fontWeight: 700, flexShrink: 0 }}>VS</span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '14px', color: 'var(--white)', flex: 1, textAlign: 'right' }}>{m.teamB}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right sidebar */}
        <div>
          {/* Tournament status */}
          {upcomingTournament && (
            <div style={{
              background: 'linear-gradient(135deg, rgba(192,57,43,0.12), rgba(201,162,39,0.04))',
              border: '1px solid rgba(192,57,43,0.25)', borderRadius: '12px', padding: '20px', marginBottom: '16px',
            }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--red)', marginBottom: '8px' }}>
                Next Tournament
              </div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', letterSpacing: '0.04em', color: 'var(--white)', marginBottom: '12px', lineHeight: 1.1 }}>
                {upcomingTournament.name}
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--white-muted)', marginBottom: '6px' }}>
                📅 {new Date(upcomingTournament.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--white-muted)', marginBottom: '14px' }}>
                👥 {upcomingTournament.registeredTeams}/{upcomingTournament.maxTeams} teams registered
              </div>
              <div style={{ height: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px', overflow: 'hidden', marginBottom: '14px' }}>
                <div style={{
                  height: '100%', borderRadius: '2px',
                  width: `${(upcomingTournament.registeredTeams / upcomingTournament.maxTeams) * 100}%`,
                  background: 'linear-gradient(90deg, var(--red), var(--gold))',
                }} />
              </div>
              <Link href="/admin/tournaments" style={{
                display: 'block', textAlign: 'center',
                fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600,
                color: 'var(--white)', background: 'var(--red)', borderRadius: '4px',
                padding: '10px', textDecoration: 'none', letterSpacing: '0.06em', textTransform: 'uppercase',
              }}>
                Manage Tournament
              </Link>
            </div>
          )}

          {/* System status */}
          <div style={{ background: '#1A1A1C', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '20px' }}>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--white-muted)', marginBottom: '16px' }}>
              System Status
            </div>
            {[
              { label: 'API',          status: true,  note: 'All endpoints healthy' },
              { label: 'Database',     status: true,  note: 'MongoDB connected' },
              { label: 'Email',        status: true,  note: 'Nodemailer ready' },
              { label: 'Image CDN',    status: false, note: 'Set Cloudinary credentials' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '12px' }}>
                <div style={{
                  width: '7px', height: '7px', borderRadius: '50%',
                  background: item.status ? '#3DB86D' : 'var(--gold)',
                  flexShrink: 0, marginTop: '4px',
                  boxShadow: item.status ? '0 0 4px #3DB86D' : '0 0 4px var(--gold)',
                }} />
                <div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, color: 'var(--white)', lineHeight: 1 }}>{item.label}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--white-muted)', marginTop: '2px' }}>{item.note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
