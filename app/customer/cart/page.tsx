'use client'

import { useState, useMemo, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { getProductById } from '@/lib/db'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { Trash2, ShoppingCart, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default function CartPage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [cart, setCart] = useState<any[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCart(JSON.parse(localStorage.getItem('amrat_cart') || '[]'))
      setMounted(true)
    }
  }, [])

  if (!isAuthenticated || user?.role !== 'customer') {
    redirect('/auth')
  }

  const cartItems = useMemo(() => {
    return cart.map((item) => {
      const product = getProductById(item.productId)
      return { ...item, product }
    })
  }, [cart])

  const total = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }, [cartItems])

  const updateQuantity = (productId: string, variantId: string, quantity: number) => {
    const updatedCart = cart.map((item) => {
      if (item.productId === productId && item.variantId === variantId) {
        return { ...item, quantity: Math.max(0, quantity) }
      }
      return item
    }).filter(item => item.quantity > 0)

    setCart(updatedCart)
    localStorage.setItem('amrat_cart', JSON.stringify(updatedCart))
  }

  const removeItem = (productId: string, variantId: string) => {
    const updatedCart = cart.filter(
      (item) => !(item.productId === productId && item.variantId === variantId)
    )
    setCart(updatedCart)
    localStorage.setItem('amrat_cart', JSON.stringify(updatedCart))
    toast.success('Item removed from cart')
  }

  const clearCart = () => {
    if (confirm('Are you sure you want to clear your cart?')) {
      setCart([])
      localStorage.setItem('amrat_cart', JSON.stringify([]))
      toast.success('Cart cleared')
    }
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 bg-amber-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <Link href="/customer/shop" className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Shopping
            </Link>
            <h1 className="text-3xl font-bold text-amber-900">Shopping Cart</h1>
          </div>

          {cartItems.length === 0 ? (
            <Card className="border-amber-200">
              <CardContent className="p-12 text-center">
                <ShoppingCart className="w-12 h-12 text-amber-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-amber-900 mb-2">Your cart is empty</h2>
                <p className="text-amber-700 mb-6">Start shopping to add items to your cart</p>
                <Link href="/products">
                  <Button className="bg-amber-600 hover:bg-amber-700">Continue Shopping</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <Card key={`${item.productId}-${item.variantId}`} className="border-amber-200">
                      <CardContent className="p-6">
                        <div className="flex gap-6">
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="font-bold text-amber-900 text-lg">{item.productName}</h3>
                                <Badge className="bg-amber-100 text-amber-800">{item.variantSize}</Badge>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeItem(item.productId, item.variantId)}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                            <p className="text-amber-700 mb-4">₹{item.price} each</p>
                            
                            {/* Quantity Controls */}
                            <div className="flex items-center gap-3">
                              <label className="text-sm text-amber-900 font-medium">Qty:</label>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)}
                                className="border-amber-300"
                              >
                                −
                              </Button>
                              <input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => updateQuantity(item.productId, item.variantId, parseInt(e.target.value) || 1)}
                                className="w-12 text-center border border-amber-300 rounded px-2 py-1"
                              />
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)}
                                className="border-amber-300"
                              >
                                +
                              </Button>
                            </div>
                          </div>
                          
                          {/* Subtotal */}
                          <div className="text-right">
                            <p className="text-sm text-amber-700 mb-2">Subtotal</p>
                            <p className="text-2xl font-bold text-amber-900">₹{(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="mt-6">
                  <Button
                    variant="outline"
                    onClick={clearCart}
                    className="border-red-300 text-red-600 hover:bg-red-50 bg-transparent"
                  >
                    Clear Cart
                  </Button>
                </div>
              </div>

              {/* Order Summary */}
              <div>
                <Card className="border-amber-200 sticky top-8">
                  <CardContent className="p-6">
                    <h2 className="font-bold text-amber-900 text-lg mb-6">Order Summary</h2>
                    
                    <div className="space-y-3 mb-6 pb-6 border-b border-amber-200">
                      <div className="flex justify-between text-amber-700">
                        <span>Subtotal</span>
                        <span>₹{total.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-amber-700">
                        <span>Shipping</span>
                        <span>Free</span>
                      </div>
                      <div className="flex justify-between text-amber-700">
                        <span>Tax (18% GST)</span>
                        <span>₹{(total * 0.18).toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mb-6">
                      <span className="font-bold text-amber-900 text-lg">Total</span>
                      <span className="font-bold text-amber-900 text-2xl">₹{(total * 1.18).toFixed(2)}</span>
                    </div>

                    <Link href="/customer/checkout" className="w-full block">
                      <Button className="w-full bg-amber-600 hover:bg-amber-700" size="lg">
                        Proceed to Checkout
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}
