import { MOCK_MATCHES } from '@/lib/mock-data'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default async function MatchesPage() {
  const matches = MOCK_MATCHES

  return (
    <div className="min-h-screen bg-white flex flex-col">
        <header className="p-4 border-b border-pink-100 flex items-center gap-4 bg-white">
             <Link href="/" className="text-pink-500 hover:bg-pink-50 p-2 rounded-full transition-colors">
                <ArrowLeft />
            </Link>
            <h1 className="text-xl font-bold text-pink-600">Matches</h1>
        </header>
        <div className="p-4 space-y-4">
            {matches.map((match: any) => {
                const otherDog = match.dog_b // In mock data, we are always dog_a for simplicity here or logic holds
                return (
                    <Link key={match.id} href={`/matches/${match.id}`} className="flex items-center gap-4 p-3 hover:bg-pink-50/50 rounded-xl border border-pink-100 shadow-sm transition-colors group">
                        <div className="relative">
                            <img src={otherDog.photos[0]} className="w-16 h-16 rounded-full object-cover ring-2 ring-pink-100 group-hover:ring-pink-300 transition-all" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-gray-900 group-hover:text-pink-700 transition-colors">{otherDog.name}</h3>
                            <p className="text-pink-400 text-sm">Say hello! 👋</p>
                        </div>
                    </Link>
                )
            })}
        </div>
    </div>
  )
}
