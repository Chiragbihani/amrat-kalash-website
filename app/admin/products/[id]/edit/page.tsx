'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { getProductById, updateProduct, deleteProduct, updatePrice, updateStock } from '@/lib/db'
import type { Product } from '@/lib/db'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'
import { ArrowLeft, Save, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default function EditProductPage() {
  const { user, isAuthenticated } = useAuth()
  const params = useParams()
  const router = useRouter()
  const productId = params.id as string

  const [editData, setEditData] = useState<Product | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [loading, setLoading] = useState(true)

  if (!isAuthenticated || user?.role !== 'admin') {
    redirect('/auth')
  }

  useEffect(() => {
    const p = getProductById(productId)
    setEditData(p)
    setLoading(false)
  }, [productId])

  const product = getProductById(productId)

  if (!product) {
    return (
      <main className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 mb-4">Product not found</p>
            <Link href="/admin/dashboard">
              <Button className="bg-amber-600">Back to Dashboard</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  setEditData(product)

  const handleBasicUpdate = async () => {
    setIsSaving(true)
    try {
      updateProduct(productId, {
        name: editData.name,
        description: editData.description,
        ingredients: editData.ingredients,
        benefits: editData.benefits,
        usage: editData.usage,
      })
      toast.success('Product updated successfully')
    } catch (error) {
      toast.error('Failed to update product')
    } finally {
      setIsSaving(false)
    }
  }

  const handlePriceUpdate = (variantId: string, newPrice: number) => {
    try {
      updatePrice(productId, variantId, newPrice)
      const updatedProduct = getProductById(productId)
      if (updatedProduct) setEditData(updatedProduct)
      toast.success('Price updated')
    } catch (error) {
      toast.error('Failed to update price')
    }
  }

  const handleStockUpdate = (variantId: string, newStock: number) => {
    try {
      updateStock(productId, variantId, newStock)
      const updatedProduct = getProductById(productId)
      if (updatedProduct) setEditData(updatedProduct)
      toast.success('Stock updated')
    } catch (error) {
      toast.error('Failed to update stock')
    }
  }

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      deleteProduct(productId)
      toast.success('Product deleted')
      router.push('/admin/dashboard')
    }
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <Link href="/admin/dashboard" className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
          </div>

          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="pricing">Pricing & Stock</TabsTrigger>
              <TabsTrigger value="danger">Danger Zone</TabsTrigger>
            </TabsList>

            {/* Basic Info Tab */}
            <TabsContent value="basic">
              <Card className="border-amber-200">
                <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200">
                  <CardTitle className="text-amber-900">Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Product Name</label>
                    <Input
                      type="text"
                      value={editData?.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      className="border-gray-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Description</label>
                    <textarea
                      value={editData?.description}
                      onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      rows={4}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Ingredients (comma-separated)</label>
                    <textarea
                      value={editData?.ingredients.join(', ')}
                      onChange={(e) => setEditData({ ...editData, ingredients: e.target.value.split(',').map(i => i.trim()) })}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Benefits (comma-separated)</label>
                    <textarea
                      value={editData?.benefits.join(', ')}
                      onChange={(e) => setEditData({ ...editData, benefits: e.target.value.split(',').map(b => b.trim()) })}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Usage Instructions</label>
                    <textarea
                      value={editData?.usage}
                      onChange={(e) => setEditData({ ...editData, usage: e.target.value })}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      rows={4}
                    />
                  </div>

                  <Button onClick={handleBasicUpdate} disabled={isSaving} className="bg-green-600 hover:bg-green-700 w-full">
                    <Save className="w-4 h-4 mr-2" />
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Pricing & Stock Tab */}
            <TabsContent value="pricing">
              <Card className="border-amber-200">
                <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200">
                  <CardTitle className="text-amber-900">Variants - Price & Stock</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {editData?.variants.map((variant: any) => (
                      <Card key={variant.id} className="border-gray-200">
                        <CardContent className="p-4">
                          <h3 className="font-semibold text-gray-900 mb-4">{variant.size}</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                              <Input
                                type="number"
                                value={variant.price}
                                onChange={(e) => handlePriceUpdate(variant.id, parseInt(e.target.value) || 0)}
                                className="border-gray-300"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Stock (units)</label>
                              <Input
                                type="number"
                                value={variant.stock}
                                onChange={(e) => handleStockUpdate(variant.id, parseInt(e.target.value) || 0)}
                                className="border-gray-300"
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Danger Zone Tab */}
            <TabsContent value="danger">
              <Card className="border-red-200 bg-red-50">
                <CardHeader className="border-b border-red-300">
                  <CardTitle className="text-red-900">Danger Zone</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-red-800 mb-6">Deleting a product is permanent and cannot be undone. All associated data will be lost.</p>
                  <Button onClick={handleDelete} variant="destructive" className="w-full">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Product
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </main>
  )
}
