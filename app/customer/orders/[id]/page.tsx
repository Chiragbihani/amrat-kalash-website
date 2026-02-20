'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { getOrderById } from '@/lib/db-client'
import type { Order } from '@/lib/db-client'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, ArrowRight, Package } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default function OrderConfirmationPage() {
  const { user, isAuthenticated } = useAuth()
  const params = useParams()
  const orderId = params.id as string
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  if (!isAuthenticated || user?.role !== 'customer') {
    redirect('/auth')
  }

  useEffect(() => {
    const o = getOrderById(orderId)
    setOrder(o)
    setLoading(false)
  }, [orderId])

  if (loading) {
    return (
      <main className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mb-4"></div>
            <p className="text-amber-700">Loading order details...</p>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  if (!order) {
    return (
      <main className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <Card className="border-amber-200 max-w-md">
            <CardContent className="p-8 text-center">
              <p className="text-amber-700 mb-6">Order not found</p>
              <Link href="/customer/shop">
                <Button className="bg-amber-600 hover:bg-amber-700">Back to Shop</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 bg-gradient-to-br from-green-50 to-amber-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* Success Banner */}
          <div className="text-center mb-12">
            <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-amber-900 mb-2">Order Confirmed!</h1>
            <p className="text-amber-700 text-lg">Thank you for your purchase</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Order Number */}
              <Card className="border-green-200 bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-amber-700 mb-1">Order Number</p>
                      <p className="text-2xl font-bold text-amber-900">{order.id}</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800 text-sm px-4 py-1">
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Items */}
              <Card className="border-amber-200">
                <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200">
                  <CardTitle className="text-amber-900 flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Order Items
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="pb-4 border-b border-amber-100 last:border-0 last:pb-0">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-semibold text-amber-900">{item.productName}</p>
                            <Badge className="bg-amber-100 text-amber-800 text-xs mt-1">{item.variantSize}</Badge>
                          </div>
                          <span className="text-amber-700">Qty: {item.quantity}</span>
                        </div>
                        <p className="text-right text-amber-900 font-semibold">₹{((item.subtotal || item.price * item.quantity) || 0).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Delivery Address */}
              <Card className="border-amber-200">
                <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200">
                  <CardTitle className="text-amber-900">Delivery Address</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-amber-900 font-medium">{order.address.street}</p>
                  <p className="text-amber-700">{order.address.city}, {order.address.state} {order.address.pincode}</p>
                  <p className="text-amber-700 mt-2">Phone: {order.address.phone}</p>
                </CardContent>
              </Card>

              {/* Payment Information */}
              <Card className="border-blue-200 bg-blue-50">
                <CardHeader className="border-b border-blue-200">
                  <CardTitle className="text-blue-900">Payment Method</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-blue-900 font-semibold">Cash on Delivery (COD)</p>
                  <p className="text-blue-700 text-sm mt-2">Please pay ₹{order.totalAmount.toFixed(2)} when the order is delivered</p>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary Sidebar */}
            <div>
              <Card className="border-amber-200 sticky top-8">
                <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200">
                  <CardTitle className="text-amber-900">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3 mb-6 pb-6 border-b border-amber-200">
                    <div className="flex justify-between text-amber-700 text-sm">
                      <span>Subtotal</span>
                      <span>₹{(order.totalAmount / 1.18).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-amber-700 text-sm">
                      <span>Tax (18% GST)</span>
                      <span>₹{((order.totalAmount / 1.18) * 0.18).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-amber-700 text-sm">
                      <span>Shipping</span>
                      <span>Free</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mb-6">
                    <span className="font-bold text-amber-900">Total Amount</span>
                    <span className="font-bold text-amber-900 text-xl">₹{order.totalAmount.toFixed(2)}</span>
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm text-amber-700 bg-amber-50 p-3 rounded">
                      A confirmation email has been sent to {order.customerEmail}
                    </p>
                    
                    <Link href="/products" className="block">
                      <Button variant="outline" className="w-full border-amber-300 text-amber-600 hover:bg-amber-50 bg-transparent">
                        Continue Shopping
                      </Button>
                    </Link>

                    <Link href="/customer/shop" className="block">
                      <Button className="w-full bg-amber-600 hover:bg-amber-700">
                        <ArrowRight className="w-4 h-4 mr-2" />
                        Go to Dashboard
                      </Button>
                    </Link>
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
