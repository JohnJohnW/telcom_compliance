'use client'
import { useState, useEffect, useRef } from 'react'
import { Send } from 'lucide-react'
import Script from 'next/script'

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'elevenlabs-convai': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { 'agent-id': string };
        }
    }
}

export function Chat({ matchId, userId, initialMessages, isScooby }: { matchId: string, userId: string, initialMessages: any[], isScooby: boolean }) {
    const [messages, setMessages] = useState(initialMessages)
    const [newMessage, setNewMessage] = useState('')
    const messagesEndRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const sendMessage = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!newMessage.trim()) return

        const content = newMessage
        setNewMessage('') 
        
        const newMsg = {
            id: Date.now().toString(),
            match_id: matchId,
            sender_id: userId,
            content,
            created_at: new Date().toISOString()
        }
        setMessages(prev => [...prev, newMsg])

        if (!isScooby) {
            // Mock reply for other dogs
            setTimeout(() => {
                const replyMsg = {
                    id: (Date.now() + 1).toString(),
                    match_id: matchId,
                    sender_id: 'other-user',
                    content: 'Woof woof! (That sounds great!)',
                    created_at: new Date().toISOString()
                }
                setMessages(prev => [...prev, replyMsg])
            }, 1500)
        }
    }

    if (isScooby) {
        return (
             <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gray-50">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Chat with Scooby Doo</h2>
                    <p className="text-gray-600">Use the microphone widget below to talk to Scooby!</p>
                </div>
                <elevenlabs-convai agent-id="agent_9801kam9pardfedb3kbhmbx7cb1n"></elevenlabs-convai>
                <Script src="https://unpkg.com/@elevenlabs/convai-widget-embed" strategy="afterInteractive" />
            </div>
        )
    }

    return (
        <>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.map((msg) => {
                    const isMe = msg.sender_id === userId
                    return (
                        <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${isMe ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-white text-gray-900 shadow-sm border border-gray-200 rounded-bl-none'}`}>
                                {msg.content}
                            </div>
                        </div>
                    )
                })}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={sendMessage} className="p-4 bg-white border-t flex gap-2 shrink-0">
                <input 
                    type="text" 
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..." 
                    className="flex-1 rounded-full border-gray-300 border px-4 py-2 focus:outline-none focus:border-indigo-500 text-black"
                />
                <button type="submit" className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 cursor-pointer">
                    <Send size={20} />
                </button>
            </form>
        </>
    )
}
