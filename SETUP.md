# HookMeDaddy — Setup Guide

## Step 1: Clerk Setup
1. Go to clerk.com and create a new application
2. Name it "HookMeDaddy"
3. Enable Email + Google sign-in
4. Copy your Publishable Key and Secret Key into .env.local
5. In Clerk dashboard > Webhooks, create a webhook pointing to:
   https://yourdomain.com/api/webhooks/clerk
   Select event: user.created

## Step 2: Supabase Setup
1. Run hookmedaddy_supabase_schema.sql in your Supabase SQL Editor
   (This is separate from the khalid-os schema — run it in the same project)
2. Copy your URL and keys into .env.local

## Step 3: Anthropic API
1. Go to console.anthropic.com
2. Create an API key
3. Add to .env.local as ANTHROPIC_API_KEY

## Step 4: Stripe Setup
1. Go to stripe.com and create an account
2. Create 3 products with monthly recurring prices:
   - Starter: $19/month
   - Pro: $49/month
   - Agency: $99/month
3. Copy the Price IDs into .env.local
4. Add a webhook endpoint: https://yourdomain.com/api/webhooks/stripe
   Select events: checkout.session.completed, invoice.payment_succeeded, customer.subscription.deleted
5. Copy the webhook signing secret into .env.local

## Step 5: Run locally
npm run dev

## Step 6: Deploy to Vercel
1. Push to GitHub
2. Connect repo to Vercel
3. Add all .env.local variables to Vercel environment variables
4. Deploy
5. Update NEXT_PUBLIC_APP_URL to your Vercel domain
6. Update webhook URLs in Clerk and Stripe to your Vercel domain

## Credit costs
- Social post: 20 credits
- Video script: 40 credits
- All 5 stages: 80 credits

## Plan credits
- Free (signup): 100 credits
- Starter ($19): 500 credits/month
- Pro ($49): 1500 credits/month
- Agency ($99): 5000 credits/month
