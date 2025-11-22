import { MOCK_DOGS, MOCK_MATCHES, MOCK_MESSAGES, MOCK_USER_ID } from '@/lib/mock-data'
import { Chat } from './chat'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default async function MatchChatPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  const match = MOCK_MATCHES.find(m => m.id === id) || MOCK_MATCHES[0]
  const otherDog = match.dog_b
  const isScooby = otherDog.name === 'Scooby Doo'

  return (
    <div className="flex flex-col h-screen bg-white">
        <header className="p-4 border-b flex items-center gap-4 bg-white shrink-0">
             <Link href="/matches" className="text-gray-600">
                <ArrowLeft />
            </Link>
            <div className="flex items-center gap-3">
                <img src={otherDog.photos[0]} className="w-10 h-10 rounded-full object-cover" />
                <h1 className="text-lg font-bold text-gray-900">{otherDog.name}</h1>
            </div>
        </header>
        
        <Chat 
            matchId={id} 
            userId={MOCK_USER_ID} 
            initialMessages={MOCK_MESSAGES} 
            isScooby={isScooby}
        />
    </div>
  )
}
