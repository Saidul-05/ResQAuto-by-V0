"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"
import { LocationTracker } from "@/components/maps/location-tracker"
import type { ServiceType } from "@/types/service"

const serviceTypes: { value: ServiceType; label: string }[] = [
  { value: "flat-tire", label: "Flat Tire" },
  { value: "battery-jump", label: "Battery Jump Start" },
  { value: "towing", label: "Towing" },
  { value: "fuel-delivery", label: "Fuel Delivery" },
  { value: "lockout", label: "Lockout Assistance" },
  { value: "other", label: "Other" },
]

export default function ServiceRequestPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("location")
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [formData, setFormData] = useState({
    serviceType: "" as ServiceType,
    description: "",
    make: "",
    model: "",
    year: "",
    color: "",
    licensePlate: "",
  })

  // Get user's location on page load
  // Don't automatically request location on page load to avoid permission prompts
  useEffect(() => {
    // Set a default location instead of immediately requesting geolocation
    const defaultLocation = { lat: 40.7128, lng: -74.006 } // New York City
    setUserLocation(defaultLocation)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleLocationUpdate = (location: { lat: number; lng: number }) => {
    setUserLocation(location)
  }

  const handleNext = () => {
    // Validate current tab
    if (activeTab === "location") {
      if (!userLocation) {
        setError("Please set your location before continuing. You can use automatic detection or enter it manually.")
        return
      }
      setActiveTab("service")
      return
    }

    if (activeTab === "service" && !formData.serviceType) {
      setError("Please select a service type")
      return
    }

    // Move to next tab
    if (activeTab === "service") {
      setActiveTab("vehicle")
    } else if (activeTab === "vehicle") {
      handleSubmit()
    }

    setError(null)
  }

  const handleBack = () => {
    if (activeTab === "service") {
      setActiveTab("location")
    } else if (activeTab === "vehicle") {
      setActiveTab("service")
    }

    setError(null)
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Validate required fields
      if (!userLocation) {
        throw new Error("Location is required. Please provide your location using the location tab.")
      }

      if (!formData.serviceType) {
        setActiveTab("service")
        throw new Error("Service type is required")
      }

      // Create service request
      const response = await fetch("/api/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: "1", // In a real app, this would be the authenticated user's ID
          serviceType: formData.serviceType,
          location: userLocation,
          description: formData.description,
          vehicleInfo: {
            make: formData.make,
            model: formData.model,
            year: Number.parseInt(formData.year) || new Date().getFullYear(),
            color: formData.color,
            licensePlate: formData.licensePlate,
          },
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to create service request")
      }

      const serviceRequest = await response.json()

      toast({
        title: "Service request created",
        description: "Your service request has been submitted successfully.",
      })

      // Redirect to service tracking page
      router.push(`/service-tracking/${serviceRequest.id}`)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to create service request"
      setError(errorMessage)

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Request Roadside Assistance</h1>
      <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
        Need help on the road? Fill out the form below to request immediate assistance. Our technicians will be
        dispatched to your location as soon as possible.
      </p>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Service Request</CardTitle>
          <CardDescription>Please provide the details of your roadside assistance needs</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="location">Location</TabsTrigger>
              <TabsTrigger value="service">Service</TabsTrigger>
              <TabsTrigger value="vehicle">Vehicle</TabsTrigger>
            </TabsList>

            <TabsContent value="location" className="space-y-4">
              <div className="space-y-2">
                <Label>Your Current Location</Label>
                <LocationTracker
                  serviceId="new"
                  initialLocation={userLocation || undefined}
                  onLocationUpdate={handleLocationUpdate}
                />
              </div>
            </TabsContent>

            <TabsContent value="service" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="serviceType">Service Type</Label>
                <Select
                  value={formData.serviceType}
                  onValueChange={(value) => handleSelectChange("serviceType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select service type" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description of Problem</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Please describe your issue in detail"
                  className="min-h-[100px]"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
            </TabsContent>

            <TabsContent value="vehicle" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="make">Make</Label>
                  <Input
                    id="make"
                    name="make"
                    placeholder="e.g., Toyota"
                    value={formData.make}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="model">Model</Label>
                  <Input
                    id="model"
                    name="model"
                    placeholder="e.g., Camry"
                    value={formData.model}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Input id="year" name="year" placeholder="e.g., 2020" value={formData.year} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="color">Color</Label>
                  <Input
                    id="color"
                    name="color"
                    placeholder="e.g., Silver"
                    value={formData.color}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="licensePlate">License Plate</Label>
                <Input
                  id="licensePlate"
                  name="licensePlate"
                  placeholder="e.g., ABC123"
                  value={formData.licensePlate}
                  onChange={handleChange}
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          {activeTab !== "location" ? (
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
          ) : (
            <div></div>
          )}

          <Button onClick={handleNext} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : activeTab === "vehicle" ? (
              "Submit Request"
            ) : (
              "Next"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
