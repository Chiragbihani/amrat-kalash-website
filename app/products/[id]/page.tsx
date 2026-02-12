'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { getProductById } from '@/lib/db'
import type { Product } from '@/lib/db'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'
import { ShoppingCart, Droplets, Leaf, AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { isAuthenticated, user } = useAuth()
  const [productId, setProductId] = useState<string>('')
  
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedVariant, setSelectedVariant] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)

  useEffect(() => {
    if (params?.id) {
      setProductId(params.id as string)
    }
  }, [params])

  useEffect(() => {
    if (!productId) return
    
    const fetchProduct = () => {
      const p = getProductById(productId)
      setProduct(p)
      if (p) {
        setSelectedVariant(p.variants[0]?.id || '')
      }
      setLoading(false)
    }
    fetchProduct()
  }, [productId])

  if (loading) {
    return (
      <main className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mb-4"></div>
            <p className="text-amber-700">Loading product...</p>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  if (!product) {
    return (
      <main className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-amber-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-amber-900 mb-2">Product Not Found</h1>
            <p className="text-amber-700 mb-6">The product you're looking for doesn't exist.</p>
            <Link href="/products">
              <Button className="bg-amber-600 hover:bg-amber-700">Back to Products</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  const currentVariant = product.variants.find((v) => v.id === selectedVariant)

  const handleAddToCart = async () => {
    // Check if user is authenticated and is a customer
    if (!isAuthenticated || user?.role !== 'customer') {
      toast.error('Please login as a customer to add items to cart')
      router.push('/auth')
      return
    }

    if (!selectedVariant) {
      toast.error('Please select a variant')
      return
    }

    if (!currentVariant) {
      toast.error('Variant not found')
      return
    }

    if (currentVariant.stock < quantity) {
      toast.error('Not enough stock available')
      return
    }

    setIsAdding(true)
    try {
      // Get existing cart
      const cart = JSON.parse(localStorage.getItem('amrat_cart') || '[]')
      
      // Check if item already exists in cart
      const existingItem = cart.find(
        (item: any) => item.productId === productId && item.variantId === selectedVariant
      )

      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        cart.push({
          productId,
          productName: product.name,
          variantId: selectedVariant,
          variantSize: currentVariant.size,
          price: currentVariant.price,
          quantity,
        })
      }

      localStorage.setItem('amrat_cart', JSON.stringify(cart))
      toast.success(`Added ${quantity} x ${currentVariant.size} to cart`)
      setQuantity(1)
    } catch (error) {
      toast.error('Failed to add to cart')
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 bg-amber-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8 text-sm text-amber-700">
            <Link href="/" className="hover:text-amber-900">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-amber-900">Products</Link>
            <span>/</span>
            <span className="text-amber-900 font-medium">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product Image */}
            <div>
              <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg h-96 flex items-center justify-center sticky top-8">
                <Droplets className="w-32 h-32 text-white opacity-30" />
              </div>
            </div>

            {/* Product Details */}
            <div>
              <div className="mb-6">
                <Badge className="bg-amber-100 text-amber-800 mb-2">
                  {product.type.charAt(0).toUpperCase() + product.type.slice(1)} Oil
                </Badge>
                <h1 className="text-4xl font-bold text-amber-900 mb-2">{product.name}</h1>
                <p className="text-amber-700 text-lg">{product.description}</p>
              </div>

              {/* Variant Selection */}
              <Card className="border-amber-200 mb-6">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-amber-900 mb-4">Select Size</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {product.variants.map((variant) => (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariant(variant.id)}
                        className={`p-4 border-2 rounded-lg transition-all ${
                          selectedVariant === variant.id
                            ? 'border-amber-600 bg-amber-50'
                            : 'border-amber-200 hover:border-amber-400'
                        }`}
                      >
                        <div className="font-semibold text-amber-900">{variant.size}</div>
                        <div className="text-amber-600">₹{variant.price}</div>
                        <div className="text-xs text-amber-700 mt-1">
                          {variant.stock > 0 ? `${variant.stock} in stock` : 'Out of stock'}
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quantity */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-amber-900 mb-3">Quantity</label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="border-amber-300"
                  >
                    −
                  </Button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 text-center border border-amber-300 rounded px-2 py-1"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    className="border-amber-300"
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <Button
                onClick={handleAddToCart}
                disabled={isAdding || !currentVariant || currentVariant.stock === 0}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 mb-4"
                size="lg"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {isAdding ? 'Adding...' : 'Add to Cart'}
              </Button>

              {currentVariant && currentVariant.stock === 0 && (
                <div className="p-3 bg-orange-50 border border-orange-300 rounded-lg text-orange-800 text-sm">
                  This variant is currently out of stock
                </div>
              )}

              {/* Ingredients Section */}
              <Card className="border-amber-200">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-amber-900 mb-3">Ingredients</h3>
                  <ul className="space-y-2">
                    {product.ingredients.map((ingredient, index) => (
                      <li key={index} className="text-amber-700 text-sm flex items-start gap-2">
                        <Leaf className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Benefits & Usage Tabs */}
          <div className="mt-12">
            <Tabs defaultValue="benefits" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="benefits">Health Benefits</TabsTrigger>
                <TabsTrigger value="usage">How to Use</TabsTrigger>
              </TabsList>

              <TabsContent value="benefits" className="mt-6">
                <Card className="border-amber-200">
                  <CardContent className="p-6">
                    <ul className="space-y-3">
                      {product.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-3 text-amber-700">
                          <div className="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="usage" className="mt-6">
                <Card className="border-amber-200">
                  <CardContent className="p-6">
                    <p className="text-amber-700 leading-relaxed text-lg">{product.usage}</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
