import { redirect } from 'next/navigation'
import { OnboardingForm } from './onboarding-form'

export default async function OnboardingPage() {
  // Mock user ID for onboarding
  const userId = "mock-user-id"

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
      <div className="w-full max-w-lg bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-900">Create Your Dog's Profile</h1>
        <OnboardingForm userId={userId} />
      </div>
    </div>
  )
}
