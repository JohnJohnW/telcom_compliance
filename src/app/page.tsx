import { getDogsForFeed } from './actions'
import { Feed } from '@/components/feed'
import Link from 'next/link'
import { MessageCircle, User } from 'lucide-react'

export default async function Home() {
  // Bypass auth check for demo
  const dogs = await getDogsForFeed()

  return (
    <div className="flex flex-col min-h-screen bg-[#f2f2f7]">
        <header className="glass sticky top-0 z-50 px-6 py-4 flex justify-between items-center shadow-sm backdrop-blur-xl bg-white/70 supports-[backdrop-filter]:bg-white/60">
            <Link href="/profile" className="text-gray-500 hover:text-black transition-colors p-2 rounded-full hover:bg-black/5">
                <User size={24} />
            </Link>
            <h1 className="text-xl font-semibold tracking-tight text-black">PawOrNaw</h1>
            <Link href="/matches" className="text-gray-500 hover:text-black transition-colors p-2 rounded-full hover:bg-black/5">
                <MessageCircle size={24} />
            </Link>
        </header>
        <main className="flex-1 p-4 flex flex-col items-center pt-8 overflow-hidden">
            <Feed initialDogs={dogs} />
        </main>
    </div>
  )
}
