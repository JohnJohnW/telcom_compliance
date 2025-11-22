import { MOCK_MATCHES } from '@/lib/mock-data'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default async function MatchesPage() {
  const matches = MOCK_MATCHES

  return (
    <div className="min-h-screen bg-white flex flex-col">
        <header className="p-4 border-b flex items-center gap-4">
             <Link href="/" className="text-gray-600">
                <ArrowLeft />
            </Link>
            <h1 className="text-xl font-bold text-gray-900">Matches</h1>
        </header>
        <div className="p-4 space-y-4">
            {matches.map((match: any) => {
                const otherDog = match.dog_b // In mock data, we are always dog_a for simplicity here or logic holds
                return (
                    <Link key={match.id} href={`/matches/${match.id}`} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg border border-gray-100 shadow-sm">
                        <img src={otherDog.photos[0]} className="w-16 h-16 rounded-full object-cover" />
                        <div>
                            <h3 className="font-bold text-lg text-gray-900">{otherDog.name}</h3>
                            <p className="text-gray-500 text-sm">Say hello!</p>
                        </div>
                    </Link>
                )
            })}
        </div>
    </div>
  )
}
