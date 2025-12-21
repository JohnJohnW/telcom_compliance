'use client'

import { useEffect, useRef, useState } from 'react'

interface ElevenLabsWidgetProps {
  agentId: string
  readingId: string
  readingTypeName?: string
  onTranscriptUpdate?: (transcript: string) => void
  onSessionEnd?: () => void
}

// Reading type themes with enhanced customization for widget
const readingThemes: Record<string, {
  colors: { 
    primary: string
    secondary: string
    accent: string
    background: string
    text: string
    border: string
  }
  icon: string
  widgetText?: string
  widgetSubtext?: string
}> = {
  'Tarot Reading': {
    colors: { 
      primary: '#8b5cf6', 
      secondary: '#a855f7', 
      accent: '#c084fc',
      background: 'rgba(15, 23, 42, 0.98)',
      text: '#e2e8f0',
      border: '#8b5cf6'
    },
    icon: '🃏',
    widgetText: 'Tarot Reading',
    widgetSubtext: 'Consult the cards'
  },
  'Astrology Reading': {
    colors: { 
      primary: '#8b5cf6', 
      secondary: '#a855f7', 
      accent: '#c084fc',
      background: 'rgba(15, 23, 42, 0.98)',
      text: '#e2e8f0',
      border: '#8b5cf6'
    },
    icon: '⭐',
    widgetText: 'Astrology Reading',
    widgetSubtext: 'Explore your cosmic blueprint'
  },
  'Love & Relationship Reading': {
    colors: { 
      primary: '#ec4899', 
      secondary: '#f472b6', 
      accent: '#f9a8d4',
      background: 'rgba(15, 23, 42, 0.98)',
      text: '#e2e8f0',
      border: '#ec4899'
    },
    icon: '💕',
    widgetText: 'Love Reading',
    widgetSubtext: 'Discover your love path'
  },
  'Career Guidance Reading': {
    colors: { 
      primary: '#facc15', 
      secondary: '#fde047', 
      accent: '#fef08a',
      background: 'rgba(15, 23, 42, 0.98)',
      text: '#e2e8f0',
      border: '#facc15'
    },
    icon: '✨',
    widgetText: 'Career Guidance',
    widgetSubtext: 'Navigate your professional path'
  },
  'Pet Psychic Reading': {
    colors: { 
      primary: '#10b981', 
      secondary: '#34d399', 
      accent: '#6ee7b7',
      background: 'rgba(15, 23, 42, 0.98)',
      text: '#e2e8f0',
      border: '#10b981'
    },
    icon: '🐾',
    widgetText: 'Pet Psychic Reading',
    widgetSubtext: 'Connect with your furry friend'
  },
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'elevenlabs-convai': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'agent-id': string
          'avatar-image-url'?: string
          'avatar-orb-color-1'?: string
          'avatar-orb-color-2'?: string
          'font-family'?: string
          'font-size'?: string
          'primary-color'?: string
          'secondary-color'?: string
          'text-color'?: string
          'background-color'?: string
        },
        HTMLElement
      >
    }
  }
}

export function ElevenLabsWidget({
  agentId,
  readingId,
  readingTypeName,
  onTranscriptUpdate,
  onSessionEnd,
}: ElevenLabsWidgetProps) {
  const scriptLoaded = useRef(false)
  const widgetRef = useRef<HTMLElement>(null)
  const transcriptBuffer = useRef<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [widgetHeight, setWidgetHeight] = useState(0)
  
  const theme = readingTypeName 
    ? readingThemes[readingTypeName] || readingThemes['Tarot Reading']
    : readingThemes['Tarot Reading']

  // Track widget height and update CSS variable for content spacing
  useEffect(() => {
    if (!widgetRef.current || isLoading) return

    const widget = widgetRef.current
    
    // Set CSS variable on document root for content spacing
    const updateWidgetHeight = () => {
      // Try multiple methods to get height
      const height = Math.max(
        widget.offsetHeight || 0,
        widget.clientHeight || 0,
        widget.getBoundingClientRect().height || 0
      )
      
      if (height > 0) {
        setWidgetHeight(height)
        document.documentElement.style.setProperty('--widget-height', `${height}px`)
      }
    }

    // Wait a bit for widget to render, then measure
    const initialTimeout = setTimeout(() => {
      updateWidgetHeight()
    }, 100)

    // Use ResizeObserver to track widget size changes
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const height = entry.contentRect.height
        if (height > 0) {
          setWidgetHeight(height)
          document.documentElement.style.setProperty('--widget-height', `${height}px`)
        }
      }
    })

    resizeObserver.observe(widget)

    // Also check periodically in case ResizeObserver doesn't catch everything
    const interval = setInterval(updateWidgetHeight, 500)

    return () => {
      clearTimeout(initialTimeout)
      resizeObserver.disconnect()
      clearInterval(interval)
      document.documentElement.style.setProperty('--widget-height', '100px')
    }
  }, [isLoading])

  useEffect(() => {
    // Check if script is already loaded
    const existingScript = document.querySelector('script[src="https://unpkg.com/@elevenlabs/convai-widget-embed"]')
    
    if (existingScript) {
      // Script already exists, check if it's loaded
      if (existingScript.getAttribute('data-loaded') === 'true') {
        setIsLoading(false)
        return
      }
      // Script exists but not loaded yet, wait for it
      existingScript.addEventListener('load', () => {
        setIsLoading(false)
      })
      return
    }

    // Load the ElevenLabs widget script
    const script = document.createElement('script')
    script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed'
    script.async = true
    script.type = 'text/javascript'
    
    script.onload = () => {
      console.log('ElevenLabs widget script loaded')
      script.setAttribute('data-loaded', 'true')
      setIsLoading(false)
    }
    
    script.onerror = () => {
      console.error('Failed to load ElevenLabs widget script')
      setError('Failed to load voice widget. Please refresh the page.')
      setIsLoading(false)
    }
    
    document.body.appendChild(script)
    scriptLoaded.current = true
  }, [])

  const saveTranscript = async (transcript: string) => {
    try {
      const response = await fetch(`/api/readings/${readingId}/transcript`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ transcript }),
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

  // Apply purple styling to widget - widget reads attributes on mount
  useEffect(() => {
    if (!widgetRef.current || isLoading) return

    const widget = widgetRef.current
    
    // Function to apply purple colors
    const applyPurpleTheme = () => {
      if (!widget) return
      // Set all color attributes (widget reads these on initialization)
      widget.setAttribute('primary-color', theme.colors.primary)
      widget.setAttribute('secondary-color', theme.colors.secondary)
      widget.setAttribute('text-color', theme.colors.text)
      widget.setAttribute('background-color', theme.colors.background)
      widget.setAttribute('avatar-orb-color-1', theme.colors.primary)
      widget.setAttribute('avatar-orb-color-2', theme.colors.secondary)
    }

    // Apply immediately
    applyPurpleTheme()
    
    // Use MutationObserver to watch for widget changes and re-apply (but throttle it)
    let timeoutId: NodeJS.Timeout | null = null
    const observer = new MutationObserver(() => {
      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = setTimeout(applyPurpleTheme, 100)
    })
    
    observer.observe(widget, {
      attributes: true,
      childList: true,
      subtree: true,
    })
    
    // Try a few times as widget loads
    const intervals = [
      setTimeout(applyPurpleTheme, 200),
      setTimeout(applyPurpleTheme, 1000),
      setTimeout(applyPurpleTheme, 2000),
    ]

    return () => {
      observer.disconnect()
      if (timeoutId) clearTimeout(timeoutId)
      intervals.forEach(clearTimeout)
    }
  }, [isLoading, theme, readingId])

  useEffect(() => {
    const widget = widgetRef.current
    if (!widget || isLoading) return

    console.log('Setting up widget event listeners for reading:', readingId)

    // Monitor widget for error messages displayed in the UI
    const checkForWidgetErrors = () => {
      if (!widget) return
      
      // Check if widget has an error message displayed
      const widgetContent = widget.innerHTML || ''
      const errorIndicators = [
        'exceeds your quota',
        'quota limit',
        'quota exceeded',
        'An error occurred',
        'error occurred'
      ]
      
      for (const indicator of errorIndicators) {
        if (widgetContent.toLowerCase().includes(indicator.toLowerCase())) {
          // Check if it's specifically a quota error
          if (indicator.includes('quota') || widgetContent.toLowerCase().includes('limit')) {
            setError('This request exceeds your quota limit. Please contact support or try again later.')
            return
          } else {
            // Generic error
            const errorMatch = widgetContent.match(/An error occurred[^<]*/i)
            if (errorMatch) {
              setError(errorMatch[0])
              return
            }
          }
        }
      }
    }

    // Set up MutationObserver to watch for error messages in widget
    const observer = new MutationObserver(() => {
      checkForWidgetErrors()
    })

    observer.observe(widget, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: false
    })

    // Also check periodically
    const errorCheckInterval = setInterval(checkForWidgetErrors, 1000)

    // Handle various event types from the ElevenLabs widget
    const handleEvent = (event: Event | CustomEvent | MessageEvent) => {
      let eventData: any = null
      
      // Extract event data based on event type
      if (event instanceof CustomEvent) {
        eventData = event.detail
      } else if (event instanceof MessageEvent) {
        eventData = event.data
      } else {
        eventData = (event as any).detail || event
      }

      console.log('Widget event received:', event.type, eventData)

      // Check for error events
      if (eventData?.error || eventData?.type === 'error' || eventData?.status === 'error') {
        const errorMessage = eventData.error?.message || eventData.message || eventData.error || eventData.detail?.message || 'An error occurred'
        console.error('Widget error:', errorMessage)
        
        // Check if it's a quota error
        const errorLower = errorMessage.toLowerCase()
        if (errorLower.includes('quota') || 
            errorLower.includes('limit') ||
            errorLower.includes('exceeds')) {
          setError('This request exceeds your quota limit. Please contact support or try again later.')
        } else {
          setError(errorMessage)
        }
        return
      }

      // Handle transcript updates - multiple possible formats
      if (eventData?.text || eventData?.transcript || eventData?.message) {
        const text = eventData.text || eventData.transcript || eventData.message
        if (text && typeof text === 'string' && text.trim()) {
          // Avoid duplicates
          const lastTranscript = transcriptBuffer.current[transcriptBuffer.current.length - 1]
          if (text !== lastTranscript) {
            transcriptBuffer.current.push(text)
            const fullTranscript = transcriptBuffer.current.join('\n')
            
            console.log('Transcript updated:', text.substring(0, 50) + '...')
            
            if (onTranscriptUpdate) {
              onTranscriptUpdate(fullTranscript)
            }
          }
        }
      }

      // Handle conversation end - multiple possible event types
      const isEndEvent = 
        eventData?.type === 'conversation_end' ||
        eventData?.type === 'session_end' ||
        eventData?.type === 'end' ||
        event.type === 'session_end' ||
        event.type === 'conversation_end'

      if (isEndEvent) {
        console.log('Conversation ended, saving transcript...')
        const fullTranscript = transcriptBuffer.current.join('\n')
        
        if (fullTranscript.trim()) {
          saveTranscript(fullTranscript).then(() => {
            console.log('Transcript saved successfully')
          })
        }

        if (onSessionEnd) {
          onSessionEnd()
        }
      }
    }

    // Listen for custom events from the widget element
    const eventTypes = [
      'conversation_event',
      'transcript_update',
      'transcript',
      'session_end',
      'conversation_end',
      'message',
      'user_message',
      'assistant_message'
    ]

    eventTypes.forEach(eventType => {
      widget.addEventListener(eventType, handleEvent as EventListener)
    })

    // Listen for postMessage events from widget iframe
    const handleMessage = (event: MessageEvent) => {
      // Only handle messages that look like they're from the widget
      if (event.data && typeof event.data === 'object') {
        handleEvent(event)
      }
    }

    window.addEventListener('message', handleMessage)

    // Periodic transcript saving (every 30 seconds) as backup
    const saveInterval = setInterval(() => {
      const fullTranscript = transcriptBuffer.current.join('\n')
      if (fullTranscript.trim()) {
        console.log('Periodic transcript save...')
        saveTranscript(fullTranscript).catch(console.error)
      }
    }, 30000)

    // Cleanup
    return () => {
      console.log('Cleaning up widget event listeners')
      observer.disconnect()
      clearInterval(errorCheckInterval)
      eventTypes.forEach(eventType => {
        widget.removeEventListener(eventType, handleEvent as EventListener)
      })
      window.removeEventListener('message', handleMessage)
      clearInterval(saveInterval)
    }
  }, [readingId, onTranscriptUpdate, onSessionEnd, isLoading])

  // Save transcript on unmount
  useEffect(() => {
    return () => {
      // On unmount, save any remaining transcript
      const fullTranscript = transcriptBuffer.current.join('\n')
      if (fullTranscript.trim()) {
        console.log('Component unmounting, saving final transcript...')
        saveTranscript(fullTranscript).catch(console.error)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Customize widget styling to match theme
  useEffect(() => {
    if (widgetRef.current && !isLoading) {
      // Inject custom CSS for widget styling with theme colors
      const styleId = `elevenlabs-widget-style-${readingId}`
      let style = document.getElementById(styleId) as HTMLStyleElement
      
      if (!style) {
        style = document.createElement('style')
        style.id = styleId
        document.head.appendChild(style)
      }
      
      style.textContent = `
        /* Widget positioning - fixed at bottom */
        elevenlabs-convai {
          position: fixed !important;
          bottom: 0 !important;
          left: 0 !important;
          right: 0 !important;
          z-index: 1000 !important;
        }
        
        /* Force purple colors via CSS variables */
        elevenlabs-convai {
          --primary-color: ${theme.colors.primary} !important;
          --secondary-color: ${theme.colors.secondary} !important;
          --text-color: ${theme.colors.text} !important;
          --background-color: ${theme.colors.background} !important;
        }
        
        /* Widget iframe styling */
        elevenlabs-convai iframe {
          display: block !important;
          border: none !important;
        }
      `
      
      return () => {
        // Don't remove style on cleanup - keep it for theme consistency
      }
    }
  }, [isLoading, theme, readingId])

  if (isLoading) {
    // Don't render anything while loading - widget will appear when ready
    return null
  }

  if (error) {
    // Display error message - hide widget and show our error UI
    const isQuotaError = error.toLowerCase().includes('quota') || 
                        error.toLowerCase().includes('limit') ||
                        error.toLowerCase().includes('exceeds')
    
    // Hide the widget if it's showing an error
    if (widgetRef.current) {
      const widget = widgetRef.current as HTMLElement
      widget.style.display = 'none'
    }
    
    return (
      <div className="fixed bottom-0 left-0 right-0 z-[1000] bg-gradient-to-br from-mystic-950/95 via-mystic-900/95 to-mystic-950/95 backdrop-blur-md border-t border-mystic-800/30 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-mystic-800/60 backdrop-blur-sm border border-mystic-700/50 rounded-lg p-6 shadow-xl">
            <div className="flex items-start gap-4">
              <div className="text-4xl flex-shrink-0 animate-twinkle">⚠️</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-mystic-100 mb-2">
                  {isQuotaError ? 'Quota Limit Reached' : 'Connection Error'}
                </h3>
                <p className="text-mystic-300 mb-4 leading-relaxed">
                  {isQuotaError 
                    ? 'The ElevenLabs API quota has been exceeded. This is a temporary limitation. Your reading session has been saved, and you can access it from your reading history. Please try again later or contact support if you need immediate assistance.'
                    : error
                  }
                </p>
                {isQuotaError && (
                  <div className="mb-4 p-3 bg-mystic-900/50 rounded-md border border-mystic-700/30">
                    <p className="text-sm text-mystic-400">
                      <strong className="text-mystic-300">Note:</strong> Quota limits typically reset monthly. You can check your ElevenLabs account dashboard for quota status and upgrade options.
                    </p>
                  </div>
                )}
                <div className="flex gap-3 flex-wrap">
                  <button
                    onClick={() => {
                      setError(null)
                      if (widgetRef.current) {
                        (widgetRef.current as HTMLElement).style.display = ''
                      }
                      window.location.reload()
                    }}
                    className="px-4 py-2 bg-gradient-mystic text-white rounded-md font-medium hover:opacity-90 transition-all duration-300 hover:scale-[1.02]"
                  >
                    Try Again
                  </button>
                  <a
                    href="/readings"
                    className="px-4 py-2 border border-mystic-600 text-mystic-200 rounded-md font-medium hover:bg-mystic-800/30 transition-all duration-300 hover:scale-[1.02]"
                  >
                    Browse Readings
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!agentId) {
    return null
  }

  // The widget will float at the bottom - no container needed
  // Note: Widget colors must be set via HTML attributes (kebab-case)
  // These are read by the widget when it initializes
  return (
    <elevenlabs-convai
      ref={widgetRef}
      agent-id={agentId}
      primary-color={theme.colors.primary}
      secondary-color={theme.colors.secondary}
      text-color={theme.colors.text}
      background-color={theme.colors.background}
      avatar-orb-color-1={theme.colors.primary}
      avatar-orb-color-2={theme.colors.secondary}
    />
  )
}

