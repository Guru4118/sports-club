'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false)
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <section
      ref={heroRef}
      style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'var(--black)',
      }}
    >
      {/* Animated background grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          linear-gradient(rgba(192,57,43,0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(192,57,43,0.05) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        opacity: 0.6,
      }} />

      {/* Large background JO letters */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        pointerEvents: 'none', userSelect: 'none',
        overflow: 'hidden',
      }}>
        <span style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(200px, 35vw, 420px)',
          color: 'transparent',
          WebkitTextStroke: '1px rgba(192,57,43,0.08)',
          letterSpacing: '-0.02em',
          lineHeight: 1,
          transform: 'translateY(8%)',
        }}>JOF</span>
      </div>

      {/* Red glow orbs */}
      <div style={{
        position: 'absolute', top: '20%', right: '10%',
        width: '300px', height: '300px',
        background: 'radial-gradient(circle, rgba(192,57,43,0.15) 0%, transparent 70%)',
        filter: 'blur(40px)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '20%', left: '5%',
        width: '200px', height: '200px',
        background: 'radial-gradient(circle, rgba(201,162,39,0.1) 0%, transparent 70%)',
        filter: 'blur(40px)',
        pointerEvents: 'none',
      }} />

      {/* Diagonal red accent slash */}
      <div style={{
        position: 'absolute', top: 0, right: '15%',
        width: '3px', height: '60%',
        background: 'linear-gradient(to bottom, var(--red) 0%, transparent 100%)',
        transform: 'skewX(-12deg)',
        opacity: 0.5,
      }} />

      {/* Main content */}
      <div className="container-xl" style={{ position: 'relative', zIndex: 2, paddingTop: '60px', paddingBottom: '80px' }}>
        <div style={{ maxWidth: '800px' }}>

          {/* Eyebrow */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            marginBottom: '24px',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease 0.1s',
          }}>
            <div style={{
              width: '8px', height: '8px', borderRadius: '50%',
              background: 'var(--red)',
              boxShadow: '0 0 8px var(--red)',
              animation: 'pulse 2s ease-in-out infinite',
            }} />
            <span style={{
              fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'var(--gold)',
            }}>
              Maniyambet&apos;s Premier Kabaddi Club
            </span>
          </div>

          {/* Main heading */}
          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(52px, 11vw, 130px)',
            lineHeight: '0.92',
            letterSpacing: '0.01em',
            marginBottom: '8px',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(32px)',
            transition: 'all 0.7s ease 0.2s',
          }}>
            <span style={{ display: 'block', color: 'var(--white)' }}>JEEVA</span>
            <span style={{ display: 'block', color: 'var(--white)' }}>OLI</span>
            <span style={{
              display: 'block',
              background: 'linear-gradient(135deg, var(--gold-light) 0%, var(--gold) 60%, var(--gold-dim) 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              textShadow: 'none',
            }}>FRIENDS</span>
          </h1>

          {/* Tamil subtitle */}
          <div style={{
            fontFamily: 'var(--font-tamil)',
            fontSize: 'clamp(18px, 3vw, 28px)',
            color: 'rgba(200,200,194,0.5)',
            letterSpacing: '0.06em',
            marginBottom: '32px',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.7s ease 0.35s',
          }}>
            ஜீவ ஒளி நண்பர்கள்
          </div>

          {/* Tagline */}
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(15px, 2vw, 18px)',
            color: 'var(--white-dim)',
            lineHeight: 1.6,
            maxWidth: '520px',
            marginBottom: '40px',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.7s ease 0.45s',
          }}>
            We don&apos;t just play Kabaddi — we live it. Built on sweat, pride, and 
            the spirit of Maniyambet. Eight years of dominance on the mat.
          </p>

          {/* CTAs */}
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: '16px',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.7s ease 0.55s',
          }}>
            <Link href="/register" className="btn-primary" style={{ fontSize: '14px' }}>
              Register Your Team →
            </Link>
            <Link href="/tournament" className="btn-outline btn-primary" style={{ background: 'transparent', borderColor: 'rgba(255,255,255,0.2)', color: 'var(--white)' }}>
              View Tournaments
            </Link>
          </div>

          {/* Upcoming tournament badge */}
          <div style={{
            marginTop: '48px',
            display: 'inline-flex', alignItems: 'center', gap: '12px',
            background: 'rgba(192,57,43,0.1)',
            border: '1px solid rgba(192,57,43,0.3)',
            borderRadius: '8px', padding: '12px 20px',
            opacity: loaded ? 1 : 0,
            transition: 'all 0.7s ease 0.7s',
          }}>
            <div style={{
              width: '8px', height: '8px', borderRadius: '50%',
              background: 'var(--gold)', flexShrink: 0,
              boxShadow: '0 0 8px var(--gold)',
            }} />
            <div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '2px' }}>
                Next Tournament
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 500, color: 'var(--white)' }}>
                JOF Kabaddi Cup — 5th Edition · June 15–17, 2025
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: '40px', left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
        opacity: loaded ? 0.5 : 0, transition: 'opacity 0.7s ease 1s',
      }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--white-muted)' }}>Scroll</span>
        <div style={{
          width: '1px', height: '40px',
          background: 'linear-gradient(to bottom, var(--white-muted), transparent)',
          animation: 'float 2s ease-in-out infinite',
        }} />
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{box-shadow:0 0 8px var(--red)} 50%{box-shadow:0 0 16px var(--red),0 0 24px rgba(192,57,43,0.4)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(8px)} }
      `}</style>
    </section>
  )
}
