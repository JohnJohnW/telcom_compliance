'use client'

import { useEffect, useState } from 'react'

export function useWebGLSupport() {
  const [isSupported, setIsSupported] = useState(false)
  const [isChecked, setIsChecked] = useState(false)

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      setIsSupported(!!gl)
    } catch (error) {
      setIsSupported(false)
    } finally {
      setIsChecked(true)
    }
  }, [])

  return { isSupported, isChecked }
}


