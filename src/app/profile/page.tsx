import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { MOCK_MY_DOG } from '@/lib/mock-data'

export default async function ProfilePage() {
    const dog = MOCK_MY_DOG
    
    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <header className="mb-6 flex items-center gap-4">
                <Link href="/" className="text-gray-600">
                    <ArrowLeft />
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
            </header>

            <div className="bg-white rounded-lg shadow p-6 space-y-4">
                <img src={dog.photos[0]} className="w-32 h-32 rounded-full mx-auto object-cover" />
                <div className="text-center">
                    <h2 className="text-xl font-bold text-gray-900">{dog.name}</h2>
                    <p className="text-gray-500">{dog.breed}, {dog.age} years old</p>
                </div>
                <div className="border-t pt-4">
                    <h3 className="font-semibold text-gray-900">Bio</h3>
                    <p className="text-gray-600">{dog.bio}</p>
                </div>
                <div className="border-t pt-4">
                    <h3 className="font-semibold text-gray-900">Owner</h3>
                    <p className="text-gray-600">John Doe</p>
                    <p className="text-gray-500 text-sm">john@example.com</p>
                </div>
                <button className="w-full mt-4 bg-red-100 text-red-600 py-2 rounded-md font-semibold hover:bg-red-200 cursor-pointer">
                    Sign Out
                </button>
            </div>
        </div>
    )
}
