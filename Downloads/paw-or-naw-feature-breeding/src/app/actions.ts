'use server'
import { MOCK_DOGS, MOCK_MATCHES } from '@/lib/mock-data'
import { revalidatePath } from 'next/cache'

export async function getDogsForFeed() {
    return MOCK_DOGS
}

export async function swipe(targetDogId: string, direction: 'paw' | 'naw') {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    if (direction === 'paw') {
        // Every 2nd paw is a match for demo purposes
        const isMatch = Math.random() > 0.5
        return { match: isMatch }
    }
    
    return { match: false }
}
