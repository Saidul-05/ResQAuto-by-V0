"use client"

import { EmergencyNotificationTester } from "@/components/emergency/emergency-notification-tester"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Shield, Clock, Phone } from "lucide-react"

export default function EmergencyTestingPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center space-x-2">
        <AlertTriangle className="h-6 w-6 text-red-500" />
        <h1 className="text-3xl font-bold">Emergency Notification Testing</h1>
      </div>

      <Alert className="border-red-200 bg-red-50">
        <AlertTriangle className="h-4 w-4 text-red-500" />
        <AlertDescription className="text-red-700">
          <strong>Important:</strong> This page tests emergency notification systems. These are high-priority alerts
          designed for life-threatening situations. Test responsibly and ensure your device volume is appropriate.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Shield className="h-5 w-5 text-green-500" />
              <span>Safety Features</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center space-x-2">
              <Badge variant="outline">Auto-911</Badge>
              <span className="text-sm">Automatic emergency services</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline">Location</Badge>
              <span className="text-sm">GPS location sharing</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline">Contacts</Badge>
              <span className="text-sm">Emergency contact alerts</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Clock className="h-5 w-5 text-blue-500" />
              <span>Response Times</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Critical:</span>
              <Badge variant="destructive">Immediate</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">High Priority:</span>
              <Badge variant="secondary">{"< 5 min"}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Urgent:</span>
              <Badge variant="outline">{"< 15 min"}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Phone className="h-5 w-5 text-purple-500" />
              <span>Notification Types</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center space-x-2">
              <Badge variant="destructive">Persistent</Badge>
              <span className="text-sm">Requires interaction</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">Vibration</Badge>
              <span className="text-sm">Haptic feedback</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline">Actions</Badge>
              <span className="text-sm">Quick response buttons</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <EmergencyNotificationTester />

      <Card>
        <CardHeader>
          <CardTitle>Emergency Testing Guidelines</CardTitle>
          <CardDescription>Important information about emergency notification testing</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">What Gets Tested:</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Persistent notification behavior</li>
                <li>• High-priority visual styling</li>
                <li>• Vibration patterns (mobile)</li>
                <li>• User interaction requirements</li>
                <li>• Auto-retry mechanisms</li>
                <li>• Server-side emergency APIs</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Safety Considerations:</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Tests do NOT contact real emergency services</li>
                <li>• No actual 911 calls are made</li>
                <li>• Emergency contacts are not notified</li>
                <li>• Location data is simulated</li>
                <li>• All tests are clearly marked as "TEST"</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
