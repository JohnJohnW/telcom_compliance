import { NextRequest, NextResponse } from 'next/server'

/**
 * Save transcript endpoint
 * Since we're not using a database, this just returns success
 * Transcripts are handled client-side by the ElevenLabs widget
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const readingId = params.id
    const body = await request.json()
    const { transcript } = body

    if (!transcript || typeof transcript !== 'string') {
      return NextResponse.json(
        { error: 'Transcript is required' },
        { status: 400 }
      )
    }

    // Transcript is handled client-side by the widget
    // In a production app without a database, you might want to:
    // 1. Store in browser localStorage
    // 2. Send to an external service
    // 3. Email to the customer
    // For now, we just acknowledge receipt

    console.log(`Transcript received for reading ${readingId} (length: ${transcript.length})`)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Transcript save error:', error)
    return NextResponse.json(
      { error: 'Failed to save transcript' },
      { status: 500 }
    )
  }
}
