'use client'
import { useState } from 'react'
import { MOCK_PLAYERS } from '@/lib/mockData'
import type { Player, PlayerRole } from '@/types'

const ROLE_BADGE: Record<PlayerRole, string> = {
  'Raider':      'badge-raider',
  'Defender':    'badge-defender',
  'All-Rounder': 'badge-allround',
}

const BLANK_PLAYER: Omit<Player, '_id' | 'active'> = {
  name: '', jerseyNumber: 1, role: 'Raider', photoUrl: '',
  achievements: [], bio: '', hometown: '', joinedYear: new Date().getFullYear(),
}

export default function AdminPlayersPage() {
  const [players, setPlayers] = useState<Player[]>(MOCK_PLAYERS)
  const [showForm, setShowForm]   = useState(false)
  const [editId, setEditId]       = useState<string | null>(null)
  const [form, setForm] = useState<typeof BLANK_PLAYER>({ ...BLANK_PLAYER })

  const set = (k: keyof typeof BLANK_PLAYER) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: k === 'jerseyNumber' || k === 'joinedYear' ? Number(e.target.value) : e.target.value }))

  const handleSave = () => {
    if (!form.name) return
    if (editId) {
      setPlayers(prev => prev.map(p => p._id === editId ? { ...p, ...form } : p))
      setEditId(null)
    } else {
      setPlayers(prev => [...prev, { ...form, _id: Date.now().toString(), active: true }])
    }
    setForm({ ...BLANK_PLAYER })
    setShowForm(false)
  }

  const startEdit = (p: Player) => {
    setForm({ name: p.name, jerseyNumber: p.jerseyNumber, role: p.role, photoUrl: p.photoUrl || '', achievements: p.achievements, bio: p.bio || '', hometown: p.hometown || '', joinedYear: p.joinedYear || new Date().getFullYear() })
    setEditId(p._id)
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const toggleActive = (id: string) => setPlayers(prev => prev.map(p => p._id === id ? { ...p, active: !p.active } : p))
  const deletePlayer = (id: string) => setPlayers(prev => prev.filter(p => p._id !== id))

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', letterSpacing: '0.04em', color: 'var(--white)', lineHeight: 1 }}>PLAYERS</h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--white-muted)', marginTop: '4px' }}>
            {players.filter(p => p.active).length} active · {players.length} total players
          </p>
        </div>
        <button
          onClick={() => { setForm({ ...BLANK_PLAYER }); setEditId(null); setShowForm(!showForm) }}
          className="btn-primary" style={{ fontSize: '13px', padding: '10px 20px' }}
        >
          + Add Player
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div style={{ background: '#1A1A1C', border: '1px solid rgba(192,57,43,0.3)', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--white-muted)', marginBottom: '16px' }}>
            {editId ? 'Edit Player' : 'New Player'}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', marginBottom: '14px' }}>
            <div>
              <label className="form-label">Full Name *</label>
              <input type="text" value={form.name} onChange={set('name')} className="form-input" placeholder="Player name" />
            </div>
            <div>
              <label className="form-label">Jersey #</label>
              <input type="number" value={form.jerseyNumber} onChange={set('jerseyNumber')} className="form-input" min={1} max={99} />
            </div>
            <div>
              <label className="form-label">Role</label>
              <select value={form.role} onChange={set('role')} className="form-input" style={{ cursor: 'pointer' }}>
                <option value="Raider">⚡ Raider</option>
                <option value="Defender">🛡️ Defender</option>
                <option value="All-Rounder">⭐ All-Rounder</option>
              </select>
            </div>
            <div>
              <label className="form-label">Hometown</label>
              <input type="text" value={form.hometown} onChange={set('hometown')} className="form-input" placeholder="City / Town" />
            </div>
            <div>
              <label className="form-label">Joined Year</label>
              <input type="number" value={form.joinedYear} onChange={set('joinedYear')} className="form-input" min={2010} max={2030} />
            </div>
            <div>
              <label className="form-label">Photo URL</label>
              <input type="url" value={form.photoUrl} onChange={set('photoUrl')} className="form-input" placeholder="https://..." />
            </div>
          </div>
          <div style={{ marginBottom: '14px' }}>
            <label className="form-label">Bio</label>
            <textarea value={form.bio} onChange={set('bio')} className="form-input" placeholder="Short player bio…" rows={3} style={{ resize: 'vertical' }} />
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={handleSave} className="btn-primary" style={{ fontSize: '13px', padding: '10px 24px' }}>
              {editId ? 'Update Player' : 'Save Player'}
            </button>
            <button onClick={() => { setShowForm(false); setEditId(null) }} className="btn-primary" style={{ fontSize: '13px', padding: '10px 24px', background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: 'var(--white)' }}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Player cards grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '14px' }}>
        {players.map((p, i) => (
          <div key={p._id} style={{
            background: '#1A1A1C', border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '10px', padding: '18px',
            opacity: p.active ? 1 : 0.5,
            position: 'relative', overflow: 'hidden',
          }}>
            {/* Ghost number */}
            <div style={{ position: 'absolute', bottom: '-8px', right: '-4px', fontFamily: 'var(--font-heading)', fontSize: '72px', color: 'rgba(201,162,39,0.05)', lineHeight: 1, pointerEvents: 'none' }}>
              {p.jerseyNumber}
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '12px' }}>
              {/* Avatar */}
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--red-dark), var(--card-mid))', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', border: '1px solid rgba(201,162,39,0.15)' }}>
                {['🧑','👨','🧔','👦'][i % 4]}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 600, color: 'var(--white)', lineHeight: 1.1 }}>{p.name}</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--gold)', marginTop: '2px' }}>#{p.jerseyNumber}</div>
              </div>
              <span className={ROLE_BADGE[p.role]} style={{ fontSize: '9px', fontWeight: 700, fontFamily: 'var(--font-body)', letterSpacing: '0.06em', textTransform: 'uppercase', padding: '2px 8px', borderRadius: '20px', flexShrink: 0 }}>
                {p.role}
              </span>
            </div>

            {p.hometown && (
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--white-muted)', marginBottom: '12px' }}>
                📍 {p.hometown} {p.joinedYear && `· Since ${p.joinedYear}`}
              </div>
            )}

            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              <button onClick={() => startEdit(p)} style={{ flex: 1, fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, padding: '6px 10px', borderRadius: '4px', cursor: 'pointer', background: 'rgba(192,57,43,0.1)', border: '1px solid rgba(192,57,43,0.25)', color: '#E8735A' }}>
                ✏️ Edit
              </button>
              <button onClick={() => toggleActive(p._id)} style={{ flex: 1, fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, padding: '6px 10px', borderRadius: '4px', cursor: 'pointer', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--white-muted)' }}>
                {p.active ? '⏸ Bench' : '▶ Activate'}
              </button>
              <button onClick={() => { if (confirm(`Delete ${p.name}?`)) deletePlayer(p._id) }} style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, padding: '6px 10px', borderRadius: '4px', cursor: 'pointer', background: 'transparent', border: '1px solid rgba(255,255,255,0.08)', color: 'var(--white-muted)' }}>
                🗑
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
