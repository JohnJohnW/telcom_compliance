'use client'

import { useEffect, useState } from 'react'
import { StarFallback } from './SimpleIconFallbacks'

interface Particle {
  id: number
  left: number
  top: number
  size: number
  color: string
  delay: number
  duration: number
  animationType: 'float-up' | 'float-down' | 'float-left' | 'float-right' | 'diagonal'
}

export function AnimatedParticles() {
  const [particles, setParticles] = useState<Particle[]>([])
  const [stars, setStars] = useState<Particle[]>([])

  useEffect(() => {
    // Generate purple/orange particles with different animation paths
    const generatedParticles: Particle[] = Array.from({ length: 15 }, (_, i) => {
      const animationTypes: Particle['animationType'][] = ['float-up', 'float-down', 'float-left', 'float-right', 'diagonal']
      return {
      id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 4 + 2,
        color: `rgba(${Math.random() > 0.5 ? '251, 191, 36' : '93, 51, 234'}, ${0.3 + Math.random() * 0.4})`, // Orange or purple
        delay: Math.random() * 5,
        duration: 12 + Math.random() * 8,
        animationType: animationTypes[Math.floor(Math.random() * animationTypes.length)],
      }
    })
    
    // Generate stars with separate animation paths
    const generatedStars: Particle[] = Array.from({ length: 12 }, (_, i) => ({
      id: i + 1000, // Different ID range
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 3 + 1.5,
      color: 'transparent', // Stars use SVG, not color
      delay: Math.random() * 4,
      duration: 15 + Math.random() * 10,
      animationType: ['float-up', 'float-down', 'diagonal'][Math.floor(Math.random() * 3)] as Particle['animationType'],
    }))
    
    setParticles(generatedParticles)
    setStars(generatedStars)
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0815] via-[#140f2d] to-[#0a0815] bg-[#0a0815]"></div>
      
      {/* Purple/Orange particles with varied paths */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`absolute rounded-full particle-${particle.animationType}`}
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: particle.color,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}
      
      {/* Stars with separate animation paths */}
      {stars.map((star) => (
        <div
          key={star.id}
          className={`absolute star-${star.animationType}`}
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size * 2}px`,
            height: `${star.size * 2}px`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        >
          <StarFallback className="w-full h-full opacity-60" />
        </div>
      ))}
      
      {/* Large glowing orbs - deeper, calmer purples with enhanced animations */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#4c1d95]/8 rounded-full blur-3xl animate-orb-float-1"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#581c87]/8 rounded-full blur-3xl animate-orb-float-2"></div>
      <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-[#5b21b6]/8 rounded-full blur-3xl animate-orb-float-3"></div>
      
      {/* Additional floating orbs */}
      <div className="absolute top-1/3 right-1/3 w-72 h-72 bg-[#6d28d9]/6 rounded-full blur-3xl animate-orb-float-4"></div>
      <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-[#7c3aed]/6 rounded-full blur-3xl animate-orb-float-5"></div>
      
      {/* Spiritual mandala patterns with enhanced animations */}
      <div className="absolute top-1/3 left-1/5 w-64 h-64 opacity-5 animate-spin-slow mandala-1">
        <div className="w-full h-full border-2 border-[#6d28d9] rounded-full"></div>
        <div className="absolute inset-4 border border-[#7c3aed] rounded-full"></div>
        <div className="absolute inset-8 border border-[#5b21b6] rounded-full"></div>
      </div>
      <div className="absolute bottom-1/3 right-1/5 w-48 h-48 opacity-5 animate-spin-slow-reverse delay-1000 mandala-2">
        <div className="w-full h-full border-2 border-[#581c87] rounded-full"></div>
        <div className="absolute inset-4 border border-[#4c1d95] rounded-full"></div>
      </div>
      
      {/* Additional mandalas */}
      <div className="absolute top-1/4 right-1/4 w-40 h-40 opacity-4 animate-spin-slow delay-2000 mandala-3">
        <div className="w-full h-full border border-[#a855f7] rounded-full"></div>
        <div className="absolute inset-3 border border-[#c084fc] rounded-full"></div>
      </div>
      <div className="absolute bottom-1/4 left-1/4 w-56 h-56 opacity-4 animate-spin-slow-reverse delay-3000 mandala-4">
        <div className="w-full h-full border-2 border-[#7c3aed] rounded-full"></div>
        <div className="absolute inset-4 border border-[#a855f7] rounded-full"></div>
      </div>
    </div>
  )
}

