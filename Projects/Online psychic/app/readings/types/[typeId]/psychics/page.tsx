import { notFound } from 'next/navigation'
import { BackgroundEffects } from '@/components/ui/BackgroundEffects'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { psychicData, readingTypePsychics } from '@/lib/psychics'
import { getReadingTypeById } from '@/lib/reading-types-data'
import Image from 'next/image'
import Link from 'next/link'

export default function ReadingPsychicsPage({
  params,
}: {
  params: { typeId: string }
}) {
  // Get reading type from hardcoded data
  const readingType = getReadingTypeById(params.typeId)

  if (!readingType) {
    notFound()
  }

  const psychicSlugs = readingTypePsychics[readingType.name] || []
  
  // Remove duplicate psychic slugs
  const uniquePsychicSlugs = Array.from(new Set(psychicSlugs))
  
  const availablePsychics = uniquePsychicSlugs
    .map(slug => psychicData[slug as keyof typeof psychicData])
    .filter(Boolean)

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Background effects */}
      <div className="fixed inset-0 -z-10">
        <BackgroundEffects />
      </div>

      {/* Hero Section */}
      <div className="relative container mx-auto px-4 py-16 md:py-24 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <Link href="/readings" className="text-purple-300/80 hover:text-purple-200 mb-6 inline-block">
            ← Back to Readings
          </Link>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-mystical font-bold mb-4 text-gradient-cream-gold">
            {readingType.name}
          </h1>
          <p className="text-lg text-purple-300/80 max-w-2xl mx-auto mb-8">
            {readingType.description}
          </p>
          <p className="text-base text-purple-400/70">
            Choose a psychic to guide you through this reading
          </p>
        </div>
      </div>

      {/* Available Psychics */}
      <div className="relative container mx-auto px-4 py-16 md:py-24 z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-mystical font-bold mb-12 text-center text-gradient-cream-gold">
            Available Psychics
          </h2>
          
          {availablePsychics.length > 0 ? (
            <div className="grid gap-8 sm:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {availablePsychics.map((psychic, index) => (
                <Card key={`${psychic.slug}-${index}`} className="mystic-card-enhanced text-center group transform hover:scale-105 transition-all duration-500 relative overflow-hidden">
                  <CardHeader className="pb-4 relative z-10">
                    <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-purple-700/50 group-hover:border-purple-500 transition-all duration-500 shadow-lg shadow-purple-900/50">
                      <Image
                        src={psychic.image}
                        alt={psychic.alt}
                        width={128}
                        height={128}
                        className="w-full h-full object-cover object-top"
                        style={{ objectPosition: 'center top' }}
                      />
                    </div>
                    <CardTitle className="text-2xl font-mystical text-purple-100/90 group-hover:text-gradient-mystic transition-all duration-500">
                      {psychic.name}
                    </CardTitle>
                    <CardDescription className="text-purple-400/80 font-medium mt-2">
                      {psychic.title}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <p className="text-sm text-purple-300/80 group-hover:text-purple-200/90 transition-colors duration-500 leading-relaxed mb-4">
                      {psychic.description}
                    </p>
                    <Link href={`/readings/book/${params.typeId}?psychic=${psychic.slug}`}>
                      <Button className="w-full spiritual-button-primary">
                        Book with {psychic.name}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-purple-300/80">
                No psychics available for this reading type at the moment.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

