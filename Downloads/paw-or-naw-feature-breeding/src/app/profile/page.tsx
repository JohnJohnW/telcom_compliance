import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { MOCK_MY_DOG } from '@/lib/mock-data'

export default async function ProfilePage() {
    const dog = MOCK_MY_DOG
    
    return (
        <div className="min-h-screen bg-pink-50/30 p-4">
            <header className="mb-6 flex items-center gap-4">
                <Link href="/" className="text-pink-500 hover:bg-pink-100 p-2 rounded-full transition-colors">
                    <ArrowLeft />
                </Link>
                <h1 className="text-2xl font-bold text-pink-600">My Profile</h1>
            </header>

            <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-6 space-y-6">
                <div className="relative mx-auto w-32 h-32">
                    <div className="absolute inset-0 rounded-full border-4 border-pink-200 animate-pulse opacity-50"></div>
                    <img src={dog.photos[0]} className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md relative z-10" />
                </div>
                
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900">{dog.name}</h2>
                    <p className="text-pink-500 font-medium">{dog.breed}, {dog.age} years old</p>
                </div>

                <div className="space-y-4">
                    <div className="bg-pink-50/50 p-4 rounded-xl border border-pink-100">
                        <h3 className="font-semibold text-pink-700 text-sm uppercase tracking-wider mb-1">Bio</h3>
                        <p className="text-gray-600 leading-relaxed">{dog.bio}</p>
                    </div>

                    <div className="bg-pink-50/50 p-4 rounded-xl border border-pink-100">
                        <h3 className="font-semibold text-pink-700 text-sm uppercase tracking-wider mb-1">Owner</h3>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-900 font-medium">John Doe</p>
                                <p className="text-pink-400 text-sm">john@example.com</p>
                            </div>
                        </div>
                    </div>
                </div>

                <button className="w-full mt-2 bg-white border-2 border-pink-200 text-pink-500 py-3 rounded-xl font-bold hover:bg-pink-50 hover:border-pink-300 transition-all cursor-pointer">
                    Sign Out
                </button>
            </div>
        </div>
    )
}
