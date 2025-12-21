import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { BackgroundEffects } from '@/components/ui/BackgroundEffects'
import { SpiritualIcons } from '@/components/ui/SpiritualIcons'
import { HeroCrystal } from '@/components/ui/HeroCrystal'
import { FeatureIcon } from '@/components/ui/FeatureIcons'
import { ReadingTypeIcon } from '@/components/ui/ReadingTypeIcon'
import { Clock } from 'lucide-react'
import { CrystalIcon3D } from '@/components/ui/CrystalIcon3D'
import { SparklesIcon3D } from '@/components/ui/SparklesIcon3D'
import { SimpleSparkleFallback } from '@/components/ui/SimpleIconFallbacks'
import { BannerImage } from '@/components/ui/BannerImage'
import { psychicData } from '@/lib/psychics'

export const dynamic = 'force-dynamic'

import { getActiveReadingTypes } from '@/lib/reading-types-data'

export default async function Home() {
  // Get reading types from hardcoded data
  const readingTypes = getActiveReadingTypes().slice(0, 4) // Get first 4 for homepage

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Background effects - fixed to viewport for continuous background */}
      <div className="fixed inset-0 -z-10">
        <BackgroundEffects />
      </div>

      {/* Hero Section */}
      <div className="relative flex flex-col items-center justify-center px-4 py-32 md:py-40">
        {/* Animated mystical symbols - deeper purple glows */}
        <SpiritualIcons />
        
        {/* Deeper purple gradient overlay with shimmer - removed to prevent background breaks */}
        {/* Background is now handled by fixed BackgroundEffects component */}
        
        <div className="relative max-w-5xl mx-auto text-center z-10 animate-fade-in">
          <div className="mb-8">
            <HeroCrystal />
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-mystical font-bold mb-6 sm:mb-8 text-gradient-cream-gold drop-shadow-[0_0_30px_rgba(233,213,255,0.4)] animate-fade-in-up leading-tight">
              Discover Your Spiritual Path
            </h1>
          </div>
          <p className="text-xl md:text-2xl lg:text-3xl text-purple-200/90 mb-16 max-w-3xl mx-auto font-light leading-relaxed animate-fade-in-up delay-300">
            Connect with AI-powered spiritual guides for personalised readings and divine insights
          </p>
          
          <div className="space-y-8 animate-fade-in-up delay-700">
            <p className="text-xl md:text-2xl mb-10 text-purple-200/90 font-light max-w-2xl mx-auto">
              Begin your spiritual journey today
            </p>
            <div className="flex gap-6 justify-center flex-wrap">
              <Link href="/readings">
                <Button size="lg" className="spiritual-button-primary text-xl px-12 py-7 rounded-xl relative overflow-hidden group">
                  <span className="relative z-10 flex items-center gap-2 font-medium">
                    <span>Begin Your Journey</span>
                    <SparklesIcon3D size="lg" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-[#6d28d9] via-[#7c3aed] to-[#5b21b6] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Our Team Section */}
      <div className="relative container mx-auto px-4 py-16 md:py-24 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-mystical font-bold mb-4 text-gradient-cream-gold drop-shadow-[0_0_20px_rgba(233,213,255,0.3)]">
              Our Team
            </h2>
            <p className="text-lg md:text-xl text-purple-300/80 max-w-2xl mx-auto leading-relaxed">
              Meet our diverse team of gifted psychics, each bringing unique perspectives and spiritual wisdom to guide you.
            </p>
          </div>
          
          {/* Group Photo */}
          <div className="max-w-6xl mx-auto mb-16 md:mb-20">
            <BannerImage />
          </div>
          
          {/* Individual Psychics */}
          <div className="grid gap-8 sm:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {Object.values(psychicData).map((psychic) => (
              <Link key={psychic.slug} href={`/psychics/${psychic.slug}`}>
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
            ))}
          </div>
        </div>
      </div>

      {/* Featured Reading Types */}
      {readingTypes.length > 0 && (
        <div className="relative container mx-auto px-4 py-24 md:py-32 z-10">
          
          <div className="relative text-center mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-mystical font-bold mb-4 sm:mb-6 text-gradient-cream-gold drop-shadow-[0_0_20px_rgba(233,213,255,0.3)]">
              Choose Your Reading
            </h2>
          </div>
          <div className="relative grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
            {(readingTypes as any[]).map((readingType: any, index: number) => {
              const priceInDollars = (readingType.price / 100).toFixed(2)
              return (
                <Card key={readingType.id} className="flex flex-col mystic-card-enhanced relative overflow-hidden group transform hover:scale-105 transition-all duration-500">
                  {/* Animated border glow - deeper purple */}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#6d28d9]/0 via-[#7c3aed]/40 to-[#6d28d9]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                  
                  {/* Background shimmer effect - deeper purple */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#4c1d95]/15 via-transparent to-[#581c87]/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <ReadingTypeIcon index={index} readingTypeName={readingType.name} />
                  <CardHeader className="pb-4 relative z-10">
                    <CardTitle className="text-2xl md:text-3xl font-mystical text-purple-100/90 group-hover:text-gradient-mystic transition-all duration-500">{readingType.name}</CardTitle>
                    <CardDescription className="text-purple-300/80 mt-3 group-hover:text-purple-200/90 transition-colors duration-500">{readingType.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col justify-between relative z-10">
                    <div className="space-y-5 mb-6">
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl md:text-5xl font-bold text-gradient-mystic drop-shadow-[0_0_12px_rgba(93,51,234,0.25)]">${priceInDollars}</span>
                        <span className="text-purple-400/80">AUD</span>
                      </div>
                      <div className="text-sm text-purple-300/80 flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>Duration: {readingType.duration_minutes} minutes</span>
                      </div>
                    </div>
                    <Link href={`/readings/types/${readingType.id}/psychics`}>
                      <Button className="w-full spiritual-button-primary relative overflow-hidden group">
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          <span>Choose Psychic</span>
                          <CrystalIcon3D size="sm" />
                        </span>
                        <span className="absolute inset-0 bg-gradient-to-r from-[#6d28d9] via-[#7c3aed] to-[#5b21b6] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )
            })}
          </div>
          <div className="text-center mt-16">
            <Link href="/readings">
              <Button variant="outline" className="spiritual-button-outline px-10 py-4 rounded-xl relative overflow-hidden group">
                <span className="relative z-10">View All Reading Types</span>
                <span className="absolute inset-0 bg-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* Features Section */}
      <div className="relative py-24 md:py-32 z-10">
        {/* Background decorative elements removed - background is now continuous via fixed BackgroundEffects */}
        
        <div className="relative container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-mystical font-bold text-center mb-20 text-gradient-cream-gold drop-shadow-[0_0_20px_rgba(233,213,255,0.3)]">
              Why Choose Us
            </h2>
            <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-3">
              <Card className="mystic-card-enhanced text-center group transform hover:scale-105 transition-all duration-500">
                <CardHeader>
                  <FeatureIcon icon="sparkles" />
                  <CardTitle className="text-2xl font-mystical text-purple-100/90 group-hover:text-gradient-mystic transition-all duration-500">AI-Powered Guidance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-purple-300/80 group-hover:text-purple-200/90 transition-colors duration-500 leading-relaxed">
                    Personalised readings available 24/7. Connect with your spiritual guide whenever you need answers.
                  </p>
                </CardContent>
              </Card>
              <Card className="mystic-card-enhanced text-center group transform hover:scale-105 transition-all duration-500">
                <CardHeader>
                  <FeatureIcon icon="lock" delay="delay-1000" />
                  <CardTitle className="text-2xl font-mystical text-purple-100/90 group-hover:text-gradient-mystic transition-all duration-500">Private & Secure</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-purple-300/80 group-hover:text-purple-200/90 transition-colors duration-500 leading-relaxed">
                    Your conversations are encrypted and stored securely. Your spiritual journey remains completely private.
                  </p>
                </CardContent>
              </Card>
              <Card className="mystic-card-enhanced text-center group transform hover:scale-105 transition-all duration-500">
                <CardHeader>
                  <FeatureIcon icon="scroll" delay="delay-2000" />
                  <CardTitle className="text-2xl font-mystical text-purple-100/90 group-hover:text-gradient-mystic transition-all duration-500">Reading Transcripts</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-purple-300/80 group-hover:text-purple-200/90 transition-colors duration-500 leading-relaxed">
                    Every reading is saved as a transcript. Revisit your insights and guidance whenever you need.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Spiritual Call-to-Action Section */}
      <div className="relative py-24 md:py-32 z-10">
        {/* Mystical background elements - continuous across sections */}
        <div className="absolute inset-0 overflow-visible pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#6d28d9]/5 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#4c1d95]/4 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#581c87]/4 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8 flex justify-center">
              <div className="w-24 h-24 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#6d28d9]/20 to-[#4c1d95]/20 rounded-full blur-xl animate-pulse-slow"></div>
                <div className="absolute inset-4 bg-gradient-to-br from-[#7c3aed]/30 to-[#5b21b6]/30 rounded-full flex items-center justify-center">
                  <div className="w-12 h-12 relative">
                    <Image
                      src="/favicon.svg"
                      alt="Mystic Readings Logo"
                      width={48}
                      height={48}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-mystical font-bold mb-12 text-gradient-cream-gold drop-shadow-[0_0_20px_rgba(233,213,255,0.3)]">
              The Universe Speaks to Those Who Listen
            </h2>
            
            {(
              <div className="flex gap-6 justify-center flex-wrap">
                <Link href="/signup">
                  <Button size="lg" className="spiritual-button-primary text-xl px-12 py-7 rounded-xl relative overflow-hidden group">
                    <span className="relative z-10 flex items-center gap-3 font-medium">
                      <span>Begin Your Journey</span>
                      <SparklesIcon3D size="lg" />
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-[#6d28d9] via-[#7c3aed] to-[#5b21b6] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                  </Button>
                </Link>
              </div>
            )}
            
            {(
              <div className="flex gap-6 justify-center flex-wrap">
                <Link href="/readings">
                  <Button size="lg" className="spiritual-button-primary text-xl px-12 py-7 rounded-xl relative overflow-hidden group">
                    <span className="relative z-10 flex items-center gap-3 font-medium">
                      <span>Continue Your Journey</span>
                      <div className="w-6 h-6 relative">
                        <Image
                          src="/favicon.svg"
                          alt="Mystic Readings Logo"
                          width={24}
                          height={24}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-[#6d28d9] via-[#7c3aed] to-[#5b21b6] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                  </Button>
                </Link>
              </div>
            )}
            
            {/* Spiritual quote */}
            <div className="mt-16 pt-12 border-t border-purple-800/30">
              <p className="text-lg md:text-xl text-purple-300/70 italic font-light max-w-2xl mx-auto leading-relaxed">
                &ldquo;The answers you seek lie within the whispers of the cosmos. Open your heart, and the universe will speak.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

