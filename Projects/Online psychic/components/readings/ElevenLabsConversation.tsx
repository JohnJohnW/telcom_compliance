'use client'

import { useEffect, useRef, useState } from 'react'
import { useConversation } from '@elevenlabs/react'

interface ElevenLabsConversationProps {
  agentId: string
  readingId: string
  readingTypeName: string
  onTranscriptUpdate?: (transcript: string) => void
  onSessionEnd?: () => void
}

// Reading type themes matching your design
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

export function ElevenLabsConversation({
  agentId,
  readingId,
  readingTypeName,
  onTranscriptUpdate,
  onSessionEnd,
}: ElevenLabsConversationProps) {
  const [conversationToken, setConversationToken] = useState<string | null>(null)
  const [isLoadingToken, setIsLoadingToken] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [transcript, setTranscript] = useState<string[]>([])
  const transcriptBuffer = useRef<string[]>([])
  const [micMuted, setMicMuted] = useState(false)
  const [volume, setVolume] = useState(1)

  const theme = readingThemes[readingTypeName] || readingThemes['Tarot Reading']

  // Debug: Log props
  useEffect(() => {
    console.log('ElevenLabsConversation initialized:', { agentId, readingId, readingTypeName })
  }, [agentId, readingId, readingTypeName])

  // Initialize the conversation hook
  // Note: The hook may need API key for WebRTC connections
  const conversation = useConversation({
    micMuted,
    volume,
    onMessage: (message) => {
      console.log('Conversation message received:', message)
      // Check if message has the expected structure and process it
      if (message && message.message) {
        const text = message.message || ''
        if (text.trim()) {
          transcriptBuffer.current.push(text)
          const fullTranscript = transcriptBuffer.current.join('\n')
          setTranscript([...transcriptBuffer.current])
          
          if (onTranscriptUpdate) {
            onTranscriptUpdate(fullTranscript)
          }
        }
      }
    },
    onError: (error) => {
      console.error('Conversation error:', error)
      const errorMessage = typeof error === 'string' ? error : (error as any)?.message || 'An error occurred during the conversation'
      setError(errorMessage)
    },
    onDisconnect: async () => {
      console.log('Conversation disconnected')
      const fullTranscript = transcriptBuffer.current.join('\n')
      if (fullTranscript.trim()) {
        await saveTranscript(fullTranscript)
      }
      if (onSessionEnd) {
        onSessionEnd()
      }
    },
  })

  // Debug: Log conversation status changes
  useEffect(() => {
    console.log('Conversation status changed:', conversation.status, {
      isConnected: conversation.status === 'connected',
      isListening: (conversation as any).isListening,
      isSpeaking: (conversation as any).isSpeaking,
    })
  }, [conversation.status, (conversation as any).isListening, (conversation as any).isSpeaking])

  // Fetch conversation token from server
  useEffect(() => {
    const fetchToken = async () => {
      try {
        setIsLoadingToken(true)
        const response = await fetch(`/api/readings/${readingId}/conversation-token`, {
          method: 'POST',
        })

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
          throw new Error(errorData.error || `HTTP ${response.status}`)
        }

        const data = await response.json()
        
        console.log('Token response received:', { 
          hasToken: !!data.conversationToken, 
          hasAgentId: !!data.agentId,
          agentId: data.agentId 
        })
        
        if (!data.conversationToken && !data.agentId) {
          console.error('Invalid response from server:', data)
          throw new Error('Invalid response from server: missing both token and agent ID')
        }

        // If we have a token, use it. Otherwise, use agentId for public agents
        if (data.conversationToken) {
          console.log('Setting conversation token')
          setConversationToken(data.conversationToken)
        } else if (data.agentId) {
          // For public agents, we can use agentId directly
          console.log('No token, will use agent ID:', data.agentId)
          setConversationToken(null) // Will use agentId in startSession
        }
      } catch (err) {
        console.error('Failed to get conversation token:', err)
        setError(err instanceof Error ? err.message : 'Failed to initialize conversation')
      } finally {
        setIsLoadingToken(false)
      }
    }

    fetchToken()
  }, [readingId])

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

  const handleStart = async () => {
    try {
      console.log('handleStart called', { conversationToken, agentId, readingId })
      setError(null)
      
      // Request microphone permission first
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        // Stop the stream immediately - we just needed permission
        stream.getTracks().forEach(track => track.stop())
        console.log('Microphone permission granted')
      } catch (err) {
        console.error('Microphone permission error:', err)
        setError('Microphone access is required. Please enable microphone permissions and try again.')
        return
      }

      console.log('Starting conversation session...', { 
        hasToken: !!conversationToken, 
        hasAgentId: !!agentId,
        conversationStatus: conversation.status 
      })

      // Start the conversation session
      // Use WebSocket connection type - it works with tokens and doesn't require API key client-side
      // WebRTC requires API key which we don't want to expose client-side
      if (conversationToken) {
        console.log('Starting with conversation token (WebSocket)')
        await conversation.startSession({
          conversationToken,
          connectionType: 'webrtc' as any, // Use WebRTC connection
          userId: readingId,
        })
        console.log('Session started with token (WebSocket)')
      } else if (agentId) {
        // For public agents without authentication
        console.log('Starting with agent ID (WebSocket)')
        await conversation.startSession({
          agentId,
          connectionType: 'webrtc' as any, // Use WebRTC connection
          userId: readingId,
        })
        console.log('Session started with agent ID (WebSocket)')
      } else {
        throw new Error('No agent ID or conversation token available')
      }
    } catch (err) {
      console.error('Failed to start conversation:', err)
      const errorMessage = err instanceof Error ? err.message : 'Failed to start conversation'
      console.error('Error details:', { 
        error: err, 
        message: errorMessage,
        conversationToken: !!conversationToken,
        agentId: !!agentId 
      })
      setError(errorMessage)
    }
  }

  const handleEnd = async () => {
    try {
      const fullTranscript = transcriptBuffer.current.join('\n')
      if (fullTranscript.trim()) {
        await saveTranscript(fullTranscript)
      }
      await conversation.endSession()
      if (onSessionEnd) {
        onSessionEnd()
      }
    } catch (err) {
      console.error('Error ending conversation:', err)
    }
  }

  const getStatusMessage = () => {
    if (conversation.status === 'connected') {
      if ((conversation as any).isSpeaking) {
        return 'Speaking...'
      }
      if ((conversation as any).isListening) {
        return 'Listening...'
      }
      return theme.messages.active
    }
    if (isLoadingToken) {
      return theme.messages.connecting
    }
    return theme.messages.ready
  }

  if (isLoadingToken) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col bg-gradient-to-br from-mystic-950 via-mystic-900 to-cosmic-950 overflow-hidden">
        <div className="flex-1 flex items-center justify-center">
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
                {theme.messages.connecting}
              </h2>
              <p className="text-mystic-300 text-lg">Preparing your reading...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error && conversation.status !== 'connected') {
    return (
      <div className="fixed inset-0 z-50 flex flex-col bg-gradient-to-br from-mystic-950 via-mystic-900 to-cosmic-950 overflow-hidden">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-6 px-4 max-w-md">
            <div className="text-6xl">⚠️</div>
            <div>
              <h2 className="text-2xl font-mystical font-bold text-gradient-mystic mb-2">
                Connection Issue
              </h2>
              <p className="text-mystic-300 text-lg mb-6">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-gradient-mystic text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    )
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
              <p className="text-mystic-300 text-xs sm:text-sm truncate">{getStatusMessage()}</p>
            </div>
          </div>
          
          {/* Controls */}
          {conversation.status === 'connected' && (
            <div className="hidden sm:flex items-center gap-4 flex-shrink-0">
              <button
                onClick={() => setMicMuted(!micMuted)}
                className="p-2 rounded-lg bg-mystic-800/50 hover:bg-mystic-700/50 transition-colors"
                title={micMuted ? 'Unmute' : 'Mute'}
              >
                {micMuted ? '🔇' : '🔊'}
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
                onClick={handleEnd}
                className="px-4 py-2 rounded-lg bg-red-600/50 hover:bg-red-600/70 transition-colors text-sm"
              >
                End Session
              </button>
            </div>
          )}
        </div>

        {/* Main conversation area */}
        <div className="flex-1 relative flex items-center justify-center overflow-hidden">
          {/* Not connected state - show start button */}
          {conversation.status !== 'connected' && (
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
                  <p className="text-mystic-300 text-lg">{theme.messages.ready}</p>
                </div>
                {error && (
                  <div className="text-red-400 text-sm bg-red-900/20 px-4 py-2 rounded">
                    {error}
                  </div>
                )}
                {(!conversationToken && !agentId) && (
                  <p className="text-mystic-400 text-sm">Waiting for connection details...</p>
                )}
                <button
                  onClick={(e) => {
                    console.log('Button clicked', { 
                      conversationToken: !!conversationToken, 
                      agentId: !!agentId, 
                      disabled: !conversationToken && !agentId,
                      conversationStatus: conversation.status
                    })
                    e.preventDefault()
                    e.stopPropagation()
                    if (!conversationToken && !agentId) {
                      console.error('Button clicked but disabled - missing token and agentId')
                      setError('Connection not ready. Please wait a moment and try again.')
                      return
                    }
                    handleStart()
                  }}
                  disabled={!conversationToken && !agentId}
                  className="px-8 py-4 bg-gradient-mystic text-white rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity glow-effect disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {(!conversationToken && !agentId) ? 'Loading...' : 'Begin Your Reading'}
                </button>
              </div>
            </div>
          )}

          {/* Active conversation state */}
          {conversation.status === 'connected' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-8">
              <div className="w-full max-w-4xl space-y-6">
                {/* Visual indicator */}
                <div className="flex items-center justify-center">
                  <div className="relative">
                    {(conversation as any).isListening && (
                      <div className="absolute inset-0 rounded-full bg-green-500/20 animate-ping" />
                    )}
                    {(conversation as any).isSpeaking && (
                      <div className="absolute inset-0 rounded-full bg-purple-500/20 animate-ping" />
                    )}
                    <div
                      className="w-24 h-24 rounded-full border-4 flex items-center justify-center"
                      style={{
                        borderColor: (conversation as any).isListening 
                          ? '#10b981' 
                          : (conversation as any).isSpeaking 
                          ? theme.colors.primary 
                          : theme.colors.secondary,
                        background: `radial-gradient(circle, ${theme.colors.primary}20, transparent)`,
                      }}
                    >
                      <span className="text-4xl">{theme.icon}</span>
                    </div>
                  </div>
                </div>

                {/* Status text */}
                <div className="text-center">
                  <p className="text-mystic-300 text-lg">
                    {(conversation as any).isListening 
                      ? 'Listening...' 
                      : (conversation as any).isSpeaking 
                      ? 'Speaking...' 
                      : 'Connected'}
                  </p>
                </div>

                {/* Transcript display */}
                {transcript.length > 0 && (
                  <div className="mystic-card rounded-lg p-6 max-h-96 overflow-y-auto">
                    <h3 className="text-lg font-semibold text-mystic-200 mb-4">Conversation</h3>
                    <div className="space-y-3">
                      {transcript.map((line, index) => (
                        <p key={index} className="text-mystic-300 text-sm leading-relaxed">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {/* Mobile controls */}
                <div className="sm:hidden flex items-center justify-center gap-4 pt-4">
                  <button
                    onClick={() => setMicMuted(!micMuted)}
                    className="p-3 rounded-lg bg-mystic-800/50 hover:bg-mystic-700/50 transition-colors"
                    title={micMuted ? 'Unmute' : 'Mute'}
                  >
                    {micMuted ? '🔇' : '🔊'}
                  </button>
                  <button
                    onClick={handleEnd}
                    className="px-6 py-3 rounded-lg bg-red-600/50 hover:bg-red-600/70 transition-colors text-sm"
                  >
                    End Session
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

