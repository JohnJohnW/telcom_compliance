import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/Card'
import { Reading, ReadingType } from '@/types/database'

interface ReadingHistoryItemProps {
  reading: Reading & { reading_types: ReadingType }
}

export function ReadingHistoryItem({ reading }: ReadingHistoryItemProps) {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-AU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'paid':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'cancelled':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  return (
    <Link href={`/readings/${reading.id}/details`}>
      <Card className="hover:shadow-xl hover:shadow-mystic-500/20 transition-all duration-300 cursor-pointer group">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2 text-mystic-100 group-hover:text-gradient-mystic transition-all duration-300">
                {reading.reading_types.name}
              </h3>
              <p className="text-sm text-mystic-400 mb-3">
                {formatDate(reading.created_at)}
              </p>
              {reading.transcript && (
                <p className="text-sm text-mystic-300 line-clamp-2 group-hover:text-mystic-200 transition-colors duration-300">
                  {reading.transcript.substring(0, 150)}...
                </p>
              )}
            </div>
            <div className="ml-4">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(reading.status)}`}
              >
                {reading.status.replace('_', ' ')}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

