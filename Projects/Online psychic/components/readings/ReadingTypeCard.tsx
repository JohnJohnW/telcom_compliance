import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ReadingTypeData } from '@/lib/reading-types-data'

interface ReadingTypeCardProps {
  readingType: ReadingTypeData
}

export function ReadingTypeCard({ readingType }: ReadingTypeCardProps) {
  const priceInDollars = (readingType.price / 100).toFixed(2)
  const icons = ['🔮', '✨', '⭐', '🌙', '💫', '🌟']

  return (
    <Card className="flex flex-col mystic-card relative overflow-hidden">
      <div className="absolute top-4 right-4 text-3xl opacity-50">
        {icons[Math.floor(Math.random() * icons.length)]}
      </div>
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-mystical text-mystic-100">{readingType.name}</CardTitle>
        <CardDescription className="text-mystic-300 mt-2">{readingType.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-gradient-mystic">${priceInDollars}</span>
            <span className="text-mystic-400">AUD</span>
          </div>
          <div className="text-sm text-mystic-300 flex items-center gap-2">
            <span>⏱️</span>
            <span>Duration: {readingType.duration_minutes} minutes</span>
          </div>
        </div>
        <Link href={`/readings/types/${readingType.id}/psychics`} className="mt-6">
          <Button className="w-full">Choose Psychic</Button>
        </Link>
      </CardContent>
    </Card>
  )
}

