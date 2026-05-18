'use client'
import { useState } from 'react'
import { MOCK_GALLERY, MOCK_TOURNAMENTS } from '@/lib/mockData'
import type { GalleryImage, GalleryCategory } from '@/types'

export default function AdminGalleryPage() {
  const [images, setImages]   = useState<GalleryImage[]>(MOCK_GALLERY)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ imageUrl: '', caption: '', category: 'match' as GalleryCategory, tournamentId: '' })
  const [deleted, setDeleted] = useState<string[]>([])

  const handleAdd = () => {
    if (!form.imageUrl) return
    const newImg: GalleryImage = {
      _id: Date.now().toString(),
      imageUrl: form.imageUrl,
      thumbnailUrl: form.imageUrl,
      caption: form.caption,
      category: form.category,
      tournamentId: form.tournamentId || undefined,
      uploadedAt: new Date().toISOString(),
    }
    setImages(prev => [newImg, ...prev])
    setForm({ imageUrl: '', caption: '', category: 'match', tournamentId: '' })
    setShowForm(false)
  }

  const handleDelete = (id: string) => {
    if (confirm('Delete this image?')) {
      setDeleted(prev => [...prev, id])
      setImages(prev => prev.filter(img => img._id !== id))
    }
  }

  const CATEGORIES: GalleryCategory[] = ['match', 'celebration', 'training', 'community']

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', letterSpacing: '0.04em', color: 'var(--white)', lineHeight: 1 }}>GALLERY</h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--white-muted)', marginTop: '4px' }}>
            {images.length} images · Manage tournament and event photos
          </p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary" style={{ fontSize: '13px', padding: '10px 20px' }}>
          + Add Image
        </button>
      </div>

      {/* Upload form */}
      {showForm && (
        <div style={{ background: '#1A1A1C', border: '1px solid rgba(192,57,43,0.3)', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--white-muted)', marginBottom: '16px' }}>
            Add Image
          </div>

          {/* Cloudinary note */}
          <div style={{ background: 'rgba(201,162,39,0.06)', border: '1px solid rgba(201,162,39,0.2)', borderRadius: '6px', padding: '12px 14px', marginBottom: '16px' }}>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--gold)' }}>
              📸 In production: upload to Cloudinary and paste the URL below. Configure <code style={{ background: 'rgba(201,162,39,0.1)', padding: '1px 5px', borderRadius: '3px' }}>CLOUDINARY_*</code> env vars to enable direct upload widget.
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
            <div style={{ gridColumn: 'span 2' }}>
              <label className="form-label">Image URL *</label>
              <input type="url" value={form.imageUrl} onChange={e => setForm(f => ({ ...f, imageUrl: e.target.value }))} className="form-input" placeholder="https://res.cloudinary.com/..." />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <label className="form-label">Caption</label>
              <input type="text" value={form.caption} onChange={e => setForm(f => ({ ...f, caption: e.target.value }))} className="form-input" placeholder="Describe the photo…" />
            </div>
            <div>
              <label className="form-label">Category</label>
              <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value as GalleryCategory }))} className="form-input" style={{ cursor: 'pointer' }}>
                {CATEGORIES.map(c => <option key={c} value={c} style={{ textTransform: 'capitalize' }}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="form-label">Tournament (optional)</label>
              <select value={form.tournamentId} onChange={e => setForm(f => ({ ...f, tournamentId: e.target.value }))} className="form-input" style={{ cursor: 'pointer' }}>
                <option value="">No tournament</option>
                {MOCK_TOURNAMENTS.map(t => <option key={t._id} value={t._id}>{t.name}</option>)}
              </select>
            </div>
          </div>

          {/* Preview */}
          {form.imageUrl && (
            <div style={{ marginBottom: '14px' }}>
              <label className="form-label">Preview</label>
              <img src={form.imageUrl} alt="Preview" style={{ width: '100%', maxWidth: '300px', height: '160px', objectFit: 'cover', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)' }} onError={e => (e.currentTarget.style.display = 'none')} />
            </div>
          )}

          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={handleAdd} className="btn-primary" style={{ fontSize: '13px', padding: '10px 24px' }}>Save Image</button>
            <button onClick={() => setShowForm(false)} className="btn-primary" style={{ fontSize: '13px', padding: '10px 24px', background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: 'var(--white)' }}>Cancel</button>
          </div>
        </div>
      )}

      {/* Image grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px' }}>
        {images.map(img => (
          <div key={img._id} style={{ background: '#1A1A1C', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', overflow: 'hidden', position: 'relative' }}>
            <div style={{ position: 'relative', aspectRatio: '4/3', background: 'var(--card-mid)' }}>
              <img
                src={img.thumbnailUrl || img.imageUrl}
                alt={img.caption || ''}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                loading="lazy"
              />
              <button
                onClick={() => handleDelete(img._id)}
                style={{
                  position: 'absolute', top: '8px', right: '8px',
                  width: '28px', height: '28px', borderRadius: '50%',
                  background: 'rgba(192,57,43,0.9)', border: 'none',
                  color: 'var(--white)', cursor: 'pointer', fontSize: '12px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >✕</button>
              <span style={{
                position: 'absolute', bottom: '8px', left: '8px',
                fontFamily: 'var(--font-body)', fontSize: '9px', fontWeight: 700,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                color: 'var(--white)', background: 'rgba(10,10,10,0.7)',
                padding: '3px 7px', borderRadius: '3px',
              }}>{img.category}</span>
            </div>
            <div style={{ padding: '10px 12px' }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--white-dim)', lineHeight: 1.4 }}>
                {img.caption || <span style={{ color: 'var(--white-muted)', fontStyle: 'italic' }}>No caption</span>}
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: 'var(--white-muted)', marginTop: '5px' }}>
                {new Date(img.uploadedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
