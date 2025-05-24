"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { toast } from "@/components/ui/use-toast"
import { AlertTriangle, Clock, Siren, Shield, Volume2, Vibrate, Bell, Timer, CheckCircle, XCircle } from "lucide-react"

interface UnresponsiveTestState {
  isRunning: boolean
  currentPhase: string
  countdown: number
  totalElapsed: number
  userResponded: boolean
  emergencyTriggered: boolean
  notifications: Array<{
    id: string
    title: string
    body: string
    timestamp: Date
    type: "critical" | "warning" | "info"
    persistent: boolean
    dismissed: boolean
  }>
  systemActions: Array<{
    action: string
    timestamp: Date
    automated: boolean
    critical: boolean
  }>
}

export function UnresponsiveUserTester() {
  const [testState, setTestState] = useState<UnresponsiveTestState>({
    isRunning: false,
    currentPhase: "idle",
    countdown: 15,
    totalElapsed: 0,
    userResponded: false,
    emergencyTriggered: false,
    notifications: [],
    systemActions: [],
  })

  const [audioEnabled, setAudioEnabled] = useState(true)
  const [vibrationEnabled, setVibrationEnabled] = useState(true)

  const phases = [
    {
      id: "impact",
      name: "Impact Detection",
      duration: 2,
      description: "Vehicle sensors detect severe impact",
      critical: true,
    },
    {
      id: "initial-alert",
      name: "Initial User Alert",
      duration: 3,
      description: "First attempt to get user attention",
      critical: true,
    },
    {
      id: "countdown",
      name: "Response Countdown",
      duration: 15,
      description: "15-second window for user response",
      critical: true,
    },
    {
      id: "escalation",
      name: "Emergency Escalation",
      duration: 5,
      description: "Automatic emergency services contact",
      critical: true,
    },
    {
      id: "emergency-dispatch",
      name: "Emergency Dispatch",
      duration: 8,
      description: "Emergency services and roadside assistance dispatched",
      critical: true,
    },
  ]

  const addNotification = (title: string, body: string, type: "critical" | "warning" | "info", persistent = false) => {
    const notification = {
      id: Date.now().toString(),
      title,
      body,
      timestamp: new Date(),
      type,
      persistent,
      dismissed: false,
    }

    setTestState((prev) => ({
      ...prev,
      notifications: [notification, ...prev.notifications.slice(0, 9)],
    }))

    // Browser notification
    if (Notification.permission === "granted") {
      const notif = new Notification(title, {
        body,
        icon: "/favicon.ico",
        requireInteraction: persistent,
        tag: `unresponsive-test-${notification.id}`,
        silent: !audioEnabled,
      })

      // Auto-close non-persistent notifications
      if (!persistent) {
        setTimeout(() => notif.close(), 5000)
      }
    }

    // Toast notification
    toast({
      title,
      description: body,
      variant: type === "critical" ? "destructive" : "default",
      duration: persistent ? undefined : 5000,
    })

    // Vibration for critical alerts
    if (vibrationEnabled && type === "critical" && "vibrate" in navigator) {
      navigator.vibrate([200, 100, 200, 100, 200])
    }
  }

  const addSystemAction = (action: string, automated = true, critical = false) => {
    setTestState((prev) => ({
      ...prev,
      systemActions: [
        {
          action,
          timestamp: new Date(),
          automated,
          critical,
        },
        ...prev.systemActions.slice(0, 19),
      ],
    }))
  }

  const startUnresponsiveTest = () => {
    setTestState({
      isRunning: true,
      currentPhase: "impact",
      countdown: 15,
      totalElapsed: 0,
      userResponded: false,
      emergencyTriggered: false,
      notifications: [],
      systemActions: [],
    })

    addSystemAction("Unresponsive user test initiated", true, false)
    addNotification(
      "🚨 TEST MODE: Impact Detected",
      "Simulating vehicle impact detection. User will NOT respond to test unresponsive scenario.",
      "critical",
      true,
    )
  }

  const simulateUserResponse = () => {
    if (testState.currentPhase === "countdown" && !testState.userResponded) {
      setTestState((prev) => ({ ...prev, userResponded: true }))
      addSystemAction("User responded during countdown", false, false)
      addNotification("✅ User Response Received", "User has responded - emergency escalation cancelled", "info")
    }
  }

  const stopTest = () => {
    setTestState({
      isRunning: false,
      currentPhase: "idle",
      countdown: 15,
      totalElapsed: 0,
      userResponded: false,
      emergencyTriggered: false,
      notifications: [],
      systemActions: [],
    })
  }

  // Main test timer
  useEffect(() => {
    if (!testState.isRunning) return

    const interval = setInterval(() => {
      setTestState((prev) => {
        const newElapsed = prev.totalElapsed + 0.1

        // Phase transitions based on elapsed time
        if (newElapsed >= 2 && prev.currentPhase === "impact") {
          addSystemAction("Impact detection complete - GPS location captured", true, true)
          addNotification(
            "⚠️ Are You OK?",
            "We detected a severe impact. Please respond within 15 seconds or emergency services will be contacted automatically.",
            "critical",
            true,
          )
          return { ...prev, currentPhase: "initial-alert", totalElapsed: newElapsed }
        }

        if (newElapsed >= 5 && prev.currentPhase === "initial-alert") {
          addSystemAction("Starting 15-second response countdown", true, true)
          addNotification(
            "⏰ URGENT: Respond Now",
            "15 seconds remaining to respond. Tap 'I'm OK' or emergency services will be contacted.",
            "critical",
            true,
          )
          return { ...prev, currentPhase: "countdown", totalElapsed: newElapsed }
        }

        if (newElapsed >= 20 && prev.currentPhase === "countdown" && !prev.userResponded) {
          addSystemAction("No user response - triggering emergency protocols", true, true)
          addNotification(
            "🚑 EMERGENCY SERVICES CONTACTED",
            "No response received. 911 has been called automatically. Emergency responders are being dispatched.",
            "critical",
            true,
          )
          return { ...prev, currentPhase: "escalation", emergencyTriggered: true, totalElapsed: newElapsed }
        }

        if (newElapsed >= 25 && prev.currentPhase === "escalation") {
          addSystemAction("Emergency services dispatched - ETA 8 minutes", true, true)
          addSystemAction("Emergency contacts notified via SMS and email", true, false)
          addSystemAction("Roadside assistance team dispatched", true, false)
          addNotification(
            "🚛 Emergency Response Dispatched",
            "Emergency services ETA: 8 minutes. Roadside assistance team also en route. Emergency contacts have been notified.",
            "warning",
          )
          return { ...prev, currentPhase: "emergency-dispatch", totalElapsed: newElapsed }
        }

        if (newElapsed >= 33 && prev.currentPhase === "emergency-dispatch") {
          addSystemAction("All emergency protocols activated - test complete", true, true)
          addNotification(
            "✅ Emergency Response Active",
            "All emergency protocols are now active. In a real scenario, help would be on the way.",
            "info",
          )
          return { ...prev, currentPhase: "complete", isRunning: false, totalElapsed: newElapsed }
        }

        // Update countdown during countdown phase
        if (prev.currentPhase === "countdown" && !prev.userResponded) {
          const remainingTime = Math.max(0, 20 - newElapsed)
          return { ...prev, countdown: Math.ceil(remainingTime), totalElapsed: newElapsed }
        }

        return { ...prev, totalElapsed: newElapsed }
      })
    }, 100)

    return () => clearInterval(interval)
  }, [testState.isRunning])

  // Escalating alerts during countdown
  useEffect(() => {
    if (testState.currentPhase === "countdown" && !testState.userResponded) {
      const remainingTime = testState.countdown

      // Escalating notifications
      if (remainingTime === 10) {
        addNotification(
          "⚠️ 10 SECONDS REMAINING",
          "Please respond immediately! Emergency services will be contacted in 10 seconds.",
          "critical",
          true,
        )
        if (vibrationEnabled && "vibrate" in navigator) {
          navigator.vibrate([300, 200, 300])
        }
      }

      if (remainingTime === 5) {
        addNotification(
          "🚨 5 SECONDS - FINAL WARNING",
          "FINAL WARNING: 5 seconds until automatic emergency contact!",
          "critical",
          true,
        )
        if (vibrationEnabled && "vibrate" in navigator) {
          navigator.vibrate([500, 300, 500, 300, 500])
        }
      }

      if (remainingTime === 1) {
        addNotification(
          "🚑 CONTACTING 911 NOW",
          "No response received. Contacting emergency services now...",
          "critical",
          true,
        )
      }
    }
  }, [testState.countdown, testState.currentPhase, testState.userResponded])

  const getCurrentPhase = () => {
    return phases.find((p) => p.id === testState.currentPhase)
  }

  const getPhaseProgress = () => {
    const phase = getCurrentPhase()
    if (!phase) return 0

    const phaseStartTimes = {
      impact: 0,
      "initial-alert": 2,
      countdown: 5,
      escalation: 20,
      "emergency-dispatch": 25,
    }

    const startTime = phaseStartTimes[phase.id as keyof typeof phaseStartTimes] || 0
    const elapsed = Math.max(0, testState.totalElapsed - startTime)
    return Math.min(100, (elapsed / phase.duration) * 100)
  }

  return (
    <div className="space-y-6">
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Timer className="h-6 w-6 text-red-500" />
            <span>Unresponsive User Scenario Test</span>
          </CardTitle>
          <CardDescription>
            Tests automatic emergency escalation when user fails to respond within 15 seconds after impact detection
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-orange-200 bg-orange-50">
            <AlertTriangle className="h-4 w-4 text-orange-500" />
            <AlertDescription className="text-orange-700">
              <strong>Scenario:</strong> This test simulates a user who is unconscious or unable to respond after a
              vehicle accident. The system will automatically escalate to emergency services.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Volume2 className="h-4 w-4" />
              <span className="text-sm">Audio Alerts:</span>
              <Button
                variant={audioEnabled ? "default" : "outline"}
                size="sm"
                onClick={() => setAudioEnabled(!audioEnabled)}
              >
                {audioEnabled ? "Enabled" : "Disabled"}
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Vibrate className="h-4 w-4" />
              <span className="text-sm">Vibration:</span>
              <Button
                variant={vibrationEnabled ? "default" : "outline"}
                size="sm"
                onClick={() => setVibrationEnabled(!vibrationEnabled)}
              >
                {vibrationEnabled ? "Enabled" : "Disabled"}
              </Button>
            </div>
          </div>

          <div className="flex space-x-2">
            {!testState.isRunning ? (
              <Button onClick={startUnresponsiveTest} variant="destructive" className="flex-1">
                <Timer className="mr-2 h-4 w-4" />
                Start Unresponsive User Test
              </Button>
            ) : (
              <>
                <Button onClick={simulateUserResponse} variant="outline" disabled={testState.userResponded}>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Simulate User Response
                </Button>
                <Button onClick={stopTest} variant="destructive">
                  <XCircle className="mr-2 h-4 w-4" />
                  Stop Test
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Current Phase Status */}
      {testState.isRunning && (
        <Card className={`border-l-4 ${getCurrentPhase()?.critical ? "border-l-red-500" : "border-l-blue-500"}`}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {testState.currentPhase === "countdown" ? (
                  <Clock className="h-5 w-5 text-red-500" />
                ) : testState.emergencyTriggered ? (
                  <Siren className="h-5 w-5 text-red-600" />
                ) : (
                  <Bell className="h-5 w-5 text-orange-500" />
                )}
                <span>{getCurrentPhase()?.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                {testState.currentPhase === "countdown" && (
                  <Badge variant="destructive" className="text-lg font-bold">
                    {testState.countdown}s
                  </Badge>
                )}
                <Badge variant={getCurrentPhase()?.critical ? "destructive" : "secondary"}>
                  {getCurrentPhase()?.critical ? "CRITICAL" : "STANDARD"}
                </Badge>
              </div>
            </CardTitle>
            <CardDescription>{getCurrentPhase()?.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span>Phase Progress</span>
                <span>{testState.totalElapsed.toFixed(1)}s elapsed</span>
              </div>
              <Progress value={getPhaseProgress()} className="w-full" />

              {testState.currentPhase === "countdown" && (
                <Alert className="border-red-200 bg-red-50">
                  <Clock className="h-4 w-4 text-red-500" />
                  <AlertDescription className="text-red-700">
                    <strong>No User Response:</strong> Emergency services will be contacted automatically in{" "}
                    <strong>{testState.countdown} seconds</strong> if no response is received.
                  </AlertDescription>
                </Alert>
              )}

              {testState.emergencyTriggered && (
                <Alert className="border-red-200 bg-red-50">
                  <Siren className="h-4 w-4 text-red-500" />
                  <AlertDescription className="text-red-700">
                    <strong>Emergency Protocols Activated:</strong> 911 has been contacted automatically due to no user
                    response.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Test Results Summary */}
      {testState.currentPhase === "complete" && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-green-700">
              <CheckCircle className="h-6 w-6" />
              <span>Unresponsive User Test Complete</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">15s</div>
                <div className="text-sm text-muted-foreground">Response Window</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">0s</div>
                <div className="text-sm text-muted-foreground">User Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">20s</div>
                <div className="text-sm text-muted-foreground">Emergency Contact Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{testState.totalElapsed.toFixed(1)}s</div>
                <div className="text-sm text-muted-foreground">Total Test Duration</div>
              </div>
            </div>

            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Test Result:</strong> Emergency protocols activated successfully when user failed to respond. In
                a real scenario, emergency services would be dispatched immediately.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}

      {/* Live Notifications */}
      {testState.notifications.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Live Notifications</span>
              <Badge variant="outline">{testState.notifications.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {testState.notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 border rounded-lg ${
                    notification.type === "critical"
                      ? "border-red-200 bg-red-50"
                      : notification.type === "warning"
                        ? "border-orange-200 bg-orange-50"
                        : "border-blue-200 bg-blue-50"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-sm">{notification.title}</span>
                        <Badge
                          variant={
                            notification.type === "critical"
                              ? "destructive"
                              : notification.type === "warning"
                                ? "secondary"
                                : "outline"
                          }
                          className="text-xs"
                        >
                          {notification.type}
                        </Badge>
                        {notification.persistent && (
                          <Badge variant="outline" className="text-xs">
                            Persistent
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{notification.body}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{notification.timestamp.toLocaleTimeString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* System Actions Log */}
      {testState.systemActions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>System Actions Log</span>
              <Badge variant="outline">{testState.systemActions.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {testState.systemActions.map((action, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        action.critical ? "bg-red-500" : action.automated ? "bg-blue-500" : "bg-green-500"
                      }`}
                    />
                    <span className="text-sm">{action.action}</span>
                    <div className="flex space-x-1">
                      {action.automated && (
                        <Badge variant="outline" className="text-xs">
                          Auto
                        </Badge>
                      )}
                      {action.critical && (
                        <Badge variant="destructive" className="text-xs">
                          Critical
                        </Badge>
                      )}
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{action.timestamp.toLocaleTimeString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
