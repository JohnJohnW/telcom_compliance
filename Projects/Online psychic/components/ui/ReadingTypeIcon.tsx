'use client'

import { 
  SimpleSparkleFallback, 
  SimpleCrystalFallback, 
  StarFallback, 
  MoonFallback, 
  TarotFallback, 
  AstrologyFallback, 
  LoveFallback 
} from './SimpleIconFallbacks'

interface ReadingTypeIconProps {
  index?: number
  readingTypeName?: string
}

export function ReadingTypeIcon({ index, readingTypeName }: ReadingTypeIconProps) {
  // Get SVG icon based on reading type or index
  const getIcon = () => {
    if (readingTypeName) {
      const lowerName = readingTypeName.toLowerCase()
      if (lowerName.includes('tarot')) return TarotFallback
      if (lowerName.includes('astrology')) return AstrologyFallback
      if (lowerName.includes('love') || lowerName.includes('relationship')) return LoveFallback
      if (lowerName.includes('career')) return StarFallback
      if (lowerName.includes('pet')) return MoonFallback
    }
    
    // Fallback to index-based icons
    if (index !== undefined) {
      const icons = [
        SimpleCrystalFallback,
        SimpleSparkleFallback,
        StarFallback,
        MoonFallback,
        SimpleCrystalFallback,
        SimpleSparkleFallback,
      ]
      return icons[index % icons.length] || SimpleSparkleFallback
    }
    
    return SimpleSparkleFallback
  }

  const IconComponent = getIcon()

  return (
    <div className="absolute top-4 right-4 opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500 filter drop-shadow-[0_0_12px_rgba(124,58,237,0.4)] w-10 h-10 z-10">
      <IconComponent className="w-full h-full" />
    </div>
  )
}

