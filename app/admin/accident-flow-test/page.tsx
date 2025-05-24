"use client"

import { AccidentDetectionFlowTester } from "@/components/emergency/accident-detection-flow-tester"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Car, Clock, AlertTriangle, Phone, Users } from "lucide-react"

export default function AccidentFlowTestPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center space-x-2">
        <Car className="h-6 w-6 text-red-500" />
        <h1 className="text-3xl font-bold">Vehicle Accident Detection Flow Test</h1>
      </div>

      <Alert className="border-red-200 bg-red-50">
        <AlertTriangle className="h-4 w-4 text-red-500" />
        <AlertDescription className="text-red-700">
          <strong>Comprehensive Testing:</strong> This test simulates the complete accident detection and emergency
          response workflow from impact detection to service completion. All emergency services contacts are simulated.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Clock className="h-5 w-5 text-blue-500" />
              <span>Response Timeline</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Impact Detection:</span>
              <Badge variant="destructive">0-2 sec</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">User Response Check:</span>
              <Badge variant="secondary">15 sec</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Emergency Services:</span>
              <Badge variant="destructive">Immediate</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Total Flow:</span>
              <Badge variant="outline">~2 minutes</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Phone className="h-5 w-5 text-red-500" />
              <span>Emergency Protocols</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center space-x-2">
              <Badge variant="destructive">Auto-911</Badge>
              <span className="text-sm">Automatic emergency call</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">Location</Badge>
              <span className="text-sm">GPS coordinates shared</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline">Medical</Badge>
              <span className="text-sm">Health assessment</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Users className="h-5 w-5 text-purple-500" />
              <span>Notifications Sent</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center space-x-2">
              <Badge variant="destructive">Emergency Services</Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">Emergency Contacts</Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline">Roadside Assistance</Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline">Insurance Company</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <AccidentDetectionFlowTester />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Flow Steps Overview</CardTitle>
            <CardDescription>Complete accident detection and response workflow</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <h4 className="font-semibold text-red-600">Critical Steps (Automatic)</h4>
              <ul className="text-sm space-y-1 text-muted-foreground ml-4">
                <li>• Impact detection via accelerometer</li>
                <li>• Emergency services contact (911)</li>
                <li>• GPS location sharing</li>
                <li>• Emergency contact notifications</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-blue-600">User Interaction Steps</h4>
              <ul className="text-sm space-y-1 text-muted-foreground ml-4">
                <li>• User responsiveness check</li>
                <li>• Medical condition assessment</li>
                <li>• Vehicle damage evaluation</li>
                <li>• Accident documentation</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Testing Scenarios</CardTitle>
            <CardDescription>Different accident scenarios and expected responses</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <h4 className="font-semibold">User Responsive</h4>
              <p className="text-sm text-muted-foreground">
                User responds "I'm OK" → Skip emergency services → Continue with assistance flow
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">User Needs Help</h4>
              <p className="text-sm text-muted-foreground">
                User responds "Need Help" → Emergency services contacted → Full emergency protocol
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">No Response</h4>
              <p className="text-sm text-muted-foreground">
                No response within 15 seconds → Automatic emergency services contact → Critical priority
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
