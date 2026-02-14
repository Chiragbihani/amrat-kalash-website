export type ProductType = 'groundnut' | 'soybean' | 'sunflower' | 'cottonseed' | 'mustard'

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
    primary: '#FACC15',           // golden yellow
    secondary: '#1E40AF',         // deep blue
    accent: '#F59E0B',            // amber
    bgGradient: 'from-yellow-50 to-blue-50',
    cardBg: 'bg-yellow-50',
    textPrimary: 'text-yellow-900',
    textSecondary: 'text-yellow-700',
    borderColor: 'border-yellow-300',
    buttonBg: 'bg-yellow-500 hover:bg-yellow-600',
    buttonHover: 'hover:bg-yellow-100',
  },
  soybean: {
    primary: '#166534',           // forest green
    secondary: '#22C55E',         // bright green
    accent: '#16A34A',            // green
    bgGradient: 'from-green-50 to-emerald-50',
    cardBg: 'bg-green-50',
    textPrimary: 'text-green-900',
    textSecondary: 'text-green-700',
    borderColor: 'border-green-300',
    buttonBg: 'bg-green-600 hover:bg-green-700',
    buttonHover: 'hover:bg-green-100',
  },
  sunflower: {
    primary: '#EAB308',           // sunny yellow
    secondary: '#FBBF24',         // bright amber
    accent: '#F59E0B',            // amber
    bgGradient: 'from-yellow-50 to-amber-50',
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
}

export const getThemeColor = (productType: ProductType, colorKey: keyof ProductTheme): string => {
  return productThemes[productType][colorKey]
}
