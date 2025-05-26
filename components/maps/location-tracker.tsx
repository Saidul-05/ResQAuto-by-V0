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
      // Don't automatically request location on mount to avoid immediate permission prompts
      // Let the user click the button to request location
      const defaultLocation = { lat: 40.7128, lng: -74.006 } // New York City as fallback
      setLocation(defaultLocation)
      if (onLocationUpdate) {
        onLocationUpdate(defaultLocation)
      }
    }
  }, [initialLocation, onLocationUpdate])

  const getCurrentLocation = () => {
    setIsLoading(true)
    setError(null)

    if (!navigator.geolocation) {
      setIsLoading(false)
      setError("Geolocation is not supported by your browser.")
      setPermissionDenied(true)
      setActiveTab("manual")

      toast({
        title: "Geolocation not supported",
        description: "Please enter your location manually below.",
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
      return
    }

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
        setError(null)

        toast({
          title: "Location found",
          description: "Your location has been detected successfully.",
        })
      },
      (error) => {
        console.warn("Geolocation error:", error.message)
        setIsLoading(false)

        let errorMessage = "Unable to get your location."
        let shouldSwitchToManual = false

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access was denied. Please enter your location manually below."
            setPermissionDenied(true)
            shouldSwitchToManual = true
            break
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable. Please try entering your location manually."
            shouldSwitchToManual = true
            break
          case error.TIMEOUT:
            errorMessage = "Location request timed out. Please try again or enter your location manually."
            break
          default:
            errorMessage = "An error occurred while getting your location. Please try entering it manually."
            shouldSwitchToManual = true
        }

        setError(errorMessage)

        if (shouldSwitchToManual) {
          setActiveTab("manual")
        }

        toast({
          title: "Location Error",
          description: errorMessage,
          variant: "destructive",
        })

        // Set a default location as fallback
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
        timeout: 15000, // Increased timeout
        maximumAge: 300000, // 5 minutes cache
      },
    )
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
        <CardDescription>
          {permissionDenied
            ? "Location access was denied. Please enter your location manually or enable location services in your browser."
            : "We need your location to provide roadside assistance. You can use automatic detection or enter it manually."}
        </CardDescription>
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
              {permissionDenied && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
                  <h4 className="font-medium text-blue-900 mb-2">How to enable location access:</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Click the location icon in your browser's address bar</li>
                    <li>• Select "Allow" for location access</li>
                    <li>• Refresh the page and try again</li>
                  </ul>
                </div>
              )}

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
                <p className="font-medium mb-1">Need help finding your coordinates?</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Open Google Maps, right-click your location, and select "What's here?"</li>
                  <li>
                    Use a website like{" "}
                    <a
                      href="https://www.latlong.net/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      latlong.net
                    </a>
                  </li>
                  <li>
                    Search for your address on{" "}
                    <a
                      href="https://www.gps-coordinates.net/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      gps-coordinates.net
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
