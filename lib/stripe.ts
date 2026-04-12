import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-03-31.basil',
})

export const PLANS = {
  starter: {
    name: 'Starter',
    price: 19,
    credits: 500,
    priceId: process.env.STRIPE_STARTER_PRICE_ID!,
    hooks: 5,
    stages: 'single',
    features: ['25 post generations/month','5 hooks per generation','Single awareness stage','Full copy stack','12 platforms','Campaign context engine','Visual brief included'],
  },
  pro: {
    name: 'Pro',
    price: 49,
    credits: 1500,
    priceId: process.env.STRIPE_PRO_PRICE_ID!,
    hooks: 10,
    stages: 'all',
    features: ['75 post generations/month','10 hooks per generation','All 5 stages at once','Video and reel script mode','A/B variant output','Hook anatomy breakdown','Save and organise library','CSV and Notion export'],
  },
  agency: {
    name: 'Agency',
    price: 99,
    credits: 5000,
    priceId: process.env.STRIPE_AGENCY_PRICE_ID!,
    hooks: 10,
    stages: 'all',
    features: ['Everything in Pro','Multi-brand workspaces','5 team seats included','Auto-repurpose to 3 formats','White-label PDF export','Priority generation speed','Dedicated onboarding call'],
  },
}
