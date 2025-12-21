'use client'

import { SimpleSparkleFallback, LockFallback, ScrollFallback } from './SimpleIconFallbacks'

interface FeatureIconProps {
  icon: 'sparkles' | 'lock' | 'scroll'
  delay?: string
}

export function FeatureIcon({ icon, delay = '' }: FeatureIconProps) {
  const fallbackMap = {
    sparkles: SimpleSparkleFallback,
    lock: LockFallback,
    scroll: ScrollFallback,
  }
  
  const IconComponent = fallbackMap[icon] || SimpleSparkleFallback
  
  return (
    <div className={`mb-6 ${delay} group-hover:scale-125 transition-all duration-500 filter drop-shadow-[0_0_18px_rgba(124,58,237,0.4)] flex justify-center w-16 h-16 mx-auto`}>
      <IconComponent className="w-full h-full" />
    </div>
  )
}

