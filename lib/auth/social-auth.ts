import { auth, provider as googleProvider, facebookProvider } from "@/lib/firebase/config"
import { signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth"
import { db } from "@/lib/firebase/config"
import { doc, getDoc, setDoc } from "firebase/firestore"
import type { User, AuthResponse } from "@/types/user"

export async function signInWithGoogle(): Promise<AuthResponse> {
  try {
    const result = await signInWithPopup(auth, googleProvider)
    const credential = GoogleAuthProvider.credentialFromResult(result)
    const user = result.user

    // Check if user exists in Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid))

    if (!userDoc.exists()) {
      // If new user, create a record
      const newUser: User = {
        id: user.uid,
        firstName: user.displayName?.split(" ")[0] || "",
        lastName: user.displayName?.split(" ").slice(1).join(" ") || "",
        email: user.email || "",
        phone: user.phoneNumber || "",
        role: "customer", // Default role for social logins
        membershipPlan: "basic",
        memberSince: new Date().toISOString().split("T")[0],
        photoURL: user.photoURL || "",
      }

      await setDoc(doc(db, "users", user.uid), newUser)

      return {
        success: true,
        user: newUser,
        isNewUser: true,
      }
    }

    // Return existing user data
    return {
      success: true,
      user: userDoc.data() as User,
      isNewUser: false,
    }
  } catch (error: any) {
    console.error("Error signing in with Google:", error)
    return {
      success: false,
      error: error.message,
    }
  }
}

export async function signInWithFacebook(): Promise<AuthResponse> {
  try {
    const result = await signInWithPopup(auth, facebookProvider)
    const credential = FacebookAuthProvider.credentialFromResult(result)
    const user = result.user

    // Check if user exists in Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid))

    if (!userDoc.exists()) {
      // If new user, create a record
      const newUser: User = {
        id: user.uid,
        firstName: user.displayName?.split(" ")[0] || "",
        lastName: user.displayName?.split(" ").slice(1).join(" ") || "",
        email: user.email || "",
        phone: user.phoneNumber || "",
        role: "customer", // Default role for social logins
        membershipPlan: "basic",
        memberSince: new Date().toISOString().split("T")[0],
        photoURL: user.photoURL || "",
      }

      await setDoc(doc(db, "users", user.uid), newUser)

      return {
        success: true,
        user: newUser,
        isNewUser: true,
      }
    }

    // Return existing user data
    return {
      success: true,
      user: userDoc.data() as User,
      isNewUser: false,
    }
  } catch (error: any) {
    console.error("Error signing in with Facebook:", error)
    return {
      success: false,
      error: error.message,
    }
  }
}
