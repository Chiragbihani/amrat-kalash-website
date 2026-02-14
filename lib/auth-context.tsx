'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { authenticateUser, createUser } from './db-client'

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
  register: (
    email: string,
    password: string,
    name: string,
    role: 'customer' | 'admin'
  ) => Promise<boolean>
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [hydrated, setHydrated] = useState(false)

  // Hydration-safe initialization
  useEffect(() => {
    if (typeof window === 'undefined') return

    const storedUser = localStorage.getItem('amrat_user')

    if (storedUser) {
      try {
        const parsedUser: AuthUser = JSON.parse(storedUser)
        setUser(parsedUser)
      } catch {
        localStorage.removeItem('amrat_user')
      }
    }

    setHydrated(true)
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    const authUser = authenticateUser(email, password)

    if (!authUser) return false

    const userData: AuthUser = {
      id: authUser.id,
      email: authUser.email,
      name: authUser.name,
      role: authUser.role,
    }

    setUser(userData)

    if (typeof window !== 'undefined') {
      localStorage.setItem('amrat_user', JSON.stringify(userData))
    }

    return true
  }

  const register = async (
    email: string,
    password: string,
    name: string,
    role: 'customer' | 'admin'
  ) => {
    try {
      const newUser = createUser({ email, password, name, role })

      const userData: AuthUser = {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
      }

      setUser(userData)

      if (typeof window !== 'undefined') {
        localStorage.setItem('amrat_user', JSON.stringify(userData))
      }

      return true
    } catch {
      return false
    }
  }

  const logout = () => {
    setUser(null)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('amrat_user')
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading: !hydrated ? true : loading,
        login,
        logout,
        register,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
