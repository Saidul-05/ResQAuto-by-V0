"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

export interface AdItem {
  id: string
  title: string
  description?: string
  imageUrl: string
  linkUrl: string
  backgroundColor?: string
  textColor?: string
  position: "top" | "bottom" | "sidebar"
  dismissible?: boolean
}

interface AdBannerProps {
  ad: AdItem
  onClose?: () => void
  className?: string
}

export function AdBanner({ ad, onClose, className = "" }: AdBannerProps) {
  const [dismissed, setDismissed] = useState(false)
  const [impressionLogged, setImpressionLogged] = useState(false)

  // Check if this ad was previously dismissed
  useEffect(() => {
    const dismissedAds = JSON.parse(localStorage.getItem("dismissedAds") || "[]")
    if (dismissedAds.includes(ad.id)) {
      setDismissed(true)
    }
  }, [ad.id])

  // Log impression when ad is viewed
  useEffect(() => {
    if (!dismissed && !impressionLogged) {
      // In a real app, you would send an API request to log the impression
      console.log(`Ad impression logged: ${ad.id}`)
      setImpressionLogged(true)
    }
  }, [ad.id, dismissed, impressionLogged])

  const handleDismiss = () => {
    setDismissed(true)

    // Save dismissed state to localStorage
    const dismissedAds = JSON.parse(localStorage.getItem("dismissedAds") || "[]")
    dismissedAds.push(ad.id)
    localStorage.setItem("dismissedAds", JSON.stringify(dismissedAds))

    if (onClose) {
      onClose()
    }
  }

  const handleClick = () => {
    // In a real app, you would track ad clicks here
    console.log(`Ad clicked: ${ad.id}`)
  }

  if (dismissed) return null

  return (
    <Card
      className={`relative overflow-hidden ${className}`}
      style={{ backgroundColor: ad.backgroundColor || "#ffffff" }}
    >
      {ad.dismissible !== false && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-1 right-1 h-6 w-6 rounded-full opacity-70 hover:opacity-100 z-10"
          onClick={handleDismiss}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Dismiss</span>
        </Button>
      )}

      <a
        href={ad.linkUrl}
        onClick={handleClick}
        className="block p-4 flex items-center justify-center"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <img src={ad.imageUrl || "/placeholder.svg"} alt={ad.title} className="rounded-md max-h-[120px] w-auto" />
          <div className="text-center sm:text-left">
            <h3 className="font-medium text-lg" style={{ color: ad.textColor || "#000000" }}>
              {ad.title}
            </h3>
            {ad.description && (
              <p className="text-sm mt-1" style={{ color: ad.textColor ? `${ad.textColor}99` : "#00000099" }}>
                {ad.description}
              </p>
            )}
          </div>
        </div>
      </a>
    </Card>
  )
}
