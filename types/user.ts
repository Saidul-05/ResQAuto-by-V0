export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  role: "customer" | "mechanic" | "provider" | "admin"
  membershipPlan?: string
  memberSince: string
  verified: boolean
  profileImage?: string
  address?: string
  city?: string
  state?: string
  zipCode?: string
  country?: string
}

export interface LoginCredentials {
  email: string
  password: string
  rememberMe?: boolean
  role?: string
}

export interface RegisterData {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  role?: "customer" | "mechanic" | "provider" | "business"
}

export interface AuthResponse {
  success: boolean
  user?: User
  token?: string
  error?: string
}
