import { Reading } from './database'

/**
 * Extended reading with proper typing
 */
export interface ExtendedReading extends Reading {
  id: string
  user_id: string
  reading_type_id: string
  status: 'pending' | 'paid' | 'in_progress' | 'completed' | 'cancelled'
  stripe_checkout_session_id: string | null
  stripe_payment_intent_id: string | null
  transcript: string | null
  started_at: string | null
  completed_at: string | null
  created_at: string | null
  updated_at: string | null
}

/**
 * Reading query result type
 */
export type ReadingQueryResult = ExtendedReading | null

/**
 * Reading array query result type
 */
export type ReadingArrayResult = ExtendedReading[]

