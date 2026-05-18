'use client'
import { MOCK_ANNOUNCEMENTS } from '@/lib/mockData'
import Link from 'next/link'

export default function AnnouncementTicker() {
  const items = MOCK_ANNOUNCEMENTS.filter(a => a.active)
  if (!items.length) return null

  // Duplicate for seamless loop
  const doubled = [...items, ...items]

  return (
    <div
      style={{
        background: 'var(--red)',
        height: '32px',
        overflow: 'hidden',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 60,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        {/* LIVE label */}
        <div
          style={{
            flexShrink: 0,
            background: 'var(--black)',
            color: 'var(--red)',
            fontFamily: 'var(--font-body)',
            fontWeight: 700,
            fontSize: '10px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            padding: '0 14px',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            zIndex: 1,
          }}
        >
          LIVE
        </div>

        {/* Scrolling content */}
        <div style={{ overflow: 'hidden', flex: 1 }}>
          <div className="ticker-inner" style={{ display: 'flex', whiteSpace: 'nowrap' }}>
            {doubled.map((item, i) => (
              <span
                key={i}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  fontWeight: 500,
                  color: 'var(--white)',
                  padding: '0 40px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                {item.link ? (
                  <Link href={item.link} style={{ color: 'inherit', textDecoration: 'none' }}>
                    {item.text}
                  </Link>
                ) : (
                  item.text
                )}
                <span style={{ color: 'rgba(255,255,255,0.4)' }}>•</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
