"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, MapPin, AlertTriangle, RefreshCw } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import dynamic from "next/dynamic"
import { listenToDocument } from "@/lib/firebase/real-time"
import { doc, updateDoc, GeoPoint } from "firebase/firestore"
import { db } from "@/lib/firebase/config"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"

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

interface RealTimeLocationTrackerProps {
  serviceId: string
  userType: "customer" | "mechanic" | "admin"
  updateInterval?: number // in milliseconds, how often to update location if tracking
}

export function RealTimeLocationTracker({ serviceId, userType, updateInterval = 10000 }: RealTimeLocationTrackerProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isTracking, setIsTracking] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [customerLocation, setCustomerLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [technicianLocation, setTechnicianLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [serviceData, setServiceData] = useState<any>(null)
  const [distance, setDistance] = useState<string | null>(null)
  const [eta, setEta] = useState<string | null>(null)
  const watchPositionId = useRef<number | null>(null)
  const { toast } = useToast()

  // Listen to real-time updates for the service
  useEffect(() => {
    const unsubscribe = listenToDocument(
      "services",
      serviceId,
      (data) => {
        setServiceData(data)

        if (data) {
          if (data.customerLocation) {
            setCustomerLocation({
              lat: data.customerLocation.latitude || data.customerLocation.lat,
              lng: data.customerLocation.longitude || data.customerLocation.lng,
            })
          }

          if (data.technicianLocation) {
            setTechnicianLocation({
              lat: data.technicianLocation.latitude || data.technicianLocation.lat,
              lng: data.technicianLocation.longitude || data.technicianLocation.lng,
            })

            // If we have both locations, calculate distance and ETA
            if (data.customerLocation) {
              calculateDistanceAndETA(
                {
                  lat: data.technicianLocation.latitude || data.technicianLocation.lat,
                  lng: data.technicianLocation.longitude || data.technicianLocation.lng,
                },
                {
                  lat: data.customerLocation.latitude || data.customerLocation.lat,
                  lng: data.customerLocation.longitude || data.customerLocation.lng,
                },
              )
            }
          }
        }

        setIsLoading(false)
      },
      (error) => {
        console.error("Error listening to service:", error)
        setError("Failed to connect to real-time updates. Please refresh the page.")
        setIsLoading(false)
      },
    )

    return () => unsubscribe()
  }, [serviceId])

  // Start/stop location tracking
  useEffect(() => {
    if (isTracking) {
      startLocationTracking()
    } else {
      stopLocationTracking()
    }

    return () => {
      stopLocationTracking()
    }
  }, [isTracking])

  const startLocationTracking = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser")
      return
    }

    // Clear any existing watch
    stopLocationTracking()

    // Start a new watch position
    watchPositionId.current = navigator.geolocation.watchPosition(
      (position) => {
        const newLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }

        // Update based on user type
        if (userType === "customer") {
          setCustomerLocation(newLocation)
          updateLocationInFirestore("customerLocation", newLocation)
        } else if (userType === "mechanic") {
          setTechnicianLocation(newLocation)
          updateLocationInFirestore("technicianLocation", newLocation)
        }

        setError(null)
      },
      (error) => {
        console.error("Error tracking location:", error)
        let errorMessage = "Unable to track your location."
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location permission denied. Please enable location services."
            break
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable."
            break
          case error.TIMEOUT:
            errorMessage = "The request to get your location timed out."
            break
        }

        setError(errorMessage)
        setIsTracking(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    )
  }

  const stopLocationTracking = () => {
    if (watchPositionId.current !== null) {
      navigator.geolocation.clearWatch(watchPositionId.current)
      watchPositionId.current = null
    }
  }

  const updateLocationInFirestore = async (
    locationType: "customerLocation" | "technicianLocation",
    location: { lat: number; lng: number },
  ) => {
    try {
      const serviceRef = doc(db, "services", serviceId)
      await updateDoc(serviceRef, {
        [locationType]: new GeoPoint(location.lat, location.lng),
        lastUpdated: new Date(),
      })
    } catch (error) {
      console.error("Error updating location in Firestore:", error)
      toast({
        title: "Update failed",
        description: "Failed to update your location. Please try again.",
        variant: "destructive",
      })
    }
  }

  const calculateDistanceAndETA = (
    techLocation: { lat: number; lng: number },
    custLocation: { lat: number; lng: number },
  ) => {
    // Simple distance calculation using Haversine formula
    const R = 6371 // Radius of the earth in km
    const dLat = deg2rad(custLocation.lat - techLocation.lat)
    const dLon = deg2rad(custLocation.lng - techLocation.lng)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(techLocation.lat)) *
        Math.cos(deg2rad(custLocation.lat)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distanceKm = R * c

    // Format distance
    let distanceStr = ""
    if (distanceKm < 1) {
      distanceStr = `${Math.round(distanceKm * 1000)} meters`
    } else {
      distanceStr = `${distanceKm.toFixed(1)} km`
    }

    // Estimate ETA (assuming 40 km/h average speed)
    const timeHours = distanceKm / 40
    let etaStr = ""
    if (timeHours < 1 / 60) {
      etaStr = "Less than a minute"
    } else if (timeHours < 1) {
      etaStr = `${Math.ceil(timeHours * 60)} minutes`
    } else {
      const hours = Math.floor(timeHours)
      const minutes = Math.ceil((timeHours - hours) * 60)
      etaStr = `${hours} hour${hours > 1 ? "s" : ""} ${minutes} minute${minutes > 1 ? "s" : ""}`
    }

    setDistance(distanceStr)
    setEta(etaStr)
  }

  function deg2rad(deg: number) {
    return deg * (Math.PI / 180)
  }

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

          // Update based on user type
          if (userType === "customer") {
            setCustomerLocation(newLocation)
            updateLocationInFirestore("customerLocation", newLocation)
          } else if (userType === "mechanic") {
            setTechnicianLocation(newLocation)
            updateLocationInFirestore("technicianLocation", newLocation)
          }

          setIsLoading(false)
        },
        (error) => {
          console.error("Error getting location:", error)
          setIsLoading(false)

          let errorMessage = "Unable to get your location."
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = "Location permission denied. Please enable location services in your browser."
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
    }
  }

  const toggleTracking = () => {
    setIsTracking(!isTracking)

    toast({
      title: isTracking ? "Tracking stopped" : "Tracking started",
      description: isTracking
        ? "Your location will no longer be tracked in real-time"
        : "Your location is now being tracked in real-time",
    })
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <MapPin className="mr-2 h-5 w-5" />
            Real-Time Location
          </CardTitle>

          {/* Status badge */}
          {isTracking ? (
            <Badge className="bg-green-500 animate-pulse">Live Tracking</Badge>
          ) : (
            <Badge variant="outline">Tracking Off</Badge>
          )}
        </div>
        <CardDescription>
          {userType === "customer"
            ? "Share your location to help the technician find you"
            : userType === "mechanic"
              ? "Track your location and the customer's location"
              : "Monitor both the customer and technician locations"}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {error && (
          <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-md flex items-center">
            <AlertTriangle className="h-4 w-4 mr-2" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Map with both locations if available */}
        <div className="relative">
          {customerLocation || technicianLocation ? (
            <LeafletMap
              userLocation={userType === "customer" ? customerLocation : technicianLocation}
              technicianLocation={technicianLocation}
              customerLocation={customerLocation}
              showDirections={!!customerLocation && !!technicianLocation}
              readOnly={!isTracking}
            />
          ) : (
            <div className="h-[300px] w-full rounded-md border flex items-center justify-center bg-muted">
              <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-primary" />
                <p>Loading map...</p>
              </div>
            </div>
          )}

          {/* Distance and ETA overlay */}
          {distance && eta && userType !== "customer" && (
            <div className="absolute bottom-2 left-2 bg-background/90 p-2 rounded-md shadow-md border">
              <div className="flex flex-col text-sm">
                <span className="font-medium">Distance: {distance}</span>
                <span className="font-medium">ETA: {eta}</span>
              </div>
            </div>
          )}
        </div>

        {/* Service status information */}
        {serviceData && (
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex flex-col">
              <span className="text-muted-foreground">Service Type:</span>
              <span className="font-medium">{serviceData.serviceType?.replace(/-/g, " ") || "Unknown"}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-muted-foreground">Status:</span>
              <span className="font-medium capitalize">{serviceData.status || "Unknown"}</span>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex gap-2">
        <Button onClick={getCurrentLocation} variant="outline" disabled={isLoading || isTracking} className="flex-1">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Getting location...
            </>
          ) : (
            <>
              <MapPin className="mr-2 h-4 w-4" />
              Update Location
            </>
          )}
        </Button>

        <Button onClick={toggleTracking} variant={isTracking ? "destructive" : "default"} className="flex-1">
          {isTracking ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Stop Tracking
            </>
          ) : (
            <>
              <MapPin className="mr-2 h-4 w-4" />
              Start Live Tracking
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
