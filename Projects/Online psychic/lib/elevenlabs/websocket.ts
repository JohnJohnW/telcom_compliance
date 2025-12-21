export type WebSocketMessageType = 
  | 'audio' 
  | 'transcript' 
  | 'conversation_start' 
  | 'conversation_end' 
  | 'error' 
  | 'ping' 
  | 'pong'
  | 'contextual_update'
  | 'user_transcript'
  | 'agent_response'

export interface WebSocketMessage {
  type: WebSocketMessageType
  data?: any
  text?: string
  audio?: ArrayBuffer
  error?: string
}

export type WebSocketEventHandler = (message: WebSocketMessage) => void

export class ElevenLabsWebSocket {
  private ws: WebSocket | null = null
  private agentId: string
  private apiKey?: string
  private conversationToken?: string
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5
  private reconnectDelay = 1000
  private isReconnecting = false
  private eventHandlers: Map<WebSocketMessageType, WebSocketEventHandler[]> = new Map()
  private onOpenCallbacks: (() => void)[] = []
  private onCloseCallbacks: (() => void)[] = []
  private onErrorCallbacks: ((error: Error) => void)[] = []

  constructor(agentId: string, apiKey?: string) {
    this.agentId = agentId
    this.apiKey = apiKey
  }

  connect(signedUrl?: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        // According to ElevenLabs docs: https://elevenlabs.io/docs/agents-platform/libraries/web-sockets
        // Use signed URL if provided (recommended), otherwise construct URL with API key or token
        let url: string
        
        if (signedUrl) {
          // Use the complete signed URL from the server
          // Format: wss://api.elevenlabs.io/v1/convai/conversation?agent_id={agentId}&token={token}
          url = signedUrl
          console.log('Using signed URL for WebSocket connection')
        } else {
          // Fallback: construct URL manually
          url = `wss://api.elevenlabs.io/v1/convai/conversation?agent_id=${this.agentId}`
          
          // WebSocket connections require API key (tokens are for WebRTC)
          if (this.apiKey) {
            url += `&xi-api-key=${encodeURIComponent(this.apiKey)}`
            console.log('Using API key for WebSocket connection (fallback)')
          } else {
            console.error('No signed URL or API key provided for WebSocket connection')
            reject(new Error('No authentication method provided for WebSocket'))
            return
          }
        }

        console.log('Connecting to WebSocket URL:', url.replace(this.apiKey || /token=[^&]+/g, '[AUTH_HIDDEN]'))
        this.ws = new WebSocket(url)

        this.ws.onopen = () => {
          console.log('✅ WebSocket connected to ElevenLabs successfully')
          console.log('WebSocket readyState:', this.ws?.readyState)
          this.reconnectAttempts = 0
          this.isReconnecting = false
          
          // According to ElevenLabs docs, we need to send conversation_initiation_client_data
          // after the WebSocket opens (this is optional but recommended)
          if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            console.log('Sending conversation initiation message...')
            try {
              // Send initiation message - this can be empty or contain initial context
              this.send({
                type: 'conversation_initiation_client_data',
              })
              console.log('✅ Conversation initiation message sent')
            } catch (error) {
              console.error('Failed to send initiation message:', error)
              // Don't fail the connection if initiation fails - it's optional
            }
          }

          this.onOpenCallbacks.forEach(callback => callback())
          resolve()
        }

        this.ws.onmessage = (event) => {
          this.handleMessage(event)
        }

        this.ws.onerror = (error) => {
          console.error('WebSocket error event:', error)
          console.error('WebSocket readyState:', this.ws?.readyState)
          // Note: WebSocket error events don't provide detailed error info
          // The actual error will be in the onclose event
        }

        this.ws.onclose = (event) => {
          console.log('WebSocket closed:', {
            code: event.code,
            reason: event.reason,
            wasClean: event.wasClean,
            readyState: this.ws?.readyState
          })
          
          // Create error message based on close code
          let errorMessage = 'WebSocket connection error'
          if (event.code === 1006) {
            errorMessage = 'WebSocket connection closed abnormally. Check your API key and network connection.'
          } else if (event.code === 1002) {
            errorMessage = 'WebSocket protocol error. Invalid API key or authentication failed.'
          } else if (event.code === 1003) {
            errorMessage = 'WebSocket data error. Invalid message format.'
          } else if (event.code === 1008) {
            errorMessage = 'WebSocket policy violation. Check API key permissions.'
          } else if (event.code === 1011) {
            errorMessage = 'WebSocket server error. ElevenLabs service may be unavailable.'
          } else if (event.reason) {
            errorMessage = `WebSocket closed: ${event.reason}`
          }
          
          // Only reject if connection failed (not if it was a clean close)
          if (event.code !== 1000 && this.ws?.readyState !== WebSocket.OPEN) {
            const errorObj = new Error(errorMessage)
            this.onErrorCallbacks.forEach(callback => callback(errorObj))
            if (this.ws?.readyState === WebSocket.CONNECTING || this.ws?.readyState === WebSocket.CLOSING) {
              reject(errorObj)
            }
          }
          
          this.onCloseCallbacks.forEach(callback => callback())
          
          // Attempt reconnection if not intentional close
          if (event.code !== 1000 && !this.isReconnecting && this.reconnectAttempts < this.maxReconnectAttempts) {
            this.reconnect()
          }
        }
      } catch (error) {
        reject(error)
      }
    })
  }

  private handleMessage(event: MessageEvent) {
    try {
      console.log('WebSocket message received:', {
        dataType: event.data?.constructor?.name,
        isArrayBuffer: event.data instanceof ArrayBuffer,
        isBlob: event.data instanceof Blob,
        isString: typeof event.data === 'string',
        size: event.data instanceof ArrayBuffer ? event.data.byteLength : 
              event.data instanceof Blob ? event.data.size :
              typeof event.data === 'string' ? event.data.length : 'unknown'
      })

      // Handle binary audio data
      if (event.data instanceof ArrayBuffer) {
        console.log('Received binary audio data, size:', event.data.byteLength, 'bytes')
        this.emit('audio', {
          type: 'audio',
          audio: event.data,
        })
        return
      }
      
      // Handle Blob audio data
      if (event.data instanceof Blob) {
        console.log('Received Blob audio data, size:', event.data.size, 'type:', event.data.type)
        // Convert Blob to ArrayBuffer asynchronously
        event.data.arrayBuffer().then((arrayBuffer) => {
          console.log('Blob converted to ArrayBuffer, size:', arrayBuffer.byteLength)
          this.emit('audio', {
            type: 'audio',
            audio: arrayBuffer,
          })
        }).catch((error) => {
          console.error('Error converting Blob to ArrayBuffer:', error)
        })
        return
      }

      // Handle text/JSON messages (ElevenLabs uses JSON format)
      if (typeof event.data === 'string') {
        console.log('Received text message:', event.data.substring(0, 200)) // Log first 200 chars
        try {
          const parsed = JSON.parse(event.data)
          console.log('Parsed JSON message type:', parsed.type)
          
          // Handle ping events (keep connection alive)
          if (parsed.type === 'ping') {
            const pingEvent = parsed.ping_event
            console.log('Received ping, sending pong')
            setTimeout(() => {
              this.send({
                type: 'pong',
                event_id: pingEvent.event_id,
              })
            }, pingEvent.ping_ms || 0)
            return
          }
          
          // Handle user transcript
          if (parsed.type === 'user_transcript') {
            const userTranscriptEvent = parsed.user_transcription_event
            console.log('📝 User transcript:', userTranscriptEvent.user_transcript)
            this.emit('transcript', {
              type: 'transcript',
              text: userTranscriptEvent.user_transcript,
              data: parsed,
            })
            return
          }
          
          // Handle agent response (text)
          if (parsed.type === 'agent_response') {
            const agentResponseEvent = parsed.agent_response_event
            console.log('🤖 Agent response:', agentResponseEvent.agent_response)
            this.emit('transcript', {
              type: 'transcript',
              text: agentResponseEvent.agent_response,
              data: parsed,
            })
            return
          }
          
          // Handle audio events (this is the key one!)
          if (parsed.type === 'audio') {
            const audioEvent = parsed.audio_event
            console.log('🔊 Audio event received:', {
              hasAudio: !!audioEvent,
              audioType: typeof audioEvent?.audio,
            })
            
            // Audio comes as base64 string in the audio_event
            if (audioEvent?.audio) {
              this.emit('audio', {
                type: 'audio',
                audio: audioEvent.audio, // This is base64 string
                data: parsed,
              })
            }
            return
          }
          
          // Handle other event types
          if (parsed.type) {
            console.log('Emitting message type:', parsed.type)
            this.emit(parsed.type as WebSocketMessageType, parsed)
            return
          }
          
          // Fallback for unknown formats
          console.log('Unknown message format:', parsed)
          this.emit('transcript', {
            type: 'transcript',
            text: JSON.stringify(parsed),
            data: parsed,
          })
        } catch (parseError) {
          // Plain text message
          console.log('Not JSON, treating as plain text:', event.data.substring(0, 100))
          this.emit('transcript', {
            type: 'transcript',
            text: event.data,
          })
        }
      }
    } catch (error) {
      console.error('Error handling WebSocket message:', error)
      this.emit('error', {
        type: 'error',
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    }
  }

  send(message: WebSocketMessage | ArrayBuffer | object) {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      console.warn('WebSocket is not open, cannot send message. ReadyState:', this.ws?.readyState)
      return false
    }

    try {
      if (message instanceof ArrayBuffer) {
        // Send binary audio data (legacy support)
        console.warn('Sending binary audio - consider using JSON format instead')
        this.ws.send(message)
      } else if (typeof message === 'object') {
        // Send JSON message (ElevenLabs format)
        const jsonMessage = JSON.stringify(message)
        console.log('Sending JSON message:', jsonMessage.substring(0, 100))
        this.ws.send(jsonMessage)
      } else {
        // Send as WebSocketMessage format
        this.ws.send(JSON.stringify(message))
      }
      return true
    } catch (error) {
      console.error('Error sending WebSocket message:', error)
      return false
    }
  }

  /**
   * Send contextual update to the agent without disrupting the conversation flow.
   * According to ElevenLabs docs: https://elevenlabs.io/docs/agents-platform/libraries/web-sockets
   * Contextual updates can be sent at any time to provide additional context to the agent.
   * 
   * @param context - Additional context information to send to the agent
   * @returns true if the message was sent successfully, false otherwise
   */
  sendContextualUpdate(context: string | Record<string, any>): boolean {
    const contextData = typeof context === 'string' 
      ? { context: context }
      : context
    
    return this.send({
      type: 'contextual_update',
      ...contextData,
    })
  }

  on(event: WebSocketMessageType, handler: WebSocketEventHandler) {
    if (!this.eventHandlers.has(event)) {
      this.eventHandlers.set(event, [])
    }
    this.eventHandlers.get(event)!.push(handler)
  }

  off(event: WebSocketMessageType, handler: WebSocketEventHandler) {
    const handlers = this.eventHandlers.get(event)
    if (handlers) {
      const index = handlers.indexOf(handler)
      if (index > -1) {
        handlers.splice(index, 1)
      }
    }
  }

  onOpen(callback: () => void) {
    this.onOpenCallbacks.push(callback)
  }

  onClose(callback: () => void) {
    this.onCloseCallbacks.push(callback)
  }

  onError(callback: (error: Error) => void) {
    this.onErrorCallbacks.push(callback)
  }

  private emit(type: WebSocketMessageType, message: WebSocketMessage) {
    const handlers = this.eventHandlers.get(type)
    if (handlers) {
      handlers.forEach(handler => handler(message))
    }
  }

  private reconnect() {
    if (this.isReconnecting) return
    
    this.isReconnecting = true
    this.reconnectAttempts++
    
    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1)
    
    setTimeout(() => {
      console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`)
      // Use stored token if available, otherwise will use API key fallback
      this.connect(this.conversationToken).catch(error => {
        console.error('Reconnection failed:', error)
        if (this.reconnectAttempts >= this.maxReconnectAttempts) {
          this.emit('error', {
            type: 'error',
            error: 'Max reconnection attempts reached',
          })
        }
      })
    }, delay)
  }

  disconnect() {
    this.isReconnecting = false
    if (this.ws) {
      this.ws.close(1000, 'Intentional disconnect')
      this.ws = null
    }
  }

  isConnected(): boolean {
    return this.ws !== null && this.ws.readyState === WebSocket.OPEN
  }
}

