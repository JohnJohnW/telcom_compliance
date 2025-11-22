'use client'

import { createDogProfile } from './actions'
import { useState } from 'react'

export function OnboardingForm({ userId }: { userId: string }) {
    const [isLoading, setIsLoading] = useState(false)

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)
        const formData = new FormData(event.currentTarget)
        await createDogProfile(formData)
        setIsLoading(false)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Dog Name</label>
                <input type="text" name="name" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2 text-black" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Breed</label>
                <input type="text" name="breed" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2 text-black" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Age</label>
                <input type="number" name="age" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2 text-black" />
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-700">Bio</label>
                <textarea name="bio" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2 text-black" rows={3}></textarea>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Photo</label>
                <input type="file" name="photo" accept="image/*" required className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
            </div>
            
            <button type="submit" disabled={isLoading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 cursor-pointer">
                {isLoading ? 'Creating...' : 'Create Profile'}
            </button>
        </form>
    )
}

