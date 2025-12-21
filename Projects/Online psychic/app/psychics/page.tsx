import { BackgroundEffects } from '@/components/ui/BackgroundEffects'
import { PsychicCard } from '@/components/psychics/PsychicCard'
import { BannerImage } from '@/components/ui/BannerImage'
import { psychicData } from '@/lib/psychics'

export default function PsychicsPage() {
  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Background effects */}
      <div className="fixed inset-0 -z-10">
        <BackgroundEffects />
      </div>

      {/* Hero Section */}
      <div className="relative container mx-auto px-4 py-16 md:py-24 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-mystical font-bold mb-6 text-gradient-cream-gold drop-shadow-[0_0_20px_rgba(233,213,255,0.3)]">
            Meet Our Psychics
          </h1>
          <p className="text-lg md:text-xl text-purple-300/80 max-w-2xl mx-auto leading-relaxed mb-4">
            Our diverse team brings unique perspectives and spiritual wisdom to guide you on your journey.
          </p>
          <p className="text-base md:text-lg text-purple-400/70 max-w-xl mx-auto">
            Each psychic offers their own approach to divination, ensuring you find the guidance that resonates with you.
          </p>
        </div>
      </div>

      {/* Group Photo Section */}
      <div className="relative container mx-auto px-4 py-8 md:py-12 z-10">
        <div className="max-w-6xl mx-auto">
          <BannerImage />
        </div>
      </div>

      {/* Psychics Grid */}
      <div className="relative container mx-auto px-4 py-16 md:py-24 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-8 sm:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {Object.values(psychicData).map((psychic) => (
              <PsychicCard key={psychic.slug} psychic={psychic} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

