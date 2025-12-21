'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-[#0a0815] text-[#f5f3ff]">
      <div className="max-w-md w-full bg-[#1e1b4b] rounded-lg border border-purple-800/30 p-6 space-y-4">
        <div>
          <h2 className="text-2xl font-bold mb-2 text-purple-200">Something went wrong!</h2>
          <p className="text-purple-300">
            An error occurred while loading this page.
          </p>
        </div>
        <div className="p-3 bg-red-900/20 border border-red-800/50 rounded-md">
          <p className="text-sm text-red-200 font-mono">
            {error?.message || 'An unexpected error occurred'}
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={reset}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-md hover:opacity-90 transition-opacity"
          >
            Try again
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="flex-1 px-4 py-2 border border-purple-600 bg-transparent text-purple-200 rounded-md hover:bg-purple-800/20 transition-colors"
          >
            Go home
          </button>
        </div>
      </div>
    </div>
  )
}

