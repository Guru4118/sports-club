import { ACHIEVEMENTS } from '@/lib/mockData'

export default function AchievementsSection() {
  return (
    <section className="section-py" style={{ background: 'var(--black-soft)', position: 'relative', overflow: 'hidden' }}>
      {/* Large background text */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        fontFamily: 'var(--font-heading)', fontSize: 'clamp(80px, 15vw, 200px)',
        color: 'transparent',
        WebkitTextStroke: '1px rgba(192,57,43,0.05)',
        whiteSpace: 'nowrap', pointerEvents: 'none', userSelect: 'none',
        letterSpacing: '0.04em',
      }}>CHAMPIONS</div>

      <div className="container-xl" style={{ position: 'relative' }}>
        <div style={{ marginBottom: '48px', textAlign: 'center' }}>
          <div className="section-eyebrow" style={{ marginBottom: '8px' }}>Our Legacy</div>
          <h2 className="section-title">Hall of Fame</h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--white-muted)', marginTop: '12px', maxWidth: '480px', margin: '12px auto 0' }}>
            Eight years of dedication. Dozens of trophies. One community.
          </p>
        </div>

        {/* Timeline */}
        <div style={{ position: 'relative', maxWidth: '700px', margin: '0 auto' }}>
          {/* Vertical line */}
          <div style={{
            position: 'absolute', left: '50%', top: 0, bottom: 0,
            width: '1px',
            background: 'linear-gradient(to bottom, transparent, var(--red) 10%, var(--red) 90%, transparent)',
            transform: 'translateX(-50%)',
          }} />

          {ACHIEVEMENTS.map((a, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                justifyContent: i % 2 === 0 ? 'flex-start' : 'flex-end',
                marginBottom: '32px',
                position: 'relative',
              }}
            >
              {/* Center dot */}
              <div style={{
                position: 'absolute', left: '50%', top: '20px',
                transform: 'translate(-50%, -50%)',
                width: '12px', height: '12px', borderRadius: '50%',
                background: 'var(--red)',
                border: '2px solid var(--black-soft)',
                boxShadow: '0 0 8px rgba(192,57,43,0.6)',
                zIndex: 1,
              }} />

              {/* Card */}
              <div style={{
                width: '44%',
                background: 'var(--card-dark)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '10px',
                padding: '16px 18px',
                position: 'relative',
              }}>
                <div style={{
                  fontFamily: 'var(--font-display)', fontSize: '13px', fontWeight: 600,
                  color: 'var(--red)', letterSpacing: '0.06em', marginBottom: '6px',
                }}>
                  {a.year}
                </div>
                <div style={{
                  fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 600,
                  color: 'var(--gold-light)', marginBottom: '4px', lineHeight: 1.2,
                }}>
                  {a.title}
                </div>
                <div style={{
                  fontFamily: 'var(--font-body)', fontSize: '12px',
                  color: 'var(--white-muted)', lineHeight: 1.4,
                }}>
                  {a.event}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: Stack vertically */}
        <style>{`
          @media (max-width: 600px) {
            .achievement-timeline-line { display: none; }
            .achievement-card-wrap { justify-content: flex-start !important; }
            .achievement-card { width: 100% !important; }
          }
        `}</style>
      </div>
    </section>
  )
}
