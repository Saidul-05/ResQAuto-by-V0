"use client"

import { useState, useEffect } from "react"
import { MapAlternative } from "./map-alternative"
import { Skeleton } from "@/components/ui/skeleton"

interface LeafletMapProps {
  userLocation?: { lat: number; lng: number }
  technicianLocation?: { lat: number; lng: number }
  onRouteUpdate?: (routeInfo: { distance: string; duration: string }) => void
  readOnly?: boolean
}

export default function LeafletMap({
  userLocation: initialLocation,
  technicianLocation,
  onRouteUpdate,
  readOnly = false,
}: LeafletMapProps) {
  const [userLocation, setUserLocation] = useState(
    initialLocation || { lat: 40.7128, lng: -74.006 }, // Default to New York
  )
  const [isLoading, setIsLoading] = useState(!initialLocation)

  // Get user's location if not provided
  useEffect(() => {
    if (initialLocation) {
      setUserLocation(initialLocation)
      setIsLoading(false)
      return
    }

    if (typeof navigator !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
          setIsLoading(false)
        },
        (error) => {
          console.error("Error getting location:", error)
          // Use default location
          setIsLoading(false)
        },
      )
    } else {
      // Geolocation not supported
      setIsLoading(false)
    }
  }, [initialLocation])

  if (isLoading) {
    return <Skeleton className="h-[300px] w-full" />
  }

  return (
    <MapAlternative
      userLocation={userLocation}
      technicianLocation={technicianLocation}
      onRouteUpdate={onRouteUpdate}
      readOnly={readOnly}
    />
  )
}
