import { NextRequest, NextResponse } from 'next/server'

/**
 * Fetch transcript endpoint
 * Since we're not using a database, transcripts are handled client-side
 * This endpoint provides a structure for future implementation
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const readingId = params.id

    // Transcripts are handled client-side by the ElevenLabs widget
    // The widget captures transcripts via events and can store them in localStorage
    // or send them to an external service

    return NextResponse.json({
      success: false,
      message: 'Transcripts are handled client-side. Please ensure the widget captures transcripts via events.',
    })
  } catch (error) {
    console.error('Transcript fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch transcript' },
      { status: 500 }
    )
  }
}
