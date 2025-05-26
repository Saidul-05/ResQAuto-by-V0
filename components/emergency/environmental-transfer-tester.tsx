"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { toast } from "@/components/ui/use-toast"
import {
  Cloud,
  MapPin,
  Clock,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Activity,
  Signal,
  Navigation,
} from "lucide-react"
import {
  type EnvironmentalConditions,
  type TransferScenario,
  type EnvironmentalImpact,
  calculateEnvironmentalTransferRate,
  getCurrentEnvironmentalConditions,
} from "@/lib/environmental-transfer-calculator"

interface TestScenario {
  id: string
  name: string
  description: string
  scenario: TransferScenario
  conditions: EnvironmentalConditions
  expectedImpact: "positive" | "negative" | "neutral"
}

export function EnvironmentalTransferTester() {
  const [currentConditions, setCurrentConditions] = useState<EnvironmentalConditions | null>(null)
  const [testScenarios, setTestScenarios] = useState<TestScenario[]>([])
  const [testResults, setTestResults] = useState<Map<string, EnvironmentalImpact>>(new Map())
  const [isRunning, setIsRunning] = useState(false)
  const [selectedScenario, setSelectedScenario] = useState<string>("")
  const [customConditions, setCustomConditions] = useState<Partial<EnvironmentalConditions>>({})

  // Initialize test scenarios
  useEffect(() => {
    const scenarios: TestScenario[] = [
      {
        id: "clear_urban_4g",
        name: "Optimal Conditions",
        description: "Clear weather, urban area, excellent connectivity",
        scenario: {
          sourceEmergency: "minor_breakdown",
          targetEmergency: "major_breakdown",
          baseTransferRate: 0.75,
          userExperience: "experienced",
          stressLevel: 5,
          urgency: "medium",
        },
        conditions: {
          weather: {
            condition: "clear",
            severity: "light",
            visibility: 10000,
            temperature: 22,
            windSpeed: 5,
            precipitation: 0,
          },
          coverage: {
            cellSignal: "excellent",
            signalStrength: -60,
            dataSpeed: "5G",
            latency: 20,
            reliability: 0.95,
          },
          location: {
            type: "urban",
            population: 500000,
            infrastructure: "excellent",
            emergencyServices: "immediate",
          },
          timeContext: {
            timeOfDay: "afternoon",
            dayOfWeek: "weekday",
            season: "summer",
            isHoliday: false,
          },
        },
        expectedImpact: "positive",
      },
      {
        id: "storm_rural_poor",
        name: "Challenging Conditions",
        description: "Severe storm, rural area, poor connectivity",
        scenario: {
          sourceEmergency: "minor_accident",
          targetEmergency: "major_accident",
          baseTransferRate: 0.68,
          userExperience: "new",
          stressLevel: 8,
          urgency: "critical",
        },
        conditions: {
          weather: {
            condition: "storm",
            severity: "severe",
            visibility: 200,
            temperature: 5,
            windSpeed: 80,
            precipitation: 15,
          },
          coverage: {
            cellSignal: "poor",
            signalStrength: -110,
            dataSpeed: "2G",
            latency: 800,
            reliability: 0.4,
          },
          location: {
            type: "remote",
            population: 500,
            infrastructure: "poor",
            emergencyServices: "distant",
          },
          timeContext: {
            timeOfDay: "night",
            dayOfWeek: "weekend",
            season: "winter",
            isHoliday: true,
          },
        },
        expectedImpact: "negative",
      },
      {
        id: "fog_highway_fair",
        name: "Moderate Challenges",
        description: "Heavy fog on highway, fair connectivity",
        scenario: {
          sourceEmergency: "minor_medical",
          targetEmergency: "major_medical",
          baseTransferRate: 0.72,
          userExperience: "experienced",
          stressLevel: 7,
          urgency: "high",
        },
        conditions: {
          weather: {
            condition: "fog",
            severity: "heavy",
            visibility: 50,
            temperature: 8,
            windSpeed: 15,
            precipitation: 2,
          },
          coverage: {
            cellSignal: "fair",
            signalStrength: -95,
            dataSpeed: "4G",
            latency: 150,
            reliability: 0.7,
          },
          location: {
            type: "highway",
            population: 0,
            infrastructure: "fair",
            emergencyServices: "nearby",
          },
          timeContext: {
            timeOfDay: "morning",
            dayOfWeek: "weekday",
            season: "fall",
            isHoliday: false,
          },
        },
        expectedImpact: "negative",
      },
      {
        id: "rain_suburban_good",
        name: "Typical Conditions",
        description: "Light rain, suburban area, good connectivity",
        scenario: {
          sourceEmergency: "weather_emergency",
          targetEmergency: "minor_breakdown",
          baseTransferRate: 0.45,
          userExperience: "expert",
          stressLevel: 4,
          urgency: "low",
        },
        conditions: {
          weather: {
            condition: "rain",
            severity: "light",
            visibility: 2000,
            temperature: 15,
            windSpeed: 20,
            precipitation: 3,
          },
          coverage: {
            cellSignal: "good",
            signalStrength: -75,
            dataSpeed: "4G",
            latency: 60,
            reliability: 0.85,
          },
          location: {
            type: "suburban",
            population: 50000,
            infrastructure: "good",
            emergencyServices: "nearby",
          },
          timeContext: {
            timeOfDay: "evening",
            dayOfWeek: "weekday",
            season: "spring",
            isHoliday: false,
          },
        },
        expectedImpact: "neutral",
      },
    ]

    setTestScenarios(scenarios)
  }, [])

  // Load current environmental conditions
  const loadCurrentConditions = async () => {
    try {
      const conditions = await getCurrentEnvironmentalConditions(40.7128, -74.006)
      setCurrentConditions(conditions)
      toast({
        title: "🌍 Environmental Data Loaded",
        description: "Current conditions retrieved successfully",
      })
    } catch (error) {
      toast({
        title: "❌ Error Loading Conditions",
        description: "Failed to retrieve environmental data",
        variant: "destructive",
      })
    }
  }

  // Run environmental transfer test
  const runEnvironmentalTest = async (scenarioId?: string) => {
    setIsRunning(true)
    const scenariosToTest = scenarioId ? [testScenarios.find((s) => s.id === scenarioId)!] : testScenarios
    const newResults = new Map(testResults)

    for (const scenario of scenariosToTest) {
      toast({
        title: "🧪 Testing Scenario",
        description: `Analyzing ${scenario.name}...`,
      })

      // Simulate processing time
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const impact = calculateEnvironmentalTransferRate(scenario.scenario, scenario.conditions)
      newResults.set(scenario.id, impact)

      toast({
        title: "✅ Test Complete",
        description: `${scenario.name}: ${(impact.adjustedTransferRate * 100).toFixed(1)}% efficiency`,
      })
    }

    setTestResults(newResults)
    setIsRunning(false)
  }

  // Get impact color based on value
  const getImpactColor = (impact: number) => {
    if (impact > 0.1) return "text-green-600"
    if (impact < -0.1) return "text-red-600"
    return "text-yellow-600"
  }

  // Get impact icon based on value
  const getImpactIcon = (impact: number) => {
    if (impact > 0.1) return <TrendingUp className="h-4 w-4 text-green-600" />
    if (impact < -0.1) return <TrendingDown className="h-4 w-4 text-red-600" />
    return <Activity className="h-4 w-4 text-yellow-600" />
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
            Test how weather and coverage conditions affect transfer learning efficiency
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Button onClick={loadCurrentConditions} variant="outline" className="flex-1">
              <Navigation className="mr-2 h-4 w-4" />
              Load Current Conditions
            </Button>
            <Button onClick={() => runEnvironmentalTest()} disabled={isRunning} className="flex-1">
              <Activity className="mr-2 h-4 w-4" />
              {isRunning ? "Testing..." : "Test All Scenarios"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Current Environmental Conditions */}
      {currentConditions && (
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-green-500" />
              <span>Current Environmental Conditions</span>
            </CardTitle>
            <CardDescription>Real-time conditions affecting transfer learning</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-blue-600 flex items-center space-x-1">
                  <Cloud className="h-4 w-4" />
                  <span>Weather</span>
                </h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Condition:</span>
                    <Badge variant="outline" className="capitalize">
                      {currentConditions.weather.condition}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Severity:</span>
                    <span className="font-medium capitalize">{currentConditions.weather.severity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Visibility:</span>
                    <span className="font-medium">{currentConditions.weather.visibility.toFixed(0)}m</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Temperature:</span>
                    <span className="font-medium">{currentConditions.weather.temperature.toFixed(1)}°C</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-purple-600 flex items-center space-x-1">
                  <Signal className="h-4 w-4" />
                  <span>Coverage</span>
                </h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Signal:</span>
                    <Badge variant="outline" className="capitalize">
                      {currentConditions.coverage.cellSignal}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Data Speed:</span>
                    <span className="font-medium">{currentConditions.coverage.dataSpeed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Latency:</span>
                    <span className="font-medium">{currentConditions.coverage.latency.toFixed(0)}ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Reliability:</span>
                    <span className="font-medium">{(currentConditions.coverage.reliability * 100).toFixed(1)}%</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-orange-600 flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>Location</span>
                </h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Type:</span>
                    <Badge variant="outline" className="capitalize">
                      {currentConditions.location.type}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Infrastructure:</span>
                    <span className="font-medium capitalize">{currentConditions.location.infrastructure}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Emergency Services:</span>
                    <span className="font-medium capitalize">{currentConditions.location.emergencyServices}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Population:</span>
                    <span className="font-medium">{currentConditions.location.population.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-green-600 flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>Time Context</span>
                </h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Time of Day:</span>
                    <Badge variant="outline" className="capitalize">
                      {currentConditions.timeContext.timeOfDay}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Day Type:</span>
                    <span className="font-medium capitalize">{currentConditions.timeContext.dayOfWeek}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Season:</span>
                    <span className="font-medium capitalize">{currentConditions.timeContext.season}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Holiday:</span>
                    <span className="font-medium">{currentConditions.timeContext.isHoliday ? "Yes" : "No"}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Test Scenarios */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {testScenarios.map((scenario) => {
          const result = testResults.get(scenario.id)
          return (
            <Card key={scenario.id} className="border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="text-lg">{scenario.name}</span>
                  <Button
                    onClick={() => runEnvironmentalTest(scenario.id)}
                    disabled={isRunning}
                    size="sm"
                    variant="outline"
                  >
                    Test
                  </Button>
                </CardTitle>
                <CardDescription>{scenario.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Scenario Details */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Transfer:</span>
                    <div className="font-medium">
                      {scenario.scenario.sourceEmergency.replace(/_/g, " ")} →{" "}
                      {scenario.scenario.targetEmergency.replace(/_/g, " ")}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Base Rate:</span>
                    <div className="font-medium">{(scenario.scenario.baseTransferRate * 100).toFixed(1)}%</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">User Experience:</span>
                    <div className="font-medium capitalize">{scenario.scenario.userExperience}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Urgency:</span>
                    <div className="font-medium capitalize">{scenario.scenario.urgency}</div>
                  </div>
                </div>

                {/* Environmental Summary */}
                <div className="grid grid-cols-4 gap-2 text-xs">
                  <div className="text-center">
                    <Cloud className="h-4 w-4 mx-auto mb-1 text-blue-500" />
                    <div className="font-medium capitalize">{scenario.conditions.weather.condition}</div>
                    <div className="text-muted-foreground">{scenario.conditions.weather.severity}</div>
                  </div>
                  <div className="text-center">
                    <Signal className="h-4 w-4 mx-auto mb-1 text-purple-500" />
                    <div className="font-medium capitalize">{scenario.conditions.coverage.cellSignal}</div>
                    <div className="text-muted-foreground">{scenario.conditions.coverage.dataSpeed}</div>
                  </div>
                  <div className="text-center">
                    <MapPin className="h-4 w-4 mx-auto mb-1 text-orange-500" />
                    <div className="font-medium capitalize">{scenario.conditions.location.type}</div>
                    <div className="text-muted-foreground">{scenario.conditions.location.infrastructure}</div>
                  </div>
                  <div className="text-center">
                    <Clock className="h-4 w-4 mx-auto mb-1 text-green-500" />
                    <div className="font-medium capitalize">{scenario.conditions.timeContext.timeOfDay}</div>
                    <div className="text-muted-foreground">{scenario.conditions.timeContext.season}</div>
                  </div>
                </div>

                {/* Test Results */}
                {result && (
                  <div className="space-y-3 border-t pt-3">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Adjusted Transfer Rate:</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-blue-600">
                          {(result.adjustedTransferRate * 100).toFixed(1)}%
                        </span>
                        <Badge
                          variant={
                            result.adjustedTransferRate > scenario.scenario.baseTransferRate ? "default" : "destructive"
                          }
                        >
                          {result.adjustedTransferRate > scenario.scenario.baseTransferRate ? "+" : ""}
                          {((result.adjustedTransferRate - scenario.scenario.baseTransferRate) * 100).toFixed(1)}%
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-2 text-xs">
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-1">
                          {getImpactIcon(result.weatherImpact)}
                          <span className={getImpactColor(result.weatherImpact)}>
                            {(result.weatherImpact * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="text-muted-foreground">Weather</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-1">
                          {getImpactIcon(result.coverageImpact)}
                          <span className={getImpactColor(result.coverageImpact)}>
                            {(result.coverageImpact * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="text-muted-foreground">Coverage</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-1">
                          {getImpactIcon(result.locationImpact)}
                          <span className={getImpactColor(result.locationImpact)}>
                            {(result.locationImpact * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="text-muted-foreground">Location</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-1">
                          {getImpactIcon(result.timeImpact)}
                          <span className={getImpactColor(result.timeImpact)}>
                            {(result.timeImpact * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="text-muted-foreground">Time</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Confidence Level:</span>
                        <div className="flex items-center space-x-2">
                          <Progress value={result.confidenceLevel * 100} className="w-20 h-2" />
                          <span className="text-sm">{(result.confidenceLevel * 100).toFixed(1)}%</span>
                        </div>
                      </div>

                      {result.riskFactors.length > 0 && (
                        <div>
                          <div className="text-sm font-medium text-red-600 mb-1">Risk Factors:</div>
                          <ul className="text-xs space-y-1">
                            {result.riskFactors.map((factor, index) => (
                              <li key={index} className="flex items-start space-x-1">
                                <AlertTriangle className="h-3 w-3 text-red-500 mt-0.5 flex-shrink-0" />
                                <span>{factor}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {result.mitigationStrategies.length > 0 && (
                        <div>
                          <div className="text-sm font-medium text-blue-600 mb-1">Mitigation Strategies:</div>
                          <ul className="text-xs space-y-1">
                            {result.mitigationStrategies.map((strategy, index) => (
                              <li key={index} className="flex items-start space-x-1">
                                <CheckCircle className="h-3 w-3 text-blue-500 mt-0.5 flex-shrink-0" />
                                <span>{strategy}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
