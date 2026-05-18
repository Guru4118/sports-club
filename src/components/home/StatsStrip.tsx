'use client'
import { useEffect, useRef, useState } from 'react'
import { CLUB_STATS } from '@/lib/mockData'

export default function StatsStrip() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{
        background: 'linear-gradient(135deg, var(--red-dark) 0%, var(--red) 50%, var(--red-dark) 100%)',
        borderTop: '1px solid rgba(201,162,39,0.2)',
        borderBottom: '1px solid rgba(201,162,39,0.2)',
        padding: '32px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background pattern */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(0,0,0,0.06) 10px, rgba(0,0,0,0.06) 20px)',
      }} />

      <div className="container-xl" style={{ position: 'relative' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '24px' }}>
          {CLUB_STATS.map((stat, i) => (
            <div
              key={i}
              style={{
                textAlign: 'center',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(16px)',
                transition: `all 0.5s ease ${i * 0.1}s`,
              }}
            >
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(36px, 5vw, 56px)',
                fontWeight: 600,
                color: 'var(--gold-light)',
                lineHeight: 1,
                letterSpacing: '0.02em',
                textShadow: '0 0 20px rgba(232,190,69,0.4)',
              }}>
                {stat.value}
              </div>
              <div style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.7)',
                marginTop: '4px',
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
