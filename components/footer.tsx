import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-[#33382D] text-amber-50 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4 text-amber-100">Amrat Kalash</h3>
            <p className="text-sm text-white leading-relaxed">
              Premium quality oils for health-conscious families since decades.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-amber-100 mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="hover:text-amber-300 transition">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-300 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-300 transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-amber-100 mb-4">Products</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-amber-300 transition cursor-pointer">Mustard Oil</li>
              <li className="hover:text-amber-300 transition cursor-pointer">Groundnut Oil</li>
              <li className="hover:text-amber-300 transition cursor-pointer">Palm Oil</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-amber-100 mb-4">Contact Info</h4>
            <div className="space-y-3 text-sm">
              <div className="flex gap-2 items-start">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <p>Manufacturing & Sales Office</p>
              </div>
              <div className="flex gap-2 items-center">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <p>+91-8955040478</p>
              </div>
              <div className="flex gap-2 items-center">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <p>amrishaagros@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-amber-100">
          <p>&copy; 2024 Amrat Kalash. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-amber-300 transition">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-amber-300 transition">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
