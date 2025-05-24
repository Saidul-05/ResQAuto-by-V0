"use client"

import { useState, useEffect } from "react"
import { AdBanner, type AdItem } from "./ad-banner"

interface AdsContainerProps {
  position: "top" | "bottom" | "sidebar"
  className?: string
}

export function AdsContainer({ position, className = "" }: AdsContainerProps) {
  const [ads, setAds] = useState<AdItem[]>([])
  const [currentAdIndex, setCurrentAdIndex] = useState(0)

  // Fetch ads from "API" (in this case, just a mock function)
  useEffect(() => {
    const fetchAds = async () => {
      // In a real app, this would be an API call
      const mockAds = getMockAds().filter((ad) => ad.position === position)
      setAds(mockAds)
    }

    fetchAds()
  }, [position])

  const handleAdClose = () => {
    // Rotate to next ad when one is closed
    setCurrentAdIndex((prev) => (prev + 1) % ads.length)
  }

  if (!ads.length) return null

  const currentAd = ads[currentAdIndex % ads.length]

  return (
    <div className={className}>
      <AdBanner ad={currentAd} onClose={handleAdClose} />
    </div>
  )
}

// Mock function to get ads
function getMockAds(): AdItem[] {
  return [
    {
      id: "homepage-top-1",
      title: "Special Offer: 20% off Premium Membership",
      description: "Limited time offer. Sign up today!",
      imageUrl: "/placeholder.svg?height=60&width=468",
      linkUrl: "/membership",
      backgroundColor: "#f0f9ff",
      textColor: "#0369a1",
      position: "top",
      dismissible: true,
    },
    {
      id: "homepage-top-2",
      title: "Download Our Mobile App",
      description: "Get roadside assistance at your fingertips",
      imageUrl: "/placeholder.svg?height=60&width=468",
      linkUrl: "/download-app",
      backgroundColor: "#fef2f2",
      textColor: "#b91c1c",
      position: "top",
      dismissible: true,
    },
    {
      id: "sidebar-promo-1",
      title: "Need emergency assistance?",
      description: "Call our 24/7 hotline",
      imageUrl: "/placeholder.svg?height=250&width=300",
      linkUrl: "/emergency",
      backgroundColor: "#fef2f2",
      textColor: "#b91c1c",
      position: "sidebar",
      dismissible: true,
    },
    {
      id: "homepage-bottom-1",
      title: "New service areas available!",
      description: "We've expanded our coverage",
      imageUrl: "/placeholder.svg?height=90&width=728",
      linkUrl: "/service-areas",
      backgroundColor: "#f0fdf4",
      textColor: "#166534",
      position: "bottom",
      dismissible: true,
    },
  ]
}
