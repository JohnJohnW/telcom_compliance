import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { OnboardingForm } from './onboarding-form'

export default async function OnboardingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }
  
  const { data: dog } = await supabase.from('dogs').select('id').eq('user_id', user.id).single()
  
  if (dog) {
      return redirect('/')
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
      <div className="w-full max-w-lg bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-900">Create Your Dog's Profile</h1>
        <OnboardingForm userId={user.id} />
      </div>
    </div>
  )
}

