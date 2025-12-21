'use client'

import { SimpleSparkleFallback } from './SimpleIconFallbacks'

interface SparklesIcon3DProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function SparklesIcon3D({ className = '', size = 'md' }: SparklesIcon3DProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }

  return (
    <span className={`${sizeClasses[size]} ${className} inline-block`}>
      <SimpleSparkleFallback className="w-full h-full" />
    </span>
  )
}

