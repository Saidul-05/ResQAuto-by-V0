"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import type { User, LoginCredentials, RegisterData, AuthResponse } from "@/types/user"
import { authService, getBackendProvider, setBackendProvider as setBackendProviderFn } from "./auth/auth-service"

type AuthContextType = {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (credentials: LoginCredentials) => Promise<AuthResponse>
  signup: (data: RegisterData) => Promise<AuthResponse>
  logout: () => Promise<void>
  hasRole: (role: string | string[]) => boolean
  updateUser: (userData: Partial<User>) => Promise<boolean>
  backendProvider: "firebase" | "supabase"
  setBackendProvider: (provider: "firebase" | "supabase") => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [backendProvider, setBackendProviderState] = useState<"firebase" | "supabase">(getBackendProvider())
  const router = useRouter()
  const { toast } = useToast()

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await authService.getCurrentUser()
        setUser(currentUser)
      } catch (error) {
        console.error("Auth initialization error:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [backendProvider])

  // Redirect based on role
  const redirectToDashboard = (role: string) => {
    switch (role) {
      case "mechanic":
        router.push("/mechanic")
        break
      case "provider":
        router.push("/provider")
        break
      case "admin":
        router.push("/admin")
        break
      default:
        router.push("/dashboard")
    }
  }

  const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    setIsLoading(true)

    try {
      const response = await authService.login(credentials)

      if (response.success && response.user) {
        setUser(response.user)

        toast({
          title: "Login successful",
          description: `Welcome back, ${response.user.firstName}!`,
        })

        // Redirect based on role
        redirectToDashboard(response.user.role)
      }

      return response
    } catch (error: any) {
      console.error("Login error:", error)
      return { success: false, error: "An error occurred during login" }
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (userData: RegisterData): Promise<AuthResponse> => {
    setIsLoading(true)

    try {
      const response = await authService.register(userData)

      if (response.success && response.user) {
        setUser(response.user)

        toast({
          title: "Registration successful",
          description: `Welcome to RoadRescue, ${response.user.firstName}!`,
        })

        // Redirect based on role
        redirectToDashboard(response.user.role)
      }

      return response
    } catch (error: any) {
      console.error("Signup error:", error)
      return { success: false, error: "An error occurred during registration" }
    } finally {
      setIsLoading(false)
    }
  }

  const updateUser = async (userData: Partial<User>): Promise<boolean> => {
    if (!user) return false

    try {
      const success = await authService.updateUser(user.id, userData)

      if (success) {
        setUser({ ...user, ...userData })

        toast({
          title: "Profile updated",
          description: "Your profile has been updated successfully.",
        })
      }

      return success
    } catch (error) {
      console.error("Update user error:", error)

      toast({
        title: "Update failed",
        description: "Failed to update your profile. Please try again.",
        variant: "destructive",
      })

      return false
    }
  }

  const logout = async () => {
    try {
      await authService.logout()
      setUser(null)

      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      })

      router.push("/")
    } catch (error) {
      console.error("Logout error:", error)

      toast({
        title: "Logout failed",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      })
    }
  }

  const hasRole = (role: string | string[]): boolean => {
    if (!user) return false

    if (Array.isArray(role)) {
      return role.includes(user.role)
    }

    return user.role === role
  }

  const changeBackendProvider = (provider: "firebase" | "supabase") => {
    setBackendProviderFn(provider)
    setBackendProviderState(provider)

    toast({
      title: "Backend provider changed",
      description: `Now using ${provider} as the backend provider.`,
    })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        hasRole,
        updateUser,
        backendProvider,
        setBackendProvider: changeBackendProvider,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  return context
}
