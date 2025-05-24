"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import {
  Shield,
  User,
  Phone,
  Lock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  Eye,
  EyeOff,
  Fingerprint,
  MessageSquare,
  MapPin,
  UserCheck,
  AlertCircle,
} from "lucide-react"

interface VerificationStep {
  id: string
  name: string
  description: string
  type:
    | "security_question"
    | "phone_verification"
    | "location_verification"
    | "personal_info"
    | "biometric"
    | "voice_verification"
  required: boolean
  completed: boolean
  failed: boolean
  attempts: number
  maxAttempts: number
  timeLimit: number
  timeRemaining: number
  data?: any
}

interface VerificationTestState {
  isRunning: boolean
  currentStep: number
  overallProgress: number
  verificationLevel: "basic" | "standard" | "enhanced" | "maximum"
  userProfile: {
    name: string
    phone: string
    emergencyContact: string
    lastKnownLocation: string
    vehicleInfo: string
    securityQuestions: Array<{ question: string; answer: string }>
  }
  steps: VerificationStep[]
  verificationResult: "pending" | "success" | "failed" | "timeout"
  startTime: Date | null
  endTime: Date | null
  securityScore: number
  riskFactors: string[]
  logs: Array<{
    timestamp: Date
    action: string
    result: "success" | "failure" | "warning" | "info"
    details: string
  }>
}

export function IdentityVerificationTester() {
  const [testState, setTestState] = useState<VerificationTestState>({
    isRunning: false,
    currentStep: 0,
    overallProgress: 0,
    verificationLevel: "standard",
    userProfile: {
      name: "John Smith",
      phone: "+1 (555) 123-4567",
      emergencyContact: "Jane Smith (Wife)",
      lastKnownLocation: "Highway 101, Mile Marker 45",
      vehicleInfo: "2020 Honda Civic, License: ABC-123",
      securityQuestions: [
        { question: "What is your mother's maiden name?", answer: "Johnson" },
        { question: "What was the name of your first pet?", answer: "Buddy" },
        { question: "What street did you grow up on?", answer: "Oak Street" },
      ],
    },
    steps: [],
    verificationResult: "pending",
    startTime: null,
    endTime: null,
    securityScore: 0,
    riskFactors: [],
    logs: [],
  })

  const [userInputs, setUserInputs] = useState<{ [key: string]: string }>({})
  const [showAnswers, setShowAnswers] = useState(false)

  const addLog = (action: string, result: "success" | "failure" | "warning" | "info", details: string) => {
    setTestState((prev) => ({
      ...prev,
      logs: [
        {
          timestamp: new Date(),
          action,
          result,
          details,
        },
        ...prev.logs.slice(0, 19),
      ],
    }))
  }

  const generateVerificationSteps = (level: string): VerificationStep[] => {
    const baseSteps: VerificationStep[] = [
      {
        id: "basic_info",
        name: "Basic Information",
        description: "Verify your name and phone number",
        type: "personal_info",
        required: true,
        completed: false,
        failed: false,
        attempts: 0,
        maxAttempts: 3,
        timeLimit: 60,
        timeRemaining: 60,
      },
      {
        id: "security_question",
        name: "Security Question",
        description: "Answer your pre-configured security question",
        type: "security_question",
        required: true,
        completed: false,
        failed: false,
        attempts: 0,
        maxAttempts: 3,
        timeLimit: 45,
        timeRemaining: 45,
      },
    ]

    if (level === "standard" || level === "enhanced" || level === "maximum") {
      baseSteps.push({
        id: "phone_verification",
        name: "Phone Verification",
        description: "Receive and enter SMS verification code",
        type: "phone_verification",
        required: true,
        completed: false,
        failed: false,
        attempts: 0,
        maxAttempts: 3,
        timeLimit: 120,
        timeRemaining: 120,
      })

      baseSteps.push({
        id: "location_verification",
        name: "Location Verification",
        description: "Confirm your current location matches emergency location",
        type: "location_verification",
        required: true,
        completed: false,
        failed: false,
        attempts: 0,
        maxAttempts: 2,
        timeLimit: 30,
        timeRemaining: 30,
      })
    }

    if (level === "enhanced" || level === "maximum") {
      baseSteps.push({
        id: "voice_verification",
        name: "Voice Verification",
        description: "Speak a verification phrase for voice pattern matching",
        type: "voice_verification",
        required: true,
        completed: false,
        failed: false,
        attempts: 0,
        maxAttempts: 2,
        timeLimit: 60,
        timeRemaining: 60,
      })
    }

    if (level === "maximum") {
      baseSteps.push({
        id: "biometric_verification",
        name: "Biometric Verification",
        description: "Use fingerprint or face recognition if available",
        type: "biometric",
        required: false,
        completed: false,
        failed: false,
        attempts: 0,
        maxAttempts: 3,
        timeLimit: 45,
        timeRemaining: 45,
      })
    }

    return baseSteps
  }

  const startVerificationTest = () => {
    const steps = generateVerificationSteps(testState.verificationLevel)
    setTestState((prev) => ({
      ...prev,
      isRunning: true,
      currentStep: 0,
      steps,
      verificationResult: "pending",
      startTime: new Date(),
      endTime: null,
      securityScore: 0,
      riskFactors: [],
      logs: [],
    }))

    setUserInputs({})
    addLog(
      "Verification Started",
      "info",
      `Starting ${testState.verificationLevel} level verification with ${steps.length} steps`,
    )

    toast({
      title: "🔍 Identity Verification Started",
      description: `${testState.verificationLevel.toUpperCase()} level verification with ${steps.length} steps`,
    })
  }

  const submitStepAnswer = (stepId: string, answer: string) => {
    const step = testState.steps.find((s) => s.id === stepId)
    if (!step) return

    let isCorrect = false
    let feedback = ""

    // Simulate verification logic for each step type
    switch (step.type) {
      case "personal_info":
        if (stepId === "basic_info") {
          const nameCorrect = answer.toLowerCase().includes("john") && answer.toLowerCase().includes("smith")
          isCorrect = nameCorrect
          feedback = nameCorrect ? "Name verified successfully" : "Name does not match our records"
        }
        break

      case "security_question":
        const correctAnswer = testState.userProfile.securityQuestions[0].answer.toLowerCase()
        isCorrect = answer.toLowerCase().trim() === correctAnswer
        feedback = isCorrect ? "Security question answered correctly" : "Incorrect answer to security question"
        break

      case "phone_verification":
        // Simulate SMS code verification (correct code is "123456")
        isCorrect = answer === "123456"
        feedback = isCorrect ? "SMS verification code correct" : "Invalid verification code"
        break

      case "location_verification":
        isCorrect = answer.toLowerCase().includes("highway") || answer.toLowerCase().includes("101")
        feedback = isCorrect ? "Location verified" : "Location does not match emergency location"
        break

      case "voice_verification":
        // Simulate voice pattern matching
        isCorrect = answer.length > 10 // Simple simulation
        feedback = isCorrect ? "Voice pattern matched" : "Voice pattern does not match"
        break

      case "biometric":
        // Simulate biometric verification
        isCorrect = Math.random() > 0.2 // 80% success rate simulation
        feedback = isCorrect ? "Biometric verification successful" : "Biometric verification failed"
        break
    }

    setTestState((prev) => {
      const updatedSteps = prev.steps.map((s) => {
        if (s.id === stepId) {
          const newAttempts = s.attempts + 1
          const stepCompleted = isCorrect
          const stepFailed = !isCorrect && newAttempts >= s.maxAttempts

          return {
            ...s,
            completed: stepCompleted,
            failed: stepFailed,
            attempts: newAttempts,
          }
        }
        return s
      })

      const currentStepIndex = updatedSteps.findIndex((s) => s.id === stepId)
      const nextStep = isCorrect ? currentStepIndex + 1 : currentStepIndex

      return {
        ...prev,
        steps: updatedSteps,
        currentStep: nextStep,
      }
    })

    addLog(
      `Step: ${step.name}`,
      isCorrect ? "success" : "failure",
      `${feedback} (Attempt ${step.attempts + 1}/${step.maxAttempts})`,
    )

    if (isCorrect) {
      toast({
        title: "✅ Step Completed",
        description: feedback,
      })
    } else {
      toast({
        title: "❌ Verification Failed",
        description: feedback,
        variant: "destructive",
      })
    }
  }

  const skipStep = (stepId: string) => {
    const step = testState.steps.find((s) => s.id === stepId)
    if (!step || step.required) return

    setTestState((prev) => {
      const updatedSteps = prev.steps.map((s) => {
        if (s.id === stepId) {
          return { ...s, completed: true }
        }
        return s
      })

      const currentStepIndex = updatedSteps.findIndex((s) => s.id === stepId)
      return {
        ...prev,
        steps: updatedSteps,
        currentStep: currentStepIndex + 1,
      }
    })

    addLog(`Step: ${step.name}`, "warning", "Step skipped (optional)")
  }

  const stopTest = () => {
    setTestState((prev) => ({
      ...prev,
      isRunning: false,
      verificationResult: "failed",
      endTime: new Date(),
    }))

    addLog("Verification Stopped", "warning", "Test manually stopped")
  }

  // Timer for each step
  useEffect(() => {
    if (!testState.isRunning) return

    const interval = setInterval(() => {
      setTestState((prev) => {
        const currentStep = prev.steps[prev.currentStep]
        if (!currentStep || currentStep.completed || currentStep.failed) return prev

        const newTimeRemaining = Math.max(0, currentStep.timeRemaining - 1)
        const updatedSteps = prev.steps.map((step, index) => {
          if (index === prev.currentStep) {
            return { ...step, timeRemaining: newTimeRemaining }
          }
          return step
        })

        // Check if step timed out
        if (newTimeRemaining === 0 && !currentStep.completed) {
          updatedSteps[prev.currentStep] = { ...currentStep, failed: true, timeRemaining: 0 }
          addLog(`Step: ${currentStep.name}`, "failure", "Step timed out")
        }

        return { ...prev, steps: updatedSteps }
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [testState.isRunning, testState.currentStep])

  // Check for overall completion
  useEffect(() => {
    if (!testState.isRunning) return

    const requiredSteps = testState.steps.filter((s) => s.required)
    const completedRequired = requiredSteps.filter((s) => s.completed)
    const failedRequired = requiredSteps.filter((s) => s.failed)

    const progress = (completedRequired.length / requiredSteps.length) * 100

    setTestState((prev) => ({ ...prev, overallProgress: progress }))

    // Check for completion
    if (completedRequired.length === requiredSteps.length) {
      setTestState((prev) => ({
        ...prev,
        isRunning: false,
        verificationResult: "success",
        endTime: new Date(),
        securityScore: 95,
      }))

      addLog("Verification Complete", "success", "All required steps completed successfully")
      toast({
        title: "🎉 Verification Successful",
        description: "Identity verified successfully. Emergency dispatch can be cancelled.",
      })
    } else if (failedRequired.length > 0) {
      setTestState((prev) => ({
        ...prev,
        isRunning: false,
        verificationResult: "failed",
        endTime: new Date(),
        securityScore: 25,
        riskFactors: ["Failed required verification steps", "Potential unauthorized access"],
      }))

      addLog("Verification Failed", "failure", "Required verification steps failed")
      toast({
        title: "🚫 Verification Failed",
        description: "Identity verification failed. Emergency dispatch will continue.",
        variant: "destructive",
      })
    }
  }, [testState.steps, testState.isRunning])

  const getCurrentStep = () => {
    return testState.steps[testState.currentStep]
  }

  const getStepIcon = (step: VerificationStep) => {
    switch (step.type) {
      case "personal_info":
        return <User className="h-4 w-4" />
      case "security_question":
        return <Lock className="h-4 w-4" />
      case "phone_verification":
        return <Phone className="h-4 w-4" />
      case "location_verification":
        return <MapPin className="h-4 w-4" />
      case "voice_verification":
        return <MessageSquare className="h-4 w-4" />
      case "biometric":
        return <Fingerprint className="h-4 w-4" />
      default:
        return <Shield className="h-4 w-4" />
    }
  }

  const getStepPrompt = (step: VerificationStep) => {
    switch (step.id) {
      case "basic_info":
        return "Please enter your full name as registered in your account:"
      case "security_question":
        return `Security Question: ${testState.userProfile.securityQuestions[0].question}`
      case "phone_verification":
        return `Enter the 6-digit code sent to ${testState.userProfile.phone}:`
      case "location_verification":
        return "Describe your current location (street name, landmarks, etc.):"
      case "voice_verification":
        return "Please speak this phrase: 'This is my emergency verification request'"
      case "biometric_verification":
        return "Place your finger on the sensor or look at the camera:"
      default:
        return "Complete this verification step:"
    }
  }

  const getCorrectAnswer = (stepId: string) => {
    switch (stepId) {
      case "basic_info":
        return "John Smith"
      case "security_question":
        return testState.userProfile.securityQuestions[0].answer
      case "phone_verification":
        return "123456"
      case "location_verification":
        return "Highway 101, Mile Marker 45"
      case "voice_verification":
        return "This is my emergency verification request"
      case "biometric_verification":
        return "Biometric scan"
      default:
        return ""
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-6 w-6 text-blue-500" />
            <span>Identity Verification Testing</span>
          </CardTitle>
          <CardDescription>
            Test the complete user identity verification process for emergency response cancellation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Verification Level</Label>
              <div className="flex space-x-2">
                {["basic", "standard", "enhanced", "maximum"].map((level) => (
                  <Button
                    key={level}
                    variant={testState.verificationLevel === level ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTestState((prev) => ({ ...prev, verificationLevel: level as any }))}
                    disabled={testState.isRunning}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Test Controls</Label>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => setShowAnswers(!showAnswers)}>
                  {showAnswers ? <EyeOff className="mr-2 h-4 w-4" /> : <Eye className="mr-2 h-4 w-4" />}
                  {showAnswers ? "Hide" : "Show"} Answers
                </Button>
              </div>
            </div>
          </div>

          <div className="flex space-x-2">
            {!testState.isRunning ? (
              <Button onClick={startVerificationTest} className="flex-1">
                <UserCheck className="mr-2 h-4 w-4" />
                Start Identity Verification Test
              </Button>
            ) : (
              <Button onClick={stopTest} variant="destructive" className="flex-1">
                <XCircle className="mr-2 h-4 w-4" />
                Stop Test
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* User Profile Information */}
      {showAnswers && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-green-700">
              <Eye className="h-5 w-5" />
              <span>Test User Profile (Correct Answers)</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <strong>Name:</strong> {testState.userProfile.name}
              </div>
              <div>
                <strong>Phone:</strong> {testState.userProfile.phone}
              </div>
              <div>
                <strong>Emergency Contact:</strong> {testState.userProfile.emergencyContact}
              </div>
              <div>
                <strong>Last Location:</strong> {testState.userProfile.lastKnownLocation}
              </div>
              <div>
                <strong>Vehicle:</strong> {testState.userProfile.vehicleInfo}
              </div>
              <div>
                <strong>SMS Code:</strong> 123456
              </div>
            </div>
            <div>
              <strong>Security Question:</strong> {testState.userProfile.securityQuestions[0].question}
              <br />
              <strong>Answer:</strong> {testState.userProfile.securityQuestions[0].answer}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Verification Progress */}
      {testState.isRunning && (
        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-blue-500" />
                <span>Verification Progress</span>
              </div>
              <Badge
                variant={
                  testState.verificationResult === "pending"
                    ? "secondary"
                    : testState.verificationResult === "success"
                      ? "default"
                      : "destructive"
                }
              >
                {testState.verificationResult.toUpperCase()}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Overall Progress</span>
                <span>{testState.overallProgress.toFixed(0)}%</span>
              </div>
              <Progress value={testState.overallProgress} className="w-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {testState.steps.map((step, index) => (
                <Card
                  key={step.id}
                  className={`border-l-4 ${
                    step.completed
                      ? "border-l-green-500 bg-green-50"
                      : step.failed
                        ? "border-l-red-500 bg-red-50"
                        : index === testState.currentStep
                          ? "border-l-blue-500 bg-blue-50"
                          : "border-l-gray-300"
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {getStepIcon(step)}
                        <span className="font-medium text-sm">{step.name}</span>
                      </div>
                      {step.completed ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : step.failed ? (
                        <XCircle className="h-4 w-4 text-red-500" />
                      ) : index === testState.currentStep ? (
                        <Clock className="h-4 w-4 text-blue-500" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{step.description}</p>
                    <div className="flex justify-between text-xs">
                      <span>
                        Attempts: {step.attempts}/{step.maxAttempts}
                      </span>
                      {index === testState.currentStep && !step.completed && !step.failed && (
                        <span className="text-red-500">{step.timeRemaining}s</span>
                      )}
                    </div>
                    {step.required && (
                      <Badge variant="outline" className="text-xs mt-1">
                        Required
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Current Step Input */}
      {testState.isRunning && getCurrentStep() && !getCurrentStep().completed && !getCurrentStep().failed && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-orange-700">
              <AlertTriangle className="h-5 w-5" />
              <span>Current Step: {getCurrentStep().name}</span>
              <Badge variant="destructive">{getCurrentStep().timeRemaining}s</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{getStepPrompt(getCurrentStep())}</AlertDescription>
            </Alert>

            <div className="space-y-2">
              <Label htmlFor="stepInput">Your Response:</Label>
              <Input
                id="stepInput"
                value={userInputs[getCurrentStep().id] || ""}
                onChange={(e) => setUserInputs((prev) => ({ ...prev, [getCurrentStep().id]: e.target.value }))}
                placeholder={
                  getCurrentStep().type === "phone_verification" ? "Enter 6-digit code" : "Enter your response"
                }
                disabled={getCurrentStep().type === "biometric"}
              />
              {showAnswers && (
                <p className="text-xs text-green-600">
                  <strong>Correct answer:</strong> {getCorrectAnswer(getCurrentStep().id)}
                </p>
              )}
            </div>

            <div className="flex space-x-2">
              <Button
                onClick={() => submitStepAnswer(getCurrentStep().id, userInputs[getCurrentStep().id] || "")}
                disabled={!userInputs[getCurrentStep().id] && getCurrentStep().type !== "biometric"}
                className="flex-1"
              >
                {getCurrentStep().type === "biometric" ? "Scan Now" : "Submit Answer"}
              </Button>
              {!getCurrentStep().required && (
                <Button onClick={() => skipStep(getCurrentStep().id)} variant="outline">
                  Skip (Optional)
                </Button>
              )}
            </div>

            <div className="text-xs text-muted-foreground">
              Attempt {getCurrentStep().attempts + 1} of {getCurrentStep().maxAttempts} • Time remaining:{" "}
              {getCurrentStep().timeRemaining} seconds
            </div>
          </CardContent>
        </Card>
      )}

      {/* Verification Result */}
      {!testState.isRunning && testState.verificationResult !== "pending" && (
        <Card
          className={`border-l-4 ${testState.verificationResult === "success" ? "border-l-green-500 bg-green-50" : "border-l-red-500 bg-red-50"}`}
        >
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              {testState.verificationResult === "success" ? (
                <CheckCircle className="h-6 w-6 text-green-500" />
              ) : (
                <XCircle className="h-6 w-6 text-red-500" />
              )}
              <span>Verification {testState.verificationResult === "success" ? "Successful" : "Failed"}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{testState.securityScore}</div>
                <div className="text-sm text-muted-foreground">Security Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {testState.steps.filter((s) => s.completed).length}
                </div>
                <div className="text-sm text-muted-foreground">Steps Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{testState.steps.filter((s) => s.failed).length}</div>
                <div className="text-sm text-muted-foreground">Steps Failed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {testState.endTime && testState.startTime
                    ? Math.round((testState.endTime.getTime() - testState.startTime.getTime()) / 1000)
                    : 0}
                  s
                </div>
                <div className="text-sm text-muted-foreground">Total Time</div>
              </div>
            </div>

            <Alert className={testState.verificationResult === "success" ? "border-green-200" : "border-red-200"}>
              <AlertDescription>
                <strong>Result:</strong>{" "}
                {testState.verificationResult === "success"
                  ? "Identity successfully verified. Emergency dispatch cancellation authorized."
                  : "Identity verification failed. Emergency dispatch will continue as planned for safety."}
              </AlertDescription>
            </Alert>

            {testState.riskFactors.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-semibold text-red-600">Risk Factors Identified:</h4>
                <ul className="text-sm space-y-1">
                  {testState.riskFactors.map((factor, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <AlertTriangle className="h-3 w-3 text-red-500" />
                      <span>{factor}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Verification Logs */}
      {testState.logs.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5" />
              <span>Verification Log</span>
              <Badge variant="outline">{testState.logs.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {testState.logs.map((log, index) => (
                <div
                  key={index}
                  className={`p-3 border rounded-lg ${
                    log.result === "success"
                      ? "border-green-200 bg-green-50"
                      : log.result === "failure"
                        ? "border-red-200 bg-red-50"
                        : log.result === "warning"
                          ? "border-orange-200 bg-orange-50"
                          : "border-blue-200 bg-blue-50"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-sm">{log.action}</span>
                        <Badge
                          variant={
                            log.result === "success"
                              ? "default"
                              : log.result === "failure"
                                ? "destructive"
                                : log.result === "warning"
                                  ? "secondary"
                                  : "outline"
                          }
                          className="text-xs"
                        >
                          {log.result}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{log.details}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{log.timestamp.toLocaleTimeString()}</span>
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
