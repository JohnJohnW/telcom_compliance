'use client'

import dynamic from 'next/dynamic'

const SimpleSparkle3D = dynamic(() => import('./3D/SimpleSparkle3D').then(mod => mod.SimpleSparkle3D), {
  ssr: false,
})

interface Simple3DFallbackProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Simple3DFallback({ size = 'md', className = '' }: Simple3DFallbackProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  }

  return (
    <span className={`${sizeClasses[size]} ${className} inline-flex items-center justify-center opacity-60`}>
      <SimpleSparkle3D />
    </span>
  )
}

