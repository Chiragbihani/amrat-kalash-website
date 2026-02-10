'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { authenticateUser, getUserById, createUser } from './db'

export interface AuthUser {
  id: string
  email: string
  name: string
  role: 'customer' | 'admin'
}

interface AuthContextType {
  user: AuthUser | null
  loading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  register: (email: string, password: string, name: string, role: 'customer' | 'admin') => Promise<boolean>
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  // Check if user is already logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('amrat_user')
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)
      } catch {
        localStorage.removeItem('amrat_user')
      }
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    const authUser = authenticateUser(email, password)
    if (authUser) {
      const userData: AuthUser = {
        id: authUser.id,
        email: authUser.email,
        name: authUser.name,
        role: authUser.role,
      }
      setUser(userData)
      localStorage.setItem('amrat_user', JSON.stringify(userData))
      return true
    }
    return false
  }

  const register = async (email: string, password: string, name: string, role: 'customer' | 'admin') => {
    try {
      const newUser = createUser({
        email,
        password,
        name,
        role,
      })
      const userData: AuthUser = {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
      }
      setUser(userData)
      localStorage.setItem('amrat_user', JSON.stringify(userData))
      return true
    } catch {
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('amrat_user')
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
