'use client'

import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Mesh } from 'three'

function SimpleSparkleMesh() {
  const meshRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.02
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
      const scale = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.15
      meshRef.current.scale.set(scale, scale, scale)
    }
  })

  return (
    <mesh ref={meshRef}>
      <tetrahedronGeometry args={[0.4, 0]} />
      <meshStandardMaterial
        color="#a855f7"
        emissive="#6d28d9"
        emissiveIntensity={0.8}
        metalness={0.9}
        roughness={0.1}
      />
    </mesh>
  )
}

interface SimpleSparkle3DProps {
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

export function SimpleSparkle3D({ className = '' }: SimpleSparkle3DProps) {
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
    return null
  }

  return (
    <div className={className} style={{ width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [0, 0, 2], fov: 50 }}
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
        <ambientLight intensity={0.6} />
        <pointLight position={[2, 2, 2]} intensity={1.2} color="#a855f7" />
        <pointLight position={[-2, -2, -2]} intensity={0.6} color="#6d28d9" />
        <SimpleSparkleMesh />
      </Canvas>
    </div>
  )
}

