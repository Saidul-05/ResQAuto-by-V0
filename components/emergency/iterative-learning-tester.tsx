"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { toast } from "@/components/ui/use-toast"
import {
  Brain,
  TrendingUp,
  BarChart3,
  Zap,
  Target,
  Play,
  Pause,
  RotateCcw,
  LineChart,
  Activity,
  Lightbulb,
  CheckCircle,
  XCircle,
  ArrowUp,
  ArrowDown,
  Minus,
} from "lucide-react"

interface LearningIteration {
  id: string
  iteration: number
  timestamp: Date
  scenario: string
  environmentalContext: any
  userContext: any
  selectedMethods: string[]
  predictedSuccess: number
  predictedTime: number
  actualSuccess: boolean
  actualTime: number
  actualAccuracy: number
  learningPoints: string[]
  adaptations: string[]
  performanceScore: number
  confidenceLevel: number
  efficiencyGain: number
  accuracyImprovement: number
}

interface LearningPattern {
  scenario: string
  iterations: number
  successRate: number
  averageTime: number
  averageAccuracy: number
  bestMethodCombination: string[]
  learningTrend: "improving" | "stable" | "declining"
  confidenceGrowth: number
  keyLearnings: string[]
}

interface AIKnowledgeBase {
  totalIterations: number
  scenarioPatterns: Map<string, LearningPattern>
  methodEffectiveness: Map<string, number>
  contextualLearnings: Map<string, any>
  predictionAccuracy: number
  overallImprovement: number
  learningVelocity: number
}

const emergencyScenarios = [
  {
    name: "Nighttime Breakdown",
    environmental: {
      lighting: "dark",
      noise: "quiet",
      deviceCondition: "good",
      batteryLevel: 60,
      networkStrength: 70,
    },
    user: {
      stressLevel: "moderate",
      injuryStatus: "none",
      consciousnessLevel: "alert",
      timeRemaining: 75,
      emergencyType: "breakdown",
    },
  },
  {
    name: "Severe Accident",
    environmental: {
      lighting: "poor",
      noise: "loud",
      deviceCondition: "damaged",
      batteryLevel: 30,
      networkStrength: 40,
    },
    user: {
      stressLevel: "extreme",
      injuryStatus: "severe",
      consciousnessLevel: "confused",
      timeRemaining: 25,
      emergencyType: "accident",
    },
  },
  {
    name: "Medical Emergency",
    environmental: {
      lighting: "good",
      noise: "moderate",
      deviceCondition: "good",
      batteryLevel: 80,
      networkStrength: 85,
    },
    user: {
      stressLevel: "extreme",
      injuryStatus: "moderate",
      consciousnessLevel: "drowsy",
      timeRemaining: 40,
      emergencyType: "medical",
    },
  },
  {
    name: "Security Threat",
    environmental: {
      lighting: "excellent",
      noise: "quiet",
      deviceCondition: "perfect",
      batteryLevel: 90,
      networkStrength: 95,
    },
    user: {
      stressLevel: "high",
      injuryStatus: "none",
      consciousnessLevel: "alert",
      timeRemaining: 60,
      emergencyType: "security",
    },
  },
  {
    name: "Rainy Night Emergency",
    environmental: {
      lighting: "dark",
      noise: "loud",
      deviceCondition: "good",
      batteryLevel: 45,
      networkStrength: 50,
    },
    user: {
      stressLevel: "high",
      injuryStatus: "minor",
      consciousnessLevel: "alert",
      timeRemaining: 50,
      emergencyType: "breakdown",
    },
  },
]

const biometricMethods = [
  { id: "fingerprint", name: "Fingerprint", baseAccuracy: 0.998, baseTime: 3000 },
  { id: "face", name: "Face Recognition", baseAccuracy: 0.995, baseTime: 4000 },
  { id: "iris", name: "Iris Scanner", baseAccuracy: 0.9999, baseTime: 5000 },
  { id: "voice", name: "Voice Pattern", baseAccuracy: 0.952, baseTime: 6000 },
]

export function IterativeLearningTester() {
  const [iterations, setIterations] = useState<LearningIteration[]>([])
  const [knowledgeBase, setKnowledgeBase] = useState<AIKnowledgeBase>({
    totalIterations: 0,
    scenarioPatterns: new Map(),
    methodEffectiveness: new Map(),
    contextualLearnings: new Map(),
    predictionAccuracy: 0.5,
    overallImprovement: 0,
    learningVelocity: 0,
  })
  const [isRunning, setIsRunning] = useState(false)
  const [currentIteration, setCurrentIteration] = useState(0)
  const [targetIterations, setTargetIterations] = useState(20)
  const [progress, setProgress] = useState(0)
  const [learningRate, setLearningRate] = useState(0.1)
  const [showDetailedAnalysis, setShowDetailedAnalysis] = useState(false)

  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // AI Learning Algorithm
  const simulateAILearning = (
    scenario: any,
    iteration: number,
    previousIterations: LearningIteration[],
  ): LearningIteration => {
    const scenarioName = scenario.name
    const previousScenarioIterations = previousIterations.filter((iter) => iter.scenario === scenarioName)

    // AI learns from previous attempts
    let selectedMethods: string[] = []
    let predictedSuccess = 0.5
    let predictedTime = 15000
    const learningPoints: string[] = []
    const adaptations: string[] = []

    if (previousScenarioIterations.length === 0) {
      // First attempt - use baseline algorithm
      selectedMethods = ["fingerprint", "face"]
      predictedSuccess = 0.7
      predictedTime = 7000
      learningPoints.push("Initial attempt - using baseline method selection")
    } else {
      // Learn from previous attempts
      const successfulAttempts = previousScenarioIterations.filter((iter) => iter.actualSuccess)
      const failedAttempts = previousScenarioIterations.filter((iter) => !iter.actualSuccess)

      if (successfulAttempts.length > 0) {
        // Learn from successful patterns
        const bestAttempt = successfulAttempts.reduce((best, current) =>
          current.performanceScore > best.performanceScore ? current : best,
        )

        selectedMethods = [...bestAttempt.selectedMethods]
        predictedSuccess = Math.min(bestAttempt.actualAccuracy + learningRate, 0.99)
        predictedTime = bestAttempt.actualTime * 0.95 // Optimize time

        learningPoints.push(
          `Learned from iteration ${bestAttempt.iteration} (success rate: ${(bestAttempt.actualAccuracy * 100).toFixed(1)}%)`,
        )
        adaptations.push("Replicated successful method combination")

        // Adaptive improvements based on learning
        if (iteration > 5) {
          // After 5 iterations, start optimizing
          if (bestAttempt.actualTime > 8000) {
            selectedMethods = selectedMethods.filter((method) => method !== "voice") // Remove slow method
            adaptations.push("Removed slow voice recognition for time optimization")
          }

          if (scenario.environmental.batteryLevel < 40) {
            selectedMethods = selectedMethods.filter((method) => method !== "iris") // Remove power-hungry method
            adaptations.push("Removed iris scanning due to low battery learning")
          }
        }
      } else if (failedAttempts.length > 0) {
        // Learn from failures
        const recentFailure = failedAttempts[failedAttempts.length - 1]
        selectedMethods = biometricMethods
          .filter((method) => !recentFailure.selectedMethods.includes(method.id))
          .slice(0, 2)
          .map((method) => method.id)

        if (selectedMethods.length === 0) {
          selectedMethods = ["fingerprint"] // Fallback
        }

        predictedSuccess = 0.6
        predictedTime = 10000

        learningPoints.push(`Learned from failure in iteration ${recentFailure.iteration}`)
        adaptations.push("Avoided previously failed method combination")
      }

      // Advanced learning patterns (after 10 iterations)
      if (iteration > 10) {
        const recentIterations = previousScenarioIterations.slice(-5)
        const averageSuccess =
          recentIterations.reduce((sum, iter) => sum + (iter.actualSuccess ? 1 : 0), 0) / recentIterations.length

        if (averageSuccess > 0.8) {
          // High success rate - optimize for speed
          if (selectedMethods.length > 2) {
            selectedMethods = selectedMethods.slice(0, 2)
            adaptations.push("Reduced methods for speed optimization (high success rate achieved)")
          }
          predictedTime *= 0.9
        } else if (averageSuccess < 0.5) {
          // Low success rate - add more methods for reliability
          const availableMethods = biometricMethods.map((m) => m.id).filter((id) => !selectedMethods.includes(id))
          if (availableMethods.length > 0) {
            selectedMethods.push(availableMethods[0])
            adaptations.push("Added additional method for reliability improvement")
          }
          predictedSuccess += 0.1
        }

        learningPoints.push(`Applied advanced learning (${recentIterations.length} recent iterations analyzed)`)
      }
    }

    // Simulate actual verification results with some randomness and learning bias
    const learningBonus = Math.min(iteration * 0.02, 0.3) // Up to 30% improvement over time
    const actualSuccessProb = Math.min(predictedSuccess + learningBonus + (Math.random() - 0.5) * 0.2, 0.99)
    const actualSuccess = Math.random() < actualSuccessProb

    const timeVariation = (Math.random() - 0.5) * 0.3 // ±30% time variation
    const actualTime = Math.max(predictedTime * (1 + timeVariation), 2000)

    const actualAccuracy = actualSuccess ? Math.min(actualSuccessProb + Math.random() * 0.1, 0.99) : Math.random() * 0.5

    // Calculate performance metrics
    const timePredictionAccuracy = 1 - Math.abs(actualTime - predictedTime) / predictedTime
    const successPredictionAccuracy = actualSuccess === predictedSuccess > 0.7 ? 1 : 0
    const performanceScore = ((timePredictionAccuracy + successPredictionAccuracy + actualAccuracy) / 3) * 100

    const efficiencyGain = iteration > 0 ? ((15000 - actualTime) / 15000) * 100 : 0
    const accuracyImprovement = iteration > 0 ? (actualAccuracy - 0.5) * 100 : 0

    return {
      id: `iter_${iteration}_${Date.now()}`,
      iteration,
      timestamp: new Date(),
      scenario: scenarioName,
      environmentalContext: scenario.environmental,
      userContext: scenario.user,
      selectedMethods,
      predictedSuccess,
      predictedTime,
      actualSuccess,
      actualTime,
      actualAccuracy,
      learningPoints,
      adaptations,
      performanceScore,
      confidenceLevel: predictedSuccess,
      efficiencyGain,
      accuracyImprovement,
    }
  }

  const updateKnowledgeBase = (newIteration: LearningIteration, allIterations: LearningIteration[]) => {
    const scenarioIterations = allIterations.filter((iter) => iter.scenario === newIteration.scenario)

    // Update scenario patterns
    const pattern: LearningPattern = {
      scenario: newIteration.scenario,
      iterations: scenarioIterations.length,
      successRate: scenarioIterations.filter((iter) => iter.actualSuccess).length / scenarioIterations.length,
      averageTime: scenarioIterations.reduce((sum, iter) => sum + iter.actualTime, 0) / scenarioIterations.length,
      averageAccuracy:
        scenarioIterations.reduce((sum, iter) => sum + iter.actualAccuracy, 0) / scenarioIterations.length,
      bestMethodCombination: newIteration.selectedMethods,
      learningTrend:
        scenarioIterations.length > 3
          ? scenarioIterations
              .slice(-3)
              .every((iter, index, arr) => index === 0 || iter.performanceScore >= arr[index - 1].performanceScore)
            ? "improving"
            : scenarioIterations
                  .slice(-3)
                  .every((iter, index, arr) => index === 0 || iter.performanceScore <= arr[index - 1].performanceScore)
              ? "declining"
              : "stable"
          : "stable",
      confidenceGrowth:
        scenarioIterations.length > 1 ? newIteration.confidenceLevel - scenarioIterations[0].confidenceLevel : 0,
      keyLearnings: [...new Set(scenarioIterations.flatMap((iter) => iter.learningPoints))],
    }

    // Calculate overall metrics
    const totalIterations = allIterations.length
    const overallSuccessRate = allIterations.filter((iter) => iter.actualSuccess).length / totalIterations
    const predictionAccuracy =
      allIterations.reduce((sum, iter) => {
        const successPredictionAccuracy = iter.actualSuccess === iter.predictedSuccess > 0.7 ? 1 : 0
        const timePredictionAccuracy = 1 - Math.abs(iter.actualTime - iter.predictedTime) / iter.predictedTime
        return sum + (successPredictionAccuracy + timePredictionAccuracy) / 2
      }, 0) / totalIterations

    const overallImprovement =
      totalIterations > 5
        ? allIterations.slice(-5).reduce((sum, iter) => sum + iter.performanceScore, 0) / 5 -
          allIterations.slice(0, 5).reduce((sum, iter) => sum + iter.performanceScore, 0) / 5
        : 0

    const learningVelocity =
      totalIterations > 1 ? (newIteration.performanceScore - allIterations[0].performanceScore) / totalIterations : 0

    setKnowledgeBase({
      totalIterations,
      scenarioPatterns: new Map([[newIteration.scenario, pattern]]),
      methodEffectiveness: new Map(),
      contextualLearnings: new Map(),
      predictionAccuracy,
      overallImprovement,
      learningVelocity,
    })
  }

  const runSingleIteration = async () => {
    const scenario = emergencyScenarios[Math.floor(Math.random() * emergencyScenarios.length)]
    const newIteration = simulateAILearning(scenario, currentIteration + 1, iterations)

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const updatedIterations = [...iterations, newIteration]
    setIterations(updatedIterations)
    setCurrentIteration((prev) => prev + 1)
    updateKnowledgeBase(newIteration, updatedIterations)

    toast({
      title: `🧠 Iteration ${newIteration.iteration} Complete`,
      description: `${newIteration.scenario}: ${newIteration.actualSuccess ? "Success" : "Failed"} (Score: ${newIteration.performanceScore.toFixed(1)})`,
      variant: newIteration.actualSuccess ? "default" : "destructive",
    })
  }

  const runIterativeLearning = async () => {
    setIsRunning(true)
    setProgress(0)

    toast({
      title: "🚀 Starting Iterative Learning",
      description: `Running ${targetIterations} iterations to test AI learning capabilities`,
    })

    for (let i = currentIteration; i < targetIterations; i++) {
      if (!isRunning) break

      await runSingleIteration()
      setProgress(((i + 1) / targetIterations) * 100)

      // Small delay between iterations for visualization
      await new Promise((resolve) => setTimeout(resolve, 500))
    }

    setIsRunning(false)
    toast({
      title: "🎯 Learning Complete",
      description: `Completed ${targetIterations} iterations. AI has learned and improved!`,
    })
  }

  const pauseLearning = () => {
    setIsRunning(false)
    toast({
      title: "⏸️ Learning Paused",
      description: "Iterative learning has been paused",
    })
  }

  const resetLearning = () => {
    setIterations([])
    setCurrentIteration(0)
    setProgress(0)
    setIsRunning(false)
    setKnowledgeBase({
      totalIterations: 0,
      scenarioPatterns: new Map(),
      methodEffectiveness: new Map(),
      contextualLearnings: new Map(),
      predictionAccuracy: 0.5,
      overallImprovement: 0,
      learningVelocity: 0,
    })
    toast({
      title: "🔄 Learning Reset",
      description: "All learning data has been cleared",
    })
  }

  // Calculate learning trends
  const getLearningTrend = () => {
    if (iterations.length < 5) return { trend: "insufficient-data", value: 0 }

    const recent = iterations.slice(-5)
    const earlier = iterations.slice(0, 5)

    const recentAvg = recent.reduce((sum, iter) => sum + iter.performanceScore, 0) / recent.length
    const earlierAvg = earlier.reduce((sum, iter) => sum + iter.performanceScore, 0) / earlier.length

    const improvement = recentAvg - earlierAvg

    if (improvement > 5) return { trend: "improving", value: improvement }
    if (improvement < -5) return { trend: "declining", value: improvement }
    return { trend: "stable", value: improvement }
  }

  const learningTrend = getLearningTrend()

  return (
    <div className="space-y-6">
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-6 w-6 text-blue-500" />
            <span>Iterative AI Learning System</span>
          </CardTitle>
          <CardDescription>
            Test how the AI algorithm learns and improves its decision-making over multiple verification attempts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium">Target Iterations</label>
              <input
                type="number"
                min="5"
                max="100"
                value={targetIterations}
                onChange={(e) => setTargetIterations(Number.parseInt(e.target.value))}
                className="w-full p-2 border rounded text-sm"
                disabled={isRunning}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Learning Rate</label>
              <input
                type="range"
                min="0.05"
                max="0.3"
                step="0.05"
                value={learningRate}
                onChange={(e) => setLearningRate(Number.parseFloat(e.target.value))}
                className="w-full"
                disabled={isRunning}
              />
              <div className="text-xs text-muted-foreground">{learningRate.toFixed(2)}</div>
            </div>
            <div>
              <label className="text-sm font-medium">Current Progress</label>
              <div className="text-2xl font-bold text-blue-600">
                {currentIteration}/{targetIterations}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Learning Trend</label>
              <div className="flex items-center space-x-2">
                {learningTrend.trend === "improving" && <ArrowUp className="h-4 w-4 text-green-500" />}
                {learningTrend.trend === "declining" && <ArrowDown className="h-4 w-4 text-red-500" />}
                {learningTrend.trend === "stable" && <Minus className="h-4 w-4 text-yellow-500" />}
                <span
                  className={`text-sm font-medium ${
                    learningTrend.trend === "improving"
                      ? "text-green-600"
                      : learningTrend.trend === "declining"
                        ? "text-red-600"
                        : "text-yellow-600"
                  }`}
                >
                  {learningTrend.trend === "insufficient-data"
                    ? "Insufficient Data"
                    : learningTrend.trend.charAt(0).toUpperCase() + learningTrend.trend.slice(1)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex space-x-2">
            {!isRunning ? (
              <Button onClick={runIterativeLearning} className="flex-1">
                <Play className="mr-2 h-4 w-4" />
                Start Learning
              </Button>
            ) : (
              <Button onClick={pauseLearning} variant="outline" className="flex-1">
                <Pause className="mr-2 h-4 w-4" />
                Pause Learning
              </Button>
            )}
            <Button onClick={runSingleIteration} variant="outline" disabled={isRunning}>
              <Zap className="mr-2 h-4 w-4" />
              Single Iteration
            </Button>
            <Button onClick={resetLearning} variant="outline" disabled={isRunning}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>

          {isRunning && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Learning Progress</span>
                <span className="text-sm text-muted-foreground">{progress.toFixed(1)}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Learning Analytics Dashboard */}
      {iterations.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-green-200">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-lg">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <span>Overall Improvement</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">+{knowledgeBase.overallImprovement.toFixed(1)}</div>
              <div className="text-sm text-muted-foreground">Performance Score Gain</div>
              <div className="mt-2 text-xs">
                Learning Velocity: {knowledgeBase.learningVelocity.toFixed(2)}/iteration
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-lg">
                <Target className="h-5 w-5 text-blue-500" />
                <span>Prediction Accuracy</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">
                {(knowledgeBase.predictionAccuracy * 100).toFixed(1)}%
              </div>
              <div className="text-sm text-muted-foreground">AI Prediction Quality</div>
              <div className="mt-2 text-xs">{knowledgeBase.totalIterations} total learning samples</div>
            </CardContent>
          </Card>

          <Card className="border-purple-200">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-lg">
                <Activity className="h-5 w-5 text-purple-500" />
                <span>Success Rate</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">
                {((iterations.filter((iter) => iter.actualSuccess).length / iterations.length) * 100).toFixed(1)}%
              </div>
              <div className="text-sm text-muted-foreground">Verification Success</div>
              <div className="mt-2 text-xs">
                {iterations.filter((iter) => iter.actualSuccess).length}/{iterations.length} successful
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-200">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-lg">
                <Lightbulb className="h-5 w-5 text-orange-500" />
                <span>Learning Insights</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">
                {[...new Set(iterations.flatMap((iter) => iter.learningPoints))].length}
              </div>
              <div className="text-sm text-muted-foreground">Unique Learnings</div>
              <div className="mt-2 text-xs">
                {[...new Set(iterations.flatMap((iter) => iter.adaptations))].length} adaptations applied
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Learning Progress Chart */}
      {iterations.length > 3 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <LineChart className="h-5 w-5" />
              <span>Learning Progress Over Time</span>
            </CardTitle>
            <CardDescription>Performance improvement across iterations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-green-600">Performance Scores</h4>
                  <div className="space-y-1">
                    {iterations.slice(-5).map((iter, index) => (
                      <div key={iter.id} className="flex items-center justify-between text-sm">
                        <span>Iteration {iter.iteration}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${iter.performanceScore}%` }}
                            />
                          </div>
                          <span className="text-xs">{iter.performanceScore.toFixed(1)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-blue-600">Prediction Accuracy</h4>
                  <div className="space-y-1">
                    {iterations.slice(-5).map((iter) => (
                      <div key={iter.id} className="flex items-center justify-between text-sm">
                        <span>{iter.scenario.split(" ")[0]}</span>
                        <div className="flex items-center space-x-2">
                          {iter.actualSuccess === iter.predictedSuccess > 0.7 ? (
                            <CheckCircle className="h-3 w-3 text-green-500" />
                          ) : (
                            <XCircle className="h-3 w-3 text-red-500" />
                          )}
                          <span className="text-xs">{(iter.confidenceLevel * 100).toFixed(0)}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-purple-600">Learning Adaptations</h4>
                  <div className="space-y-1">
                    {iterations.slice(-3).map((iter) => (
                      <div key={iter.id} className="text-xs">
                        <div className="font-medium">Iteration {iter.iteration}:</div>
                        <div className="text-muted-foreground">
                          {iter.adaptations.length > 0 ? iter.adaptations[0] : "No adaptations"}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Iterations */}
      {iterations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Recent Learning Iterations</span>
              <Badge variant="outline">{iterations.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {iterations
                .slice(-5)
                .reverse()
                .map((iteration) => (
                  <Card
                    key={iteration.id}
                    className={`border-l-4 ${
                      iteration.actualSuccess ? "border-l-green-500 bg-green-50" : "border-l-red-500 bg-red-50"
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Brain className="h-4 w-4" />
                          <span className="font-medium">Iteration {iteration.iteration}</span>
                          <Badge variant="outline">{iteration.scenario}</Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          {iteration.actualSuccess ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-500" />
                          )}
                          <span className="text-sm font-medium">Score: {iteration.performanceScore.toFixed(1)}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3 text-sm">
                        <div>
                          <span className="text-muted-foreground">Methods:</span>
                          <div className="font-medium">{iteration.selectedMethods.join(", ")}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Predicted Success:</span>
                          <div className="font-medium">{(iteration.predictedSuccess * 100).toFixed(1)}%</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Actual Accuracy:</span>
                          <div className="font-medium">{(iteration.actualAccuracy * 100).toFixed(1)}%</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Time:</span>
                          <div className="font-medium">{(iteration.actualTime / 1000).toFixed(1)}s</div>
                        </div>
                      </div>

                      {iteration.learningPoints.length > 0 && (
                        <div className="mb-2">
                          <h5 className="text-sm font-semibold text-blue-600 mb-1">Learning Points:</h5>
                          <ul className="text-xs space-y-1">
                            {iteration.learningPoints.map((point, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <span className="text-blue-500 mt-1">•</span>
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {iteration.adaptations.length > 0 && (
                        <div>
                          <h5 className="text-sm font-semibold text-green-600 mb-1">Adaptations Applied:</h5>
                          <ul className="text-xs space-y-1">
                            {iteration.adaptations.map((adaptation, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <Zap className="h-3 w-3 text-green-500 mt-1" />
                                <span>{adaptation}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
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
