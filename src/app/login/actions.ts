'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// Mock implementations to bypass database
export async function login(formData: FormData) {
  // Simulate delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // Always success for demo
  redirect('/')
}

export async function signup(formData: FormData) {
  await new Promise(resolve => setTimeout(resolve, 500))
  redirect('/')
}
