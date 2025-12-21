import { notFound } from 'next/navigation'
import { BackgroundEffects } from '@/components/ui/BackgroundEffects'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { psychicData, psychicReadingTypes, PsychicSlug } from '@/lib/psychics'
import { getActiveReadingTypes, getReadingTypeByName } from '@/lib/reading-types-data'
import Image from 'next/image'
import Link from 'next/link'
import { Clock } from 'lucide-react'

export default function PsychicDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const psychic = psychicData[params.slug as PsychicSlug]
  if (!psychic) {
    notFound()
  }

  const readingTypeNames = psychicReadingTypes[params.slug] || []
  
  // Get reading types from hardcoded data
  const availableReadings = readingTypeNames
    .map(name => getReadingTypeByName(name))
    .filter((reading): reading is NonNullable<typeof reading> => reading !== undefined)

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Background effects */}
      <div className="fixed inset-0 -z-10">
        <BackgroundEffects />
      </div>

      {/* Hero Section */}
      <div className="relative container mx-auto px-4 py-16 md:py-24 z-10">
        <div className="max-w-4xl mx-auto">
          <Link href="/psychics" className="text-purple-300/80 hover:text-purple-200 mb-6 inline-block">
            ← Back to Psychics
          </Link>
          
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-purple-700/50 shadow-lg shadow-purple-900/50 flex-shrink-0">
              <Image
                src={psychic.image}
                alt={psychic.alt}
                width={256}
                height={256}
                className="w-full h-full object-cover object-top"
                style={{ objectPosition: 'center top' }}
              />
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-mystical font-bold mb-4 text-gradient-cream-gold">
                {psychic.name}
              </h1>
              <p className="text-xl text-purple-400/80 font-medium mb-4">
                {psychic.title}
              </p>
              <p className="text-lg text-purple-300/80 leading-relaxed max-w-2xl">
                {psychic.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Available Readings */}
      <div className="relative container mx-auto px-4 py-16 md:py-24 z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-mystical font-bold mb-8 text-center text-gradient-cream-gold">
            Available Readings
          </h2>
          
          {availableReadings.length > 0 ? (
            <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {availableReadings.map((readingType: any, index: number) => {
                const priceInDollars = (readingType.price / 100).toFixed(2)
                // Use both ID and index to ensure unique keys
                const uniqueKey = `${readingType.id}-${index}-${readingType.name}`
                return (
                  <Card key={uniqueKey} className="mystic-card-enhanced relative overflow-hidden group transform hover:scale-105 transition-all duration-500">
                    <CardHeader className="pb-4 relative z-10">
                      <CardTitle className="text-2xl font-mystical text-purple-100/90 group-hover:text-gradient-mystic transition-all duration-500">
                        {readingType.name}
                      </CardTitle>
                      <CardDescription className="text-purple-300/80 mt-3">
                        {readingType.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <div className="space-y-4 mb-6">
                        <div className="flex items-baseline gap-2">
                          <span className="text-4xl font-bold text-gradient-mystic">${priceInDollars}</span>
                          <span className="text-purple-400/80">AUD</span>
                        </div>
                        <div className="text-sm text-purple-300/80 flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>Duration: {readingType.duration_minutes} minutes</span>
                        </div>
                      </div>
                      <Link href={`/readings/book/${readingType.id}?psychic=${params.slug}`}>
                        <Button className="w-full spiritual-button-primary">
                          Book with {psychic.name}
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-purple-300/80">
                No readings available for {psychic.name} at the moment.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

