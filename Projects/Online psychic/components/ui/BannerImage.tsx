'use client'

import Image from 'next/image'

export function BannerImage() {
  return (
    <div className="relative w-full max-w-6xl mx-auto rounded-2xl overflow-hidden shadow-2xl shadow-purple-900/50 border border-purple-800/30">
      <Image
        src="/group-photo.png"
        alt="Our Psychic Team"
        width={1200}
        height={600}
        className="w-full h-auto object-cover"
        priority
        quality={90}
      />
    </div>
  )
}

