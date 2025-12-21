'use client'

import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Mesh, Group } from 'three'

function FloatingIcon({ position, type }: { position: [number, number, number], type: 'crystal' | 'star' | 'moon' }) {
  const meshRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.1
    }
  })

  if (type === 'crystal') {
    return (
      <mesh ref={meshRef} position={position}>
        <octahedronGeometry args={[0.15, 0]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#6d28d9"
          emissiveIntensity={0.4}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    )
  }
  
  if (type === 'star') {
    return (
      <mesh ref={meshRef} position={position}>
        <tetrahedronGeometry args={[0.15, 0]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#6d28d9"
          emissiveIntensity={0.6}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
    )
  }
  
  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshStandardMaterial
        color="#a855f7"
        emissive="#6d28d9"
        emissiveIntensity={0.4}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  )
}

function FloatingIconsScene() {
  const groupRef = useRef<Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      <FloatingIcon position={[-1, 0.5, 0]} type="crystal" />
      <FloatingIcon position={[1, -0.3, 0]} type="star" />
      <FloatingIcon position={[0, 0.8, 0]} type="moon" />
      <FloatingIcon position={[-0.8, -0.6, 0]} type="crystal" />
      <FloatingIcon position={[0.7, 0.2, 0]} type="star" />
    </group>
  )
}

interface FloatingIcons3DProps {
  className?: string
}

function checkWebGLSupport(): boolean {
  if (typeof window === 'undefined') return false
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    if (!gl || !('createShader' in gl)) return false
    // Test shader compilation
    const shader = (gl as WebGLRenderingContext).createShader((gl as WebGLRenderingContext).VERTEX_SHADER)
    if (!shader) return false
    ;(gl as WebGLRenderingContext).deleteShader(shader)
    return true
  } catch {
    return false
  }
}

export function FloatingIcons3D({ className = '' }: FloatingIcons3DProps) {
  const [mounted, setMounted] = useState(false)
  const [webglSupported, setWebglSupported] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [contextLost, setContextLost] = useState(false)

  useEffect(() => {
    setMounted(true)
    setWebglSupported(checkWebGLSupport())
  }, [])

  // Don't render until after hydration to avoid mismatch
  if (!mounted || !webglSupported || (hasError && !contextLost)) {
    return null // Background icons are decorative, fail silently
  }

  return (
    <div className={className} style={{ width: '100%', height: '100%', background: 'transparent' }}>
      <Canvas
        camera={{ position: [0, 0, 4], fov: 60 }}
        gl={{ 
          alpha: true, 
          antialias: true,
          powerPreference: 'high-performance',
          failIfMajorPerformanceCaveat: false,
        }}
        onCreated={({ gl }) => {
          try {
            gl.setPixelRatio(Math.min(window.devicePixelRatio, 2))
            if (gl.domElement) {
              gl.domElement.style.background = 'transparent'
              gl.domElement.addEventListener('webglcontextlost', (e) => {
                e.preventDefault() // Prevent default to allow context restoration
                setContextLost(true)
              })
              gl.domElement.addEventListener('webglcontextrestored', () => {
                setContextLost(false)
                setHasError(false)
              })
            }
          } catch (error) {
            console.error('Canvas setup error:', error)
            setHasError(true)
          }
        }}
        onError={(error) => {
          console.error('Canvas error:', error)
          setHasError(true)
        }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={0.8} color="#a855f7" />
        <pointLight position={[-5, -5, -5]} intensity={0.4} color="#6d28d9" />
        <FloatingIconsScene />
      </Canvas>
    </div>
  )
}

