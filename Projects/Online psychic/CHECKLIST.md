# Setup Checklist - What You Need to Do

## ✅ Completed by AI
- [x] Database schema created (migration files ready)
- [x] Stripe integration code implemented
- [x] ElevenLabs widget component created
- [x] All UI components built
- [x] All pages and routes created
- [x] Analytics functionality implemented
- [x] Navigation and homepage updated
- [x] Code linting passed

## 🔧 Required Setup Steps (You Must Do These)

### 1. Supabase Setup
- [ ] Create a Supabase account at [app.supabase.com](https://app.supabase.com)
- [ ] Create a new project
- [ ] Go to SQL Editor and run the migration files in order:
  1. Run `supabase/migrations/20240101000000_create_reading_tables.sql`
  2. Run `supabase/migrations/20240101000001_seed_reading_types.sql`
- [ ] Get your Supabase credentials:
  - Go to Settings > API
  - Copy Project URL → `NEXT_PUBLIC_SUPABASE_URL`
  - Copy anon/public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 2. ElevenLabs Setup
- [ ] Create an ElevenLabs account at [elevenlabs.io](https://elevenlabs.io)
- [ ] Create AI agents for each reading type:
  - Tarot Reading agent
  - Astrology Reading agent
  - Love & Relationship Reading agent
  - Career Guidance Reading agent
- [ ] Copy each agent ID
- [ ] Update the seed migration file (`supabase/migrations/20240101000001_seed_reading_types.sql`):
  - Replace `'your-tarot-agent-id'` with your actual Tarot agent ID
  - Replace `'your-astrology-agent-id'` with your actual Astrology agent ID
  - Replace `'your-love-agent-id'` with your actual Love agent ID
  - Replace `'your-career-agent-id'` with your actual Career agent ID
- [ ] Re-run the seed migration in Supabase SQL Editor

### 3. Stripe Setup
- [ ] Create a Stripe account at [stripe.com](https://stripe.com)
- [ ] Get your API keys:
  - Go to Developers > API keys
  - Copy Publishable key → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
  - Copy Secret key → `STRIPE_SECRET_KEY` (keep this secret!)
- [ ] Set up webhooks:
  - Go to Developers > Webhooks
  - Click "Add endpoint"
  - For local development: Use Stripe CLI (see below)
  - For production: Use your domain URL: `https://your-domain.com/api/webhooks/stripe`
  - Select these events:
    - `checkout.session.completed`
    - `payment_intent.succeeded`
    - `payment_intent.payment_failed`
    - `charge.refunded`
  - Copy the webhook signing secret → `STRIPE_WEBHOOK_SECRET`

### 4. Environment Variables
- [ ] Create `.env.local` file in the project root
- [ ] Add all required variables (see `.env.example` or `SETUP.md`):
  ```
  NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
  STRIPE_SECRET_KEY=your_stripe_secret_key
  STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
  NEXT_PUBLIC_SITE_URL=http://localhost:3000
  ```

### 5. Local Development Testing
- [ ] Install Stripe CLI (for local webhook testing):
  ```bash
  # macOS
  brew install stripe/stripe-cli/stripe
  
  # Or download from https://stripe.com/docs/stripe-cli
  ```
- [ ] Login to Stripe CLI:
  ```bash
  stripe login
  ```
- [ ] Forward webhooks to local server:
  ```bash
  stripe listen --forward-to localhost:3000/api/webhooks/stripe
  ```
- [ ] Copy the webhook signing secret from the CLI output and update `.env.local`

### 6. Test the Application
- [ ] Start the development server:
  ```bash
  npm run dev
  ```
- [ ] Test user registration/login
- [ ] Test browsing reading types
- [ ] Test booking a reading (use Stripe test card: 4242 4242 4242 4242)
- [ ] Test webhook processing (check Stripe dashboard)
- [ ] Test ElevenLabs widget integration
- [ ] Test reading history and details pages

### 7. Production Deployment (When Ready)
- [ ] Deploy to Vercel or your hosting platform
- [ ] Add all environment variables in your hosting platform
- [ ] Update `NEXT_PUBLIC_SITE_URL` to your production domain
- [ ] Update Stripe webhook URL to production endpoint
- [ ] Test production payment flow
- [ ] Verify webhooks are working in production

## 📝 Important Notes

1. **TypeScript Build Errors**: You may see TypeScript errors during build until the database is set up. These are expected and will resolve once you:
   - Run the database migrations in Supabase
   - Regenerate TypeScript types using Supabase CLI: `npx supabase gen types typescript --project-id YOUR_PROJECT_ID > types/database.ts`
   - Or manually update the types after running migrations

2. **ElevenLabs Agent IDs**: You MUST update the seed migration with your actual agent IDs before the platform will work properly.

3. **Stripe Test Mode**: Use Stripe test mode for development. Test cards:
   - Success: `4242 4242 4242 4242`
   - Requires auth: `4000 0025 0000 3155`
   - Declined: `4000 0000 0000 9995`

4. **Webhook Security**: Never commit your `.env.local` file. The webhook secret is critical for security.

5. **Database**: Make sure to run migrations in the correct order. The seed migration depends on the table creation migration.

6. **RLS Policies**: The migrations include Row Level Security policies. Make sure they're applied correctly.

## 🆘 Troubleshooting

- **Webhooks not working locally?** Make sure Stripe CLI is running and forwarding to the correct port
- **Can't see reading types?** Check that the seed migration ran successfully
- **Payment not completing?** Check Stripe webhook logs and ensure webhook secret is correct
- **ElevenLabs widget not loading?** Verify agent IDs are correct and agents are active in ElevenLabs dashboard

## 📚 Documentation

See `SETUP.md` for detailed setup instructions.

