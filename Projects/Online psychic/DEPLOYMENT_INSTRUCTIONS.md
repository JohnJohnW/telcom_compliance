# 🚀 EXACT DEPLOYMENT INSTRUCTIONS

## ✅ What I've Done For You

- ✅ Removed all Supabase authentication
- ✅ Fixed all route conflicts
- ✅ Created hardcoded reading types
- ✅ Updated all pages and API routes
- ✅ Fixed all build errors
- ✅ Created `.env.example` file
- ✅ Updated `.gitignore`
- ✅ Created deployment documentation

## 📋 What You Must Do (Follow These Steps Exactly)

### STEP 1: Get Your ElevenLabs Agent IDs (5 minutes)

1. Open [ElevenLabs Dashboard - Agents](https://elevenlabs.io/app/agents) in your browser
2. For each reading type below, find the agent and copy its **Agent ID**:

   **Reading Type** → **What to Copy**
   - Tarot Reading → Agent ID (looks like: `agent_xxxxx...`)
   - Astrology Reading → Agent ID
   - Love & Relationship Reading → Agent ID
   - Career Guidance Reading → Agent ID
   - Pet Psychic Reading → Agent ID

3. **Write these 5 Agent IDs down** on a piece of paper or in a text file

---

### STEP 2: Get Your Stripe Keys (3 minutes)

1. Open [Stripe Dashboard - API Keys](https://dashboard.stripe.com/test/apikeys) in your browser
2. You'll see two keys:
   - **Publishable key** (starts with `pk_test_` or `pk_live_`) - Copy this
   - **Secret key** (starts with `sk_test_` or `sk_live_`) - Click "Reveal test key" to see it, then copy
3. **Write both keys down**

---

### STEP 3: Get Your ElevenLabs API Key (2 minutes)

1. Open [ElevenLabs Dashboard - API Keys](https://elevenlabs.io/app/settings/api-keys) in your browser
2. Copy your API key (or click "Create" if you don't have one)
3. **Write it down**

---

### STEP 4: Push Code to Git (2 minutes)

**Open your terminal and run these commands:**

```bash
cd "/Users/john/Projects/Online psychic"
git add .
git commit -m "Remove Supabase, prepare for production deployment"
git push origin main
```

*(If your branch is not `main`, replace `main` with your branch name like `master` or `develop`)*

**Wait for the push to complete** before moving to Step 5.

---

### STEP 5: Deploy to Vercel (5 minutes)

1. **Open [Vercel Dashboard](https://vercel.com/dashboard)** in your browser
2. **Click the big "Add New Project" button** (or "Import Project" if you've used Vercel before)
3. **Connect your Git provider** (GitHub/GitLab/Bitbucket) if not already connected
4. **Select your repository** from the list (it should show "Online psychic" or your repo name)
5. **Click "Import"** next to your repository
6. **On the "Configure Project" page:**
   - Framework Preset: Should auto-detect as **Next.js** ✅
   - Root Directory: Leave as `./` ✅
   - Build Command: Should show `npm run build` ✅
   - Output Directory: Should show `.next` ✅
   - Install Command: Should show `npm install` ✅
7. **DO NOT add environment variables yet** - just click **"Deploy"** at the bottom
8. **Wait 1-2 minutes** for the deployment to complete

---

### STEP 6: Get Your Production URL (1 minute)

1. After deployment completes, you'll see a success page
2. **Copy the URL** shown (it will look like: `https://your-project-name.vercel.app`)
3. **Write this URL down** - you'll need it in the next steps

---

### STEP 7: Add Environment Variables in Vercel (10 minutes)

1. In Vercel Dashboard, **click on your project name** to open it
2. Click **"Settings"** in the top menu bar
3. Click **"Environment Variables"** in the left sidebar
4. **Add each variable below, one at a time:**

   **Click "Add New" for each:**

   **Variable 1:**
   - Key: `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - Value: (paste your Stripe publishable key from Step 2)
   - Environment: ✅ Production ✅ Preview ✅ Development (check all three)
   - Click "Save"

   **Variable 2:**
   - Key: `STRIPE_SECRET_KEY`
   - Value: (paste your Stripe secret key from Step 2)
   - Environment: ✅ Production ✅ Preview ✅ Development (check all three)
   - Click "Save"

   **Variable 3:**
   - Key: `ELEVENLABS_API_KEY`
   - Value: (paste your ElevenLabs API key from Step 3)
   - Environment: ✅ Production ✅ Preview ✅ Development (check all three)
   - Click "Save"

   **Variable 4:**
   - Key: `ELEVENLABS_TAROT_AGENT_ID`
   - Value: (paste your Tarot agent ID from Step 1)
   - Environment: ✅ Production ✅ Preview ✅ Development (check all three)
   - Click "Save"

   **Variable 5:**
   - Key: `ELEVENLABS_ASTROLOGY_AGENT_ID`
   - Value: (paste your Astrology agent ID from Step 1)
   - Environment: ✅ Production ✅ Preview ✅ Development (check all three)
   - Click "Save"

   **Variable 6:**
   - Key: `ELEVENLABS_LOVE_AGENT_ID`
   - Value: (paste your Love & Relationship agent ID from Step 1)
   - Environment: ✅ Production ✅ Preview ✅ Development (check all three)
   - Click "Save"

   **Variable 7:**
   - Key: `ELEVENLABS_CAREER_AGENT_ID`
   - Value: (paste your Career Guidance agent ID from Step 1)
   - Environment: ✅ Production ✅ Preview ✅ Development (check all three)
   - Click "Save"

   **Variable 8:**
   - Key: `ELEVENLABS_PET_PSYCHIC_AGENT_ID`
   - Value: (paste your Pet Psychic agent ID from Step 1)
   - Environment: ✅ Production ✅ Preview ✅ Development (check all three)
   - Click "Save"

   **Variable 9:**
   - Key: `NEXT_PUBLIC_SITE_URL`
   - Value: (paste your production URL from Step 6, e.g., `https://your-project.vercel.app`)
   - Environment: ✅ Production only (check only Production)
   - Click "Save"

   **Variable 10:**
   - Key: `STRIPE_WEBHOOK_SECRET`
   - Value: (leave empty for now - we'll get this in Step 8)
   - **Skip this one for now** - we'll come back to it

---

### STEP 8: Set Up Stripe Webhook (5 minutes)

1. **Open [Stripe Dashboard - Webhooks](https://dashboard.stripe.com/test/webhooks)** in a new tab
2. **Click the big "Add endpoint" button** (or "+ Add" button)
3. **In the "Endpoint URL" field**, type:
   ```
   https://YOUR-PRODUCTION-URL/api/webhooks/stripe
   ```
   *(Replace `YOUR-PRODUCTION-URL` with your actual Vercel URL from Step 6)*
   
   Example: `https://online-psychic.vercel.app/api/webhooks/stripe`

4. **In the "Description" field**, type:
   ```
   Online Psychic Platform - Production
   ```

5. **Click "Select events"** button
6. **Check these 4 events:**
   - ✅ `checkout.session.completed`
   - ✅ `payment_intent.succeeded`
   - ✅ `payment_intent.payment_failed`
   - ✅ `charge.refunded`
7. **Click "Add events"** button
8. **Click "Add endpoint"** button at the bottom
9. **After the webhook is created**, you'll see a page with webhook details
10. **Find the "Signing secret" section**
11. **Click "Reveal"** or **"Click to reveal"** button
12. **Copy the secret** (it starts with `whsec_`)
13. **Go back to Vercel** (the tab from Step 7)
14. **Add the webhook secret:**
    - Click "Add New" in Environment Variables
    - Key: `STRIPE_WEBHOOK_SECRET`
    - Value: (paste the webhook secret you just copied)
    - Environment: ✅ Production only (check only Production)
    - Click "Save"

---

### STEP 9: Redeploy Your Application (2 minutes)

1. **In Vercel Dashboard**, go to your project
2. **Click "Deployments"** tab (top menu)
3. **Find your latest deployment** (should be at the top)
4. **Click the three dots (...)** on the right side of that deployment
5. **Click "Redeploy"** from the dropdown menu
6. **Click "Redeploy"** in the confirmation popup
7. **Wait 1-2 minutes** for the redeployment to complete

---

### STEP 10: Test Your Deployment (5 minutes)

1. **Visit your production URL** (from Step 6) in your browser
2. **Test the homepage:**
   - Should load without errors
   - Should show reading types
   - Should show psychics

3. **Test the payment flow:**
   - Click on any reading type (e.g., "Tarot Reading")
   - Click "Choose Psychic"
   - Select a psychic
   - Click "Book with [Psychic Name]"
   - Click "Proceed to Payment"
   - You'll be redirected to Stripe Checkout
   - Use this test card:
     - **Card Number:** `4242 4242 4242 4242`
     - **Expiry:** `12/34` (any future date)
     - **CVC:** `123` (any 3 digits)
     - **ZIP:** `12345` (any 5 digits)
   - Click "Pay"
   - Should redirect back to your site
   - ElevenLabs widget should load

4. **Verify webhook is working:**
   - Go to [Stripe Dashboard - Webhooks](https://dashboard.stripe.com/test/webhooks)
   - Click on your webhook endpoint
   - Check "Recent events" section
   - You should see `checkout.session.completed` events

---

## ✅ Final Checklist

Before you're done, verify:

- [ ] All 10 environment variables are added in Vercel
- [ ] Stripe webhook URL points to your production domain
- [ ] `NEXT_PUBLIC_SITE_URL` is set to your production URL
- [ ] You've redeployed after adding all variables
- [ ] Homepage loads without errors
- [ ] Payment flow works end-to-end
- [ ] ElevenLabs widget loads after payment
- [ ] Webhook events appear in Stripe dashboard

---

## 🆘 If Something Goes Wrong

### Build Fails
- Check Vercel build logs: Project → Deployments → Click failed deployment → View logs
- Make sure all environment variables are spelled correctly
- Check that you didn't accidentally add extra spaces when copying values

### Payment Not Working
- Verify `NEXT_PUBLIC_SITE_URL` matches your Vercel URL exactly
- Check Stripe webhook URL matches: `https://your-url.vercel.app/api/webhooks/stripe`
- Verify webhook secret is correct in Vercel

### ElevenLabs Not Loading
- Check all agent IDs are correct (no typos)
- Verify ElevenLabs API key is valid
- Open browser console (F12) and check for errors

### Need Help?
- Check Vercel deployment logs
- Check Stripe webhook logs
- Check browser console for errors

---

## 🎉 You're Done!

Once Step 10 is complete and everything works, your application is live and ready to accept real payments!

**Important:** When you're ready for real payments, switch from Stripe test mode to live mode:
1. Get your live Stripe keys (from Stripe Dashboard → switch to "Live mode")
2. Update the environment variables in Vercel with live keys
3. Create a new webhook endpoint for live mode
4. Redeploy

