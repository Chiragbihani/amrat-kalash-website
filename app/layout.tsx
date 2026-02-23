import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { AuthProvider } from '@/lib/auth-context'
import { ProductProvider } from '@/lib/product-context'
import { Toaster } from '@/components/ui/toaster'

import './globals.css'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Amrat Kalash - Premium Oil Manufacturing',
  description: 'Amrat Kalash offers the finest quality oils for cooking and wellness. Premium mustard, groundnut, and Palm oils for health-conscious families.',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <AuthProvider>
          <ProductProvider>
            {children}
            <Toaster />
          </ProductProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
