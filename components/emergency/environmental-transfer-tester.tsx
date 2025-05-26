"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { toast } from "@/components/ui/use-toast"
import {
  Cloud,
  CloudRain,
  Sun,
  Snowflake,
  Wind,
  Signal,
  MapPin,
  Thermometer,
  Wifi,
  Phone,
  Play,
  Pause,
  RotateCcw,
  TrendingUp,
  TrendingDown,
  Activity,
  AlertTriangle,
  CheckCircle,
} from "lucide-react"

import {
  type EnvironmentalContext,
  type EnvironmentalImpact,
  EnvironmentalContextService,
  calculateEnvironmentalImpact,
  calculateEnvironmentalTransferEfficiency,
} from "@/lib/environmental-context"

interface EnvironmentalTransferTest {
  id: string
  sourceEmergency: string
  targetEmergency: string
  sourceContext: EnvironmentalContext
  targetContext: EnvironmentalContext
  baseTransferEfficiency: number
  environmentalTransferEfficiency: number
  improvement: number
  sourceImpact: EnvironmentalImpact
  targetImpact: EnvironmentalImpact
  contextSimilarity: number
  recommendations: string[]
}

interface EnvironmentalScenario {
  name: string
  description: string
  weather: EnvironmentalContext["weather"]["type"]
  coverage: EnvironmentalContext["coverage"]["cellSignal"]
  location: EnvironmentalContext["location"]["region"]
  timeOfDay: EnvironmentalContext["timeOfDay"]
  expectedImpact: "positive" | "neutral" | "negative"
}

const predefinedScenarios: EnvironmentalScenario[] = [
  {
    name: "Optimal Conditions",
    description: "Clear weather, excellent coverage, urban area, daytime",
    weather: "clear",
    coverage: "excellent",
    location: "urban",
    timeOfDay: "afternoon",
    expectedImpact: "positive",
  },
  {
    name: "Storm Emergency",
    description: "Heavy storm, poor coverage, highway, nighttime",
    weather: "storm",
    coverage: "poor",
    location: "highway",
    timeOfDay: "night",
    expectedImpact: "negative",
  },
  {
    name: "Winter Challenge",
    description: "Snow conditions, fair coverage, rural area, early morning",
    weather: "snow",
    coverage: "fair",
    location: "rural",
    timeOfDay: "dawn",
    expectedImpact: "negative",
  },
  {
    name: "Remote Location",
    description: "Clear weather, no coverage, wilderness, late night",
    weather: "clear",
    coverage: "none",
    location: "wilderness",
    timeOfDay: "late_night",
    expectedImpact: "negative",
  },
  {
    name: "Foggy Conditions",
    description: "Dense fog, good coverage, suburban area, evening",
    weather: "fog",
    coverage: "good",
    location: "suburban",
    timeOfDay: "evening",
    expectedImpact: "neutral",
  },
  {
    name: "Extreme Heat",
    description: "Extreme heat, excellent coverage, urban area, afternoon",
    weather: "extreme_heat",
    coverage: "excellent",
    location: "urban",
    timeOfDay: "afternoon",
    expectedImpact: "negative",
  },
]

export function EnvironmentalTransferTester() {
  const [isRunning, setIsRunning] = useState(false)
  const [currentPhase, setCurrentPhase] = useState<string>("")
  const [progress, setProgress] = useState(0)
  const [tests, setTests] = useState<EnvironmentalTransferTest[]>([])
  const [selectedScenarios, setSelectedScenarios] = useState<string[]>(predefinedScenarios.map((s) => s.name))
  const [testCount, setTestCount] = useState(50)
  const [currentTest, setCurrentTest] = useState<EnvironmentalTransferTest | null>(null)

  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const environmentalService = EnvironmentalContextService.getInstance()

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

  const generateEnvironmentalContext = (scenario?: EnvironmentalScenario): EnvironmentalContext => {
    if (scenario) {
      return {
        weather: {
          type: scenario.weather,
          severity: "moderate",
          visibility: scenario.weather === "fog" ? 200 : scenario.weather === "storm" ? 500 : 5000,
          temperature: scenario.weather === "extreme_heat" ? 40 : scenario.weather === "extreme_cold" ? -15 : 20,
          windSpeed: scenario.weather === "storm" ? 80 : scenario.weather === "snow" ? 30 : 15,
          humidity: scenario.weather === "rain" ? 90 : 60,
        },
        coverage: {
          cellSignal: scenario.coverage,
          signalStrength: scenario.coverage === "excellent" ? -60 : scenario.coverage === "poor" ? -100 : -80,
          networkType: scenario.coverage === "excellent" ? "5G" : scenario.coverage === "poor" ? "3G" : "4G",
          dataSpeed: scenario.coverage === "excellent" ? 100 : scenario.coverage === "poor" ? 5 : 25,
          latency: scenario.coverage === "excellent" ? 20 : scenario.coverage === "poor" ? 150 : 60,
          reliability: scenario.coverage === "excellent" ? 0.95 : scenario.coverage === "poor" ? 0.6 : 0.8,
        },
        location: {
          region: scenario.location,
          population: scenario.location === "urban" ? 500000 : scenario.location === "wilderness" ? 0 : 50000,
          nearestTower: scenario.location === "urban" ? 0.5 : scenario.location === "wilderness" ? 25 : 5,
          emergencyServices: scenario.location === "urban" ? 2 : scenario.location === "wilderness" ? 30 : 10,
          terrain: "flat",
          infrastructure:
            scenario.location === "urban" ? "excellent" : scenario.location === "wilderness" ? "minimal" : "good",
        },
        timeOfDay: scenario.timeOfDay,
        season: "spring",
        timestamp: new Date(),
        confidence: 0.9,
      }
    }

    // Generate random context
    const weatherTypes: EnvironmentalContext["weather"]["type"][] = [
      "clear",
      "cloudy",
      "rain",
      "snow",
      "fog",
      "storm",
      "extreme_heat",
      "extreme_cold",
    ]
    const coverageTypes: EnvironmentalContext["coverage"]["cellSignal"][] = [
      "excellent",
      "good",
      "fair",
      "poor",
      "none",
    ]
    const locationTypes: EnvironmentalContext["location"]["region"][] = [
      "urban",
      "suburban",
      "rural",
      "highway",
      "remote",
      "wilderness",
    ]
    const timeTypes: EnvironmentalContext["timeOfDay"][] = [
      "dawn",
      "morning",
      "afternoon",
      "evening",
      "night",
      "late_night",
    ]

    const weather = weatherTypes[Math.floor(Math.random() * weatherTypes.length)]
    const coverage = coverageTypes[Math.floor(Math.random() * coverageTypes.length)]
    const location = locationTypes[Math.floor(Math.random() * locationTypes.length)]
    const timeOfDay = timeTypes[Math.floor(Math.random() * timeTypes.length)]

    return {
      weather: {
        type: weather,
        severity: "moderate",
        visibility: weather === "fog" ? 200 : weather === "storm" ? 500 : Math.random() * 8000 + 2000,
        temperature: weather === "extreme_heat" ? 40 : weather === "extreme_cold" ? -15 : Math.random() * 40 - 10,
        windSpeed: weather === "storm" ? Math.random() * 50 + 50 : Math.random() * 30 + 5,
        humidity: Math.random() * 40 + 40,
      },
      coverage: {
        cellSignal: coverage,
        signalStrength: coverage === "excellent" ? -60 : coverage === "poor" ? -100 : Math.random() * -40 - 60,
        networkType: coverage === "excellent" ? "5G" : coverage === "poor" ? "3G" : "4G",
        dataSpeed: coverage === "excellent" ? 100 : coverage === "poor" ? 5 : Math.random() * 50 + 10,
        latency: coverage === "excellent" ? 20 : coverage === "poor" ? 150 : Math.random() * 80 + 30,
        reliability: coverage === "excellent" ? 0.95 : coverage === "poor" ? 0.6 : Math.random() * 0.3 + 0.7,
      },
      location: {
        region: location,
        population: location === "urban" ? 500000 : location === "wilderness" ? 0 : Math.random() * 100000,
        nearestTower: location === "urban" ? 0.5 : location === "wilderness" ? 25 : Math.random() * 15 + 2,
        emergencyServices: location === "urban" ? 2 : location === "wilderness" ? 30 : Math.random() * 20 + 5,
        terrain: "flat",
        infrastructure: location === "urban" ? "excellent" : location === "wilderness" ? "minimal" : "good",
      },
      timeOfDay,
      season: "spring",
      timestamp: new Date(),
      confidence: 0.85,
    }
  }

  const runEnvironmentalTransferTests = async () => {
    setIsRunning(true)
    setProgress(0)
    setTests([])
    setCurrentTest(null)

    toast({
      title: "🌦️ Starting Environmental Transfer Tests",
      description: `Testing ${testCount} transfer scenarios with environmental factors`,
    })

    const testResults: EnvironmentalTransferTest[] = []

    // Phase 1: Generate test scenarios
    setCurrentPhase("Generating Environmental Test Scenarios")
    setProgress(10)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    for (let i = 0; i < testCount; i++) {
      const sourceEmergency = emergencyTypes[Math.floor(Math.random() * emergencyTypes.length)]
      const targetEmergency = emergencyTypes[Math.floor(Math.random() * emergencyTypes.length)]

      if (sourceEmergency === targetEmergency) continue

      // Use predefined scenarios for some tests
      const useScenario = Math.random() < 0.3 && selectedScenarios.length > 0
      const selectedScenario = useScenario
        ? predefinedScenarios.find((s) => selectedScenarios.includes(s.name))
        : undefined

      const sourceContext = generateEnvironmentalContext(selectedScenario)
      const targetContext = generateEnvironmentalContext()

      // Calculate base transfer efficiency (without environmental factors)
      const baseTransferEfficiency = Math.random() * 0.6 + 0.3 // 0.3 to 0.9

      // Calculate environmental transfer efficiency
      const environmentalTransferEfficiency = calculateEnvironmentalTransferEfficiency(
        baseTransferEfficiency,
        sourceContext,
        targetContext,
      )

      const improvement = ((environmentalTransferEfficiency - baseTransferEfficiency) / baseTransferEfficiency) * 100

      const sourceImpact = calculateEnvironmentalImpact(sourceContext)
      const targetImpact = calculateEnvironmentalImpact(targetContext)

      // Calculate context similarity (simplified)
      const contextSimilarity =
        (sourceContext.weather.type === targetContext.weather.type ? 0.25 : 0) +
        (sourceContext.coverage.cellSignal === targetContext.coverage.cellSignal ? 0.25 : 0) +
        (sourceContext.location.region === targetContext.location.region ? 0.25 : 0) +
        (sourceContext.timeOfDay === targetContext.timeOfDay ? 0.25 : 0)

      // Generate recommendations
      const recommendations = []
      if (sourceImpact.verificationDifficulty > 0.5) {
        recommendations.push("Use fallback verification methods in source scenario")
      }
      if (targetImpact.verificationDifficulty > 0.5) {
        recommendations.push("Pre-adapt for challenging target conditions")
      }
      if (contextSimilarity < 0.3) {
        recommendations.push("Apply environmental context penalties")
      }
      if (improvement < -10) {
        recommendations.push("Consider environmental coaching for negative conditions")
      }

      const test: EnvironmentalTransferTest = {
        id: `test_${i + 1}`,
        sourceEmergency,
        targetEmergency,
        sourceContext,
        targetContext,
        baseTransferEfficiency,
        environmentalTransferEfficiency,
        improvement,
        sourceImpact,
        targetImpact,
        contextSimilarity,
        recommendations,
      }

      testResults.push(test)
      setCurrentTest(test)
      setProgress(10 + (i / testCount) * 60)
      await new Promise((resolve) => setTimeout(resolve, 50))
    }

    // Phase 2: Analyze results
    setCurrentPhase("Analyzing Environmental Impact Patterns")
    setProgress(75)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Sort tests by improvement
    testResults.sort((a, b) => b.improvement - a.improvement)

    setTests(testResults)
    setProgress(100)
    setCurrentPhase("")
    setIsRunning(false)

    toast({
      title: "✅ Environmental Testing Complete",
      description: `Analyzed ${testResults.length} transfer scenarios with environmental factors`,
    })
  }

  const resetTests = () => {
    setTests([])
    setCurrentTest(null)
    setProgress(0)
    setCurrentPhase("")
    setIsRunning(false)
    toast({
      title: "🔄 Tests Reset",
      description: "All environmental transfer test data has been cleared",
    })
  }

  const getWeatherIcon = (weather: EnvironmentalContext["weather"]["type"]) => {
    switch (weather) {
      case "clear":
        return <Sun className="h-4 w-4 text-yellow-500" />
      case "cloudy":
        return <Cloud className="h-4 w-4 text-gray-500" />
      case "rain":
        return <CloudRain className="h-4 w-4 text-blue-500" />
      case "snow":
        return <Snowflake className="h-4 w-4 text-blue-300" />
      case "storm":
        return <Wind className="h-4 w-4 text-purple-500" />
      case "fog":
        return <Cloud className="h-4 w-4 text-gray-400" />
      case "extreme_heat":
        return <Thermometer className="h-4 w-4 text-red-500" />
      case "extreme_cold":
        return <Snowflake className="h-4 w-4 text-blue-600" />
      default:
        return <Sun className="h-4 w-4" />
    }
  }

  const getSignalIcon = (signal: EnvironmentalContext["coverage"]["cellSignal"]) => {
    switch (signal) {
      case "excellent":
        return <Signal className="h-4 w-4 text-green-500" />
      case "good":
        return <Signal className="h-4 w-4 text-blue-500" />
      case "fair":
        return <Signal className="h-4 w-4 text-yellow-500" />
      case "poor":
        return <Signal className="h-4 w-4 text-orange-500" />
      case "none":
        return <Phone className="h-4 w-4 text-red-500" />
      default:
        return <Signal className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Cloud className="h-6 w-6 text-blue-500" />
            <span>Environmental Transfer Learning Tester</span>
          </CardTitle>
          <CardDescription>
            Test how weather and coverage conditions affect AI transfer learning efficiency
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Number of Tests</label>
              <input
                type="number"
                min="10"
                max="200"
                value={testCount}
                onChange={(e) => setTestCount(Number.parseInt(e.target.value))}
                className="w-full p-2 border rounded text-sm"
                disabled={isRunning}
              />
              <div className="text-xs text-muted-foreground mt-1">Transfer scenarios to test</div>
            </div>
            <div>
              <label className="text-sm font-medium">Environmental Factors</label>
              <div className="text-2xl font-bold text-blue-600">8 + 5 + 6</div>
              <div className="text-xs text-muted-foreground mt-1">Weather + Coverage + Location</div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Test Scenarios</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {predefinedScenarios.map((scenario) => (
                <label
                  key={scenario.name}
                  className="flex items-center space-x-2 cursor-pointer p-2 border rounded hover:bg-gray-50"
                >
                  <input
                    type="checkbox"
                    checked={selectedScenarios.includes(scenario.name)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedScenarios((prev) => [...prev, scenario.name])
                      } else {
                        setSelectedScenarios((prev) => prev.filter((s) => s !== scenario.name))
                      }
                    }}
                    disabled={isRunning}
                    className="rounded"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      {getWeatherIcon(scenario.weather)}
                      {getSignalIcon(scenario.coverage)}
                      <span className="text-sm font-medium">{scenario.name}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">{scenario.description}</div>
                  </div>
                  <Badge
                    variant={
                      scenario.expectedImpact === "positive"
                        ? "default"
                        : scenario.expectedImpact === "negative"
                          ? "destructive"
                          : "secondary"
                    }
                    className="text-xs"
                  >
                    {scenario.expectedImpact}
                  </Badge>
                </label>
              ))}
            </div>
          </div>

          <div className="flex space-x-2">
            {!isRunning ? (
              <Button onClick={runEnvironmentalTransferTests} className="flex-1">
                <Play className="mr-2 h-4 w-4" />
                Start Environmental Tests
              </Button>
            ) : (
              <Button onClick={() => setIsRunning(false)} variant="outline" className="flex-1">
                <Pause className="mr-2 h-4 w-4" />
                Stop Tests
              </Button>
            )}
            <Button onClick={resetTests} variant="outline" disabled={isRunning}>
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
              {currentTest && (
                <div className="text-sm text-muted-foreground">
                  Testing: {currentTest.sourceEmergency.replace(/_/g, " ")} →{" "}
                  {currentTest.targetEmergency.replace(/_/g, " ")}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Test Results Summary */}
      {tests.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <span>Positive Impact</span>
              </CardTitle>
              <CardDescription>Environmental factors that improve transfer</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {tests
                  .filter((test) => test.improvement > 5)
                  .slice(0, 5)
                  .map((test, index) => (
                    <div key={test.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">
                            #{index + 1}
                          </Badge>
                          <span className="text-sm font-medium">
                            {test.sourceEmergency.replace(/_/g, " ")} → {test.targetEmergency.replace(/_/g, " ")}
                          </span>
                        </div>
                        <Badge variant="default" className="text-xs">
                          +{test.improvement.toFixed(1)}%
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-muted-foreground">Source:</span>
                          <div className="flex items-center space-x-1">
                            {getWeatherIcon(test.sourceContext.weather.type)}
                            {getSignalIcon(test.sourceContext.coverage.cellSignal)}
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Target:</span>
                          <div className="flex items-center space-x-1">
                            {getWeatherIcon(test.targetContext.weather.type)}
                            {getSignalIcon(test.targetContext.coverage.cellSignal)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-yellow-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-yellow-500" />
                <span>Neutral Impact</span>
              </CardTitle>
              <CardDescription>Balanced environmental conditions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {tests
                  .filter((test) => test.improvement >= -5 && test.improvement <= 5)
                  .slice(0, 5)
                  .map((test, index) => (
                    <div key={test.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">
                            #{index + 1}
                          </Badge>
                          <span className="text-sm font-medium">
                            {test.sourceEmergency.replace(/_/g, " ")} → {test.targetEmergency.replace(/_/g, " ")}
                          </span>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {test.improvement > 0 ? "+" : ""}
                          {test.improvement.toFixed(1)}%
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-muted-foreground">Context Sim:</span>
                          <div className="font-medium">{(test.contextSimilarity * 100).toFixed(0)}%</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Base Eff:</span>
                          <div className="font-medium">{(test.baseTransferEfficiency * 100).toFixed(0)}%</div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingDown className="h-5 w-5 text-red-500" />
                <span>Negative Impact</span>
              </CardTitle>
              <CardDescription>Challenging environmental conditions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {tests
                  .filter((test) => test.improvement < -5)
                  .slice(0, 5)
                  .map((test, index) => (
                    <div key={test.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Badge variant="destructive" className="text-xs">
                            #{index + 1}
                          </Badge>
                          <span className="text-sm font-medium">
                            {test.sourceEmergency.replace(/_/g, " ")} → {test.targetEmergency.replace(/_/g, " ")}
                          </span>
                        </div>
                        <Badge variant="destructive" className="text-xs">
                          {test.improvement.toFixed(1)}%
                        </Badge>
                      </div>
                      <div className="text-xs">
                        <span className="text-muted-foreground">Main Issue:</span>
                        <div className="text-red-600">{test.recommendations[0] || "Environmental challenges"}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-muted-foreground">Source Diff:</span>
                          <div className="font-medium">
                            {(test.sourceImpact.verificationDifficulty * 100).toFixed(0)}%
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Target Diff:</span>
                          <div className="font-medium">
                            {(test.targetImpact.verificationDifficulty * 100).toFixed(0)}%
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Environmental Impact Analysis */}
      {tests.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-blue-500" />
              <span>Environmental Impact Analysis</span>
            </CardTitle>
            <CardDescription>Statistical analysis of environmental factors on transfer learning</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-green-600">Positive Factors</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Clear Weather:</span>
                    <span className="font-medium text-green-600">
                      +
                      {(
                        (tests.filter((t) => t.sourceContext.weather.type === "clear" && t.improvement > 0).length /
                          tests.filter((t) => t.sourceContext.weather.type === "clear").length) *
                        100
                      ).toFixed(0)}
                      %
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Excellent Coverage:</span>
                    <span className="font-medium text-green-600">
                      +
                      {(
                        (tests.filter((t) => t.sourceContext.coverage.cellSignal === "excellent" && t.improvement > 0)
                          .length /
                          tests.filter((t) => t.sourceContext.coverage.cellSignal === "excellent").length) *
                        100
                      ).toFixed(0)}
                      %
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Urban Areas:</span>
                    <span className="font-medium text-green-600">
                      +
                      {(
                        (tests.filter((t) => t.sourceContext.location.region === "urban" && t.improvement > 0).length /
                          tests.filter((t) => t.sourceContext.location.region === "urban").length) *
                        100
                      ).toFixed(0)}
                      %
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-red-600">Negative Factors</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Storm Conditions:</span>
                    <span className="font-medium text-red-600">
                      {(
                        (tests.filter((t) => t.sourceContext.weather.type === "storm" && t.improvement < 0).length /
                          tests.filter((t) => t.sourceContext.weather.type === "storm").length) *
                        100
                      ).toFixed(0)}
                      % negative
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>No Coverage:</span>
                    <span className="font-medium text-red-600">
                      {(
                        (tests.filter((t) => t.sourceContext.coverage.cellSignal === "none" && t.improvement < 0)
                          .length /
                          tests.filter((t) => t.sourceContext.coverage.cellSignal === "none").length) *
                        100
                      ).toFixed(0)}
                      % negative
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Remote Areas:</span>
                    <span className="font-medium text-red-600">
                      {(
                        (tests.filter((t) => t.sourceContext.location.region === "remote" && t.improvement < 0).length /
                          tests.filter((t) => t.sourceContext.location.region === "remote").length) *
                        100
                      ).toFixed(0)}
                      % negative
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-blue-600">Overall Statistics</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Avg Improvement:</span>
                    <span className="font-medium">
                      {(tests.reduce((sum, t) => sum + t.improvement, 0) / tests.length).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Positive Impact:</span>
                    <span className="font-medium text-green-600">{tests.filter((t) => t.improvement > 5).length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Negative Impact:</span>
                    <span className="font-medium text-red-600">{tests.filter((t) => t.improvement < -5).length}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-orange-600">Recommendations</h4>
                <div className="space-y-1 text-sm">
                  <Badge variant="outline" className="w-full justify-center text-xs">
                    <CheckCircle className="mr-1 h-3 w-3" />
                    Weather-aware algorithms
                  </Badge>
                  <Badge variant="outline" className="w-full justify-center text-xs">
                    <Wifi className="mr-1 h-3 w-3" />
                    Coverage compensation
                  </Badge>
                  <Badge variant="outline" className="w-full justify-center text-xs">
                    <AlertTriangle className="mr-1 h-3 w-3" />
                    Environmental coaching
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
