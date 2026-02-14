'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import type { ProductType } from './product-themes'
import { productThemes } from './product-themes'

interface ProductContextType {
  selectedProduct: ProductType | null
  setSelectedProduct: (type: ProductType | null) => void
  theme: typeof productThemes[ProductType] | null
}

const ProductContext = createContext<ProductContextType | undefined>(undefined)

export function ProductProvider({ children }: { children: ReactNode }) {
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>('groundnut')

  const theme = selectedProduct ? productThemes[selectedProduct] : null

  return (
    <ProductContext.Provider value={{ selectedProduct, setSelectedProduct, theme }}>
      {children}
    </ProductContext.Provider>
  )
}

export function useProductTheme() {
  const context = useContext(ProductContext)
  if (context === undefined) {
    throw new Error('useProductTheme must be used within a ProductProvider')
  }
  return context
}
