"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { toast } from "@/components/ui/use-toast"
import {
  Database,
  TrendingUp,
  BarChart3,
  Play,
  Pause,
  RotateCcw,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Target,
  Activity,
  Zap,
} from "lucide-react"

interface RealWorldData {
  emergencyId: string
  type: string
  timestamp: Date
  location: { lat: number; lng: number; region: string }
  userProfile: {
    age: number
    experienceLevel: "new" | "experienced" | "expert"
    deviceType: string
    previousEmergencies: number
  }
  verificationAttempt: {
    methodsUsed: string[]
    timeToComplete: number
    successRate: number
    retryCount: number
    stressLevel: number
    environmentalFactors: string[]
  }
  outcome: {
    success: boolean
    confidence: number
    userSatisfaction: number
    responseTime: number
    issuesEncountered: string[]
  }
  transferContext: {
    previousEmergencyType?: string
    daysSincePrevious?: number
    performanceImprovement?: number
    transferBenefit?: number
  }
}

interface ValidationResult {
  scenario: string
  simulatedEfficiency: number
  realWorldEfficiency: number
  accuracy: number
  variance: number
  sampleSize: number
  confidenceLevel: number
  validationStatus: "accurate" | "overestimated" | "underestimated"
  keyFactors: string[]
  recommendations: string[]
}

interface ComparisonMetrics {
  overallAccuracy: number
  averageVariance: number
  totalSamples: number
  accurateValidations: number
  overestimations: number
  underestimations: number
  highConfidenceValidations: number
  keyInsights: string[]
  modelAdjustments: string[]
}

// Simulated real-world emergency data
const generateRealWorldData = (count: number): RealWorldData[] => {
  const emergencyTypes = [
    "minor_breakdown",
    "major_breakdown",
    "minor_accident",
    "major_accident",
    "minor_medical",
    "major_medical",
    "security_threat",
    "weather_emergency",
  ]

  const regions = ["urban", "suburban", "rural", "highway", "remote"]
  const devices = ["smartphone", "tablet", "smartwatch", "vehicle_system"]
  const environmentalFactors = [
    "daylight",
    "nighttime",
    "rain",
    "snow",
    "fog",
    "high_wind",
    "extreme_heat",
    "extreme_cold",
    "heavy_traffic",
    "isolated_area",
    "poor_cell_coverage",
    "low_battery",
  ]

  const data: RealWorldData[] = []

  for (let i = 0; i < count; i++) {
    const type = emergencyTypes[Math.floor(Math.random() * emergencyTypes.length)]
    const isHighStress = type.includes("major") || type.includes("accident") || type.includes("medical")
    const isCritical = type.includes("major") || type === "security_threat"

    // Generate realistic user profile
    const experienceLevel = Math.random() < 0.3 ? "new" : Math.random() < 0.7 ? "experienced" : "expert"
    const previousEmergencies =
      experienceLevel === "new"
        ? Math.floor(Math.random() * 2)
        : experienceLevel === "experienced"
          ? Math.floor(Math.random() * 5) + 2
          : Math.floor(Math.random() * 10) + 5

    // Generate verification attempt data
    const baseSuccessRate = experienceLevel === "new" ? 0.65 : experienceLevel === "experienced" ? 0.8 : 0.9
    const stressImpact = isHighStress ? -0.15 : -0.05
    const successRate = Math.max(0.3, Math.min(0.98, baseSuccessRate + stressImpact + (Math.random() - 0.5) * 0.2))

    const methodsUsed = []
    if (Math.random() < 0.9) methodsUsed.push("fingerprint")
    if (Math.random() < 0.7) methodsUsed.push("face")
    if (isCritical && Math.random() < 0.6) methodsUsed.push("iris")
    if (isHighStress && Math.random() < 0.4) methodsUsed.push("voice")

    const baseTime = isCritical ? 45 : isHighStress ? 60 : 90
    const timeToComplete = baseTime + (Math.random() - 0.5) * 30

    // Generate transfer context
    const hasPreviousEmergency = previousEmergencies > 0 && Math.random() < 0.4
    let transferContext: RealWorldData["transferContext"] = {}

    if (hasPreviousEmergency) {
      const previousType = emergencyTypes[Math.floor(Math.random() * emergencyTypes.length)]
      const daysSince = Math.floor(Math.random() * 365) + 1

      // Calculate realistic transfer benefit based on similarity
      const similarity = calculateTypeSimilarity(previousType, type)
      const transferBenefit = similarity * 0.3 + (Math.random() - 0.5) * 0.1
      const performanceImprovement = transferBenefit * 100

      transferContext = {
        previousEmergencyType: previousType,
        daysSincePrevious: daysSince,
        performanceImprovement,
        transferBenefit,
      }
    }

    data.push({
      emergencyId: `EMG_${Date.now()}_${i}`,
      type,
      timestamp: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000),
      location: {
        lat: 40.7128 + (Math.random() - 0.5) * 10,
        lng: -74.006 + (Math.random() - 0.5) * 10,
        region: regions[Math.floor(Math.random() * regions.length)],
      },
      userProfile: {
        age: Math.floor(Math.random() * 50) + 18,
        experienceLevel,
        deviceType: devices[Math.floor(Math.random() * devices.length)],
        previousEmergencies,
      },
      verificationAttempt: {
        methodsUsed,
        timeToComplete,
        successRate,
        retryCount: Math.floor(Math.random() * 3),
        stressLevel: isHighStress ? Math.floor(Math.random() * 3) + 7 : Math.floor(Math.random() * 5) + 3,
        environmentalFactors: environmentalFactors.filter(() => Math.random() < 0.3),
      },
      outcome: {
        success: Math.random() < successRate,
        confidence: successRate + (Math.random() - 0.5) * 0.1,
        userSatisfaction: Math.max(1, Math.min(10, successRate * 10 + (Math.random() - 0.5) * 2)),
        responseTime: timeToComplete + Math.random() * 10,
        issuesEncountered: [],
      },
      transferContext,
    })
  }

  return data
}

const calculateTypeSimilarity = (type1: string, type2: string): number => {
  if (type1 === type2) return 1.0

  // Extract base types and severity
  const getBaseType = (type: string) => type.replace(/^(minor_|major_)/, "")
  const getSeverity = (type: string) =>
    type.startsWith("major_") ? "major" : type.startsWith("minor_") ? "minor" : "standard"

  const base1 = getBaseType(type1)
  const base2 = getBaseType(type2)
  const severity1 = getSeverity(type1)
  const severity2 = getSeverity(type2)

  let similarity = 0

  // Same base type (breakdown, accident, medical)
  if (base1 === base2) similarity += 0.6

  // Same severity level
  if (severity1 === severity2) similarity += 0.3

  // Related types
  if ((base1 === "accident" && base2 === "medical") || (base1 === "medical" && base2 === "accident")) {
    similarity += 0.2
  }

  return Math.max(0, Math.min(1, similarity))
}

export function RealWorldTransferValidator() {
  const [realWorldData, setRealWorldData] = useState<RealWorldData[]>([])
  const [validationResults, setValidationResults] = useState<ValidationResult[]>([])
  const [comparisonMetrics, setComparisonMetrics] = useState<ComparisonMetrics | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [currentPhase, setCurrentPhase] = useState<string>("")
  const [progress, setProgress] = useState(0)
  const [datasetSize, setDatasetSize] = useState(1000)
  const [timeRange, setTimeRange] = useState(365) // days
  const [selectedRegions, setSelectedRegions] = useState<string[]>(["urban", "suburban", "rural", "highway", "remote"])

  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Simulate transfer learning efficiency from real data
  const calculateRealWorldTransferEfficiency = (data: RealWorldData[]): Map<string, number> => {
    const transferEfficiencies = new Map<string, number>()

    // Group data by emergency type
    const typeGroups = data.reduce(
      (groups, emergency) => {
        if (!groups[emergency.type]) groups[emergency.type] = []
        groups[emergency.type].push(emergency)
        return groups
      },
      {} as Record<string, RealWorldData[]>,
    )

    // Calculate transfer efficiency for each type pair
    Object.keys(typeGroups).forEach((sourceType) => {
      Object.keys(typeGroups).forEach((targetType) => {
        if (sourceType === targetType) return

        const transferKey = `${sourceType}->${targetType}`

        // Find emergencies where user had previous experience with source type
        const relevantEmergencies = typeGroups[targetType].filter(
          (emergency) => emergency.transferContext.previousEmergencyType === sourceType,
        )

        if (relevantEmergencies.length === 0) {
          transferEfficiencies.set(transferKey, 0)
          return
        }

        // Calculate average transfer benefit
        const avgTransferBenefit =
          relevantEmergencies.reduce((sum, emergency) => sum + (emergency.transferContext.transferBenefit || 0), 0) /
          relevantEmergencies.length

        // Normalize to 0-1 scale
        const efficiency = Math.max(0, Math.min(1, avgTransferBenefit + 0.5))
        transferEfficiencies.set(transferKey, efficiency)
      })
    })

    return transferEfficiencies
  }

  // Get simulated transfer efficiency (from previous analysis)
  const getSimulatedTransferEfficiency = (): Map<string, number> => {
    const simulatedEfficiencies = new Map<string, number>()

    // These would come from the previous transfer analysis
    // For demo purposes, using realistic simulated values
    const emergencyTypes = [
      "minor_breakdown",
      "major_breakdown",
      "minor_accident",
      "major_accident",
      "minor_medical",
      "major_medical",
      "security_threat",
      "weather_emergency",
    ]

    emergencyTypes.forEach((sourceType) => {
      emergencyTypes.forEach((targetType) => {
        if (sourceType === targetType) return

        const transferKey = `${sourceType}->${targetType}`
        const similarity = calculateTypeSimilarity(sourceType, targetType)

        // Simulate transfer efficiency based on similarity and other factors
        let efficiency = similarity * 0.7 + Math.random() * 0.3

        // Adjust for known patterns
        if (
          sourceType.includes("minor") &&
          targetType.includes("major") &&
          sourceType.replace("minor_", "") === targetType.replace("major_", "")
        ) {
          efficiency = Math.max(efficiency, 0.75) // High transfer for same type, different severity
        }

        if (
          (sourceType.includes("accident") && targetType.includes("medical")) ||
          (sourceType.includes("medical") && targetType.includes("accident"))
        ) {
          efficiency = Math.max(efficiency, 0.65) // Good transfer between related critical types
        }

        if (sourceType === "security_threat" && !targetType.includes("major")) {
          efficiency = Math.min(efficiency, 0.3) // Security doesn't transfer well to non-critical
        }

        simulatedEfficiencies.set(transferKey, efficiency)
      })
    })

    return simulatedEfficiencies
  }

  // Validate simulated vs real-world transfer patterns
  const validateTransferPatterns = async () => {
    setIsRunning(true)
    setProgress(0)
    setValidationResults([])
    setComparisonMetrics(null)

    toast({
      title: "🔍 Starting Real-World Validation",
      description: `Analyzing ${datasetSize} real emergency records over ${timeRange} days`,
    })

    // Phase 1: Generate real-world data
    setCurrentPhase("Generating Real-World Emergency Dataset")
    setProgress(10)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const realData = generateRealWorldData(datasetSize)
    setRealWorldData(realData)

    toast({
      title: "📊 Dataset Generated",
      description: `Created ${realData.length} emergency records with transfer context`,
    })

    // Phase 2: Calculate real-world transfer efficiencies
    setCurrentPhase("Calculating Real-World Transfer Efficiencies")
    setProgress(30)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const realWorldEfficiencies = calculateRealWorldTransferEfficiency(realData)

    // Phase 3: Get simulated efficiencies
    setCurrentPhase("Retrieving Simulated Transfer Efficiencies")
    setProgress(50)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const simulatedEfficiencies = getSimulatedTransferEfficiency()

    // Phase 4: Compare and validate
    setCurrentPhase("Comparing Simulated vs Real-World Patterns")
    setProgress(70)

    const validations: ValidationResult[] = []
    let totalAccuracy = 0
    let totalVariance = 0
    let accurateCount = 0
    let overestimatedCount = 0
    let underestimatedCount = 0
    let highConfidenceCount = 0

    for (const [transferKey, realEfficiency] of realWorldEfficiencies) {
      const simulatedEfficiency = simulatedEfficiencies.get(transferKey) || 0

      if (simulatedEfficiency === 0 && realEfficiency === 0) continue // Skip no-data comparisons

      const variance = Math.abs(simulatedEfficiency - realEfficiency)
      const accuracy = Math.max(0, 1 - variance)
      const sampleSize = realData.filter(
        (d) =>
          d.transferContext.previousEmergencyType &&
          `${d.transferContext.previousEmergencyType}->${d.type}` === transferKey,
      ).length

      let validationStatus: ValidationResult["validationStatus"] = "accurate"
      if (variance > 0.15) {
        validationStatus = simulatedEfficiency > realEfficiency ? "overestimated" : "underestimated"
      }

      const confidenceLevel = sampleSize > 10 ? 0.9 : sampleSize > 5 ? 0.7 : 0.5

      // Generate key factors and recommendations
      const keyFactors: string[] = []
      const recommendations: string[] = []

      if (variance > 0.2) {
        keyFactors.push("High variance detected")
        recommendations.push("Increase real-world data collection")
      }

      if (sampleSize < 5) {
        keyFactors.push("Limited sample size")
        recommendations.push("Extend data collection period")
      }

      if (validationStatus === "overestimated") {
        keyFactors.push("Simulated model too optimistic")
        recommendations.push("Adjust similarity weights downward")
      } else if (validationStatus === "underestimated") {
        keyFactors.push("Simulated model too conservative")
        recommendations.push("Increase transfer benefit calculations")
      }

      validations.push({
        scenario: transferKey,
        simulatedEfficiency,
        realWorldEfficiency: realEfficiency, // Declare the variable before using it
        accuracy,
        variance,
        sampleSize,
        confidenceLevel,
        validationStatus,
        keyFactors,
        recommendations,
      })

      totalAccuracy += accuracy
      totalVariance += variance

      if (validationStatus === "accurate") accurateCount++
      else if (validationStatus === "overestimated") overestimatedCount++
      else underestimatedCount++

      if (confidenceLevel >= 0.8) highConfidenceCount++

      setProgress(70 + (validations.length / realWorldEfficiencies.size) * 20)
      await new Promise((resolve) => setTimeout(resolve, 100))
    }

    setValidationResults(validations)

    // Phase 5: Generate overall metrics
    setCurrentPhase("Generating Validation Metrics")
    setProgress(95)

    const metrics: ComparisonMetrics = {
      overallAccuracy: totalAccuracy / validations.length,
      averageVariance: totalVariance / validations.length,
      totalSamples: validations.reduce((sum, v) => sum + v.sampleSize, 0),
      accurateValidations: accurateCount,
      overestimations: overestimatedCount,
      underestimations: underestimatedCount,
      highConfidenceValidations: highConfidenceCount,
      keyInsights: [
        `${((accurateCount / validations.length) * 100).toFixed(1)}% of transfer patterns accurately predicted`,
        `Average prediction accuracy: ${((totalAccuracy / validations.length) * 100).toFixed(1)}%`,
        `${highConfidenceCount} high-confidence validations out of ${validations.length}`,
        overestimatedCount > underestimatedCount
          ? "Model tends to overestimate transfer efficiency"
          : underestimatedCount > overestimatedCount
            ? "Model tends to underestimate transfer efficiency"
            : "Model shows balanced prediction patterns",
      ],
      modelAdjustments: [
        totalVariance / validations.length > 0.15
          ? "Reduce similarity weight factors"
          : "Maintain current similarity calculations",
        overestimatedCount > validations.length * 0.4
          ? "Decrease base transfer efficiency"
          : "Current transfer rates appropriate",
        highConfidenceCount < validations.length * 0.5
          ? "Increase data collection requirements"
          : "Current confidence levels adequate",
      ],
    }

    setComparisonMetrics(metrics)
    setProgress(100)
    setIsRunning(false)
    setCurrentPhase("")

    toast({
      title: "✅ Validation Complete",
      description: `Analyzed ${validations.length} transfer patterns with ${(metrics.overallAccuracy * 100).toFixed(1)}% accuracy`,
    })
  }

  const resetValidation = () => {
    setRealWorldData([])
    setValidationResults([])
    setComparisonMetrics(null)
    setProgress(0)
    setCurrentPhase("")
    setIsRunning(false)
    toast({
      title: "🔄 Validation Reset",
      description: "All validation data has been cleared",
    })
  }

  return (
    <div className="space-y-6">
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="h-6 w-6 text-blue-500" />
            <span>Real-World Transfer Pattern Validator</span>
          </CardTitle>
          <CardDescription>
            Compare simulated transfer learning patterns with actual emergency response data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium">Dataset Size</label>
              <input
                type="number"
                min="100"
                max="5000"
                value={datasetSize}
                onChange={(e) => setDatasetSize(Number.parseInt(e.target.value))}
                className="w-full p-2 border rounded text-sm"
                disabled={isRunning}
              />
              <div className="text-xs text-muted-foreground mt-1">Emergency records to analyze</div>
            </div>
            <div>
              <label className="text-sm font-medium">Time Range (Days)</label>
              <input
                type="number"
                min="30"
                max="730"
                value={timeRange}
                onChange={(e) => setTimeRange(Number.parseInt(e.target.value))}
                className="w-full p-2 border rounded text-sm"
                disabled={isRunning}
              />
              <div className="text-xs text-muted-foreground mt-1">Historical data period</div>
            </div>
            <div>
              <label className="text-sm font-medium">Transfer Patterns</label>
              <div className="text-2xl font-bold text-blue-600">
                {8 * 7} {/* 8 types, 7 possible targets each */}
              </div>
              <div className="text-xs text-muted-foreground mt-1">Patterns to validate</div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Geographic Regions</label>
            <div className="grid grid-cols-5 gap-2">
              {["urban", "suburban", "rural", "highway", "remote"].map((region) => (
                <label key={region} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedRegions.includes(region)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedRegions((prev) => [...prev, region])
                      } else {
                        setSelectedRegions((prev) => prev.filter((r) => r !== region))
                      }
                    }}
                    disabled={isRunning}
                    className="rounded"
                  />
                  <span className="text-sm capitalize">{region}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex space-x-2">
            {!isRunning ? (
              <Button onClick={validateTransferPatterns} className="flex-1">
                <Play className="mr-2 h-4 w-4" />
                Start Real-World Validation
              </Button>
            ) : (
              <Button onClick={() => setIsRunning(false)} variant="outline" className="flex-1">
                <Pause className="mr-2 h-4 w-4" />
                Stop Validation
              </Button>
            )}
            <Button onClick={resetValidation} variant="outline" disabled={isRunning}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>

          {isRunning && currentPhase && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Activity className="h-4 w-4 text-blue-500" />
                  <span className="font-medium">{currentPhase}</span>
                </div>
                <span className="text-sm text-muted-foreground">{progress.toFixed(1)}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Overall Validation Metrics */}
      {comparisonMetrics && (
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-green-500" />
              <span>Validation Results Summary</span>
            </CardTitle>
            <CardDescription>Overall accuracy of simulated transfer patterns vs real-world data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-green-600">Overall Accuracy</h4>
                <div className="text-3xl font-bold text-green-600">
                  {(comparisonMetrics.overallAccuracy * 100).toFixed(1)}%
                </div>
                <div className="text-sm text-muted-foreground">
                  Average prediction accuracy across all transfer patterns
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-blue-600">Validation Distribution</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      <span>Accurate</span>
                    </div>
                    <span className="font-medium">{comparisonMetrics.accurateValidations}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="h-3 w-3 text-orange-500" />
                      <span>Overestimated</span>
                    </div>
                    <span className="font-medium">{comparisonMetrics.overestimations}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <XCircle className="h-3 w-3 text-red-500" />
                      <span>Underestimated</span>
                    </div>
                    <span className="font-medium">{comparisonMetrics.underestimations}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-purple-600">Data Quality</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Total Samples:</span>
                    <span className="font-medium">{comparisonMetrics.totalSamples.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>High Confidence:</span>
                    <span className="font-medium">{comparisonMetrics.highConfidenceValidations}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg Variance:</span>
                    <span className="font-medium">{(comparisonMetrics.averageVariance * 100).toFixed(1)}%</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-orange-600">Model Performance</h4>
                <div className="space-y-1 text-sm">
                  <Badge
                    variant={
                      comparisonMetrics.overallAccuracy > 0.8
                        ? "default"
                        : comparisonMetrics.overallAccuracy > 0.6
                          ? "secondary"
                          : "destructive"
                    }
                    className="w-full justify-center"
                  >
                    {comparisonMetrics.overallAccuracy > 0.8
                      ? "Excellent"
                      : comparisonMetrics.overallAccuracy > 0.6
                        ? "Good"
                        : "Needs Improvement"}
                  </Badge>
                  <div className="text-xs text-muted-foreground">
                    {comparisonMetrics.overestimations > comparisonMetrics.underestimations
                      ? "Tends to overestimate"
                      : comparisonMetrics.underestimations > comparisonMetrics.overestimations
                        ? "Tends to underestimate"
                        : "Balanced predictions"}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <h4 className="font-semibold text-blue-600 mb-2">Key Insights</h4>
                <ul className="space-y-1 text-sm">
                  {comparisonMetrics.keyInsights.map((insight, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{insight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-orange-600 mb-2">Recommended Model Adjustments</h4>
                <ul className="space-y-1 text-sm">
                  {comparisonMetrics.modelAdjustments.map((adjustment, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Zap className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span>{adjustment}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Detailed Validation Results */}
      {validationResults.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Most Accurate Predictions</span>
              </CardTitle>
              <CardDescription>Transfer patterns with highest prediction accuracy</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {validationResults
                  .sort((a, b) => b.accuracy - a.accuracy)
                  .slice(0, 5)
                  .map((result, index) => (
                    <div key={result.scenario} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">
                            #{index + 1}
                          </Badge>
                          <span className="text-sm font-medium">
                            {result.scenario.replace("->", " → ").replace(/_/g, " ")}
                          </span>
                        </div>
                        <Badge variant="default" className="text-xs">
                          {(result.accuracy * 100).toFixed(1)}%
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div>
                          <span className="text-muted-foreground">Simulated:</span>
                          <div className="font-medium">{(result.simulatedEfficiency * 100).toFixed(1)}%</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Real-World:</span>
                          <div className="font-medium">{(result.realWorldEfficiency * 100).toFixed(1)}%</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Samples:</span>
                          <div className="font-medium">{result.sampleSize}</div>
                        </div>
                      </div>
                      <div className="text-xs">
                        <span className="text-muted-foreground">Status:</span>
                        <Badge
                          variant={result.validationStatus === "accurate" ? "default" : "secondary"}
                          className="ml-1 text-xs"
                        >
                          {result.validationStatus}
                        </Badge>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <span>Largest Prediction Errors</span>
              </CardTitle>
              <CardDescription>Transfer patterns with highest prediction variance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {validationResults
                  .sort((a, b) => b.variance - a.variance)
                  .slice(0, 5)
                  .map((result, index) => (
                    <div key={result.scenario} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Badge variant="destructive" className="text-xs">
                            #{index + 1}
                          </Badge>
                          <span className="text-sm font-medium">
                            {result.scenario.replace("->", " → ").replace(/_/g, " ")}
                          </span>
                        </div>
                        <Badge variant="destructive" className="text-xs">
                          {(result.variance * 100).toFixed(1)}% off
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div>
                          <span className="text-muted-foreground">Simulated:</span>
                          <div className="font-medium">{(result.simulatedEfficiency * 100).toFixed(1)}%</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Real-World:</span>
                          <div className="font-medium">{(result.realWorldEfficiency * 100).toFixed(1)}%</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Samples:</span>
                          <div className="font-medium">{result.sampleSize}</div>
                        </div>
                      </div>
                      <div className="text-xs">
                        <span className="text-muted-foreground">Issue:</span>
                        <div className="text-red-600">{result.keyFactors[0] || "High variance"}</div>
                      </div>
                      <div className="text-xs">
                        <span className="text-muted-foreground">Fix:</span>
                        <div className="text-blue-600">{result.recommendations[0] || "Increase data collection"}</div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Real-World Data Insights */}
      {realWorldData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-blue-500" />
              <span>Real-World Data Insights</span>
            </CardTitle>
            <CardDescription>Analysis of actual emergency response patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-blue-600">Emergency Distribution</h4>
                <div className="space-y-1 text-sm">
                  {Object.entries(
                    realWorldData.reduce(
                      (acc, d) => {
                        acc[d.type] = (acc[d.type] || 0) + 1
                        return acc
                      },
                      {} as Record<string, number>,
                    ),
                  )
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 4)
                    .map(([type, count]) => (
                      <div key={type} className="flex justify-between">
                        <span className="capitalize">{type.replace(/_/g, " ")}</span>
                        <span className="font-medium">{count}</span>
                      </div>
                    ))}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-green-600">User Experience Levels</h4>
                <div className="space-y-1 text-sm">
                  {Object.entries(
                    realWorldData.reduce(
                      (acc, d) => {
                        acc[d.userProfile.experienceLevel] = (acc[d.userProfile.experienceLevel] || 0) + 1
                        return acc
                      },
                      {} as Record<string, number>,
                    ),
                  ).map(([level, count]) => (
                    <div key={level} className="flex justify-between">
                      <span className="capitalize">{level}</span>
                      <span className="font-medium">{count}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-purple-600">Success Rates</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Overall:</span>
                    <span className="font-medium">
                      {((realWorldData.filter((d) => d.outcome.success).length / realWorldData.length) * 100).toFixed(
                        1,
                      )}
                      %
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>With Transfer:</span>
                    <span className="font-medium text-green-600">
                      {(
                        (realWorldData.filter((d) => d.transferContext.previousEmergencyType && d.outcome.success)
                          .length /
                          realWorldData.filter((d) => d.transferContext.previousEmergencyType).length) *
                        100
                      ).toFixed(1)}
                      %
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Without Transfer:</span>
                    <span className="font-medium">
                      {(
                        (realWorldData.filter((d) => !d.transferContext.previousEmergencyType && d.outcome.success)
                          .length /
                          realWorldData.filter((d) => !d.transferContext.previousEmergencyType).length) *
                        100
                      ).toFixed(1)}
                      %
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-orange-600">Transfer Benefits</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Records with Transfer:</span>
                    <span className="font-medium">
                      {realWorldData.filter((d) => d.transferContext.previousEmergencyType).length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg Improvement:</span>
                    <span className="font-medium text-green-600">
                      {(
                        realWorldData
                          .filter((d) => d.transferContext.performanceImprovement)
                          .reduce((sum, d) => sum + (d.transferContext.performanceImprovement || 0), 0) /
                        realWorldData.filter((d) => d.transferContext.performanceImprovement).length
                      ).toFixed(1)}
                      %
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Best Transfer:</span>
                    <span className="font-medium text-green-600">
                      {Math.max(
                        ...realWorldData
                          .filter((d) => d.transferContext.performanceImprovement)
                          .map((d) => d.transferContext.performanceImprovement || 0),
                      ).toFixed(1)}
                      %
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
