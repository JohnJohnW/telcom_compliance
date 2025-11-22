'use server'

import { redirect } from 'next/navigation'

export async function createDogProfile(formData: FormData) {
    // Simulate database insertion
    await new Promise(resolve => setTimeout(resolve, 1000))

    const name = formData.get('name') as string
    const breed = formData.get('breed') as string
    const age = Number(formData.get('age'))
    const bio = formData.get('bio') as string

    console.log('Mock creating profile:', { name, breed, age, bio })

    redirect('/')
}
