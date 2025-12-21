'use client'
import Image from 'next/image'

export function HeroCrystal() {
  return (
    <div className="relative inline-block mb-6 mx-auto text-center hero-crystal-container">
      <div className="relative inline-block w-24 h-24 md:w-32 md:h-32 hero-crystal-emoji">
        <Image
          src="/favicon.svg"
          alt="Mystic Readings Logo"
          width={128}
          height={128}
          className="w-full h-full object-contain"
          priority
        />
        {/* Glow effect */}
        <div className="absolute inset-0 blur-2xl hero-crystal-glow" />
      </div>
    </div>
  )
}

