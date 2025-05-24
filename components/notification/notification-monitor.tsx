"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Monitor, Trash2, RefreshCw } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface NotificationEvent {
  id: string
  type: "permission" | "token" | "message" | "error" | "local"
  title: string
  message: string
  timestamp: Date
  data?: any
}

export function NotificationMonitor() {
  const [events, setEvents] = useState<NotificationEvent[]>([])
  const [isMonitoring, setIsMonitoring] = useState(false)

  useEffect(() => {
    if (!isMonitoring) return

    // Monitor notification permission changes
    const checkPermission = () => {
      if ("Notification" in window) {
        addEvent("permission", "Permission Status", `Current permission: ${Notification.permission}`)
      }
    }

    // Monitor service worker messages
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === "notification") {
        addEvent("message", "Service Worker Message", JSON.stringify(event.data))
      }
    }

    // Monitor console errors related to notifications
    const originalError = console.error
    console.error = (...args) => {
      const message = args.join(" ")
      if (message.toLowerCase().includes("notification") || message.toLowerCase().includes("fcm")) {
        addEvent("error", "Console Error", message)
      }
      originalError.apply(console, args)
    }

    // Set up listeners
    navigator.serviceWorker?.addEventListener("message", handleMessage)

    // Initial permission check
    checkPermission()

    // Periodic checks
    const interval = setInterval(checkPermission, 5000)

    return () => {
      clearInterval(interval)
      navigator.serviceWorker?.removeEventListener("message", handleMessage)
      console.error = originalError
    }
  }, [isMonitoring])

  const addEvent = (type: NotificationEvent["type"], title: string, message: string, data?: any) => {
    const event: NotificationEvent = {
      id: Date.now().toString(),
      type,
      title,
      message,
      timestamp: new Date(),
      data,
    }

    setEvents((prev) => [event, ...prev.slice(0, 49)]) // Keep last 50 events
  }

  const clearEvents = () => {
    setEvents([])
  }

  const toggleMonitoring = () => {
    setIsMonitoring(!isMonitoring)
    if (!isMonitoring) {
      addEvent("monitor", "Monitoring Started", "Real-time notification monitoring is now active")
    } else {
      addEvent("monitor", "Monitoring Stopped", "Real-time notification monitoring has been stopped")
    }
  }

  const getEventBadgeVariant = (type: NotificationEvent["type"]) => {
    switch (type) {
      case "permission":
        return "default"
      case "token":
        return "secondary"
      case "message":
        return "outline"
      case "error":
        return "destructive"
      case "local":
        return "default"
      default:
        return "outline"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Monitor className="h-5 w-5" />
            <span>Notification Monitor</span>
            {isMonitoring && (
              <Badge variant="default" className="animate-pulse">
                Live
              </Badge>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={clearEvents} disabled={events.length === 0}>
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button variant={isMonitoring ? "destructive" : "default"} size="sm" onClick={toggleMonitoring}>
              <RefreshCw className={`h-4 w-4 ${isMonitoring ? "animate-spin" : ""}`} />
              {isMonitoring ? "Stop" : "Start"}
            </Button>
          </div>
        </CardTitle>
        <CardDescription>Real-time monitoring of notification events and system status</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          {events.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              No events recorded yet. Start monitoring to see real-time notification events.
            </div>
          ) : (
            <div className="space-y-3">
              {events.map((event, index) => (
                <div key={event.id}>
                  <div className="flex items-start justify-between space-x-4">
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center space-x-2">
                        <Badge variant={getEventBadgeVariant(event.type)}>{event.type}</Badge>
                        <span className="font-medium text-sm">{event.title}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{event.message}</p>
                      {event.data && (
                        <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">
                          {JSON.stringify(event.data, null, 2)}
                        </pre>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {formatDistanceToNow(event.timestamp)} ago
                    </span>
                  </div>
                  {index < events.length - 1 && <Separator className="mt-3" />}
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
