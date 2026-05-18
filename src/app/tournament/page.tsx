import Link from 'next/link'
import { MOCK_TOURNAMENTS } from '@/lib/mockData'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Tournaments' }

export default function TournamentsPage() {
  const upcoming  = MOCK_TOURNAMENTS.filter(t => t.status === 'upcoming')
  const completed = MOCK_TOURNAMENTS.filter(t => t.status === 'completed')

  return (
    <div style={{ minHeight: '100vh', background: 'var(--black)' }}>
      {/* Page header */}
      <div style={{
        background: 'var(--black-soft)',
        borderBottom: '1px solid rgba(192,57,43,0.2)',
        padding: '48px 0 40px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          fontFamily: 'var(--font-heading)', fontSize: '180px',
          color: 'transparent', WebkitTextStroke: '1px rgba(192,57,43,0.06)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          pointerEvents: 'none', userSelect: 'none', overflow: 'hidden',
          lineHeight: 1,
        }}>TOURNAMENT</div>
        <div className="container-xl" style={{ position: 'relative' }}>
          <div className="section-eyebrow" style={{ marginBottom: '8px' }}>Compete · Win · Glory</div>
          <h1 className="section-title">Tournaments</h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--white-muted)', marginTop: '12px', maxWidth: '480px' }}>
            From quarter-finals to the championship — every tournament is a chapter in our story.
          </p>
        </div>
      </div>

      <div className="container-xl section-py">
        {/* Upcoming */}
        {upcoming.length > 0 && (
          <div style={{ marginBottom: '56px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--gold)', boxShadow: '0 0 8px var(--gold)', animation: 'pulse 2s infinite' }} />
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', letterSpacing: '0.04em', color: 'var(--gold)' }}>UPCOMING</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
              {upcoming.map(t => <TournamentCard key={t._id} tournament={t} />)}
            </div>
          </div>
        )}

        {/* Completed */}
        {completed.length > 0 && (
          <div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', letterSpacing: '0.04em', color: 'var(--white-muted)', marginBottom: '28px' }}>PAST TOURNAMENTS</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
              {completed.map(t => <TournamentCard key={t._id} tournament={t} />)}
            </div>
          </div>
        )}
      </div>
      <style>{`@keyframes pulse{0%,100%{box-shadow:0 0 8px var(--gold)}50%{box-shadow:0 0 16px var(--gold),0 0 24px rgba(201,162,39,0.4)}}`}</style>
    </div>
  )
}

function TournamentCard({ tournament: t }: { tournament: typeof MOCK_TOURNAMENTS[0] }) {
  return (
    <div style={{
      background: 'var(--card-dark)',
      border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: '12px', overflow: 'hidden',
      position: 'relative',
    }} className="card-hover">
      {/* Top stripe by status */}
      <div style={{
        height: '3px',
        background: t.status === 'upcoming' ? 'linear-gradient(90deg, var(--gold), var(--red))' : 'rgba(255,255,255,0.1)',
      }} />

      <div style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <span style={{
            fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 700,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            padding: '4px 12px', borderRadius: '20px',
            ...(t.status === 'upcoming'
              ? { background: 'rgba(201,162,39,0.1)', color: 'var(--gold)', border: '1px solid rgba(201,162,39,0.25)' }
              : { background: 'rgba(255,255,255,0.05)', color: 'var(--white-muted)', border: '1px solid rgba(255,255,255,0.1)' }),
          }}>
            {t.status === 'upcoming' ? '🔴 Open' : '✅ Completed'}
          </span>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--white-muted)' }}>{t.edition}</span>
        </div>

        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '26px', letterSpacing: '0.04em', color: 'var(--white)', marginBottom: '16px', lineHeight: 1.1 }}>
          {t.name}
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
          {[
            { icon: '📅', val: `${new Date(t.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} – ${new Date(t.endDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}` },
            { icon: '📍', val: t.location },
            { icon: '🏆', val: t.totalPrize || '—' },
            { icon: '👥', val: `${t.registeredTeams}/${t.maxTeams} teams` },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '13px', flexShrink: 0 }}>{item.icon}</span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--white-dim)', lineHeight: 1.4 }}>{item.val}</span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <Link href={`/tournament/${t.slug}`} className="btn-primary" style={{ flex: 1, justifyContent: 'center', fontSize: '12px', padding: '11px' }}>
            View Details
          </Link>
          {t.registrationOpen && (
            <Link href="/register" style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600,
              letterSpacing: '0.05em', textTransform: 'uppercase',
              color: 'var(--gold)', border: '1px solid rgba(201,162,39,0.3)',
              borderRadius: '4px', textDecoration: 'none', padding: '11px',
              background: 'rgba(201,162,39,0.06)',
            }}>
              Register →
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
