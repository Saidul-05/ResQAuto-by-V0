"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Loader2,
  User,
  LogIn,
  UserPlus,
  Lock,
  Mail,
  Phone,
  LogOut,
  Settings,
  CreditCard,
  UserCircle,
  Car,
  Wrench,
  BuildingIcon as Buildings,
  ShieldCheck,
} from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function AuthMenu() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("login")
  const router = useRouter()
  const { user, isAuthenticated, isLoading, login, signup, logout, hasRole } = useAuth()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    signupPassword: "",
    resetEmail: "",
    role: "customer" as "customer" | "mechanic" | "provider",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const result = await login({
        email: formData.email,
        password: formData.password,
      })

      if (result.success) {
        setIsDialogOpen(false)

        // Reset form
        setFormData((prev) => ({ ...prev, email: "", password: "" }))

        // Redirect based on role
        if (result.user) {
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
        }
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const result = await signup({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.signupPassword,
        role: formData.role,
      })

      if (result.success) {
        setIsDialogOpen(false)

        // Reset form
        setFormData({
          email: "",
          password: "",
          firstName: "",
          lastName: "",
          phone: "",
          signupPassword: "",
          resetEmail: "",
          role: "customer",
        })

        // Redirect based on role
        if (result.user) {
          switch (result.user.role) {
            case "mechanic":
              router.push("/mechanic")
              break
            case "provider":
              router.push("/provider")
              break
            default:
              router.push("/dashboard")
          }
        }
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Reset form
      setFormData((prev) => ({ ...prev, resetEmail: "" }))

      // Return to login tab
      setActiveTab("login")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleLogout = () => {
    logout()
  }

  const getUserInitials = () => {
    if (!user) return "U"
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`
  }

  const getDashboardLink = () => {
    if (!user) return "/dashboard"

    switch (user.role) {
      case "mechanic":
        return "/mechanic"
      case "provider":
        return "/provider"
      case "admin":
        return "/admin"
      default:
        return "/dashboard"
    }
  }

  const getRoleIcon = () => {
    if (!user) return <User className="h-4 w-4" />

    switch (user.role) {
      case "mechanic":
        return <Wrench className="h-4 w-4" />
      case "provider":
        return <Buildings className="h-4 w-4" />
      case "admin":
        return <ShieldCheck className="h-4 w-4" />
      default:
        return <User className="h-4 w-4" />
    }
  }

  const getRoleName = () => {
    if (!user) return "User"

    switch (user.role) {
      case "mechanic":
        return "Mechanic"
      case "provider":
        return "Service Provider"
      case "admin":
        return "Administrator"
      default:
        return "Customer"
    }
  }

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {isAuthenticated ? (
              <Button variant="ghost" size="sm" className="gap-2" aria-label="account">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.profileImage} alt={user?.firstName} />
                  <AvatarFallback>{getUserInitials()}</AvatarFallback>
                </Avatar>
                <span className="hidden md:inline">{user?.firstName}</span>
              </Button>
            ) : (
              <Button variant="outline" size="sm" className="gap-2" aria-label="account">
                <User className="h-4 w-4" />
                <span className="hidden md:inline">Account</span>
              </Button>
            )}
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56">
            {isAuthenticated ? (
              // Logged in menu
              <>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <div className="flex items-center text-xs text-muted-foreground">
                    {getRoleIcon()}
                    <span className="ml-2">{getRoleName()}</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link href={getDashboardLink()}>
                      <UserCircle className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>

                  {hasRole("customer") && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard/bookings">
                          <Car className="mr-2 h-4 w-4" />
                          <span>My Bookings</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard/settings">
                          <Settings className="mr-2 h-4 w-4" />
                          <span>Settings</span>
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}

                  {hasRole("mechanic") && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/mechanic/jobs">
                          <Wrench className="mr-2 h-4 w-4" />
                          <span>Active Jobs</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/mechanic/earnings">
                          <CreditCard className="mr-2 h-4 w-4" />
                          <span>Earnings</span>
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}

                  {hasRole("provider") && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/provider/services">
                          <Car className="mr-2 h-4 w-4" />
                          <span>Services</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/provider/orders">
                          <CreditCard className="mr-2 h-4 w-4" />
                          <span>Orders</span>
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}

                  {hasRole("admin") && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/admin/users">
                          <User className="mr-2 h-4 w-4" />
                          <span>Manage Users</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/admin/settings">
                          <Settings className="mr-2 h-4 w-4" />
                          <span>System Settings</span>
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log Out</span>
                </DropdownMenuItem>
              </>
            ) : (
              // Logged out menu
              <>
                <DialogTrigger asChild onClick={() => setActiveTab("login")}>
                  <DropdownMenuItem data-login-trigger>
                    <LogIn className="mr-2 h-4 w-4" />
                    <span>Log In</span>
                  </DropdownMenuItem>
                </DialogTrigger>
                <DialogTrigger asChild onClick={() => setActiveTab("signup")}>
                  <DropdownMenuItem data-signup-trigger>
                    <UserPlus className="mr-2 h-4 w-4" />
                    <span>Sign Up</span>
                  </DropdownMenuItem>
                </DialogTrigger>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/emergency">
                    <Phone className="mr-2 h-4 w-4" />
                    <span>Emergency Contact</span>
                  </Link>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <DialogContent className="sm:max-w-md">
          <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="mt-4">
              <DialogHeader>
                <DialogTitle>Log in to your account</DialogTitle>
                <DialogDescription>Enter your email and password to access your RoadRescue account.</DialogDescription>
              </DialogHeader>

              <form onSubmit={handleLogin} className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      className="pl-10"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Button
                      variant="link"
                      size="sm"
                      className="px-0 text-xs h-auto"
                      type="button"
                      onClick={() => setActiveTab("forgot")}
                    >
                      Forgot password?
                    </Button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      className="pl-10"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <DialogFooter className="mt-6 px-0">
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Logging in...
                      </>
                    ) : (
                      "Log In"
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="mt-4">
              <DialogHeader>
                <DialogTitle>Create an account</DialogTitle>
                <DialogDescription>
                  Sign up for RoadRescue to access premium roadside assistance services.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSignup} className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      className="pl-10"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="(123) 456-7890"
                      className="pl-10"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Account Type</Label>
                  <RadioGroup
                    value={formData.role}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, role: value as any }))}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="customer" id="customer" />
                      <Label htmlFor="customer">Customer - Request roadside assistance services</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="mechanic" id="mechanic" />
                      <Label htmlFor="mechanic">Mechanic - Provide roadside assistance services</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="provider" id="provider" />
                      <Label htmlFor="provider">Service Provider - Manage a fleet of mechanics and services</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signupPassword">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signupPassword"
                      name="signupPassword"
                      type="password"
                      className="pl-10"
                      value={formData.signupPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Password must be at least 8 characters long and include a number and special character.
                  </p>
                </div>

                <DialogFooter className="mt-6 px-0">
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </TabsContent>

            <TabsContent value="forgot" className="mt-4">
              <DialogHeader>
                <DialogTitle>Reset your password</DialogTitle>
                <DialogDescription>
                  Enter your email address and we'll send you a link to reset your password.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleForgotPassword} className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="resetEmail">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="resetEmail"
                      name="resetEmail"
                      type="email"
                      placeholder="you@example.com"
                      className="pl-10"
                      value={formData.resetEmail}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <DialogFooter className="mt-6 px-0">
                  <Button type="button" variant="outline" onClick={() => setActiveTab("login")} className="mr-2">
                    Back to Login
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Reset Link"
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  )
}
