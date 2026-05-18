import Link from 'next/link'
import { MOCK_GALLERY } from '@/lib/mockData'

export default function GalleryPreview() {
  const images = MOCK_GALLERY.slice(0, 6)

  return (
    <section className="section-py" style={{ background: 'var(--black)' }}>
      <div className="container-xl">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div className="section-eyebrow" style={{ marginBottom: '8px' }}>Moments</div>
            <h2 className="section-title">Gallery</h2>
          </div>
          <Link href="/gallery" style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, color: 'var(--red)', textDecoration: 'none', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            View All →
          </Link>
        </div>

        {/* Masonry-style grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'auto',
          gap: '8px',
        }}>
          {images.map((img, i) => (
            <div
              key={img._id}
              style={{
                position: 'relative',
                borderRadius: '8px',
                overflow: 'hidden',
                background: 'var(--card-dark)',
                aspectRatio: i === 0 ? '16/10' : i === 3 ? '4/5' : '4/3',
                gridColumn: i === 0 ? '1 / 3' : i === 3 ? '3 / 4' : 'auto',
                gridRow: i === 3 ? '1 / 3' : 'auto',
                cursor: 'pointer',
              }}
              className="card-hover"
            >
              <img
                src={img.thumbnailUrl || img.imageUrl}
                alt={img.caption || 'Gallery image'}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }}
                loading="lazy"
              />
              {/* Overlay on hover */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(10,10,10,0.8) 0%, transparent 60%)',
                opacity: 0, transition: 'opacity 0.3s',
              }} className="gallery-overlay">
                <div style={{ position: 'absolute', bottom: '12px', left: '12px', right: '12px' }}>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--white)', fontWeight: 500 }}>
                    {img.caption}
                  </div>
                </div>
              </div>
              {/* Category tag */}
              <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
                <span style={{
                  fontFamily: 'var(--font-body)', fontSize: '9px', fontWeight: 700,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: 'var(--white)', background: 'rgba(10,10,10,0.7)',
                  padding: '3px 8px', borderRadius: '3px',
                }}>
                  {img.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        <style>{`
          .card-hover:hover .gallery-overlay { opacity: 1 !important; }
          @media (max-width: 640px) {
            .gallery-grid { grid-template-columns: repeat(2,1fr) !important; }
          }
        `}</style>
      </div>
    </section>
  )
}
