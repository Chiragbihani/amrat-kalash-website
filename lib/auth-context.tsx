'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { getUserByEmail, createUser } from './db-client'

export interface AuthUser {
  id: string
  email: string
  name: string
  role: 'customer' | 'admin'
}

export type AuthLoginResult = 'success' | 'invalid_credentials' | 'user_not_found'
export type AuthRegisterResult = 'success' | 'email_already_registered' | 'error'

interface AuthContextType {
  user: AuthUser | null
  loading: boolean
  login: (email: string, password: string) => Promise<AuthLoginResult>
  logout: () => void
  register: (
    email: string,
    password: string,
    name: string,
    role: 'customer' | 'admin'
  ) => Promise<AuthRegisterResult>
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
    const existingUser = getUserByEmail(email)

    if (!existingUser) {
      return 'user_not_found'
    }

    if (existingUser.password !== password) {
      return 'invalid_credentials'
    }

    const userData: AuthUser = {
      id: existingUser.id,
      email: existingUser.email,
      name: existingUser.name,
      role: existingUser.role,
    }

    setUser(userData)

    if (typeof window !== 'undefined') {
      localStorage.setItem('amrat_user', JSON.stringify(userData))
    }

    return 'success'
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

      return 'success'
    } catch (error: any) {
      if (error?.message === 'EMAIL_ALREADY_REGISTERED') {
        return 'email_already_registered'
      }
      return 'error'
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
