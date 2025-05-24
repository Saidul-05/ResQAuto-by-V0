"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { toast } from "@/components/ui/use-toast"
import {
  AlertTriangle,
  Clock,
  Siren,
  Shield,
  Phone,
  CheckCircle,
  XCircle,
  Timer,
  UserCheck,
  AlertCircle,
  Undo2,
} from "lucide-react"

interface LateResponseTestState {
  isRunning: boolean
  currentPhase: string
  countdown: number
  totalElapsed: number
  userResponded: boolean
  responseTime: number
  emergencyContacted: boolean
  emergencyCancelled: boolean
  notifications: Array<{
    id: string
    title: string
    body: string
    timestamp: Date
    type: "critical" | "warning" | "info" | "success"
    persistent: boolean
  }>
  systemActions: Array<{
    action: string
    timestamp: Date
    automated: boolean
    critical: boolean
    reversible: boolean
  }>
  emergencyStatus: {
    nineOneOneContacted: boolean
    dispatchCancelled: boolean
    verificationRequired: boolean
    followUpScheduled: boolean
  }
}

export function LateResponseTester() {
  const [testState, setTestState] = useState<LateResponseTestState>({
    isRunning: false,
    currentPhase: "idle",
    countdown: 15,
    totalElapsed: 0,
    userResponded: false,
    responseTime: 0,
    emergencyContacted: false,
    emergencyCancelled: false,
    notifications: [],
    systemActions: [],
    emergencyStatus: {
      nineOneOneContacted: false,
      dispatchCancelled: false,
      verificationRequired: false,
      followUpScheduled: false,
    },
  })

  const [responseDelay, setResponseDelay] = useState(25) // Default: respond 5 seconds after emergency contact

  const addNotification = (
    title: string,
    body: string,
    type: "critical" | "warning" | "info" | "success",
    persistent = false,
  ) => {
    const notification = {
      id: Date.now().toString(),
      title,
      body,
      timestamp: new Date(),
      type,
      persistent,
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
        tag: `late-response-test-${notification.id}`,
      })

      if (!persistent) {
        setTimeout(() => notif.close(), 5000)
      }
    }

    // Toast notification
    toast({
      title,
      description: body,
      variant: type === "critical" ? "destructive" : type === "success" ? "default" : "default",
      duration: persistent ? undefined : 5000,
    })
  }

  const addSystemAction = (action: string, automated = true, critical = false, reversible = false) => {
    setTestState((prev) => ({
      ...prev,
      systemActions: [
        {
          action,
          timestamp: new Date(),
          automated,
          critical,
          reversible,
        },
        ...prev.systemActions.slice(0, 19),
      ],
    }))
  }

  const startLateResponseTest = () => {
    setTestState({
      isRunning: true,
      currentPhase: "impact",
      countdown: 15,
      totalElapsed: 0,
      userResponded: false,
      responseTime: 0,
      emergencyContacted: false,
      emergencyCancelled: false,
      notifications: [],
      systemActions: [],
      emergencyStatus: {
        nineOneOneContacted: false,
        dispatchCancelled: false,
        verificationRequired: false,
        followUpScheduled: false,
      },
    })

    addSystemAction("Late response test initiated", true, false)
    addNotification(
      "🚨 TEST MODE: Impact Detected",
      `User will respond ${responseDelay - 20} seconds AFTER emergency services are contacted.`,
      "critical",
      true,
    )
  }

  const simulateUserResponse = () => {
    if (!testState.userResponded && testState.isRunning) {
      const responseTime = testState.totalElapsed
      setTestState((prev) => ({
        ...prev,
        userResponded: true,
        responseTime,
        currentPhase: "late-response-handling",
      }))

      addSystemAction(
        `User responded at ${responseTime.toFixed(1)}s (${(responseTime - 20).toFixed(1)}s after emergency contact)`,
        false,
        true,
      )

      if (testState.emergencyContacted) {
        // Late response after emergency services contacted
        addNotification(
          "⚠️ LATE RESPONSE DETECTED",
          "User has responded after emergency services were contacted. Initiating verification protocol.",
          "warning",
          true,
        )

        // Start verification process
        setTimeout(() => {
          addSystemAction("Initiating emergency cancellation protocol", true, true, true)
          addNotification(
            "📞 Contacting Emergency Services",
            "Attempting to cancel emergency dispatch. Verification required.",
            "info",
          )

          setTimeout(() => {
            setTestState((prev) => ({
              ...prev,
              emergencyStatus: {
                ...prev.emergencyStatus,
                verificationRequired: true,
              },
            }))

            addSystemAction("Emergency services contacted for cancellation", true, true)
            addNotification(
              "🔍 Identity Verification Required",
              "Please verify your identity and confirm you are safe. Emergency responders may still be dispatched for verification.",
              "warning",
              true,
            )
          }, 2000)

          setTimeout(() => {
            setTestState((prev) => ({
              ...prev,
              emergencyStatus: {
                ...prev.emergencyStatus,
                dispatchCancelled: true,
              },
            }))

            addSystemAction("Emergency dispatch successfully cancelled", true, false, true)
            addNotification(
              "✅ Emergency Dispatch Cancelled",
              "Emergency services have been notified of cancellation. A follow-up call will be made to verify your safety.",
              "success",
            )
          }, 4000)

          setTimeout(() => {
            setTestState((prev) => ({
              ...prev,
              emergencyStatus: {
                ...prev.emergencyStatus,
                followUpScheduled: true,
              },
              currentPhase: "verification-complete",
            }))

            addSystemAction("Follow-up safety verification scheduled", true, false)
            addNotification(
              "📞 Follow-up Scheduled",
              "A safety verification call will be made within 5 minutes to confirm your wellbeing.",
              "info",
            )
          }, 6000)
        }, 1000)
      } else {
        // Response before emergency services contacted
        addNotification("✅ User Response Received", "User has responded - emergency escalation cancelled", "success")
      }
    }
  }

  const stopTest = () => {
    setTestState({
      isRunning: false,
      currentPhase: "idle",
      countdown: 15,
      totalElapsed: 0,
      userResponded: false,
      responseTime: 0,
      emergencyContacted: false,
      emergencyCancelled: false,
      notifications: [],
      systemActions: [],
      emergencyStatus: {
        nineOneOneContacted: false,
        dispatchCancelled: false,
        verificationRequired: false,
        followUpScheduled: false,
      },
    })
  }

  // Main test timer
  useEffect(() => {
    if (!testState.isRunning) return

    const interval = setInterval(() => {
      setTestState((prev) => {
        const newElapsed = prev.totalElapsed + 0.1

        // Phase transitions
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
          return { ...prev, currentPhase: "countdown", totalElapsed: newElapsed }
        }

        if (newElapsed >= 20 && prev.currentPhase === "countdown" && !prev.userResponded) {
          addSystemAction("No user response - contacting emergency services", true, true)
          addNotification(
            "🚑 EMERGENCY SERVICES CONTACTED",
            "No response received. 911 has been called automatically. Emergency responders are being dispatched.",
            "critical",
            true,
          )
          return {
            ...prev,
            currentPhase: "emergency-contacted",
            emergencyContacted: true,
            emergencyStatus: { ...prev.emergencyStatus, nineOneOneContacted: true },
            totalElapsed: newElapsed,
          }
        }

        // Auto-trigger user response at specified delay
        if (newElapsed >= responseDelay && !prev.userResponded && prev.emergencyContacted) {
          // This will be handled by the simulateUserResponse function
          // We just update the phase here
          return { ...prev, totalElapsed: newElapsed }
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
  }, [testState.isRunning, responseDelay])

  // Auto-trigger user response at specified time
  useEffect(() => {
    if (testState.totalElapsed >= responseDelay && !testState.userResponded && testState.emergencyContacted) {
      simulateUserResponse()
    }
  }, [testState.totalElapsed, responseDelay, testState.userResponded, testState.emergencyContacted])

  const getCurrentPhase = () => {
    const phases = {
      impact: { name: "Impact Detection", critical: true },
      "initial-alert": { name: "Initial User Alert", critical: true },
      countdown: { name: "Response Countdown", critical: true },
      "emergency-contacted": { name: "Emergency Services Contacted", critical: true },
      "late-response-handling": { name: "Late Response Protocol", critical: false },
      "verification-complete": { name: "Verification Complete", critical: false },
    }
    return phases[testState.currentPhase as keyof typeof phases] || { name: "Unknown", critical: false }
  }

  return (
    <div className="space-y-6">
      <Card className="border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Undo2 className="h-6 w-6 text-orange-500" />
            <span>Late Response Scenario Test</span>
          </CardTitle>
          <CardDescription>
            Tests what happens when a user responds AFTER emergency services have already been contacted
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-orange-200 bg-orange-50">
            <AlertTriangle className="h-4 w-4 text-orange-500" />
            <AlertDescription className="text-orange-700">
              <strong>Scenario:</strong> User is initially unresponsive (unconscious/phone dropped), emergency services
              are contacted automatically, then user regains consciousness and responds late.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">User Response Timing</label>
              <div className="flex items-center space-x-2">
                <span className="text-sm">Respond at:</span>
                <Button
                  variant={responseDelay === 22 ? "default" : "outline"}
                  size="sm"
                  onClick={() => setResponseDelay(22)}
                >
                  22s (+2s)
                </Button>
                <Button
                  variant={responseDelay === 25 ? "default" : "outline"}
                  size="sm"
                  onClick={() => setResponseDelay(25)}
                >
                  25s (+5s)
                </Button>
                <Button
                  variant={responseDelay === 30 ? "default" : "outline"}
                  size="sm"
                  onClick={() => setResponseDelay(30)}
                >
                  30s (+10s)
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Emergency services contacted at 20s. User will respond {responseDelay - 20}s later.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Emergency Status</label>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-2 h-2 rounded-full ${testState.emergencyStatus.nineOneOneContacted ? "bg-red-500" : "bg-gray-300"}`}
                  />
                  <span className="text-sm">911 Contacted</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-2 h-2 rounded-full ${testState.emergencyStatus.dispatchCancelled ? "bg-green-500" : "bg-gray-300"}`}
                  />
                  <span className="text-sm">Dispatch Cancelled</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-2 h-2 rounded-full ${testState.emergencyStatus.verificationRequired ? "bg-yellow-500" : "bg-gray-300"}`}
                  />
                  <span className="text-sm">Verification Required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-2 h-2 rounded-full ${testState.emergencyStatus.followUpScheduled ? "bg-blue-500" : "bg-gray-300"}`}
                  />
                  <span className="text-sm">Follow-up Scheduled</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-2">
            {!testState.isRunning ? (
              <Button onClick={startLateResponseTest} variant="default" className="flex-1">
                <Timer className="mr-2 h-4 w-4" />
                Start Late Response Test
              </Button>
            ) : (
              <>
                <Button
                  onClick={simulateUserResponse}
                  variant="outline"
                  disabled={testState.userResponded}
                  className="flex-1"
                >
                  <UserCheck className="mr-2 h-4 w-4" />
                  Manual User Response
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
                ) : testState.emergencyContacted ? (
                  <Siren className="h-5 w-5 text-red-600" />
                ) : testState.userResponded ? (
                  <UserCheck className="h-5 w-5 text-green-500" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-orange-500" />
                )}
                <span>{getCurrentPhase()?.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                {testState.currentPhase === "countdown" && (
                  <Badge variant="destructive" className="text-lg font-bold">
                    {testState.countdown}s
                  </Badge>
                )}
                {testState.userResponded && (
                  <Badge variant="outline">Response: {testState.responseTime.toFixed(1)}s</Badge>
                )}
                <Badge variant={getCurrentPhase()?.critical ? "destructive" : "secondary"}>
                  {getCurrentPhase()?.critical ? "CRITICAL" : "STANDARD"}
                </Badge>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span>Test Progress</span>
                <span>{testState.totalElapsed.toFixed(1)}s elapsed</span>
              </div>
              <Progress value={Math.min(100, (testState.totalElapsed / 35) * 100)} className="w-full" />

              {testState.emergencyContacted && !testState.userResponded && (
                <Alert className="border-red-200 bg-red-50">
                  <Siren className="h-4 w-4 text-red-500" />
                  <AlertDescription className="text-red-700">
                    <strong>Emergency Services Contacted:</strong> 911 has been called. User will respond in{" "}
                    <strong>{Math.max(0, responseDelay - testState.totalElapsed).toFixed(1)} seconds</strong>.
                  </AlertDescription>
                </Alert>
              )}

              {testState.userResponded && testState.emergencyContacted && (
                <Alert className="border-orange-200 bg-orange-50">
                  <Undo2 className="h-4 w-4 text-orange-500" />
                  <AlertDescription className="text-orange-700">
                    <strong>Late Response Detected:</strong> User responded {(testState.responseTime - 20).toFixed(1)}{" "}
                    seconds after emergency services were contacted. Initiating cancellation protocol.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Test Results Summary */}
      {testState.currentPhase === "verification-complete" && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-blue-700">
              <CheckCircle className="h-6 w-6" />
              <span>Late Response Test Complete</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">20s</div>
                <div className="text-sm text-muted-foreground">Emergency Contact Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{testState.responseTime.toFixed(1)}s</div>
                <div className="text-sm text-muted-foreground">User Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{(testState.responseTime - 20).toFixed(1)}s</div>
                <div className="text-sm text-muted-foreground">Response Delay</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {testState.emergencyStatus.dispatchCancelled ? "✓" : "✗"}
                </div>
                <div className="text-sm text-muted-foreground">Dispatch Cancelled</div>
              </div>
            </div>

            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Test Result:</strong> Late response protocol executed successfully. Emergency dispatch was
                cancelled and follow-up verification was scheduled to ensure user safety.
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
              <Phone className="h-5 w-5" />
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
                        : notification.type === "success"
                          ? "border-green-200 bg-green-50"
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
                                : notification.type === "success"
                                  ? "default"
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
                      {action.reversible && (
                        <Badge variant="secondary" className="text-xs">
                          Reversible
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
