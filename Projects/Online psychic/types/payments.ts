import { Payment } from './database'

/**
 * Extended payment with proper typing
 */
export interface ExtendedPayment extends Payment {
  id: string
  user_id: string
  reading_id: string | null
  amount: number
  currency: string | null
  status: 'pending' | 'succeeded' | 'failed' | 'refunded'
  stripe_payment_intent_id: string | null
  stripe_customer_id: string | null
  created_at: string | null
  updated_at: string | null
}

/**
 * Payment query result type
 */
export type PaymentQueryResult = ExtendedPayment | null

/**
 * Payment array query result type
 */
export type PaymentArrayResult = ExtendedPayment[]

