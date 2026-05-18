import Link from 'next/link'

export default function CtaSection() {
  return (
    <section style={{
      background: 'var(--black-soft)',
      padding: '80px 0',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background pattern */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(192,57,43,0.03) 10px, rgba(192,57,43,0.03) 20px)',
      }} />
      {/* Glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: '700px', height: '300px',
        background: 'radial-gradient(ellipse, rgba(192,57,43,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container-xl" style={{ position: 'relative', textAlign: 'center' }}>
        {/* Trophy icon */}
        <div style={{ fontSize: '48px', marginBottom: '20px', filter: 'drop-shadow(0 0 16px rgba(201,162,39,0.4))' }}>🏆</div>

        <div className="section-eyebrow" style={{ marginBottom: '12px', textAlign: 'center' }}>
          Join the Legacy
        </div>

        <h2 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(36px, 7vw, 80px)',
          lineHeight: '0.92',
          letterSpacing: '0.02em',
          color: 'var(--white)',
          marginBottom: '24px',
        }}>
          READY TO<br />
          <span style={{
            background: 'linear-gradient(135deg, var(--gold-light), var(--gold))',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
            COMPETE?
          </span>
        </h2>

        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(14px, 2vw, 17px)',
          color: 'var(--white-muted)',
          maxWidth: '500px',
          margin: '0 auto 40px',
          lineHeight: 1.7,
        }}>
          Register your team for the JOF Kabaddi Cup 2025. 32 slots. Only{' '}
          <span style={{ color: 'var(--gold)', fontWeight: 600 }}>14 spots remaining.</span>
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
          <Link href="/register" className="btn-primary btn-gold" style={{ fontSize: '15px', padding: '16px 36px' }}>
            Register Your Team →
          </Link>
          <Link href="/sponsors" className="btn-outline btn-primary" style={{ background: 'transparent', borderColor: 'rgba(255,255,255,0.15)', color: 'var(--white)', fontSize: '15px', padding: '16px 36px' }}>
            Become a Sponsor
          </Link>
        </div>

        {/* Trust signals */}
        <div style={{ marginTop: '48px', display: 'flex', flexWrap: 'wrap', gap: '32px', justifyContent: 'center' }}>
          {[
            { icon: '✅', text: 'Free Registration' },
            { icon: '📧', text: 'Instant Confirmation' },
            { icon: '🏆', text: '₹75,000 Prize Pool' },
            { icon: '📋', text: 'Standard Rules Apply' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '16px' }}>{item.icon}</span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 500, color: 'var(--white-dim)' }}>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
