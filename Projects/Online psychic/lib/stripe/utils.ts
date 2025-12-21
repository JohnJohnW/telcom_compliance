import { stripe } from './client'

export function formatAmountForStripe(amount: number, currency: string = 'aud'): number {
  // Amount is already in cents, just return it
  return amount
}

export function formatAmountFromStripe(amount: number, currency: string = 'aud'): number {
  // Amount is in cents, convert to dollars for display
  return amount / 100
}

export async function createStripeCustomer(email: string, name?: string) {
  return await stripe.customers.create({
    email,
    name,
  })
}

export async function getStripeCustomer(customerId: string) {
  return await stripe.customers.retrieve(customerId)
}

