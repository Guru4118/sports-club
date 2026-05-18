'use client'
import { useState } from 'react'
import { MOCK_TOURNAMENTS } from '@/lib/mockData'
import type { RegistrationFormData } from '@/types'

type FormState = 'idle' | 'loading' | 'success' | 'error'

const INITIAL: RegistrationFormData = {
  teamName: '', captainName: '', contactPhone: '', contactEmail: '',
  playerCount: 12, location: '', district: '', experience: '', message: '',
  tournamentId: MOCK_TOURNAMENTS[0]?._id || '',
}

export default function RegisterPage() {
  const [form, setForm] = useState<RegistrationFormData>(INITIAL)
  const [state, setState] = useState<FormState>('idle')
  const [errors, setErrors] = useState<Partial<Record<keyof RegistrationFormData, string>>>({})

  const set = (k: keyof RegistrationFormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  const validate = () => {
    const errs: typeof errors = {}
    if (!form.teamName.trim())      errs.teamName     = 'Team name is required'
    if (!form.captainName.trim())   errs.captainName  = 'Captain name is required'
    if (!/^\d{10}$/.test(form.contactPhone.replace(/\s/g, ''))) errs.contactPhone = 'Enter a valid 10-digit phone number'
    if (!/\S+@\S+\.\S+/.test(form.contactEmail)) errs.contactEmail = 'Enter a valid email address'
    if (!form.location.trim())      errs.location     = 'Location is required'
    if (!form.tournamentId)         errs.tournamentId = 'Please select a tournament'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setState('loading')
    try {
      const res = await fetch('/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) { setState('success'); setForm(INITIAL) }
      else setState('error')
    } catch { setState('error') }
  }

  if (state === 'success') {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--black)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div style={{ textAlign: 'center', maxWidth: '480px' }}>
          <div style={{ fontSize: '72px', marginBottom: '24px', filter: 'drop-shadow(0 0 20px rgba(201,162,39,0.4))' }}>🏆</div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '48px', letterSpacing: '0.04em', color: 'var(--white)', marginBottom: '16px' }}>
            REGISTRATION RECEIVED!
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'var(--white-muted)', lineHeight: 1.7, marginBottom: '24px' }}>
            Thank you! We&apos;ve received your team registration. A confirmation email will be sent to <span style={{ color: 'var(--gold)' }}>{form.contactEmail}</span> within 24 hours.
          </p>
          <div style={{ background: 'var(--card-dark)', border: '1px solid rgba(201,162,39,0.2)', borderRadius: '10px', padding: '20px', marginBottom: '28px', textAlign: 'left' }}>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--white-muted)', marginBottom: '12px' }}>What's Next</div>
            {['Admin reviews your application within 24 hours', 'Confirmation email sent to your address', 'Report to venue 30 minutes before match', 'Bring valid ID proof for all players'].map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                <span style={{ color: 'var(--gold)', flexShrink: 0 }}>✓</span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--white-dim)' }}>{step}</span>
              </div>
            ))}
          </div>
          <button onClick={() => setState('idle')} className="btn-primary">
            Register Another Team
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--black)' }}>
      {/* Header */}
      <div style={{
        background: 'var(--black-soft)', borderBottom: '1px solid rgba(192,57,43,0.2)',
        padding: '48px 0 40px', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-heading)', fontSize: '160px',
          color: 'transparent', WebkitTextStroke: '1px rgba(192,57,43,0.05)',
          pointerEvents: 'none', userSelect: 'none', lineHeight: 1,
        }}>REGISTER</div>
        <div className="container-xl" style={{ position: 'relative' }}>
          <div className="section-eyebrow" style={{ marginBottom: '8px' }}>Join the Battle</div>
          <h1 className="section-title">Register Your Team</h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--white-muted)', marginTop: '12px', maxWidth: '480px' }}>
            Fill out the form below. Registration is free. We&apos;ll confirm your slot within 24 hours.
          </p>
        </div>
      </div>

      <div className="container-xl section-py">
      <div
  className="register-grid"
  style={{
    display: 'grid',
    gridTemplateColumns: '1fr 320px',
    gap: '40px',
    alignItems: 'start',
  }}
>

          {/* ── Form ── */}
          <form onSubmit={handleSubmit} noValidate>
            {state === 'error' && (
              <div style={{
                background: 'rgba(192,57,43,0.1)', border: '1px solid rgba(192,57,43,0.4)',
                borderRadius: '8px', padding: '14px 18px', marginBottom: '24px',
                fontFamily: 'var(--font-body)', fontSize: '14px', color: '#E8735A',
              }}>
                Something went wrong. Please try again or contact us directly.
              </div>
            )}

            {/* Tournament select */}
            <div style={{ marginBottom: '24px' }}>
              <label className="form-label">Select Tournament *</label>
              <select value={form.tournamentId} onChange={set('tournamentId')} className="form-input" style={{ cursor: 'pointer' }}>
                <option value="">Choose a tournament…</option>
                {MOCK_TOURNAMENTS.filter(t => t.registrationOpen).map(t => (
                  <option key={t._id} value={t._id}>{t.name} — {t.edition}</option>
                ))}
              </select>
              {errors.tournamentId && <div style={{ color: '#E8735A', fontFamily: 'var(--font-body)', fontSize: '12px', marginTop: '6px' }}>{errors.tournamentId}</div>}
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '24px', marginBottom: '24px' }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--white-muted)', marginBottom: '20px' }}>
                Team Information
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {[
                  { label: 'Team Name *', key: 'teamName' as const, placeholder: 'e.g. Maniyambet Warriors', type: 'text' },
                  { label: 'Captain Name *', key: 'captainName' as const, placeholder: 'Full name of team captain', type: 'text' },
                  { label: 'Captain Phone *', key: 'contactPhone' as const, placeholder: '10-digit mobile number', type: 'tel' },
                  { label: 'Email Address *', key: 'contactEmail' as const, placeholder: 'captain@example.com', type: 'email' },
                  { label: 'City / Town *', key: 'location' as const, placeholder: 'e.g. Dharmapuri', type: 'text' },
                  { label: 'District', key: 'district' as const, placeholder: 'e.g. Dharmapuri District', type: 'text' },
                ].map(field => (
                  <div key={field.key} style={{ gridColumn: ['teamName','captainName'].includes(field.key) ? 'span 1' : 'span 1' }}>
                    <label className="form-label">{field.label}</label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={form[field.key] as string}
                      onChange={set(field.key)}
                      className="form-input"
                    />
                    {errors[field.key] && <div style={{ color: '#E8735A', fontFamily: 'var(--font-body)', fontSize: '12px', marginTop: '6px' }}>{errors[field.key]}</div>}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '24px', marginBottom: '24px' }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--white-muted)', marginBottom: '20px' }}>
                Additional Details
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {/* Player count */}
                <div>
                  <label className="form-label">Number of Players</label>
                  <select value={form.playerCount} onChange={set('playerCount')} className="form-input" style={{ cursor: 'pointer' }}>
                    {[7,8,9,10,11,12].map(n => <option key={n} value={n}>{n} players</option>)}
                  </select>
                </div>
                {/* Experience */}
                <div>
                  <label className="form-label">Team Experience</label>
                  <select value={form.experience} onChange={set('experience')} className="form-input" style={{ cursor: 'pointer' }}>
                    <option value="">Select…</option>
                    <option value="beginner">Beginner (0–1 years)</option>
                    <option value="intermediate">Intermediate (2–5 years)</option>
                    <option value="experienced">Experienced (5+ years)</option>
                  </select>
                </div>
              </div>

              <div style={{ marginTop: '16px' }}>
                <label className="form-label">Additional Message</label>
                <textarea
                  placeholder="Any special requirements, questions, or information about your team…"
                  value={form.message}
                  onChange={set('message')}
                  className="form-input"
                  rows={4}
                  style={{ resize: 'vertical', minHeight: '100px' }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={state === 'loading'}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', fontSize: '15px', padding: '16px', opacity: state === 'loading' ? 0.7 : 1 }}
            >
              {state === 'loading' ? 'Submitting…' : 'Submit Registration →'}
            </button>

            <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--white-muted)', textAlign: 'center', marginTop: '12px' }}>
              By registering, you agree to follow tournament rules and guidelines.
            </p>
          </form>

          {/* ── Sidebar info ── */}
          <div style={{ position: 'sticky', top: '100px' }}>
            <div style={{
              background: 'var(--card-dark)', border: '1px solid rgba(201,162,39,0.2)',
              borderRadius: '12px', padding: '24px', marginBottom: '16px',
            }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', letterSpacing: '0.04em', color: 'var(--white)', marginBottom: '16px' }}>
                REGISTRATION INFO
              </div>
              {[
                { icon: '✅', title: 'Free Entry', desc: 'No registration fee for Phase 1 tournaments' },
                { icon: '📧', title: 'Email Confirmation', desc: 'Receive slot confirmation within 24 hours' },
                { icon: '📋', title: '12 Players Max', desc: '7 on field + 5 substitutes per team' },
                { icon: '🪪', title: 'ID Required', desc: 'All players must carry valid ID on match day' },
                { icon: '⏰', title: 'Report Early', desc: '30 min before scheduled match time' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: '16px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '18px', flexShrink: 0 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, color: 'var(--white)', marginBottom: '2px' }}>{item.title}</div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--white-muted)', lineHeight: 1.5 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: 'rgba(192,57,43,0.06)', border: '1px solid rgba(192,57,43,0.2)', borderRadius: '10px', padding: '18px' }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, color: 'var(--white-dim)', marginBottom: '8px' }}>Need help?</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--white-muted)', lineHeight: 1.6 }}>
                Contact us at <span style={{ color: 'var(--red)' }}>jeevaoli.friends@gmail.com</span> or call <span style={{ color: 'var(--red)' }}>+91 98765 43210</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .register-grid { grid-template-columns: 1fr !important; }
          .register-form-cols { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
