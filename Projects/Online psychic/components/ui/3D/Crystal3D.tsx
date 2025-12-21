'use client'

import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Mesh, MeshStandardMaterial } from 'three'
import dynamic from 'next/dynamic'

const OrbitControls = dynamic(
  () => import('@react-three/drei').then(mod => mod.OrbitControls),
  { ssr: false }
)

function CrystalMesh({ size = 1 }: { size?: number }) {
  const meshRef = useRef<Mesh>(null)
  const materialRef = useRef<MeshStandardMaterial>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.015
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.15
    }
    if (materialRef.current) {
      const time = state.clock.elapsedTime
      materialRef.current.emissiveIntensity = 0.4 + Math.sin(time * 2.5) * 0.2
    }
  })

  return (
    <mesh ref={meshRef} scale={size}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        ref={materialRef}
        color="#a855f7"
        emissive="#6d28d9"
        emissiveIntensity={0.4}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  )
}

interface Crystal3DProps {
  className?: string
  size?: number
  showControls?: boolean
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

export function Crystal3D({ className = '', size = 1, showControls = false }: Crystal3DProps) {
  const [webglSupported, setWebglSupported] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    setWebglSupported(checkWebGLSupport())
  }, [])

  if (!webglSupported || hasError) {
    return null
  }

  return (
    <div className={`${className}`} style={{ width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [0, 0, 2.5], fov: 50 }}
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
        <CrystalMesh size={size} />
        {showControls && OrbitControls && <OrbitControls enableZoom={false} />}
      </Canvas>
    </div>
  )
}

