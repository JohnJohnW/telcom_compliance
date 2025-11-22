'use client'
import { useState } from 'react'
import { FeedCard } from './feed-card'
import { swipe } from '@/app/actions'
import { PawPrint, X } from 'lucide-react'
import Link from 'next/link'
import { ElevenLabsWidget } from './eleven-labs-widget'

export function Feed({ initialDogs }: { initialDogs: any[] }) {
    const [dogs, setDogs] = useState(initialDogs)
    const [matchAlert, setMatchAlert] = useState<any>(null)

    const removeTopCard = () => {
        setDogs((prev) => prev.slice(1))
    }

    const handleSwipe = async (direction: 'paw' | 'naw') => {
        if (dogs.length === 0) return
        const currentDog = dogs[0]
        removeTopCard()
        const result = await swipe(currentDog.id, direction)
        if (result.match) {
            setMatchAlert(currentDog)
        }
    }
    
    const currentDog = dogs[0]
    const isScooby = currentDog?.name === 'Scooby Doo'

    if (matchAlert) {
        return (
             <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 p-4">
                <div className="bg-white rounded-lg p-8 text-center max-w-md w-full">
                    <h2 className="text-3xl font-bold text-indigo-600 mb-4">It's a Match!</h2>
                    <div className="relative w-full h-64 mb-4 rounded-lg overflow-hidden">
                         <img src={matchAlert.photos[0]} className="object-cover w-full h-full" />
                    </div>
                    <p className="text-xl mb-6 text-gray-800">You and {matchAlert.name} liked each other!</p>
                    <Link href="/matches" className="block w-full bg-indigo-600 text-white py-3 rounded-full font-bold mb-3">
                        Send a Message
                    </Link>
                    <button onClick={() => setMatchAlert(null)} className="block w-full border border-gray-300 py-3 rounded-full font-bold text-gray-700">
                        Keep Swiping
                    </button>
                </div>
             </div>
        )
    }

    if (dogs.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center p-4">
                <div className="bg-gray-200 p-6 rounded-full mb-4">
                    <PawPrint className="w-12 h-12 text-gray-400" />
                </div>
                <h2 className="text-xl font-bold text-gray-700">No more dogs nearby</h2>
                <p className="text-gray-500 mt-2">Check back later for new pals!</p>
                 <Link href="/matches" className="mt-6 text-indigo-600 font-semibold">
                    View Matches
                </Link>
            </div>
        )
    }

    return (
        <div className="relative w-full max-w-xs mx-auto h-[50vh] mt-4">
            <div className="absolute inset-0 perspective-1000">
                {dogs.slice(0, 2).reverse().map((dog, index) => (
                    <FeedCard 
                        key={dog.id}
                        dog={dog} 
                        onSwipe={handleSwipe} 
                    />
                ))} 
            </div>
            
            {/* Manual Buttons for accessibility / easier use */}
            <div className="absolute -bottom-16 left-0 right-0 flex justify-center gap-4 z-20 items-center">
                <button 
                    onClick={() => handleSwipe('naw')} 
                    className="bg-white p-3 rounded-full shadow-lg text-red-500 hover:bg-red-50 transition-all hover:scale-110 active:scale-95 cursor-pointer ring-1 ring-gray-100"
                >
                    <X size={24} strokeWidth={3} />
                </button>
                 <button 
                    onClick={() => handleSwipe('paw')} 
                    className="bg-white p-3 rounded-full shadow-lg text-green-500 hover:bg-green-50 transition-all hover:scale-110 active:scale-95 cursor-pointer ring-1 ring-gray-100"
                >
                    <PawPrint size={24} strokeWidth={3} />
                </button>
            </div>

            <ElevenLabsWidget showWidget={isScooby} />
        </div>
    )
}

