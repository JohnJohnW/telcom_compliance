'use client'

import { SimpleSparkleFallback, StarFallback, MoonFallback, OrbFallback } from './SimpleIconFallbacks'

export function SpiritualIcons() {
  // Different spiritual icons with unique animations and positions to avoid overlap
  return (
    <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
      {/* Top left - Sparkle with float animation */}
      <div className="absolute top-20 left-10 w-16 h-16 animate-float delay-1000">
        <SimpleSparkleFallback className="w-full h-full" />
      </div>
      
      {/* Top right - Star with twinkle animation */}
      <div className="absolute top-32 right-16 w-14 h-14 animate-twinkle delay-2000">
        <StarFallback className="w-full h-full" />
      </div>
      
      {/* Middle left - Moon with different float path */}
      <div className="absolute top-1/2 left-8 w-14 h-14 animate-float delay-500" style={{ animationDuration: '15s' }}>
        <MoonFallback className="w-full h-full" />
      </div>
      
      {/* Bottom left - Orb with pulse */}
      <div className="absolute bottom-24 left-1/4 w-12 h-12 animate-pulse-glow delay-1000">
        <OrbFallback className="w-full h-full" />
      </div>
      
      {/* Bottom right - Sparkle with different timing */}
      <div className="absolute bottom-20 right-1/3 w-12 h-12 animate-twinkle delay-3000" style={{ animationDuration: '6s' }}>
        <SimpleSparkleFallback className="w-full h-full" />
      </div>
      
      {/* Middle right - Star with slow float */}
      <div className="absolute top-1/3 right-1/4 w-10 h-10 animate-float delay-4000" style={{ animationDuration: '18s' }}>
        <StarFallback className="w-full h-full" />
      </div>
      
      {/* Additional icons for more spiritual atmosphere */}
      <div className="absolute top-1/4 left-1/3 w-8 h-8 animate-twinkle delay-1500" style={{ animationDuration: '4s' }}>
        <SimpleSparkleFallback className="w-full h-full" />
      </div>
      
      <div className="absolute bottom-1/3 right-1/5 w-10 h-10 animate-pulse-glow delay-2500" style={{ animationDuration: '5s' }}>
        <OrbFallback className="w-full h-full" />
      </div>
    </div>
  )
}

