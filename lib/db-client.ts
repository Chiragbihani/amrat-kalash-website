'use client'

// This file is client-only and wraps database calls to ensure they only run in the browser

import {
  getDB,
  getProducts as dbGetProducts,
  getProductById as dbGetProductById,
  getOrders as dbGetOrders,
  getOrderById as dbGetOrderById,
  getCustomerOrders as dbGetCustomerOrders,
  createOrder as dbCreateOrder,
  updateOrderStatus as dbUpdateOrderStatus,
  getEmails as dbGetEmails,
  updateStock as dbUpdateStock,
  updatePrice as dbUpdatePrice,
  authenticateUser as dbAuthenticateUser,
  createUser as dbCreateUser,
  sendEmail as dbSendEmail,
  getVariant as dbGetVariant,
  updateProduct as dbUpdateProduct,
  deleteProduct as dbDeleteProduct,
  addProduct as dbAddProduct,
  getUserById as dbGetUserById,
  saveDB,
} from './db'
import type { Product, Order, User, OrderItem } from './db'

// Ensure we're in browser
const ensureBrowser = () => {
  if (typeof window === 'undefined') {
    throw new Error('Database operations can only be performed in the browser')
  }
}

export const getProducts = () => {
  ensureBrowser()
  return dbGetProducts()
}

export const getProductById = (id: string) => {
  ensureBrowser()
  return dbGetProductById(id)
}

export const getOrders = () => {
  ensureBrowser()
  return dbGetOrders()
}

export const getOrderById = (id: string) => {
  ensureBrowser()
  return dbGetOrderById(id)
}

export const getCustomerOrders = (customerId: string) => {
  ensureBrowser()
  return dbGetCustomerOrders(customerId)
}

export const createOrder = (order: Omit<Order, 'id' | 'createdAt'>) => {
  ensureBrowser()
  return dbCreateOrder(order)
}

export const updateOrderStatus = (orderId: string, status: Order['status'], deliveredAt?: Date) => {
  ensureBrowser()
  return dbUpdateOrderStatus(orderId, status, deliveredAt)
}

export const getEmails = () => {
  ensureBrowser()
  return dbGetEmails()
}

export const updateStock = (productId: string, variantId: string, newStock: number) => {
  ensureBrowser()
  return dbUpdateStock(productId, variantId, newStock)
}

export const updatePrice = (productId: string, variantId: string, newPrice: number) => {
  ensureBrowser()
  return dbUpdatePrice(productId, variantId, newPrice)
}

export const authenticateUser = (email: string, password: string) => {
  ensureBrowser()
  return dbAuthenticateUser(email, password)
}

export const createUser = (user: Omit<User, 'id' | 'createdAt'>) => {
  ensureBrowser()
  return dbCreateUser(user)
}

export const sendEmail = (email: any) => {
  ensureBrowser()
  return dbSendEmail(email)
}

export const getVariant = (productId: string, variantId: string) => {
  ensureBrowser()
  return dbGetVariant(productId, variantId)
}

export const updateProduct = (id: string, updates: Partial<Product>) => {
  ensureBrowser()
  return dbUpdateProduct(id, updates)
}

export const deleteProduct = (id: string) => {
  ensureBrowser()
  return dbDeleteProduct(id)
}

export const addProduct = (product: Omit<Product, 'createdAt'>) => {
  ensureBrowser()
  return dbAddProduct(product)
}

export const getUserById = (id: string) => {
  ensureBrowser()
  return dbGetUserById(id)
}

export { saveDB, getDB }
export type { Product, Order, User, OrderItem }

export function createProduct(product: Product) {
  const products = getProducts()
  const updatedProducts = [...products, product]
  localStorage.setItem('products', JSON.stringify(updatedProducts))
}

