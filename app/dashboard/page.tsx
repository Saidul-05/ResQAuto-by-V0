"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Loader2, Car, Clock, MapPin, AlertCircle, Plus, User, Mail } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/lib/auth-context"
import type { ServiceRequest } from "@/types/service"

export default function DashboardPage() {
  const { toast } = useToast()
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [services, setServices] = useState<ServiceRequest[]>([])
  const [activeTab, setActiveTab] = useState<"active" | "completed" | "all">("active")

  // Fetch service requests
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`/api/services?userId=1`) // In a real app, this would be the authenticated user's ID

        if (!response.ok) {
          throw new Error("Failed to fetch service requests")
        }

        const data = await response.json()
        setServices(data)
      } catch (err) {
        setError("Failed to load service requests. Please try again.")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchServices()
  }, [])

  // Filter services based on active tab
  const filteredServices = services.filter((service) => {
    if (activeTab === "active") {
      return ["pending", "accepted", "in-progress"].includes(service.status)
    } else if (activeTab === "completed") {
      return ["completed", "cancelled"].includes(service.status)
    }
    return true // "all" tab
  })

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "pending":
        return "secondary"
      case "accepted":
        return "warning"
      case "in-progress":
        return "default"
      case "completed":
        return "success"
      case "cancelled":
        return "destructive"
      default:
        return "outline"
    }
  }

  if (isLoading) {
    return (
      <div className="container flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin" />
          <p className="mt-2">Loading your service requests...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Your Dashboard</h1>
          {user && (
            <p className="text-muted-foreground">
              Welcome back, {user.firstName} {user.lastName}
            </p>
          )}
        </div>
        <Button asChild>
          <Link href="/service-request">
            <Plus className="mr-2 h-4 w-4" />
            New Service Request
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Membership Status</CardTitle>
            <CardDescription>Your current plan and benefits</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <span className="font-medium">Current Plan:</span>
              <Badge variant="default" className="capitalize">
                {user?.membershipPlan || "Basic"}
              </Badge>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="font-medium">Member Since:</span>
              <span>{user?.memberSince || "N/A"}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Status:</span>
              <Badge variant="success">Active</Badge>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/membership">View Membership Details</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Quick Actions</CardTitle>
            <CardDescription>Common tasks and services</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/service-request">
                <Car className="mr-2 h-4 w-4" />
                Request Roadside Assistance
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/emergency">
                <AlertCircle className="mr-2 h-4 w-4" />
                Emergency Services
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/dashboard/vehicles">
                <Car className="mr-2 h-4 w-4" />
                Manage Vehicles
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Account Overview</CardTitle>
            <CardDescription>Your account information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start">
                <User className="mr-2 h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Profile</p>
                  <p className="text-sm text-muted-foreground">
                    {user?.firstName} {user?.lastName}
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="mr-2 h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">{user?.email || "N/A"}</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/dashboard/settings">Edit Profile</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Tabs defaultValue="active" value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
        <TabsList className="mb-6">
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          {error ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : filteredServices.length === 0 ? (
            <Card>
              <CardContent className="py-10 text-center">
                <p className="text-muted-foreground">No service requests found.</p>
                {activeTab === "active" && (
                  <Button asChild className="mt-4">
                    <Link href="/service-request">
                      <Plus className="mr-2 h-4 w-4" />
                      Create New Request
                    </Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredServices.map((service) => (
                <Card key={service.id} className="flex flex-col">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">
                        {service.serviceType
                          .split("-")
                          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                          .join(" ")}
                      </CardTitle>
                      <Badge variant={getStatusBadgeVariant(service.status)}>
                        {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                      </Badge>
                    </div>
                    <CardDescription>Request #{service.id}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 space-y-2 pb-2">
                    <div className="flex items-start">
                      <Clock className="mr-2 h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">
                        {new Date(service.createdAt).toLocaleString()}
                      </span>
                    </div>

                    {service.vehicleInfo && (
                      <div className="flex items-start">
                        <Car className="mr-2 h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">
                          {service.vehicleInfo.year} {service.vehicleInfo.make} {service.vehicleInfo.model}
                        </span>
                      </div>
                    )}

                    <div className="flex items-start">
                      <MapPin className="mr-2 h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">
                        {service.location.lat.toFixed(6)}, {service.location.lng.toFixed(6)}
                      </span>
                    </div>

                    {service.description && <p className="text-sm mt-2 line-clamp-2">{service.description}</p>}
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full">
                      <Link href={`/service-tracking/${service.id}`}>View Details</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
