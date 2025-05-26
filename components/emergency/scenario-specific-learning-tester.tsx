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
  Car,
  Heart,
  Shield,
  AlertTriangle,
  TrendingUp,
  BarChart3,
  Play,
  Pause,
  RotateCcw,
  Zap,
  Activity,
  ArrowRight,
  Lightbulb,
} from "lucide-react"

interface EmergencyScenario {
  type: "breakdown" | "accident" | "medical" | "security" | "weather"
  name: string
  icon: React.ReactNode
  priority: "low" | "medium" | "high" | "critical"
  characteristics: {
    timeConstraint: number // seconds
    stressLevel: "low" | "medium" | "high" | "extreme"
    accuracyRequirement: number // 0-1
    speedRequirement: number // 0-1
    securityLevel: "basic" | "standard" | "enhanced" | "maximum"
  }
  optimalMethods: string[]
  learningFocus: string[]
  commonChallenges: string[]
}

interface ScenarioLearning {
  scenario: EmergencyScenario
  iterations: number
  successRate: number
  averageTime: number
  averageAccuracy: number
  learningVelocity: number
  specializations: string[]
  adaptiveStrategies: string[]
  performanceTrend: "improving" | "stable" | "declining"
  confidenceLevel: number
  uniqueLearnings: string[]
  crossScenarioTransfer: Map<string, number>
}

interface LearningIteration {
  id: string
  iteration: number
  scenario: EmergencyScenario
  selectedMethods: string[]
  predictedOutcome: {
    success: number
    time: number
    accuracy: number
  }
  actualOutcome: {
    success: boolean
    time: number
    accuracy: number
  }
  learningInsights: string[]
  adaptations: string[]
  performanceScore: number
  scenarioSpecificScore: number
  timestamp: Date
}

const emergencyScenarios: EmergencyScenario[] = [
  {
    type: "breakdown",
    name: "Vehicle Breakdown",
    icon: <Car className="h-4 w-4" />,
    priority: "medium",
    characteristics: {
      timeConstraint: 90,
      stressLevel: "medium",
      accuracyRequirement: 0.85,
      speedRequirement: 0.6,
      securityLevel: "standard",
    },
    optimalMethods: ["fingerprint", "face"],
    learningFocus: ["efficiency optimization", "battery conservation", "weather adaptation"],
    commonChallenges: ["outdoor conditions", "device exposure", "moderate stress"],
  },
  {
    type: "accident",
    name: "Vehicle Accident",
    icon: <AlertTriangle className="h-4 w-4" />,
    priority: "critical",
    characteristics: {
      timeConstraint: 30,
      stressLevel: "extreme",
      accuracyRequirement: 0.95,
      speedRequirement: 0.9,
      securityLevel: "enhanced",
    },
    optimalMethods: ["fingerprint", "iris"],
    learningFocus: ["stress adaptation", "injury compensation", "rapid verification"],
    commonChallenges: ["extreme stress", "potential injuries", "time pressure", "poor conditions"],
  },
  {
    type: "medical",
    name: "Medical Emergency",
    icon: <Heart className="h-4 w-4" />,
    priority: "critical",
    characteristics: {
      timeConstraint: 45,
      stressLevel: "extreme",
      accuracyRequirement: 0.9,
      speedRequirement: 0.95,
      securityLevel: "enhanced",
    },
    optimalMethods: ["iris", "face"],
    learningFocus: ["speed prioritization", "consciousness adaptation", "medical context"],
    commonChallenges: ["consciousness levels", "medical conditions", "extreme urgency"],
  },
  {
    type: "security",
    name: "Security Threat",
    icon: <Shield className="h-4 w-4" />,
    priority: "high",
    characteristics: {
      timeConstraint: 60,
      stressLevel: "high",
      accuracyRequirement: 0.98,
      speedRequirement: 0.7,
      securityLevel: "maximum",
    },
    optimalMethods: ["fingerprint", "iris", "face"],
    learningFocus: ["maximum security", "multi-modal verification", "threat assessment"],
    commonChallenges: ["security requirements", "verification depth", "threat context"],
  },
  {
    type: "weather",
    name: "Weather Emergency",
    icon: <Cloud className="h-4 w-4" />,
    priority: "high",
    characteristics: {
      timeConstraint: 75,
      stressLevel: "high",
      accuracyRequirement: 0.88,
      speedRequirement: 0.8,
      securityLevel: "standard",
    },
    optimalMethods: ["fingerprint", "voice"],
    learningFocus: ["environmental adaptation", "sensor protection", "weather resilience"],
    commonChallenges: ["weather conditions", "sensor interference", "environmental stress"],
  },
]

const biometricMethods = [
  { id: "fingerprint", name: "Fingerprint", reliability: 0.98, speed: 0.9, weatherResistance: 0.7 },
  { id: "face", name: "Face Recognition", reliability: 0.95, speed: 0.8, weatherResistance: 0.6 },
  { id: "iris", name: "Iris Scanner", reliability: 0.999, speed: 0.7, weatherResistance: 0.8 },
  { id: "voice", name: "Voice Pattern", reliability: 0.92, speed: 0.6, weatherResistance: 0.9 },
]

export function ScenarioSpecificLearningTester() {
  const [scenarioLearnings, setScenarioLearnings] = useState<Map<string, ScenarioLearning>>(new Map())
  const [allIterations, setAllIterations] = useState<LearningIteration[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [currentScenario, setCurrentScenario] = useState<EmergencyScenario | null>(null)
  const [iterationsPerScenario, setIterationsPerScenario] = useState(15)
  const [progress, setProgress] = useState(0)
  const [selectedScenarios, setSelectedScenarios] = useState<string[]>(emergencyScenarios.map((s) => s.type))
  const [showCrossLearning, setShowCrossLearning] = useState(false)

  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Scenario-specific AI learning algorithm
  const simulateScenarioLearning = (
    scenario: EmergencyScenario,
    iteration: number,
    previousIterations: LearningIteration[],
  ): LearningIteration => {
    const scenarioIterations = previousIterations.filter((iter) => iter.scenario.type === scenario.type)
    const crossScenarioIterations = previousIterations.filter((iter) => iter.scenario.type !== scenario.type)

    let selectedMethods: string[] = []
    let predictedOutcome = { success: 0.5, time: 10000, accuracy: 0.7 }
    const learningInsights: string[] = []
    const adaptations: string[] = []

    // Scenario-specific learning logic
    if (scenarioIterations.length === 0) {
      // First attempt for this scenario type
      selectedMethods = [...scenario.optimalMethods]
      predictedOutcome = {
        success: 0.6,
        time: scenario.characteristics.timeConstraint * 1000 * 0.8,
        accuracy: scenario.characteristics.accuracyRequirement * 0.8,
      }
      learningInsights.push(`Initial attempt for ${scenario.name} - using baseline optimal methods`)
    } else {
      // Learn from previous attempts in this scenario
      const successfulAttempts = scenarioIterations.filter((iter) => iter.actualOutcome.success)
      const recentAttempts = scenarioIterations.slice(-3)

      if (successfulAttempts.length > 0) {
        const bestAttempt = successfulAttempts.reduce((best, current) =>
          current.scenarioSpecificScore > best.scenarioSpecificScore ? current : best,
        )

        selectedMethods = [...bestAttempt.selectedMethods]
        predictedOutcome = {
          success: Math.min(bestAttempt.actualOutcome.accuracy + 0.05, 0.99),
          time: bestAttempt.actualOutcome.time * 0.95,
          accuracy: bestAttempt.actualOutcome.accuracy + 0.02,
        }

        learningInsights.push(
          `Replicated successful pattern from iteration ${bestAttempt.iteration} (${scenario.name})`,
        )
        adaptations.push("Applied scenario-specific successful method combination")
      }

      // Scenario-specific adaptations
      switch (scenario.type) {
        case "breakdown":
          if (iteration > 5) {
            // Optimize for efficiency and battery life
            if (selectedMethods.includes("iris") && recentAttempts.every((iter) => iter.actualOutcome.success)) {
              selectedMethods = selectedMethods.filter((m) => m !== "iris")
              adaptations.push("Removed iris scanning for breakdown efficiency (consistent success achieved)")
            }
            learningInsights.push("Breakdown scenario: Optimizing for efficiency and battery conservation")
          }
          break

        case "accident":
          if (iteration > 3) {
            // Prioritize speed and stress adaptation
            if (!selectedMethods.includes("fingerprint")) {
              selectedMethods.unshift("fingerprint")
              adaptations.push("Added fingerprint for accident scenario (stress-resistant)")
            }
            // Reduce time prediction for urgency
            predictedOutcome.time *= 0.8
            learningInsights.push("Accident scenario: Prioritizing speed and stress-resistant methods")
          }
          break

        case "medical":
          if (iteration > 4) {
            // Optimize for maximum speed
            selectedMethods = selectedMethods.filter((m) => m !== "voice") // Remove slowest method
            if (selectedMethods.length < 2 && !selectedMethods.includes("face")) {
              selectedMethods.push("face")
            }
            adaptations.push("Medical emergency optimization: Removed slow methods, prioritized speed")
            learningInsights.push("Medical scenario: Maximum speed prioritization")
          }
          break

        case "security":
          if (iteration > 6) {
            // Ensure maximum security
            const requiredMethods = ["fingerprint", "iris", "face"]
            const missingMethods = requiredMethods.filter((m) => !selectedMethods.includes(m))
            selectedMethods.push(...missingMethods)
            adaptations.push("Security scenario: Enforced multi-modal verification for maximum security")
            learningInsights.push("Security scenario: Maintaining maximum verification depth")
          }
          break

        case "weather":
          if (iteration > 5) {
            // Adapt to weather conditions
            if (selectedMethods.includes("face") && !selectedMethods.includes("voice")) {
              selectedMethods = selectedMethods.map((m) => (m === "face" ? "voice" : m))
              adaptations.push("Weather adaptation: Replaced face recognition with voice (weather resistant)")
            }
            learningInsights.push("Weather scenario: Adapting to environmental conditions")
          }
          break
      }

      // Cross-scenario learning transfer
      if (crossScenarioIterations.length > 0 && iteration > 8) {
        const crossLearnings = crossScenarioIterations
          .filter((iter) => iter.actualOutcome.success)
          .slice(-5)
          .flatMap((iter) => iter.adaptations)

        const applicableLearnings = crossLearnings.filter(
          (learning) =>
            learning.includes("fingerprint") || learning.includes("efficiency") || learning.includes("speed"),
        )

        if (applicableLearnings.length > 0) {
          learningInsights.push(`Applied cross-scenario learning from other emergency types`)
          adaptations.push("Transferred successful strategies from other emergency scenarios")
        }
      }
    }

    // Simulate actual outcomes with scenario-specific variations
    const stressImpact = scenario.characteristics.stressLevel === "extreme" ? 0.8 : 0.9
    const timeImpact = scenario.characteristics.speedRequirement > 0.8 ? 0.9 : 1.0
    const accuracyBonus = scenario.characteristics.accuracyRequirement > 0.9 ? 1.1 : 1.0

    const learningBonus = Math.min(scenarioIterations.length * 0.03, 0.4)
    const actualSuccessProb = Math.min(
      predictedOutcome.success * stressImpact * accuracyBonus + learningBonus + (Math.random() - 0.5) * 0.2,
      0.99,
    )

    const actualSuccess = Math.random() < actualSuccessProb
    const actualTime = predictedOutcome.time * timeImpact * (0.8 + Math.random() * 0.4)
    const actualAccuracy = actualSuccess ? Math.min(actualSuccessProb + Math.random() * 0.1, 0.99) : Math.random() * 0.6

    // Calculate scenario-specific performance score
    const timeScore = Math.max(0, 100 - (actualTime / (scenario.characteristics.timeConstraint * 1000)) * 100)
    const accuracyScore = actualAccuracy * 100
    const speedScore = scenario.characteristics.speedRequirement * 100 - (actualTime / 1000) * 2
    const scenarioSpecificScore = (timeScore + accuracyScore + speedScore) / 3

    const performanceScore = actualAccuracy * 50 + (actualSuccess ? 30 : 0) + timeScore * 0.2

    return {
      id: `${scenario.type}_${iteration}_${Date.now()}`,
      iteration,
      scenario,
      selectedMethods,
      predictedOutcome,
      actualOutcome: {
        success: actualSuccess,
        time: actualTime,
        accuracy: actualAccuracy,
      },
      learningInsights,
      adaptations,
      performanceScore,
      scenarioSpecificScore,
      timestamp: new Date(),
    }
  }

  const updateScenarioLearning = (newIteration: LearningIteration, allIterations: LearningIteration[]) => {
    const scenarioType = newIteration.scenario.type
    const scenarioIterations = allIterations.filter((iter) => iter.scenario.type === scenarioType)

    const successRate =
      scenarioIterations.filter((iter) => iter.actualOutcome.success).length / scenarioIterations.length
    const averageTime =
      scenarioIterations.reduce((sum, iter) => sum + iter.actualOutcome.time, 0) / scenarioIterations.length
    const averageAccuracy =
      scenarioIterations.reduce((sum, iter) => sum + iter.actualOutcome.accuracy, 0) / scenarioIterations.length

    const learningVelocity =
      scenarioIterations.length > 1
        ? (newIteration.scenarioSpecificScore - scenarioIterations[0].scenarioSpecificScore) / scenarioIterations.length
        : 0

    const performanceTrend: "improving" | "stable" | "declining" =
      scenarioIterations.length > 3
        ? scenarioIterations
            .slice(-3)
            .every(
              (iter, index, arr) => index === 0 || iter.scenarioSpecificScore >= arr[index - 1].scenarioSpecificScore,
            )
          ? "improving"
          : scenarioIterations
                .slice(-3)
                .every(
                  (iter, index, arr) =>
                    index === 0 || iter.scenarioSpecificScore <= arr[index - 1].scenarioSpecificScore,
                )
            ? "declining"
            : "stable"
        : "stable"

    const specializations = [...new Set(scenarioIterations.flatMap((iter) => iter.adaptations))]
    const uniqueLearnings = [...new Set(scenarioIterations.flatMap((iter) => iter.learningInsights))]

    // Calculate cross-scenario transfer learning
    const crossScenarioTransfer = new Map<string, number>()
    emergencyScenarios.forEach((scenario) => {
      if (scenario.type !== scenarioType) {
        const crossIterations = allIterations.filter((iter) => iter.scenario.type === scenario.type)
        const transferScore =
          crossIterations.length > 0
            ? crossIterations.filter((iter) => iter.actualOutcome.success).length / crossIterations.length
            : 0
        crossScenarioTransfer.set(scenario.type, transferScore)
      }
    })

    const scenarioLearning: ScenarioLearning = {
      scenario: newIteration.scenario,
      iterations: scenarioIterations.length,
      successRate,
      averageTime,
      averageAccuracy,
      learningVelocity,
      specializations,
      adaptiveStrategies: [...new Set(scenarioIterations.flatMap((iter) => iter.adaptations))],
      performanceTrend,
      confidenceLevel: successRate,
      uniqueLearnings,
      crossScenarioTransfer,
    }

    setScenarioLearnings((prev) => new Map(prev.set(scenarioType, scenarioLearning)))
  }

  const runScenarioSpecificLearning = async () => {
    setIsRunning(true)
    setProgress(0)

    const totalIterations = selectedScenarios.length * iterationsPerScenario
    let completedIterations = 0

    toast({
      title: "🧠 Starting Scenario-Specific Learning",
      description: `Testing AI learning across ${selectedScenarios.length} emergency types`,
    })

    for (const scenarioType of selectedScenarios) {
      const scenario = emergencyScenarios.find((s) => s.type === scenarioType)!
      setCurrentScenario(scenario)

      for (let i = 0; i < iterationsPerScenario; i++) {
        if (!isRunning) break

        const newIteration = simulateScenarioLearning(scenario, i + 1, allIterations)
        const updatedIterations = [...allIterations, newIteration]

        setAllIterations(updatedIterations)
        updateScenarioLearning(newIteration, updatedIterations)

        completedIterations++
        setProgress((completedIterations / totalIterations) * 100)

        toast({
          title: `${scenario.name} - Iteration ${i + 1}`,
          description: `${newIteration.actualOutcome.success ? "Success" : "Failed"} (Score: ${newIteration.scenarioSpecificScore.toFixed(1)})`,
          variant: newIteration.actualOutcome.success ? "default" : "destructive",
        })

        await new Promise((resolve) => setTimeout(resolve, 800))
      }
    }

    setIsRunning(false)
    setCurrentScenario(null)
    toast({
      title: "🎯 Scenario Learning Complete",
      description: `AI has learned specialized strategies for ${selectedScenarios.length} emergency types`,
    })
  }

  const resetLearning = () => {
    setScenarioLearnings(new Map())
    setAllIterations([])
    setProgress(0)
    setCurrentScenario(null)
    setIsRunning(false)
    toast({
      title: "🔄 Learning Reset",
      description: "All scenario-specific learning data has been cleared",
    })
  }

  return (
    <div className="space-y-6">
      <Card className="border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-6 w-6 text-purple-500" />
            <span>Scenario-Specific AI Learning</span>
          </CardTitle>
          <CardDescription>Test how AI learns different strategies for various emergency types</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium">Iterations per Scenario</label>
              <input
                type="number"
                min="5"
                max="30"
                value={iterationsPerScenario}
                onChange={(e) => setIterationsPerScenario(Number.parseInt(e.target.value))}
                className="w-full p-2 border rounded text-sm"
                disabled={isRunning}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Selected Scenarios</label>
              <div className="text-sm font-medium">
                {selectedScenarios.length}/{emergencyScenarios.length}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Total Iterations</label>
              <div className="text-2xl font-bold text-purple-600">
                {selectedScenarios.length * iterationsPerScenario}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Emergency Scenarios to Test</label>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
              {emergencyScenarios.map((scenario) => (
                <label key={scenario.type} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedScenarios.includes(scenario.type)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedScenarios((prev) => [...prev, scenario.type])
                      } else {
                        setSelectedScenarios((prev) => prev.filter((s) => s !== scenario.type))
                      }
                    }}
                    disabled={isRunning}
                    className="rounded"
                  />
                  <div className="flex items-center space-x-1">
                    {scenario.icon}
                    <span className="text-xs">{scenario.name}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="flex space-x-2">
            {!isRunning ? (
              <Button
                onClick={runScenarioSpecificLearning}
                className="flex-1"
                disabled={selectedScenarios.length === 0}
              >
                <Play className="mr-2 h-4 w-4" />
                Start Scenario Learning
              </Button>
            ) : (
              <Button onClick={() => setIsRunning(false)} variant="outline" className="flex-1">
                <Pause className="mr-2 h-4 w-4" />
                Stop Learning
              </Button>
            )}
            <Button onClick={resetLearning} variant="outline" disabled={isRunning}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
            <Button
              onClick={() => setShowCrossLearning(!showCrossLearning)}
              variant="outline"
              disabled={scenarioLearnings.size === 0}
            >
              <ArrowRight className="mr-2 h-4 w-4" />
              Cross-Learning
            </Button>
          </div>

          {isRunning && currentScenario && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {currentScenario.icon}
                  <span className="font-medium">Learning: {currentScenario.name}</span>
                  <Badge
                    variant={
                      currentScenario.priority === "critical"
                        ? "destructive"
                        : currentScenario.priority === "high"
                          ? "default"
                          : currentScenario.priority === "medium"
                            ? "secondary"
                            : "outline"
                    }
                  >
                    {currentScenario.priority}
                  </Badge>
                </div>
                <span className="text-sm text-muted-foreground">{progress.toFixed(1)}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Scenario Learning Results */}
      {scenarioLearnings.size > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from(scenarioLearnings.entries()).map(([scenarioType, learning]) => (
            <Card key={scenarioType} className="border-l-4 border-l-blue-500">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-lg">
                  {learning.scenario.icon}
                  <span>{learning.scenario.name}</span>
                  <Badge
                    variant={
                      learning.performanceTrend === "improving"
                        ? "default"
                        : learning.performanceTrend === "declining"
                          ? "destructive"
                          : "secondary"
                    }
                  >
                    {learning.performanceTrend}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Success Rate:</span>
                    <div className="font-bold text-green-600">{(learning.successRate * 100).toFixed(1)}%</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Avg Time:</span>
                    <div className="font-bold text-blue-600">{(learning.averageTime / 1000).toFixed(1)}s</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Accuracy:</span>
                    <div className="font-bold text-purple-600">{(learning.averageAccuracy * 100).toFixed(1)}%</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Learning Rate:</span>
                    <div className="font-bold text-orange-600">{learning.learningVelocity.toFixed(2)}</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h5 className="text-sm font-semibold text-green-600">Specializations:</h5>
                  <div className="space-y-1">
                    {learning.specializations.slice(0, 2).map((spec, index) => (
                      <div key={index} className="text-xs bg-green-50 p-2 rounded">
                        <Zap className="h-3 w-3 text-green-500 inline mr-1" />
                        {spec}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h5 className="text-sm font-semibold text-blue-600">Key Learnings:</h5>
                  <div className="space-y-1">
                    {learning.uniqueLearnings.slice(0, 2).map((learning_item, index) => (
                      <div key={index} className="text-xs bg-blue-50 p-2 rounded">
                        <Lightbulb className="h-3 w-3 text-blue-500 inline mr-1" />
                        {learning_item}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Cross-Scenario Learning Analysis */}
      {showCrossLearning && scenarioLearnings.size > 1 && (
        <Card className="border-orange-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ArrowRight className="h-5 w-5 text-orange-500" />
              <span>Cross-Scenario Learning Transfer</span>
            </CardTitle>
            <CardDescription>How AI transfers learning between different emergency types</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.from(scenarioLearnings.entries()).map(([scenarioType, learning]) => (
                <div key={scenarioType} className="space-y-2">
                  <div className="flex items-center space-x-2">
                    {learning.scenario.icon}
                    <span className="font-medium">{learning.scenario.name}</span>
                    <span className="text-sm text-muted-foreground">learning transfer to:</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 ml-6">
                    {Array.from(learning.crossScenarioTransfer.entries()).map(([targetScenario, transferScore]) => {
                      const targetScenarioData = emergencyScenarios.find((s) => s.type === targetScenario)
                      return (
                        <div
                          key={targetScenario}
                          className="flex items-center justify-between p-2 bg-gray-50 rounded text-sm"
                        >
                          <div className="flex items-center space-x-1">
                            {targetScenarioData?.icon}
                            <span className="text-xs">{targetScenarioData?.name.split(" ")[0]}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <div className="w-8 bg-gray-200 rounded-full h-1">
                              <div
                                className="bg-orange-500 h-1 rounded-full"
                                style={{ width: `${transferScore * 100}%` }}
                              />
                            </div>
                            <span className="text-xs">{(transferScore * 100).toFixed(0)}%</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Detailed Learning Comparison */}
      {scenarioLearnings.size > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Scenario Learning Comparison</span>
            </CardTitle>
            <CardDescription>Comparative analysis of AI learning across emergency types</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-green-600">Success Rates</h4>
                  {Array.from(scenarioLearnings.entries())
                    .sort(([, a], [, b]) => b.successRate - a.successRate)
                    .map(([scenarioType, learning]) => (
                      <div key={scenarioType} className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-1">
                          {learning.scenario.icon}
                          <span>{learning.scenario.name.split(" ")[0]}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${learning.successRate * 100}%` }}
                            />
                          </div>
                          <span className="text-xs w-8">{(learning.successRate * 100).toFixed(0)}%</span>
                        </div>
                      </div>
                    ))}
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-blue-600">Learning Velocity</h4>
                  {Array.from(scenarioLearnings.entries())
                    .sort(([, a], [, b]) => b.learningVelocity - a.learningVelocity)
                    .map(([scenarioType, learning]) => (
                      <div key={scenarioType} className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-1">
                          {learning.scenario.icon}
                          <span>{learning.scenario.name.split(" ")[0]}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {learning.learningVelocity > 0 ? (
                            <TrendingUp className="h-3 w-3 text-green-500" />
                          ) : (
                            <TrendingUp className="h-3 w-3 text-red-500 rotate-180" />
                          )}
                          <span className="text-xs w-8">{learning.learningVelocity.toFixed(1)}</span>
                        </div>
                      </div>
                    ))}
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-purple-600">Specializations</h4>
                  {Array.from(scenarioLearnings.entries())
                    .sort(([, a], [, b]) => b.specializations.length - a.specializations.length)
                    .map(([scenarioType, learning]) => (
                      <div key={scenarioType} className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-1">
                          {learning.scenario.icon}
                          <span>{learning.scenario.name.split(" ")[0]}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">
                            {learning.specializations.length}
                          </Badge>
                          <span className="text-xs">adaptations</span>
                        </div>
                      </div>
                    ))}
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-orange-600">Performance Trends</h4>
                  {Array.from(scenarioLearnings.entries()).map(([scenarioType, learning]) => (
                    <div key={scenarioType} className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1">
                        {learning.scenario.icon}
                        <span>{learning.scenario.name.split(" ")[0]}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {learning.performanceTrend === "improving" && <TrendingUp className="h-3 w-3 text-green-500" />}
                        {learning.performanceTrend === "declining" && (
                          <TrendingUp className="h-3 w-3 text-red-500 rotate-180" />
                        )}
                        {learning.performanceTrend === "stable" && <Activity className="h-3 w-3 text-yellow-500" />}
                        <span
                          className={`text-xs ${
                            learning.performanceTrend === "improving"
                              ? "text-green-600"
                              : learning.performanceTrend === "declining"
                                ? "text-red-600"
                                : "text-yellow-600"
                          }`}
                        >
                          {learning.performanceTrend}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function Cloud({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M5.5 17a4.5 4.5 0 01-1.44-8.765 4.5 4.5 0 018.302-3.046 3.5 3.5 0 014.504 4.272A4 4 0 0115 17H5.5zm3.75-2.75a.75.75 0 001.5 0V9.66l1.95 2.1a.75.75 0 101.1-1.02l-3.25-3.5a.75.75 0 00-1.1 0l-3.25 3.5a.75.75 0 101.1 1.02l1.95-2.1v4.59z"
        clipRule="evenodd"
      />
    </svg>
  )
}
