import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Paths that require authentication
const protectedPaths = [
  "/dashboard",
  "/mechanic",
  "/provider",
  "/admin",
  "/service-request",
  "/service-tracking",
  "/payment",
  "/dashboard/vehicles",
  "/dashboard/bookings",
  "/dashboard/settings",
]

// Paths accessible only to specific roles
const roleRestrictedPaths = {
  "/admin": ["admin"],
  "/mechanic": ["mechanic", "admin"],
  "/provider": ["provider", "admin"],
}

// Public paths for authentication
const authPaths = ["/auth/login", "/auth/register", "/auth/forgot-password"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Add headers for security
  const response = NextResponse.next()
  response.headers.set("Permissions-Policy", "geolocation=(self)")
  response.headers.set("Cross-Origin-Embedder-Policy", "require-corp")
  response.headers.set("Cross-Origin-Opener-Policy", "same-origin")

  // Check if path requires authentication
  const requiresAuth = protectedPaths.some((path) => pathname.startsWith(path))

  // Get the authentication token from cookies
  const authToken = request.cookies.get("auth_token")?.value

  // If path requires auth and user is not logged in, redirect to login
  if (requiresAuth && !authToken) {
    const url = new URL("/auth/login", request.url)
    url.searchParams.set("redirect", pathname)
    return NextResponse.redirect(url)
  }

  // For role-based restrictions, we would typically verify the JWT token here
  // and extract the user's role, but this would require server-side JWT verification
  // For now, we'll leave this as a sketch of how it would work

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public directory)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$).*)",
  ],
}
