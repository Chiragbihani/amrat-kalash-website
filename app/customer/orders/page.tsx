'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { getCustomerOrders, getProductById } from '@/lib/db-client'
import type { Order } from '@/lib/db-client'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ShoppingCart, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function CustomerOrdersPage() {
  const { user, isAuthenticated, loading: authLoading } = useAuth()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  // Check authentication
  useEffect(() => {
    if (authLoading) return

    if (!isAuthenticated || user?.role !== 'customer') {
      router.push('/auth')
      return
    }

    if (user?.id) {
      const customerOrders = getCustomerOrders(user.id)
      setOrders(customerOrders)
    }
    setLoading(false)
  }, [authLoading, isAuthenticated, user, router])

  if (authLoading || loading || !isAuthenticated) {
    return (
      <main className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mb-4"></div>
            <p className="text-amber-700">Loading your orders...</p>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'confirmed':
        return 'bg-blue-100 text-blue-800'
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getProductImage = (productId: string, productName: string) => {
    const product = getProductById(productId)
    if (product?.image) {
      return product.image
    }

    const normalizedName = productName.toLowerCase()
    if (normalizedName.includes('double filter') && normalizedName.includes('groundnut')) return '/Double_Filter_Groundnut_Oil.png'
    if (normalizedName.includes('soyabean') || normalizedName.includes('soyabean')) return '/Soyabean_Oil.png'
    if (normalizedName.includes('groundnut') || normalizedName.includes('peanut')) return '/Refined_Groundnut_Oil.png'
    if (normalizedName.includes('palm')) return '/Refined_Palm_Oil.png'
    if (normalizedName.includes('cotton')) return '/Refined_Cotton_Seed_Oil.png'
    if (normalizedName.includes('mustard') || normalizedName.includes('sarso')) return '/Mustard_Oil.png'
    return '/placeholder.jpg'
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 bg-amber-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-amber-900">My Orders</h1>
            <p className="text-amber-700 mt-2">Track and manage your orders</p>
          </div>

          {orders.length === 0 ? (
            <Card className="border-amber-200">
              <CardContent className="p-12 text-center">
                <ShoppingCart className="w-12 h-12 text-amber-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-amber-900 mb-2">No Orders Yet</h2>
                <p className="text-amber-700 mb-6">You haven't placed any orders yet. Start shopping now!</p>
                <Link href="/products">
                  <Button className="bg-amber-600 hover:bg-amber-700">
                    Continue Shopping
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {orders.map((order) => (
                <Card key={order.id} className="border-amber-200 hover:border-amber-400 transition-colors">
                  <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-amber-900">Order {order.id}</CardTitle>
                        <p className="text-sm text-amber-700 mt-1">
                          Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                      <Badge className={getStatusBadgeColor(order.status)}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Items Summary */}
                      <div>
                        <h3 className="font-semibold text-amber-900 mb-3">Items</h3>
                        <div className="space-y-2">
                          {order.items.slice(0, 2).map((item, idx) => (
                            <div key={idx} className="flex items-start gap-3 text-sm text-amber-800">
                              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md border border-amber-200 bg-white">
                                <img
                                  src={getProductImage(item.productId, item.productName)}
                                  alt={item.productName}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="min-w-0">
                                <p className="font-medium leading-tight">{item.productName}</p>
                              <p className="text-amber-700">
                                {item.quantity}x ₹{item.price.toFixed(2)} ({item.variantSize})
                              </p>
                              </div>
                            </div>
                          ))}
                          {order.items.length > 2 && (
                            <p className="text-sm text-amber-700">+{order.items.length - 2} more items</p>
                          )}
                        </div>
                      </div>

                      {/* Delivery Address */}
                      <div>
                        <h3 className="font-semibold text-amber-900 mb-3">Delivery To</h3>
                        <div className="text-sm text-amber-800 space-y-1">
                          <p>{order.address.street}</p>
                          <p>{order.address.city}, {order.address.state} {order.address.pincode}</p>
                          <p className="text-amber-700">Phone: {order.address.phone}</p>
                        </div>
                      </div>

                      {/* Total and Action */}
                      <div className="flex flex-col justify-between">
                        <div>
                          <h3 className="font-semibold text-amber-900 mb-1">Total Amount</h3>
                          <p className="text-2xl font-bold text-amber-900">₹{order.totalAmount.toFixed(2)}</p>
                          <p className="text-xs text-amber-700 mt-1">Cash on Delivery</p>
                        </div>
                        <Link href={`/customer/orders/${order.id}`}>
                          <Button className="w-full bg-amber-600 hover:bg-amber-700 mt-4">
                            View Details
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}
