'use client'

import { SimpleCrystalFallback } from './SimpleIconFallbacks'

interface CrystalIcon3DProps {
  className?: string
  size?: 'xs' | 'sm' | 'md' | 'lg'
}

export function CrystalIcon3D({ className = '', size = 'md' }: CrystalIcon3DProps) {
  const sizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }

  return (
    <span className={`${sizeClasses[size]} ${className} inline-flex items-center justify-center`}>
      <SimpleCrystalFallback className="w-full h-full" />
    </span>
  )
}

