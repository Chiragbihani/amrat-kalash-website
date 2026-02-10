'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { getProducts } from '@/lib/db'
import type { Product } from '@/lib/db'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart, Leaf } from 'lucide-react'
import Link from 'next/link'

export default function Products() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const p = getProducts()
    setProducts(p)
  }, [])

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-50 to-orange-50 py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4 text-pretty">Our Premium Oil Collection</h1>
          <p className="text-lg text-amber-800">Discover the finest quality oils, carefully selected and processed for your family's health and taste.</p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="border-amber-100 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                  <Leaf className="w-16 h-16 text-white opacity-30" />
                </div>
                <CardContent className="p-4">
                  <Badge className="bg-amber-100 text-amber-800 mb-2">
                    {product.type.charAt(0).toUpperCase() + product.type.slice(1)}
                  </Badge>
                  <h3 className="font-bold text-amber-900 mb-2">{product.name}</h3>
                  <p className="text-xs text-amber-700 mb-4 line-clamp-2">{product.description}</p>
                  
                  {/* Variants */}
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-amber-900 mb-2">Available Sizes:</p>
                    <div className="flex flex-wrap gap-1">
                      {product.variants.map((variant) => (
                        <Badge key={variant.id} variant="outline" className="text-xs border-amber-300 text-amber-700">
                          {variant.size}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="mb-4">
                    <p className="text-xs text-amber-700">From ₹{Math.min(...product.variants.map(v => v.price))}</p>
                  </div>

                  <Link href={`/products/${product.id}`} className="w-full">
                    <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white text-sm">
                      <ShoppingCart className="w-4 h-4 mr-1" />
                      View Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-amber-50 py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-12 text-center">Why Choose Amrat Kalash?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-amber-200">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                  <Leaf className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="font-bold text-amber-900 mb-2">100% Pure & Natural</h3>
                <p className="text-amber-700 text-sm">Cold-pressed and no additives or preservatives. Pure goodness in every bottle.</p>
              </CardContent>
            </Card>

            <Card className="border-amber-200">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                  <Leaf className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="font-bold text-amber-900 mb-2">Quality Assured</h3>
                <p className="text-amber-700 text-sm">Lab tested and certified for purity, quality, and nutritional value.</p>
              </CardContent>
            </Card>

            <Card className="border-amber-200">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                  <Leaf className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="font-bold text-amber-900 mb-2">Eco-Conscious</h3>
                <p className="text-amber-700 text-sm">Sustainable sourcing with environmentally friendly production methods.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>



      <Footer />
    </main>
  )
}
