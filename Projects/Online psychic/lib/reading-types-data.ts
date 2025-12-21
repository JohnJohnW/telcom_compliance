/**
 * Hardcoded reading types data
 * This replaces the Supabase database for reading types
 */

export interface ReadingTypeData {
  id: string
  name: string
  description: string
  price: number // in cents
  duration_minutes: number
  elevenlabs_agent_id: string
  is_active: boolean
}

export const readingTypes: ReadingTypeData[] = [
  {
    id: 'tarot-reading',
    name: 'Tarot Reading',
    description: 'Discover insights about your past, present, and future through the ancient art of tarot card reading.',
    price: 2999, // $29.99 AUD
    duration_minutes: 30,
    elevenlabs_agent_id: process.env.ELEVENLABS_TAROT_AGENT_ID || '',
    is_active: true,
  },
  {
    id: 'astrology-reading',
    name: 'Astrology Reading',
    description: 'Explore your cosmic blueprint and understand how planetary influences shape your life journey.',
    price: 3999, // $39.99 AUD
    duration_minutes: 45,
    elevenlabs_agent_id: process.env.ELEVENLABS_ASTROLOGY_AGENT_ID || '',
    is_active: true,
  },
  {
    id: 'love-relationship-reading',
    name: 'Love & Relationship Reading',
    description: 'Gain clarity on your romantic relationships and discover what the universe has in store for your love life.',
    price: 2999, // $29.99 AUD
    duration_minutes: 30,
    elevenlabs_agent_id: process.env.ELEVENLABS_LOVE_AGENT_ID || '',
    is_active: true,
  },
  {
    id: 'career-guidance-reading',
    name: 'Career Guidance Reading',
    description: 'Navigate your professional path with spiritual guidance and insights into your career opportunities.',
    price: 3499, // $34.99 AUD
    duration_minutes: 35,
    elevenlabs_agent_id: process.env.ELEVENLABS_CAREER_AGENT_ID || '',
    is_active: true,
  },
  {
    id: 'pet-psychic-reading',
    name: 'Pet Psychic Reading',
    description: 'Connect with your beloved pet on a spiritual level and gain insights into their thoughts, feelings, and needs.',
    price: 2499, // $24.99 AUD
    duration_minutes: 25,
    elevenlabs_agent_id: process.env.ELEVENLABS_PET_PSYCHIC_AGENT_ID || '',
    is_active: true,
  },
]

/**
 * Get reading type by ID
 */
export function getReadingTypeById(id: string): ReadingTypeData | undefined {
  return readingTypes.find(rt => rt.id === id && rt.is_active)
}

/**
 * Get reading type by name
 */
export function getReadingTypeByName(name: string): ReadingTypeData | undefined {
  return readingTypes.find(rt => rt.name === name && rt.is_active)
}

/**
 * Get all active reading types
 */
export function getActiveReadingTypes(): ReadingTypeData[] {
  return readingTypes.filter(rt => rt.is_active)
}

