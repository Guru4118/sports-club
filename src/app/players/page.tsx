'use client'
import { useState } from 'react'
import { MOCK_PLAYERS } from '@/lib/mockData'
import type { PlayerRole } from '@/types'

const ROLE_FILTERS: { key: PlayerRole | 'all'; label: string }[] = [
  { key: 'all',          label: 'All Players' },
  { key: 'Raider',       label: '⚡ Raiders' },
  { key: 'Defender',     label: '🛡️ Defenders' },
  { key: 'All-Rounder',  label: '⭐ All-Rounders' },
]

const ROLE_BADGE: Record<PlayerRole, { cls: string; icon: string }> = {
  'Raider':      { cls: 'badge-raider',   icon: '⚡' },
  'Defender':    { cls: 'badge-defender', icon: '🛡️' },
  'All-Rounder': { cls: 'badge-allround', icon: '⭐' },
}

const AVATARS = ['🧑', '👨', '🧔', '👦', '🧑‍🦱', '👨‍🦳', '🧑‍🦰', '👨‍🦱']

export default function PlayersPage() {
  const [roleFilter, setRoleFilter] = useState<PlayerRole | 'all'>('all')
  const [selected, setSelected] = useState<string | null>(null)

  const filtered = MOCK_PLAYERS.filter(p => roleFilter === 'all' || p.role === roleFilter)
  const selectedPlayer = MOCK_PLAYERS.find(p => p._id === selected)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--black)' }}>
      {/* Header */}
      <div style={{
        background: 'var(--black-soft)', borderBottom: '1px solid rgba(192,57,43,0.2)',
        padding: '48px 0 40px', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-heading)', fontSize: '180px',
          color: 'transparent', WebkitTextStroke: '1px rgba(192,57,43,0.05)',
          pointerEvents: 'none', userSelect: 'none', lineHeight: 1,
        }}>SQUAD</div>
        <div className="container-xl" style={{ position: 'relative' }}>
          <div className="section-eyebrow" style={{ marginBottom: '8px' }}>The Warriors</div>
          <h1 className="section-title">Our Squad</h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--white-muted)', marginTop: '12px', maxWidth: '480px' }}>
            Every raider, every defender — built for one goal. Victory.
          </p>
        </div>
      </div>

      <div className="container-xl section-py">
        {/* Role filter */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '36px' }}>
          {ROLE_FILTERS.map(f => (
            <button
              key={f.key}
              onClick={() => setRoleFilter(f.key)}
              style={{
                fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600,
                letterSpacing: '0.05em', textTransform: 'uppercase',
                padding: '10px 20px', borderRadius: '4px', cursor: 'pointer',
                border: '1px solid', transition: 'all 0.2s', minHeight: '44px',
                background: roleFilter === f.key ? 'var(--red)' : 'transparent',
                borderColor: roleFilter === f.key ? 'var(--red)' : 'rgba(255,255,255,0.12)',
                color: roleFilter === f.key ? 'var(--white)' : 'var(--white-muted)',
              }}
            >{f.label}</button>
          ))}
        </div>

        {/* Player grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
          {filtered.map((player, i) => {
            const badge = ROLE_BADGE[player.role]
            return (
              <div
                key={player._id}
                onClick={() => setSelected(player._id === selected ? null : player._id)}
                style={{
                  background: 'var(--card-dark)',
                  border: selected === player._id ? '1px solid rgba(192,57,43,0.5)' : '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '12px', padding: '24px 16px',
                  textAlign: 'center', position: 'relative', overflow: 'hidden',
                  cursor: 'pointer',
                  boxShadow: selected === player._id ? '0 0 20px rgba(192,57,43,0.15)' : 'none',
                  transition: 'all 0.25s ease',
                }}
                className="card-hover"
              >
                {/* Ghost jersey number */}
                <div style={{
                  position: 'absolute', bottom: '-12px', right: '-8px',
                  fontFamily: 'var(--font-heading)', fontSize: '88px',
                  color: 'rgba(201,162,39,0.06)', lineHeight: 1,
                  pointerEvents: 'none', userSelect: 'none',
                }}>
                  {player.jerseyNumber}
                </div>

                {/* Avatar circle */}
                <div style={{
                  width: '80px', height: '80px', borderRadius: '50%',
                  background: `linear-gradient(135deg, var(--red-dark) 0%, var(--card-mid) 100%)`,
                  margin: '0 auto 12px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: selected === player._id ? '2px solid rgba(192,57,43,0.5)' : '2px solid rgba(201,162,39,0.15)',
                  fontSize: '32px', transition: 'border-color 0.25s',
                  position: 'relative',
                }}>
                  {AVATARS[i % AVATARS.length]}
                </div>

                {/* Jersey # */}
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '13px', fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.06em', marginBottom: '4px' }}>
                  #{player.jerseyNumber}
                </div>

                {/* Name */}
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 600, color: 'var(--white)', lineHeight: 1.2, marginBottom: '10px' }}>
                  {player.name}
                </div>

                {/* Role */}
                <span className={badge.cls} style={{
                  display: 'inline-block', fontSize: '10px', fontWeight: 700,
                  fontFamily: 'var(--font-body)', letterSpacing: '0.06em', textTransform: 'uppercase',
                  padding: '3px 10px', borderRadius: '20px',
                }}>
                  {badge.icon} {player.role}
                </span>

                {/* Hometown */}
                {player.hometown && (
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--white-muted)', marginTop: '10px' }}>
                    📍 {player.hometown}
                  </div>
                )}

                {/* Expanded details */}
                {selected === player._id && (
                  <div style={{
                    marginTop: '16px', paddingTop: '16px',
                    borderTop: '1px solid rgba(255,255,255,0.06)',
                    textAlign: 'left',
                  }}>
                    {player.bio && (
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--white-dim)', lineHeight: 1.6, marginBottom: '12px' }}>
                        {player.bio}
                      </p>
                    )}
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--white-muted)', marginBottom: '8px' }}>
                      Achievements
                    </div>
                    {player.achievements.map((a, j) => (
                      <div key={j} style={{ display: 'flex', gap: '6px', marginBottom: '5px', alignItems: 'flex-start' }}>
                        <span style={{ color: 'var(--gold)', fontSize: '10px', flexShrink: 0, marginTop: '3px' }}>🏅</span>
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--white-dim)' }}>{a}</span>
                      </div>
                    ))}
                    {player.joinedYear && (
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--white-muted)', marginTop: '10px' }}>
                        Member since {player.joinedYear}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
