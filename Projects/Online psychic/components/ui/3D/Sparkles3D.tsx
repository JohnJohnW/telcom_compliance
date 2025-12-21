'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Mesh, Group } from 'three'

function SparklesMesh() {
  const groupRef = useRef<Group>(null)
  const sphereRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
      groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.2) * 0.1
    }
    if (sphereRef.current) {
      const time = state.clock.elapsedTime
      sphereRef.current.rotation.y = time * 0.5
      const material = sphereRef.current.material as any
      if (material && material.emissiveIntensity !== undefined) {
        material.emissiveIntensity = 0.5 + Math.sin(time * 2) * 0.2
      }
    }
  })

  return (
    <group ref={groupRef}>
      {/* Sparkles component disabled due to shader compilation errors with Three.js */}
      {/* The animated sphere provides sufficient visual effect */}
      <mesh ref={sphereRef}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#6d28d9"
          emissiveIntensity={0.5}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
    </group>
  )
}

function checkWebGLSupport(): boolean {
  if (typeof window === 'undefined') return false
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    if (!gl || !('createShader' in gl)) return false
    const shader = (gl as WebGLRenderingContext).createShader((gl as WebGLRenderingContext).VERTEX_SHADER)
    if (!shader) return false
    ;(gl as WebGLRenderingContext).deleteShader(shader)
    return true
  } catch {
    return false
  }
}

interface Sparkles3DProps {
  className?: string
}

export function Sparkles3D({ className = '' }: Sparkles3DProps) {
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
        camera={{ position: [0, 0, 3], fov: 50 }}
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
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <pointLight position={[3, 3, 3]} intensity={1} color="#a855f7" />
          <pointLight position={[-3, -3, -3]} intensity={0.5} color="#6d28d9" />
          <SparklesMesh />
        </Suspense>
      </Canvas>
    </div>
  )
}

