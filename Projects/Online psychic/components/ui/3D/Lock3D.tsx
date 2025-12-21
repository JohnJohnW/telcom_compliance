'use client'

import { useState, useEffect } from 'react'
import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Mesh, Group } from 'three'

function LockMesh() {
  const groupRef = useRef<Group>(null)
  const lockRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.15
    }
    if (lockRef.current) {
      lockRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      {/* Lock body */}
      <mesh ref={lockRef} position={[0, 0, 0]}>
        <boxGeometry args={[0.6, 0.8, 0.3]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#6d28d9"
          emissiveIntensity={0.4}
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>
      {/* Lock shackle */}
      <mesh position={[0, 0.5, 0]}>
        <torusGeometry args={[0.3, 0.08, 8, 20]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#6d28d9"
          emissiveIntensity={0.4}
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>
      {/* Keyhole */}
      <mesh position={[0, -0.1, 0.16]}>
        <cylinderGeometry args={[0.08, 0.08, 0.1, 16]} />
        <meshStandardMaterial color="#4c1d95" />
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

interface Lock3DProps {
  className?: string
}

export function Lock3D({ className = '' }: Lock3DProps) {
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
        <pointLight position={[3, 3, 3]} intensity={1} color="#a855f7" />
        <pointLight position={[-3, -3, -3]} intensity={0.5} color="#6d28d9" />
        <LockMesh />
      </Canvas>
    </div>
  )
}

