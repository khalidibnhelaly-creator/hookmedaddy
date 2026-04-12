import type { Metadata } from 'next'
import { ClerkProvider, SignInButton, SignUpButton, Show, UserButton } from '@clerk/nextjs'
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
  title: 'HookMeDaddy — Awareness-Calibrated Copy for Ecommerce',
  description: 'Generate hooks, captions, and CTAs calibrated to every stage of the Schwartz Pyramid of Awareness.',
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
