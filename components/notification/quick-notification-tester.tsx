"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Bell, Zap } from "lucide-react"

export function QuickNotificationTester() {
  const [title, setTitle] = useState("Quick Test")
  const [message, setMessage] = useState("This is a quick notification test")

  const sendQuickNotification = async () => {
    if (Notification.permission !== "granted") {
      const permission = await Notification.requestPermission()
      if (permission !== "granted") {
        toast({
          title: "Permission Required",
          description: "Please allow notifications to test this feature",
          variant: "destructive",
        })
        return
      }
    }

    try {
      new Notification(title, {
        body: message,
        icon: "/favicon.ico",
        badge: "🚗",
      })

      toast({
        title: "Success",
        description: "Quick notification sent!",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send notification",
        variant: "destructive",
      })
    }
  }

  const testScenarios = [
    {
      title: "Service Request Confirmed",
      message: "Your roadside assistance request has been confirmed. ETA: 15 minutes.",
    },
    {
      title: "Technician En Route",
      message: "John (Mechanic) is heading to your location. Vehicle: Blue Ford Transit",
    },
    {
      title: "Emergency Alert",
      message: "Emergency services notified. Stay safe, help is coming!",
    },
    {
      title: "Service Complete",
      message: "Your vehicle is ready! Please rate your experience.",
    },
  ]

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Zap className="h-5 w-5" />
          <span>Quick Notification Test</span>
        </CardTitle>
        <CardDescription>Test notifications quickly with pre-built scenarios</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="quick-title">Title</Label>
          <Input
            id="quick-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Notification title"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="quick-message">Message</Label>
          <Input
            id="quick-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Notification message"
          />
        </div>

        <Button onClick={sendQuickNotification} className="w-full">
          <Bell className="mr-2 h-4 w-4" />
          Send Test Notification
        </Button>

        <div className="space-y-2">
          <Label>Quick Scenarios</Label>
          <div className="grid grid-cols-1 gap-2">
            {testScenarios.map((scenario, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => {
                  setTitle(scenario.title)
                  setMessage(scenario.message)
                }}
                className="text-left justify-start h-auto p-2"
              >
                <div>
                  <div className="font-medium text-sm">{scenario.title}</div>
                  <div className="text-xs text-muted-foreground truncate">{scenario.message}</div>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
