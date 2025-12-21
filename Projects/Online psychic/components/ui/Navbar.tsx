import Link from 'next/link'
import { NavbarLogo } from '@/components/ui/NavbarLogo'

export function Navbar() {
  return (
    <nav className="relative z-50 border-b border-mystic-800/30 bg-gradient-to-b from-mystic-950/80 via-mystic-950/60 to-transparent backdrop-blur-md shadow-lg shadow-mystic-900/20">
      {/* Animated background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-mystic-600/5 to-transparent animate-shimmer"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link 
              href="/" 
              className="text-2xl font-mystical font-bold flex items-center gap-2 group transition-all duration-500 hover:scale-[1.02]"
            >
              <NavbarLogo />
              <span className="text-gradient-cream-gold drop-shadow-[0_0_4px_rgba(233,213,255,0.3)] group-hover:drop-shadow-[0_0_12px_rgba(233,213,255,0.7)] transition-all duration-500 relative inline-block">
                Mystic Readings
                <span className="absolute inset-0 text-gradient-cream-gold opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-500 pointer-events-none">
                  Mystic Readings
                </span>
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/readings"
              className="text-mystic-200 hover:text-mystic-100 px-3 py-2 rounded-md text-sm font-medium transition-all duration-500 hover:bg-mystic-800/30 hover:scale-[1.02] relative group"
            >
              Readings
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-mystic group-hover:w-full transition-all duration-500"></span>
            </Link>
            <Link
              href="/psychics"
              className="text-mystic-200 hover:text-mystic-100 px-3 py-2 rounded-md text-sm font-medium transition-all duration-500 hover:bg-mystic-800/30 hover:scale-[1.02] relative group"
            >
              Psychics
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-mystic group-hover:w-full transition-all duration-500"></span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

