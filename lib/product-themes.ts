export type ProductType = 'groundnut' | 'soyabean' | 'doubleFilterGroundnut' | 'cottonseed' | 'mustard' | 'palm'

export interface ProductTheme {
  primary: string
  secondary: string
  accent: string
  bgGradient: string
  cardBg: string
  textPrimary: string
  textSecondary: string
  borderColor: string
  buttonBg: string
  buttonHover: string
}

export const productThemes: Record<ProductType, ProductTheme> = {
  groundnut: {
    primary: '#B97316',           // warm brown-gold
    secondary: '#E8B04B',         // warm golden-amber
    accent: '#D97706',            // warm amber
    bgGradient: 'from-amber-50 to-amber-100',
    cardBg: 'bg-amber-50',
    textPrimary: 'text-amber-900',
    textSecondary: 'text-amber-700',
    borderColor: 'border-amber-300',
    buttonBg: 'bg-amber-600 hover:bg-amber-700',
    buttonHover: 'hover:bg-amber-100',
  },
  soyabean: {
    primary: '#059669',           // vibrant emerald green
    secondary: '#10B981',         // bright teal-green
    accent: '#16A34A',            // green
    bgGradient: 'from-emerald-50 to-green-50',
    cardBg: 'bg-emerald-50',
    textPrimary: 'text-emerald-900',
    textSecondary: 'text-emerald-700',
    borderColor: 'border-emerald-300',
    buttonBg: 'bg-emerald-600 hover:bg-emerald-700',
    buttonHover: 'hover:bg-emerald-100',
  },
  doubleFilterGroundnut: {
    primary: '#FBBF24',           // bright amber-yellow
    secondary: '#F59E0B',         // amber-orange
    accent: '#FACC15',            // golden yellow
    bgGradient: 'from-amber-50 to-yellow-50',
    cardBg: 'bg-yellow-50',
    textPrimary: 'text-yellow-900',
    textSecondary: 'text-yellow-700',
    borderColor: 'border-yellow-300',
    buttonBg: 'bg-yellow-500 hover:bg-yellow-600',
    buttonHover: 'hover:bg-yellow-100',
  },
  cottonseed: {
    primary: '#6D28D9',           // deep purple
    secondary: '#A78BFA',         // light purple
    accent: '#8B5CF6',            // purple
    bgGradient: 'from-purple-50 to-violet-50',
    cardBg: 'bg-purple-50',
    textPrimary: 'text-purple-900',
    textSecondary: 'text-purple-700',
    borderColor: 'border-purple-300',
    buttonBg: 'bg-purple-600 hover:bg-purple-700',
    buttonHover: 'hover:bg-purple-100',
  },
  mustard: {
    primary: '#F97316',           // vibrant orange
    secondary: '#FB923C',         // light orange
    accent: '#EA580C',            // dark orange
    bgGradient: 'from-orange-50 to-amber-50',
    cardBg: 'bg-orange-50',
    textPrimary: 'text-orange-900',
    textSecondary: 'text-orange-700',
    borderColor: 'border-orange-300',
    buttonBg: 'bg-orange-600 hover:bg-orange-700',
    buttonHover: 'hover:bg-orange-100',
  },
  palm: {
    primary: '#DC2626',           // rich red
    secondary: '#F87171',         // light red
    accent: '#B91C1C',            // dark red
    bgGradient: 'from-red-50 to-rose-50',
    cardBg: 'bg-red-50',
    textPrimary: 'text-red-900',
    textSecondary: 'text-red-700',
    borderColor: 'border-red-300',
    buttonBg: 'bg-red-600 hover:bg-red-700',
    buttonHover: 'hover:bg-red-100',
  },
}

export const getThemeColor = (productType: ProductType, colorKey: keyof ProductTheme): string => {
  return productThemes[productType][colorKey]
}
