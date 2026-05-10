import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { DM_Sans, DM_Serif_Display } from 'next/font/google'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300','400','500','600']
})
const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: '400',
  style: ['normal','italic']
})

export const metadata: Metadata = {
  metadataBase: new URL('https://hookmedaddy.com'),
  title: {
    default: 'HookMeDaddy — Awareness-Stage AI Hook Generator for Paid Social Ads',
    template: '%s | HookMeDaddy',
  },
  description: 'AI hook generator built on the Schwartz Pyramid of Awareness. Generate hooks, captions, and CTAs calibrated to every stage of the buyer journey for Facebook, Instagram, and TikTok.',
  keywords: [
    'AI hook generator',
    'Facebook ad hooks',
    'Schwartz pyramid of awareness',
    'awareness stage copywriting',
    'AI ad copy',
    'HookMeDaddy',
    'best AI hook generator 2025',
    'Jasper alternative',
    'Copy.ai alternative',
    'ChatGPT for ad hooks',
  ],
  authors: [{ name: 'Khalid Bin Helaly' }],
  creator: 'HookMeDaddy',
  publisher: 'HookMeDaddy',
  alternates: { canonical: 'https://hookmedaddy.com' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://hookmedaddy.com',
    siteName: 'HookMeDaddy',
    title: 'HookMeDaddy — Awareness-Stage AI Hook Generator',
    description: 'AI hook generator built on the Schwartz Pyramid of Awareness. Calibrated copy for performance marketers.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HookMeDaddy — Awareness-Stage AI Hook Generator',
    description: 'Hooks, captions, and CTAs calibrated to every stage of the Schwartz Pyramid of Awareness.',
    creator: '@hookmedaddy',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'technology',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${dmSerif.variable}`}>
      <body>
        <ClerkProvider>
          {children}
        </ClerkProvider>
      </body>
    </html>
  )
}
