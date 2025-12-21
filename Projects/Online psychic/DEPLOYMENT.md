# Deployment Guide - Online Psychic Platform

## ✅ What Has Been Done Automatically

- ✅ Removed all Supabase authentication dependencies
- ✅ Fixed route conflicts (`/readings/types/[typeId]/psychics`)
- ✅ Created hardcoded reading types data
- ✅ Updated all pages to work without authentication
- ✅ Simplified payment flow to use Stripe metadata only
- ✅ Updated all API routes
- ✅ Fixed all build errors
- ✅ Created deployment documentation

## 📋 What You Must Do (Step-by-Step)

### Step 1: Get Your ElevenLabs Agent IDs

1. Go to [ElevenLabs Dashboard - Agents](https://elevenlabs.io/app/agents)
2. For each reading type, find or create an agent and copy its Agent ID:
   - **Tarot Reading** → Copy Agent ID
   - **Astrology Reading** → Copy Agent ID
   - **Love & Relationship Reading** → Copy Agent ID
   - **Career Guidance Reading** → Copy Agent ID
   - **Pet Psychic Reading** → Copy Agent ID

**Write these down** - you'll need them in Step 4.

### Step 2: Get Your Stripe Keys

1. Go to [Stripe Dashboard - API Keys](https://dashboard.stripe.com/test/apikeys)
2. Copy your **Publishable key** (starts with `pk_test_` or `pk_live_`)
3. Click "Reveal test key" to show your **Secret key** (starts with `sk_test_` or `sk_live_`)
4. **Write both keys down** - you'll need them in Step 4

### Step 3: Get Your ElevenLabs API Key

1. Go to [ElevenLabs Dashboard - API Keys](https://elevenlabs.io/app/settings/api-keys)
2. Copy your API key (or create a new one if needed)
3. **Write it down** - you'll need it in Step 4

### Step 4: Push Code to Git

**If you haven't already:**

```bash
cd "/Users/john/Projects/Online psychic"
git add .
git commit -m "Remove Supabase, prepare for production deployment"
git push origin main
```

*(Replace `main` with your branch name if different)*

### Step 5: Deploy to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New Project"** (or **"Import Project"** if you've connected Git before)
3. **Import your Git repository:**
   - If your repo is on GitHub/GitLab/Bitbucket, select it from the list
   - Or paste your repository URL
4. **Configure Project:**
   - Framework Preset: **Next.js** (should auto-detect)
   - Root Directory: `./` (leave as default)
   - Build Command: `npm run build` (should be auto-filled)
   - Output Directory: `.next` (should be auto-filled)
   - Install Command: `npm install` (should be auto-filled)
5. **Click "Deploy"** (don't add environment variables yet - we'll do that next)

### Step 6: Add Environment Variables in Vercel

**After your first deployment completes:**

1. In Vercel Dashboard, go to your project
2. Click **Settings** (top menu)
3. Click **Environment Variables** (left sidebar)
4. Add each variable below **one by one**:

   **Stripe Variables:**
   - Key: `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
     - Value: Your Stripe publishable key from Step 2
     - Environment: Production, Preview, Development (check all)
   
   - Key: `STRIPE_SECRET_KEY`
     - Value: Your Stripe secret key from Step 2
     - Environment: Production, Preview, Development (check all)
   
   - Key: `STRIPE_WEBHOOK_SECRET`
     - Value: (We'll get this in Step 7 - leave empty for now)
     - Environment: Production only

   **ElevenLabs Variables:**
   - Key: `ELEVENLABS_API_KEY`
     - Value: Your ElevenLabs API key from Step 3
     - Environment: Production, Preview, Development (check all)
   
   - Key: `ELEVENLABS_TAROT_AGENT_ID`
     - Value: Your Tarot agent ID from Step 1
     - Environment: Production, Preview, Development (check all)
   
   - Key: `ELEVENLABS_ASTROLOGY_AGENT_ID`
     - Value: Your Astrology agent ID from Step 1
     - Environment: Production, Preview, Development (check all)
   
   - Key: `ELEVENLABS_LOVE_AGENT_ID`
     - Value: Your Love & Relationship agent ID from Step 1
     - Environment: Production, Preview, Development (check all)
   
   - Key: `ELEVENLABS_CAREER_AGENT_ID`
     - Value: Your Career Guidance agent ID from Step 1
     - Environment: Production, Preview, Development (check all)
   
   - Key: `ELEVENLABS_PET_PSYCHIC_AGENT_ID`
     - Value: Your Pet Psychic agent ID from Step 1
     - Environment: Production, Preview, Development (check all)

   **Site Configuration:**
   - Key: `NEXT_PUBLIC_SITE_URL`
     - Value: Your Vercel deployment URL (e.g., `https://your-project.vercel.app`)
     - Environment: Production only
     - **Note:** You'll get this URL after first deployment. Update it after Step 7.

5. **Click "Save"** after adding each variable

### Step 7: Configure Stripe Webhook

1. **Get your production URL:**
   - In Vercel Dashboard, go to your project
   - Click **Deployments** tab
   - Click on the latest deployment
   - Copy the **Production URL** (e.g., `https://your-project.vercel.app`)

2. **Create Stripe Webhook:**
   - Go to [Stripe Dashboard - Webhooks](https://dashboard.stripe.com/test/webhooks)
   - Click **"Add endpoint"** (or **"+ Add"**)
   - **Endpoint URL:** `https://your-production-url.vercel.app/api/webhooks/stripe`
     - Replace `your-production-url.vercel.app` with your actual Vercel URL
   - **Description:** "Online Psychic Platform - Production"
   - **Events to send:** Click **"Select events"** and choose:
     - `checkout.session.completed`
     - `payment_intent.succeeded`
     - `payment_intent.payment_failed`
     - `charge.refunded`
   - Click **"Add endpoint"**

3. **Copy Webhook Secret:**
   - After creating the webhook, click on it
   - Find **"Signing secret"** section
   - Click **"Reveal"** or **"Click to reveal"**
   - Copy the secret (starts with `whsec_`)

4. **Add Webhook Secret to Vercel:**
   - Go back to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Find `STRIPE_WEBHOOK_SECRET` (or add it if you skipped it)
   - Paste the webhook secret
   - Environment: **Production only**
   - Click **"Save"**

5. **Update NEXT_PUBLIC_SITE_URL:**
   - In the same Environment Variables page
   - Find `NEXT_PUBLIC_SITE_URL`
   - Update it to your production URL (e.g., `https://your-project.vercel.app`)
   - Environment: **Production only**
   - Click **"Save"**

### Step 8: Redeploy with Environment Variables

1. In Vercel Dashboard, go to your project
2. Click **Deployments** tab
3. Click the **"..."** menu (three dots) on the latest deployment
4. Click **"Redeploy"**
5. Confirm the redeployment
6. Wait for deployment to complete (usually 1-2 minutes)

### Step 9: Test Your Deployment

1. **Visit your production URL** (from Vercel dashboard)
2. **Test the homepage:**
   - Should load without errors
   - Should show reading types
   - Should show psychics

3. **Test the payment flow:**
   - Click on a reading type
   - Select a psychic
   - Click "Proceed to Payment"
   - Use Stripe test card: `4242 4242 4242 4242`
   - Expiry: Any future date (e.g., `12/34`)
   - CVC: Any 3 digits (e.g., `123`)
   - ZIP: Any 5 digits (e.g., `12345`)
   - Complete payment
   - Should redirect back to your site
   - ElevenLabs widget should load

4. **Verify Stripe webhook:**
   - Go to [Stripe Dashboard - Webhooks](https://dashboard.stripe.com/test/webhooks)
   - Click on your webhook endpoint
   - Check **"Recent events"** - you should see `checkout.session.completed` events

### Step 10: (Optional) Set Up Custom Domain

1. In Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Follow Vercel's DNS instructions
4. Update `NEXT_PUBLIC_SITE_URL` to your custom domain
5. Update Stripe webhook URL to use your custom domain
6. Redeploy

## 🔍 Troubleshooting

### Build Fails in Vercel
- **Check:** All environment variables are set correctly
- **Check:** No typos in variable names
- **Check:** All required variables are present
- **Solution:** Review build logs in Vercel dashboard

### Payment Not Redirecting Back
- **Check:** `NEXT_PUBLIC_SITE_URL` is set correctly in Vercel
- **Check:** Stripe webhook URL matches your production domain
- **Solution:** Verify the URL in Stripe checkout session metadata

### ElevenLabs Widget Not Loading
- **Check:** All agent IDs are set correctly
- **Check:** ElevenLabs API key is valid
- **Check:** Browser console for errors
- **Solution:** Verify agent IDs in ElevenLabs dashboard

### Webhook Not Receiving Events
- **Check:** Webhook URL is correct in Stripe dashboard
- **Check:** Webhook secret matches in Vercel
- **Check:** Webhook is enabled (not paused)
- **Solution:** Test webhook in Stripe dashboard

## 📝 Quick Reference: Environment Variables Checklist

Copy this checklist and check off as you add each variable:

**Stripe:**
- [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- [ ] `STRIPE_SECRET_KEY`
- [ ] `STRIPE_WEBHOOK_SECRET`

**ElevenLabs:**
- [ ] `ELEVENLABS_API_KEY`
- [ ] `ELEVENLABS_TAROT_AGENT_ID`
- [ ] `ELEVENLABS_ASTROLOGY_AGENT_ID`
- [ ] `ELEVENLABS_LOVE_AGENT_ID`
- [ ] `ELEVENLABS_CAREER_AGENT_ID`
- [ ] `ELEVENLABS_PET_PSYCHIC_AGENT_ID`

**Site:**
- [ ] `NEXT_PUBLIC_SITE_URL`

## 🎉 You're Done!

Once all steps are complete, your application will be live and ready to accept payments!
