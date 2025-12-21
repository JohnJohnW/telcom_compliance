'use client'

import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Mesh, Group } from 'three'

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

function AstrologyMesh() {
  const outerRingRef = useRef<Mesh>(null)
  const innerRingRef = useRef<Mesh>(null)
  const centerRef = useRef<Mesh>(null)
  const groupRef = useRef<Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.2
    }
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z = -state.clock.elapsedTime * 0.15
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.z = state.clock.elapsedTime * 0.25
    }
    if (centerRef.current) {
      centerRef.current.rotation.y = state.clock.elapsedTime * 0.3
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1
      centerRef.current.scale.set(scale, scale, scale)
    }
  })

  return (
    <group ref={groupRef}>
      {/* Outer ring */}
      <mesh ref={outerRingRef}>
        <torusGeometry args={[0.8, 0.05, 16, 32]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#6d28d9"
          emissiveIntensity={0.5}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      {/* Inner ring */}
      <mesh ref={innerRingRef}>
        <torusGeometry args={[0.5, 0.04, 16, 32]} />
        <meshStandardMaterial
          color="#7c3aed"
          emissive="#5b21b6"
          emissiveIntensity={0.4}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      {/* Center sphere */}
      <mesh ref={centerRef}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial
          color="#c4b5fd"
          emissive="#a855f7"
          emissiveIntensity={0.6}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      {/* Small orbiting spheres */}
      {[0, 1, 2, 3].map((i) => {
        const angle = (i * Math.PI * 2) / 4
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * 0.65, Math.sin(angle) * 0.65, 0]}
          >
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshStandardMaterial
              color="#ddd6fe"
              emissive="#a855f7"
              emissiveIntensity={0.5}
              metalness={0.7}
              roughness={0.2}
            />
          </mesh>
        )
      })}
    </group>
  )
}

interface Astrology3DProps {
  className?: string
}

export function Astrology3D({ className = '' }: Astrology3DProps) {
  const [webglSupported, setWebglSupported] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    setWebglSupported(checkWebGLSupport())
  }, [])

  if (!webglSupported || hasError) {
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
              gl.domElement.addEventListener('webglcontextlost', () => setHasError(true))
              gl.domElement.addEventListener('webglcontextrestored', () => setHasError(false))
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
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#a855f7" />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#6d28d9" />
        <AstrologyMesh />
      </Canvas>
    </div>
  )
}

