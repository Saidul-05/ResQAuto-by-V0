// This is a simplified auth implementation
// In a real application, you would use a proper auth provider like NextAuth.js, Auth0, or Firebase Auth

import type { User } from "@/types/user"

// Simulated user database
const USERS: User[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "(555) 123-4567",
    password: "password123", // In a real app, this would be hashed
    membershipPlan: "premium",
    memberSince: "2022-01-15",
  },
]

// Simulated token storage
let currentUser: User | null = null
let authToken: string | null = null

export async function signIn(
  email: string,
  password: string,
  rememberMe = false,
): Promise<{ success: boolean; error?: string; user?: User }> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Find user by email
  const user = USERS.find((u) => u.email === email)

  if (!user || user.password !== password) {
    return { success: false, error: "Invalid email or password" }
  }

  // Set current user and generate token
  currentUser = user
  authToken = `token_${Math.random().toString(36).substring(2)}`

  // In a real app, you would store the token in localStorage or cookies if rememberMe is true
  if (rememberMe) {
    localStorage.setItem("authToken", authToken)
  } else {
    sessionStorage.setItem("authToken", authToken)
  }

  return { success: true, user }
}

export async function registerUser(
  userData: Omit<User, "id" | "membershipPlan" | "memberSince">,
): Promise<{ success: boolean; error?: string; user?: User }> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Check if user already exists
  if (USERS.some((u) => u.email === userData.email)) {
    return { success: false, error: "Email already in use" }
  }

  // Create new user
  const newUser: User = {
    id: `${USERS.length + 1}`,
    ...userData,
    membershipPlan: "basic",
    memberSince: new Date().toISOString().split("T")[0],
  }

  // Add to "database"
  USERS.push(newUser)

  return { success: true, user: newUser }
}

export async function resetPassword(email: string): Promise<{ success: boolean; error?: string }> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Check if user exists
  const user = USERS.find((u) => u.email === email)

  if (!user) {
    return { success: false, error: "No account found with this email" }
  }

  // In a real app, you would send an email with a reset link
  console.log(`Password reset requested for ${email}`)

  return { success: true }
}

export function signOut(): void {
  currentUser = null
  authToken = null
  localStorage.removeItem("authToken")
  sessionStorage.removeItem("authToken")

  // In a real app, you would redirect to the login page
  window.location.href = "/auth/login"
}

export function getCurrentUser(): User | null {
  return currentUser
}

export function isAuthenticated(): boolean {
  return !!currentUser && !!authToken
}

// Initialize auth from stored token
export async function initAuth(): Promise<boolean> {
  const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken")

  if (token) {
    // In a real app, you would validate the token with your backend
    // and retrieve the user information
    authToken = token
    currentUser = USERS[0] // Simulated user retrieval
    return true
  }

  return false
}
