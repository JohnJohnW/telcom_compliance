import { notFound } from 'next/navigation'
import { stripe } from '@/lib/stripe/client'
import { ElevenLabsWidget } from '@/components/readings/ElevenLabsWidget'
import { PaymentProcessing } from '@/components/readings/PaymentProcessing'
import { SpiritualBackground } from '@/components/readings/SpiritualBackground'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

interface ReadingData {
  id: string
  reading_type_id: string
  reading_type_name: string
  reading_type_price: number
  reading_type_duration: number
  elevenlabs_agent_id: string
  psychic?: string
  status: 'pending' | 'paid'
  stripe_checkout_session_id?: string
}

/**
 * Get reading data from Stripe session
 */
async function getReadingFromStripe(readingId: string, sessionId?: string): Promise<ReadingData | null> {
  try {
    // If we have a session_id, use it directly
    if (sessionId) {
      const session = await stripe.checkout.sessions.retrieve(sessionId)
      
      if (session.metadata?.reading_id === readingId) {
        return {
          id: readingId,
          reading_type_id: session.metadata.reading_type_id || '',
          reading_type_name: session.metadata.reading_type_name || '',
          reading_type_price: parseInt(session.metadata.reading_type_price || '0'),
          reading_type_duration: parseInt(session.metadata.reading_type_duration || '0'),
          elevenlabs_agent_id: session.metadata.elevenlabs_agent_id || '',
          psychic: session.metadata.psychic || undefined,
          status: session.payment_status === 'paid' ? 'paid' : 'pending',
          stripe_checkout_session_id: session.id,
        }
      }
    }

    // Otherwise, search for sessions with this reading_id in metadata
    // Note: Stripe doesn't have a direct way to search by metadata, so we'll need to handle this differently
    // For now, if no session_id is provided, we can't retrieve the reading
    return null
  } catch (error) {
    console.error('Error retrieving reading from Stripe:', error)
    return null
  }
}

export default async function ReadingSessionPage({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams: { session_id?: string }
}) {
  // Get reading data from Stripe session
  const readingData = await getReadingFromStripe(params.id, searchParams.session_id)

  if (!readingData) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Reading Not Found</CardTitle>
            <CardDescription>
              The reading you&apos;re looking for doesn&apos;t exist or the session has expired.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/readings">
              <Button className="w-full">Browse Readings</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  // If we have a session_id and payment is pending, check payment status
  if (searchParams.session_id && readingData.status === 'pending') {
    try {
      const session = await stripe.checkout.sessions.retrieve(searchParams.session_id)
      if (session.payment_status === 'paid') {
        // Payment succeeded - update reading data
        readingData.status = 'paid'
        readingData.stripe_checkout_session_id = session.id
      } else if (session.payment_status === 'unpaid') {
        // Payment was not completed
        return (
          <div className="container mx-auto px-4 py-16">
            <Card className="max-w-md mx-auto">
              <CardHeader>
                <CardTitle>Payment Not Completed</CardTitle>
                <CardDescription>
                  The payment for this reading was not completed. Please try booking again.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/readings">
                  <Button className="w-full">Browse Readings</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        )
      }
    } catch (error) {
      console.error('Error checking payment status:', error)
    }
  }

  // Show payment processing if status is pending
  if (readingData.status === 'pending') {
    return (
      <div className="flex flex-col min-h-screen relative">
        <SpiritualBackground />
        <PaymentProcessing />
      </div>
    )
  }

  // Reading is paid, show the session
  return (
    <div className="flex flex-col min-h-screen relative">
      <SpiritualBackground />
      <div className="container mx-auto px-4 py-16 z-10">
        <div className="max-w-4xl mx-auto">
          <Card className="mystic-card-enhanced mb-6">
            <CardHeader>
              <CardTitle className="text-2xl font-mystical text-gradient-cream-gold">
                {readingData.reading_type_name}
              </CardTitle>
              <CardDescription>
                {readingData.psychic ? `Reading with ${readingData.psychic}` : 'Your spiritual reading session'}
              </CardDescription>
            </CardHeader>
          </Card>

          <ElevenLabsWidget
            agentId={readingData.elevenlabs_agent_id}
            readingId={readingData.id}
            readingTypeName={readingData.reading_type_name}
          />
        </div>
      </div>
    </div>
  )
}
