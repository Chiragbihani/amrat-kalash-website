'use client'

import React, { useState, useMemo, useEffect } from "react"
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { getProductById, createOrder, updateStock, sendEmail } from '@/lib/db-client'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { AlertCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function CheckoutPage() {
  const { user, isAuthenticated, loading } = useAuth()
  const router = useRouter()

  const [isProcessing, setIsProcessing] = useState(false)
  const [cart, setCart] = useState<any[]>([])
  const [mounted, setMounted] = useState(false)

  // ✅ Address state properly defined
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
  })

  // Load cart safely
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('amrat_cart')
        const parsed = stored ? JSON.parse(stored) : []
        setCart(Array.isArray(parsed) ? parsed : [])
      } catch {
        setCart([])
      }
      setMounted(true)
    }
  }, [])

  // Auth check
  useEffect(() => {
    if (!loading && (!isAuthenticated || user?.role !== 'customer')) {
      router.push('/auth')
    }
  }, [loading, isAuthenticated, user, router])

  const orderItems = useMemo(() => {
    if (!Array.isArray(cart)) return []

    return cart.map((item) => {
      const product = getProductById(item.productId)
      return { ...item, product }
    })
  }, [cart])

  const subtotal = useMemo(() => {
    return orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )
  }, [orderItems])

  const tax = subtotal * 0.18
  const total = subtotal + tax

  if (!mounted || loading || !isAuthenticated) {
    return (
      <main className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mb-4"></div>
            <p className="text-amber-700">Loading checkout...</p>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  if (!Array.isArray(cart) || cart.length === 0) {
    return (
      <main className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <Card className="border-amber-200 max-w-md">
            <CardContent className="p-8 text-center">
              <AlertCircle className="w-12 h-12 text-amber-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-amber-900 mb-2">
                Cart is Empty
              </h2>
              <p className="text-amber-700 mb-6">
                Please add items to your cart before checkout
              </p>
              <Link href="/products">
                <Button className="bg-amber-600 hover:bg-amber-700">
                  Continue Shopping
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </main>
    )
  }

  // ✅ Correctly updates address (not cart)
  const handleAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target
    setAddress((prev) => ({ ...prev, [name]: value }))
  }

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault()

    if (
      !address.street ||
      !address.city ||
      !address.state ||
      !address.pincode ||
      !address.phone
    ) {
      toast.error('Please fill in all address details')
      return
    }

    if (!/^\d{6}$/.test(address.pincode)) {
      toast.error('Please enter a valid 6-digit pincode')
      return
    }

    if (!/^\d{10}$/.test(address.phone)) {
      toast.error('Please enter a valid 10-digit phone number')
      return
    }

    setIsProcessing(true)

    try {
      const order = createOrder({
        customerId: user!.id,
        customerEmail: user!.email,
        customerName: user!.name,
        items: orderItems,
        totalAmount: total,
        address,
        status: 'pending',
        paymentMethod: 'cod',
      })

      orderItems.forEach((item) => {
        const product = getProductById(item.productId)
        if (product) {
          const variant = product.variants.find(
            (v) => v.id === item.variantId
          )
          if (variant) {
            updateStock(
              item.productId,
              item.variantId,
              variant.stock - item.quantity
            )
          }
        }
      })

      sendEmail({
        to: user!.email,
        subject: 'Order Confirmation - Amrat Kalash',
        type: 'customer_order_confirmation',
        data: {
          customerName: user!.name,
          orderId: order.id,
          items: orderItems,
          totalAmount: total,
          address,
        },
      })

      sendEmail({
        to: 'admin@amratkalash.com',
        subject: `New Order Received - ${order.id}`,
        type: 'admin_new_order',
        data: {
          orderId: order.id,
          customerName: user!.name,
          customerEmail: user!.email,
          customerPhone: address.phone,
          items: orderItems,
          totalAmount: total,
          address,
        },
      })

      toast.success('Order placed successfully!')
      localStorage.removeItem('amrat_cart')
      router.push(`/customer/orders/${order.id}`)
    } catch (error) {
      console.error('Order error:', error)
      toast.error('Failed to place order. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

}



return (
  <main className="min-h-screen flex flex-col">
    <Header />

    <div className="flex-1 bg-amber-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link href="/customer/cart" className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Cart
          </Link>
          <h1 className="text-3xl font-bold text-amber-900">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <Card className="border-amber-200">
              <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200">
                <CardTitle className="text-amber-900">Delivery Address</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handlePlaceOrder} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-amber-900">Street Address</label>
                      <Input
                        type="text"
                        name="street"
                        value={address.street}
                        onChange={handleAddressChange}
                        placeholder="e.g., 123 Main Street"
                        className="border-amber-200 focus-visible:ring-amber-600"
                        disabled={isProcessing}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-amber-900">City</label>
                      <Input
                        type="text"
                        name="city"
                        value={address.city}
                        onChange={handleAddressChange}
                        placeholder="e.g., New Delhi"
                        className="border-amber-200 focus-visible:ring-amber-600"
                        disabled={isProcessing}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-amber-900">State</label>
                      <Input
                        type="text"
                        name="state"
                        value={address.state}
                        onChange={handleAddressChange}
                        placeholder="e.g., Delhi"
                        className="border-amber-200 focus-visible:ring-amber-600"
                        disabled={isProcessing}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-amber-900">Pincode</label>
                      <Input
                        type="text"
                        name="pincode"
                        value={address.pincode}
                        onChange={handleAddressChange}
                        placeholder="e.g., 110001"
                        maxLength={6}
                        className="border-amber-200 focus-visible:ring-amber-600"
                        disabled={isProcessing}
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <label className="block text-sm font-semibold text-amber-900">Phone Number</label>
                      <Input
                        type="tel"
                        name="phone"
                        value={address.phone}
                        onChange={handleAddressChange}
                        placeholder="e.g., 9876543210"
                        maxLength={10}
                        className="border-amber-200 focus-visible:ring-amber-600"
                        disabled={isProcessing}
                      />
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 border border-blue-300 rounded-lg">
                    <p className="text-sm text-blue-900">
                      Payment method: <strong>Cash on Delivery (COD)</strong> - Pay when your order arrives
                    </p>
                  </div>

                  <Button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 mt-6"
                    size="lg"
                  >
                    {isProcessing ? 'Placing Order...' : 'Place Order'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="border-amber-200 sticky top-8">
              <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200">
                <CardTitle className="text-amber-900">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4 mb-6 pb-6 border-b border-amber-200">
                  {orderItems.map((item) => (
                    <div key={`${item.productId}-${item.variantId}`}>
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <div className="flex-1">
                          <p className="font-medium text-amber-900 text-sm">{item.productName}</p>
                          <Badge className="bg-amber-100 text-amber-800 text-xs mt-1">{item.variantSize}</Badge>
                        </div>
                        <span className="text-sm font-semibold text-amber-900">x{item.quantity}</span>
                      </div>
                      <p className="text-right text-sm text-amber-700">₹{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 pb-6 border-b border-amber-200">
                  <div className="flex justify-between text-amber-700 text-sm">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-amber-700 text-sm">
                    <span>Tax (18% GST)</span>
                    <span>₹{tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-amber-700 text-sm">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-bold text-amber-900">Total</span>
                  <span className="font-bold text-amber-900 text-xl">₹{total.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </main>
)
}
