'use client'

import React from "react"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'
import { Droplets } from 'lucide-react'
import Link from 'next/link'

export default function AuthPage() {
  const router = useRouter()
  const { login, register } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')
  const [userType, setUserType] = useState<'customer' | 'admin'>('customer')

  // Login form state
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  // Register form state
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [registerName, setRegisterName] = useState('')
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!loginEmail || !loginPassword) {
      toast.error('Please fill in all fields')
      return
    }

    setIsLoading(true)
    try {
      const result = await login(loginEmail, loginPassword)

      if (result === 'success') {
        toast.success('Logged in successfully!')

        const user = JSON.parse(localStorage.getItem('amrat_user') || '{}')

        if (user?.role === 'admin') {
          router.replace('/admin/dashboard')
        } else {
          router.replace('/customer/shop')
        }
        return
      }

      if (result === 'user_not_found') {
        toast.error('Email not registered. Please sign up first.')
      } else if (result === 'invalid_credentials') {
        toast.error('Invalid email or password')
      } else {
        toast.error('Login failed')
      }
    } catch (error) {
      toast.error('Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!registerEmail || !registerPassword || !registerName) {
      toast.error('Please fill in all fields')
      return
    }

    if (registerPassword !== registerConfirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    if (registerPassword.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }

    setIsLoading(true)
    try {
      const result = await register(registerEmail, registerPassword, registerName, userType)
      if (result === 'success') {
        toast.success('Account created successfully!')
        if (userType === 'admin') {
          router.push('/admin/dashboard')
        } else {
          router.push('/customer/shop')
        }
        return
      }

      if (result === 'email_already_registered') {
        toast.error('Email is already registered. Please login instead.')
      } else {
        toast.error('Registration failed')
      }
    } catch (error) {
      toast.error('Registration failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Droplets className="w-8 h-8 text-[#33382D]" />
            <span className="text-3xl font-bold text-[#33382D]">Amrat Kalash</span>
          </div>
          <p className="text-[#404437]">Premium Quality Oils</p>
        </div>

        <Card className="border-[#757871]/20 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-100">
            <CardTitle className="text-amber-900">Welcome</CardTitle>
            <CardDescription>Login or create a new account</CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            <Tabs defaultValue="login" value={authMode} onValueChange={(v) => setAuthMode(v as 'login' | 'register')} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>

              {/* Login Tab */}
              <TabsContent value="login" className="space-y-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-amber-900">Email</label>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="border-amber-200 focus-visible:ring-amber-600"
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-amber-900">Password</label>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="border-amber-200 focus-visible:ring-amber-600"
                      disabled={isLoading}
                    />

                  </div>

                  <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Login'}
                  </Button>
                </form>
              </TabsContent>

              {/* Register Tab */}
              <TabsContent value="register" className="space-y-4">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-amber-900">Full Name</label>
                    <Input
                      type="text"
                      placeholder="Enter your full name"
                      value={registerName}
                      onChange={(e) => setRegisterName(e.target.value)}
                      className="border-amber-200 focus-visible:ring-amber-600"
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-amber-900">Email</label>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      className="border-amber-200 focus-visible:ring-amber-600"
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-amber-900">I am a</label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          value="customer"
                          checked={userType === 'customer'}
                          onChange={(e) => setUserType(e.target.value as 'customer' | 'admin')}
                          disabled={isLoading}
                        />
                        <span className="text-sm text-amber-900">Customer</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          value="admin"
                          checked={userType === 'admin'}
                          onChange={(e) => setUserType(e.target.value as 'customer' | 'admin')}
                          disabled={isLoading}
                        />
                        <span className="text-sm text-amber-900">Admin</span>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-amber-900">Password</label>
                    <Input
                      type="password"
                      placeholder="Enter a password (min. 6 characters)"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      className="border-amber-200 focus-visible:ring-amber-600"
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-amber-900">Confirm Password</label>
                    <Input
                      type="password"
                      placeholder="Confirm your password"
                      value={registerConfirmPassword}
                      onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                      className="border-amber-200 focus-visible:ring-amber-600"
                      disabled={isLoading}
                    />
                  </div>

                  <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700" disabled={isLoading}>
                    {isLoading ? 'Creating account...' : 'Create Account'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 pt-6 border-t border-amber-100">
              <Link href="/">
                <Button variant="outline" className="w-full border-amber-200 text-amber-600 hover:bg-amber-50 bg-transparent">
                  Back to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
