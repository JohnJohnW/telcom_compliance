import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe/client'
import { getReadingTypeById, ReadingTypeData } from '@/lib/reading-types-data'
import { randomUUID } from 'crypto'

interface CheckoutRequestBody {
  readingTypeId: string
  psychic?: string
}

/**
 * Validates reading type ID format
 */
function validateReadingTypeId(readingTypeId: unknown): string | null {
  if (typeof readingTypeId !== 'string' || !readingTypeId.trim()) {
    return null
  }
  
  return readingTypeId.trim()
}

export async function POST(request: NextRequest) {
  try {
    let body: CheckoutRequestBody
    try {
      body = await request.json()
    } catch (parseError) {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      )
    }

    const readingTypeId = validateReadingTypeId(body.readingTypeId)
    if (!readingTypeId) {
      return NextResponse.json(
        { error: 'Valid reading type ID is required' },
        { status: 400 }
      )
    }

    // Get reading type from hardcoded data
    const readingType = getReadingTypeById(readingTypeId)
    if (!readingType) {
      return NextResponse.json(
        { error: 'Reading type not found or inactive' },
        { status: 404 }
      )
    }

    // Validate reading type data
    if (!readingType.name || !readingType.price || readingType.price <= 0) {
      return NextResponse.json(
        { error: 'Invalid reading type data' },
        { status: 400 }
      )
    }

    // Generate a unique reading ID (will be stored in Stripe metadata)
    const readingId = randomUUID()

    // Get the base URL from the request or environment variable
    const origin = request.headers.get('origin') || request.nextUrl.origin
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || origin
    
    // Ensure baseUrl doesn't have trailing slash and is valid
    const cleanBaseUrl = baseUrl.replace(/\/$/, '').trim()
    if (!cleanBaseUrl || !cleanBaseUrl.startsWith('http')) {
      return NextResponse.json(
        { error: 'Invalid site URL configuration' },
        { status: 500 }
      )
    }
    
    const successUrl = `${cleanBaseUrl}/readings/${readingId}?session_id={CHECKOUT_SESSION_ID}`
    const cancelUrl = `${cleanBaseUrl}/readings/cancel?reading_id=${readingId}`
    
    // Create Stripe Checkout Session with all data in metadata
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'aud',
            product_data: {
              name: readingType.name,
              description: readingType.description || undefined,
            },
            unit_amount: readingType.price,
          },
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        reading_id: readingId,
        reading_type_id: readingTypeId,
        reading_type_name: readingType.name,
        reading_type_price: readingType.price.toString(),
        reading_type_duration: readingType.duration_minutes.toString(),
        elevenlabs_agent_id: readingType.elevenlabs_agent_id,
        psychic: body.psychic || '',
      },
    })

    if (!checkoutSession.url) {
      return NextResponse.json(
        { error: 'Failed to create checkout session URL' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      sessionId: checkoutSession.id,
      url: checkoutSession.url,
    })
  } catch (error) {
    console.error('Checkout error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { error: 'Failed to create checkout session', details: errorMessage },
      { status: 500 }
    )
  }
}

