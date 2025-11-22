'use client'

import { useEffect } from 'react'

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'elevenlabs-convai': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { 'agent-id': string };
        }
    }
}

export function ElevenLabsWidget({ showWidget }: { showWidget: boolean }) {
    useEffect(() => {
        if (!showWidget) return

        const script = document.createElement('script')
        script.src = "https://unpkg.com/@elevenlabs/convai-widget-embed"
        script.async = true
        document.body.appendChild(script)
        
        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script)
            }
        }
    }, [showWidget])

    if (!showWidget) return null

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center items-center bg-white/5 h-[25vh] pointer-events-auto" onPointerDown={(e) => e.stopPropagation()}>
            <elevenlabs-convai agent-id="agent_9801kam9pardfedb3kbhmbx7cb1n"></elevenlabs-convai>
        </div>
    )
}

