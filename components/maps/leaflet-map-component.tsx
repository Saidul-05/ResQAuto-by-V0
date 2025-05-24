"use client"

import { useEffect, useRef, useState } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { Loader2 } from "lucide-react"

// Fix Leaflet default icon issues
const fixLeafletIcons = () => {
  delete L.Icon.Default.prototype._getIconUrl

  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "/leaflet/marker-icon-2x.png",
    iconUrl: "/leaflet/marker-icon.png",
    shadowUrl: "/leaflet/marker-shadow.png",
  })
}

interface LeafletMapComponentProps {
  userLocation: { lat: number; lng: number }
  technicianLocation?: { lat: number; lng: number }
  onRouteUpdate?: (routeInfo: { distance: string; duration: string }) => void
  readOnly?: boolean
}

export default function LeafletMapComponent({
  userLocation,
  technicianLocation,
  onRouteUpdate,
  readOnly = false,
}: LeafletMapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<L.Map | null>(null)
  const [userMarker, setUserMarker] = useState<L.Marker | null>(null)
  const [techMarker, setTechMarker] = useState<L.Marker | null>(null)
  const [routingControl, setRoutingControl] = useState<any | null>(null)
  const [isMapReady, setIsMapReady] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const mapInstanceRef = useRef<L.Map | null>(null)

  // Initialize map with a delay to ensure the container is ready
  useEffect(() => {
    if (!mapRef.current) return

    // Set a small delay to ensure the DOM is fully rendered
    const initTimer = setTimeout(() => {
      try {
        // Fix Leaflet icons
        fixLeafletIcons()

        // Check if map container has dimensions
        const container = mapRef.current
        if (!container) return

        if (container.clientHeight === 0 || container.clientWidth === 0) {
          console.warn("Map container has zero dimensions, delaying initialization")
          return
        }

        // Clean up any existing map instance
        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove()
        }

        // Create map with default view
        const leafletMap = L.map(container, {
          // Disable zoom and pan until we're sure the map is ready
          zoomControl: false,
          attributionControl: false,
        })

        // Store the map instance in the ref for cleanup
        mapInstanceRef.current = leafletMap

        // Add OpenStreetMap tile layer
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(leafletMap)

        // Set the view after a short delay to ensure the container is ready
        setTimeout(() => {
          try {
            leafletMap.setView([userLocation.lat, userLocation.lng], 14)

            // Now that the map is initialized, enable controls
            L.control.zoom().addTo(leafletMap)
            L.control.attribution().addTo(leafletMap)

            // Create user marker with blue icon
            const blueIcon = new L.Icon({
              iconUrl: "/leaflet/marker-icon.png",
              shadowUrl: "/leaflet/marker-shadow.png",
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
              shadowSize: [41, 41],
            })

            const newUserMarker = L.marker([userLocation.lat, userLocation.lng], {
              icon: blueIcon,
              draggable: !readOnly,
            })
              .addTo(leafletMap)
              .bindPopup("Your Location")

            // If marker is draggable, update location on dragend
            if (!readOnly) {
              newUserMarker.on("dragend", (e) => {
                const marker = e.target
                const position = marker.getLatLng()
                leafletMap.panTo(position)
              })
            }

            setMap(leafletMap)
            setUserMarker(newUserMarker)
            setIsMapReady(true)
            setIsLoading(false)
          } catch (error) {
            console.error("Error setting map view:", error)
            setIsLoading(false)
          }
        }, 100)
      } catch (error) {
        console.error("Error initializing map:", error)
        setIsLoading(false)
      }
    }, 300)

    // Cleanup function
    return () => {
      clearTimeout(initTimer)
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [userLocation.lat, userLocation.lng, readOnly]) // Re-initialize when userLocation changes

  // Update user marker position when userLocation changes and map is ready
  useEffect(() => {
    if (!isMapReady || !map || !userMarker) return

    try {
      userMarker.setLatLng([userLocation.lat, userLocation.lng])
      map.panTo([userLocation.lat, userLocation.lng])
    } catch (error) {
      console.error("Error updating user marker:", error)
    }
  }, [userLocation, map, userMarker, isMapReady])

  // Update technician marker and route when technicianLocation changes and map is ready
  useEffect(() => {
    if (!isMapReady || !map) return

    try {
      // Remove existing technician marker if it exists
      if (techMarker) {
        map.removeLayer(techMarker)
        setTechMarker(null)
      }

      // Create new technician marker if location is provided
      if (technicianLocation) {
        const redIcon = new L.Icon({
          iconUrl: "/leaflet/marker-icon.png", // Use default marker for now
          shadowUrl: "/leaflet/marker-shadow.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
        })

        const newTechMarker = L.marker([technicianLocation.lat, technicianLocation.lng], {
          icon: redIcon,
        })
          .addTo(map)
          .bindPopup("Technician")

        setTechMarker(newTechMarker)

        // Create route between user and technician
        if (typeof L.Routing !== "undefined") {
          createRoute(map, userLocation, technicianLocation)
        } else {
          console.warn("Leaflet Routing Machine not available")

          // Provide basic distance calculation
          if (onRouteUpdate) {
            const distance = calculateDistance(userLocation, technicianLocation)
            onRouteUpdate({
              distance: `${distance.toFixed(1)} km`,
              duration: "Unknown",
            })
          }
        }
      } else if (routingControl) {
        // Remove routing control if technician location is not provided
        map.removeControl(routingControl)
        setRoutingControl(null)
      }
    } catch (error) {
      console.error("Error updating technician marker:", error)
    }
  }, [technicianLocation, map, userLocation, isMapReady])

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

  // Create route between two points
  const createRoute = (map: L.Map, start: { lat: number; lng: number }, end: { lat: number; lng: number }) => {
    try {
      // Remove existing routing control if it exists
      if (routingControl) {
        map.removeControl(routingControl)
      }

      // Create new routing control if Leaflet Routing Machine is available
      if (typeof L.Routing !== "undefined") {
        const newRoutingControl = L.Routing.control({
          waypoints: [L.latLng(start.lat, start.lng), L.latLng(end.lat, end.lng)],
          routeWhileDragging: false,
          showAlternatives: false,
          fitSelectedRoutes: true,
          show: false, // Hide the routing instructions
          lineOptions: {
            styles: [{ color: "#ef4444", weight: 4, opacity: 0.7 }],
          },
          createMarker: () => null, // Don't create markers, we already have our own
        }).addTo(map)

        // Extract distance and ETA from route
        newRoutingControl.on("routesfound", (e: any) => {
          const routes = e.routes
          if (routes && routes.length > 0) {
            const summary = routes[0].summary

            // Calculate distance in km or miles
            const distanceInMeters = summary.totalDistance
            const distanceInKm = (distanceInMeters / 1000).toFixed(1)

            // Calculate ETA
            const timeInSeconds = summary.totalTime
            const minutes = Math.floor(timeInSeconds / 60)

            if (onRouteUpdate) {
              onRouteUpdate({
                distance: `${distanceInKm} km`,
                duration: `${minutes} min`,
              })
            }
          }
        })

        setRoutingControl(newRoutingControl)
      } else {
        // Fallback to basic distance calculation if routing machine is not available
        if (onRouteUpdate) {
          const distance = calculateDistance(start, end)
          onRouteUpdate({
            distance: `${distance.toFixed(1)} km`,
            duration: "Unknown",
          })
        }
      }
    } catch (error) {
      console.error("Error creating route:", error)

      // Fallback to basic distance calculation
      if (onRouteUpdate) {
        const distance = calculateDistance(start, end)
        onRouteUpdate({
          distance: `${distance.toFixed(1)} km`,
          duration: "Unknown",
        })
      }
    }
  }

  // Handle window resize to update map size
  useEffect(() => {
    const handleResize = () => {
      if (map) {
        map.invalidateSize()
      }
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [map])

  if (isLoading) {
    return (
      <div
        className="h-[300px] w-full rounded-md border flex items-center justify-center bg-muted"
        style={{ minHeight: "300px" }}
      >
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div
      ref={mapRef}
      className="h-[300px] w-full rounded-md border"
      style={{ minHeight: "300px", position: "relative" }}
    />
  )
}
