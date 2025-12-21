import { ReadingTypeCard } from '@/components/readings/ReadingTypeCard'
import { getActiveReadingTypes } from '@/lib/reading-types-data'

export default function ReadingsPage() {
  // Get reading types from hardcoded data
  const readingTypesData = getActiveReadingTypes().sort((a, b) => a.price - b.price)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-mystical font-bold mb-4 text-gradient-cream-gold">Choose Your Reading</h1>
        <p className="text-lg text-purple-300/80 max-w-2xl">
          Select a reading type to connect with your spiritual guide and receive personalised insights.
        </p>
      </div>

      {readingTypesData && readingTypesData.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {readingTypesData.map((readingType) => (
            <ReadingTypeCard key={readingType.id} readingType={readingType} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">
            No reading types available at the moment. Please check back later.
          </p>
        </div>
      )}
    </div>
  )
}

