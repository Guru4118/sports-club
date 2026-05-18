import Link from 'next/link'
import { MOCK_PLAYERS } from '@/lib/mockData'
import type { PlayerRole } from '@/types'

const ROLE_STYLES: Record<PlayerRole, { cls: string; label: string }> = {
  'Raider':      { cls: 'badge-raider',   label: 'Raider' },
  'Defender':    { cls: 'badge-defender', label: 'Defender' },
  'All-Rounder': { cls: 'badge-allround', label: 'All-Rounder' },
}

export default function PlayersPreview() {
  const featured = MOCK_PLAYERS.slice(0, 6)

  return (
    <section className="section-py" style={{ background: 'var(--black)', position: 'relative' }}>
      {/* Stripe background */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 20px, rgba(192,57,43,0.015) 20px, rgba(192,57,43,0.015) 40px)',
        pointerEvents: 'none',
      }} />

      <div className="container-xl" style={{ position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div className="section-eyebrow" style={{ marginBottom: '8px' }}>The Squad</div>
            <h2 className="section-title">Our Players</h2>
          </div>
          <Link href="/players" style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, color: 'var(--red)', textDecoration: 'none', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Full Roster →
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '16px' }}>
          {featured.map((player, i) => (
            <div
              key={player._id}
              style={{
                background: 'var(--card-dark)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '10px',
                padding: '20px 16px',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
              }}
              className="card-hover"
            >
              {/* Jersey number (ghost) */}
              <div style={{
                position: 'absolute', top: '-8px', right: '-4px',
                fontFamily: 'var(--font-heading)', fontSize: '72px',
                color: 'rgba(192,57,43,0.06)',
                lineHeight: 1, pointerEvents: 'none', userSelect: 'none',
              }}>
                {player.jerseyNumber}
              </div>

              {/* Avatar */}
              <div style={{
                width: '72px', height: '72px', borderRadius: '50%',
                background: `linear-gradient(135deg, var(--red-dark) 0%, var(--card-mid) 100%)`,
                margin: '0 auto 12px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '2px solid rgba(201,162,39,0.2)',
                fontSize: '28px',
              }}>
                {['🧑', '👨', '🧔', '👦'][i % 4]}
              </div>

              {/* Jersey number badge */}
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '12px', fontWeight: 600,
                color: 'var(--gold)',
                letterSpacing: '0.06em',
                marginBottom: '4px',
              }}>
                #{player.jerseyNumber}
              </div>

              {/* Name */}
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '16px', fontWeight: 600,
                color: 'var(--white)',
                lineHeight: 1.2, marginBottom: '8px',
              }}>
                {player.name}
              </div>

              {/* Role badge */}
              <span
                className={ROLE_STYLES[player.role].cls}
                style={{
                  display: 'inline-block',
                  fontSize: '10px', fontWeight: 700,
                  fontFamily: 'var(--font-body)',
                  letterSpacing: '0.06em', textTransform: 'uppercase',
                  padding: '3px 10px', borderRadius: '20px',
                }}
              >
                {player.role}
              </span>

              {/* Top achievement */}
              {player.achievements[0] && (
                <div style={{
                  marginTop: '10px',
                  fontFamily: 'var(--font-body)', fontSize: '10px',
                  color: 'var(--white-muted)', lineHeight: 1.4,
                }}>
                  🏅 {player.achievements[0]}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link href="/players" className="btn-outline btn-primary" style={{ background: 'transparent', borderColor: 'rgba(255,255,255,0.15)', color: 'var(--white)' }}>
            Meet the Full Squad
          </Link>
        </div>
      </div>
    </section>
  )
}
