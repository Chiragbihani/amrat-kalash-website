'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card, CardContent } from '@/components/ui/card'
import { Award, Users, Leaf, Target, CheckCircle2 } from 'lucide-react'

export default function About() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* Hero Section with Image */}
      <section className="relative h-[500px] md:h-[600px] overflow-hidden bg-gradient-to-br from-[#33382D] to-[#404437]">
        <div className="absolute inset-0 
  bg-gradient-to-r 
  from-[#33382D]/60 
  to-[#404437]/40 
  z-10" 
/>
<img
  src="/hero-image.png"
  alt="Amrat Kalash Hero"
  className="absolute inset-0 h-full w-full object-cover opacity-30"
/>
        <div className="relative z-20 h-full flex items-center">
          <div className="max-w-6xl mx-auto px-4 w-full">
            <h1 className="text-5xl md:text-6xl font-bold text-[#F8F8F8] mb-4 text-pretty">
              About Amrat Kalash
            </h1>
            <p className="text-xl md:text-2xl text-[#F8F8F8]/90 max-w-2xl">
              Delivering pure, natural oils for generations of happy, healthy families
            </p>
          </div>
        </div>
      </section>

      {/* Company Story - Enhanced Layout */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#F8F8F8] via-white to-[#F8F8F8]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-[#33382D] text-[#FFFFFF] px-4 py-2 rounded-full mb-6 text-sm font-semibold">
                Our Heritage
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#33382D] mb-6 leading-tight">
                Crafted with Care, <span className="text-[#404437]">Trusted for Generations</span>
              </h2>
              <p className="text-amber-800 leading-relaxed mb-4 text-lg">
                Amrat Kalash was founded with a mission to bring the purest, most nutritious oils to families who care about their health and wellness. With decades of experience in oil manufacturing, we have built a reputation for excellence and quality.
              </p>
              <p className="text-amber-800 leading-relaxed mb-4">
                Our journey began with a simple belief: that natural, cold-pressed oils are the best choice for your family's cooking and health. We source only the finest seeds and nuts, processing them using traditional methods combined with modern quality standards.
              </p>
              <p className="text-amber-800 leading-relaxed mb-8">
                Today, Amrat Kalash is trusted by thousands of families across the country, who choose us for our unwavering commitment to purity, quality, and sustainability.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-amber-600 flex-shrink-0" />
                  <span className="text-amber-800">100% Natural & Pure Ingredients</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-amber-600 flex-shrink-0" />
                  <span className="text-amber-800">Cold-Pressed Extraction Methods</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-amber-600 flex-shrink-0" />
                  <span className="text-amber-800">Lab-Tested Quality Assurance</span>
                </div>
              </div>
            </div>
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-lg bg-amber-50">
  <img
    src="/About.png"
    alt="Amrat Kalash Story"
    className="absolute inset-0 h-full w-full object-contain"
  />
</div>
          </div>
        </div>
      </section>

      {/* Mission & Vision - Side by Side */}
      <section className="bg-gradient-to-b from-amber-50 to-orange-50 py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-[#33382D] mb-4">
              Mission & Vision
            </h2>
            <p className="text-lg text-amber-800 max-w-2xl mx-auto">
              Our guiding principles that shape everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 md:p-10">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 bg-amber-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Target className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#33382D]">Our Mission</h3>
                </div>
                <p className="text-amber-800 leading-relaxed text-lg">
                  To provide premium quality, pure, and natural oils that enhance the health, wellness, and culinary experiences of families while maintaining the highest standards of quality and sustainability.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 md:p-10">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 bg-amber-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Leaf className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#33382D]">Our Vision</h3>
                </div>
                <p className="text-amber-800 leading-relaxed text-lg">
                  To be the most trusted brand for premium oils in the country, recognized for our commitment to excellence, innovation, and environmental responsibility.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values - Enhanced Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-[#33382D] mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-amber-800 max-w-2xl mx-auto">
              The principles that define who we are and guide our decisions
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 shadow-md hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#33382D]/90 transition-colors">
                  <Award className="w-6 h-6 text-amber-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-[#33382D] mb-2">Quality</h3>
                <p className="text-sm text-amber-700 leading-relaxed">
                  Uncompromising commitment to excellence in every product we make.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#33382D]/90 transition-colors">
                  <Leaf className="w-6 h-6 text-amber-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-[#33382D] mb-2">Purity</h3>
                <p className="text-sm text-amber-700 leading-relaxed">
                  100% natural, no additives, preservatives, or artificial ingredients.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#33382D]/90 transition-colors">
                  <Leaf className="w-6 h-6 text-amber-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-[#33382D] mb-2">Sustainability</h3>
                <p className="text-sm text-amber-700 leading-relaxed">
                  Environmentally conscious practices in sourcing and production.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#33382D]/90 transition-colors">
                  <Users className="w-6 h-6 text-amber-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-[#33382D] mb-2">Trust</h3>
                <p className="text-sm text-amber-700 leading-relaxed">
                  Building lasting relationships with our customers and stakeholders.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Manufacturing Process - Enhanced */}
      <section className="bg-gradient-to-b from-amber-50 to-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-[#33382D] mb-4">
              Our Manufacturing Process
            </h2>
            <p className="text-lg text-amber-800 max-w-2xl mx-auto">
              From farm to bottle, every step ensures premium quality
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: 1,
                title: 'Sourcing',
                description: 'Premium seeds and nuts sourced from trusted farmers using sustainable practices.'
              },
              {
                step: 2,
                title: 'Cleaning',
                description: 'Thorough cleaning and quality inspection of all raw materials.'
              },
              {
                step: 3,
                title: 'Cold Pressing',
                description: 'Traditional cold-press extraction to preserve nutrients and natural goodness.'
              },
              {
                step: 4,
                title: 'Testing',
                description: 'Lab testing and quality certification before packaging and distribution.'
              }
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow h-full">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-600 to-orange-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-2xl">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-amber-900 mb-3 text-center text-lg">{item.title}</h3>
                  <p className="text-sm text-amber-700 text-center leading-relaxed">{item.description}</p>
                </div>
                {item.step < 4 && (
                  <div className="hidden lg:block absolute top-8 -right-3 text-amber-400 text-2xl">→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section - Enhanced */}
      <section className="bg-gradient-to-r from-[#33382D] to-[#33382D] py-16 md:py-20 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '10+', label: 'Years of Legacy', icon: '🏆' },
              { number: '10K+', label: 'Happy Families', icon: '👨‍👩‍👧‍👦' },
              { number: '6', label: 'Premium Varieties', icon: '🫙' },
              { number: '100%', label: 'Natural & Pure', icon: '🍃' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                <p className="text-amber-100">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-amber-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#33382D] mb-4">
            Experience the Difference
          </h2>
          <p className="text-lg text-amber-800 mb-8">
            Join thousands of families who trust Amrat Kalash for their daily wellness needs.
          </p>
          <button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            Shop Now
          </button>
        </div>
      </section>

      <Footer />
    </main>
  )
}
