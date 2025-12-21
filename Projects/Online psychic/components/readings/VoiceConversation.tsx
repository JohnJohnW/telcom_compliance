'use client'

import { useEffect, useRef, useState } from 'react'
import { ElevenLabsWebSocket } from '@/lib/elevenlabs/websocket'
import { AudioCapture, AudioPlayback } from '@/lib/elevenlabs/audio'

interface VoiceConversationProps {
  agentId: string
  readingId: string
  readingTypeName: string
  onTranscriptUpdate?: (transcript: string) => void
  onSessionEnd?: () => void
}

type ConversationState = 'idle' | 'connecting' | 'ready' | 'active' | 'ended' | 'error'

// Reading type themes
const readingThemes: Record<string, {
  colors: { primary: string; secondary: string; accent: string }
  messages: {
    connect: string
    connecting: string
    ready: string
    active: string
    ended: string
  }
  icon: string
}> = {
  'Tarot Reading': {
    colors: { primary: '#8b5cf6', secondary: '#a855f7', accent: '#c084fc' },
    messages: {
      connect: 'Consult the tarot cards',
      connecting: 'Shuffling the deck...',
      ready: 'The cards are ready. Ask your question.',
      active: 'The cards reveal their secrets...',
      ended: 'Your reading is complete. May the cards guide you.',
    },
    icon: '🃏',
  },
  'Astrology Reading': {
    colors: { primary: '#6366f1', secondary: '#818cf8', accent: '#a5b4fc' },
    messages: {
      connect: 'Explore your cosmic blueprint',
      connecting: 'Aligning with the stars...',
      ready: 'The stars align. Begin your journey.',
      active: 'Channeling cosmic insights...',
      ended: 'Your cosmic reading is complete. The universe has spoken.',
    },
    icon: '⭐',
  },
  'Love & Relationship Reading': {
    colors: { primary: '#ec4899', secondary: '#f472b6', accent: '#f9a8d4' },
    messages: {
      connect: 'Discover your love path',
      connecting: 'Opening the heart chakra...',
      ready: 'Your love guide is ready. Share your heart.',
      active: 'Receiving messages from the heart...',
      ended: 'Your love reading is complete. Follow your heart.',
    },
    icon: '💕',
  },
  'Career Guidance Reading': {
    colors: { primary: '#facc15', secondary: '#fde047', accent: '#fef08a' },
    messages: {
      connect: 'Navigate your professional path',
      connecting: 'Channeling prosperity energy...',
      ready: 'Your career guide awaits. Share your aspirations.',
      active: 'Receiving professional insights...',
      ended: 'Your career reading is complete. Success awaits you.',
    },
    icon: '✨',
  },
}

export function VoiceConversation({
  agentId,
  readingId,
  readingTypeName,
  onTranscriptUpdate,
  onSessionEnd,
}: VoiceConversationProps) {
  const [state, setState] = useState<ConversationState>('idle')
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(1)
  const [error, setError] = useState<string | null>(null)
  const [micPermissionDenied, setMicPermissionDenied] = useState(false)
  const [transcript, setTranscript] = useState<string[]>([])
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isStarting, setIsStarting] = useState(false)

  const wsRef = useRef<ElevenLabsWebSocket | null>(null)
  const audioCaptureRef = useRef<AudioCapture | null>(null)
  const audioPlaybackRef = useRef<AudioPlayback | null>(null)
  const transcriptBuffer = useRef<string[]>([])

  const theme = readingThemes[readingTypeName] || readingThemes['Tarot Reading']

  const saveTranscript = async (transcriptText: string) => {
    try {
      const response = await fetch(`/api/readings/${readingId}/transcript`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ transcript: transcriptText }),
      })

      if (!response.ok) {
        console.error('Failed to save transcript:', await response.text())
      } else {
        console.log('Transcript saved successfully')
      }
    } catch (error) {
      console.error('Error saving transcript:', error)
    }
  }

  useEffect(() => {
    let mounted = true

    const initializeConversation = async () => {
      try {
        setState('connecting')

        // Check microphone permissions first
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
          stream.getTracks().forEach(track => track.stop())
          setMicPermissionDenied(false)
        } catch (err) {
          console.error('Microphone permission denied:', err)
          setMicPermissionDenied(true)
          setError('Microphone access is required for voice readings. Please enable microphone permissions and refresh.')
          setState('error')
          return
        }

        // Get conversation token from API
        const tokenResponse = await fetch(`/api/readings/${readingId}/conversation-token`, {
          method: 'POST',
        })

        if (!tokenResponse.ok) {
          const errorData = await tokenResponse.json().catch(() => ({ error: 'Unknown error' }))
          const errorMessage = errorData.error || `HTTP ${tokenResponse.status}: ${tokenResponse.statusText}`
          const errorDetails = errorData.details || ''
          const fullErrorMessage = errorDetails 
            ? `${errorMessage}: ${errorDetails}`
            : errorMessage
          console.error('Failed to get conversation token:', {
            message: errorMessage,
            details: errorDetails,
            status: tokenResponse.status,
            readingId
          })
          setError(fullErrorMessage)
          setState('error')
          return
        }

        const tokenData = await tokenResponse.json()
        
        if (!tokenData.agentId) {
          throw new Error('Invalid response from server: missing agent ID')
        }

        // Use agentId from API response (more reliable than prop)
        const resolvedAgentId = tokenData.agentId || agentId

        if (!resolvedAgentId) {
          throw new Error('Agent ID is required but not provided')
        }

        // Get signed URL from server response
        // According to ElevenLabs docs, WebSocket should use signed URLs for secure connections
        // The signed URL contains the token and keeps the API key secure on the server
        const signedUrl = tokenData.signedUrl

        if (!signedUrl) {
          throw new Error('Signed URL is required but not provided by server')
        }

        console.log('✅ Signed URL received from server')

        // Initialize audio capture and playback
        audioCaptureRef.current = new AudioCapture()
        audioPlaybackRef.current = new AudioPlayback()

        // Initialize WebSocket connection
        // Use signed URL which contains the token for secure authentication
        // The signed URL is a complete WebSocket URL: wss://api.elevenlabs.io/v1/convai/conversation?agent_id={id}&token={token}
        wsRef.current = new ElevenLabsWebSocket(resolvedAgentId)
        
        console.log('WebSocket initialized', {
          hasSignedUrl: !!signedUrl,
          agentId: resolvedAgentId
        })

        // Set up connection promise BEFORE connecting
        let connectionResolve: (() => void) | null = null
        let connectionReject: ((error: Error) => void) | null = null
        const connectionPromise = new Promise<void>((resolve, reject) => {
          connectionResolve = resolve
          connectionReject = reject
          
          // Set timeout
          setTimeout(() => {
            reject(new Error('WebSocket connection timeout after 10 seconds'))
          }, 10000)
        })

        // Set up WebSocket event handlers BEFORE connecting
        wsRef.current.on('transcript', (message) => {
          if (!mounted) return
          
          if (message.text) {
            transcriptBuffer.current.push(message.text)
            const fullTranscript = transcriptBuffer.current.join('\n')
            setTranscript([...transcriptBuffer.current])
            
            if (onTranscriptUpdate) {
              onTranscriptUpdate(fullTranscript)
            }
          }
        })

        wsRef.current.on('audio', async (message) => {
          if (!mounted) return
          
          console.log('=== AUDIO EVENT RECEIVED ===')
          console.log('Audio message received:', {
            hasAudio: !!message.audio,
            audioType: message.audio?.constructor?.name,
            messageType: message.type,
            isMuted: isMuted,
            hasPlayback: !!audioPlaybackRef.current,
            fullMessageKeys: Object.keys(message)
          })
          
          if (isMuted) {
            console.log('Audio muted, skipping playback')
            return
          }
          
          setIsSpeaking(true)
          
          let audioData: ArrayBuffer | null = null
          
          // Handle different audio formats
          const audio = message.audio as any
          if (audio) {
            if (audio instanceof ArrayBuffer) {
              audioData = audio
              console.log('Audio is ArrayBuffer, size:', audioData.byteLength, 'bytes')
            } else if (audio instanceof Blob) {
              console.log('Audio is Blob, converting to ArrayBuffer, size:', audio.size)
              audioData = await audio.arrayBuffer()
              console.log('Blob converted, ArrayBuffer size:', audioData.byteLength)
            } else if (typeof audio === 'string') {
              // Base64 encoded audio
              console.log('Audio is base64 string, length:', audio.length, 'decoding...')
              try {
                const binaryString = atob(audio)
                const bytes = new Uint8Array(binaryString.length)
                for (let i = 0; i < binaryString.length; i++) {
                  bytes[i] = binaryString.charCodeAt(i)
                }
                audioData = bytes.buffer
                console.log('Base64 decoded, ArrayBuffer size:', audioData.byteLength)
              } catch (e) {
                console.error('Failed to decode base64 audio:', e)
              }
            }
          } else if (message.data?.audio) {
            // Audio might be nested in data
            console.log('Audio found in message.data:', typeof message.data.audio)
            const dataAudio = message.data.audio as any
            if (dataAudio instanceof ArrayBuffer) {
              audioData = dataAudio
              console.log('Audio from data is ArrayBuffer, size:', audioData.byteLength)
            } else if (typeof message.data.audio === 'string') {
              // Base64 encoded audio
              console.log('Audio is base64 string, length:', message.data.audio.length, 'decoding...')
              try {
                const binaryString = atob(message.data.audio)
                const bytes = new Uint8Array(binaryString.length)
                for (let i = 0; i < binaryString.length; i++) {
                  bytes[i] = binaryString.charCodeAt(i)
                }
                audioData = bytes.buffer
                console.log('Base64 decoded, ArrayBuffer size:', audioData.byteLength)
              } catch (decodeError) {
                console.error('Error decoding base64 audio:', decodeError)
              }
            }
          } else if (typeof audio === 'string') {
            // Audio is base64 string (from ElevenLabs audio_event)
            console.log('Audio is base64 string (from audio_event), length:', audio.length, 'decoding...')
            try {
              const binaryString = atob(audio)
              const bytes = new Uint8Array(binaryString.length)
              for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i)
              }
              audioData = bytes.buffer
              console.log('Base64 decoded from audio_event, ArrayBuffer size:', audioData.byteLength)
            } catch (decodeError) {
              console.error('Error decoding base64 audio from audio_event:', decodeError)
            }
          } else {
            console.warn('No audio data found in message structure:', {
              hasMessageAudio: !!message.audio,
              hasMessageData: !!message.data,
              hasMessageDataAudio: !!message.data?.audio,
              messageKeys: Object.keys(message)
            })
          }
          
          if (audioData && audioPlaybackRef.current) {
            try {
              console.log('=== ATTEMPTING TO PLAY AUDIO ===')
              console.log('Audio data size:', audioData.byteLength, 'bytes')
              console.log('AudioPlayback instance:', audioPlaybackRef.current)
              await audioPlaybackRef.current.playAudio(audioData)
              console.log('✅ Audio playback completed successfully')
            } catch (error) {
              console.error('❌ Error playing audio:', error)
              console.error('Error details:', {
                errorMessage: error instanceof Error ? error.message : String(error),
                errorStack: error instanceof Error ? error.stack : undefined
              })
            }
          } else {
            console.warn('⚠️ Cannot play audio:', {
              hasAudioData: !!audioData,
              hasPlayback: !!audioPlaybackRef.current,
              audioDataSize: audioData?.byteLength
            })
          }
          
          setIsSpeaking(false)
        })

        wsRef.current.on('conversation_start', () => {
          if (!mounted) return
          console.log('✅ Conversation started event received')
          setState('active')
          setIsListening(true)
        })
        
        // Log all events for debugging
        wsRef.current.on('transcript', (message) => {
          console.log('📝 Transcript event:', message)
        })
        
        wsRef.current.on('conversation_end', () => {
          if (!mounted) return
          console.log('🔚 Conversation end event received')
          
          const fullTranscript = transcriptBuffer.current.join('\n')
          if (fullTranscript.trim()) {
            saveTranscript(fullTranscript)
          }
          
          setState('ended')
          setIsListening(false)
          
          if (onSessionEnd) {
            onSessionEnd()
          }
        })
        
        wsRef.current.on('error', (message) => {
          if (!mounted) return
          console.error('❌ WebSocket error event:', message)
          setError(message.error || 'An error occurred during the conversation')
          setState('error')
        })

        wsRef.current.onOpen(() => {
          if (!mounted) return
          console.log('✅ WebSocket onOpen callback fired')
          
          // Resolve the connection promise
          if (connectionResolve) {
            connectionResolve()
            connectionResolve = null
            connectionReject = null
          }
          
          // Use a ref to get the current state value to avoid stale closure
          setState((currentState) => {
            console.log('onOpen callback - current state:', currentState)
            // Only set to ready if we're in connecting or idle state
            // Don't reset if we're already active, ended, or in error
            if (currentState === 'active' || currentState === 'ended' || currentState === 'error') {
              console.log('onOpen: Keeping current state:', currentState, '- NOT resetting to ready')
              return currentState
            }
            console.log('onOpen: Setting state to ready from:', currentState)
            return 'ready'
          })
        })

        wsRef.current.onError((error) => {
          if (!mounted) return
          console.error('WebSocket connection error callback:', error)
          
          // Reject the connection promise
          if (connectionReject) {
            connectionReject(error instanceof Error ? error : new Error(String(error)))
            connectionResolve = null
            connectionReject = null
          }
          
          const errorMessage = error instanceof Error ? error.message : 'Unknown error'
          // Don't set error state here - wait for onclose event which has more details
          // The onclose handler will set the proper error message
          console.log('WebSocket error received, waiting for close event for details')
        })

        wsRef.current.onClose(() => {
          if (!mounted) return
          console.log('WebSocket closed callback triggered, current state:', state)
          // The actual error details are logged in the WebSocket class
          // If we're in connecting state and connection closed, set error
          setState((currentState) => {
            if (currentState === 'connecting') {
              console.log('WebSocket closed during connection - setting error state')
              setError('Failed to connect to voice service. Please check your API key and network connection. Check the console for detailed error information.')
              return 'error'
            }
            if (currentState === 'active') {
              console.log('WebSocket closed during active session - keeping active state')
              return currentState
            }
            if (currentState === 'ended' || currentState === 'error') {
              return currentState
            }
            console.log('WebSocket closed, resetting to ready from:', currentState)
            return 'ready'
          })
        })

        // Connect WebSocket using signed URL
        // According to ElevenLabs docs, signed URLs are the recommended way for WebSocket connections
        console.log('Connecting WebSocket with signed URL...')
        
        // Start the connection with signed URL
        wsRef.current.connect(signedUrl).catch((error) => {
          console.error('WebSocket connect() promise rejected:', error)
          if (connectionReject) {
            connectionReject(error instanceof Error ? error : new Error(String(error)))
          }
          throw error
        })
        
        // Wait for connection to be established (via onOpen callback)
        try {
          await connectionPromise
          console.log('✅ WebSocket connection established successfully')
          
          // Verify connection status
          if (!wsRef.current.isConnected()) {
            console.warn('⚠️ isConnected() returns false, but onOpen was called. Waiting...')
            // Give it a moment - sometimes readyState updates slightly after onOpen
            await new Promise(resolve => setTimeout(resolve, 200))
            if (!wsRef.current.isConnected()) {
              throw new Error('WebSocket connection verification failed - readyState may not be OPEN')
            }
          }
          
          console.log('✅ WebSocket connection verified and ready')
        } catch (error) {
          console.error('❌ WebSocket connection failed:', error)
          throw error
        }

        // Start audio capture
        await audioCaptureRef.current.startCapture()

        // Set up audio data callback to send to WebSocket
        // According to ElevenLabs docs, audio should be sent as JSON with base64 encoded audio
        audioCaptureRef.current.onAudioData(async (audioData) => {
          if (!wsRef.current?.isConnected()) {
            console.warn('WebSocket not connected, cannot send audio. isConnected:', wsRef.current?.isConnected())
            return
          }
          
          if (isMuted) {
            console.log('Audio muted, not sending')
            return
          }
          
          try {
            // Convert ArrayBuffer to base64
            const base64Audio = await arrayBufferToBase64(audioData)
            
            console.log('Sending audio chunk to WebSocket, size:', audioData.byteLength, 'base64 length:', base64Audio.length)
            
            // Send as JSON message according to ElevenLabs format
            // Note: Audio chunks don't have a 'type' field, just the user_audio_chunk
            const sent = wsRef.current.send({
              user_audio_chunk: base64Audio,
            })
            
            if (!sent) {
              console.warn('Failed to send audio data - WebSocket may not be ready')
            } else {
              setIsListening(true)
            }
          } catch (error) {
            console.error('Error sending audio data:', error)
          }
        })
        
        // Helper function to convert ArrayBuffer to base64
        const arrayBufferToBase64 = (buffer: ArrayBuffer): Promise<string> => {
          return new Promise((resolve, reject) => {
            const blob = new Blob([buffer])
            const reader = new FileReader()
            reader.onloadend = () => {
              const base64 = (reader.result as string).split(',')[1] // Remove data:audio/...;base64, prefix
              resolve(base64)
            }
            reader.onerror = reject
            reader.readAsDataURL(blob)
          })
        }

      } catch (error) {
        console.error('Error initializing conversation:', error)
        if (mounted) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to initialize conversation'
          setError(errorMessage)
          setState('error')
        }
      }
    }

    initializeConversation()

    return () => {
      mounted = false
      
      // Cleanup
      if (audioCaptureRef.current) {
        audioCaptureRef.current.stopCapture()
      }
      
      if (audioPlaybackRef.current) {
        audioPlaybackRef.current.cleanup()
      }
      
      if (wsRef.current) {
        wsRef.current.disconnect()
      }

      // Save transcript on unmount if conversation was active
      if (transcriptBuffer.current.length > 0 && state === 'active') {
        const fullTranscript = transcriptBuffer.current.join('\n')
        if (fullTranscript.trim()) {
          saveTranscript(fullTranscript)
        }
      }
    }
  }, [agentId, readingId, isMuted])

  const handleStartConversation = async () => {
    if (isStarting) return // Prevent double-clicks
    
    try {
      setIsStarting(true)
      console.log('handleStartConversation called, current state:', state)
      
      if (!wsRef.current) {
        console.error('WebSocket not initialized')
        setError('WebSocket connection not ready. Please refresh the page.')
        setState('error')
        setIsStarting(false)
        return
      }

      // Wait for connection with timeout (max 5 seconds)
      let attempts = 0
      const maxAttempts = 50 // 50 * 100ms = 5 seconds
      while (!wsRef.current.isConnected() && attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 100))
        attempts++
      }

      const isConnected = wsRef.current.isConnected()
      console.log('WebSocket connected status after wait:', isConnected, 'attempts:', attempts)

      if (!isConnected) {
        console.error('WebSocket not connected after waiting. Current state:', state)
        setError('Connection timeout. Please refresh the page and try again.')
        setState('error')
        setIsStarting(false)
        return
      }

      // Connection is ready, start the conversation
      console.log('Starting conversation...')
      console.log('WebSocket isConnected:', wsRef.current?.isConnected())
      
      // Set state to active - this should persist
      setState('active')
      setIsListening(true)
      setIsStarting(false)
      
      console.log('State set to active, isListening set to true')
      
      // Try sending a start message (some implementations require this)
      // But don't fail if it doesn't work - conversation might start automatically
      try {
        const sent = wsRef.current.send({
          type: 'conversation_start',
        })
        console.log('Conversation start message sent:', sent)
      } catch (error) {
        console.warn('Could not send conversation_start message (may not be required):', error)
        // Don't fail if this doesn't work - conversation might start automatically
      }
    } catch (error) {
      console.error('Error in handleStartConversation:', error)
      setError(error instanceof Error ? error.message : 'Failed to start conversation')
      setState('error')
      setIsStarting(false)
    }
  }

  const handleEndConversation = async () => {
    const fullTranscript = transcriptBuffer.current.join('\n')
    if (fullTranscript.trim()) {
      await saveTranscript(fullTranscript)
    }

    if (wsRef.current) {
      wsRef.current.send({
        type: 'conversation_end',
      })
      wsRef.current.disconnect()
    }

    if (audioCaptureRef.current) {
      audioCaptureRef.current.stopCapture()
    }

    setState('ended')
    setIsListening(false)

    if (onSessionEnd) {
      onSessionEnd()
    }
  }

  const getStateMessage = () => {
    switch (state) {
      case 'connecting':
        return theme.messages.connecting
      case 'ready':
        return theme.messages.ready
      case 'active':
        return isListening ? 'Listening...' : isSpeaking ? 'Speaking...' : theme.messages.active
      case 'ended':
        return theme.messages.ended
      case 'error':
        return error || 'Something went wrong. Please try again.'
      default:
        return theme.messages.connect
    }
  }

  const handleRetry = () => {
    setError(null)
    setState('idle')
    setMicPermissionDenied(false)
    window.location.reload()
  }

  const handleRequestPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      stream.getTracks().forEach(track => track.stop())
      setMicPermissionDenied(false)
      setError(null)
      setState('connecting')
      window.location.reload()
    } catch (err) {
      setError('Please enable microphone permissions in your browser settings and refresh the page.')
      setMicPermissionDenied(true)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-gradient-to-br from-mystic-950 via-mystic-900 to-cosmic-950 overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Particle effects */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-mystic-800/30 backdrop-blur-sm bg-mystic-950/50">
          <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
            <div className="text-2xl sm:text-4xl flex-shrink-0">{theme.icon}</div>
            <div className="min-w-0 flex-1">
              <h1 className="text-lg sm:text-2xl font-mystical font-bold text-gradient-mystic truncate">
                {readingTypeName}
              </h1>
              <p className="text-mystic-300 text-xs sm:text-sm truncate">{getStateMessage()}</p>
            </div>
          </div>
          
          {/* Controls */}
          {state === 'active' && (
            <div className="hidden sm:flex items-center gap-4 flex-shrink-0">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 rounded-lg bg-mystic-800/50 hover:bg-mystic-700/50 transition-colors"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? '🔇' : '🔊'}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-24"
              />
              <button
                onClick={handleEndConversation}
                className="px-4 py-2 rounded-lg bg-red-600/50 hover:bg-red-600/70 transition-colors text-sm"
              >
                End Session
              </button>
            </div>
          )}
        </div>

        {/* Main conversation area */}
        <div className="flex-1 relative flex items-center justify-center">
          {/* Connecting/Ready state */}
          {(state === 'idle' || state === 'connecting') && (
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="text-center space-y-4 px-4">
                <div className="relative">
                  <div
                    className="w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-full border-4 animate-pulse"
                    style={{
                      borderColor: theme.colors.primary,
                      background: `radial-gradient(circle, ${theme.colors.primary}40, transparent)`,
                    }}
                  />
                  <div
                    className="absolute inset-0 w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-full border-4 border-mystic-500/50 animate-ping"
                    style={{
                      animationDelay: '0.5s',
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl sm:text-6xl">{theme.icon}</span>
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-mystical font-bold text-gradient-mystic mb-2">
                    {theme.messages.connect}
                  </h2>
                  <p className="text-mystic-300 text-base sm:text-lg">{getStateMessage()}</p>
                </div>
              </div>
            </div>
          )}

          {/* Ready state - show start button */}
          {state === 'ready' && (
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="text-center space-y-6 px-4">
                <div className="relative">
                  <div
                    className="w-32 h-32 mx-auto rounded-full border-4 border-mystic-500/30 animate-pulse"
                    style={{
                      background: `radial-gradient(circle, ${theme.colors.primary}40, transparent)`,
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl">{theme.icon}</span>
                  </div>
                </div>
                <div>
                  <h2 className="text-3xl font-mystical font-bold text-gradient-mystic mb-2">
                    {theme.messages.connect}
                  </h2>
                  <p className="text-mystic-300 text-lg">{getStateMessage()}</p>
                </div>
                <button
                  onClick={handleStartConversation}
                  disabled={isStarting}
                  className="px-8 py-4 bg-gradient-mystic text-white rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity glow-effect disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isStarting ? 'Starting...' : 'Begin Your Reading'}
                </button>
              </div>
            </div>
          )}

          {/* Active conversation state */}
          {state === 'active' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-4 sm:p-8">
              {/* Visual feedback */}
              <div className="mb-8">
                <div className="relative">
                  <div
                    className={`w-32 h-32 sm:w-40 sm:h-40 mx-auto rounded-full border-4 transition-all ${
                      isListening ? 'animate-pulse border-green-500' : 
                      isSpeaking ? 'animate-pulse border-blue-500' : 
                      'border-mystic-500/50'
                    }`}
                    style={{
                      background: `radial-gradient(circle, ${theme.colors.primary}${isListening || isSpeaking ? '60' : '40'}, transparent)`,
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl sm:text-7xl">{theme.icon}</span>
                  </div>
                </div>
                <p className="text-center mt-4 text-mystic-200 text-lg font-medium">
                  {isListening ? 'Listening to your energy...' : 
                   isSpeaking ? 'Receiving insights...' : 
                   theme.messages.active}
                </p>
              </div>

              {/* Transcript display */}
              {transcript.length > 0 && (
                <div className="w-full max-w-3xl max-h-64 overflow-y-auto bg-mystic-950/50 backdrop-blur-sm rounded-lg p-4 border border-mystic-800/30">
                  <div className="space-y-2">
                    {transcript.map((line, i) => (
                      <p key={i} className="text-mystic-200 text-sm sm:text-base">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {/* Mobile controls */}
              <div className="sm:hidden mt-6 flex gap-4">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-3 rounded-lg bg-mystic-800/50 hover:bg-mystic-700/50 transition-colors"
                >
                  {isMuted ? '🔇' : '🔊'}
                </button>
                <button
                  onClick={handleEndConversation}
                  className="px-6 py-3 rounded-lg bg-red-600/50 hover:bg-red-600/70 transition-colors"
                >
                  End
                </button>
              </div>
            </div>
          )}

          {/* Ended state */}
          {state === 'ended' && (
            <div className="absolute inset-0 flex items-center justify-center z-30 bg-mystic-950/95 backdrop-blur-sm">
              <div className="text-center space-y-6 max-w-md p-8">
                <div className="text-6xl">{theme.icon}</div>
                <h2 className="text-3xl font-mystical font-bold text-gradient-mystic">
                  Reading Complete
                </h2>
                <p className="text-mystic-300 text-lg">{theme.messages.ended}</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => window.location.href = `/readings/${readingId}/details`}
                    className="px-6 py-3 bg-gradient-mystic text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
                  >
                    View Reading Details
                  </button>
                  <button
                    onClick={() => window.location.href = '/readings/history'}
                    className="px-6 py-3 bg-mystic-800/50 text-mystic-200 rounded-lg font-semibold hover:bg-mystic-700/50 transition-colors"
                  >
                    Back to History
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Error state */}
          {state === 'error' && (
            <div className="absolute inset-0 flex items-center justify-center z-30 bg-mystic-950/95 backdrop-blur-sm">
              <div className="text-center space-y-6 max-w-md p-8">
                <div className="text-6xl">🔮</div>
                <h2 className="text-3xl font-mystical font-bold text-gradient-mystic">
                  Connection Issue
                </h2>
                <p className="text-mystic-300 text-lg">{getStateMessage()}</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {micPermissionDenied ? (
                    <button
                      onClick={handleRequestPermission}
                      className="px-6 py-3 bg-gradient-mystic text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
                    >
                      Enable Microphone
                    </button>
                  ) : (
                    <button
                      onClick={handleRetry}
                      className="px-6 py-3 bg-gradient-mystic text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
                    >
                      Try Again
                    </button>
                  )}
                  <button
                    onClick={() => window.location.href = '/readings/history'}
                    className="px-6 py-3 bg-mystic-800/50 text-mystic-200 rounded-lg font-semibold hover:bg-mystic-700/50 transition-colors"
                  >
                    Back to History
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
