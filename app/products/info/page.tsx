'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Droplets, Leaf, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function ProductInfoPage() {
  const products = [
    {
      name: 'Mustard Oil',
      type: 'mustard',
      description: 'Traditional cold-pressed mustard oil with a distinctive pungent flavor',
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
    {
      name: 'Groundnut Oil',
      type: 'groundnut',
      description: 'Light and versatile groundnut oil with a subtle nutty flavor',
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
    {
      name: 'Sunflower Oil',
      type: 'sunflower',
      description: 'Pure sunflower oil rich in Vitamin E and antioxidants',
      benefits: [
        'Very high in Vitamin E - protects cells from damage',
        'Rich in antioxidants that fight free radicals',
        'Supports brain health and development',
        'Improves skin health and reduces inflammation',
        'Promotes heart health',
        'Balances cholesterol levels',
        'Light and non-greasy texture',
        'Suitable for sensitive skin',
      ],
      usage: [
        'Cooking: Ideal for everyday cooking needs',
        'Frying: Good smoke point for pan frying',
        'Salads: Use as a base for salad dressings',
        'Skincare: Apply directly to face or body',
        'Hair care: Warm oil massage for healthy hair',
        'Wellness: Can be consumed in moderation',
      ],
      types: ['250ml', '1L', '2L', '5L', '10L'],
      nutritional: 'Per 100ml: Calories 884, Fat 100g, Cholesterol 0mg, Sodium 0mg',
      storage: 'Store in a cool place, away from direct sunlight and heat.',
      expiry: '24 months from date of manufacture',
    },
    {
      name: 'Soybean Oil',
      type: 'soybean',
      description: 'Nutrient-rich soybean oil packed with omega-3 fatty acids',
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
  ]

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-50 to-orange-50 py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4 text-pretty">
            Complete Product Information
          </h1>
          <p className="text-lg text-amber-800">
            Discover the benefits, usage, and details of our premium oil collection
          </p>
        </div>
      </section>

      {/* Products Information */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="space-y-8">
            {products.map((product) => (
              <Card key={product.type} className="border-amber-200 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl text-amber-900 mb-2">{product.name}</CardTitle>
                      <p className="text-amber-700">{product.description}</p>
                    </div>
                    <Droplets className="w-8 h-8 text-amber-600 flex-shrink-0 ml-4" />
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <Tabs defaultValue="benefits" className="w-full">
                    <TabsList className="grid w-full grid-cols-5 bg-amber-50">
                      <TabsTrigger value="benefits">Benefits</TabsTrigger>
                      <TabsTrigger value="usage">Usage</TabsTrigger>
                      <TabsTrigger value="types">Packaging</TabsTrigger>
                      <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
                      <TabsTrigger value="details">Details</TabsTrigger>
                    </TabsList>

                    {/* Benefits */}
                    <TabsContent value="benefits" className="mt-6">
                      <h3 className="font-semibold text-amber-900 mb-4">Health & Wellness Benefits</h3>
                      <ul className="space-y-3">
                        {product.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex gap-3 text-amber-800">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </TabsContent>

                    {/* Usage */}
                    <TabsContent value="usage" className="mt-6">
                      <h3 className="font-semibold text-amber-900 mb-4">How to Use</h3>
                      <ul className="space-y-3">
                        {product.usage.map((use, idx) => (
                          <li key={idx} className="text-amber-800">
                            <span className="font-semibold text-amber-900">{use.split(':')[0]}:</span> {use.split(':')[1]}
                          </li>
                        ))}
                      </ul>
                    </TabsContent>

                    {/* Packaging Types */}
                    <TabsContent value="types" className="mt-6">
                      <h3 className="font-semibold text-amber-900 mb-4">Available Packaging Sizes</h3>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                        {product.types.map((type, idx) => (
                          <div
                            key={idx}
                            className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-center"
                          >
                            <p className="font-semibold text-amber-900">{type}</p>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    {/* Nutrition */}
                    <TabsContent value="nutrition" className="mt-6">
                      <h3 className="font-semibold text-amber-900 mb-4">Nutritional Information</h3>
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                        <p className="text-amber-800">{product.nutritional}</p>
                      </div>
                    </TabsContent>

                    {/* Details */}
                    <TabsContent value="details" className="mt-6">
                      <h3 className="font-semibold text-amber-900 mb-4">Storage & Shelf Life</h3>
                      <div className="space-y-4">
                        <div>
                          <p className="font-semibold text-amber-900 mb-2">Storage Instructions</p>
                          <p className="text-amber-800">{product.storage}</p>
                        </div>
                        <div>
                          <p className="font-semibold text-amber-900 mb-2">Shelf Life</p>
                          <p className="text-amber-800">{product.expiry}</p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>

                  {/* Call to Action */}
                  <div className="mt-8 pt-6 border-t border-amber-200">
                    <Link href="/products">
                      <Button className="bg-amber-600 hover:bg-amber-700">
                        Shop {product.name}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
