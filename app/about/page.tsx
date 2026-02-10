'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card, CardContent } from '@/components/ui/card'
import { Award, Users, Leaf, Target } from 'lucide-react'

export default function About() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-50 to-orange-50 py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4 text-pretty">About Amrat Kalash</h1>
          <p className="text-lg text-amber-800">Delivering pure, natural oils for generations of happy, healthy families.</p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-6">Our Story</h2>
              <p className="text-amber-800 leading-relaxed mb-4">
                Amrat Kalash was founded with a mission to bring the purest, most nutritious oils to families who care about their health and wellness. With decades of experience in oil manufacturing, we have built a reputation for excellence and quality.
              </p>
              <p className="text-amber-800 leading-relaxed mb-4">
                Our journey began with a simple belief: that natural, cold-pressed oils are the best choice for your family's cooking and health. We source only the finest seeds and nuts, processing them using traditional methods combined with modern quality standards.
              </p>
              <p className="text-amber-800 leading-relaxed">
                Today, Amrat Kalash is trusted by thousands of families across the country, who choose us for our unwavering commitment to purity, quality, and sustainability.
              </p>
            </div>
            <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl h-96 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-8xl mb-4">🫙</div>
                <p className="text-2xl font-bold">Amrat Kalash</p>
                <p className="text-amber-50 mt-2">Premium Oils for Life</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-amber-50 py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-amber-900 mb-12">Our Mission & Vision</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-amber-100">
              <CardContent className="p-8">
                <Target className="w-12 h-12 text-amber-600 mb-4" />
                <h3 className="text-2xl font-bold text-amber-900 mb-4">Our Mission</h3>
                <p className="text-amber-800 leading-relaxed">
                  To provide premium quality, pure, and natural oils that enhance the health, wellness, and culinary experiences of families while maintaining the highest standards of quality and sustainability.
                </p>
              </CardContent>
            </Card>

            <Card className="border-amber-100">
              <CardContent className="p-8">
                <Leaf className="w-12 h-12 text-amber-600 mb-4" />
                <h3 className="text-2xl font-bold text-amber-900 mb-4">Our Vision</h3>
                <p className="text-amber-800 leading-relaxed">
                  To be the most trusted brand for premium oils in the country, recognized for our commitment to excellence, innovation, and environmental responsibility.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-amber-900 mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-amber-100 hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <Award className="w-10 h-10 text-amber-600 mb-4" />
                <h3 className="font-bold text-amber-900 mb-2">Quality</h3>
                <p className="text-sm text-amber-700">Uncompromising commitment to excellence in every product we make.</p>
              </CardContent>
            </Card>

            <Card className="border-amber-100 hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <Leaf className="w-10 h-10 text-amber-600 mb-4" />
                <h3 className="font-bold text-amber-900 mb-2">Purity</h3>
                <p className="text-sm text-amber-700">100% natural, no additives, preservatives, or artificial ingredients.</p>
              </CardContent>
            </Card>

            <Card className="border-amber-100 hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <Leaf className="w-10 h-10 text-amber-600 mb-4" />
                <h3 className="font-bold text-amber-900 mb-2">Sustainability</h3>
                <p className="text-sm text-amber-700">Environmentally conscious practices in sourcing and production.</p>
              </CardContent>
            </Card>

            <Card className="border-amber-100 hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <Users className="w-10 h-10 text-amber-600 mb-4" />
                <h3 className="font-bold text-amber-900 mb-2">Trust</h3>
                <p className="text-sm text-amber-700">Building lasting relationships with our customers and stakeholders.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Manufacturing Process */}
      <section className="bg-amber-50 py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-amber-900 mb-12">Our Manufacturing Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                1
              </div>
              <h3 className="font-bold text-amber-900 mb-2">Sourcing</h3>
              <p className="text-sm text-amber-700">Premium seeds and nuts sourced from trusted farmers.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-amber-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                2
              </div>
              <h3 className="font-bold text-amber-900 mb-2">Cleaning</h3>
              <p className="text-sm text-amber-700">Thorough cleaning and quality inspection of all raw materials.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-amber-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                3
              </div>
              <h3 className="font-bold text-amber-900 mb-2">Cold Pressing</h3>
              <p className="text-sm text-amber-700">Traditional cold-press extraction to preserve nutrients.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-amber-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                4
              </div>
              <h3 className="font-bold text-amber-900 mb-2">Testing</h3>
              <p className="text-sm text-amber-700">Lab testing and quality certification before packaging.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-amber-600 mb-2">50+</div>
              <p className="text-amber-800">Years of Legacy</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-600 mb-2">100K+</div>
              <p className="text-amber-800">Happy Families</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-600 mb-2">3</div>
              <p className="text-amber-800">Premium Varieties</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-600 mb-2">100%</div>
              <p className="text-amber-800">Natural & Pure</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
