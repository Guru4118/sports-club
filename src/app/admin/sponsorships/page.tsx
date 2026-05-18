'use client'
import { useState } from 'react'
import type { Sponsorship, SponsorshipStatus } from '@/types'

const MOCK_SPONSORS: Sponsorship[] = [
  { _id: '1', businessName: 'Sri Murugan Textiles',  contactName: 'Ganesan K',    phone: '9876543210', email: 'murugan@textiles.com', message: 'Interested in Title Sponsorship for the upcoming tournament.', status: 'new',       submittedAt: '2025-01-12T10:00:00Z' },
  { _id: '2', businessName: 'Maniyambet Medicals',   contactName: 'Dr. Priya R',  phone: '9123456780', email: 'priya@medicals.com',   message: 'Would like to sponsor with Gold tier and provide health support.', status: 'contacted',  submittedAt: '2025-01-08T14:00:00Z' },
  { _id: '3', businessName: 'Raja Auto Works',       contactName: 'Rajendran S',  phone: '8765432100', email: 'raja@auto.com',        message: 'Small business, interested in General sponsorship.', status: 'confirmed',  submittedAt: '2025-01-05T09:00:00Z' },
]

const STATUS_STYLES: Record<SponsorshipStatus, { bg: string; text: string; border: string; label: string }> = {
  new:       { bg: 'rgba(201,162,39,0.1)', text: 'var(--gold)',   border: 'rgba(201,162,39,0.25)', label: '🆕 New' },
  contacted: { bg: 'rgba(26,100,200,0.1)', text: '#6BA3E8',       border: 'rgba(26,100,200,0.3)',  label: '📞 Contacted' },
  confirmed: { bg: 'rgba(60,200,60,0.1)',  text: '#6DB86D',       border: 'rgba(60,200,60,0.25)',  label: '✅ Confirmed' },
}

export default function AdminSponsorshipsPage() {
  const [sponsors, setSponsors] = useState<Sponsorship[]>(MOCK_SPONSORS)

  const updateStatus = (id: string, status: SponsorshipStatus) =>
    setSponsors(prev => prev.map(s => s._id === id ? { ...s, status } : s))

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', letterSpacing: '0.04em', color: 'var(--white)', lineHeight: 1 }}>SPONSORSHIPS</h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--white-muted)', marginTop: '4px' }}>
          {sponsors.filter(s => s.status === 'new').length} new · {sponsors.filter(s => s.status === 'confirmed').length} confirmed
        </p>
      </div>

      {/* Summary stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
        {(['new', 'contacted', 'confirmed'] as SponsorshipStatus[]).map(s => (
          <div key={s} style={{ background: '#1A1A1C', border: `1px solid ${STATUS_STYLES[s].border}`, borderRadius: '10px', padding: '16px', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '36px', fontWeight: 600, color: STATUS_STYLES[s].text, lineHeight: 1 }}>
              {sponsors.filter(sp => sp.status === s).length}
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--white-muted)', marginTop: '4px' }}>
              {s}
            </div>
          </div>
        ))}
      </div>

      {/* Cards */}
      <div style={{ display: 'grid', gap: '14px' }}>
        {sponsors.map(s => {
          const style = STATUS_STYLES[s.status]
          return (
            <div key={s._id} style={{ background: '#1A1A1C', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '14px' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 600, color: 'var(--white)', lineHeight: 1 }}>{s.businessName}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--white-muted)', marginTop: '4px' }}>
                    {s.contactName} · {s.phone} · {s.email}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: '20px', fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, background: style.bg, color: style.text, border: `1px solid ${style.border}` }}>
                    {style.label}
                  </span>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {s.status !== 'contacted' && (
                      <button onClick={() => updateStatus(s._id, 'contacted')} style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', background: 'rgba(26,100,200,0.1)', border: '1px solid rgba(26,100,200,0.3)', color: '#6BA3E8' }}>
                        Mark Contacted
                      </button>
                    )}
                    {s.status !== 'confirmed' && (
                      <button onClick={() => updateStatus(s._id, 'confirmed')} style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', background: 'rgba(60,200,60,0.1)', border: '1px solid rgba(60,200,60,0.3)', color: '#6DB86D' }}>
                        ✓ Confirm
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {s.message && (
                <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '6px', padding: '12px 14px', borderLeft: '2px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--white-muted)', marginBottom: '6px' }}>Message</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--white-dim)', lineHeight: 1.6 }}>{s.message}</div>
                </div>
              )}

              <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--white-muted)', marginTop: '10px' }}>
                Submitted {new Date(s.submittedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
