import type { Metadata, Viewport } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import BottomNav from '@/components/layout/BottomNav'
import Footer from '@/components/layout/Footer'
import AnnouncementTicker from '@/components/layout/AnnouncementTicker'

export const metadata: Metadata = {
  title: { default: 'Jeeva Oli Friends — Maniyambet Kabaddi Club', template: '%s | Jeeva Oli Friends' },
  description: "Official home of Jeeva Oli Friends — Maniyambet's premier Kabaddi club.",
  keywords: ['kabaddi','tournament','maniyambet','jeeva oli friends','sports club','tamil kabaddi'],
  openGraph: { title: 'Jeeva Oli Friends', description: 'Premier Kabaddi Club of Maniyambet', type: 'website' },
}
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#0A0A0A' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ta" className="scroll-smooth">
      <body className="antialiased min-h-screen" style={{ background: 'var(--black)', color: 'var(--white)' }}>
        <AnnouncementTicker />
        <Navbar />
        <main style={{ paddingTop: 'var(--nav-h)' }}>
          {children}
        </main>
        <Footer />
        <BottomNav />
      </body>
    </html>
  )
}
