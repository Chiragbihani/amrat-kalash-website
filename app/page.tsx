'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Leaf, Shield, Droplets, Sprout, Play } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { productThemes } from '@/lib/product-themes'
import type { ProductType } from '@/lib/product-themes'

export default function Home() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      {/* Enhanced Hero Section with Image/Video */}
      <section className="relative min-h-[600px] md:min-h-[700px] overflow-hidden">
        {/* Background Image */}
        <video
          src="/Home-Page-Video.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent z-10" />


        {/* Hero Content */}
        <div className="relative z-20 h-full flex items-center">
          <div className="max-w-6xl mx-auto px-4 w-full py-16 md:py-24">
            <div className="max-w-2xl">
              <div className="inline-block bg-amber-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                🌿 Premium Quality Oils
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight text-pretty">
                Pure, Natural Oils for Your Family's Health
              </h1>
              <p className="text-xl md:text-2xl text-amber-50 mb-8 leading-relaxed">
                Cold-pressed, naturally processed oils that have been trusted by families for generations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/products">
                  <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-6 text-lg">
                    Explore Products
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent px-8 py-6 text-lg">
                    Get in Touch
                  </Button>
                </Link>
              </div>
              
              {/* Trust Indicators */}
              <div className="mt-10 flex flex-wrap gap-6 text-white">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                  <span>50+ Years Heritage</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                  <span>100% Natural</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                  <span>Lab Tested</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Features Section - Enhanced */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-amber-50 via-white to-amber-50">
  {/* Background ambient animation */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-300/20 rounded-full blur-3xl animate-pulse" />
    <div className="absolute top-1/3 -right-32 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl animate-pulse delay-1000" />
  </div>

  <div className="relative max-w-6xl mx-auto px-4">
    {/* Section Header */}
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">
        Why Choose Amrat Kalash?
      </h2>
      <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto rounded-full" />
    </div>

    {/* Feature Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {[
        {
          title: "100% Natural",
          desc: "No additives, preservatives, or artificial ingredients. Pure as nature intended.",
          icon: Leaf,
        },
        {
          title: "Quality Assured",
          desc: "Certified and tested for purity and nutritional value. Every batch matters.",
          icon: Shield,
        },
        {
          title: "Cold Pressed",
          desc: "Retains natural nutrients and rich flavor profile for maximum health benefits.",
          icon: Droplets,
        },
        {
          title: "Eco-Friendly",
          desc: "Sustainable sourcing and environmentally conscious practices throughout.",
          icon: Sprout,
        },
      ].map((item, index) => {
        const Icon = item.icon
        return (
          <div
            key={index}
            className="group relative rounded-2xl bg-white/70 backdrop-blur-xl border border-amber-100 shadow-md 
                       hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
          >
            {/* Glow overlay */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-400/0 to-orange-400/0 
                            group-hover:from-amber-400/10 group-hover:to-orange-400/10 transition-all duration-500" />

            <div className="relative p-8">
              {/* Icon */}
              <div className="mb-6 w-16 h-16 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 
                              flex items-center justify-center shadow-lg 
                              group-hover:scale-110 transition-transform duration-300">
                <Icon className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-amber-900 mb-3">
                {item.title}
              </h3>
              <p className="text-sm text-amber-700 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  </div>
</section>

      {/* Premium Oils Collection - Enhanced */}
      <section className="bg-gradient-to-b from-amber-50 via-white to-amber-50 py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">Our Premium Oils Collection</h2>
            <p className="text-lg text-amber-700 max-w-2xl mx-auto">Handpicked varieties for every culinary need, from traditional favorites to modern wellness choices</p>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto mt-6"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Double Filter Groundnut Oil */}
            {(() => {
  const theme = productThemes.groundnut
  return (
    <Link href="/products/info/groundnut">
      <div
        className="bg-white rounded-xl shadow-md hover:shadow-2xl hover:-translate-y-2 
                   transition-all duration-300 overflow-hidden cursor-pointer group"
        style={{ borderTop: `5px solid ${theme.primary}` }}
      >
        {/* Image Section */}
        <div className="relative h-56 overflow-hidden">
          <Image
            src="Double_filter_Groundnut_Oil.png"   // ✅ your public image
            alt="Groundnut Oil"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            priority
          />

          {/* Gradient Overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${theme.primary}55, ${theme.secondary}55)`,
            }}
          />

          {/* Soft dark hover layer */}
          <div className="absolute inset-0 bg-black/5 group-hover:bg-black/15 transition-colors" />
        </div>

        {/* Content */}
        <div className="p-6">
          <h3
            className="text-xl font-bold mb-2 group-hover:text-amber-600 transition-colors"
            style={{ color: theme.primary }}
          >
            Double Filter Groundnut Oil
          </h3>

          <p className="text-sm mb-6 text-gray-600">
            Premium quality groundnut oil with superior purity and nutty flavor.
          </p>

          <Button
            variant="outline"
            className="w-full group-hover:bg-amber-50"
            style={{ borderColor: theme.primary, color: theme.primary }}
          >
            Learn More →
          </Button>
        </div>
      </div>
    </Link>
  )
})()}

            {(() => {
  const theme = productThemes.soyabean
  return (
    <Link href="/products/info/soyabean">
      <div
        className="bg-white rounded-xl shadow-md hover:shadow-2xl hover:-translate-y-2 
                   transition-all duration-300 overflow-hidden cursor-pointer group"
        style={{ borderTop: `5px solid ${theme.primary}` }}
      >
        <div className="relative h-56 overflow-hidden">
          <Image
            src="Soyabean_oil.png"
            alt="Refined soyabean Oil"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${theme.primary}55, ${theme.secondary}55)`,
            }}
          />
          <div className="absolute inset-0 bg-black/5 group-hover:bg-black/15 transition-colors" />
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold mb-2" style={{ color: theme.primary }}>
            Refined soyabean Oil
          </h3>
          <p className="text-sm mb-6 text-gray-600">
            Rich in omega-3 and omega-6 fatty acids for healthy living.
          </p>
          <Button
            variant="outline"
            className="w-full group-hover:bg-amber-50"
            style={{ borderColor: theme.primary, color: theme.primary }}
          >
            Learn More →
          </Button>
        </div>
      </div>
    </Link>
  )
})()}

            {/* Refined Groundnut Oil */}
            {(() => {
  const theme = productThemes.groundnut
  return (
    <Link href="/products/info/groundnut">
      <div
        className="bg-white rounded-xl shadow-md hover:shadow-2xl hover:-translate-y-2 
                   transition-all duration-300 overflow-hidden cursor-pointer group"
        style={{ borderTop: `5px solid ${theme.primary}` }}
      >
        <div className="relative h-56 overflow-hidden">
          <Image
            src="/Refined_Groundnut_Oil.png"
            alt="Refined Groundnut Oil"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${theme.primary}55, ${theme.secondary}55)`,
            }}
          />
          <div className="absolute inset-0 bg-black/5 group-hover:bg-black/15 transition-colors" />
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold mb-2" style={{ color: theme.primary }}>
            Refined Groundnut Oil
          </h3>
          <p className="text-sm mb-6 text-gray-600">
            Pure refined groundnut oil for all your culinary needs.
          </p>
          <Button
            variant="outline"
            className="w-full group-hover:bg-amber-50"
            style={{ borderColor: theme.primary, color: theme.primary }}
          >
            Learn More →
          </Button>
        </div>
      </div>
    </Link>
  )
})()}

            {/* Refined Palm Oil */}
            {(() => {
  const theme = productThemes.palm
  return (
    <Link href="/products/info/palm">
      <div
        className="bg-white rounded-xl shadow-md hover:shadow-2xl hover:-translate-y-2 
                   transition-all duration-300 overflow-hidden cursor-pointer group"
        style={{ borderTop: `5px solid ${theme.primary}` }}
      >
        <div className="relative h-56 overflow-hidden">
          <Image
            src="Refined_Palm_Oil.png"
            alt="Refined Palm Oil"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${theme.primary}55, ${theme.secondary}55)`,
            }}
          />
          <div className="absolute inset-0 bg-black/5 group-hover:bg-black/15 transition-colors" />
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold mb-2" style={{ color: theme.primary }}>
            Refined Palm Oil
          </h3>
          <p className="text-sm mb-6 text-gray-600">
            Sustainable palm oil with natural goodness.
          </p>
          <Button
            variant="outline"
            className="w-full group-hover:bg-amber-50"
            style={{ borderColor: theme.primary, color: theme.primary }}
          >
            Learn More →
          </Button>
        </div>
      </div>
    </Link>
  )
})()}

            {/* Refined Cotton Seed Oil */}
            {(() => {
  const theme = productThemes.cottonseed
  return (
    <Link href="/products/info/cottonseed">
      <div
        className="bg-white rounded-xl shadow-md hover:shadow-2xl hover:-translate-y-2 
                   transition-all duration-300 overflow-hidden cursor-pointer group"
        style={{ borderTop: `5px solid ${theme.primary}` }}
      >
        <div className="relative h-56 overflow-hidden">
          <Image
            src="/Refined_Cotton_Seed_Oil.png"
            alt="Refined Cotton Seed Oil"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${theme.primary}55, ${theme.secondary}55)`,
            }}
          />
          <div className="absolute inset-0 bg-black/5 group-hover:bg-black/15 transition-colors" />
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold mb-2" style={{ color: theme.primary }}>
            Refined Cotton Seed Oil
          </h3>
          <p className="text-sm mb-6 text-gray-600">
            Premium cotton seed oil with excellent cooking properties.
          </p>
          <Button
            variant="outline"
            className="w-full group-hover:bg-amber-50"
            style={{ borderColor: theme.primary, color: theme.primary }}
          >
            Learn More →
          </Button>
        </div>
      </div>
    </Link>
  )
})()}

            {/* Mustard Oil */}
            {(() => {
  const theme = productThemes.mustard
  return (
    <Link href="/products/info/mustard">
      <div
        className="bg-white rounded-xl shadow-md hover:shadow-2xl hover:-translate-y-2 
                   transition-all duration-300 overflow-hidden cursor-pointer group"
        style={{ borderTop: `5px solid ${theme.primary}` }}
      >
        <div className="relative h-56 overflow-hidden">
          <Image
            src="/Mustard_Oil.png"
            alt="Mustard Oil"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${theme.primary}55, ${theme.secondary}55)`,
            }}
          />
          <div className="absolute inset-0 bg-black/5 group-hover:bg-black/15 transition-colors" />
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold mb-2" style={{ color: theme.primary }}>
            Mustard Oil
          </h3>
          <p className="text-sm mb-6 text-gray-600">
            Traditional pungent mustard oil with authentic flavor.
          </p>
          <Button
            variant="outline"
            className="w-full group-hover:bg-amber-50"
            style={{ borderColor: theme.primary, color: theme.primary }}
          >
            Learn More →
          </Button>
        </div>
      </div>
    </Link>
  )
})()}
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/cta-background.png"
            alt=""
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/65 to-orange-700/85"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Experience Premium Oils?</h2>
          <p className="text-lg text-amber-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join thousands of health-conscious families who trust Amrat Kalash for their daily cooking and wellness needs. Experience the difference today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button size="lg" className="bg-amber-400 text-amber-900 hover:bg-amber-300 px-8 py-6 text-lg font-semibold">
                Shop Now
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold bg-transparent">
                Learn Our Story
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
