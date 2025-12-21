// Psychic to Reading Type mappings
export const psychicReadingTypes: Record<string, string[]> = {
  'dazza': ['Pet Psychic Reading'],
  'madame': ['Tarot Reading', 'Love & Relationship Reading'],
  'o-william-the-3rd': ['Astrology Reading', 'Career Guidance Reading'],
  'rakesh': ['Astrology Reading', 'Love & Relationship Reading'],
  'zephyr': ['Tarot Reading', 'Career Guidance Reading', 'Pet Psychic Reading'],
}

// Reading Type to Psychic mappings (reverse lookup)
export const readingTypePsychics: Record<string, string[]> = {
  'Tarot Reading': ['madame', 'zephyr'],
  'Astrology Reading': ['o-william-the-3rd', 'rakesh'],
  'Love & Relationship Reading': ['madame', 'rakesh'],
  'Career Guidance Reading': ['o-william-the-3rd', 'zephyr'],
  'Pet Psychic Reading': ['dazza', 'zephyr'],
}

export const psychicData = {
  dazza: {
    name: 'Dazza',
    slug: 'dazza',
    title: 'Owner & Head Psychic',
    description: 'A down-to-earth bloke with a gift for cutting through the noise and giving you straight-up spiritual guidance.',
    image: '/dazza.png',
    alt: 'Dazza - Owner and Head Psychic',
  },
  madame: {
    name: 'Madame',
    slug: 'madame',
    title: 'Wise Elder',
    description: 'With decades of experience, Madame brings timeless wisdom and gentle guidance to every reading.',
    image: '/madame.png',
    alt: 'Madame - Elderly Woman',
  },
  'o-william-the-3rd': {
    name: "O'William the 3rd",
    slug: 'o-william-the-3rd',
    title: 'Refined Seer',
    description: 'A distinguished gentleman with an aristocratic approach to divination and spiritual insight.',
    image: '/o-william-the-3rd.png',
    alt: "O'William the 3rd - Posh Man",
  },
  rakesh: {
    name: 'Rakesh',
    slug: 'rakesh',
    title: 'Mystical Guide',
    description: 'Drawing from ancient Eastern wisdom, Rakesh offers profound insights with warmth and clarity.',
    image: '/rakesh.png',
    alt: 'Rakesh - Indian Man',
  },
  zephyr: {
    name: 'Zephyr',
    slug: 'zephyr',
    title: 'Spiritual Guide',
    description: 'A multicultural spiritual guide who weaves together diverse traditions to illuminate your path.',
    image: '/zephyr.png',
    alt: 'Zephyr - Spiritual Multicultural Lady',
  },
}

export type PsychicSlug = keyof typeof psychicData

