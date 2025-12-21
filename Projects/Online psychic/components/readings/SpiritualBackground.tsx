'use client'

import { useEffect, useRef } from 'react'

export function SpiritualBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Particle system
    class Particle {
      x: number
      y: number
      radius: number
      speedX: number
      speedY: number
      opacity: number
      color: string
      pulseSpeed: number
      canvasElement: HTMLCanvasElement

      constructor(canvasElement: HTMLCanvasElement) {
        this.canvasElement = canvasElement
        this.x = Math.random() * canvasElement.width
        this.y = Math.random() * canvasElement.height
        this.radius = Math.random() * 1.5 + 0.5
        this.speedX = (Math.random() - 0.5) * 0.2
        this.speedY = (Math.random() - 0.5) * 0.2
        this.opacity = Math.random() * 0.3 + 0.15
        this.pulseSpeed = Math.random() * 0.01 + 0.005
        // Softer, more muted purple colors
        const colors = [
          'rgba(139, 92, 246, 0.3)',   // mystic-purple - reduced opacity
          'rgba(168, 85, 247, 0.3)',   // cosmic-purple - reduced opacity
          'rgba(192, 132, 252, 0.25)',  // light purple - reduced opacity
        ]
        this.color = colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY
        const baseOpacity = 0.25
        this.opacity = baseOpacity + Math.sin(Date.now() * this.pulseSpeed) * 0.1

        // Wrap around edges
        if (this.x < 0) this.x = this.canvasElement.width
        if (this.x > this.canvasElement.width) this.x = 0
        if (this.y < 0) this.y = this.canvasElement.height
        if (this.y > this.canvasElement.height) this.y = 0
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        // Extract RGB values and apply opacity
        const rgbMatch = this.color.match(/\d+/g)
        if (rgbMatch && rgbMatch.length >= 3) {
          ctx.fillStyle = `rgba(${rgbMatch[0]}, ${rgbMatch[1]}, ${rgbMatch[2]}, ${Math.max(0.1, Math.min(0.8, this.opacity))})`
        } else {
          ctx.fillStyle = this.color
        }
        
        // Subtle glow effect
        ctx.shadowBlur = 5
        ctx.shadowColor = this.color
        ctx.fill()
        ctx.shadowBlur = 0
      }
    }

    // Create particles - fewer for calmer effect
    const particles: Particle[] = []
    const particleCount = 40
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvas))
    }
    
    // Create sparkles (larger, brighter particles)
    class Sparkle {
      x: number
      y: number
      radius: number
      opacity: number
      pulseSpeed: number
      angle: number
      distance: number
      centerX: number
      centerY: number

      constructor(canvasElement: HTMLCanvasElement) {
        this.centerX = Math.random() * canvasElement.width
        this.centerY = Math.random() * canvasElement.height
        this.distance = Math.random() * 20 + 8
        this.angle = Math.random() * Math.PI * 2
        this.radius = Math.random() * 1 + 0.8
        this.opacity = Math.random() * 0.4 + 0.3
        this.pulseSpeed = Math.random() * 0.015 + 0.01
        // Initialize x and y based on initial angle
        this.x = this.centerX + Math.cos(this.angle) * this.distance
        this.y = this.centerY + Math.sin(this.angle) * this.distance
      }

      update() {
        this.angle += 0.005
        this.x = this.centerX + Math.cos(this.angle) * this.distance
        this.y = this.centerY + Math.sin(this.angle) * this.distance
        this.opacity = 0.3 + Math.sin(Date.now() * this.pulseSpeed) * 0.2
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`
        ctx.shadowBlur = 8
        ctx.shadowColor = 'rgba(168, 85, 247, 0.4)'
        ctx.fill()
        ctx.shadowBlur = 0
      }
    }

    const sparkles: Sparkle[] = []
    const sparkleCount = 10
    for (let i = 0; i < sparkleCount; i++) {
      sparkles.push(new Sparkle(canvas))
    }

    // Animation loop
    let animationId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw animated gradient background - calmer transitions
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      const time = Date.now() * 0.0003
      gradient.addColorStop(0, `rgba(46, 16, 101, ${0.85 + Math.sin(time) * 0.05})`) // mystic-950
      gradient.addColorStop(0.5, `rgba(76, 29, 149, ${0.88 + Math.cos(time * 0.8) * 0.05})`) // mystic-900
      gradient.addColorStop(1, `rgba(46, 16, 101, ${0.85 + Math.sin(time * 0.6) * 0.05})`) // mystic-950
      
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw radial gradients for mystical orbs - calmer and more subtle
      const orbCount = 2
      for (let i = 0; i < orbCount; i++) {
        const orbX = canvas.width * (0.25 + i * 0.5)
        const orbY = canvas.height * (0.4 + Math.sin(time * 0.5 + i) * 0.1)
        const orbRadius = 150 + Math.sin(time * 1 + i) * 30
        
        const orbGradient = ctx.createRadialGradient(orbX, orbY, 0, orbX, orbY, orbRadius)
        orbGradient.addColorStop(0, `rgba(139, 92, 246, ${0.15 + Math.sin(time * 0.5 + i) * 0.05})`)
        orbGradient.addColorStop(0.5, `rgba(168, 85, 247, ${0.1 + Math.cos(time * 0.5 + i) * 0.05})`)
        orbGradient.addColorStop(1, 'rgba(139, 92, 246, 0)')
        
        ctx.fillStyle = orbGradient
        ctx.fillRect(orbX - orbRadius, orbY - orbRadius, orbRadius * 2, orbRadius * 2)
      }

      // Update and draw particles
      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })

      // Update and draw sparkles
      sparkles.forEach(sparkle => {
        sparkle.update()
        sparkle.draw()
      })

      // Draw connecting lines between nearby particles (constellation effect) - more subtle
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            const opacity = (1 - distance / 100) * 0.08
            ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`
            ctx.lineWidth = 0.3
            ctx.shadowBlur = 1
            ctx.shadowColor = 'rgba(168, 85, 247, 0.2)'
            ctx.stroke()
            ctx.shadowBlur = 0
          }
        })
      })
      
      // Draw mystical energy waves - calmer and gentler
      const waveCount = 1
      for (let i = 0; i < waveCount; i++) {
        const waveY = canvas.height * 0.5 + Math.sin(time * 0.3 + i * Math.PI) * 60
        const waveGradient = ctx.createLinearGradient(0, waveY - 40, 0, waveY + 40)
        waveGradient.addColorStop(0, 'rgba(139, 92, 246, 0)')
        waveGradient.addColorStop(0.5, `rgba(168, 85, 247, ${0.05 + Math.sin(time * 0.5 + i) * 0.03})`)
        waveGradient.addColorStop(1, 'rgba(139, 92, 246, 0)')
        
        ctx.fillStyle = waveGradient
        ctx.fillRect(0, waveY - 40, canvas.width, 80)
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[1]"
      style={{ background: '#2e1065' }}
    />
  )
}

