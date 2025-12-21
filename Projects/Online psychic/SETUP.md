# Online Psychic Platform - Setup Guide

## Prerequisites

- Node.js 18+ installed
- A Supabase account ([sign up here](https://supabase.com))
- A Stripe account ([sign up here](https://stripe.com))
- ElevenLabs account with AI agents configured ([sign up here](https://elevenlabs.io))

## Database Setup (Supabase)

1. Create a new Supabase project at [app.supabase.com](https://app.supabase.com)

2. Run the migration files in your Supabase SQL Editor:
   - Navigate to SQL Editor in your Supabase dashboard
   - Run `supabase/migrations/20240101000000_create_reading_tables.sql`
   - Run `supabase/migrations/20240101000001_seed_reading_types.sql`
   - Update the `elevenlabs_agent_id` values in the seed data with your actual ElevenLabs agent IDs

3. Get your Supabase credentials:
   - Go to Settings > API
   - Copy your Project URL and anon/public key

## Stripe Setup

1. Create a Stripe account at [stripe.com](https://stripe.com)

2. Get your API keys:
   - Go to Developers > API keys
   - Copy your Publishable key and Secret key

3. Set up webhooks:
   - Go to Developers > Webhooks
   - Click "Add endpoint"
   - Endpoint URL: `https://your-domain.com/api/webhooks/stripe` (or use Stripe CLI for local development)
   - Select events to listen to:
     - `checkout.session.completed`
     - `payment_intent.succeeded`
     - `payment_intent.payment_failed`
     - `charge.refunded`
   - Copy the webhook signing secret

## ElevenLabs Setup

1. Create an ElevenLabs account at [elevenlabs.io](https://elevenlabs.io)

2. Create AI agents for each reading type:
   - Go to Agents section
   - Create agents with appropriate names and configurations
   - Copy the agent IDs

3. Update the seed migration file with your agent IDs:
   - Edit `supabase/migrations/20240101000001_seed_reading_types.sql`
   - Replace placeholder agent IDs with your actual ElevenLabs agent IDs

## Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and add your credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
   ELEVENLABS_API_KEY=your_elevenlabs_api_key
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

3. Get your ElevenLabs API key:
   - Go to [ElevenLabs Dashboard - Profile](https://elevenlabs.io/app/settings/api-keys)
   - Copy your API key (or create a new one)
   - Add it to `.env.local` as `ELEVENLABS_API_KEY`

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Local Webhook Testing

For local development, use the Stripe CLI to forward webhooks:

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

This will give you a webhook signing secret to use in your `.env.local` file.

## Production Deployment

1. Deploy to Vercel:
   - Push your code to GitHub/GitLab/Bitbucket
   - Import your repository in [Vercel](https://vercel.com)
   - Add all environment variables in Vercel dashboard
   - Deploy!

2. Update Stripe webhook URL:
   - Update your Stripe webhook endpoint URL to your production domain
   - Ensure `NEXT_PUBLIC_SITE_URL` is set to your production domain

3. Update Supabase RLS policies if needed for production

## Features

- ✅ User authentication with Supabase
- ✅ Browse reading types
- ✅ Pay-per-session with Stripe Checkout
- ✅ ElevenLabs AI agent voice calls
- ✅ Reading history and transcripts
- ✅ Analytics dashboard
- ✅ Responsive design

## Support

For issues and questions:
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [ElevenLabs Documentation](https://elevenlabs.io/docs)

