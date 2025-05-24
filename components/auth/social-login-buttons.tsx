"use client"

import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

export function SocialLoginButtons() {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [isFacebookLoading, setIsFacebookLoading] = useState(false)
  const { authService } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true)
    try {
      const result = await authService.signInWithGoogle()

      if (result.success && result.user) {
        toast({
          title: "Login successful",
          description: `Welcome ${result.user.firstName}!`,
        })

        // Redirect based on role
        switch (result.user.role) {
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
      } else {
        toast({
          title: "Login failed",
          description: result.error || "Could not sign in with Google",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error signing in with Google:", error)
      toast({
        title: "Login error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsGoogleLoading(false)
    }
  }

  const handleFacebookSignIn = async () => {
    setIsFacebookLoading(true)
    try {
      const result = await authService.signInWithFacebook()

      if (result.success && result.user) {
        toast({
          title: "Login successful",
          description: `Welcome ${result.user.firstName}!`,
        })

        // Redirect based on role
        switch (result.user.role) {
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
      } else {
        toast({
          title: "Login failed",
          description: result.error || "Could not sign in with Facebook",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error signing in with Facebook:", error)
      toast({
        title: "Login error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsFacebookLoading(false)
    }
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      <Button
        variant="outline"
        onClick={handleGoogleSignIn}
        disabled={isGoogleLoading || isFacebookLoading}
        className="w-full"
      >
        {isGoogleLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
        )}
        Google
      </Button>

      <Button
        variant="outline"
        onClick={handleFacebookSignIn}
        disabled={isGoogleLoading || isFacebookLoading}
        className="w-full"
      >
        {isFacebookLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <svg className="mr-2 h-4 w-4" fill="#1877F2" viewBox="0 0 24 24">
            <path d="M12.001 2.002c-5.522 0-9.999 4.477-9.999 9.999 0 4.99 3.656 9.126 8.437 9.879v-6.988h-2.54v-2.891h2.54V9.798c0-2.508 1.493-3.891 3.776-3.891 1.094 0 2.24.195 2.24.195v2.459h-1.264c-1.24 0-1.628.772-1.628 1.563v1.875h2.771l-.443 2.891h-2.328v6.988C18.344 21.129 22 16.992 22 12.001c0-5.522-4.477-9.999-9.999-9.999z" />
          </svg>
        )}
        Facebook
      </Button>
    </div>
  )
}
