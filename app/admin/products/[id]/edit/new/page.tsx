'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { createProduct } from '@/lib/db-client'
import type { Product } from '@/lib/db-client'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'

export default function NewProductPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    ingredients: '',
    benefits: '',
    usage: '',
    price: '',
    stock: ''
  })

  useEffect(() => {
    if (authLoading) return

    if (!user) {
      router.replace('/auth')
      return
    }

    if (user.role !== 'admin') {
      router.replace('/')
      return
    }

    setLoading(false)
  }, [authLoading, user, router])

  if (loading) return null

  const handleSubmit = () => {
    if (!formData.name || !formData.price) {
      toast.error('Please fill required fields')
      return
    }

    setIsSaving(true)

    const newProduct: Product = {
      id: crypto.randomUUID(),
      name: formData.name,
      description: formData.description,
      image: formData.image,
      type: 'mustard',
      ingredients: formData.ingredients.split(',').map(i => i.trim()),
      benefits: formData.benefits.split(',').map(b => b.trim()),
      usage: formData.usage,
      variants: [
        {
          id: crypto.randomUUID(),
          size: 'Default',
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock) || 0
        }
      ],
      createdAt: new Date()
    }

    createProduct(newProduct)

    toast.success('Product created successfully')
    router.push('/admin/dashboard')
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 bg-gray-50 py-10">
        <div className="max-w-3xl mx-auto px-4">
          <Card>
            <CardHeader>
              <CardTitle>Add New Product</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">

              <Input
                placeholder="Product Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />

              <Input
                placeholder="Image URL"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              />

              <textarea
                placeholder="Description"
                className="w-full border rounded p-2"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />

              <textarea
                placeholder="Ingredients (comma separated)"
                className="w-full border rounded p-2"
                value={formData.ingredients}
                onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
              />

              <textarea
                placeholder="Benefits (comma separated)"
                className="w-full border rounded p-2"
                value={formData.benefits}
                onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
              />

              <textarea
                placeholder="Usage Instructions"
                className="w-full border rounded p-2"
                value={formData.usage}
                onChange={(e) => setFormData({ ...formData, usage: e.target.value })}
              />

              <Input
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />

              <Input
                type="number"
                placeholder="Stock"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              />

              <Button
                onClick={handleSubmit}
                disabled={isSaving}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                {isSaving ? 'Saving...' : 'Create Product'}
              </Button>

            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </main>
  )
}
