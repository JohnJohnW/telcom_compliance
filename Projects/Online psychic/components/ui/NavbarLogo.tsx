'use client'
import Image from 'next/image'

export function NavbarLogo() {
  return (
    <div className="relative w-8 h-8 navbar-logo-icon group-hover:scale-110 transition-transform duration-500 inline-flex items-center justify-center">
      <Image
        src="/favicon.svg"
        alt="Mystic Readings Logo"
        width={32}
        height={32}
        className="w-full h-full object-contain"
        priority
      />
    </div>
  )
}

