"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, MapPin, AlertTriangle, Map } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import dynamic from "next/dynamic"
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Dynamically import Leaflet components with no SSR to avoid hydration issues
const LeafletMap = dynamic(() => import("@/components/maps/leaflet-map"), {
  ssr: false,
  loading: () => (
    <div className="h-[300px] w-full rounded-md border flex items-center justify-center bg-muted">
      <div className="space-y-2 w-full px-8">
        <Skeleton className="h-[300px] w-full" />
      </div>
    </div>
  ),
})

interface LocationTrackerProps {
  serviceId: string
  initialLocation?: { lat: number; lng: number }
  onLocationUpdate?: (location: { lat: number; lng: number }) => void
}

export function LocationTracker({ serviceId, initialLocation, onLocationUpdate }: LocationTrackerProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(initialLocation || null)
  const [error, setError] = useState<string | null>(null)
  const [permissionDenied, setPermissionDenied] = useState(false)
  const [activeTab, setActiveTab] = useState<string>("auto")
  const [manualLocation, setManualLocation] = useState({
    latitude: "",
    longitude: "",
  })
  const { toast } = useToast()

  // Try to get user's location on component mount if no initial location is provided
  useEffect(() => {
    if (!initialLocation) {
      getCurrentLocation()
    }
  }, [initialLocation])

  const getCurrentLocation = () => {
    setIsLoading(true)
    setError(null)

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          setLocation(newLocation)

          if (onLocationUpdate) {
            onLocationUpdate(newLocation)
          }

          setIsLoading(false)
          setPermissionDenied(false)
        },
        (error) => {
          console.error("Error getting location:", error)
          setIsLoading(false)

          let errorMessage = "Unable to get your location."
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage =
                "Location permission denied. Please enable location services or enter your location manually."
              setPermissionDenied(true)
              setActiveTab("manual")
              break
            case error.POSITION_UNAVAILABLE:
              errorMessage = "Location information is unavailable."
              break
            case error.TIMEOUT:
              errorMessage = "The request to get your location timed out."
              break
          }

          setError(errorMessage)
          toast({
            title: "Location error",
            description: errorMessage,
            variant: "destructive",
          })

          // Set a default location if we couldn't get the user's location
          if (!location) {
            const defaultLocation = { lat: 40.7128, lng: -74.006 } // New York City
            setLocation(defaultLocation)
            if (onLocationUpdate) {
              onLocationUpdate(defaultLocation)
            }
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        },
      )
    } else {
      setIsLoading(false)
      setError("Geolocation is not supported by your browser.")
      toast({
        title: "Geolocation not supported",
        description: "Your browser does not support geolocation.",
        variant: "destructive",
      })

      // Set a default location if geolocation is not supported
      if (!location) {
        const defaultLocation = { lat: 40.7128, lng: -74.006 } // New York City
        setLocation(defaultLocation)
        if (onLocationUpdate) {
          onLocationUpdate(defaultLocation)
        }
      }
    }
  }

  const handleManualLocationSubmit = () => {
    try {
      const lat = Number.parseFloat(manualLocation.latitude)
      const lng = Number.parseFloat(manualLocation.longitude)

      if (isNaN(lat) || isNaN(lng)) {
        throw new Error("Please enter valid latitude and longitude values")
      }

      if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
        throw new Error("Latitude must be between -90 and 90, and longitude must be between -180 and 180")
      }

      const newLocation = { lat, lng }
      setLocation(newLocation)

      if (onLocationUpdate) {
        onLocationUpdate(newLocation)
      }

      setError(null)
      toast({
        title: "Location updated",
        description: "Your location has been manually set",
      })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Invalid coordinates"
      setError(errorMessage)
      toast({
        title: "Invalid coordinates",
        description: errorMessage,
        variant: "destructive",
      })
    }
  }

  const handleManualLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setManualLocation((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <MapPin className="mr-2 h-5 w-5" />
          Your Location
        </CardTitle>
        <CardDescription>We need your location to provide roadside assistance</CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-md flex items-center">
            <AlertTriangle className="h-4 w-4 mr-2" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="auto">Automatic Location</TabsTrigger>
            <TabsTrigger value="manual">Manual Entry</TabsTrigger>
          </TabsList>

          <TabsContent value="auto">
            {location ? (
              <LeafletMap userLocation={location} readOnly={false} />
            ) : (
              <div className="h-[300px] w-full rounded-md border flex items-center justify-center bg-muted">
                <div className="text-center">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-primary" />
                  <p>Loading map...</p>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="manual">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="latitude">Latitude</Label>
                <Input
                  id="latitude"
                  name="latitude"
                  placeholder="e.g., 40.7128"
                  value={manualLocation.latitude}
                  onChange={handleManualLocationChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="longitude">Longitude</Label>
                <Input
                  id="longitude"
                  name="longitude"
                  placeholder="e.g., -74.006"
                  value={manualLocation.longitude}
                  onChange={handleManualLocationChange}
                />
              </div>

              <Button onClick={handleManualLocationSubmit} className="w-full">
                <Map className="mr-2 h-4 w-4" />
                Set Location
              </Button>

              <div className="text-sm text-muted-foreground mt-2">
                <p>Not sure about your coordinates?</p>
                <ul className="list-disc pl-5 mt-1">
                  <li>
                    You can find your coordinates on Google Maps by right-clicking on your location and selecting
                    "What's here?"
                  </li>
                  <li>
                    Or use a website like{" "}
                    <a
                      href="https://www.latlong.net/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      latlong.net
                    </a>
                  </li>
                </ul>
              </div>

              {location && (
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">Current Location:</p>
                  <LeafletMap userLocation={location} readOnly={false} />
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        {activeTab === "auto" && (
          <Button onClick={getCurrentLocation} disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Getting your location...
              </>
            ) : (
              <>
                <MapPin className="mr-2 h-4 w-4" />
                {location ? "Update My Location" : "Get My Location"}
              </>
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
