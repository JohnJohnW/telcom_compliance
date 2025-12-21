import { ReadingType } from './database'

/**
 * Extended reading type with proper typing
 */
export interface ExtendedReadingType extends ReadingType {
  id: string
  name: string
  description: string | null
  price: number
  duration_minutes: number
  elevenlabs_agent_id: string
  is_active: boolean | null
  created_at: string | null
  updated_at: string | null
}

/**
 * Reading type query result type
 */
export type ReadingTypeQueryResult = ExtendedReadingType | null

/**
 * Reading type array query result type
 */
export type ReadingTypeArrayResult = ExtendedReadingType[]

