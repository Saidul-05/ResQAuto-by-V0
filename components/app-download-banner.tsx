"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X, Download, Apple, Smartphone } from "lucide-react"
import Image from "next/image"

export function AppDownloadBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [platform, setPlatform] = useState<"ios" | "android" | "other">("other")

  useEffect(() => {
    // Check if the banner was previously dismissed
    const wasDismissed = localStorage.getItem("app-download-dismissed") === "true"
    setDismissed(wasDismissed)

    // Detect platform
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera || ""
    if (/android/i.test(userAgent)) {
      setPlatform("android")
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
      setPlatform("ios")
    }

    // Show banner after a delay if not previously dismissed
    if (!wasDismissed) {
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    setDismissed(true)
    localStorage.setItem("app-download-dismissed", "true")
  }

  const getAppLink = () => {
    if (platform === "ios") {
      return "https://apps.apple.com/app/roadrescue"
    } else if (platform === "android") {
      return "https://play.google.com/store/apps/details?id=com.roadrescue"
    }
    return "#download-app"
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 pointer-events-none">
      <Card className="pointer-events-auto shadow-lg border-primary/20 animate-fade-in-up">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <Image
                src="/placeholder.svg?height=60&width=60"
                alt="RoadRescue App"
                width={60}
                height={60}
                className="rounded-xl"
              />
            </div>
            <div>
              <h3 className="font-semibold text-base md:text-lg">Get the RoadRescue App</h3>
              <p className="text-sm text-muted-foreground">Faster emergency response and real-time tracking</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleDismiss} className="h-8 w-8 p-0">
              <X className="h-4 w-4" />
              <span className="sr-only">Dismiss</span>
            </Button>
            <Button asChild className="h-9 gap-1">
              <a href={getAppLink()}>
                {platform === "ios" ? (
                  <Apple className="h-4 w-4" />
                ) : platform === "android" ? (
                  <Smartphone className="h-4 w-4" />
                ) : (
                  <Download className="h-4 w-4" />
                )}
                <span>{platform === "other" ? "Download App" : "Get App"}</span>
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
