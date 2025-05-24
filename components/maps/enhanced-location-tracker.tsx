"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Loader2, Navigation, LocateFixed, AlertTriangle, MapPin } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"
import dynamic from "next/dynamic"
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from "@/components/ui/input"

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

interface EnhancedLocationTrackerProps {
  serviceId: string
  initialLocation?: { lat: number; lng: number }
  technicianLocation?: { lat: number; lng: number }
  onLocationUpdate?: (location: { lat: number; lng: number }) => void
  readOnly?: boolean
}

// Default locations for major US cities as fallbacks
const DEFAULT_LOCATIONS = [
  { name: "New York", lat: 40.7128, lng: -74.006 },
  { name: "Los Angeles", lat: 34.0522, lng: -118.2437 },
  { name: "Chicago", lat: 41.8781, lng: -87.6298 },
  { name: "Houston", lat: 29.7604, lng: -95.3698 },
  { name: "Phoenix", lat: 33.4484, lng: -112.074 },
]

export function EnhancedLocationTracker({
  serviceId,
  initialLocation,
  technicianLocation,
  onLocationUpdate,
  readOnly = false,
}: EnhancedLocationTrackerProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [userLocation, setUserLocation] = useState(initialLocation || DEFAULT_LOCATIONS[0])
  const [distance, setDistance] = useState<string | null>(null)
  const [eta, setEta] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [accuracy, setAccuracy] = useState<number | null>(null)
  const [manualAddress, setManualAddress] = useState("")
  const [showManualInput, setShowManualInput] = useState(false)
  const [mapKey, setMapKey] = useState(Date.now()) // Used to force re-render the map
  const { toast } = useToast()

  // Update distance and ETA when locations change
  useEffect(() => {
    if (technicianLocation) {
      // This would be calculated by the LeafletMap component and passed back
    }
  }, [technicianLocation, userLocation])

  // Get current location with high accuracy
  const getCurrentLocation = () => {
    setIsLoading(true)
    setError(null)

    // Set a timeout to handle cases where geolocation is blocked or takes too long
    const timeoutId = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false)
        setError("Location detection timed out. Please select a location manually.")
        setShowManualInput(true)

        toast({
          title: "Location detection failed",
          description: "Unable to get your current location. Please select a location manually.",
          variant: "destructive",
        })
      }
    }, 5000)

    if (navigator.geolocation) {
      try {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            clearTimeout(timeoutId)
            const newLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            }
            setUserLocation(newLocation)
            setAccuracy(position.coords.accuracy)

            if (onLocationUpdate) {
              onLocationUpdate(newLocation)
            }

            setIsLoading(false)
            // Force map to re-render with new location
            setMapKey(Date.now())

            toast({
              title: "Location updated",
              description: `Your location has been updated with ${Math.round(position.coords.accuracy)}m accuracy.`,
            })
          },
          (error) => {
            clearTimeout(timeoutId)
            console.error("Error getting location:", error)
            setIsLoading(false)

            // Handle specific error types
            let errorMessage = "Unable to get your current location. Please enter your location manually."

            switch (error.code) {
              case error.PERMISSION_DENIED:
                errorMessage =
                  "Location access was denied. Please enable location permissions in your browser settings or enter your location manually."
                break
              case error.POSITION_UNAVAILABLE:
                errorMessage = "Location information is unavailable. Please enter your location manually."
                break
              case error.TIMEOUT:
                errorMessage = "Location request timed out. Please try again or enter your location manually."
                break
            }

            setError(errorMessage)
            setShowManualInput(true)

            toast({
              title: "Location error",
              description: "Unable to get your location. You can enter it manually.",
              variant: "destructive",
            })
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          },
        )
      } catch (e) {
        clearTimeout(timeoutId)
        console.error("Geolocation error:", e)
        setIsLoading(false)
        setError("Unable to access location services. Please enter your location manually.")
        setShowManualInput(true)
      }
    } else {
      clearTimeout(timeoutId)
      setIsLoading(false)
      setError("Geolocation is not supported by your browser. Please enter your location manually.")
      setShowManualInput(true)
      toast({
        title: "Geolocation not supported",
        description: "Your browser does not support geolocation.",
        variant: "destructive",
      })
    }
  }

  // Handle distance and ETA updates from the map component
  const handleRouteUpdate = (routeInfo: { distance: string; duration: string }) => {
    setDistance(routeInfo.distance)
    setEta(routeInfo.duration)
  }

  // Handle manual location selection
  const handleManualLocationSelect = (cityIndex: number) => {
    const selectedLocation = DEFAULT_LOCATIONS[cityIndex]
    setUserLocation(selectedLocation)

    if (onLocationUpdate) {
      onLocationUpdate(selectedLocation)
    }

    // Force map to re-render with new location
    setMapKey(Date.now())

    toast({
      title: "Location updated",
      description: `Your location has been set to ${selectedLocation.name}.`,
    })

    setShowManualInput(false)
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <CardTitle className="flex items-center">
              <MapPin className="mr-2 h-5 w-5 text-primary" />
              Live Location Tracking
            </CardTitle>
            <CardDescription>Track location in real-time</CardDescription>
          </div>
          {distance && eta && (
            <Badge variant="outline" className="self-start sm:self-auto">
              {distance} away • ETA: {eta}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative">
          {error && (
            <Alert variant="destructive" className="mx-4 mt-4 mb-2">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {showManualInput && (
            <div className="mx-4 mt-4 mb-2 p-4 border rounded-md bg-muted/50">
              <h3 className="font-medium mb-2">Select a location:</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {DEFAULT_LOCATIONS.map((location, index) => (
                  <Button
                    key={location.name}
                    variant="outline"
                    size="sm"
                    onClick={() => handleManualLocationSelect(index)}
                  >
                    {location.name}
                  </Button>
                ))}
              </div>
              <div className="mt-4">
                <p className="text-xs text-muted-foreground mb-2">Or enter an address manually (coming soon)</p>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter your address"
                    value={manualAddress}
                    onChange={(e) => setManualAddress(e.target.value)}
                    disabled
                  />
                  <Button disabled>Search</Button>
                </div>
              </div>
            </div>
          )}

          {/* Use key to force re-render when location changes */}
          <LeafletMap
            key={mapKey}
            userLocation={userLocation}
            technicianLocation={technicianLocation}
            onRouteUpdate={handleRouteUpdate}
            readOnly={readOnly}
          />

          {accuracy && (
            <div className="absolute bottom-2 left-2 bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-xs">
              Accuracy: {Math.round(accuracy)}m
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-2 p-4">
        {!readOnly && (
          <Button variant="outline" onClick={getCurrentLocation} disabled={isLoading} className="w-full sm:w-auto">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <LocateFixed className="mr-2 h-4 w-4" />
                Update My Location
              </>
            )}
          </Button>
        )}

        {!showManualInput && !readOnly && (
          <Button variant="outline" onClick={() => setShowManualInput(true)} className="w-full sm:w-auto">
            Enter Manually
          </Button>
        )}

        {technicianLocation && (
          <Button variant="outline" asChild className={`w-full sm:w-auto ${readOnly ? "w-full" : ""}`}>
            <a
              href={`https://www.openstreetmap.org/directions?from=${userLocation.lat},${userLocation.lng}&to=${technicianLocation.lat},${technicianLocation.lng}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Navigation className="mr-2 h-4 w-4" />
              Get Directions
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
