'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ProductInfoPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to products page
    router.push('/products')
  }, [router])

  return null
}
