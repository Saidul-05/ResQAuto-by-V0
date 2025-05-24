"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, Siren, MapPin, Clock, Heart, Zap, Volume2, Vibrate } from "lucide-react"

interface EmergencyScenario {
  id: string
  name: string
  icon: React.ReactNode
  priority: "critical" | "high" | "urgent"
  description: string
  notifications: {
    title: string
    body: string
    requireInteraction: boolean
    silent: boolean
    vibrate?: number[]
    actions?: { action: string; title: string }[]
    data: Record<string, any>
  }[]
}

export function EmergencyNotificationTester() {
  const [isTestingEmergency, setIsTestingEmergency] = useState(false)
  const [permissionStatus, setPermissionStatus] = useState<NotificationPermission | "default">("default")
  const [emergencyLog, setEmergencyLog] = useState<
    Array<{
      scenario: string
      timestamp: Date
      status: "sent" | "failed"
      details: string
    }>
  >([])

  const emergencyScenarios: EmergencyScenario[] = [
    {
      id: "vehicle-accident",
      name: "Vehicle Accident",
      icon: <AlertTriangle className="h-5 w-5 text-red-500" />,
      priority: "critical",
      description: "Severe accident with potential injuries",
      notifications: [
        {
          title: "🚨 EMERGENCY: Accident Detected",
          body: "Severe impact detected. Emergency services are being contacted automatically.",
          requireInteraction: true,
          silent: false,
          vibrate: [200, 100, 200, 100, 200],
          actions: [
            { action: "confirm", title: "I'm OK" },
            { action: "help", title: "Need Help" },
          ],
          data: {
            type: "emergency",
            subtype: "accident",
            priority: "critical",
            autoContact911: true,
            location: "required",
          },
        },
        {
          title: "Emergency Services Contacted",
          body: "911 has been called. Emergency responders are en route to your location.",
          requireInteraction: true,
          silent: false,
          vibrate: [100, 50, 100],
          data: {
            type: "emergency",
            subtype: "services_contacted",
            priority: "critical",
          },
        },
        {
          title: "Emergency Contacts Notified",
          body: "Your emergency contacts have been automatically notified of the incident.",
          requireInteraction: false,
          silent: false,
          data: {
            type: "emergency",
            subtype: "contacts_notified",
            priority: "high",
          },
        },
      ],
    },
    {
      id: "medical-emergency",
      name: "Medical Emergency",
      icon: <Heart className="h-5 w-5 text-red-600" />,
      priority: "critical",
      description: "Medical emergency requiring immediate assistance",
      notifications: [
        {
          title: "🚑 MEDICAL EMERGENCY",
          body: "Medical emergency button activated. Contacting emergency medical services.",
          requireInteraction: true,
          silent: false,
          vibrate: [300, 100, 300, 100, 300],
          actions: [
            { action: "cancel", title: "Cancel" },
            { action: "confirm", title: "Confirm Emergency" },
          ],
          data: {
            type: "emergency",
            subtype: "medical",
            priority: "critical",
            autoContact911: true,
          },
        },
        {
          title: "EMS Dispatched",
          body: "Emergency Medical Services have been dispatched to your location. Stay calm.",
          requireInteraction: true,
          silent: false,
          data: {
            type: "emergency",
            subtype: "ems_dispatched",
            priority: "critical",
          },
        },
      ],
    },
    {
      id: "stranded-unsafe",
      name: "Stranded in Unsafe Location",
      icon: <MapPin className="h-5 w-5 text-orange-500" />,
      priority: "high",
      description: "Vehicle breakdown in potentially dangerous area",
      notifications: [
        {
          title: "⚠️ URGENT: Unsafe Location",
          body: "You're stranded in a potentially unsafe area. Priority assistance is being arranged.",
          requireInteraction: true,
          silent: false,
          vibrate: [150, 75, 150, 75, 150],
          actions: [
            { action: "safe", title: "I'm Safe" },
            { action: "unsafe", title: "Feel Unsafe" },
          ],
          data: {
            type: "emergency",
            subtype: "unsafe_location",
            priority: "high",
            expeditedService: true,
          },
        },
        {
          title: "Priority Service Dispatched",
          body: "High-priority technician dispatched. ETA: 10 minutes. Stay in vehicle with doors locked.",
          requireInteraction: false,
          silent: false,
          data: {
            type: "emergency",
            subtype: "priority_dispatch",
            priority: "high",
          },
        },
        {
          title: "Safety Check-in",
          body: "Please confirm you're still safe. Tap to respond or we'll contact emergency services.",
          requireInteraction: true,
          silent: false,
          vibrate: [100, 50, 100],
          actions: [
            { action: "safe", title: "Still Safe" },
            { action: "help", title: "Need Help" },
          ],
          data: {
            type: "emergency",
            subtype: "safety_checkin",
            priority: "high",
            timeout: 300, // 5 minutes
          },
        },
      ],
    },
    {
      id: "night-breakdown",
      name: "Night Emergency",
      icon: <Clock className="h-5 w-5 text-purple-500" />,
      priority: "urgent",
      description: "Vehicle breakdown during nighttime hours",
      notifications: [
        {
          title: "🌙 NIGHT EMERGENCY",
          body: "Night breakdown detected. Enhanced safety protocols activated.",
          requireInteraction: true,
          silent: false,
          vibrate: [100, 50, 100, 50, 100],
          actions: [
            { action: "safe", title: "I'm Safe" },
            { action: "concerned", title: "Safety Concern" },
          ],
          data: {
            type: "emergency",
            subtype: "night_breakdown",
            priority: "urgent",
            enhancedSafety: true,
          },
        },
        {
          title: "Night Service Technician",
          body: "Specialized night emergency technician dispatched. ETA: 15 minutes.",
          requireInteraction: false,
          silent: false,
          data: {
            type: "emergency",
            subtype: "night_service",
            priority: "urgent",
          },
        },
      ],
    },
    {
      id: "battery-fire",
      name: "Vehicle Fire Risk",
      icon: <Zap className="h-5 w-5 text-red-700" />,
      priority: "critical",
      description: "Potential vehicle fire or electrical hazard",
      notifications: [
        {
          title: "🔥 CRITICAL: Fire Risk Detected",
          body: "EVACUATE VEHICLE IMMEDIATELY. Move to safe distance. Fire department contacted.",
          requireInteraction: true,
          silent: false,
          vibrate: [500, 200, 500, 200, 500],
          actions: [
            { action: "evacuated", title: "Evacuated" },
            { action: "help", title: "Need Help" },
          ],
          data: {
            type: "emergency",
            subtype: "fire_risk",
            priority: "critical",
            autoContactFire: true,
            evacuationRequired: true,
          },
        },
        {
          title: "Fire Department En Route",
          body: "Fire department dispatched. Stay at least 50 feet from vehicle. Do not re-enter.",
          requireInteraction: true,
          silent: false,
          data: {
            type: "emergency",
            subtype: "fire_department",
            priority: "critical",
          },
        },
      ],
    },
  ]

  useEffect(() => {
    if ("Notification" in window) {
      setPermissionStatus(Notification.permission)
    }
  }, [])

  const addToEmergencyLog = (scenario: string, status: "sent" | "failed", details: string) => {
    setEmergencyLog((prev) => [
      { scenario, timestamp: new Date(), status, details },
      ...prev.slice(0, 9), // Keep last 10 entries
    ])
  }

  const testEmergencyScenario = async (scenario: EmergencyScenario) => {
    setIsTestingEmergency(true)

    // Check permissions first
    if (Notification.permission !== "granted") {
      const permission = await Notification.requestPermission()
      if (permission !== "granted") {
        toast({
          title: "Permission Required",
          description: "Emergency notifications require permission to function properly",
          variant: "destructive",
        })
        setIsTestingEmergency(false)
        return
      }
      setPermissionStatus("granted")
    }

    try {
      for (let i = 0; i < scenario.notifications.length; i++) {
        const notification = scenario.notifications[i]

        // Add delay between notifications (except first one)
        if (i > 0) {
          await new Promise((resolve) => setTimeout(resolve, 3000))
        }

        // Create notification with emergency styling
        const notificationOptions: NotificationOptions = {
          body: notification.body,
          icon: "/favicon.ico",
          badge: "🚨",
          tag: `emergency-${scenario.id}-${i}`,
          requireInteraction: notification.requireInteraction,
          silent: notification.silent,
          data: notification.data,
          // Note: vibrate and actions are not supported in all browsers
        }

        // Add visual urgency for critical notifications
        if (scenario.priority === "critical") {
          notificationOptions.icon =
            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDQgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSIjRkY0NDQ0Ii8+Cjwvc3ZnPgo="
        }

        const browserNotification = new Notification(notification.title, notificationOptions)

        // Handle notification click
        browserNotification.onclick = () => {
          console.log(`Emergency notification clicked: ${scenario.name}`)
          browserNotification.close()
        }

        // Auto-close non-critical notifications after 10 seconds
        if (!notification.requireInteraction) {
          setTimeout(() => {
            browserNotification.close()
          }, 10000)
        }

        addToEmergencyLog(scenario.name, "sent", `Notification ${i + 1}/${scenario.notifications.length}`)
      }

      // Test server-side emergency notification
      try {
        const response = await fetch("/api/send-notification", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: `emergency-test-${Date.now()}`,
            title: `🚨 ${scenario.name} - Server Test`,
            body: `Emergency scenario "${scenario.name}" tested via server API`,
            data: {
              type: "emergency",
              scenario: scenario.id,
              priority: scenario.priority,
              testMode: true,
            },
          }),
        })

        if (response.ok) {
          addToEmergencyLog(scenario.name, "sent", "Server notification successful")
        } else {
          addToEmergencyLog(scenario.name, "failed", "Server notification failed")
        }
      } catch (error) {
        addToEmergencyLog(scenario.name, "failed", `Server error: ${error}`)
      }

      toast({
        title: "Emergency Test Complete",
        description: `${scenario.name} scenario tested successfully`,
      })
    } catch (error) {
      addToEmergencyLog(scenario.name, "failed", `Error: ${error}`)
      toast({
        title: "Emergency Test Failed",
        description: "Failed to send emergency notifications",
        variant: "destructive",
      })
    }

    setIsTestingEmergency(false)
  }

  const testAllEmergencyScenarios = async () => {
    setIsTestingEmergency(true)

    for (const scenario of emergencyScenarios) {
      await testEmergencyScenario(scenario)
      // Wait between scenarios
      await new Promise((resolve) => setTimeout(resolve, 5000))
    }

    setIsTestingEmergency(false)
    toast({
      title: "All Emergency Tests Complete",
      description: "All emergency scenarios have been tested",
    })
  }

  const getPriorityBadge = (priority: string) => {
    const variants = {
      critical: "destructive",
      high: "secondary",
      urgent: "outline",
    } as const

    const colors = {
      critical: "bg-red-500",
      high: "bg-orange-500",
      urgent: "bg-yellow-500",
    }

    return (
      <Badge variant={variants[priority as keyof typeof variants]} className={colors[priority as keyof typeof colors]}>
        {priority.toUpperCase()}
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Siren className="h-6 w-6 text-red-500" />
            <span>Emergency Notification Testing</span>
          </CardTitle>
          <CardDescription>
            Test high-priority emergency alerts with realistic scenarios and critical notification features
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Emergency notifications use persistent alerts, vibration patterns, and require user interaction.
              Permission status: <Badge variant="outline">{permissionStatus}</Badge>
            </AlertDescription>
          </Alert>

          <div className="flex space-x-2">
            <Button
              onClick={testAllEmergencyScenarios}
              disabled={isTestingEmergency}
              variant="destructive"
              className="flex-1"
            >
              <Siren className="mr-2 h-4 w-4" />
              {isTestingEmergency ? "Testing All Scenarios..." : "Test All Emergency Scenarios"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {emergencyScenarios.map((scenario) => (
          <Card key={scenario.id} className="border-l-4 border-l-red-500">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2 text-lg">
                  {scenario.icon}
                  <span>{scenario.name}</span>
                </CardTitle>
                {getPriorityBadge(scenario.priority)}
              </div>
              <CardDescription>{scenario.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm space-y-1">
                <div className="flex items-center space-x-2">
                  <Volume2 className="h-4 w-4" />
                  <span>Notifications: {scenario.notifications.length}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Vibrate className="h-4 w-4" />
                  <span>Requires Interaction: {scenario.notifications.filter((n) => n.requireInteraction).length}</span>
                </div>
              </div>

              <Button
                onClick={() => testEmergencyScenario(scenario)}
                disabled={isTestingEmergency}
                variant="outline"
                className="w-full"
              >
                {isTestingEmergency ? "Testing..." : `Test ${scenario.name}`}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {emergencyLog.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Emergency Test Log</CardTitle>
            <CardDescription>Recent emergency notification test results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {emergencyLog.map((entry, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-2">
                    {entry.status === "sent" ? (
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                    ) : (
                      <div className="w-2 h-2 bg-red-500 rounded-full" />
                    )}
                    <span className="font-medium">{entry.scenario}</span>
                    <span className="text-sm text-muted-foreground">{entry.details}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{entry.timestamp.toLocaleTimeString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
