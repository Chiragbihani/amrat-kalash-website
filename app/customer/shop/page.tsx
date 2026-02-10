'use client'

import { useAuth } from '@/lib/auth-context'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default function CustomerShop() {
  const { user, isAuthenticated } = useAuth()

  if (!isAuthenticated || user?.role !== 'customer') {
    redirect('/auth')
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 bg-amber-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-amber-900 mb-2">Welcome, {user?.name}!</h1>
            <p className="text-amber-700">Browse our collection and add items to your cart</p>
          </div>

          <div className="grid gap-6">
            <Link href="/products">
              <div className="bg-white p-8 rounded-lg border border-amber-200 hover:shadow-lg transition-shadow cursor-pointer">
                <h2 className="text-2xl font-bold text-amber-900 mb-2">Browse All Products</h2>
                <p className="text-amber-700">View all available oils and their variants</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
