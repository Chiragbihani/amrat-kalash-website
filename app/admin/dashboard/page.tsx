'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { getProducts, getOrders } from '@/lib/db'
import type { Product, Order } from '@/lib/db'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { BoxIcon, ShoppingCart, Package, TrendingUp, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default function AdminDashboard() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')
  const [products, setProducts] = useState<Product[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  if (!isAuthenticated || user?.role !== 'admin') {
    redirect('/auth')
  }

  useEffect(() => {
    const p = getProducts()
    const o = getOrders()
    setProducts(p)
    setOrders(o)
    setLoading(false)
  }, [])

  // Calculate statistics
  const totalProducts = products.length
  const totalVariants = products.reduce((sum, p) => sum + p.variants.length, 0)
  const totalStock = products.reduce((sum, p) => sum + p.variants.reduce((vsum, v) => vsum + v.stock, 0), 0)
  const totalOrders = orders.length
  const pendingOrders = orders.filter(o => o.status === 'pending').length
  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0)

  // Low stock items
  const lowStockItems = products.flatMap((p) =>
    p.variants.filter(v => v.stock < 10).map(v => ({ product: p, variant: v }))
  )

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 bg-gray-50">
        {/* Admin Header */}
        <div className="bg-white border-b border-gray-200 py-6">
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage products, inventory, and orders</p>
            </div>
            <Link href="/admin/emails">
              <Button variant="outline" className="border-amber-300 text-amber-600 hover:bg-amber-50 bg-transparent">
                View Email Log
              </Button>
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="border-amber-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total Products</p>
                    <p className="text-3xl font-bold text-amber-900">{totalProducts}</p>
                  </div>
                  <Package className="w-10 h-10 text-amber-600 opacity-20" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total Variants</p>
                    <p className="text-3xl font-bold text-blue-900">{totalVariants}</p>
                  </div>
                  <BoxIcon className="w-10 h-10 text-blue-600 opacity-20" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total Stock</p>
                    <p className="text-3xl font-bold text-green-900">{totalStock}</p>
                  </div>
                  <TrendingUp className="w-10 h-10 text-green-600 opacity-20" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
                    <p className="text-3xl font-bold text-purple-900">₹{totalRevenue.toFixed(0)}</p>
                  </div>
                  <ShoppingCart className="w-10 h-10 text-purple-600 opacity-20" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="inventory">Inventory</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Low Stock Alert */}
              {lowStockItems.length > 0 && (
                <Card className="border-orange-300 bg-orange-50">
                  <CardHeader className="border-b border-orange-300">
                    <CardTitle className="flex items-center gap-2 text-orange-900">
                      <AlertCircle className="w-5 h-5" />
                      Low Stock Alert
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      {lowStockItems.map((item) => (
                        <div key={`${item.product.id}-${item.variant.id}`} className="flex justify-between items-center">
                          <div>
                            <p className="font-medium text-orange-900">{item.product.name} - {item.variant.size}</p>
                            <p className="text-sm text-orange-700">Current stock: {item.variant.stock}</p>
                          </div>
                          <Link href={`/admin/products/${item.product.id}/edit`}>
                            <Button size="sm" variant="outline" className="border-orange-300 text-orange-600 bg-transparent">
                              Update Stock
                            </Button>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Orders Summary */}
              <Card className="border-amber-200">
                <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200">
                  <CardTitle className="text-amber-900">Recent Orders</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {orders.length === 0 ? (
                    <p className="text-gray-600">No orders yet</p>
                  ) : (
                    <div className="space-y-3">
                      {orders.slice(0, 5).map((order) => (
                        <div key={order.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">{order.id}</p>
                            <p className="text-sm text-gray-600">{order.customerName}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">₹{order.totalAmount.toFixed(2)}</p>
                            <Badge className={order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}>
                              {order.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <Link href="/admin/dashboard?tab=orders" className="block mt-4">
                    <Button className="w-full bg-amber-600 hover:bg-amber-700">View All Orders</Button>
                  </Link>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Products Tab */}
            <TabsContent value="products">
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Products Management</h2>
                  <Link href="/admin/products/new">
                    <Button className="bg-green-600 hover:bg-green-700">Add New Product</Button>
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {products.map((product) => (
                    <Card key={product.id} className="border-amber-200">
                      <CardContent className="p-4">
                        <h3 className="font-bold text-amber-900 mb-2">{product.name}</h3>
                        <p className="text-xs text-gray-600 mb-4">{product.description}</p>
                        
                        <div className="mb-4">
                          <p className="text-xs font-semibold text-gray-700 mb-2">Variants:</p>
                          <div className="space-y-1">
                            {product.variants.map((v) => (
                              <div key={v.id} className="text-xs text-gray-600 flex justify-between">
                                <span>{v.size}</span>
                                <span>₹{v.price} ({v.stock} stock)</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Link href={`/admin/products/${product.id}/edit`} className="flex-1">
                            <Button size="sm" variant="outline" className="w-full border-amber-300 text-amber-600 bg-transparent">
                              Edit
                            </Button>
                          </Link>
                          <Link href={`/admin/products/${product.id}/delete`} className="flex-1">
                            <Button size="sm" variant="destructive" className="w-full">
                              Delete
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Inventory Tab */}
            <TabsContent value="inventory">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Inventory Management</h2>

                {products.map((product) => {
                  // Calculate units sold for each variant
                  const variantSalesMap = new Map<string, number>()
                  orders.forEach(order => {
                    order.items.forEach(item => {
                      if (item.productName === product.name) {
                        const key = `${item.productName}-${item.variantSize}`
                        variantSalesMap.set(key, (variantSalesMap.get(key) || 0) + item.quantity)
                      }
                    })
                  })

                  return (
                    <Card key={product.id} className="border-amber-200">
                      <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200">
                        <CardTitle className="text-amber-900">{product.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          {product.variants.map((variant) => {
                            const unitsSold = variantSalesMap.get(`${product.name}-${variant.size}`) || 0
                            return (
                              <Card key={variant.id} className="border-gray-200">
                                <CardContent className="p-4">
                                  <p className="font-semibold text-gray-900 mb-2">{variant.size}</p>
                                  <p className="text-sm text-gray-600 mb-1">Price: ₹{variant.price}</p>
                                  <p className="text-sm text-gray-600 mb-1">Stock: {variant.stock}</p>
                                  <p className="text-sm font-semibold text-green-600 mb-3">Units Sold: {unitsSold}</p>
                                  <Link href={`/admin/products/${product.id}/edit`}>
                                    <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                                      Update Stock/Price
                                    </Button>
                                  </Link>
                                </CardContent>
                              </Card>
                            )
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Orders Management</h2>

                {orders.length === 0 ? (
                  <Card className="border-gray-200">
                    <CardContent className="p-12 text-center">
                      <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">No orders found</p>
                    </CardContent>
                  </Card>
                ) : (
                  orders.map((order) => (
                    <Card key={order.id} className="border-amber-200">
                      <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-amber-900">{order.id}</CardTitle>
                            <p className="text-sm text-amber-700 mt-1">{order.customerName} ({order.customerEmail})</p>
                          </div>
                          <Badge className={order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-3">Order Items</h3>
                            <div className="space-y-2">
                              {order.items.map((item, idx) => (
                                <div key={idx} className="text-sm text-gray-600">
                                  <p>{item.productName} ({item.variantSize})</p>
                                  <p className="text-gray-500">Qty: {item.quantity} × ₹{item.price} = ₹{item.subtotal.toFixed(2)}</p>
                                </div>
                              ))}
                            </div>
                            <p className="font-semibold text-gray-900 mt-4 text-lg">Total: ₹{order.totalAmount.toFixed(2)}</p>
                          </div>

                          <div>
                            <h3 className="font-semibold text-gray-900 mb-3">Delivery Address</h3>
                            <div className="text-sm text-gray-600 space-y-1 mb-4">
                              <p>{order.address.street}</p>
                              <p>{order.address.city}, {order.address.state} {order.address.pincode}</p>
                              <p>Phone: {order.address.phone}</p>
                            </div>

                            <Link href={`/admin/orders/${order.id}`}>
                              <Button className="w-full bg-amber-600 hover:bg-amber-700">
                                Manage Order
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </main>
  )
}
