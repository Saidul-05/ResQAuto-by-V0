// A robust geolocation service with fallbacks and error handling

type GeolocationResult = {
  success: boolean
  location?: { lat: number; lng: number }
  accuracy?: number
  error?: string
  errorCode?: number
}

// Default locations for major US cities as fallbacks
export const DEFAULT_LOCATIONS = [
  { name: "New York", lat: 40.7128, lng: -74.006 },
  { name: "Los Angeles", lat: 34.0522, lng: -118.2437 },
  { name: "Chicago", lat: 41.8781, lng: -87.6298 },
  { name: "Houston", lat: 29.7604, lng: -95.3698 },
  { name: "Phoenix", lat: 33.4484, lng: -112.074 },
]

// IP-based geolocation fallback (simulated)
const getLocationByIP = async (): Promise<GeolocationResult> => {
  try {
    // In a real implementation, this would call an IP geolocation service
    // For now, we'll just return a default location
    return {
      success: true,
      location: DEFAULT_LOCATIONS[0],
      accuracy: 5000, // Low accuracy (5km)
    }
  } catch (error) {
    console.error("IP geolocation error:", error)
    return {
      success: false,
      error: "Failed to get location from IP address",
    }
  }
}

// Browser geolocation with proper error handling
export const getCurrentPosition = (
  options: PositionOptions = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0,
  },
): Promise<GeolocationResult> => {
  return new Promise((resolve) => {
    // Check if we're in a browser environment
    if (typeof window === "undefined" || !navigator.geolocation) {
      resolve({
        success: false,
        error: "Geolocation is not supported in this environment",
      })
      return
    }

    // Try to get the current position
    try {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            success: true,
            location: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            accuracy: position.coords.accuracy,
          })
        },
        (error) => {
          console.warn("Geolocation error:", error.message)

          // Handle specific error types
          let errorMessage = "Unable to get your current location"

          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = "Location access was denied. Please check your browser settings."
              break
            case error.POSITION_UNAVAILABLE:
              errorMessage = "Location information is unavailable"
              break
            case error.TIMEOUT:
              errorMessage = "Location request timed out"
              break
          }

          resolve({
            success: false,
            error: errorMessage,
            errorCode: error.code,
          })
        },
        options,
      )
    } catch (e) {
      console.error("Unexpected geolocation error:", e)
      resolve({
        success: false,
        error: "An unexpected error occurred while getting your location",
      })
    }
  })
}

// Get location with fallbacks
export const getLocation = async (options?: PositionOptions): Promise<GeolocationResult> => {
  // Check if we're in a browser environment
  if (typeof window === "undefined") {
    return {
      success: true,
      location: DEFAULT_LOCATIONS[0],
      error: "Server-side rendering, using default location",
    }
  }

  // Try browser geolocation first
  const browserResult = await getCurrentPosition(options)

  if (browserResult.success) {
    return browserResult
  }

  // If browser geolocation fails, try IP-based geolocation
  console.log("Browser geolocation failed, trying IP-based geolocation")
  const ipResult = await getLocationByIP()

  if (ipResult.success) {
    return ipResult
  }

  // If all methods fail, return a default location
  console.log("All geolocation methods failed, using default location")
  return {
    success: true,
    location: DEFAULT_LOCATIONS[0],
    accuracy: 10000, // Very low accuracy (10km)
    error: "Using default location as fallback",
  }
}
