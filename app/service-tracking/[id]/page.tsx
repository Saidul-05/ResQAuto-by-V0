"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Phone, MessageSquare, Car, Clock, MapPin, User, AlertCircle, FileText, Star } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"
import { EnhancedLocationTracker } from "@/components/maps/enhanced-location-tracker"
import { EmergencyChat } from "@/components/emergency/emergency-chat"
import type { ServiceRequest } from "@/types/service"

interface ServiceTrackingPageProps {
  params: {
    id: string
  }
}

export default function ServiceTrackingPage({ params }: ServiceTrackingPageProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [service, setService] = useState<ServiceRequest | null>(null)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [activeTab, setActiveTab] = useState("location")

  // Fetch service request data
  useEffect(() => {
    const fetchServiceRequest = async () => {
      try {
        const response = await fetch(`/api/services/${params.id}`)

        if (!response.ok) {
          throw new Error("Failed to fetch service request")
        }

        const data = await response.json()
        setService(data)
        setUserLocation(data.location)
      } catch (err) {
        setError("Failed to load service request. Please try again.")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchServiceRequest()
  }, [params.id])

  // Simulate technician movement (in a real app, this would come from a WebSocket or polling)
  useEffect(() => {
    if (!service || !service.technicianLocation) return

    const interval = setInterval(() => {
      if (service.technicianLocation) {
        // Move technician slightly closer to user
        const newLat = service.technicianLocation.lat + (service.location.lat - service.technicianLocation.lat) * 0.1
        const newLng = service.technicianLocation.lng + (service.location.lng - service.technicianLocation.lng) * 0.1

        setService((prev) => {
          if (!prev) return null

          return {
            ...prev,
            technicianLocation: {
              lat: newLat,
              lng: newLng,
            },
          }
        })
      }
    }, 10000) // Update every 10 seconds

    return () => clearInterval(interval)
  }, [service])

  const handleLocationUpdate = (location: { lat: number; lng: number }) => {
    setUserLocation(location)

    // Update service location on server
    updateServiceLocation(location)
  }

  const updateServiceLocation = async (location: { lat: number; lng: number }) => {
    try {
      const response = await fetch(`/api/services/${params.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          location,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update location")
      }

      const updatedService = await response.json()
      setService(updatedService)

      toast({
        title: "Location updated",
        description: "Your location has been updated successfully.",
      })
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to update your location. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleCancelService = async () => {
    try {
      const response = await fetch(`/api/services/${params.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "cancelled",
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to cancel service")
      }

      const updatedService = await response.json()
      setService(updatedService)

      toast({
        title: "Service cancelled",
        description: "Your service request has been cancelled.",
      })

      // Redirect to dashboard
      router.push("/dashboard")
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to cancel service. Please try again.",
        variant: "destructive",
      })
    }
  }

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
          <p className="mt-2">Loading service details...</p>
        </div>
      </div>
    )
  }

  if (error || !service) {
    return (
      <div className="container py-10">
        <Alert variant="destructive" className="max-w-md mx-auto">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error || "Service request not found"}</AlertDescription>
        </Alert>
        <div className="flex justify-center mt-4">
          <Button onClick={() => router.push("/dashboard")}>Back to Dashboard</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Service Tracking</h1>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 w-full mb-6">
          <TabsTrigger value="location">Location</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="chat">Chat</TabsTrigger>
        </TabsList>

        <TabsContent value="location">
          <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <EnhancedLocationTracker
                serviceId={service.id}
                initialLocation={userLocation || undefined}
                technicianLocation={service.technicianLocation || undefined}
                onLocationUpdate={handleLocationUpdate}
              />
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Service Status</span>
                    <Badge variant={getStatusBadgeVariant(service.status)}>
                      {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start">
                    <Car className="mr-2 h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Service Type</p>
                      <p className="text-sm text-muted-foreground">
                        {service.serviceType
                          .split("-")
                          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                          .join(" ")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="mr-2 h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Requested At</p>
                      <p className="text-sm text-muted-foreground">{new Date(service.createdAt).toLocaleString()}</p>
                    </div>
                  </div>

                  {service.technicianId && (
                    <div className="flex items-start">
                      <User className="mr-2 h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Technician</p>
                        <p className="text-sm text-muted-foreground">John Smith</p>
                        <div className="flex items-center mt-1">
                          <Button variant="outline" size="sm" asChild className="h-7 mr-2">
                            <a href="tel:+15551234567">
                              <Phone className="mr-1 h-3 w-3" />
                              Call
                            </a>
                          </Button>
                          <Button variant="outline" size="sm" className="h-7" onClick={() => setActiveTab("chat")}>
                            <MessageSquare className="mr-1 h-3 w-3" />
                            Chat
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  {service.status !== "completed" && service.status !== "cancelled" && (
                    <Button variant="destructive" className="w-full" onClick={handleCancelService}>
                      Cancel Service
                    </Button>
                  )}
                </CardFooter>
              </Card>

              {service.vehicleInfo && (
                <Card>
                  <CardHeader>
                    <CardTitle>Vehicle Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start">
                      <Car className="mr-2 h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">
                          {service.vehicleInfo.year} {service.vehicleInfo.make} {service.vehicleInfo.model}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {service.vehicleInfo.color} • {service.vehicleInfo.licensePlate}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="details">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Service Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start">
                  <FileText className="mr-2 h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Service ID</p>
                    <p className="text-sm text-muted-foreground">#{service.id}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Car className="mr-2 h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Service Type</p>
                    <p className="text-sm text-muted-foreground">
                      {service.serviceType
                        .split("-")
                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(" ")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="mr-2 h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Timeline</p>
                    <div className="text-sm text-muted-foreground space-y-1 mt-1">
                      <p>Requested: {new Date(service.createdAt).toLocaleString()}</p>
                      {service.status === "in-progress" && (
                        <p>Started: {new Date(service.updatedAt).toLocaleString()}</p>
                      )}
                      {service.status === "completed" && (
                        <p>Completed: {new Date(service.updatedAt).toLocaleString()}</p>
                      )}
                      {service.status === "cancelled" && (
                        <p>Cancelled: {new Date(service.updatedAt).toLocaleString()}</p>
                      )}
                    </div>
                  </div>
                </div>

                {service.description && (
                  <div className="flex items-start">
                    <MessageSquare className="mr-2 h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Description</p>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-start">
                  <MapPin className="mr-2 h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">
                      {service.location.lat.toFixed(6)}, {service.location.lng.toFixed(6)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Technician Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {service.technicianId ? (
                  <>
                    <div className="flex items-center">
                      <div className="h-16 w-16 rounded-full bg-muted mr-4 overflow-hidden">
                        <img
                          src="/placeholder.svg?height=64&width=64"
                          alt="Technician"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-lg">John Smith</p>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                          <span className="text-sm">4.9</span>
                          <span className="text-sm text-muted-foreground ml-1">(124 reviews)</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">5 years experience</p>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <p className="font-medium">Specializations</p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">Towing</Badge>
                        <Badge variant="outline">Flat Tire</Badge>
                        <Badge variant="outline">Battery Jump</Badge>
                        <Badge variant="outline">Lockout</Badge>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex justify-between">
                      <Button variant="outline" asChild>
                        <a href="tel:+15551234567">
                          <Phone className="mr-2 h-4 w-4" />
                          Call Technician
                        </a>
                      </Button>

                      <Button variant="outline" onClick={() => setActiveTab("chat")}>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Chat
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No technician has been assigned yet.</p>
                    <p className="mt-2">A technician will be assigned shortly.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="chat">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2 h-[500px]">
              <EmergencyChat />
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Service Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Status:</span>
                    <Badge variant={getStatusBadgeVariant(service.status)}>
                      {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span>Service Type:</span>
                    <span>
                      {service.serviceType
                        .split("-")
                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(" ")}
                    </span>
                  </div>

                  {service.technicianId && (
                    <div className="flex items-center justify-between">
                      <span>Technician:</span>
                      <span>John Smith</span>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => setActiveTab("location")}>
                    View Location
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button className="w-full" asChild>
                    <a href="tel:+15551234567">
                      <Phone className="mr-2 h-4 w-4" />
                      Call Technician
                    </a>
                  </Button>

                  <Button variant="outline" className="w-full" asChild>
                    <a href="tel:18007623404">
                      <Phone className="mr-2 h-4 w-4" />
                      Call Support
                    </a>
                  </Button>

                  {service.status !== "completed" && service.status !== "cancelled" && (
                    <Button variant="destructive" className="w-full" onClick={handleCancelService}>
                      Cancel Service
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
