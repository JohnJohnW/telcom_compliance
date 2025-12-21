'use client'

import { Component, ReactNode, ErrorInfo } from 'react'
import { SimpleSparkleFallback } from './SimpleIconFallbacks'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

const Default3DFallback = () => (
  <span className="w-6 h-6 inline-flex items-center justify-center opacity-60">
    <SimpleSparkleFallback className="w-full h-full" />
  </span>
)

export class IconErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Icon rendering error:', error, errorInfo)
    // Don't log to console in production to avoid noise
    if (process.env.NODE_ENV === 'development') {
      console.error('Icon component failed:', error.message)
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <Default3DFallback />
    }

    try {
      return this.props.children
    } catch (error) {
      return this.props.fallback || <Default3DFallback />
    }
  }
}

