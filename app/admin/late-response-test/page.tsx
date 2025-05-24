"use client"

import { LateResponseTester } from "@/components/emergency/late-response-tester"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Undo2, AlertTriangle, Phone, Clock, CheckCircle } from "lucide-react"

export default function LateResponseTestPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center space-x-2">
        <Undo2 className="h-6 w-6 text-orange-500" />
        <h1 className="text-3xl font-bold">Late Response Emergency Test</h1>
      </div>

      <Alert className="border-orange-200 bg-orange-50">
        <AlertTriangle className="h-4 w-4 text-orange-500" />
        <AlertDescription className="text-orange-700">
          <strong>Critical Scenario Testing:</strong> This test simulates what happens when a user responds AFTER
          emergency services have already been contacted. This requires careful handling to avoid false alarms while
          ensuring safety.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Clock className="h-5 w-5 text-red-500" />
              <span>Critical Timeline</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Impact Detection:</span>
              <Badge variant="destructive">0-2 sec</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Response Window:</span>
              <Badge variant="outline">15 sec</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Emergency Contact:</span>
              <Badge variant="destructive">20 sec</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Late Response:</span>
              <Badge variant="secondary">22-30 sec</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Phone className="h-5 w-5 text-orange-500" />
              <span>Cancellation Protocol</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center space-x-2">
              <Badge variant="warning">Step 1</Badge>
              <span className="text-sm">Detect late response</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">Step 2</Badge>
              <span className="text-sm">Contact emergency services</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline">Step 3</Badge>
              <span className="text-sm">Verify user identity</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="default">Step 4</Badge>
              <span className="text-sm">Cancel dispatch if safe</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Safety Measures</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center space-x-2">
              <Badge variant="outline">Identity</Badge>
              <span className="text-sm">Verify user identity</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">Follow-up</Badge>
              <span className="text-sm">Schedule safety call</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="default">Documentation</Badge>
              <span className="text-sm">Log all interactions</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <LateResponseTester />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Late Response Challenges</CardTitle>
            <CardDescription>Why this scenario is complex to handle</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <h4 className="font-semibold text-red-600">Emergency Services Already Dispatched</h4>
              <ul className="text-sm space-y-1 text-muted-foreground ml-4">
                <li>• 911 call has been made automatically</li>
                <li>• Emergency responders may be en route</li>
                <li>• Cancellation requires verification</li>
                <li>• False alarm prevention is critical</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-orange-600">Identity Verification Required</h4>
              <ul className="text-sm space-y-1 text-muted-foreground ml-4">
                <li>• Must confirm user is actually safe</li>
                <li>• Could be someone else using the device</li>
                <li>• Medical condition may affect responses</li>
                <li>• Security questions or callbacks needed</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Response Protocol</CardTitle>
            <CardDescription>How the system handles late responses</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <h4 className="font-semibold">Phase 1: Late Response Detection</h4>
              <p className="text-sm text-muted-foreground">
                System detects user response after emergency services contacted
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Phase 2: Verification Protocol</h4>
              <p className="text-sm text-muted-foreground">Identity verification and safety confirmation process</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Phase 3: Cancellation Attempt</h4>
              <p className="text-sm text-muted-foreground">
                Contact emergency services to cancel dispatch if verified safe
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Phase 4: Follow-up Safety Check</h4>
              <p className="text-sm text-muted-foreground">Schedule follow-up call to ensure continued safety</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
