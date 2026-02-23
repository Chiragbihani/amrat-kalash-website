'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { Menu, ShoppingCart, LogOut, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useEffect, useState, useCallback } from 'react'

/* ---------------- AUTH MENU ---------------- */

function AuthMenu() {
  const router = useRouter()
  const { user, isAuthenticated, logout } = useAuth()

  const handleLogout = useCallback(async () => {
    await logout()
    router.replace('/')
  }, [logout, router])

  if (!isAuthenticated) {
    return (
      <Link href="/auth">
        <Button className="bg-amber-600 hover:bg-amber-700 hidden sm:inline-flex">
          Login
        </Button>
      </Link>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="border-amber-300 text-amber-600 hover:bg-amber-50 gap-2 bg-transparent"
        >
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
              <Link href="/customer/orders">My Orders</Link>
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
  )
}

/* ---------------- HEADER ---------------- */

export function Header() {
  const { isAuthenticated, user } = useAuth()
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const readCart = () => {
      try {
        const cart = JSON.parse(localStorage.getItem('amrat_cart') || '[]')
        return Array.isArray(cart)
          ? cart.reduce((sum, i) => sum + (i.quantity || 0), 0)
          : 0
      } catch {
        return 0
      }
    }

    setCartCount(readCart())

    const handler = () => setCartCount(readCart())
    window.addEventListener('amrat_cart_updated', handler)

    return () => window.removeEventListener('amrat_cart_updated', handler)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-amber-200 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold">
            AK
          </div>
          <div>
            <h1 className="font-bold text-xl text-amber-900">Amrat Kalash</h1>
            <p className="text-xs text-amber-700">Premium Oils</p>
          </div>
        </Link>

        <nav className="hidden md:flex gap-8">
          {['Home', 'Products', 'About', 'Contact'].map((item) => (
            <Link
              key={item}
              href={`/${item === 'Home' ? '' : item.toLowerCase()}`}
              className="text-amber-900 hover:text-amber-600 text-sm font-medium"
            >
              {item}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {isAuthenticated && user?.role === 'customer' && (
            <Link href="/customer/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="w-5 h-5 text-amber-900" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 px-2 py-0.5 text-xs font-bold text-white bg-red-600 rounded-full">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
          )}

          <AuthMenu />

          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="w-5 h-5 text-amber-900" />
          </Button>
        </div>
      </div>
    </header>
  )
}