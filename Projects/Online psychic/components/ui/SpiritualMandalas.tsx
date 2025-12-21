'use client'

export function SpiritualMandalas() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Floating mandala patterns */}
      <div className="absolute top-20 right-10 w-32 h-32 opacity-[0.03] animate-spin-slow">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-purple-600" />
          <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-purple-500" />
          <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-purple-700" />
          <path d="M50 5 L50 15 M50 85 L50 95 M5 50 L15 50 M85 50 L95 50" stroke="currentColor" strokeWidth="0.5" className="text-purple-600" />
        </svg>
      </div>
      
      <div className="absolute bottom-32 left-16 w-40 h-40 opacity-[0.03] animate-spin-slow-reverse delay-2000">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-purple-700" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-purple-600" />
          <path d="M50 10 L50 20 M50 80 L50 90 M10 50 L20 50 M80 50 L90 50" stroke="currentColor" strokeWidth="0.5" className="text-purple-500" />
        </svg>
      </div>
      
      <div className="absolute top-1/2 right-1/4 w-24 h-24 opacity-[0.02] animate-spin-slow delay-1000">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-purple-800" />
          <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-purple-700" />
        </svg>
      </div>
    </div>
  )
}


