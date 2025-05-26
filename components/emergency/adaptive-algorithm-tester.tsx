"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { toast } from "@/components/ui/use-toast"
import {
  Brain,
  Zap,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Fingerprint,
  Camera,
  Eye,
  Mic,
  Sun,
  Activity,
  BarChart3,
  Lightbulb,
  Cpu,
  RefreshCw,
  Play,
} from "lucide-react"

interface BiometricMethod {
  id: string
  name: string
  type: "fingerprint" | "face" | "iris" | "voice"
  icon: React.ReactNode
  baseAccuracy: number
  baseProcessingTime: number
  powerConsumption: number
  hardwareRequirement: "basic" | "standard" | "premium"
  environmentalSensitivity: number
  stressSensitivity: number
  available: boolean
  currentAccuracy: number
  currentProcessingTime: number
  priority: number
  confidence: number
  qualityScore: number
  adaptiveWeight: number
}

interface EnvironmentalContext {
  lighting: "excellent" | "good" | "poor" | "dark"
  noise: "quiet" | "moderate" | "loud" | "extreme"
  deviceCondition: "perfect" | "good" | "damaged" | "critical"
  batteryLevel: number
  networkStrength: number
  timeOfDay: "day" | "night" | "dawn" | "dusk"
  weatherCondition: "clear" | "rain" | "fog" | "storm"
}

interface UserContext {
  stressLevel: "calm" | "moderate" | "high" | "extreme"
  injuryStatus: "none" | "minor" | "moderate" | "severe"
  consciousnessLevel: "alert" | "drowsy" | "confused" | "unresponsive"
  cooperationLevel: "full" | "partial" | "minimal" | "none"
  previousAttempts: number
  timeRemaining: number
  emergencyType: "breakdown" | "accident" | "medical" | "security"
}

interface AdaptiveDecision {
  timestamp: Date
  selectedMethods: string[]
  rejectedMethods: string[]
  reasoning: string[]
  confidencePrediction: number
  timePrediction: number
  successProbability: number
  riskFactors: string[]
  optimizations: string[]
  fallbackPlan: string[]
}

interface AdaptiveResult {
  id: string
  timestamp: Date
  environmentalContext: EnvironmentalContext
  userContext: UserContext
  decisions: AdaptiveDecision[]
  finalResult: "success" | "failure" | "partial" | "timeout"
  actualConfidence: number
  actualTime: number
  methodsUsed: string[]
  adaptiveScore: number
  efficiencyGain: number
  accuracyMaintained: number
}

const initialMethods: BiometricMethod[] = [
  {
    id: "fingerprint",
    name: "Fingerprint Scanner",
    type: "fingerprint",
    icon: <Fingerprint className="h-4 w-4" />,
    baseAccuracy: 0.998,
    baseProcessingTime: 3000,
    powerConsumption: 0.1,
    hardwareRequirement: "basic",
    environmentalSensitivity: 0.3,
    stressSensitivity: 0.2,
    available: true,
    currentAccuracy: 0.998,
    currentProcessingTime: 3000,
    priority: 1,
    confidence: 0,
    qualityScore: 0,
    adaptiveWeight: 0.3,
  },
  {
    id: "face",
    name: "Facial Recognition",
    type: "face",
    icon: <Camera className="h-4 w-4" />,
    baseAccuracy: 0.995,
    baseProcessingTime: 4000,
    powerConsumption: 0.3,
    hardwareRequirement: "standard",
    environmentalSensitivity: 0.7,
    stressSensitivity: 0.4,
    available: true,
    currentAccuracy: 0.995,
    currentProcessingTime: 4000,
    priority: 2,
    confidence: 0,
    qualityScore: 0,
    adaptiveWeight: 0.25,
  },
  {
    id: "iris",
    name: "Iris Scanner",
    type: "iris",
    icon: <Eye className="h-4 w-4" />,
    baseAccuracy: 0.9999,
    baseProcessingTime: 5000,
    powerConsumption: 0.4,
    hardwareRequirement: "premium",
    environmentalSensitivity: 0.5,
    stressSensitivity: 0.3,
    available: Math.random() > 0.2, // 80% availability
    currentAccuracy: 0.9999,
    currentProcessingTime: 5000,
    priority: 3,
    confidence: 0,
    qualityScore: 0,
    adaptiveWeight: 0.35,
  },
  {
    id: "voice",
    name: "Voice Pattern",
    type: "voice",
    icon: <Mic className="h-4 w-4" />,
    baseAccuracy: 0.952,
    baseProcessingTime: 6000,
    powerConsumption: 0.2,
    hardwareRequirement: "basic",
    environmentalSensitivity: 0.8,
    stressSensitivity: 0.6,
    available: true,
    currentAccuracy: 0.952,
    currentProcessingTime: 6000,
    priority: 4,
    confidence: 0,
    qualityScore: 0,
    adaptiveWeight: 0.1,
  },
]

export function AdaptiveAlgorithmTester() {
  const [methods, setMethods] = useState<BiometricMethod[]>(initialMethods)
  const [environmentalContext, setEnvironmentalContext] = useState<EnvironmentalContext>({
    lighting: "good",
    noise: "moderate",
    deviceCondition: "good",
    batteryLevel: 85,
    networkStrength: 80,
    timeOfDay: "day",
    weatherCondition: "clear",
  })
  const [userContext, setUserContext] = useState<UserContext>({
    stressLevel: "moderate",
    injuryStatus: "none",
    consciousnessLevel: "alert",
    cooperationLevel: "full",
    previousAttempts: 0,
    timeRemaining: 75,
    emergencyType: "breakdown",
  })
  const [isRunning, setIsRunning] = useState(false)
  const [currentDecision, setCurrentDecision] = useState<AdaptiveDecision | null>(null)
  const [testResults, setTestResults] = useState<AdaptiveResult[]>([])
  const [progress, setProgress] = useState(0)
  const [adaptiveScore, setAdaptiveScore] = useState(0)

  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // AI-driven adaptive algorithm
  const runAdaptiveAlgorithm = (): AdaptiveDecision => {
    const reasoning: string[] = []
    const riskFactors: string[] = []
    const optimizations: string[] = []
    const fallbackPlan: string[] = []

    // Update method characteristics based on context
    const updatedMethods = methods.map((method) => {
      let adjustedAccuracy = method.baseAccuracy
      let adjustedTime = method.baseProcessingTime
      let adjustedWeight = method.adaptiveWeight

      // Environmental adjustments
      if (environmentalContext.lighting === "poor" || environmentalContext.lighting === "dark") {
        if (method.type === "face" || method.type === "iris") {
          adjustedAccuracy *= 0.7
          adjustedTime *= 1.3
          reasoning.push(`${method.name} accuracy reduced due to poor lighting`)
        }
      }

      if (environmentalContext.noise === "loud" || environmentalContext.noise === "extreme") {
        if (method.type === "voice") {
          adjustedAccuracy *= 0.6
          adjustedTime *= 1.5
          reasoning.push(`${method.name} accuracy reduced due to high noise`)
        }
      }

      if (environmentalContext.deviceCondition === "damaged" || environmentalContext.deviceCondition === "critical") {
        adjustedAccuracy *= 0.8
        adjustedTime *= 1.2
        reasoning.push(`${method.name} performance reduced due to device damage`)
      }

      // User context adjustments
      if (userContext.stressLevel === "high" || userContext.stressLevel === "extreme") {
        adjustedAccuracy *= 1 - method.stressSensitivity * 0.3
        reasoning.push(`${method.name} affected by user stress level`)
      }

      if (userContext.injuryStatus !== "none") {
        if (method.type === "fingerprint" && userContext.injuryStatus === "severe") {
          adjustedAccuracy *= 0.5
          reasoning.push(`${method.name} may be affected by hand injuries`)
        }
        if (method.type === "face" && userContext.injuryStatus === "severe") {
          adjustedAccuracy *= 0.6
          reasoning.push(`${method.name} may be affected by facial injuries`)
        }
      }

      // Battery optimization
      if (environmentalContext.batteryLevel < 30) {
        if (method.powerConsumption > 0.3) {
          adjustedWeight *= 0.7
          optimizations.push(`Reduced priority for ${method.name} due to low battery`)
        }
      }

      // Time pressure optimization
      if (userContext.timeRemaining < 30) {
        if (adjustedTime > 4000) {
          adjustedWeight *= 0.8
          optimizations.push(`Reduced priority for ${method.name} due to time constraint`)
        }
      }

      return {
        ...method,
        currentAccuracy: adjustedAccuracy,
        currentProcessingTime: adjustedTime,
        adaptiveWeight: adjustedWeight,
      }
    })

    // AI decision logic
    const availableMethods = updatedMethods.filter((m) => m.available)
    const selectedMethods: string[] = []
    const rejectedMethods: string[] = []

    // Primary selection based on accuracy and conditions
    const sortedMethods = availableMethods.sort((a, b) => {
      const scoreA = a.currentAccuracy * a.adaptiveWeight * (1 / a.currentProcessingTime) * 1000
      const scoreB = b.currentAccuracy * b.adaptiveWeight * (1 / b.currentProcessingTime) * 1000
      return scoreB - scoreA
    })

    // Always include the top method if available
    if (sortedMethods.length > 0) {
      selectedMethods.push(sortedMethods[0].id)
      reasoning.push(`Selected ${sortedMethods[0].name} as primary method (highest adaptive score)`)
    }

    // Intelligent secondary method selection
    if (userContext.timeRemaining > 45 && environmentalContext.batteryLevel > 40) {
      // Look for complementary methods
      const remaining = sortedMethods.slice(1)
      for (const method of remaining) {
        if (selectedMethods.length >= 3) break

        let shouldSelect = false
        const reasons: string[] = []

        // Complementary selection logic
        if (method.type === "fingerprint" && !selectedMethods.includes("fingerprint")) {
          if (userContext.injuryStatus === "none") {
            shouldSelect = true
            reasons.push("Fingerprint selected as reliable backup")
          }
        }

        if (method.type === "iris" && environmentalContext.lighting !== "poor") {
          if (method.currentAccuracy > 0.99) {
            shouldSelect = true
            reasons.push("Iris selected for maximum accuracy")
          }
        }

        if (method.type === "face" && environmentalContext.lighting === "excellent") {
          shouldSelect = true
          reasons.push("Face recognition optimal in current lighting")
        }

        // Emergency type specific logic
        if (userContext.emergencyType === "medical" && method.type === "iris") {
          shouldSelect = true
          reasons.push("Iris scanning prioritized for medical emergencies")
        }

        if (userContext.emergencyType === "security" && selectedMethods.length < 3) {
          shouldSelect = true
          reasons.push("Additional method required for security emergency")
        }

        if (shouldSelect) {
          selectedMethods.push(method.id)
          reasoning.push(...reasons)
        } else {
          rejectedMethods.push(method.id)
        }
      }
    } else {
      // Time/battery constrained - minimal selection
      const remaining = sortedMethods.slice(1)
      remaining.forEach((method) => {
        rejectedMethods.push(method.id)
      })
      reasoning.push("Limited method selection due to time/battery constraints")
    }

    // Risk assessment
    if (selectedMethods.length === 1) {
      riskFactors.push("Single method verification increases failure risk")
    }
    if (environmentalContext.deviceCondition === "damaged") {
      riskFactors.push("Device damage may affect all biometric sensors")
    }
    if (userContext.stressLevel === "extreme") {
      riskFactors.push("Extreme stress may significantly impact biometric quality")
    }

    // Fallback planning
    const unselectedMethods = availableMethods.filter((m) => !selectedMethods.includes(m.id))
    if (unselectedMethods.length > 0) {
      fallbackPlan.push(`Fallback to ${unselectedMethods[0].name} if primary methods fail`)
    }
    if (userContext.timeRemaining < 20) {
      fallbackPlan.push("Emergency bypass protocol available if verification fails")
    }

    // Predictions
    const avgAccuracy =
      selectedMethods.reduce((sum, id) => {
        const method = updatedMethods.find((m) => m.id === id)
        return sum + (method?.currentAccuracy || 0)
      }, 0) / selectedMethods.length

    const totalTime = selectedMethods.reduce((sum, id) => {
      const method = updatedMethods.find((m) => m.id === id)
      return sum + (method?.currentProcessingTime || 0)
    }, 0)

    const successProbability = Math.min(avgAccuracy * (1 - riskFactors.length * 0.1), 0.99)

    return {
      timestamp: new Date(),
      selectedMethods,
      rejectedMethods,
      reasoning,
      confidencePrediction: avgAccuracy,
      timePrediction: totalTime,
      successProbability,
      riskFactors,
      optimizations,
      fallbackPlan,
    }
  }

  const simulateAdaptiveVerification = async (): Promise<AdaptiveResult> => {
    const decision = runAdaptiveAlgorithm()
    setCurrentDecision(decision)

    const startTime = Date.now()
    let actualConfidence = 0
    const methodsUsed: string[] = []

    // Simulate verification of selected methods
    for (let i = 0; i < decision.selectedMethods.length; i++) {
      const methodId = decision.selectedMethods[i]
      const method = methods.find((m) => m.id === methodId)
      if (!method) continue

      setProgress(((i + 1) / decision.selectedMethods.length) * 100)

      // Simulate processing time
      await new Promise((resolve) => setTimeout(resolve, method.currentProcessingTime / 4)) // Accelerated for demo

      // Simulate success/failure
      const success = Math.random() < decision.successProbability
      if (success) {
        methodsUsed.push(methodId)
        actualConfidence = Math.max(actualConfidence, method.currentAccuracy)

        // Early termination logic
        if (actualConfidence >= 0.88 && methodsUsed.length >= 1) {
          toast({
            title: "🧠 Early Termination",
            description: "Adaptive algorithm achieved required confidence early",
          })
          break
        }
      }
    }

    const actualTime = Date.now() - startTime
    const finalResult: "success" | "failure" | "partial" | "timeout" =
      actualConfidence >= 0.85 ? "success" : methodsUsed.length > 0 ? "partial" : "failure"

    // Calculate adaptive performance metrics
    const standardTime = decision.selectedMethods.length * 4000 // Standard time for all methods
    const efficiencyGain = ((standardTime - actualTime) / standardTime) * 100
    const accuracyMaintained = (actualConfidence / decision.confidencePrediction) * 100
    const adaptiveScore = (efficiencyGain + accuracyMaintained) / 2

    return {
      id: `adaptive_${Date.now()}`,
      timestamp: new Date(),
      environmentalContext,
      userContext,
      decisions: [decision],
      finalResult,
      actualConfidence,
      actualTime,
      methodsUsed,
      adaptiveScore,
      efficiencyGain,
      accuracyMaintained,
    }
  }

  const runAdaptiveTest = async () => {
    setIsRunning(true)
    setProgress(0)
    setCurrentDecision(null)

    toast({
      title: "🧠 Adaptive Algorithm Started",
      description: "AI analyzing context and selecting optimal biometric methods",
    })

    try {
      const result = await simulateAdaptiveVerification()
      setTestResults((prev) => [result, ...prev.slice(0, 4)])
      setAdaptiveScore(result.adaptiveScore)

      toast({
        title: "🎯 Adaptive Test Complete",
        description: `Score: ${result.adaptiveScore.toFixed(1)}/100 (${result.finalResult.toUpperCase()})`,
        variant: result.finalResult === "success" ? "default" : "destructive",
      })
    } catch (error) {
      console.error("Adaptive test error:", error)
      toast({
        title: "❌ Test Failed",
        description: "An error occurred during adaptive testing",
        variant: "destructive",
      })
    } finally {
      setIsRunning(false)
      setProgress(0)
    }
  }

  const generateRandomScenario = () => {
    const scenarios = [
      {
        name: "Nighttime Emergency",
        environmental: {
          lighting: "dark" as const,
          noise: "quiet" as const,
          deviceCondition: "good" as const,
          batteryLevel: 45,
          networkStrength: 60,
          timeOfDay: "night" as const,
          weatherCondition: "clear" as const,
        },
        user: {
          stressLevel: "high" as const,
          injuryStatus: "minor" as const,
          consciousnessLevel: "alert" as const,
          cooperationLevel: "full" as const,
          previousAttempts: 0,
          timeRemaining: 60,
          emergencyType: "breakdown" as const,
        },
      },
      {
        name: "Severe Accident",
        environmental: {
          lighting: "poor" as const,
          noise: "loud" as const,
          deviceCondition: "damaged" as const,
          batteryLevel: 25,
          networkStrength: 40,
          timeOfDay: "day" as const,
          weatherCondition: "rain" as const,
        },
        user: {
          stressLevel: "extreme" as const,
          injuryStatus: "severe" as const,
          consciousnessLevel: "confused" as const,
          cooperationLevel: "minimal" as const,
          previousAttempts: 2,
          timeRemaining: 20,
          emergencyType: "accident" as const,
        },
      },
      {
        name: "Medical Emergency",
        environmental: {
          lighting: "good" as const,
          noise: "moderate" as const,
          deviceCondition: "good" as const,
          batteryLevel: 70,
          networkStrength: 85,
          timeOfDay: "day" as const,
          weatherCondition: "clear" as const,
        },
        user: {
          stressLevel: "extreme" as const,
          injuryStatus: "moderate" as const,
          consciousnessLevel: "drowsy" as const,
          cooperationLevel: "partial" as const,
          previousAttempts: 1,
          timeRemaining: 45,
          emergencyType: "medical" as const,
        },
      },
      {
        name: "Optimal Conditions",
        environmental: {
          lighting: "excellent" as const,
          noise: "quiet" as const,
          deviceCondition: "perfect" as const,
          batteryLevel: 95,
          networkStrength: 95,
          timeOfDay: "day" as const,
          weatherCondition: "clear" as const,
        },
        user: {
          stressLevel: "calm" as const,
          injuryStatus: "none" as const,
          consciousnessLevel: "alert" as const,
          cooperationLevel: "full" as const,
          previousAttempts: 0,
          timeRemaining: 90,
          emergencyType: "breakdown" as const,
        },
      },
    ]

    const scenario = scenarios[Math.floor(Math.random() * scenarios.length)]
    setEnvironmentalContext(scenario.environmental)
    setUserContext(scenario.user)

    toast({
      title: "🎲 Random Scenario Generated",
      description: `Testing: ${scenario.name}`,
    })
  }

  return (
    <div className="space-y-6">
      <Card className="border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-6 w-6 text-purple-500" />
            <span>AI-Driven Adaptive Algorithm</span>
          </CardTitle>
          <CardDescription>
            Test how artificial intelligence selects optimal biometric methods based on real-time context analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Button onClick={runAdaptiveTest} disabled={isRunning} className="flex-1">
              <Play className="mr-2 h-4 w-4" />
              Run Adaptive Test
            </Button>
            <Button onClick={generateRandomScenario} variant="outline" disabled={isRunning}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Random Scenario
            </Button>
          </div>

          {isRunning && (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">AI Processing...</span>
                <div className="flex items-center space-x-2">
                  <Cpu className="h-4 w-4 text-blue-500 animate-pulse" />
                  <span className="text-sm">Analyzing context</span>
                </div>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          )}

          {adaptiveScore > 0 && (
            <div className="flex items-center justify-center space-x-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">{adaptiveScore.toFixed(1)}</div>
                <div className="text-sm text-muted-foreground">Adaptive Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {testResults[0]?.efficiencyGain.toFixed(0) || 0}%
                </div>
                <div className="text-sm text-muted-foreground">Efficiency Gain</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {testResults[0]?.accuracyMaintained.toFixed(0) || 0}%
                </div>
                <div className="text-sm text-muted-foreground">Accuracy Maintained</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Context Configuration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sun className="h-5 w-5 text-orange-500" />
              <span>Environmental Context</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Lighting</label>
                <select
                  value={environmentalContext.lighting}
                  onChange={(e) =>
                    setEnvironmentalContext((prev) => ({
                      ...prev,
                      lighting: e.target.value as any,
                    }))
                  }
                  className="w-full p-2 border rounded text-sm"
                >
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="poor">Poor</option>
                  <option value="dark">Dark</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Noise Level</label>
                <select
                  value={environmentalContext.noise}
                  onChange={(e) =>
                    setEnvironmentalContext((prev) => ({
                      ...prev,
                      noise: e.target.value as any,
                    }))
                  }
                  className="w-full p-2 border rounded text-sm"
                >
                  <option value="quiet">Quiet</option>
                  <option value="moderate">Moderate</option>
                  <option value="loud">Loud</option>
                  <option value="extreme">Extreme</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Device Condition</label>
                <select
                  value={environmentalContext.deviceCondition}
                  onChange={(e) =>
                    setEnvironmentalContext((prev) => ({
                      ...prev,
                      deviceCondition: e.target.value as any,
                    }))
                  }
                  className="w-full p-2 border rounded text-sm"
                >
                  <option value="perfect">Perfect</option>
                  <option value="good">Good</option>
                  <option value="damaged">Damaged</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Time of Day</label>
                <select
                  value={environmentalContext.timeOfDay}
                  onChange={(e) =>
                    setEnvironmentalContext((prev) => ({
                      ...prev,
                      timeOfDay: e.target.value as any,
                    }))
                  }
                  className="w-full p-2 border rounded text-sm"
                >
                  <option value="day">Day</option>
                  <option value="night">Night</option>
                  <option value="dawn">Dawn</option>
                  <option value="dusk">Dusk</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Battery Level</span>
                <span className="text-sm text-muted-foreground">{environmentalContext.batteryLevel}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={environmentalContext.batteryLevel}
                onChange={(e) =>
                  setEnvironmentalContext((prev) => ({
                    ...prev,
                    batteryLevel: Number.parseInt(e.target.value),
                  }))
                }
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Network Strength</span>
                <span className="text-sm text-muted-foreground">{environmentalContext.networkStrength}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={environmentalContext.networkStrength}
                onChange={(e) =>
                  setEnvironmentalContext((prev) => ({
                    ...prev,
                    networkStrength: Number.parseInt(e.target.value),
                  }))
                }
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-red-500" />
              <span>User Context</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Stress Level</label>
                <select
                  value={userContext.stressLevel}
                  onChange={(e) =>
                    setUserContext((prev) => ({
                      ...prev,
                      stressLevel: e.target.value as any,
                    }))
                  }
                  className="w-full p-2 border rounded text-sm"
                >
                  <option value="calm">Calm</option>
                  <option value="moderate">Moderate</option>
                  <option value="high">High</option>
                  <option value="extreme">Extreme</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Injury Status</label>
                <select
                  value={userContext.injuryStatus}
                  onChange={(e) =>
                    setUserContext((prev) => ({
                      ...prev,
                      injuryStatus: e.target.value as any,
                    }))
                  }
                  className="w-full p-2 border rounded text-sm"
                >
                  <option value="none">None</option>
                  <option value="minor">Minor</option>
                  <option value="moderate">Moderate</option>
                  <option value="severe">Severe</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Consciousness</label>
                <select
                  value={userContext.consciousnessLevel}
                  onChange={(e) =>
                    setUserContext((prev) => ({
                      ...prev,
                      consciousnessLevel: e.target.value as any,
                    }))
                  }
                  className="w-full p-2 border rounded text-sm"
                >
                  <option value="alert">Alert</option>
                  <option value="drowsy">Drowsy</option>
                  <option value="confused">Confused</option>
                  <option value="unresponsive">Unresponsive</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Emergency Type</label>
                <select
                  value={userContext.emergencyType}
                  onChange={(e) =>
                    setUserContext((prev) => ({
                      ...prev,
                      emergencyType: e.target.value as any,
                    }))
                  }
                  className="w-full p-2 border rounded text-sm"
                >
                  <option value="breakdown">Breakdown</option>
                  <option value="accident">Accident</option>
                  <option value="medical">Medical</option>
                  <option value="security">Security</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Time Remaining</span>
                <span className="text-sm text-muted-foreground">{userContext.timeRemaining}s</span>
              </div>
              <input
                type="range"
                min="15"
                max="120"
                value={userContext.timeRemaining}
                onChange={(e) =>
                  setUserContext((prev) => ({
                    ...prev,
                    timeRemaining: Number.parseInt(e.target.value),
                  }))
                }
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Decision Analysis */}
      {currentDecision && (
        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Lightbulb className="h-5 w-5 text-blue-500" />
              <span>AI Decision Analysis</span>
            </CardTitle>
            <CardDescription>Real-time adaptive algorithm decision-making process</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-green-600">Selected Methods</h4>
                <div className="space-y-1">
                  {currentDecision.selectedMethods.map((methodId) => {
                    const method = methods.find((m) => m.id === methodId)
                    return (
                      <div key={methodId} className="flex items-center space-x-2 text-sm">
                        {method?.icon}
                        <span>{method?.name}</span>
                        <CheckCircle className="h-3 w-3 text-green-500" />
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-red-600">Rejected Methods</h4>
                <div className="space-y-1">
                  {currentDecision.rejectedMethods.map((methodId) => {
                    const method = methods.find((m) => m.id === methodId)
                    return (
                      <div key={methodId} className="flex items-center space-x-2 text-sm">
                        {method?.icon}
                        <span>{method?.name}</span>
                        <XCircle className="h-3 w-3 text-red-500" />
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-blue-600">Predictions</h4>
                <div className="space-y-1 text-sm">
                  <div>Confidence: {(currentDecision.confidencePrediction * 100).toFixed(1)}%</div>
                  <div>Time: {(currentDecision.timePrediction / 1000).toFixed(1)}s</div>
                  <div>Success: {(currentDecision.successProbability * 100).toFixed(1)}%</div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-purple-600 mb-2">AI Reasoning</h4>
                <ul className="text-sm space-y-1">
                  {currentDecision.reasoning.map((reason, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-purple-500 mt-1">•</span>
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {currentDecision.optimizations.length > 0 && (
                <div>
                  <h4 className="font-semibold text-green-600 mb-2">Optimizations Applied</h4>
                  <ul className="text-sm space-y-1">
                    {currentDecision.optimizations.map((opt, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <Zap className="h-3 w-3 text-green-500 mt-1" />
                        <span>{opt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {currentDecision.riskFactors.length > 0 && (
                <div>
                  <h4 className="font-semibold text-orange-600 mb-2">Risk Factors Identified</h4>
                  <ul className="text-sm space-y-1">
                    {currentDecision.riskFactors.map((risk, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <AlertTriangle className="h-3 w-3 text-orange-500 mt-1" />
                        <span>{risk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {currentDecision.fallbackPlan.length > 0 && (
                <div>
                  <h4 className="font-semibold text-blue-600 mb-2">Fallback Plan</h4>
                  <ul className="text-sm space-y-1">
                    {currentDecision.fallbackPlan.map((plan, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <Shield className="h-3 w-3 text-blue-500 mt-1" />
                        <span>{plan}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Test Results */}
      {testResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Adaptive Algorithm Results</span>
              <Badge variant="outline">{testResults.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {testResults.map((result) => (
                <Card
                  key={result.id}
                  className={`border-l-4 ${
                    result.finalResult === "success"
                      ? "border-l-green-500 bg-green-50"
                      : result.finalResult === "partial"
                        ? "border-l-orange-500 bg-orange-50"
                        : "border-l-red-500 bg-red-50"
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Brain className="h-4 w-4" />
                        <span className="font-medium">Adaptive Algorithm Test</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {result.finalResult === "success" ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : result.finalResult === "partial" ? (
                          <AlertTriangle className="h-4 w-4 text-orange-500" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500" />
                        )}
                        <Badge
                          variant={
                            result.finalResult === "success"
                              ? "default"
                              : result.finalResult === "partial"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {result.finalResult.toUpperCase()}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-3 text-sm">
                      <div>
                        <span className="text-muted-foreground">Adaptive Score:</span>
                        <div className="font-medium">{result.adaptiveScore.toFixed(1)}/100</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Efficiency Gain:</span>
                        <div className="font-medium">{result.efficiencyGain.toFixed(0)}%</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Accuracy:</span>
                        <div className="font-medium">{(result.actualConfidence * 100).toFixed(1)}%</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Time:</span>
                        <div className="font-medium">{(result.actualTime / 1000).toFixed(1)}s</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Methods Used:</span>
                        <div className="font-medium">{result.methodsUsed.length}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-3">
                      {result.methodsUsed.map((methodId) => {
                        const method = methods.find((m) => m.id === methodId)
                        return (
                          <div key={methodId} className="p-2 rounded text-xs bg-green-100 text-green-800">
                            <div className="flex items-center space-x-1">
                              {method?.icon}
                              <span className="font-medium">{method?.name}</span>
                            </div>
                            <div>Successfully verified</div>
                          </div>
                        )
                      })}
                    </div>

                    <div className="text-xs text-muted-foreground">
                      Emergency: {result.userContext.emergencyType} | Stress: {result.userContext.stressLevel} |
                      Lighting: {result.environmentalContext.lighting} | Battery:{" "}
                      {result.environmentalContext.batteryLevel}%
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
