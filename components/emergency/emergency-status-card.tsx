"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Clock, MapPin, Phone, MessageSquare } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface EmergencyStatusCardProps {
  status: "pending" | "accepted" | "dispatched" | "arriving" | "completed"
  serviceType: string
  requestTime: string
  estimatedArrival?: string
  technician?: {
    name: string
    phone: string
    image: string
    rating: number
  }
  location?: string
}

export function EmergencyStatusCard({
  status,
  serviceType,
  requestTime,
  estimatedArrival,
  technician,
  location,
}: EmergencyStatusCardProps) {
  const [progress, setProgress] = useState(0)

  // Calculate progress based on status
  useEffect(() => {
    switch (status) {
      case "pending":
        setProgress(10)
        break
      case "accepted":
        setProgress(30)
        break
      case "dispatched":
        setProgress(60)
        break
      case "arriving":
        setProgress(90)
        break
      case "completed":
        setProgress(100)
        break
      default:
        setProgress(0)
    }
  }, [status])

  const getStatusBadge = () => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary">Pending</Badge>
      case "accepted":
        return <Badge variant="warning">Accepted</Badge>
      case "dispatched":
        return <Badge variant="primary">Dispatched</Badge>
      case "arriving":
        return <Badge variant="success">Arriving</Badge>
      case "completed":
        return <Badge variant="outline">Completed</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <Card className="overflow-hidden">
      <div className="bg-muted h-2">
        <Progress value={progress} className="h-2" />
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">{serviceType}</CardTitle>
          {getStatusBadge()}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-2">
          <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
          <div>
            <p className="text-sm font-medium">Requested at</p>
            <p className="text-sm text-muted-foreground">{requestTime}</p>
          </div>
        </div>

        {estimatedArrival && (
          <div className="flex items-start gap-2">
            <Clock className="h-4 w-4 text-primary mt-0.5" />
            <div>
              <p className="text-sm font-medium">Estimated arrival</p>
              <p className="text-sm text-primary font-medium">{estimatedArrival}</p>
            </div>
          </div>
        )}

        {location && (
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-sm font-medium">Location</p>
              <p className="text-sm text-muted-foreground">{location}</p>
            </div>
          </div>
        )}

        {technician && (
          <div className="border-t pt-4 mt-4">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 rounded-full overflow-hidden">
                <Image
                  src={technician.image || "/placeholder.svg"}
                  alt={technician.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-medium">{technician.name}</p>
                <div className="flex items-center">
                  <span className="text-xs text-yellow-500">★</span>
                  <span className="text-xs ml-1">{technician.rating}/5</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-3">
              <Button variant="outline" size="sm" className="flex-1" asChild>
                <a href={`tel:${technician.phone}`}>
                  <Phone className="h-3 w-3 mr-1" />
                  Call
                </a>
              </Button>
              <Button variant="outline" size="sm" className="flex-1" asChild>
                <Link href="/service-tracking/chat">
                  <MessageSquare className="h-3 w-3 mr-1" />
                  Chat
                </Link>
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
