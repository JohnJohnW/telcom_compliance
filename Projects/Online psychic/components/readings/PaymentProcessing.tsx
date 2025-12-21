'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export function PaymentProcessing() {
  const router = useRouter()
  const pathname = usePathname()
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)
  
  // Extract reading ID from pathname (e.g., /readings/123 -> 123)
  const readingId = pathname?.split('/').filter(Boolean).pop()

  useEffect(() => {
    if (!readingId) {
      setError('Unable to determine reading ID. Please refresh the page manually.')
      return
    }

    const MAX_RETRIES = 150 // 5 minutes (150 * 2 seconds)
    let retries = 0
    let intervalId: NodeJS.Timeout | null = null
    let isMounted = true

    const checkPaymentStatus = () => {
      if (!isMounted) return

      retries++
      setRetryCount(retries)

      // Refresh the server component data - if payment is confirmed,
      // the server will render the reading page instead of this component
      router.refresh()

      // If we've exceeded max retries, show error and stop polling
      if (retries >= MAX_RETRIES) {
        setError('Payment is taking longer than expected. Please check your payment status or contact support.')
        if (intervalId) {
          clearInterval(intervalId)
          intervalId = null
        }
      }
    }

    // Check immediately, then every 2 seconds
    checkPaymentStatus()
    intervalId = setInterval(checkPaymentStatus, 2000)

    return () => {
      isMounted = false
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [readingId, router])

  return (
    <div className="container mx-auto px-4 py-16">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Payment Processing</CardTitle>
          <CardDescription>
            Your payment is being processed. This page will automatically update when your payment is confirmed.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-mystic-500"></div>
            {retryCount > 0 && (
              <p className="text-sm text-mystic-400 mt-4">
                Checking payment status... ({Math.floor(retryCount * 2)}s)
              </p>
            )}
          </div>
          {error && (
            <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">{error}</p>
            </div>
          )}
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => router.refresh()}
            >
              Refresh Now
            </Button>
            <Link href="/readings" className="flex-1">
              <Button variant="outline" className="w-full">Browse Readings</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

