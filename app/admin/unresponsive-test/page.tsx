"use client"

import { UnresponsiveUserTester } from "@/components/emergency/unresponsive-user-tester"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Timer, AlertTriangle, Phone, Clock, Siren } from "lucide-react"

export default function UnresponsiveTestPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center space-x-2">
        <Timer className="h-6 w-6 text-red-500" />
        <h1 className="text-3xl font-bold">Unresponsive User Emergency Test</h1>
      </div>

      <Alert className="border-red-200 bg-red-50">
        <AlertTriangle className="h-4 w-4 text-red-500" />
        <AlertDescription className="text-red-700">
          <strong>Critical Scenario Testing:</strong> This test simulates what happens when a user is unconscious or
          unable to respond after a vehicle accident. All emergency contacts are simulated for safety.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Clock className="h-5 w-5 text-orange-500" />
              <span>Response Timeline</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Impact Detection:</span>
              <Badge variant="destructive">0-2 sec</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Initial Alert:</span>
              <Badge variant="secondary">2-5 sec</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Response Window:</span>
              <Badge variant="outline">15 sec</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Emergency Contact:</span>
              <Badge variant="destructive">20 sec</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Siren className="h-5 w-5 text-red-500" />
              <span>Escalation Triggers</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center space-x-2">
              <Badge variant="destructive">No Response</Badge>
              <span className="text-sm">15 seconds elapsed</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">Auto-911</Badge>
              <span className="text-sm">Immediate contact</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline">Location</Badge>
              <span className="text-sm">GPS transmitted</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Phone className="h-5 w-5 text-blue-500" />
              <span>Alert Escalation</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center space-x-2">
              <Badge variant="outline">10 sec</Badge>
              <span className="text-sm">Warning notification</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">5 sec</Badge>
              <span className="text-sm">Final warning</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="destructive">0 sec</Badge>
              <span className="text-sm">Emergency contact</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <UnresponsiveUserTester />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>What This Test Validates</CardTitle>
            <CardDescription>Critical safety features for unresponsive users</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <h4 className="font-semibold text-red-600">Automatic Emergency Contact</h4>
              <ul className="text-sm space-y-1 text-muted-foreground ml-4">
                <li>• 911 called automatically after 15 seconds</li>
                <li>• GPS location transmitted immediately</li>
                <li>• Vehicle and medical info shared</li>
                <li>• Emergency contacts notified</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-orange-600">Escalating Alert System</h4>
              <ul className="text-sm space-y-1 text-muted-foreground ml-4">
                <li>• Progressive notification intensity</li>
                <li>• Audio and vibration alerts</li>
                <li>• Persistent critical notifications</li>
                <li>• Multiple attempt strategies</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Expected Behavior</CardTitle>
            <CardDescription>What should happen in a real emergency</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <h4 className="font-semibold">Phase 1: Detection (0-2s)</h4>
              <p className="text-sm text-muted-foreground">
                Impact sensors trigger, GPS captured, initial assessment begins
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Phase 2: Alert (2-5s)</h4>
              <p className="text-sm text-muted-foreground">
                First user notification with clear response options and countdown
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Phase 3: Countdown (5-20s)</h4>
              <p className="text-sm text-muted-foreground">
                15-second window with escalating alerts and final warnings
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Phase 4: Emergency (20s+)</h4>
              <p className="text-sm text-muted-foreground">
                Automatic 911 contact, location sharing, emergency dispatch
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
