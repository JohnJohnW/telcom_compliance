# ElevenLabs WebSocket Integration

## Overview

This implementation uses the ElevenLabs Agents Platform WebSocket API directly instead of the widget embed, providing complete control over the UI/UX. The implementation follows the official documentation: https://elevenlabs.io/docs/agents-platform/libraries/web-sockets

## Authentication

**Secure Token-Based Authentication**: The implementation uses signed URLs generated server-side, which keeps the API key secure and never exposes it to the client.

### How It Works:

1. **Server-Side Signed URL Generation** (Recommended)
   - Server calls `/v1/convai/conversation/get-signed-url` endpoint with API key
   - Server receives a complete WebSocket URL with embedded token
   - Signed URL is passed to the client for WebSocket connection
   - API key remains secure on the server
   - Token has limited lifetime and scope

2. **Fallback: API Key** (Development Only)
   - If no signed URL is provided, falls back to API key in URL
   - Only used for development/testing
   - Should not be used in production

## WebSocket Endpoint

**With Signed URL (Recommended):**
```
wss://api.elevenlabs.io/v1/convai/conversation?agent_id={agentId}&token={token}
```
The signed URL is obtained from: `GET /v1/convai/conversation/get-signed-url?agent_id={agentId}`

**With API Key (Fallback, Development Only):**
```
wss://api.elevenlabs.io/v1/convai/conversation?agent_id={agentId}&xi-api-key={apiKey}
```

## Message Protocol

### Client to Server Events

#### Audio Data
Send audio chunks as JSON with base64-encoded audio:
```json
{
  "user_audio_chunk": "<base64_encoded_audio_data>"
}
```

#### Contextual Updates
Send contextual information without disrupting conversation flow:
```json
{
  "type": "contextual_update",
  "context": "Additional context information"
}
```

#### Conversation Initiation (Optional)
Send after WebSocket opens to initialise conversation:
```json
{
  "type": "conversation_initiation_client_data"
}
```

### Server to Client Events

#### Audio Events
```json
{
  "type": "audio",
  "audio_event": {
    "audio": "<base64_encoded_audio_data>"
  }
}
```

#### Transcript Events
- **User Transcript**: `user_transcript` event with `user_transcription_event`
- **Agent Response**: `agent_response` event with `agent_response_event`

#### Ping/Pong (Keep-Alive)
- Server sends `ping` events
- Client responds with `pong` events containing `event_id` from ping

## Audio Format

- **Input**: Base64-encoded audio (PCM 16-bit, 16kHz, mono or WebM via MediaRecorder)
- **Output**: Base64-encoded audio from ElevenLabs (format may vary)

## Usage Example

```typescript
import { ElevenLabsWebSocket } from '@/lib/elevenlabs/websocket'

// Initialize WebSocket
const ws = new ElevenLabsWebSocket(agentId)

// Set up event handlers
ws.on('audio', (message) => {
  // Handle audio data
  playAudio(message.audio)
})

ws.on('transcript', (message) => {
  // Handle transcript updates
  updateTranscript(message.text)
})

// Connect with signed URL
await ws.connect(signedUrl)

// Send contextual update
ws.sendContextualUpdate('User is asking about tarot reading')

// Send audio chunk
ws.send({
  user_audio_chunk: base64AudioData
})
```

## Files

- `websocket.ts` - WebSocket connection management
- `audio.ts` - Audio capture and playback utilities

## References

- [ElevenLabs Agents Platform Overview](https://elevenlabs.io/docs/agents-platform/overview)
- [ElevenLabs WebSocket Libraries Documentation](https://elevenlabs.io/docs/agents-platform/libraries/web-sockets)

