'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Leaf, Shield, Droplets, Sprout } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-50 to-orange-50 py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-6 leading-tight text-pretty">
                Pure, Natural Oils for Your Family's Health
              </h2>
              <p className="text-lg text-amber-800 mb-8 leading-relaxed">
                Amrat Kalash brings you the finest quality oils, cold-pressed and naturally processed for maximum nutrition and taste.
              </p>
              <div className="flex gap-4">
                <Link href="/products">
                  <Button size="lg" className="bg-amber-600 hover:bg-amber-700">
                    Explore Products
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="border-amber-600 text-amber-600 hover:bg-amber-50 bg-transparent">
                    Get in Touch
                  </Button>
                </Link>
              </div>
            </div>
            <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl h-80 flex items-center justify-center text-white text-center p-8">
              <div>
                <Droplets className="w-24 h-24 mx-auto mb-4 opacity-80" />
                <p className="text-2xl font-bold">Premium Quality Oils</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-amber-900 mb-12">Why Choose Amrat Kalash?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-amber-100 hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <Leaf className="w-10 h-10 text-amber-600 mb-4" />
                <h3 className="font-bold text-amber-900 mb-2">100% Natural</h3>
                <p className="text-sm text-amber-700">No additives, preservatives, or artificial ingredients.</p>
              </CardContent>
            </Card>

            <Card className="border-amber-100 hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <Shield className="w-10 h-10 text-amber-600 mb-4" />
                <h3 className="font-bold text-amber-900 mb-2">Quality Assured</h3>
                <p className="text-sm text-amber-700">Certified and tested for purity and nutritional value.</p>
              </CardContent>
            </Card>

            <Card className="border-amber-100 hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <Droplets className="w-10 h-10 text-amber-600 mb-4" />
                <h3 className="font-bold text-amber-900 mb-2">Cold Pressed</h3>
                <p className="text-sm text-amber-700">Retains natural nutrients and rich flavor profile.</p>
              </CardContent>
            </Card>

            <Card className="border-amber-100 hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <Sprout className="w-10 h-10 text-amber-600 mb-4" />
                <h3 className="font-bold text-amber-900 mb-2">Eco-Friendly</h3>
                <p className="text-sm text-amber-700">Sustainable sourcing and environmentally conscious practices.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="bg-amber-50 py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-amber-900 mb-12">Our Best Sellers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                <Droplets className="w-20 h-20 text-white opacity-50" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-amber-900 mb-2">Mustard Oil</h3>
                <p className="text-sm text-amber-700 mb-4">Rich, pungent flavor with traditional cooking benefits.</p>
                <Link href="/products/info">
                  <Button variant="outline" className="w-full border-amber-600 text-amber-600 bg-transparent">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-amber-300 to-yellow-400 flex items-center justify-center">
                <Droplets className="w-20 h-20 text-white opacity-50" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-amber-900 mb-2">Groundnut Oil</h3>
                <p className="text-sm text-amber-700 mb-4">Light, nutty flavor perfect for all cuisines.</p>
                <Link href="/products/info">
                  <Button variant="outline" className="w-full border-amber-600 text-amber-600 bg-transparent">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-yellow-300 to-amber-400 flex items-center justify-center">
                <Droplets className="w-20 h-20 text-white opacity-50" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-amber-900 mb-2">Sunflower Oil</h3>
                <p className="text-sm text-amber-700 mb-4">Light and healthy for everyday cooking needs.</p>
                <Link href="/products/info">
                  <Button variant="outline" className="w-full border-amber-600 text-amber-600 bg-transparent">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-amber-900 text-white py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Experience Premium Oils?</h2>
          <p className="text-lg text-amber-100 mb-8 max-w-2xl mx-auto">
            Join thousands of health-conscious families who trust Amrat Kalash for their daily cooking and wellness needs.
          </p>
          <Link href="/products">
            <Button size="lg" className="bg-amber-400 text-amber-900 hover:bg-amber-300">
              Shop Now
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
