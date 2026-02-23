'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { Menu, ShoppingCart, LogOut, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useEffect, useState } from 'react'

export function Header() {
  const { user, isAuthenticated, logout } = useAuth()
  const router = useRouter()
  const [cartCount, setCartCount] = useState(0)

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  useEffect(() => {
    // initialize cart count from localStorage
    try {
      const cart = JSON.parse(localStorage.getItem('amrat_cart') || '[]')
      const count = Array.isArray(cart) ? cart.reduce((s: number, i: any) => s + (i.quantity || 0), 0) : 0
      setCartCount(count)
    } catch {
      setCartCount(0)
    }

    const handler = (e: any) => {
      try {
        if (e?.detail && typeof e.detail.count === 'number') return setCartCount(e.detail.count)
      } catch {}
      try {
        const cart = JSON.parse(localStorage.getItem('amrat_cart') || '[]')
        const count = Array.isArray(cart) ? cart.reduce((s: number, i: any) => s + (i.quantity || 0), 0) : 0
        setCartCount(count)
      } catch {
        setCartCount(0)
      }
    }

    window.addEventListener('amrat_cart_updated', handler)
    return () => window.removeEventListener('amrat_cart_updated', handler)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-amber-200 bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
            AK
          </div>
          <div>
            <h1 className="font-bold text-xl text-amber-900">Amrat Kalash</h1>
            <p className="text-xs text-amber-700">Premium Oils</p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-amber-900 hover:text-amber-600 font-medium text-sm">
            Home
          </Link>
          <Link href="/products" className="text-amber-900 hover:text-amber-600 font-medium text-sm">
            Products
          </Link>
          <Link href="/about" className="text-amber-900 hover:text-amber-600 font-medium text-sm">
            About
          </Link>
          <Link href="/contact" className="text-amber-900 hover:text-amber-600 font-medium text-sm">
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          {isAuthenticated && user?.role === 'customer' && (
            <Link href="/customer/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="w-5 h-5 text-amber-900" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full">{cartCount}</span>
                )}
              </Button>
            </Link>
          )}

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-amber-300 text-amber-600 hover:bg-amber-50 gap-2 bg-transparent">
                  <User className="w-4 h-4" />
                  {user?.name}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 border-amber-200">
                <div className="px-2 py-1.5">
                  <p className="text-xs font-semibold text-amber-900">{user?.email}</p>
                  <p className="text-xs text-amber-700">({user?.role})</p>
                </div>
                <DropdownMenuSeparator className="bg-amber-200" />
                
                {user?.role === 'customer' && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/customer/orders">View My Orders</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-amber-200" />
                  </>
                )}

                {user?.role === 'admin' && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/admin/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-amber-200" />
                  </>
                )}

                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/auth">
              <Button className="bg-amber-600 hover:bg-amber-700 hidden sm:inline-flex">
                Login
              </Button>
            </Link>
          )}

          <div className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="w-5 h-5 text-amber-900" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
