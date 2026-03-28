// Mock database with local storage persistence

export interface ProductVariant {
  id: string
  size: string // '250ml', '1L', '5L', '10L'
  price: number
  stock: number
}

export interface Product {
  id: string
  name: string
  type: 'mustard' | 'groundnut' | 'doubleFilterGroundnut' | 'soyabean' | 'cottonseed' | 'palm'
  description: string
  image: string
  ingredients: string[]
  benefits: string[]
  usage: string
  videoUrl?: string
  variants: ProductVariant[]
  createdAt: Date
}

export interface User {
  id: string
  email: string
  password: string
  role: 'customer' | 'admin'
  name: string
  createdAt: Date
}

export interface OrderItem {
  productId: string
  productName: string
  variantSize: string
  quantity: number
  price: number
  subtotal: number
}

export interface Order {
  id: string
  customerId: string
  customerEmail: string
  customerName: string
  items: OrderItem[]
  totalAmount: number
  address: {
    street: string
    city: string
    state: string
    pincode: string
    phone: string
  }
  status: 'pending' | 'confirmed' | 'delivered' | 'cancelled'
  paymentMethod: 'cod'
  createdAt: Date
  deliveredAt?: Date
}

// Check if we're in browser environment
const isBrowser = () => typeof window !== 'undefined'

// Get default database structure (used on server)
const getDefaultDB = () => {
  const mockProducts: Product[] = [
    {
      id: 'mustard-1',
      name: 'Premium Mustard Oil',
      type: 'mustard',
      description: 'Pure cold-pressed mustard oil with traditional pungent flavor and authentic taste',
      image: '/Mustard_Oil.png',
      ingredients: ['100% Pure Mustard Seeds', 'No Additives', 'No Preservatives'],
      benefits: [
        'Rich in Omega-3 fatty acids',
        'Promotes heart health',
        'Anti-inflammatory properties',
        'Aids digestion',
        'Improves blood circulation',
      ],
      usage: 'Perfect for Indian curries, tempering, and traditional cooking. Also used for massage therapy.',
      videoUrl: '/mustard-oil.mp4',
      variants: [
        { id: 'mustard-250ml', size: '250ml', price: 120, stock: 50 },
        { id: 'mustard-1l', size: '1L', price: 380, stock: 100 },
        { id: 'mustard-5l', size: '5L', price: 1800, stock: 30 },
        { id: 'mustard-10l', size: '10L', price: 3200, stock: 15 },
      ],
      createdAt: new Date(),
    },
    {
      id: 'groundnut-1',
      name: 'Pure Groundnut Oil',
      type: 'groundnut',
      description: 'Light and aromatic groundnut oil with a subtle nutty flavor, ideal for all cuisines',
      image: '/Refined_Groundnut_oil.png',
      ingredients: ['100% Pure Groundnut (Peanut)', 'Cold Pressed', 'No Chemicals'],
      benefits: [
        'Rich in vitamin E',
        'High in antioxidants',
        'Supports healthy cholesterol',
        'Good for skin health',
        'Versatile cooking oil',
      ],
      usage: 'Suitable for deep frying, shallow frying, and salad dressings. Works with all types of cuisines.',
      videoUrl: '/video1.mp4',
      variants: [
        { id: 'groundnut-250ml', size: '250ml', price: 110, stock: 60 },
        { id: 'groundnut-1l', size: '1L', price: 350, stock: 120 },
        { id: 'groundnut-5l', size: '5L', price: 1650, stock: 40 },
        { id: 'groundnut-10l', size: '10L', price: 3000, stock: 20 },
      ],
      createdAt: new Date(),
    },
    {
      id: 'doubleFilterGroundnut-1',
      name: 'Double Filter Groundnut Oil',
      type: 'doubleFilterGroundnut',
      description: 'Premium double filtered groundnut oil with rich aroma',
      image: '/Double_filter_Groundnut_oil.png',
      ingredients: ['100% Pure Groundnut (Peanut)', 'Double Filtered', 'No Chemicals'],

      benefits: [
        'Low in saturated fat',
        'Rich in linoleic acid',
        'Supports heart health',
        'Good for skin',
        'Light and easy to digest',
      ],
      usage: 'Ideal for everyday cooking, baking, and light stir-frying. Suitable for health-conscious families.',
      videoUrl: '/double-filter-groundnut-oil.mp4',
      variants: [
        { id: 'double-filter-groundnut-250ml', size: '250ml', price: 100, stock: 75 },
        { id: 'double-filter-groundnut-1l', size: '1L', price: 320, stock: 150 },
        { id: 'double-filter-groundnut-5l', size: '5L', price: 1500, stock: 50 },
        { id: 'double-filter-groundnut-10l', size: '10L', price: 2800, stock: 25 },
      ],
      createdAt: new Date(),
    },
    {
      id: 'soyabean-1',
      name: 'Soyabean Oil',
      type: 'soyabean',
      description: 'Pure soyabean oil with balanced nutrition, great for both cooking and health',
      image: '/Soyabean_oil.png',
      ingredients: ['100% Pure Soyabean', 'No GMO', 'Naturally Extracted'],
      benefits: [
        'Rich in polyunsaturated fats',
        'Contains omega-3 fatty acids',
        'Supports brain health',
        'Good cholesterol management',
        'High in vitamin E',
      ],
      usage: 'Excellent for cooking, baking, and dressings. Recommended for health-conscious consumers.',
      videoUrl: '/soyabean-oil.mp4',
      variants: [
        { id: 'soyabean-250ml', size: '250ml', price: 105, stock: 55 },
        { id: 'soyabean-1l', size: '1L', price: 340, stock: 110 },
        { id: 'soyabean-5l', size: '5L', price: 1600, stock: 35 },
        { id: 'soyabean-10l', size: '10L', price: 2900, stock: 18 },
      ],
      createdAt: new Date(),
    },
    {
      id: 'cottonseed-1',
      name: 'Refined Cotton Seed Oil',
      type: 'cottonseed',
      description: 'Premium refined cotton seed oil with excellent cooking properties and light texture',
      image: '/Refined_Cotton_Seed_Oil.png',
      ingredients: ['100% Pure Cotton Seeds', 'Refined & Purified', 'High Smoke Point'],
      benefits: [
        'Rich in antioxidants',
        'High smoke point for cooking',
        'Light and neutral flavor',
        'Good for deep frying',
        'Supports cardiovascular health',
      ],
      usage: 'Perfect for deep frying, baking, and industrial cooking. Suitable for high-temperature cooking.',
      videoUrl: 'https://example.com/videos/cottonseed-oil.mp4',
      variants: [
        { id: 'cottonseed-250ml', size: '250ml', price: 115, stock: 45 },
        { id: 'cottonseed-1l', size: '1L', price: 360, stock: 100 },
        { id: 'cottonseed-5l', size: '5L', price: 1700, stock: 38 },
        { id: 'cottonseed-10l', size: '10L', price: 3100, stock: 16 },
      ],
      createdAt: new Date(),
    },
    {
      id: 'palm-1',
      name: 'Refined Palm Oil',
      type: 'palm',
      description: 'Sustainable refined palm oil with rich golden color and smooth texture',
      image: '/Refined_Palm_oil.png',
      ingredients: ['100% Pure Palm Fruit', 'Sustainably Sourced', 'Naturally Golden'],
      benefits: [
        'Rich in beta-carotene',
        'Promotes healthy cholesterol levels',
        'Good for skin and hair',
        'Natural source of vitamin E',
        'Suitable for all cuisines',
      ],
      usage: 'Excellent for cooking, frying, and baking. Works well with traditional and modern cuisines.',
      videoUrl: 'https://example.com/videos/palm-oil.mp4',
      variants: [
        { id: 'palm-250ml', size: '250ml', price: 125, stock: 40 },
        { id: 'palm-1l', size: '1L', price: 370, stock: 95 },
        { id: 'palm-5l', size: '5L', price: 1750, stock: 32 },
        { id: 'palm-10l', size: '10L', price: 3200, stock: 14 },
      ],
      createdAt: new Date(),
    },
  ]

  const mockUsers: User[] = [
    {
      id: 'admin-1',
      email: 'amrishaagros@gmail.com',
      password: 'amratkalash123',
      role: 'admin',
      name: 'Admin User',
      createdAt: new Date(),
    },
    {
      id: 'customer-1',
      email: 'customer@example.com',
      password: 'customer123',
      role: 'customer',
      name: 'John Doe',
      createdAt: new Date(),
    },
  ]

  return {
    products: mockProducts,
    users: mockUsers,
    orders: [] as Order[],
    emails: [] as any[], // Mock email storage
  }
}

// Initialize database with mock data
const initializeDB = () => {
  if (!isBrowser()) return getDefaultDB()
  
  const existing = localStorage.getItem('amrat_db')
  if (existing) {
    try {
      const parsed = JSON.parse(existing)
      // Normalize any legacy product type keys (migration)
      let changed = false
      if (Array.isArray(parsed.products)) {
        parsed.products.forEach((p: any) => {
          if (p && p.type === 'dfgroundnut') {
            p.type = 'doubleFilterGroundnut'
            changed = true
          }
        })
      }
      if (changed) {
        localStorage.setItem('amrat_db', JSON.stringify(parsed))
      }
      return parsed
    } catch {
      return getDefaultDB()
    }
  }

  const db = getDefaultDB()
  localStorage.setItem('amrat_db', JSON.stringify(db))
  return db
}

// Get the database
export const getDB = () => {
  try {
    if (!isBrowser()) return getDefaultDB()
    const db = localStorage.getItem('amrat_db')
    if (!db) return initializeDB()
    return JSON.parse(db)
  } catch {
    return initializeDB()
  }
}

// Save the database
export const saveDB = (db: any) => {
  if (!isBrowser()) return
  localStorage.setItem('amrat_db', JSON.stringify(db))
}

// Product operations
export const getProducts = () => {
  const db = getDB()
  return db.products.map((product: any) => ({
    ...product,
    createdAt: new Date(product.createdAt)
  })) as Product[]
}

export const getProductById = (id: string) => {
  const db = getDB()
  return db.products.find((p: Product) => p.id === id)
}

export const updateProduct = (id: string, updates: Partial<Product>) => {
  const db = getDB()
  const index = db.products.findIndex((p: Product) => p.id === id)
  if (index !== -1) {
    db.products[index] = { ...db.products[index], ...updates }
    saveDB(db)
    return db.products[index]
  }
  return null
}

export const addProduct = (product: Omit<Product, 'createdAt'>) => {
  const db = getDB()
  const newProduct = { ...product, createdAt: new Date() }
  db.products.push(newProduct)
  saveDB(db)
  return newProduct
}

export const deleteProduct = (id: string) => {
  const db = getDB()
  db.products = db.products.filter((p: Product) => p.id !== id)
  saveDB(db)
}

// Stock operations
export const updateStock = (productId: string, variantId: string, newStock: number) => {
  const db = getDB()
  const product = db.products.find((p: Product) => p.id === productId)
  if (product) {
    const variant = product.variants.find((v: ProductVariant) => v.id === variantId)
    if (variant) {
      variant.stock = newStock
      saveDB(db)
      return variant
    }
  }
  return null
}

export const getVariant = (productId: string, variantId: string) => {
  const product = getProductById(productId)
  if (product) {
    return product.variants.find((v: ProductVariant) => v.id === variantId)
  }
  return null
}

// Price operations
export const updatePrice = (productId: string, variantId: string, newPrice: number) => {
  const db = getDB()
  const product = db.products.find((p: Product) => p.id === productId)
  if (product) {
    const variant = product.variants.find((v: ProductVariant) => v.id === variantId)
    if (variant) {
      variant.price = newPrice
      saveDB(db)
      return variant
    }
  }
  return null
}

// User operations
export const getUserByEmail = (email: string) => {
  const db = getDB()
  const user = db.users.find((u: User) => u.email === email)
  return user || null
}

export const authenticateUser = (email: string, password: string) => {
  const db = getDB()
  const user = db.users.find((u: User) => u.email === email && u.password === password)
  return user || null
}

export const getUserById = (id: string) => {
  const db = getDB()
  const user = db.users.find((u: User) => u.id === id)
  if (!user) return undefined
  return {
    ...user,
    createdAt: new Date(user.createdAt)
  } as User
}

export const createUser = (user: Omit<User, 'id' | 'createdAt'>) => {
  const db = getDB()
  const existing = db.users.find((u: User) => u.email === user.email)
  if (existing) {
    throw new Error('EMAIL_ALREADY_REGISTERED')
  }

  const newUser = { ...user, id: `user-${Date.now()}`, createdAt: new Date() }
  db.users.push(newUser)
  saveDB(db)
  return newUser
}

// Order operations
export const getOrders = () => {
  const db = getDB()
  return db.orders.map((order: any) => ({
    ...order,
    createdAt: new Date(order.createdAt),
    deliveredAt: order.deliveredAt ? new Date(order.deliveredAt) : undefined
  })) as Order[]
}

export const getOrderById = (id: string) => {
  const db = getDB()
  const order = db.orders.find((o: Order) => o.id === id)
  if (!order) return undefined
  return {
    ...order,
    createdAt: new Date(order.createdAt),
    deliveredAt: order.deliveredAt ? new Date(order.deliveredAt) : undefined
  } as Order
}

export const getCustomerOrders = (customerId: string) => {
  const db = getDB()
  return db.orders
    .filter((o: Order) => o.customerId === customerId)
    .map((order: any) => ({
      ...order,
      createdAt: new Date(order.createdAt),
      deliveredAt: order.deliveredAt ? new Date(order.deliveredAt) : undefined
    })) as Order[]
}

export const createOrder = (order: Omit<Order, 'id' | 'createdAt'>) => {
  const db = getDB()
  const newOrder = {
    ...order,
    id: `order-${Date.now()}`,
    createdAt: new Date(),
  }
  // Deduct stock for each ordered item (match by productId + variant size)
  try {
    newOrder.items.forEach((item) => {
      const product = db.products.find((p: Product) => p.id === item.productId)
      if (!product) return

      // Prefer matching by variant size (OrderItem.variantSize), fall back to id if provided
      let variant = product.variants.find((v: ProductVariant) => v.size === item.variantSize)
      if (!variant && (item as any).variantId) {
        variant = product.variants.find((v: ProductVariant) => v.id === (item as any).variantId)
      }

      if (variant) {
        variant.stock = Math.max(0, variant.stock - item.quantity)
      }
    })
  } catch (e) {
    // ignore stock update errors and still create order
    console.error('Stock update error during order creation', e)
  }

  db.orders.push(newOrder)
  saveDB(db)
  return newOrder
}

export const updateOrderStatus = (orderId: string, status: Order['status'], deliveredAt?: Date) => {
  const db = getDB()
  const order = db.orders.find((o: Order) => o.id === orderId)
  if (order) {
    order.status = status
    if (deliveredAt) order.deliveredAt = deliveredAt
    saveDB(db)
    return order
  }
  return null
}

// Email operations (mock)
export const sendEmail = (email: any) => {
  const db = getDB()
  db.emails.push({
    ...email,
    deliveryMode: email.deliveryMode ?? 'log-only',
    sentAt: new Date(),
  })
  saveDB(db)
  console.log('Email logged locally (not delivered to an inbox):', email)
}

export const getEmails = () => {
  const db = getDB()
  return db.emails
}
