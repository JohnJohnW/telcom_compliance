'use client'

// Spiritual animated SVG icons that always render - no WebGL required

export function SimpleSparkleFallback({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" 
        fill="#a855f7" 
        opacity="0.9"
      />
    </svg>
  )
}

export function SimpleCrystalFallback({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle 
        cx="12" 
        cy="12" 
        r="8" 
        fill="#a855f7" 
        opacity="0.9"
      />
      <circle 
        cx="12" 
        cy="10" 
        r="3" 
        fill="#fef3c7" 
        opacity="0.7"
      />
    </svg>
  )
}

export function LockFallback({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="12" width="8" height="8" rx="1" fill="#a855f7" opacity="0.9" />
      <path d="M9 12V8C9 6.34315 10.3431 5 12 5C13.6569 5 15 6.34315 15 8V12" stroke="#c084fc" strokeWidth="2" fill="none" />
    </svg>
  )
}

export function ScrollFallback({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="6" width="8" height="12" rx="1" fill="#a855f7" opacity="0.9" />
      <ellipse cx="12" cy="6" rx="4" ry="2" fill="#c084fc" opacity="0.6" />
      <ellipse cx="12" cy="18" rx="4" ry="2" fill="#c084fc" opacity="0.6" />
      <line x1="10" y1="9" x2="14" y2="9" stroke="#fef3c7" strokeWidth="1.5" opacity="0.8" />
      <line x1="10" y1="12" x2="14" y2="12" stroke="#fef3c7" strokeWidth="1.5" opacity="0.8" />
      <line x1="10" y1="15" x2="14" y2="15" stroke="#fef3c7" strokeWidth="1.5" opacity="0.8" />
    </svg>
  )
}

export function StarFallback({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M12 2L14.5 8.5L21 10L14.5 11.5L12 18L9.5 11.5L3 10L9.5 8.5L12 2Z" 
        fill="#fbbf24" 
        opacity="0.9"
      />
    </svg>
  )
}

export function MoonFallback({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" 
        fill="#a855f7" 
        opacity="0.9"
      />
    </svg>
  )
}

export function TarotFallback({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="4" width="4" height="6" rx="0.5" fill="#6d28d9" opacity="0.9" />
      <rect x="10" y="5" width="4" height="6" rx="0.5" fill="#7c3aed" opacity="0.9" />
      <rect x="14" y="4" width="4" height="6" rx="0.5" fill="#6d28d9" opacity="0.9" />
    </svg>
  )
}

export function AstrologyFallback({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="8" stroke="#a855f7" strokeWidth="1.5" fill="none" opacity="0.9" />
      <circle cx="12" cy="12" r="5" stroke="#fbbf24" strokeWidth="1" fill="none" opacity="0.7" />
      <circle cx="12" cy="12" r="2" fill="#fef3c7" opacity="0.9" />
    </svg>
  )
}

export function LoveFallback({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
        fill="#ec4899" 
        opacity="0.9"
      />
    </svg>
  )
}

export function OrbFallback({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="orbGrad" cx="50%" cy="30%">
          <stop offset="0%" stopColor="#fef3c7" stopOpacity="1" />
          <stop offset="50%" stopColor="#a855f7" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#6d28d9" stopOpacity="0.6" />
        </radialGradient>
      </defs>
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        fill="url(#orbGrad)"
      />
      <circle 
        cx="12" 
        cy="10" 
        r="3" 
        fill="#fef3c7" 
        opacity="0.7"
      />
    </svg>
  )
}

