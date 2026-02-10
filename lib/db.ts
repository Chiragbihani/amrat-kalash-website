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
  type: 'mustard' | 'groundnut' | 'sunflower' | 'soybean'
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
      image: '/oil-mustard.jpg',
      ingredients: ['100% Pure Mustard Seeds', 'No Additives', 'No Preservatives'],
      benefits: [
        'Rich in Omega-3 fatty acids',
        'Promotes heart health',
        'Anti-inflammatory properties',
        'Aids digestion',
        'Improves blood circulation',
      ],
      usage: 'Perfect for Indian curries, tempering, and traditional cooking. Also used for massage therapy.',
      videoUrl: 'https://example.com/videos/mustard-oil.mp4',
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
      image: '/oil-groundnut.jpg',
      ingredients: ['100% Pure Groundnut (Peanut)', 'Cold Pressed', 'No Chemicals'],
      benefits: [
        'Rich in vitamin E',
        'High in antioxidants',
        'Supports healthy cholesterol',
        'Good for skin health',
        'Versatile cooking oil',
      ],
      usage: 'Suitable for deep frying, shallow frying, and salad dressings. Works with all types of cuisines.',
      videoUrl: 'https://example.com/videos/groundnut-oil.mp4',
      variants: [
        { id: 'groundnut-250ml', size: '250ml', price: 110, stock: 60 },
        { id: 'groundnut-1l', size: '1L', price: 350, stock: 120 },
        { id: 'groundnut-5l', size: '5L', price: 1650, stock: 40 },
        { id: 'groundnut-10l', size: '10L', price: 3000, stock: 20 },
      ],
      createdAt: new Date(),
    },
    {
      id: 'sunflower-1',
      name: 'Sunflower Oil',
      type: 'sunflower',
      description: 'Light, healthy sunflower oil with minimal flavor, perfect for everyday cooking',
      image: '/oil-sunflower.jpg',
      ingredients: ['100% Pure Sunflower Seeds', 'High in Linoleic Acid', 'Natural & Pure'],
      benefits: [
        'Low in saturated fat',
        'Rich in linoleic acid',
        'Supports heart health',
        'Good for skin',
        'Light and easy to digest',
      ],
      usage: 'Ideal for everyday cooking, baking, and light stir-frying. Suitable for health-conscious families.',
      videoUrl: 'https://example.com/videos/sunflower-oil.mp4',
      variants: [
        { id: 'sunflower-250ml', size: '250ml', price: 100, stock: 75 },
        { id: 'sunflower-1l', size: '1L', price: 320, stock: 150 },
        { id: 'sunflower-5l', size: '5L', price: 1500, stock: 50 },
        { id: 'sunflower-10l', size: '10L', price: 2800, stock: 25 },
      ],
      createdAt: new Date(),
    },
    {
      id: 'soybean-1',
      name: 'Soybean Oil',
      type: 'soybean',
      description: 'Pure soybean oil with balanced nutrition, great for both cooking and health',
      image: '/oil-soybean.jpg',
      ingredients: ['100% Pure Soybean', 'No GMO', 'Naturally Extracted'],
      benefits: [
        'Rich in polyunsaturated fats',
        'Contains omega-3 fatty acids',
        'Supports brain health',
        'Good cholesterol management',
        'High in vitamin E',
      ],
      usage: 'Excellent for cooking, baking, and dressings. Recommended for health-conscious consumers.',
      videoUrl: 'https://example.com/videos/soybean-oil.mp4',
      variants: [
        { id: 'soybean-250ml', size: '250ml', price: 105, stock: 55 },
        { id: 'soybean-1l', size: '1L', price: 340, stock: 110 },
        { id: 'soybean-5l', size: '5L', price: 1600, stock: 35 },
        { id: 'soybean-10l', size: '10L', price: 2900, stock: 18 },
      ],
      createdAt: new Date(),
    },
  ]

  const mockUsers: User[] = [
    {
      id: 'admin-1',
      email: 'admin@amratkalash.com',
      password: 'admin123',
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
  if (existing) return JSON.parse(existing)

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
  return db.products as Product[]
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
export const authenticateUser = (email: string, password: string) => {
  const db = getDB()
  const user = db.users.find((u: User) => u.email === email && u.password === password)
  return user || null
}

export const getUserById = (id: string) => {
  const db = getDB()
  return db.users.find((u: User) => u.id === id)
}

export const createUser = (user: Omit<User, 'id' | 'createdAt'>) => {
  const db = getDB()
  const newUser = { ...user, id: `user-${Date.now()}`, createdAt: new Date() }
  db.users.push(newUser)
  saveDB(db)
  return newUser
}

// Order operations
export const getOrders = () => {
  const db = getDB()
  return db.orders as Order[]
}

export const getOrderById = (id: string) => {
  const db = getDB()
  return db.orders.find((o: Order) => o.id === id)
}

export const getCustomerOrders = (customerId: string) => {
  const db = getDB()
  return db.orders.filter((o: Order) => o.customerId === customerId) as Order[]
}

export const createOrder = (order: Omit<Order, 'id' | 'createdAt'>) => {
  const db = getDB()
  const newOrder = {
    ...order,
    id: `order-${Date.now()}`,
    createdAt: new Date(),
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
    sentAt: new Date(),
  })
  saveDB(db)
  console.log('Email sent:', email)
}

export const getEmails = () => {
  const db = getDB()
  return db.emails
}
