'use client'
import { useState } from 'react'
import type { SponsorFormData } from '@/types'

type FormState = 'idle' | 'loading' | 'success' | 'error'

const INITIAL: SponsorFormData = {
  businessName: '', contactName: '', phone: '', email: '', website: '', message: '',
}

const TIERS = [
  { name: 'Title Sponsor',  price: '₹25,000+', perks: ['Logo on all tournament materials','Banner placement at venue','Social media shoutouts','Announcements during matches','Certificate of appreciation'], icon: '👑', color: 'var(--gold)' },
  { name: 'Gold Sponsor',   price: '₹15,000+', perks: ['Logo on event posters','Banner at venue entrance','Social media mention','Certificate of appreciation'],  icon: '🥇', color: '#C9A227' },
  { name: 'Silver Sponsor', price: '₹8,000+',  perks: ['Name on event poster','Mention on social media','Certificate of appreciation'],                          icon: '🥈', color: '#A8A8A8' },
  { name: 'General',        price: '₹3,000+',  perks: ['Name on event board','Certificate of appreciation'],                                                      icon: '🤝', color: 'var(--white-muted)' },
]

export default function SponsorsPage() {
  const [form, setForm] = useState<SponsorFormData>(INITIAL)
  const [state, setState] = useState<FormState>('idle')
  const set = (k: keyof SponsorFormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.businessName || !form.phone || !form.email) return
    setState('loading')
    try {
      const res = await fetch('/api/sponsorships', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
      })
      if (res.ok) { setState('success'); setForm(INITIAL) }
      else setState('error')
    } catch { setState('error') }
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
          fontFamily: 'var(--font-heading)', fontSize: '150px',
          color: 'transparent', WebkitTextStroke: '1px rgba(192,57,43,0.05)',
          pointerEvents: 'none', userSelect: 'none', lineHeight: 1,
        }}>SPONSOR</div>
        <div className="container-xl" style={{ position: 'relative' }}>
          <div className="section-eyebrow" style={{ marginBottom: '8px' }}>Partner With Us</div>
          <h1 className="section-title">Sponsorships</h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--white-muted)', marginTop: '12px', maxWidth: '540px' }}>
            Support Kabaddi. Support community. Your brand reaches thousands of fans across Tamil Nadu&apos;s most passionate sporting event.
          </p>
        </div>
      </div>

      <div className="container-xl section-py">
        {/* Sponsorship tiers */}
        <div style={{ marginBottom: '64px' }}>
          <div className="section-eyebrow" style={{ marginBottom: '8px' }}>Sponsorship Packages</div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '36px', letterSpacing: '0.04em', color: 'var(--white)', marginBottom: '32px' }}>
            CHOOSE YOUR TIER
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
            {TIERS.map((tier, i) => (
              <div
                key={tier.name}
                style={{
                  background: i === 0 ? 'linear-gradient(135deg,rgba(201,162,39,0.12),rgba(201,162,39,0.04))' : 'var(--card-dark)',
                  border: `1px solid ${i === 0 ? 'rgba(201,162,39,0.35)' : 'rgba(255,255,255,0.06)'}`,
                  borderRadius: '12px', padding: '24px',
                  transform: i === 0 ? 'scale(1.02)' : 'none',
                  position: 'relative',
                }} className="card-hover"
              >
                {i === 0 && (
                  <div style={{
                    position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)',
                    background: 'var(--gold)', color: 'var(--black)',
                    fontFamily: 'var(--font-body)', fontSize: '9px', fontWeight: 800,
                    letterSpacing: '0.12em', textTransform: 'uppercase',
                    padding: '4px 14px', borderRadius: '20px', whiteSpace: 'nowrap',
                  }}>Most Visibility</div>
                )}
                <div style={{ fontSize: '28px', marginBottom: '10px' }}>{tier.icon}</div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', color: tier.color, letterSpacing: '0.04em', marginBottom: '4px' }}>{tier.name}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 600, color: 'var(--white)', marginBottom: '16px' }}>{tier.price}</div>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '16px' }}>
                  {tier.perks.map((perk, j) => (
                    <div key={j} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                      <span style={{ color: tier.color, flexShrink: 0, fontSize: '12px' }}>✓</span>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--white-dim)', lineHeight: 1.5 }}>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interest form */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '40px', alignItems: 'start' }}>
          <div>
            <div className="section-eyebrow" style={{ marginBottom: '8px' }}>Express Interest</div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '36px', letterSpacing: '0.04em', color: 'var(--white)', marginBottom: '8px' }}>
              BECOME A SPONSOR
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--white-muted)', marginBottom: '32px', lineHeight: 1.6 }}>
              Fill out this form and our team will reach out within 48 hours to discuss the sponsorship package that fits your brand.
            </p>

            {state === 'success' ? (
              <div style={{
                background: 'rgba(60,200,60,0.08)', border: '1px solid rgba(60,200,60,0.25)',
                borderRadius: '10px', padding: '32px', textAlign: 'center',
              }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>🤝</div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', color: 'var(--white)', marginBottom: '10px' }}>INTEREST RECEIVED!</div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--white-muted)', lineHeight: 1.7 }}>
                  Thank you for your interest! Our team will contact you within 48 hours to discuss sponsorship details.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                {state === 'error' && (
                  <div style={{ background: 'rgba(192,57,43,0.1)', border: '1px solid rgba(192,57,43,0.4)', borderRadius: '8px', padding: '14px 18px', marginBottom: '24px', fontFamily: 'var(--font-body)', fontSize: '14px', color: '#E8735A' }}>
                    Something went wrong. Please try again.
                  </div>
                )}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  {[
                    { label: 'Business Name *', key: 'businessName' as const, placeholder: 'Your company or shop name' },
                    { label: 'Contact Person *', key: 'contactName' as const, placeholder: 'Full name' },
                    { label: 'Phone Number *', key: 'phone' as const, placeholder: '10-digit mobile number' },
                    { label: 'Email Address *', key: 'email' as const, placeholder: 'business@example.com' },
                    { label: 'Website', key: 'website' as const, placeholder: 'www.yourbusiness.com (optional)' },
                  ].map(field => (
                    <div key={field.key} style={{ gridColumn: field.key === 'website' ? 'span 2' : 'span 1' }}>
                      <label className="form-label">{field.label}</label>
                      <input type="text" placeholder={field.placeholder} value={form[field.key] as string} onChange={set(field.key)} className="form-input" required={field.label.includes('*')} />
                    </div>
                  ))}
                  <div style={{ gridColumn: 'span 2' }}>
                    <label className="form-label">Message / Sponsorship Tier Interest</label>
                    <textarea placeholder="Tell us about your business and which sponsorship tier interests you…" value={form.message} onChange={set('message')} className="form-input" rows={4} style={{ resize: 'vertical' }} />
                  </div>
                </div>
                <button type="submit" disabled={state === 'loading'} className="btn-primary btn-gold" style={{ padding: '15px 36px', fontSize: '14px', opacity: state === 'loading' ? 0.7 : 1 }}>
                  {state === 'loading' ? 'Sending…' : 'Send Sponsorship Interest →'}
                </button>
              </form>
            )}
          </div>

          {/* Why sponsor */}
          <div style={{ position: 'sticky', top: '100px' }}>
            <div style={{ background: 'var(--card-dark)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '24px' }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', letterSpacing: '0.04em', color: 'var(--white)', marginBottom: '20px' }}>
                WHY SPONSOR JOF?
              </div>
              {[
                { icon: '👁️', title: '500+ Community', desc: 'Reach over 500 local residents and sports fans' },
                { icon: '📱', title: 'Social Reach', desc: 'Coverage across Facebook, Instagram & WhatsApp groups' },
                { icon: '📅', title: 'Annual Events', desc: 'Multiple tournaments per year — recurring visibility' },
                { icon: '🤝', title: 'Local Trust', desc: 'Align with a respected community institution since 2017' },
                { icon: '🏆', title: 'Championship Moments', desc: 'Your brand at the most emotional, viral sporting moments' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: '16px', paddingBottom: '16px', borderBottom: i < 4 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                  <span style={{ fontSize: '20px', flexShrink: 0 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, color: 'var(--white)', marginBottom: '3px' }}>{item.title}</div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--white-muted)', lineHeight: 1.5 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
