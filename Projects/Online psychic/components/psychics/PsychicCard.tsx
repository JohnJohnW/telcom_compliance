import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'

interface Psychic {
  name: string
  slug: string
  title: string
  description: string
  image: string
  alt: string
}

interface PsychicCardProps {
  psychic: Psychic
}

export function PsychicCard({ psychic }: PsychicCardProps) {
  return (
    <Link href={`/psychics/${psychic.slug}`}>
      <Card className="mystic-card-enhanced text-center group transform hover:scale-105 transition-all duration-500 relative overflow-hidden cursor-pointer">
      <div className="absolute inset-0 bg-gradient-to-r from-[#6d28d9]/0 via-[#7c3aed]/40 to-[#6d28d9]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
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
        <p className="text-sm text-purple-300/80 group-hover:text-purple-200/90 transition-colors duration-500 leading-relaxed">
          {psychic.description}
        </p>
      </CardContent>
    </Card>
    </Link>
  )
}

