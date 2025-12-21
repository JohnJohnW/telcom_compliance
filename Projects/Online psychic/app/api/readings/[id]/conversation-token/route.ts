import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe/client'
import { getReadingTypeById } from '@/lib/reading-types-data'

/**
 * Get agent ID from Stripe session metadata
 */
async function getAgentIdFromReading(readingId: string, sessionId?: string): Promise<string | null> {
  try {
    // If we have a session_id, use it directly
    if (sessionId) {
      const session = await stripe.checkout.sessions.retrieve(sessionId)
      if (session.metadata?.reading_id === readingId) {
        return session.metadata.elevenlabs_agent_id || null
      }
    }

    // Try to find session by searching for reading_id in metadata
    // Note: Stripe doesn't support searching by metadata directly
    // For now, we'll need the session_id or use the reading type ID from the URL
    // Alternative: store session_id in URL or use reading type ID to get agent
    return null
  } catch (error) {
    console.error('Error retrieving agent ID from Stripe:', error)
    return null
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const readingId = params.id

    if (!readingId) {
      console.error('Reading ID is missing from params')
      return NextResponse.json(
        { error: 'Reading ID is required' },
        { status: 400 }
      )
    }

    const apiKey = process.env.ELEVENLABS_API_KEY

    if (!apiKey) {
      console.error('ELEVENLABS_API_KEY is not set')
      return NextResponse.json(
        { error: 'ElevenLabs API key not configured' },
        { status: 500 }
      )
    }

    // Try to get session_id from request body
    let sessionId: string | undefined
    try {
      const body = await request.json()
      sessionId = body.session_id
    } catch {
      // No body provided, continue without session_id
    }

    // Get agent ID from Stripe metadata or reading type
    let agentId: string | null = null

    if (sessionId) {
      agentId = await getAgentIdFromReading(readingId, sessionId)
    }

    // If we couldn't get agent ID from Stripe, try to extract from reading ID
    // The reading ID format might contain the reading type ID
    // For now, we'll need to pass reading_type_id in the request or extract from URL
    if (!agentId) {
      // Try to get from request body
      try {
        const body = await request.json()
        if (body.reading_type_id) {
          const readingType = getReadingTypeById(body.reading_type_id)
          agentId = readingType?.elevenlabs_agent_id || null
        }
      } catch {
        // Ignore
      }
    }

    if (!agentId) {
      return NextResponse.json(
        { error: 'Agent ID not found. Please provide session_id or reading_type_id.' },
        { status: 404 }
      )
    }

    // Generate signed URL for WebSocket connection
    try {
      const signedUrlResponse = await fetch(
        `https://api.elevenlabs.io/v1/convai/conversation/get-signed-url?agent_id=${agentId}`,
        {
          method: 'GET',
          headers: {
            'xi-api-key': apiKey,
          },
        }
      )

      if (!signedUrlResponse.ok) {
        const errorText = await signedUrlResponse.text()
        let errorData: any = {}
        try {
          errorData = JSON.parse(errorText)
        } catch {
          errorData = { detail: { message: errorText } }
        }
        
        console.error('Failed to get signed URL:', signedUrlResponse.status, errorText)
        
        const errorMessage = errorData.detail?.message || errorData.message || errorText
        const isQuotaError = errorMessage.toLowerCase().includes('quota') || 
                            errorMessage.toLowerCase().includes('limit') ||
                            signedUrlResponse.status === 429
        
        return NextResponse.json(
          { 
            error: isQuotaError 
              ? 'quota_exceeded' 
              : 'Failed to generate signed URL', 
            details: errorMessage,
            quotaExceeded: isQuotaError
          },
          { status: signedUrlResponse.status }
        )
      }

      const signedUrlData = await signedUrlResponse.json()
      
      console.log('Signed URL generated successfully')
      
      return NextResponse.json({
        agentId: agentId,
        signedUrl: signedUrlData.signed_url,
      })
    } catch (error) {
      console.error('Error generating conversation token:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      return NextResponse.json(
        { error: 'Failed to generate conversation token', details: errorMessage },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Conversation token error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    const errorStack = error instanceof Error ? error.stack : undefined
    return NextResponse.json(
      { 
        error: 'Failed to create conversation token',
        details: errorMessage,
        ...(process.env.NODE_ENV === 'development' && { stack: errorStack })
      },
      { status: 500 }
    )
  }
}
