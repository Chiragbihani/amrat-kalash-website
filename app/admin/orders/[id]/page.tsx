'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { getOrderById, updateOrderStatus, sendEmail } from '@/lib/db-client'
import type { Order } from '@/lib/db-client'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { ArrowLeft, CheckCircle, Truck, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default function ManageOrderPage() {
  const params = useParams()
  const router = useRouter()
  const orderId = params.id as string

  const { user, loading: authLoading } = useAuth()


  useEffect(() => {
    if (loading) return

    if (!user) {
      router.replace('/auth')
      return
    }

    if (user.role !== 'admin') {
      router.replace('/')
    }
  }, [user, authLoading, router])


  const [order, setOrder] = useState<Order | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user || user.role !== 'admin') return

    const o = getOrderById(orderId)
    setOrder(o)
    setLoading(false)
  }, [orderId, user])


  if (!order) {
    return (
      <main className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">Order not found</p>
            <Link href="/admin/dashboard">
              <Button className="bg-amber-600">Back to Dashboard</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  const handleStatusUpdate = async (newStatus: 'pending' | 'confirmed' | 'delivered' | 'cancelled') => {
    setIsUpdating(true)
    try {
      const updatedOrder = updateOrderStatus(orderId, newStatus, newStatus === 'delivered' ? new Date() : undefined)
      if (updatedOrder) {
        setOrder(updatedOrder)

        // Send customer notification email
        sendEmail({
          to: order.customerEmail,
          subject: `Order Status Update - ${orderId}`,
          type: 'customer_order_status_update',
          data: {
            customerName: order.customerName,
            orderId: order.id,
            status: newStatus,
            totalAmount: order.totalAmount,
          },
        })

        toast.success(`Order status updated to ${newStatus}`)
      }
    } catch (error) {
      toast.error('Failed to update order status')
    } finally {
      setIsUpdating(false)
    }
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

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <Link href="/admin/dashboard?tab=orders" className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Orders
            </Link>
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
                <p className="text-gray-600 mt-1">{orderId}</p>
              </div>
              <Badge className={getStatusBadgeColor(order.status)}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Customer Information */}
              <Card className="border-amber-200">
                <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200">
                  <CardTitle className="text-amber-900">Customer Information</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Name</p>
                      <p className="font-semibold text-gray-900">{order.customerName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-semibold text-gray-900">{order.customerEmail}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-semibold text-gray-900">{order.address.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Payment Method</p>
                      <p className="font-semibold text-gray-900">{order.paymentMethod.toUpperCase()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Delivery Address */}
              <Card className="border-amber-200">
                <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200">
                  <CardTitle className="text-amber-900">Delivery Address</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="font-semibold text-gray-900 mb-2">{order.address.street}</p>
                  <p className="text-gray-600">{order.address.city}</p>
                  <p className="text-gray-600">{order.address.state} {order.address.pincode}</p>
                </CardContent>
              </Card>

              {/* Order Items */}
              <Card className="border-amber-200">
                <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200">
                  <CardTitle className="text-amber-900">Order Items</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="pb-4 border-b border-gray-200 last:border-0 last:pb-0">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-semibold text-gray-900">{item.productName}</p>
                            <p className="text-sm text-gray-600">{item.variantSize}</p>
                          </div>
                          <p className="font-semibold text-gray-900">₹{item.price}</p>
                        </div>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        <p className="text-sm font-medium text-gray-900">Subtotal: ₹{item.subtotal.toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar - Status Management */}
            <div className="space-y-6">
              {/* Status Update Card */}
              <Card className="border-purple-200 sticky top-8">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-200">
                  <CardTitle className="text-purple-900">Update Status</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <Button
                      onClick={() => handleStatusUpdate('pending')}
                      disabled={isUpdating || order.status === 'pending'}
                      variant={order.status === 'pending' ? 'default' : 'outline'}
                      className="w-full justify-start"
                    >
                      <AlertCircle className="w-4 h-4 mr-2" />
                      Pending
                    </Button>

                    <Button
                      onClick={() => handleStatusUpdate('confirmed')}
                      disabled={isUpdating || order.status === 'confirmed' || order.status === 'cancelled'}
                      variant={order.status === 'confirmed' ? 'default' : 'outline'}
                      className="w-full justify-start"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Confirm Order
                    </Button>

                    <Button
                      onClick={() => handleStatusUpdate('delivered')}
                      disabled={isUpdating || order.status === 'delivered' || order.status === 'cancelled'}
                      variant={order.status === 'delivered' ? 'default' : 'outline'}
                      className="w-full justify-start bg-green-600 hover:bg-green-700 border-green-600 text-white"
                    >
                      <Truck className="w-4 h-4 mr-2" />
                      Mark Delivered
                    </Button>

                    <Button
                      onClick={() => handleStatusUpdate('cancelled')}
                      disabled={isUpdating || order.status === 'cancelled' || order.status === 'delivered'}
                      variant="destructive"
                      className="w-full justify-start"
                    >
                      Cancel Order
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Order Total */}
              <Card className="border-amber-200">
                <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200">
                  <CardTitle className="text-amber-900">Order Total</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3 text-center">
                    <p className="text-sm text-gray-600">Total Amount</p>
                    <p className="text-3xl font-bold text-amber-900">₹{order.totalAmount.toFixed(2)}</p>
                    <p className="text-xs text-gray-600 pt-3 border-t border-gray-200">
                      Payment Method: {order.paymentMethod.toUpperCase()}
                    </p>
                    <p className="text-xs text-gray-600">
                      Ordered: {new Date(order.createdAt).toLocaleDateString()}
                    </p>
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
