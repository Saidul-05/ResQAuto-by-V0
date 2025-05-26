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
  Play,
  Pause,
  RotateCcw,
  Network,
  GitBranch,
  Layers,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react"

interface EmergencyType {
  id: string
  name: string
  category: "critical" | "urgent" | "standard"
  characteristics: {
    timeConstraint: number
    stressLevel: number // 1-10
    accuracyRequirement: number // 0-1
    speedRequirement: number // 0-1
    complexityLevel: number // 1-10
  }
  optimalMethods: string[]
  learningFocus: string[]
  similarityGroups: string[]
}

interface TransferLearning {
  sourceScenario: string
  targetScenario: string
  transferEfficiency: number // 0-1
  transferredKnowledge: string[]
  performanceImprovement: number // percentage
  learningAcceleration: number // iterations saved
  conflictingLearnings: string[]
  synergisticLearnings: string[]
  transferScore: number // 0-100
  transferType: "positive" | "negative" | "neutral"
}

interface LearningSession {
  id: string
  scenario: EmergencyType
  iteration: number
  baselinePerformance: number
  transferredPerformance: number
  improvementFromTransfer: number
  transferSources: string[]
  learningInsights: string[]
  timestamp: Date
}

interface TransferMatrix {
  sourceScenario: string
  targetScenario: string
  efficiency: number
  confidence: number
  sampleSize: number
}

const emergencyTypes: EmergencyType[] = [
  {
    id: "minor_breakdown",
    name: "Minor Breakdown",
    category: "standard",
    characteristics: {
      timeConstraint: 120,
      stressLevel: 3,
      accuracyRequirement: 0.8,
      speedRequirement: 0.5,
      complexityLevel: 3,
    },
    optimalMethods: ["fingerprint", "face"],
    learningFocus: ["efficiency", "battery_conservation"],
    similarityGroups: ["breakdown", "non_critical", "roadside"],
  },
  {
    id: "major_breakdown",
    name: "Major Breakdown",
    category: "urgent",
    characteristics: {
      timeConstraint: 90,
      stressLevel: 6,
      accuracyRequirement: 0.85,
      speedRequirement: 0.7,
      complexityLevel: 6,
    },
    optimalMethods: ["fingerprint", "face", "voice"],
    learningFocus: ["stress_handling", "reliability"],
    similarityGroups: ["breakdown", "urgent", "roadside"],
  },
  {
    id: "minor_accident",
    name: "Minor Accident",
    category: "urgent",
    characteristics: {
      timeConstraint: 60,
      stressLevel: 7,
      accuracyRequirement: 0.9,
      speedRequirement: 0.8,
      complexityLevel: 7,
    },
    optimalMethods: ["fingerprint", "iris"],
    learningFocus: ["stress_adaptation", "accuracy_under_pressure"],
    similarityGroups: ["accident", "urgent", "trauma"],
  },
  {
    id: "major_accident",
    name: "Major Accident",
    category: "critical",
    characteristics: {
      timeConstraint: 30,
      stressLevel: 10,
      accuracyRequirement: 0.95,
      speedRequirement: 0.95,
      complexityLevel: 10,
    },
    optimalMethods: ["fingerprint", "iris", "face"],
    learningFocus: ["extreme_stress", "rapid_verification", "injury_compensation"],
    similarityGroups: ["accident", "critical", "trauma"],
  },
  {
    id: "minor_medical",
    name: "Minor Medical",
    category: "urgent",
    characteristics: {
      timeConstraint: 75,
      stressLevel: 6,
      accuracyRequirement: 0.85,
      speedRequirement: 0.8,
      complexityLevel: 6,
    },
    optimalMethods: ["face", "voice"],
    learningFocus: ["consciousness_awareness", "medical_context"],
    similarityGroups: ["medical", "urgent", "health"],
  },
  {
    id: "major_medical",
    name: "Major Medical",
    category: "critical",
    characteristics: {
      timeConstraint: 45,
      stressLevel: 9,
      accuracyRequirement: 0.9,
      speedRequirement: 0.95,
      complexityLevel: 9,
    },
    optimalMethods: ["iris", "face"],
    learningFocus: ["life_critical_speed", "consciousness_levels"],
    similarityGroups: ["medical", "critical", "health"],
  },
  {
    id: "security_threat",
    name: "Security Threat",
    category: "critical",
    characteristics: {
      timeConstraint: 60,
      stressLevel: 8,
      accuracyRequirement: 0.98,
      speedRequirement: 0.7,
      complexityLevel: 8,
    },
    optimalMethods: ["fingerprint", "iris", "face", "voice"],
    learningFocus: ["maximum_security", "multi_modal", "threat_assessment"],
    similarityGroups: ["security", "critical", "verification"],
  },
  {
    id: "weather_emergency",
    name: "Weather Emergency",
    category: "urgent",
    characteristics: {
      timeConstraint: 90,
      stressLevel: 7,
      accuracyRequirement: 0.85,
      speedRequirement: 0.75,
      complexityLevel: 7,
    },
    optimalMethods: ["fingerprint", "voice"],
    learningFocus: ["environmental_adaptation", "sensor_protection"],
    similarityGroups: ["environmental", "urgent", "external_factors"],
  },
]

export function LearningTransferAnalyzer() {
  const [transferMatrix, setTransferMatrix] = useState<TransferMatrix[]>([])
  const [transferLearnings, setTransferLearnings] = useState<TransferLearning[]>([])
  const [learningSessions, setLearningSessions] = useState<LearningSession[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [currentPhase, setCurrentPhase] = useState<string>("")
  const [progress, setProgress] = useState(0)
  const [selectedScenarios, setSelectedScenarios] = useState<string[]>(emergencyTypes.map((t) => t.id))
  const [iterationsPerScenario, setIterationsPerScenario] = useState(10)
  const [showDetailedMatrix, setShowDetailedMatrix] = useState(false)

  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Calculate similarity between two emergency types
  const calculateSimilarity = (type1: EmergencyType, type2: EmergencyType): number => {
    if (type1.id === type2.id) return 1.0

    let similarity = 0

    // Category similarity (30% weight)
    if (type1.category === type2.category) similarity += 0.3

    // Characteristic similarity (40% weight)
    const charSimilarity =
      1 -
      Math.abs(type1.characteristics.stressLevel - type2.characteristics.stressLevel) / 10 +
      1 -
      Math.abs(type1.characteristics.accuracyRequirement - type2.characteristics.accuracyRequirement) +
      1 -
      Math.abs(type1.characteristics.speedRequirement - type2.characteristics.speedRequirement) +
      1 -
      Math.abs(type1.characteristics.complexityLevel - type2.characteristics.complexityLevel) / 10

    similarity += (charSimilarity / 4) * 0.4

    // Similarity groups overlap (30% weight)
    const commonGroups = type1.similarityGroups.filter((group) => type2.similarityGroups.includes(group))
    const totalGroups = [...new Set([...type1.similarityGroups, ...type2.similarityGroups])]
    similarity += (commonGroups.length / totalGroups.length) * 0.3

    return Math.max(0, Math.min(1, similarity))
  }

  // Simulate learning transfer between scenarios
  const simulateTransferLearning = (
    sourceType: EmergencyType,
    targetType: EmergencyType,
    sourceIterations: number,
  ): TransferLearning => {
    const similarity = calculateSimilarity(sourceType, targetType)
    const baseTransferEfficiency = similarity * 0.8 + Math.random() * 0.2

    // Calculate specific transfer aspects
    const transferredKnowledge: string[] = []
    const conflictingLearnings: string[] = []
    const synergisticLearnings: string[] = []

    // Analyze learning focus overlap
    const commonFocus = sourceType.learningFocus.filter((focus) => targetType.learningFocus.includes(focus))
    const conflictingFocus = sourceType.learningFocus.filter(
      (focus) =>
        !targetType.learningFocus.includes(focus) &&
        ((focus.includes("speed") && targetType.learningFocus.some((tf) => tf.includes("accuracy"))) ||
          (focus.includes("efficiency") && targetType.learningFocus.some((tf) => tf.includes("security")))),
    )

    transferredKnowledge.push(...commonFocus.map((focus) => `${focus} optimization strategies`))
    conflictingLearnings.push(...conflictingFocus.map((focus) => `${focus} conflicts with target requirements`))

    // Analyze method compatibility
    const commonMethods = sourceType.optimalMethods.filter((method) => targetType.optimalMethods.includes(method))
    synergisticLearnings.push(...commonMethods.map((method) => `${method} verification techniques`))

    // Calculate performance improvement
    const stressLevelDiff = Math.abs(sourceType.characteristics.stressLevel - targetType.characteristics.stressLevel)
    const complexityDiff = Math.abs(
      sourceType.characteristics.complexityLevel - targetType.characteristics.complexityLevel,
    )

    let performanceImprovement = baseTransferEfficiency * 25 // Base 25% improvement
    if (stressLevelDiff <= 2) performanceImprovement += 10 // Similar stress levels
    if (complexityDiff <= 2) performanceImprovement += 10 // Similar complexity
    if (commonFocus.length > 0) performanceImprovement += commonFocus.length * 5 // Shared learning focus

    // Calculate learning acceleration (iterations saved)
    const learningAcceleration = Math.floor(baseTransferEfficiency * sourceIterations * 0.6)

    // Determine transfer type
    let transferType: "positive" | "negative" | "neutral" = "neutral"
    if (performanceImprovement > 15 && conflictingLearnings.length <= 1) transferType = "positive"
    else if (conflictingLearnings.length > 2 || performanceImprovement < 5) transferType = "negative"

    // Calculate overall transfer score
    const transferScore = Math.min(
      100,
      baseTransferEfficiency * 40 +
        (performanceImprovement / 50) * 30 +
        (learningAcceleration / 10) * 20 +
        similarity * 10,
    )

    return {
      sourceScenario: sourceType.id,
      targetScenario: targetType.id,
      transferEfficiency: baseTransferEfficiency,
      transferredKnowledge,
      performanceImprovement,
      learningAcceleration,
      conflictingLearnings,
      synergisticLearnings,
      transferScore,
      transferType,
    }
  }

  // Run comprehensive transfer learning analysis
  const runTransferAnalysis = async () => {
    setIsRunning(true)
    setProgress(0)
    setTransferMatrix([])
    setTransferLearnings([])
    setLearningSessions([])

    const selectedTypes = emergencyTypes.filter((type) => selectedScenarios.includes(type.id))
    const totalPhases = selectedTypes.length * (selectedTypes.length - 1) + selectedTypes.length * iterationsPerScenario
    let completedPhases = 0

    toast({
      title: "🧠 Starting Transfer Learning Analysis",
      description: `Analyzing learning transfer between ${selectedTypes.length} emergency types`,
    })

    // Phase 1: Calculate transfer matrix
    setCurrentPhase("Calculating Transfer Matrix")
    const newTransferMatrix: TransferMatrix[] = []
    const newTransferLearnings: TransferLearning[] = []

    for (const sourceType of selectedTypes) {
      for (const targetType of selectedTypes) {
        if (sourceType.id !== targetType.id) {
          const transferLearning = simulateTransferLearning(sourceType, targetType, iterationsPerScenario)
          newTransferLearnings.push(transferLearning)

          newTransferMatrix.push({
            sourceScenario: sourceType.id,
            targetScenario: targetType.id,
            efficiency: transferLearning.transferEfficiency,
            confidence: transferLearning.transferScore / 100,
            sampleSize: iterationsPerScenario,
          })

          completedPhases++
          setProgress((completedPhases / totalPhases) * 100)

          toast({
            title: `Transfer Analysis: ${sourceType.name} → ${targetType.name}`,
            description: `Transfer Efficiency: ${(transferLearning.transferEfficiency * 100).toFixed(1)}%`,
            variant: transferLearning.transferType === "positive" ? "default" : "destructive",
          })

          await new Promise((resolve) => setTimeout(resolve, 300))
        }
      }
    }

    setTransferMatrix(newTransferMatrix)
    setTransferLearnings(newTransferLearnings)

    // Phase 2: Simulate learning sessions with transfer
    setCurrentPhase("Simulating Learning Sessions")
    const newLearningSessions: LearningSession[] = []

    for (const targetType of selectedTypes) {
      for (let iteration = 1; iteration <= iterationsPerScenario; iteration++) {
        // Calculate baseline performance (without transfer)
        const baselinePerformance = 40 + iteration * 3 + Math.random() * 10

        // Calculate transferred performance
        const relevantTransfers = newTransferLearnings.filter((tl) => tl.targetScenario === targetType.id)
        const transferBonus = relevantTransfers.reduce((sum, transfer) => {
          return sum + transfer.performanceImprovement * (transfer.transferEfficiency / relevantTransfers.length)
        }, 0)

        const transferredPerformance = Math.min(95, baselinePerformance + transferBonus)
        const improvementFromTransfer = transferredPerformance - baselinePerformance

        const session: LearningSession = {
          id: `${targetType.id}_${iteration}_${Date.now()}`,
          scenario: targetType,
          iteration,
          baselinePerformance,
          transferredPerformance,
          improvementFromTransfer,
          transferSources: relevantTransfers
            .filter((tl) => tl.transferType === "positive")
            .map((tl) => tl.sourceScenario),
          learningInsights: [
            `Iteration ${iteration}: ${improvementFromTransfer > 5 ? "Significant" : "Minimal"} transfer benefit`,
            ...relevantTransfers
              .filter((tl) => tl.transferType === "positive")
              .slice(0, 2)
              .map((tl) => `Applied learning from ${emergencyTypes.find((et) => et.id === tl.sourceScenario)?.name}`),
          ],
          timestamp: new Date(),
        }

        newLearningSessions.push(session)
        completedPhases++
        setProgress((completedPhases / totalPhases) * 100)

        await new Promise((resolve) => setTimeout(resolve, 200))
      }
    }

    setLearningSessions(newLearningSessions)
    setIsRunning(false)
    setCurrentPhase("")

    toast({
      title: "🎯 Transfer Analysis Complete",
      description: `Analyzed ${newTransferLearnings.length} transfer relationships`,
    })
  }

  const resetAnalysis = () => {
    setTransferMatrix([])
    setTransferLearnings([])
    setLearningSessions([])
    setProgress(0)
    setCurrentPhase("")
    setIsRunning(false)
    toast({
      title: "🔄 Analysis Reset",
      description: "All transfer learning data has been cleared",
    })
  }

  // Calculate transfer efficiency statistics
  const getTransferStats = () => {
    if (transferLearnings.length === 0) return null

    const positiveTransfers = transferLearnings.filter((tl) => tl.transferType === "positive")
    const negativeTransfers = transferLearnings.filter((tl) => tl.transferType === "negative")
    const neutralTransfers = transferLearnings.filter((tl) => tl.transferType === "neutral")

    const avgEfficiency =
      transferLearnings.reduce((sum, tl) => sum + tl.transferEfficiency, 0) / transferLearnings.length
    const avgImprovement =
      transferLearnings.reduce((sum, tl) => sum + tl.performanceImprovement, 0) / transferLearnings.length
    const avgAcceleration =
      transferLearnings.reduce((sum, tl) => sum + tl.learningAcceleration, 0) / transferLearnings.length

    return {
      totalTransfers: transferLearnings.length,
      positiveTransfers: positiveTransfers.length,
      negativeTransfers: negativeTransfers.length,
      neutralTransfers: neutralTransfers.length,
      avgEfficiency: avgEfficiency * 100,
      avgImprovement,
      avgAcceleration,
      bestTransfer: transferLearnings.reduce((best, current) =>
        current.transferScore > best.transferScore ? current : best,
      ),
      worstTransfer: transferLearnings.reduce((worst, current) =>
        current.transferScore < worst.transferScore ? current : worst,
      ),
    }
  }

  const stats = getTransferStats()

  return (
    <div className="space-y-6">
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Network className="h-6 w-6 text-blue-500" />
            <span>Learning Transfer Efficiency Analyzer</span>
          </CardTitle>
          <CardDescription>Measure how effectively learning transfers between similar emergency types</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium">Iterations per Scenario</label>
              <input
                type="number"
                min="5"
                max="20"
                value={iterationsPerScenario}
                onChange={(e) => setIterationsPerScenario(Number.parseInt(e.target.value))}
                className="w-full p-2 border rounded text-sm"
                disabled={isRunning}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Selected Scenarios</label>
              <div className="text-sm font-medium">
                {selectedScenarios.length}/{emergencyTypes.length}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Transfer Relationships</label>
              <div className="text-2xl font-bold text-blue-600">
                {selectedScenarios.length * (selectedScenarios.length - 1)}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Emergency Types to Analyze</label>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
              {emergencyTypes.map((type) => (
                <label key={type.id} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedScenarios.includes(type.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedScenarios((prev) => [...prev, type.id])
                      } else {
                        setSelectedScenarios((prev) => prev.filter((s) => s !== type.id))
                      }
                    }}
                    disabled={isRunning}
                    className="rounded"
                  />
                  <div className="flex flex-col">
                    <span className="text-xs font-medium">{type.name}</span>
                    <Badge
                      variant={
                        type.category === "critical"
                          ? "destructive"
                          : type.category === "urgent"
                            ? "default"
                            : "secondary"
                      }
                      className="text-xs"
                    >
                      {type.category}
                    </Badge>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="flex space-x-2">
            {!isRunning ? (
              <Button onClick={runTransferAnalysis} className="flex-1" disabled={selectedScenarios.length < 2}>
                <Play className="mr-2 h-4 w-4" />
                Start Transfer Analysis
              </Button>
            ) : (
              <Button onClick={() => setIsRunning(false)} variant="outline" className="flex-1">
                <Pause className="mr-2 h-4 w-4" />
                Stop Analysis
              </Button>
            )}
            <Button onClick={resetAnalysis} variant="outline" disabled={isRunning}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
            <Button
              onClick={() => setShowDetailedMatrix(!showDetailedMatrix)}
              variant="outline"
              disabled={transferMatrix.length === 0}
            >
              <Layers className="mr-2 h-4 w-4" />
              Matrix View
            </Button>
          </div>

          {isRunning && currentPhase && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Brain className="h-4 w-4 text-blue-500" />
                  <span className="font-medium">{currentPhase}</span>
                </div>
                <span className="text-sm text-muted-foreground">{progress.toFixed(1)}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Transfer Statistics Overview */}
      {stats && (
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-green-500" />
              <span>Transfer Learning Statistics</span>
            </CardTitle>
            <CardDescription>Overall transfer efficiency metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-green-600">Transfer Distribution</h4>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      <span>Positive</span>
                    </div>
                    <span className="font-medium">{stats.positiveTransfers}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-1">
                      <AlertCircle className="h-3 w-3 text-yellow-500" />
                      <span>Neutral</span>
                    </div>
                    <span className="font-medium">{stats.neutralTransfers}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-1">
                      <XCircle className="h-3 w-3 text-red-500" />
                      <span>Negative</span>
                    </div>
                    <span className="font-medium">{stats.negativeTransfers}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-blue-600">Average Metrics</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Transfer Efficiency:</span>
                    <span className="font-medium">{stats.avgEfficiency.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Performance Gain:</span>
                    <span className="font-medium">{stats.avgImprovement.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Learning Acceleration:</span>
                    <span className="font-medium">{stats.avgAcceleration.toFixed(1)} iter</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-purple-600">Best Transfer</h4>
                <div className="space-y-1 text-sm">
                  <div className="font-medium">
                    {emergencyTypes.find((et) => et.id === stats.bestTransfer.sourceScenario)?.name} →{" "}
                    {emergencyTypes.find((et) => et.id === stats.bestTransfer.targetScenario)?.name}
                  </div>
                  <div className="flex justify-between">
                    <span>Score:</span>
                    <span className="font-medium text-green-600">{stats.bestTransfer.transferScore.toFixed(1)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Improvement:</span>
                    <span className="font-medium">{stats.bestTransfer.performanceImprovement.toFixed(1)}%</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-red-600">Worst Transfer</h4>
                <div className="space-y-1 text-sm">
                  <div className="font-medium">
                    {emergencyTypes.find((et) => et.id === stats.worstTransfer.sourceScenario)?.name} →{" "}
                    {emergencyTypes.find((et) => et.id === stats.worstTransfer.targetScenario)?.name}
                  </div>
                  <div className="flex justify-between">
                    <span>Score:</span>
                    <span className="font-medium text-red-600">{stats.worstTransfer.transferScore.toFixed(1)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Improvement:</span>
                    <span className="font-medium">{stats.worstTransfer.performanceImprovement.toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Detailed Transfer Matrix */}
      {showDetailedMatrix && transferMatrix.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <GitBranch className="h-5 w-5" />
              <span>Transfer Efficiency Matrix</span>
            </CardTitle>
            <CardDescription>Detailed transfer relationships between emergency types</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="text-left p-2">Source → Target</th>
                    {emergencyTypes
                      .filter((type) => selectedScenarios.includes(type.id))
                      .map((type) => (
                        <th key={type.id} className="text-center p-2 text-xs">
                          {type.name.split(" ")[0]}
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {emergencyTypes
                    .filter((type) => selectedScenarios.includes(type.id))
                    .map((sourceType) => (
                      <tr key={sourceType.id}>
                        <td className="p-2 font-medium text-xs">{sourceType.name}</td>
                        {emergencyTypes
                          .filter((type) => selectedScenarios.includes(type.id))
                          .map((targetType) => {
                            if (sourceType.id === targetType.id) {
                              return (
                                <td key={targetType.id} className="text-center p-2">
                                  <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center text-xs">
                                    -
                                  </div>
                                </td>
                              )
                            }

                            const transfer = transferMatrix.find(
                              (tm) => tm.sourceScenario === sourceType.id && tm.targetScenario === targetType.id,
                            )

                            if (!transfer)
                              return (
                                <td key={targetType.id} className="text-center p-2">
                                  -
                                </td>
                              )

                            const efficiency = transfer.efficiency * 100
                            const color =
                              efficiency >= 70
                                ? "bg-green-500"
                                : efficiency >= 50
                                  ? "bg-yellow-500"
                                  : efficiency >= 30
                                    ? "bg-orange-500"
                                    : "bg-red-500"

                            return (
                              <td key={targetType.id} className="text-center p-2">
                                <div
                                  className={`w-8 h-8 ${color} rounded flex items-center justify-center text-xs text-white font-medium`}
                                  title={`Transfer Efficiency: ${efficiency.toFixed(1)}%`}
                                >
                                  {efficiency.toFixed(0)}
                                </div>
                              </td>
                            )
                          })}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex items-center space-x-4 text-xs">
              <span>Transfer Efficiency:</span>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span>70%+</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                <span>50-69%</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-orange-500 rounded"></div>
                <span>30-49%</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span>&lt;30%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Top Transfer Relationships */}
      {transferLearnings.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <span>Most Effective Transfers</span>
              </CardTitle>
              <CardDescription>Highest performing learning transfers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {transferLearnings
                  .filter((tl) => tl.transferType === "positive")
                  .sort((a, b) => b.transferScore - a.transferScore)
                  .slice(0, 5)
                  .map((transfer, index) => {
                    const sourceType = emergencyTypes.find((et) => et.id === transfer.sourceScenario)
                    const targetType = emergencyTypes.find((et) => et.id === transfer.targetScenario)
                    return (
                      <div key={`${transfer.sourceScenario}-${transfer.targetScenario}`} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="text-xs">
                              #{index + 1}
                            </Badge>
                            <span className="text-sm font-medium">
                              {sourceType?.name} → {targetType?.name}
                            </span>
                          </div>
                          <Badge variant="default" className="text-xs">
                            {transfer.transferScore.toFixed(1)}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div>
                            <span className="text-muted-foreground">Efficiency:</span>
                            <div className="font-medium">{(transfer.transferEfficiency * 100).toFixed(1)}%</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Improvement:</span>
                            <div className="font-medium text-green-600">
                              +{transfer.performanceImprovement.toFixed(1)}%
                            </div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Acceleration:</span>
                            <div className="font-medium text-blue-600">{transfer.learningAcceleration} iter</div>
                          </div>
                        </div>
                        <div className="text-xs">
                          <span className="text-muted-foreground">Key Transfer:</span>
                          <div className="text-green-600">{transfer.transferredKnowledge.slice(0, 2).join(", ")}</div>
                        </div>
                      </div>
                    )
                  })}
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <XCircle className="h-5 w-5 text-red-500" />
                <span>Problematic Transfers</span>
              </CardTitle>
              <CardDescription>Transfers with conflicts or poor efficiency</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {transferLearnings
                  .filter((tl) => tl.transferType === "negative" || tl.conflictingLearnings.length > 0)
                  .sort((a, b) => a.transferScore - b.transferScore)
                  .slice(0, 5)
                  .map((transfer, index) => {
                    const sourceType = emergencyTypes.find((et) => et.id === transfer.sourceScenario)
                    const targetType = emergencyTypes.find((et) => et.id === transfer.targetScenario)
                    return (
                      <div key={`${transfer.sourceScenario}-${transfer.targetScenario}`} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Badge variant="destructive" className="text-xs">
                              #{index + 1}
                            </Badge>
                            <span className="text-sm font-medium">
                              {sourceType?.name} → {targetType?.name}
                            </span>
                          </div>
                          <Badge variant="destructive" className="text-xs">
                            {transfer.transferScore.toFixed(1)}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div>
                            <span className="text-muted-foreground">Efficiency:</span>
                            <div className="font-medium">{(transfer.transferEfficiency * 100).toFixed(1)}%</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Improvement:</span>
                            <div className="font-medium text-red-600">
                              +{transfer.performanceImprovement.toFixed(1)}%
                            </div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Conflicts:</span>
                            <div className="font-medium text-red-600">{transfer.conflictingLearnings.length}</div>
                          </div>
                        </div>
                        <div className="text-xs">
                          <span className="text-muted-foreground">Main Conflict:</span>
                          <div className="text-red-600">
                            {transfer.conflictingLearnings.slice(0, 1).join(", ") || "Low similarity"}
                          </div>
                        </div>
                      </div>
                    )
                  })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
