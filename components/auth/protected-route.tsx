"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Loader2 } from "lucide-react"

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: string[]
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading, hasRole } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/login")
    } else if (!isLoading && isAuthenticated && allowedRoles && !hasRole(allowedRoles)) {
      // Redirect to appropriate dashboard if user doesn't have the required role
      router.push("/dashboard")
    }
  }, [isLoading, isAuthenticated, router, allowedRoles, hasRole])

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading...</span>
      </div>
    )
  }

  // If user is authenticated and has correct role, render children
  if (isAuthenticated && (!allowedRoles || hasRole(allowedRoles))) {
    return <>{children}</>
  }

  // This should not be visible due to the redirects in useEffect
  return null
}
