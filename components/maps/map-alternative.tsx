"use client"

import { useState, useEffect, useRef } from "react"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MapAlternativeProps {
  userLocation: { lat: number; lng: number }
  technicianLocation?: { lat: number; lng: number }
  onRouteUpdate?: (routeInfo: { distance: string; duration: string }) => void
  readOnly?: boolean
}

export function MapAlternative({
  userLocation,
  technicianLocation,
  onRouteUpdate,
  readOnly = false,
}: MapAlternativeProps) {
  const [isLoading, setIsLoading] = useState(true)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const [mapUrl, setMapUrl] = useState("")

  useEffect(() => {
    // Create a Google Maps static image URL
    const createMapUrl = () => {
      const baseUrl = "https://maps.googleapis.com/maps/api/staticmap"
      const zoom = 14
      const size = "600x300"
      const scale = 2 // For higher resolution

      let markers = `markers=color:blue|label:U|${userLocation.lat},${userLocation.lng}`

      if (technicianLocation) {
        markers += `&markers=color:red|label:T|${technicianLocation.lat},${technicianLocation.lng}`

        // Calculate distance and duration if technician location is provided
        if (onRouteUpdate) {
          const distance = calculateDistance(userLocation, technicianLocation)
          const estimatedMinutes = Math.round(distance / 0.5) // Assuming 0.5 km per minute

          onRouteUpdate({
            distance: `${distance.toFixed(1)} km`,
            duration: `~${estimatedMinutes} min`,
          })
        }
      }

      // Note: In a real app, you would include your API key
      // For demo purposes, we're using a placeholder URL
      const url = `/placeholder.svg?height=300&width=600&text=Map+View`

      // In production, you would use:
      // const url = `${baseUrl}?center=${userLocation.lat},${userLocation.lng}&zoom=${zoom}&size=${size}&scale=${scale}&${markers}&key=YOUR_API_KEY`

      return url
    }

    setMapUrl(createMapUrl())
    setIsLoading(false)
  }, [userLocation, technicianLocation, onRouteUpdate])

  // Calculate distance between two points using Haversine formula
  const calculateDistance = (point1: { lat: number; lng: number }, point2: { lat: number; lng: number }) => {
    const R = 6371 // Radius of the Earth in km
    const dLat = ((point2.lat - point1.lat) * Math.PI) / 180
    const dLon = ((point2.lng - point1.lng) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((point1.lat * Math.PI) / 180) *
        Math.cos((point2.lat * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = R * c // Distance in km
    return distance
  }

  // Function to open location in Google Maps
  const openInGoogleMaps = () => {
    let url = `https://www.google.com/maps/search/?api=1&query=${userLocation.lat},${userLocation.lng}`

    if (technicianLocation) {
      url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${technicianLocation.lat},${technicianLocation.lng}`
    }

    window.open(url, "_blank")
  }

  if (isLoading) {
    return (
      <div className="h-[300px] w-full rounded-md border flex items-center justify-center bg-muted">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <div ref={mapContainerRef} className="h-[300px] w-full rounded-md border overflow-hidden relative">
        <img src={mapUrl || "/placeholder.svg"} alt="Map showing location" className="w-full h-full object-cover" />

        <div className="absolute bottom-2 right-2 flex gap-2">
          <Button size="sm" onClick={openInGoogleMaps}>
            Open in Google Maps
          </Button>
        </div>
      </div>

      {technicianLocation && (
        <div className="bg-muted p-2 rounded-md text-sm">
          <p>
            <span className="font-medium">Distance:</span>{" "}
            {calculateDistance(userLocation, technicianLocation).toFixed(1)} km
          </p>
          <p>
            <span className="font-medium">Estimated arrival:</span> ~
            {Math.round(calculateDistance(userLocation, technicianLocation) / 0.5)} minutes
          </p>
        </div>
      )}
    </div>
  )
}
