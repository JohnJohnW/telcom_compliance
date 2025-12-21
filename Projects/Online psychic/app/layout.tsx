import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/ui/Navbar'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Mystic Readings | AI-Powered Spiritual Guidance',
  description: 'Connect with AI-powered psychic guides for personalised tarot, astrology, and spiritual readings. Discover your spiritual path with mystical insights.',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', type: 'image/x-icon' },
    ],
    apple: '/favicon.svg',
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0a0815] text-[#f5f3ff] min-h-screen" style={{ backgroundColor: '#0a0815', color: '#f5f3ff' }}>
        <Navbar />
        <main className="relative min-h-screen z-10">
          {children}
        </main>
      </body>
    </html>
  )
}

