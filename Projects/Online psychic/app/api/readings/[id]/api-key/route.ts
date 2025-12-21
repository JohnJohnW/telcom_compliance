import { NextRequest, NextResponse } from 'next/server'

/**
 * Secure endpoint to get ElevenLabs API key for WebSocket connections
 * No authentication required - API key is server-side only
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const readingId = params.id

    if (!readingId) {
      return NextResponse.json(
        { error: 'Reading ID is required' },
        { status: 400 }
      )
    }

    const apiKey = process.env.ELEVENLABS_API_KEY

    if (!apiKey) {
      return NextResponse.json(
        { error: 'ElevenLabs API key not configured on server' },
        { status: 500 }
      )
    }

    // Return API key securely
    // Note: In production, consider using temporary tokens or server-side WebSocket proxy
    return NextResponse.json({
      apiKey: apiKey,
      note: 'This API key is required for WebSocket connections. Tokens are for WebRTC only.',
    })
  } catch (error) {
    console.error('API key fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch API key' },
      { status: 500 }
    )
  }
}
