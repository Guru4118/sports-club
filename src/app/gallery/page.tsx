'use client'
import { useState } from 'react'
import { MOCK_GALLERY } from '@/lib/mockData'
import type { GalleryCategory } from '@/types'

const CATEGORIES: { key: GalleryCategory | 'all'; label: string; icon: string }[] = [
  { key: 'all',         label: 'All',          icon: '🖼️' },
  { key: 'match',       label: 'Matches',      icon: '🏃' },
  { key: 'celebration', label: 'Celebrations', icon: '🎉' },
  { key: 'training',    label: 'Training',     icon: '💪' },
  { key: 'community',   label: 'Community',    icon: '🤝' },
]

export default function GalleryPage() {
  const [category, setCategory] = useState<GalleryCategory | 'all'>('all')
  const [lightbox, setLightbox] = useState<string | null>(null)

  const filtered = MOCK_GALLERY.filter(img => category === 'all' || img.category === category)
  const lightboxImg = MOCK_GALLERY.find(img => img._id === lightbox)

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
        }}>GALLERY</div>
        <div className="container-xl" style={{ position: 'relative' }}>
          <div className="section-eyebrow" style={{ marginBottom: '8px' }}>Memories</div>
          <h1 className="section-title">Gallery</h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--white-muted)', marginTop: '12px', maxWidth: '480px' }}>
            Every photo tells a story. Every moment, a memory etched in sweat and glory.
          </p>
        </div>
      </div>

      <div className="container-xl section-py">
        {/* Category filter */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat.key}
              onClick={() => setCategory(cat.key)}
              style={{
                fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600,
                letterSpacing: '0.06em', textTransform: 'uppercase',
                padding: '9px 16px', borderRadius: '4px', cursor: 'pointer',
                border: '1px solid', transition: 'all 0.2s', minHeight: '40px',
                display: 'flex', alignItems: 'center', gap: '6px',
                background: category === cat.key ? 'var(--red)' : 'transparent',
                borderColor: category === cat.key ? 'var(--red)' : 'rgba(255,255,255,0.12)',
                color: category === cat.key ? 'var(--white)' : 'var(--white-muted)',
              }}
            >
              <span>{cat.icon}</span> {cat.label}
            </button>
          ))}
        </div>

        {/* Count */}
        <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--white-muted)', marginBottom: '20px' }}>
          {filtered.length} photo{filtered.length !== 1 ? 's' : ''}
        </div>

        {/* Masonry-style grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '8px',
        }}>
          {filtered.map((img, i) => (
            <div
              key={img._id}
              onClick={() => setLightbox(img._id)}
              style={{
                position: 'relative',
                borderRadius: '8px', overflow: 'hidden',
                background: 'var(--card-dark)',
                cursor: 'pointer',
                aspectRatio: i % 5 === 0 ? '16/9' : i % 7 === 0 ? '3/4' : '4/3',
                gridColumn: i % 5 === 0 ? 'span 2' : 'span 1',
              }}
            >
              <img
                src={img.thumbnailUrl || img.imageUrl}
                alt={img.caption || ''}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }}
                loading="lazy"
              />
              {/* Hover overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.2) 50%, transparent 100%)',
                opacity: 0, transition: 'opacity 0.3s',
                display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                padding: '16px',
              }} className="gallery-item-overlay">
                {img.caption && (
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--white)', fontWeight: 500, lineHeight: 1.4 }}>
                    {img.caption}
                  </div>
                )}
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: 'var(--white-muted)', marginTop: '4px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  {img.category} · {new Date(img.uploadedAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                </div>
              </div>
              {/* Category chip */}
              <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
                <span style={{
                  fontFamily: 'var(--font-body)', fontSize: '9px', fontWeight: 700,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: 'var(--white)', background: 'rgba(10,10,10,0.65)',
                  padding: '3px 8px', borderRadius: '3px', backdropFilter: 'blur(4px)',
                }}>
                  {img.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--white-muted)', fontFamily: 'var(--font-body)' }}>
            No images in this category yet.
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxImg && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 100,
            background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '24px',
          }}
        >
          <div onClick={e => e.stopPropagation()} style={{ position: 'relative', maxWidth: '900px', width: '100%' }}>
            <img
              src={lightboxImg.imageUrl}
              alt={lightboxImg.caption || ''}
              style={{ width: '100%', borderRadius: '10px', display: 'block', maxHeight: '80vh', objectFit: 'contain' }}
            />
            {lightboxImg.caption && (
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--white-dim)', textAlign: 'center', marginTop: '16px' }}>
                {lightboxImg.caption}
              </div>
            )}
            <button
              onClick={() => setLightbox(null)}
              style={{
                position: 'absolute', top: '-12px', right: '-12px',
                width: '36px', height: '36px', borderRadius: '50%',
                background: 'var(--red)', border: 'none', color: 'var(--white)',
                cursor: 'pointer', fontSize: '16px', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
              }}
            >✕</button>
          </div>
        </div>
      )}

      <style>{`
        .card-hover:hover .gallery-item-overlay { opacity: 1 !important; }
        .card-hover:hover img { transform: scale(1.05); }
        @media (max-width: 640px) {
          .gallery-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>
    </div>
  )
}
