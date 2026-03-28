'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Droplets, Leaf, CheckCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useProductTheme } from '@/lib/product-context'
import { productThemes } from '@/lib/product-themes'
import type { ProductType } from '@/lib/product-themes'

const productData: Record<string, any> = {
  mustard: {
    name: 'Mustard Oil',
    type: 'mustard',
    description: 'Traditional cold-pressed mustard oil with a distinctive pungent flavor',
    videoUrl: '/mustard-oil.mp4',
    benefits: [
      'Rich in selenium and omega-3 fatty acids',
      'Aids digestion and improves metabolism',
      'Has antibacterial and anti-fungal properties',
      'Strengthens hair follicles and promotes hair growth',
      'Improves skin health and reduces acne',
      'Helps reduce inflammation',
      'Supports heart health',
    ],
    usage: [
      'Cooking: Perfect for Indian and Asian cuisines',
      'Massage: Traditional oil for body massage and therapeutic use',
      'Hair care: Apply on scalp for 15-20 minutes before washing',
      'Pickling: Ideal for preserving vegetables',
      'Tempering: Use for seasoning curries and dals',
    ],
    types: ['250ml', '1L', '2L', '5L', '10L'],
    nutritional: 'Per 100ml: Calories 884, Fat 100g, Cholesterol 0mg, Sodium 0mg',
    storage: 'Store in a cool, dark place. Keep away from direct sunlight.',
    expiry: '24 months from date of manufacture',
  },
  doubleFilterGroundnut: {
    name: 'Double Filter Groundnut Oil',
    type: 'doubleFilterGroundnut',
    description: 'Premium double filtered groundnut oil with rich aroma',
    videoUrl: '/double-filter-groundnut-oil.mp4',
    benefits: [
      'High in monounsaturated fats',
      'Rich in Vitamin E',
      'Improves heart health',
      'Enhances immunity',
      'High smoke point for frying',
      'Naturally aromatic',
    ],
    usage: [
      'Cooking: Best for traditional Indian dishes',
      'Frying: Ideal for deep frying',
      'Tempering: Enhances taste of curries',
      'Daily use: Suitable for regular cooking',
    ],
    types: ['250ml', '1L', '2L', '5L', '10L'],
    nutritional: 'Per 100ml: Calories 884, Fat 100g, Cholesterol 0mg',
    storage: 'Keep tightly closed in a cool and dark place.',
    expiry: '24 months from date of manufacture',
  },
  groundnut: {
    name: 'Refined Groundnut Oil',
    type: 'groundnut',
    description: 'Light and versatile refined groundnut oil with a subtle nutty flavor',
    videoUrl: '/video1.mp4',
    benefits: [
      'High in monounsaturated fats (good cholesterol)',
      'Rich in Vitamin E - powerful antioxidant',
      'Supports cardiovascular health',
      'Improves skin elasticity and reduces wrinkles',
      'Has a high smoke point (ideal for deep frying)',
      'Reduces blood pressure and improves circulation',
      'Anti-inflammatory properties',
      'Supports brain health and cognitive function',
    ],
    usage: [
      'Cooking: Ideal for deep frying, stir-frying, and baking',
      'Salad dressing: Mix with vinegar for healthy dressing',
      'Body massage: Light and easily absorbable oil',
      'Skin care: Apply to face for natural glow',
      'Baby massage: Safe and gentle for infant skin',
    ],
    types: ['250ml', '1L', '2L', '5L', '10L'],
    nutritional: 'Per 100ml: Calories 884, Fat 100g, Cholesterol 0mg, Sodium 0mg',
    storage: 'Keep in an airtight container away from heat and light.',
    expiry: '24 months from date of manufacture',
  },
  palm: {
    name: 'Refined Palm Oil',
    type: 'palm',
    description: 'High-quality refined palm oil for commercial and home use',
    videoUrl: '/Palm_Oil.mp4',
    benefits: [
      'High oxidative stability',
      'Rich in natural tocotrienols',
      'Good for high-temperature cooking',
      'Long shelf life',
      'Cost-effective cooking oil',
    ],
    usage: [
      'Cooking: Suitable for daily cooking',
      'Frying: Ideal for commercial frying',
      'Food processing: Widely used in food industry',
    ],
    types: ['1L', '2L', '5L', '10L'],
    nutritional: 'Per 100ml: Calories 884, Fat 100g, Cholesterol 0mg',
    storage: 'Store in a cool place away from direct sunlight.',
    expiry: '24 months from date of manufacture',
  },
  soyabean: {
    name: 'Refined soyabean Oil',
    type: 'soyabean',
    description: 'Nutrient-rich refined soyabean oil packed with omega-3 fatty acids',
    videoUrl: '/soyabean-oil.mp4',
    benefits: [
      'Rich in omega-3 and omega-6 fatty acids',
      'Supports heart and brain health',
      'Contains natural vitamin E',
      'Helps reduce inflammation',
      'Promotes healthy cholesterol levels',
      'Supports hormonal balance',
      'Anti-aging properties for skin',
      'Light and easily absorbable',
    ],
    usage: [
      'Cooking: Versatile oil for all cooking methods',
      'Baking: Works well in baked goods',
      'Salads: Use as salad oil dressing',
      'Massage: Good for body and facial massage',
      'Skincare: Moisturizing oil for dry skin',
      'Cosmetics: Used as base in natural cosmetics',
    ],
    types: ['250ml', '1L', '2L', '5L', '10L'],
    nutritional: 'Per 100ml: Calories 884, Fat 100g, Cholesterol 0mg, Sodium 0mg',
    storage: 'Keep in cool, dark container away from direct sunlight.',
    expiry: '24 months from date of manufacture',
  },
  cottonseed: {
    name: 'Refined Cotton Seed Oil',
    type: 'cottonseed',
    description: 'Premium refined cotton seed oil with excellent cooking properties',
    videoUrl: '/Cotton_Seed_Oil.mp4',
    benefits: [
      'High in antioxidants and polyphenols',
      'Supports healthy cholesterol levels',
      'Rich in linoleic acid for skin health',
      'Improves cardiovascular function',
      'Good smoke point for cooking',
      'Anti-inflammatory properties',
      'Supports immune system',
      'Promotes healthy metabolism',
    ],
    usage: [
      'Cooking: Excellent for frying and baking',
      'Cosmetics: Used in skincare products',
      'Margarine production: Industry standard',
      'Salad dressings: Creates smooth consistency',
      'Industrial uses: Food processing',
    ],
    types: ['250ml', '1L', '2L', '5L', '10L'],
    nutritional: 'Per 100ml: Calories 884, Fat 100g, Cholesterol 0mg, Sodium 0mg',
    storage: 'Store in cool, dark place away from direct sunlight.',
    expiry: '24 months from date of manufacture',
  },
}

export default function ProductInfoPage() {
  const params = useParams()
  const { setSelectedProduct } = useProductTheme()
  
  const productType = params.type as string
  const product = productData[productType]
  const theme = productThemes[productType as ProductType] || productThemes.groundnut

  // Set the selected product theme
  React.useEffect(() => {
    if (productType in productThemes) {
      setSelectedProduct(productType as ProductType)
    }
  }, [productType, setSelectedProduct])

  if (!product) {
    return (
      <main className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
            <Link href="/">
              <Button>Go Back Home</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section 
        className="py-12 md:py-16 transition-all duration-500"
        style={{
          background: `linear-gradient(to right, ${theme.primary}20, ${theme.secondary}20)`,
        }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <Link href="/" className="flex items-center gap-2 mb-6 hover:underline" style={{ color: theme.primary }}>
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-pretty" style={{ color: theme.primary }}>
            {product.name}
          </h1>
          <p className="text-lg" style={{ color: theme.secondary }}>
            {product.description}
          </p>
        </div>
      </section>
        
      {/* Product Information */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <Card 
            className="border-2 overflow-hidden"
            style={{
              borderColor: theme.primary,
            }}
          >
            <CardHeader 
              className="border-b-2"
              style={{
                background: `linear-gradient(to right, ${theme.primary}10, ${theme.secondary}10)`,
                borderColor: theme.primary,
              }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl mb-2" style={{ color: theme.primary }}>
                    {product.name}
                  </CardTitle>
                  <p style={{ color: theme.secondary }}>{product.description}</p>
                </div>
                <Droplets className="w-8 h-8 flex-shrink-0 ml-4" style={{ color: theme.primary }} />
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <Tabs defaultValue="benefits" className="w-full">
                <TabsList 
                  className="grid w-full grid-cols-5"
                  style={{
                    backgroundColor: theme.primary + '10',
                  }}
                >
                  <TabsTrigger value="benefits">Benefits</TabsTrigger>
                  <TabsTrigger value="usage">Usage</TabsTrigger>
                  <TabsTrigger value="types">Packaging</TabsTrigger>
                  <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                </TabsList>

                {/* Benefits */}
                <TabsContent value="benefits" className="mt-6">
                  <h3 className="font-semibold mb-4" style={{ color: theme.primary }}>
                    Health & Wellness Benefits
                  </h3>
                  <ul className="space-y-3">
                    {product.benefits.map((benefit: string, idx: number) => (
                      <li key={idx} className="flex gap-3" style={{ color: theme.secondary }}>
                        <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: theme.primary }} />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>

                {/* Usage */}
                <TabsContent value="usage" className="mt-6">
                  <h3 className="font-semibold mb-4" style={{ color: theme.primary }}>
                    How to Use
                  </h3>
                  <ul className="space-y-3">
                    {product.usage.map((use: string, idx: number) => (
                      <li key={idx} style={{ color: theme.secondary }}>
                        <span className="font-semibold" style={{ color: theme.primary }}>
                          {use.split(':')[0]}:
                        </span>{' '}
                        {use.split(':')[1]}
                      </li>
                    ))}
                  </ul>
                </TabsContent>

                {/* Packaging Types */}
                <TabsContent value="types" className="mt-6">
                  <h3 className="font-semibold mb-4" style={{ color: theme.primary }}>
                    Available Packaging Sizes
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {product.types.map((type: string, idx: number) => (
                      <div
                        key={idx}
                        className="border-2 rounded-lg p-4 text-center"
                        style={{
                          borderColor: theme.primary,
                          backgroundColor: theme.primary + '10',
                        }}
                      >
                        <p className="font-semibold" style={{ color: theme.primary }}>
                          {type}
                        </p>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                {/* Nutrition */}
                <TabsContent value="nutrition" className="mt-6">
                  <h3 className="font-semibold mb-4" style={{ color: theme.primary }}>
                    Nutritional Information
                  </h3>
                  <div 
                    className="border-2 rounded-lg p-4"
                    style={{
                      borderColor: theme.primary,
                      backgroundColor: theme.primary + '10',
                    }}
                  >
                    <p style={{ color: theme.secondary }}>{product.nutritional}</p>
                  </div>
                </TabsContent>

                {/* Details */}
                <TabsContent value="details" className="mt-6">
                  <h3 className="font-semibold mb-4" style={{ color: theme.primary }}>
                    Storage & Shelf Life
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold mb-2" style={{ color: theme.primary }}>
                        Storage Instructions
                      </p>
                      <p style={{ color: theme.secondary }}>{product.storage}</p>
                    </div>
                    <div>
                      <p className="font-semibold mb-2" style={{ color: theme.primary }}>
                        Shelf Life
                      </p>
                      <p style={{ color: theme.secondary }}>{product.expiry}</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              {/* Call to Action */}
              <div className="mt-8 pt-6 border-t-2" style={{ borderColor: theme.primary }}>
                <Link href="/products">
                  <Button 
                    className="text-white"
                    style={{
                      backgroundColor: theme.primary,
                    }}
                  >
                    Shop {product.name}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
          {product.videoUrl && (
        <div className="sticky top-28">
          <div className="rounded-2xl overflow-hidden shadow-xl bg-black">
            <video
              src={product.videoUrl}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="w-full h-[540px] object-cover"
            />
          </div>

          <p
            className="mt-3 text-sm text-center"
            style={{ color: theme.secondary }}
          >
            Authentic processing of {product.name}
          </p>
        </div>
      )}
        </div>
      </div>
      </section>

      <Footer />
    </main>
  )
}

import React from 'react'
