'use client'

import dynamic from 'next/dynamic'
import { Button } from './Button'

const SparklesIcon3D = dynamic(() => import('./SparklesIcon3D').then(mod => mod.SparklesIcon3D), {
  ssr: false,
})
const CrystalIcon3D = dynamic(() => import('./CrystalIcon3D').then(mod => mod.CrystalIcon3D), {
  ssr: false,
})

interface ButtonWithIconProps {
  children: React.ReactNode
  icon?: 'sparkles' | 'crystal'
  className?: string
  href?: string
  onClick?: () => void
  variant?: 'default' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

export function ButtonWithIcon({ 
  children, 
  icon = 'sparkles', 
  className = '',
  href,
  onClick,
  variant = 'default',
  size = 'md'
}: ButtonWithIconProps) {
  const IconComponent = icon === 'crystal' ? CrystalIcon3D : SparklesIcon3D
  
  const buttonContent = (
    <span className="relative z-10 flex items-center gap-2">
      <span>{children}</span>
      <IconComponent size={size === 'lg' ? 'lg' : size === 'md' ? 'md' : 'sm'} />
    </span>
  )
  
  if (href) {
    return (
      <a href={href} className="inline-block">
        <Button variant={variant} size={size} className={className}>
          {buttonContent}
        </Button>
      </a>
    )
  }
  
  return (
    <Button variant={variant} size={size} className={className} onClick={onClick}>
      {buttonContent}
    </Button>
  )
}

