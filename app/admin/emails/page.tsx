'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth-context'
import { getEmails } from '@/lib/db-client'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Mail, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { redirect, useRouter } from 'next/navigation'

export default function EmailsPage() {
  const [emails, setEmails] = useState<Email[]>([])


  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (loading) return

    if (!user) {
      router.replace('/auth')
      return
    }

    if (user.role !== 'admin') {
      router.replace('/')
    }
  }, [user, loading, router])


  useEffect(() => {
    if (!user || user.role !== 'admin') return

    const e = getEmails()
    setEmails(e)
  }, [user])


  const customerEmails = emails.filter(e => e.type?.includes('customer'))
  const adminEmails = emails.filter(e => e.type?.includes('admin'))

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <Link href="/admin/dashboard" className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Email Notifications Log</h1>
            <p className="text-gray-600 mt-1">View all customer and admin notifications</p>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="all">All ({emails.length})</TabsTrigger>
              <TabsTrigger value="customer">Customer ({customerEmails.length})</TabsTrigger>
              <TabsTrigger value="admin">Admin ({adminEmails.length})</TabsTrigger>
            </TabsList>

            {/* All Emails */}
            <TabsContent value="all" className="space-y-4">
              {emails.length === 0 ? (
                <Card className="border-gray-200">
                  <CardContent className="p-12 text-center">
                    <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No emails sent yet</p>
                  </CardContent>
                </Card>
              ) : (
                emails.map((email, idx) => (
                  <Card key={idx} className="border-gray-200 hover:shadow-md transition-shadow">
                    <CardHeader className="border-b border-gray-200">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <CardTitle className="text-gray-900">{email.subject}</CardTitle>
                            <Badge className={email.type?.includes('customer') ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}>
                              {email.type?.includes('customer') ? 'Customer' : 'Admin'}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">To: {email.to}</p>
                        </div>
                        <p className="text-xs text-gray-500">{new Date(email.sentAt).toLocaleString()}</p>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700 max-h-64 overflow-y-auto">
                        <pre className="whitespace-pre-wrap font-mono text-xs">
                          {JSON.stringify(email.data, null, 2)}
                        </pre>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>

            {/* Customer Emails */}
            <TabsContent value="customer" className="space-y-4">
              {customerEmails.length === 0 ? (
                <Card className="border-gray-200">
                  <CardContent className="p-12 text-center">
                    <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No customer emails sent yet</p>
                  </CardContent>
                </Card>
              ) : (
                customerEmails.map((email, idx) => (
                  <Card key={idx} className="border-blue-200">
                    <CardHeader className="border-b border-blue-200">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <CardTitle className="text-gray-900 text-lg mb-1">{email.subject}</CardTitle>
                          <p className="text-sm text-gray-600">To: {email.to}</p>
                        </div>
                        <p className="text-xs text-gray-500">{new Date(email.sentAt).toLocaleString()}</p>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm font-semibold text-gray-900 mb-2">Email Content:</p>
                          <div className="bg-blue-50 p-4 rounded-lg text-sm text-gray-700">
                            {email.data?.customerName && (
                              <p className="mb-2"><strong>Customer:</strong> {email.data.customerName}</p>
                            )}
                            {email.data?.orderId && (
                              <p className="mb-2"><strong>Order ID:</strong> {email.data.orderId}</p>
                            )}
                            {email.data?.status && (
                              <p className="mb-2"><strong>Status:</strong> {email.data.status}</p>
                            )}
                            {email.data?.totalAmount && (
                              <p className="mb-2"><strong>Amount:</strong> ₹{email.data.totalAmount.toFixed(2)}</p>
                            )}
                            {email.data?.items && (
                              <div>
                                <strong>Items:</strong>
                                <ul className="ml-4 mt-1">
                                  {email.data.items.map((item, i) => (
                                    <li key={i}>{item.productName} ({item.variantSize}) x {item.quantity}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>

            {/* Admin Emails */}
            <TabsContent value="admin" className="space-y-4">
              {adminEmails.length === 0 ? (
                <Card className="border-gray-200">
                  <CardContent className="p-12 text-center">
                    <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No admin emails sent yet</p>
                  </CardContent>
                </Card>
              ) : (
                adminEmails.map((email, idx) => (
                  <Card key={idx} className="border-purple-200">
                    <CardHeader className="border-b border-purple-200">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <CardTitle className="text-gray-900 text-lg mb-1">{email.subject}</CardTitle>
                          <p className="text-sm text-gray-600">To: {email.to}</p>
                        </div>
                        <p className="text-xs text-gray-500">{new Date(email.sentAt).toLocaleString()}</p>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm font-semibold text-gray-900 mb-2">Email Content:</p>
                          <div className="bg-purple-50 p-4 rounded-lg text-sm text-gray-700">
                            {email.data?.orderId && (
                              <p className="mb-2"><strong>Order ID:</strong> {email.data.orderId}</p>
                            )}
                            {email.data?.customerName && (
                              <p className="mb-2"><strong>Customer:</strong> {email.data.customerName}</p>
                            )}
                            {email.data?.customerEmail && (
                              <p className="mb-2"><strong>Email:</strong> {email.data.customerEmail}</p>
                            )}
                            {email.data?.customerPhone && (
                              <p className="mb-2"><strong>Phone:</strong> {email.data.customerPhone}</p>
                            )}
                            {email.data?.totalAmount && (
                              <p className="mb-2"><strong>Total Amount:</strong> ₹{email.data.totalAmount.toFixed(2)}</p>
                            )}
                            {email.data?.items && (
                              <div>
                                <strong>Items:</strong>
                                <ul className="ml-4 mt-1">
                                  {email.data.items.map((item, i) => (
                                    <li key={i}>{item.productName} ({item.variantSize}) x {item.quantity} = ₹{item.subtotal.toFixed(2)}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {email.data?.address && (
                              <div className="mt-2">
                                <strong>Address:</strong>
                                <p className="ml-4 mt-1">
                                  {email.data.address.street}, {email.data.address.city}, {email.data.address.state} {email.data.address.pincode}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </main>
  )
}
