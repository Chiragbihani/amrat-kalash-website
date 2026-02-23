'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { useProductTheme } from '@/lib/product-context'
import { productThemes } from '@/lib/product-themes'
import { getProductById } from '@/lib/db-client'
import type { Product, ProductType } from '@/lib/db-client'
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
  const { setSelectedProduct, theme } = useProductTheme()
  
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedVariant, setSelectedVariant] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [popupData, setPopupData] = useState<{ quantity: number; size: string; name: string } | null>(null)

  useEffect(() => {
    if (params?.id) {
      const productId = params.id as string
      const p = getProductById(productId)
      setProduct(p)
      if (p) {
        setSelectedVariant(p.variants[0]?.id || '')
        // Set the theme based on product type - cast to the correct ProductType
        const productType = p.type as any
        if (productType in productThemes) {
          setSelectedProduct(productType)
        }
      }
      setLoading(false)
    }
  }, [params, setSelectedProduct])

  if (loading) {
    return (
      <main className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div 
              className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 mb-4"
              style={{ borderColor: theme?.primary || '#EA580C' }}
            ></div>
            <p style={{ color: theme?.secondary || '#EA580C' }}>Loading product...</p>
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
            <AlertCircle className="w-12 h-12 mx-auto mb-4" style={{ color: theme?.primary || '#EA580C' }} />
            <h1 className="text-2xl font-bold mb-2" style={{ color: theme?.textPrimary || 'text-amber-900' }}>Product Not Found</h1>
            <p className="mb-6" style={{ color: theme?.textSecondary || 'text-amber-700' }}>The product you're looking for doesn't exist.</p>
            <Link href="/products">
              <Button style={{ backgroundColor: theme?.primary || '#EA580C' }}>Back to Products</Button>
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

    if (!product) {
      toast.error('Product not found')
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
        (item: any) => item.productId === product.id && item.variantId === selectedVariant
      )

      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        cart.push({
          productId: product.id,
          productName: product.name,
          variantId: selectedVariant,
          variantSize: currentVariant.size,
          price: currentVariant.price,
          quantity,
        })
      }

      localStorage.setItem('amrat_cart', JSON.stringify(cart))
      // Dispatch an event so other components (Header) can update counts
      try { window.dispatchEvent(new CustomEvent('amrat_cart_updated', { detail: { count: cart.reduce((s: number, i: any) => s + (i.quantity || 0), 0) } })) } catch {}
      // show animated edible-oil popup
      setPopupData({ quantity, size: currentVariant.size, name: product.name })
      setShowPopup(true)
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

      <div className="flex-1 py-8" style={{ backgroundColor: theme ? theme.cardBg : '#FEF3C7' }}>
        <div className="max-w-6xl mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8 text-sm" style={{ color: theme?.secondary || '#B45309' }}>
            <Link href="/" className="hover:underline" style={{ color: theme?.secondary || '#B45309' }}>Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:underline" style={{ color: theme?.secondary || '#B45309' }}>Products</Link>
            <span>/</span>
            <span className="font-medium" style={{ color: theme?.primary || '#EA580C' }}>{product.name}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product Image */}
            <div>
              <div 
                className="rounded-lg h-96 flex items-center justify-center sticky top-8"
                style={{
                  background: theme ? `linear-gradient(to bottom right, ${theme.primary}, ${theme.secondary})` : 'linear-gradient(to bottom right, #FBBF24, #F97316)',
                }}
              >
                <Droplets className="w-32 h-32 text-white opacity-30" />
              </div>
            </div>

            {/* Product Details */}
            <div>
              <div className="mb-6">
                <Badge 
                  className="mb-2"
                  style={{
                    backgroundColor: theme ? theme.primary + '33' : '#FCA5A5',
                    color: theme?.primary || '#EA580C',
                  }}
                >
                  {product.type.charAt(0).toUpperCase() + product.type.slice(1)} Oil
                </Badge>
                <h1 className="text-4xl font-bold mb-2" style={{ color: theme?.primary || '#EA580C' }}>{product.name}</h1>
                <p className="text-lg" style={{ color: theme?.secondary || '#B45309' }}>{product.description}</p>
              </div>

              {/* Variant Selection */}
              <Card 
                className="mb-6"
                style={{
                  borderColor: theme?.primary || '#EA580C',
                }}
              >
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4" style={{ color: theme?.primary || '#EA580C' }}>Select Size</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {product.variants.map((variant) => (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariant(variant.id)}
                        className="p-4 border-2 rounded-lg transition-all"
                        style={{
                          borderColor: selectedVariant === variant.id ? theme?.primary || '#EA580C' : '#E5E7EB',
                          backgroundColor: selectedVariant === variant.id ? theme ? theme.cardBg : '#FEF3C7' : 'white',
                        }}
                      >
                        <div className="font-semibold" style={{ color: theme?.primary || '#EA580C' }}>{variant.size}</div>
                        <div style={{ color: theme?.secondary || '#B45309' }}>₹{variant.price}</div>
                        <div className="text-xs mt-1" style={{ color: theme?.secondary || '#B45309' }}>
                          {variant.stock > 0 ? `${variant.stock} in stock` : 'Out of stock'}
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quantity */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-3" style={{ color: theme?.primary || '#EA580C' }}>Quantity</label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    style={{
                      borderColor: theme?.primary || '#EA580C',
                      color: theme?.primary || '#EA580C',
                    }}
                  >
                    −
                  </Button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    style={{
                      borderColor: theme?.primary || '#EA580C',
                      color: theme?.primary || '#EA580C',
                    }}
                    className="w-16 text-center border rounded px-2 py-1"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    style={{
                      borderColor: theme?.primary || '#EA580C',
                      color: theme?.primary || '#EA580C',
                    }}
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <Button
                onClick={handleAddToCart}
                disabled={isAdding || !currentVariant || currentVariant.stock === 0}
                className="w-full text-white py-3 mb-4"
                size="lg"
                style={{
                  backgroundColor: theme?.primary || '#EA580C',
                }}
                onMouseEnter={(e) => {
                  if (!e.currentTarget.disabled) {
                    e.currentTarget.style.backgroundColor = theme?.secondary || '#FB923C'
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = theme?.primary || '#EA580C'
                }}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {isAdding ? 'Adding...' : 'Add to Cart'}
              </Button>

              {currentVariant && currentVariant.stock === 0 && (
                <div 
                  className="p-3 border rounded-lg text-sm"
                  style={{
                    backgroundColor: theme?.primary + '20' || '#FCA5A5',
                    borderColor: theme?.primary || '#EA580C',
                    color: theme?.primary || '#EA580C',
                  }}
                >
                  This variant is currently out of stock
                </div>
              )}

              {/* Ingredients Section */}
              <Card 
                style={{
                  borderColor: theme?.primary || '#EA580C',
                }}
              >
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3" style={{ color: theme?.primary || '#EA580C' }}>Ingredients</h3>
                  <ul className="space-y-2">
                    {product.ingredients.map((ingredient, index) => (
                      <li key={index} className="text-sm flex items-start gap-2" style={{ color: theme?.secondary || '#B45309' }}>
                        <Leaf className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: theme?.primary || '#EA580C' }} />
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
              <TabsList 
                className="grid w-full grid-cols-2"
                style={{
                  backgroundColor: theme ? theme.cardBg : '#FEF3C7',
                }}
              >
                <TabsTrigger value="benefits">Health Benefits</TabsTrigger>
                <TabsTrigger value="usage">How to Use</TabsTrigger>
              </TabsList>

              <TabsContent value="benefits" className="mt-6">
                <Card 
                  style={{
                    borderColor: theme?.primary || '#EA580C',
                  }}
                >
                  <CardContent className="p-6">
                    <ul className="space-y-3">
                      {product.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-3" style={{ color: theme?.secondary || '#B45309' }}>
                          <div 
                            className="w-2 h-2 rounded-full mt-2 flex-shrink-0" 
                            style={{ backgroundColor: theme?.primary || '#EA580C' }}
                          />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="usage" className="mt-6">
                <Card 
                  style={{
                    borderColor: theme?.primary || '#EA580C',
                  }}
                >
                  <CardContent className="p-6">
                    <p className="leading-relaxed text-lg" style={{ color: theme?.secondary || '#B45309' }}>{product.usage}</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <Footer />
      {showPopup && popupData && (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore - dynamic import avoided for brevity
        <
          div
          // render inline popup to avoid adding heavy imports
          className="fixed right-6 bottom-20 z-50 pointer-events-none"
        >
          <div className="flex items-center gap-3 bg-white/90 backdrop-blur-md border border-amber-200 rounded-lg px-4 py-3 shadow-lg animate-cart-pop">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-amber-100">
              <span className="text-2xl">🫙</span>
            </div>
            <div className="text-sm">
              <div className="font-semibold text-amber-900">Added to cart</div>
              <div className="text-amber-700">{popupData.quantity} × {popupData.size} {popupData.name}</div>
            </div>
          </div>
          <style>{`@keyframes cartPop{0%{transform:translateY(12px) scale(.96);opacity:0}10%{transform:translateY(0) scale(1);opacity:1}80%{transform:translateY(-6px) scale(1);opacity:1}100%{transform:translateY(-20px) scale(.98);opacity:0}}.animate-cart-pop{animation:cartPop 1.8s cubic-bezier(.2,.9,.3,1) forwards}`}</style>
        </div>
      )}
    </main>
  )
}
