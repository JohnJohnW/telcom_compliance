'use client'

import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Group } from 'three'

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

function LoveMesh() {
  const heart1Ref = useRef<Group>(null)
  const heart2Ref = useRef<Group>(null)
  const groupRef = useRef<Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
    }
    if (heart1Ref.current) {
      heart1Ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.8) * 0.1
      const scale = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.1
      heart1Ref.current.scale.set(scale, scale, scale)
    }
    if (heart2Ref.current) {
      heart2Ref.current.rotation.z = -Math.sin(state.clock.elapsedTime * 0.8) * 0.1
      const scale = 1 + Math.sin(state.clock.elapsedTime * 1.5 + Math.PI) * 0.1
      heart2Ref.current.scale.set(scale, scale, scale)
    }
  })

  return (
    <group ref={groupRef}>
      {/* First heart - made from spheres */}
      <group ref={heart1Ref} position={[-0.2, 0, 0]}>
        {/* Top left curve */}
        <mesh position={[-0.15, 0.15, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial
            color="#ec4899"
            emissive="#be185d"
            emissiveIntensity={0.5}
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
        {/* Top right curve */}
        <mesh position={[0.15, 0.15, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial
            color="#ec4899"
            emissive="#be185d"
            emissiveIntensity={0.5}
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
        {/* Bottom point */}
        <mesh position={[0, -0.1, 0]} rotation={[Math.PI / 4, 0, Math.PI / 4]}>
          <coneGeometry args={[0.2, 0.3, 8]} />
          <meshStandardMaterial
            color="#ec4899"
            emissive="#be185d"
            emissiveIntensity={0.5}
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
      </group>
      {/* Second heart */}
      <group ref={heart2Ref} position={[0.2, 0, 0]}>
        {/* Top left curve */}
        <mesh position={[-0.15, 0.15, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial
            color="#f472b6"
            emissive="#ec4899"
            emissiveIntensity={0.5}
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
        {/* Top right curve */}
        <mesh position={[0.15, 0.15, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial
            color="#f472b6"
            emissive="#ec4899"
            emissiveIntensity={0.5}
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
        {/* Bottom point */}
        <mesh position={[0, -0.1, 0]} rotation={[Math.PI / 4, 0, Math.PI / 4]}>
          <coneGeometry args={[0.2, 0.3, 8]} />
          <meshStandardMaterial
            color="#f472b6"
            emissive="#ec4899"
            emissiveIntensity={0.5}
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
      </group>
    </group>
  )
}

interface Love3DProps {
  className?: string
}

export function Love3D({ className = '' }: Love3DProps) {
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
        <pointLight position={[5, 5, 5]} intensity={1} color="#f472b6" />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#ec4899" />
        <LoveMesh />
      </Canvas>
    </div>
  )
}

