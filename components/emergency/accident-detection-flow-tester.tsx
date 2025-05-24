"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { toast } from "@/components/ui/use-toast"
import {
  AlertTriangle,
  Car,
  Phone,
  MapPin,
  Clock,
  Heart,
  Shield,
  CheckCircle,
  Loader2,
  Siren,
  Users,
  FileText,
} from "lucide-react"

interface AccidentFlowStep {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  duration: number // seconds
  critical: boolean
  autoTrigger: boolean
  userAction?: string
  notifications: {
    title: string
    body: string
    type: "critical" | "high" | "normal"
    requireInteraction: boolean
    actions?: { action: string; title: string }[]
  }[]
  systemActions: string[]
}

interface FlowState {
  currentStep: number
  isRunning: boolean
  isPaused: boolean
  userResponses: Record<string, string>
  startTime: Date | null
  stepStartTime: Date | null
  completedSteps: string[]
  emergencyContacted: boolean
  locationShared: boolean
}

export function AccidentDetectionFlowTester() {
  const [flowState, setFlowState] = useState<FlowState>({
    currentStep: -1,
    isRunning: false,
    isPaused: false,
    userResponses: {},
    startTime: null,
    stepStartTime: null,
    completedSteps: [],
    emergencyContacted: false,
    locationShared: false,
  })

  const [stepProgress, setStepProgress] = useState(0)
  const [flowLog, setFlowLog] = useState<
    Array<{
      step: string
      action: string
      timestamp: Date
      duration?: number
      userResponse?: string
    }>
  >([])

  const accidentFlowSteps: AccidentFlowStep[] = [
    {
      id: "impact-detection",
      name: "Impact Detection",
      description: "Accelerometer detects sudden deceleration indicating collision",
      icon: <Car className="h-5 w-5 text-red-500" />,
      duration: 2,
      critical: true,
      autoTrigger: true,
      notifications: [
        {
          title: "🚨 IMPACT DETECTED",
          body: "Severe impact detected by vehicle sensors. Checking if you need assistance...",
          type: "critical",
          requireInteraction: false,
        },
      ],
      systemActions: [
        "Accelerometer data analyzed",
        "Impact severity calculated",
        "GPS location captured",
        "Vehicle diagnostics initiated",
      ],
    },
    {
      id: "user-response-check",
      name: "User Response Check",
      description: "System checks if user is responsive and able to interact",
      icon: <Heart className="h-5 w-5 text-orange-500" />,
      duration: 15,
      critical: true,
      autoTrigger: false,
      userAction: "Respond within 15 seconds",
      notifications: [
        {
          title: "Are You OK?",
          body: "We detected an impact. Please respond within 15 seconds or emergency services will be contacted.",
          type: "critical",
          requireInteraction: true,
          actions: [
            { action: "ok", title: "I'm OK" },
            { action: "help", title: "Need Help" },
            { action: "injured", title: "I'm Injured" },
          ],
        },
      ],
      systemActions: [
        "15-second countdown initiated",
        "User interaction monitoring",
        "Backup emergency protocols prepared",
      ],
    },
    {
      id: "emergency-services",
      name: "Emergency Services Contact",
      description: "Automatic contact with 911 if no response or help requested",
      icon: <Phone className="h-5 w-5 text-red-600" />,
      duration: 5,
      critical: true,
      autoTrigger: true,
      notifications: [
        {
          title: "🚑 EMERGENCY SERVICES CONTACTED",
          body: "911 has been called automatically. Emergency responders are being dispatched to your location.",
          type: "critical",
          requireInteraction: true,
        },
      ],
      systemActions: [
        "911 emergency call initiated",
        "Location data transmitted",
        "Vehicle information shared",
        "Medical information accessed",
      ],
    },
    {
      id: "location-sharing",
      name: "Location Sharing",
      description: "Precise GPS coordinates shared with emergency services",
      icon: <MapPin className="h-5 w-5 text-blue-500" />,
      duration: 3,
      critical: true,
      autoTrigger: true,
      notifications: [
        {
          title: "📍 Location Shared",
          body: "Your precise location has been shared with emergency services and roadside assistance.",
          type: "high",
          requireInteraction: false,
        },
      ],
      systemActions: [
        "GPS coordinates captured",
        "Address geocoded",
        "Nearest hospital identified",
        "Emergency services updated",
      ],
    },
    {
      id: "emergency-contacts",
      name: "Emergency Contacts Notification",
      description: "Automatic notification of pre-configured emergency contacts",
      icon: <Users className="h-5 w-5 text-purple-500" />,
      duration: 4,
      critical: false,
      autoTrigger: true,
      notifications: [
        {
          title: "Emergency Contacts Notified",
          body: "Your emergency contacts have been automatically notified of the accident.",
          type: "normal",
          requireInteraction: false,
        },
      ],
      systemActions: [
        "Emergency contact list accessed",
        "SMS notifications sent",
        "Email alerts dispatched",
        "Contact confirmation tracking",
      ],
    },
    {
      id: "medical-assessment",
      name: "Medical Assessment",
      description: "Quick medical questionnaire if user is responsive",
      icon: <Heart className="h-5 w-5 text-red-400" />,
      duration: 30,
      critical: false,
      autoTrigger: false,
      userAction: "Answer medical questions",
      notifications: [
        {
          title: "Medical Assessment",
          body: "Please answer a few quick questions about your condition to help emergency responders.",
          type: "high",
          requireInteraction: true,
          actions: [
            { action: "conscious", title: "Fully Conscious" },
            { action: "dizzy", title: "Dizzy/Confused" },
            { action: "pain", title: "In Pain" },
            { action: "bleeding", title: "Bleeding" },
          ],
        },
      ],
      systemActions: [
        "Medical questionnaire presented",
        "Responses recorded",
        "Severity assessment calculated",
        "EMS priority level determined",
      ],
    },
    {
      id: "vehicle-assessment",
      name: "Vehicle Damage Assessment",
      description: "Assessment of vehicle damage and safety status",
      icon: <Car className="h-5 w-5 text-yellow-500" />,
      duration: 10,
      critical: false,
      autoTrigger: false,
      userAction: "Report vehicle condition",
      notifications: [
        {
          title: "Vehicle Safety Check",
          body: "Please assess your vehicle's condition for safety and towing requirements.",
          type: "normal",
          requireInteraction: true,
          actions: [
            { action: "drivable", title: "Vehicle Drivable" },
            { action: "damaged", title: "Damaged, Not Drivable" },
            { action: "hazard", title: "Safety Hazard" },
          ],
        },
      ],
      systemActions: [
        "Vehicle diagnostics reviewed",
        "Damage assessment recorded",
        "Towing requirements determined",
        "Safety hazard evaluation",
      ],
    },
    {
      id: "roadside-dispatch",
      name: "Roadside Assistance Dispatch",
      description: "Specialized accident response team dispatched",
      icon: <Shield className="h-5 w-5 text-green-500" />,
      duration: 8,
      critical: false,
      autoTrigger: true,
      notifications: [
        {
          title: "🚛 Accident Response Team Dispatched",
          body: "Specialized accident response team is en route. ETA: 12 minutes.",
          type: "normal",
          requireInteraction: false,
        },
      ],
      systemActions: [
        "Nearest accident response team located",
        "Team dispatched with ETA",
        "Equipment requirements assessed",
        "Traffic management coordinated",
      ],
    },
    {
      id: "documentation",
      name: "Accident Documentation",
      description: "Digital accident report and photo documentation",
      icon: <FileText className="h-5 w-5 text-blue-600" />,
      duration: 20,
      critical: false,
      autoTrigger: false,
      userAction: "Complete accident report",
      notifications: [
        {
          title: "📋 Accident Documentation",
          body: "Please complete the digital accident report for insurance and legal purposes.",
          type: "normal",
          requireInteraction: true,
          actions: [
            { action: "start", title: "Start Report" },
            { action: "photos", title: "Take Photos" },
            { action: "later", title: "Complete Later" },
          ],
        },
      ],
      systemActions: [
        "Digital accident report initiated",
        "Photo upload system activated",
        "Insurance notification prepared",
        "Legal documentation started",
      ],
    },
    {
      id: "completion",
      name: "Response Complete",
      description: "All emergency and assistance protocols completed",
      icon: <CheckCircle className="h-5 w-5 text-green-600" />,
      duration: 2,
      critical: false,
      autoTrigger: true,
      notifications: [
        {
          title: "✅ Emergency Response Complete",
          body: "All emergency protocols have been completed. Stay safe and follow up with medical care if needed.",
          type: "normal",
          requireInteraction: false,
        },
      ],
      systemActions: [
        "All systems confirmed operational",
        "Emergency response logged",
        "Follow-up care scheduled",
        "Insurance claim initiated",
      ],
    },
  ]

  const addToFlowLog = (step: string, action: string, userResponse?: string, duration?: number) => {
    setFlowLog((prev) => [
      { step, action, timestamp: new Date(), userResponse, duration },
      ...prev.slice(0, 19), // Keep last 20 entries
    ])
  }

  const startAccidentFlow = () => {
    setFlowState({
      currentStep: 0,
      isRunning: true,
      isPaused: false,
      userResponses: {},
      startTime: new Date(),
      stepStartTime: new Date(),
      completedSteps: [],
      emergencyContacted: false,
      locationShared: false,
    })
    setStepProgress(0)
    setFlowLog([])
    addToFlowLog("System", "Accident detection flow initiated")
  }

  const handleUserResponse = (action: string, value: string) => {
    setFlowState((prev) => ({
      ...prev,
      userResponses: { ...prev.userResponses, [action]: value },
    }))
    addToFlowLog(accidentFlowSteps[flowState.currentStep]?.name || "Unknown", `User response: ${action}`, value)

    // Special handling for critical responses
    if (action === "help" || action === "injured") {
      setFlowState((prev) => ({ ...prev, emergencyContacted: true }))
    }
  }

  const nextStep = () => {
    if (flowState.currentStep < accidentFlowSteps.length - 1) {
      const currentStep = accidentFlowSteps[flowState.currentStep]
      const stepDuration = flowState.stepStartTime
        ? (new Date().getTime() - flowState.stepStartTime.getTime()) / 1000
        : 0

      addToFlowLog(currentStep.name, "Step completed", undefined, stepDuration)

      setFlowState((prev) => ({
        ...prev,
        currentStep: prev.currentStep + 1,
        stepStartTime: new Date(),
        completedSteps: [...prev.completedSteps, currentStep.id],
      }))
      setStepProgress(0)
    } else {
      // Flow complete
      setFlowState((prev) => ({ ...prev, isRunning: false }))
      addToFlowLog("System", "Accident detection flow completed")
      toast({
        title: "Accident Flow Complete",
        description: "All emergency response protocols have been tested successfully",
      })
    }
  }

  const pauseFlow = () => {
    setFlowState((prev) => ({ ...prev, isPaused: !prev.isPaused }))
  }

  const stopFlow = () => {
    setFlowState({
      currentStep: -1,
      isRunning: false,
      isPaused: false,
      userResponses: {},
      startTime: null,
      stepStartTime: null,
      completedSteps: [],
      emergencyContacted: false,
      locationShared: false,
    })
    setStepProgress(0)
    addToFlowLog("System", "Accident detection flow stopped by user")
  }

  // Auto-progress timer for current step
  useEffect(() => {
    if (!flowState.isRunning || flowState.isPaused || flowState.currentStep === -1) return

    const currentStep = accidentFlowSteps[flowState.currentStep]
    if (!currentStep) return

    const interval = setInterval(() => {
      setStepProgress((prev) => {
        const newProgress = prev + 100 / (currentStep.duration * 10) // Update every 100ms
        if (newProgress >= 100) {
          // Auto-advance if it's an auto-trigger step or user hasn't responded
          if (currentStep.autoTrigger || !currentStep.userAction) {
            setTimeout(nextStep, 100)
          }
          return 100
        }
        return newProgress
      })
    }, 100)

    return () => clearInterval(interval)
  }, [flowState.currentStep, flowState.isRunning, flowState.isPaused])

  // Send notifications for current step
  useEffect(() => {
    if (flowState.currentStep >= 0 && flowState.isRunning) {
      const currentStep = accidentFlowSteps[flowState.currentStep]
      currentStep.notifications.forEach((notification, index) => {
        setTimeout(() => {
          if (Notification.permission === "granted") {
            const notif = new Notification(notification.title, {
              body: notification.body,
              icon: notification.type === "critical" ? "/favicon.ico" : "/favicon.ico",
              requireInteraction: notification.requireInteraction,
              tag: `accident-flow-${currentStep.id}-${index}`,
            })

            notif.onclick = () => {
              notif.close()
              window.focus()
            }
          }

          toast({
            title: notification.title,
            description: notification.body,
            variant: notification.type === "critical" ? "destructive" : "default",
          })
        }, index * 1000)
      })
    }
  }, [flowState.currentStep])

  const getCurrentStep = () => {
    return flowState.currentStep >= 0 ? accidentFlowSteps[flowState.currentStep] : null
  }

  const getStepStatus = (stepIndex: number) => {
    if (stepIndex < flowState.currentStep) return "completed"
    if (stepIndex === flowState.currentStep) return "active"
    return "pending"
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Car className="h-6 w-6 text-red-500" />
            <span>Vehicle Accident Detection Flow Test</span>
          </CardTitle>
          <CardDescription>
            Complete end-to-end testing of accident detection, emergency response, and assistance coordination
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              This test simulates a complete vehicle accident response flow. No real emergency services will be
              contacted.
            </AlertDescription>
          </Alert>

          <div className="flex space-x-2">
            {!flowState.isRunning ? (
              <Button onClick={startAccidentFlow} variant="destructive" className="flex-1">
                <Siren className="mr-2 h-4 w-4" />
                Start Accident Detection Test
              </Button>
            ) : (
              <>
                <Button onClick={pauseFlow} variant="outline">
                  {flowState.isPaused ? "Resume" : "Pause"}
                </Button>
                <Button onClick={stopFlow} variant="destructive">
                  Stop Test
                </Button>
              </>
            )}
          </div>

          {flowState.isRunning && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  Step {flowState.currentStep + 1} of {accidentFlowSteps.length}
                </span>
                <Badge variant={getCurrentStep()?.critical ? "destructive" : "secondary"}>
                  {getCurrentStep()?.critical ? "CRITICAL" : "STANDARD"}
                </Badge>
              </div>
              <Progress value={stepProgress} className="w-full" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Current Step Details */}
      {flowState.isRunning && getCurrentStep() && (
        <Card className={`border-l-4 ${getCurrentStep()?.critical ? "border-l-red-500" : "border-l-blue-500"}`}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              {getCurrentStep()?.icon}
              <span>{getCurrentStep()?.name}</span>
              {flowState.isPaused && <Badge variant="outline">PAUSED</Badge>}
            </CardTitle>
            <CardDescription>{getCurrentStep()?.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {getCurrentStep()?.userAction && (
              <Alert>
                <Clock className="h-4 w-4" />
                <AlertDescription>
                  <strong>Action Required:</strong> {getCurrentStep()?.userAction}
                </AlertDescription>
              </Alert>
            )}

            {getCurrentStep()?.notifications[0]?.actions && (
              <div className="space-y-2">
                <p className="text-sm font-medium">User Response Options:</p>
                <div className="flex flex-wrap gap-2">
                  {getCurrentStep()?.notifications[0].actions.map((action) => (
                    <Button
                      key={action.action}
                      onClick={() => {
                        handleUserResponse(action.action, action.title)
                        if (getCurrentStep()?.userAction) {
                          setTimeout(nextStep, 1000)
                        }
                      }}
                      variant="outline"
                      size="sm"
                    >
                      {action.title}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <p className="text-sm font-medium">System Actions:</p>
              <ul className="text-sm space-y-1">
                {getCurrentStep()?.systemActions.map((action, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
            </div>

            {!getCurrentStep()?.autoTrigger && getCurrentStep()?.userAction && (
              <Button onClick={nextStep} className="w-full">
                Continue to Next Step
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* Flow Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Flow Progress</CardTitle>
          <CardDescription>Complete accident detection and response workflow</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {accidentFlowSteps.map((step, index) => {
              const status = getStepStatus(index)
              return (
                <div key={step.id} className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    {status === "completed" ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : status === "active" ? (
                      <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />
                    ) : (
                      <div className="h-5 w-5 border-2 border-gray-300 rounded-full" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      {step.icon}
                      <span className={`font-medium ${status === "active" ? "text-blue-600" : ""}`}>{step.name}</span>
                      {step.critical && (
                        <Badge variant="destructive" className="text-xs">
                          CRITICAL
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                  <div className="text-sm text-muted-foreground">{step.duration}s</div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Flow Log */}
      {flowLog.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Test Log</CardTitle>
            <CardDescription>Detailed log of accident detection flow execution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {flowLog.map((entry, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span className="font-medium">{entry.step}</span>
                    <span>{entry.action}</span>
                    {entry.userResponse && (
                      <Badge variant="outline" className="text-xs">
                        {entry.userResponse}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    {entry.duration && <span className="text-muted-foreground">{entry.duration.toFixed(1)}s</span>}
                    <span className="text-muted-foreground">{entry.timestamp.toLocaleTimeString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
