import { createClient } from '@/lib/supabase/server'

export async function getUserReadingStats(userId: string) {
  const supabase = await createClient()

  // Get all readings for the user
  const { data: readings, error: readingsError } = await supabase
    .from('readings')
    .select('*, reading_types(*)')
    .eq('user_id', userId as any)

  if (readingsError) {
    console.error('Error fetching readings:', readingsError)
    return null
  }

  // Get all payments for the user
  const { data: payments, error: paymentsError } = await supabase
    .from('payments')
    .select('*')
    .eq('user_id', userId as any)
    .eq('status', 'succeeded' as any)

  if (paymentsError) {
    console.error('Error fetching payments:', paymentsError)
    return null
  }

  // Type assertions for arrays
  const readingsData = (readings || []) as any[]
  const paymentsData = (payments || []) as any[]

  // Calculate stats
  const totalReadings = readingsData.length || 0
  const completedReadings = readingsData.filter((r: any) => r.status === 'completed').length || 0
  const totalSpent = paymentsData.reduce((sum: number, p: any) => sum + p.amount, 0) || 0
  const totalSpentDollars = totalSpent / 100

  // Reading type breakdown
  const readingTypeBreakdown: Record<string, number> = {}
  readingsData.forEach((reading: any) => {
    const typeName = reading.reading_types.name
    readingTypeBreakdown[typeName] = (readingTypeBreakdown[typeName] || 0) + 1
  })

  // Recent activity (last 5 readings)
  const recentReadings = readingsData
    .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5) || []

  // This month's readings
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const thisMonthReadings =
    readingsData.filter(
      (r: any) => new Date(r.created_at) >= startOfMonth
    ).length || 0

  // This month's spending
  const thisMonthPayments =
    paymentsData.filter((p: any) => new Date(p.created_at) >= startOfMonth) || []
  const thisMonthSpent = thisMonthPayments.reduce((sum: number, p: any) => sum + p.amount, 0) / 100

  return {
    totalReadings,
    completedReadings,
    totalSpent: totalSpentDollars,
    readingTypeBreakdown,
    recentReadings,
    thisMonthReadings,
    thisMonthSpent,
  }
}

