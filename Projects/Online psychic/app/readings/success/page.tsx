import { redirect } from 'next/navigation'
import { stripe } from '@/lib/stripe/client'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: { session_id?: string }
}) {
  const sessionId = searchParams.session_id

  if (!sessionId) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Payment Error</CardTitle>
            <CardDescription>No session ID provided</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/readings">
              <Button>Return to Readings</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Retrieve the checkout session from Stripe
  let checkoutSession
  try {
    checkoutSession = await stripe.checkout.sessions.retrieve(sessionId)
  } catch (error) {
    console.error('Error retrieving checkout session:', error)
    return (
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Payment Error</CardTitle>
            <CardDescription>Failed to retrieve payment session</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/readings">
              <Button>Return to Readings</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Get reading ID from metadata
  const readingId = checkoutSession.metadata?.reading_id

  // If payment succeeded and we have a reading ID, redirect to the reading session
  if (checkoutSession.payment_status === 'paid' && readingId) {
    redirect(`/readings/${readingId}?session_id=${sessionId}`)
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Payment Successful!</CardTitle>
          <CardDescription>
            Your payment has been processed successfully.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {readingId ? (
            <div>
              <p className="mb-4">Your reading is ready to begin!</p>
              <Link href={`/readings/${readingId}?session_id=${sessionId}`}>
                <Button className="w-full">Start Your Reading</Button>
              </Link>
            </div>
          ) : (
            <div>
              <p className="mb-4">
                Your payment is being processed. You&apos;ll be able to start your reading shortly.
              </p>
              <Link href="/readings">
                <Button variant="outline" className="w-full">Browse Readings</Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
