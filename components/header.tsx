import Link from 'next/link'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Header() {
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

        <div className="md:hidden">
          <Button variant="ghost" size="icon">
            <Menu className="w-5 h-5 text-amber-900" />
          </Button>
        </div>
      </div>
    </header>
  )
}
