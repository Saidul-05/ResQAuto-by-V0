"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { Loader2 } from "lucide-react"

// Dynamically import the map component with no SSR
const LeafletMapComponent = dynamic(() => import("./leaflet-map-component"), {
  ssr: false,
  loading: () => (
    <div className="h-[300px] w-full rounded-md border flex items-center justify-center bg-muted">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  ),
})

interface MapWrapperProps {
  userLocation: { lat: number; lng: number }
  technicianLocation?: { lat: number; lng: number }
  onRouteUpdate?: (routeInfo: { distance: string; duration: string }) => void
  readOnly?: boolean
}

export function MapWrapper(props: MapWrapperProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    // Load the leaflet CSS
    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
    link.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
    link.crossOrigin = ""
    document.head.appendChild(link)

    return () => {
      document.head.removeChild(link)
    }
  }, [])

  if (!isMounted) {
    return (
      <div className="h-[300px] w-full rounded-md border flex items-center justify-center bg-muted">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return <LeafletMapComponent {...props} />
}
