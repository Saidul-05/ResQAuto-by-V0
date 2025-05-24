import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth"
import { auth, db } from "@/lib/firebase/config"
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore"
import type { User, LoginCredentials, RegisterData, AuthResponse } from "@/types/user"
import { safeLocalStorage } from "@/lib/safe-local-storage"
import { signInWithGoogle, signInWithFacebook } from "./social-auth"

// Default provider to Firebase
const DEFAULT_PROVIDER = "firebase"

// Simulate token storage
let currentUser: User | null = null
let authToken: string | null = null

export function getBackendProvider(): "firebase" | "supabase" {
  const provider = safeLocalStorage?.getItem("backendProvider") || DEFAULT_PROVIDER
  return provider as "firebase" | "supabase"
}

export function setBackendProvider(provider: "firebase" | "supabase"): void {
  safeLocalStorage?.setItem("backendProvider", provider)
}

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      // Email/password login
      const userCredential = await signInWithEmailAndPassword(auth, credentials.email, credentials.password)

      // Fetch user data from Firestore
      const userDoc = await getDoc(doc(db, "users", userCredential.user.uid))

      if (!userDoc.exists()) {
        // This shouldn't happen under normal circumstances
        return { success: false, error: "User data not found" }
      }

      const userData = userDoc.data() as User

      // Store authentication token
      authToken = await userCredential.user.getIdToken()

      if (credentials.rememberMe) {
        safeLocalStorage?.setItem("authToken", authToken)
      }

      return { success: true, user: userData }
    } catch (error: any) {
      console.error("Login error:", error)
      return {
        success: false,
        error: error.message || "Invalid credentials",
      }
    }
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    try {
      // Create user with email/password
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password)

      // Update display name
      await updateProfile(userCredential.user, {
        displayName: `${data.firstName} ${data.lastName}`,
      })

      // Create user document in Firestore
      const newUser: User = {
        id: userCredential.user.uid,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        role: data.role || "customer",
        membershipPlan: "basic",
        memberSince: new Date().toISOString().split("T")[0],
        photoURL: userCredential.user.photoURL || "",
      }

      await setDoc(doc(db, "users", userCredential.user.uid), newUser)

      // Store authentication token
      authToken = await userCredential.user.getIdToken()
      currentUser = newUser

      return { success: true, user: newUser }
    } catch (error: any) {
      console.error("Registration error:", error)
      return {
        success: false,
        error: error.message || "Registration failed",
      }
    }
  },

  logout: async (): Promise<void> => {
    await signOut(auth)
    authToken = null
    currentUser = null
    safeLocalStorage?.removeItem("authToken")
  },

  getCurrentUser: async (): Promise<User | null> => {
    return new Promise((resolve) => {
      const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
        unsubscribe()

        if (firebaseUser) {
          try {
            const userDoc = await getDoc(doc(db, "users", firebaseUser.uid))

            if (userDoc.exists()) {
              currentUser = userDoc.data() as User
              resolve(currentUser)
            } else {
              // User exists in Auth but not in Firestore (rare case)
              resolve(null)
            }
          } catch (error) {
            console.error("Error fetching user data:", error)
            resolve(null)
          }
        } else {
          resolve(null)
        }
      })
    })
  },

  updateUser: async (userId: string, userData: Partial<User>): Promise<boolean> => {
    try {
      await updateDoc(doc(db, "users", userId), userData)
      return true
    } catch (error) {
      console.error("Update user error:", error)
      return false
    }
  },

  resetPassword: async (email: string): Promise<boolean> => {
    try {
      await sendPasswordResetEmail(auth, email)
      return true
    } catch (error) {
      console.error("Reset password error:", error)
      return false
    }
  },

  // Social authentication methods
  signInWithGoogle,
  signInWithFacebook,
}
