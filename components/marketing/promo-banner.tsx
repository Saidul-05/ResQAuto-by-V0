"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X, Clock } from "lucide-react"
import { useLocalStorage } from "react-use"

interface PromoBannerProps {
  title: string
  description: string
  ctaText: string
  ctaLink: string
  expiryDate?: Date
  id: string
}

export function PromoBanner({ title, description, ctaText, ctaLink, expiryDate, id }: PromoBannerProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [dismissed, setDismissed] = useLocalStorage(`promo-dismissed-${id}`, false)
  const [timeLeft, setTimeLeft] = useState<string | null>(null)

  useEffect(() => {
    // Show banner after a delay if not previously dismissed
    if (!dismissed) {
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [dismissed])

  useEffect(() => {
    if (!expiryDate) return

    const calculateTimeLeft = () => {
      const now = new Date()
      const difference = expiryDate.getTime() - now.getTime()

      if (difference <= 0) {
        setTimeLeft("Expired")
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))

      if (days > 0) {
        setTimeLeft(`${days}d ${hours}h left`)
      } else if (hours > 0) {
        setTimeLeft(`${hours}h ${minutes}m left`)
      } else {
        setTimeLeft(`${minutes}m left`)
      }
    }

    calculateTimeLeft()
    const interval = setInterval(calculateTimeLeft, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [expiryDate])

  const handleDismiss = () => {
    setIsVisible(false)
    setDismissed(true)
  }

  if (!isVisible) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-50 p-4 pointer-events-none">
      <Card className="pointer-events-auto shadow-lg border-primary/20 bg-primary text-primary-foreground animate-fade-in-down">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-base md:text-lg">{title}</h3>
            <p className="text-sm text-primary-foreground/80">{description}</p>
          </div>

          <div className="flex items-center gap-2 ml-4">
            {timeLeft && (
              <div className="hidden md:flex items-center text-xs font-medium bg-primary-foreground/20 px-2 py-1 rounded">
                <Clock className="mr-1 h-3 w-3" />
                {timeLeft}
              </div>
            )}

            <Button variant="secondary" size="sm" asChild className="whitespace-nowrap">
              <a href={ctaLink}>{ctaText}</a>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleDismiss}
              className="h-8 w-8 text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/20"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Dismiss</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
