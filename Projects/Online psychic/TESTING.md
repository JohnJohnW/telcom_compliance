# Testing Guide - Online Psychic Platform

## Quick Start Checklist

### ✅ Environment Variables Setup
Make sure your `.env.local` file has all these variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Step 1: Start Stripe Webhook Listener (Required for Local Testing)

Open a **separate terminal** and run:

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Keep this running! You'll see webhook events logged here.

**Important:** Copy the webhook signing secret from the output (starts with `whsec_`) and make sure it's in your `.env.local` as `STRIPE_WEBHOOK_SECRET`.

### Step 2: Start Development Server

In your main terminal:

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000)

### Step 3: Test the Full Flow

#### 1. **User Registration/Login**
- Go to `/signup` or `/login`
- Create a test account
- Verify you can log in and see the dashboard

#### 2. **Browse Reading Types**
- Navigate to `/readings` or check the homepage
- You should see 4 reading types:
  - Tarot Reading ($29.99)
  - Astrology Reading ($39.99)
  - Love & Relationship ($34.99)
  - Career Guidance ($34.99)

#### 3. **Book a Reading**
- Click on any reading type
- Click "Proceed to Payment"
- You'll be redirected to Stripe Checkout

#### 4. **Test Payment**
Use Stripe test card:
- **Card Number:** `4242 4242 4242 4242`
- **Expiry:** Any future date (e.g., `12/34`)
- **CVC:** Any 3 digits (e.g., `123`)
- **ZIP:** Any 5 digits (e.g., `12345`)

#### 5. **Complete Payment**
- After successful payment, you'll be redirected to `/readings/success`
- Then automatically redirected to the reading session page
- The ElevenLabs widget should load

#### 6. **Test Reading Session**
- The widget should display the AI agent
- Start a conversation (test the voice interaction)
- End the session
- Check that transcript is saved

#### 7. **Verify Reading History**
- Go to `/readings/history`
- You should see your completed reading
- Click to view details and transcript

#### 8. **Check Dashboard Analytics**
- Go to `/dashboard`
- Verify stats show:
  - Total readings count
  - Total spent
  - Reading type breakdown

### Step 4: Verify Webhooks

Check your Stripe webhook listener terminal. You should see events like:
- `checkout.session.completed`
- `payment_intent.succeeded`

If you see errors, check:
1. Webhook secret is correct in `.env.local`
2. Stripe CLI is forwarding to the correct port
3. Your dev server is running

## Common Issues & Solutions

### Issue: "Reading types not showing"
**Solution:** 
- Check that migrations ran successfully in Supabase
- Verify `reading_types` table has data
- Check browser console for errors

### Issue: "Payment not completing"
**Solution:**
- Verify Stripe webhook listener is running
- Check webhook secret in `.env.local`
- Look at Stripe dashboard for webhook delivery logs
- Check server console for errors

### Issue: "ElevenLabs widget not loading"
**Solution:**
- Verify agent IDs are correct in database
- Check browser console for script loading errors
- Ensure agents are active in ElevenLabs dashboard

### Issue: "Transcript not saving"
**Solution:**
- Check browser console for API errors
- Verify reading session page has correct `readingId`
- Check network tab for `/api/readings/[id]/transcript` requests

## Test Cards Reference

- **Success:** `4242 4242 4242 4242`
- **Requires Authentication:** `4000 0025 0000 3155`
- **Declined:** `4000 0000 0000 9995`
- **Insufficient Funds:** `4000 0000 0000 9999`

## Next Steps After Testing

Once everything works locally:
1. Deploy to Vercel or your hosting platform
2. Update `NEXT_PUBLIC_SITE_URL` to your production domain
3. Set up production Stripe webhook endpoint
4. Add all environment variables to your hosting platform
5. Test production flow end-to-end


