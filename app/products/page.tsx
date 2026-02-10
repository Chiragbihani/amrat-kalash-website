'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ProductCard } from '@/components/product-card'

export default function Products() {
  const products = [
    {
      name: 'Mustard Oil',
      description: 'Traditional mustard oil with a distinctive pungent flavor, ideal for Indian and Asian cuisines.',
      benefits: ['Anti-bacterial', 'Rich Taste', 'Traditional'],
      icon: '🌾',
      color: 'bg-yellow-500',
    },
    {
      name: 'Groundnut Oil',
      description: 'Light and versatile groundnut oil with a subtle nutty flavor, perfect for all cooking methods.',
      benefits: ['Light Flavor', 'Versatile', 'Nutritious'],
      icon: '🥜',
      color: 'bg-amber-500',
    },
    {
      name: 'Sunflower Oil',
      description: 'Pure sunflower oil rich in vitamin E and antioxidants, ideal for healthy everyday cooking.',
      benefits: ['Vitamin E', 'Healthy', 'Light'],
      icon: '🌻',
      color: 'bg-yellow-400',
    },
  ]

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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.name} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* Product Details Section */}
      <section className="bg-amber-50 py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-12">Product Details</h2>

          {/* Mustard Oil */}
          <div className="mb-12 bg-white rounded-lg p-8 shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-amber-900 mb-4">Premium Mustard Oil</h3>
                <p className="text-amber-800 leading-relaxed mb-6">
                  Our cold-pressed mustard oil is extracted from the finest mustard seeds, retaining its natural properties and distinctive flavor. Perfect for traditional cooking, pickling, and massage therapies.
                </p>
                <ul className="space-y-3 text-amber-700">
                  <li className="flex gap-3">
                    <span className="text-amber-600 font-bold">✓</span>
                    <span>100% Pure Cold-Pressed</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-amber-600 font-bold">✓</span>
                    <span>Rich Anti-bacterial Properties</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-amber-600 font-bold">✓</span>
                    <span>Traditional Flavor Profile</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-amber-600 font-bold">✓</span>
                    <span>Available in 500ml & 1L bottles</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg h-80 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🌾</div>
                  <p className="text-white text-xl font-bold">Mustard Oil</p>
                </div>
              </div>
            </div>
          </div>

          {/* Groundnut Oil */}
          <div className="mb-12 bg-white rounded-lg p-8 shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-amber-300 to-yellow-400 rounded-lg h-80 flex items-center justify-center order-2 md:order-1">
                <div className="text-center">
                  <div className="text-6xl mb-4">🥜</div>
                  <p className="text-white text-xl font-bold">Groundnut Oil</p>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <h3 className="text-2xl font-bold text-amber-900 mb-4">Premium Groundnut Oil</h3>
                <p className="text-amber-800 leading-relaxed mb-6">
                  Extracted from premium quality groundnuts, our groundnut oil is light, versatile, and perfect for all cooking styles. High smoke point makes it ideal for deep frying, stir-frying, and baking.
                </p>
                <ul className="space-y-3 text-amber-700">
                  <li className="flex gap-3">
                    <span className="text-amber-600 font-bold">✓</span>
                    <span>Light and Versatile</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-amber-600 font-bold">✓</span>
                    <span>High Smoke Point</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-amber-600 font-bold">✓</span>
                    <span>Subtle Nutty Flavor</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-amber-600 font-bold">✓</span>
                    <span>Available in 500ml & 1L bottles</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Sunflower Oil */}
          <div className="bg-white rounded-lg p-8 shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-amber-900 mb-4">Premium Sunflower Oil</h3>
                <p className="text-amber-800 leading-relaxed mb-6">
                  Rich in Vitamin E and antioxidants, our sunflower oil is perfect for health-conscious families. Light texture and mild flavor make it ideal for everyday cooking, salads, and wellness applications.
                </p>
                <ul className="space-y-3 text-amber-700">
                  <li className="flex gap-3">
                    <span className="text-amber-600 font-bold">✓</span>
                    <span>Rich in Vitamin E</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-amber-600 font-bold">✓</span>
                    <span>High Antioxidants</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-amber-600 font-bold">✓</span>
                    <span>Light and Healthy</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-amber-600 font-bold">✓</span>
                    <span>Available in 500ml & 1L bottles</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-yellow-300 to-amber-400 rounded-lg h-80 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🌻</div>
                  <p className="text-white text-xl font-bold">Sunflower Oil</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Standards */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-12 text-center">Our Quality Standards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl">
                ✓
              </div>
              <h3 className="font-bold text-amber-900 mb-2">Lab Tested</h3>
              <p className="text-amber-700 text-sm">Every batch is tested for purity, quality, and nutritional value in certified laboratories.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl">
                ✓
              </div>
              <h3 className="font-bold text-amber-900 mb-2">Certified Safe</h3>
              <p className="text-amber-700 text-sm">All products meet international food safety standards and certifications.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl">
                ✓
              </div>
              <h3 className="font-bold text-amber-900 mb-2">Eco-Conscious</h3>
              <p className="text-amber-700 text-sm">Sustainable sourcing practices and environmentally friendly production methods.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
