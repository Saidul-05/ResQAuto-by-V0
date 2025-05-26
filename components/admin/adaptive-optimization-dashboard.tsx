"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import {
  Play,
  Pause,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Brain,
  Settings,
  CheckCircle,
  Clock,
  Target,
  Zap,
  Activity,
  RefreshCw,
  Eye,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react"

import {
  startAdaptiveOptimization,
  stopAdaptiveOptimization,
  getOptimizationStatus,
  getOptimizationRecommendations,
  getPerformanceAnalytics,
  type OptimizationSession,
  type EnvironmentalFactorAdjustment,
} from "@/lib/adaptive-environmental-optimizer"

interface DashboardState {
  isActive: boolean
  currentSession: OptimizationSession | null
  totalOutcomes: number
  recentPerformance: number
  nextOptimization: Date | null
  recommendations: EnvironmentalFactorAdjustment[]
  analytics: any
}

export function AdaptiveOptimizationDashboard() {
  const [state, setState] = useState<DashboardState>({
    isActive: false,
    currentSession: null,
    totalOutcomes: 0,
    recentPerformance: 0,
    nextOptimization: null,
    recommendations: [],
    analytics: null,
  })

  const [isLoading, setIsLoading] = useState(false)
  const [autoRefresh, setAutoRefresh] = useState(true)

  useEffect(() => {
    loadDashboardData()

    if (autoRefresh) {
      const interval = setInterval(loadDashboardData, 30000) // Refresh every 30 seconds
      return () => clearInterval(interval)
    }
  }, [autoRefresh])

  const loadDashboardData = async () => {
    try {
      const status = getOptimizationStatus()
      const recommendations = getOptimizationRecommendations()
      const analytics = getPerformanceAnalytics()

      setState({
        isActive: status.isActive,
        currentSession: status.currentSession,
        totalOutcomes: status.totalOutcomes,
        recentPerformance: status.recentPerformance,
        nextOptimization: status.nextOptimization,
        recommendations,
        analytics,
      })
    } catch (error) {
      console.error("Error loading dashboard data:", error)
    }
  }

  const handleStartOptimization = async () => {
    setIsLoading(true)
    try {
      await startAdaptiveOptimization()
      toast({
        title: "🤖 Optimization Started",
        description: "Adaptive environmental factor optimization is now active",
      })
      loadDashboardData()
    } catch (error) {
      toast({
        title: "❌ Error",
        description: "Failed to start optimization: " + (error as Error).message,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleStopOptimization = () => {
    stopAdaptiveOptimization()
    toast({
      title: "🛑 Optimization Stopped",
      description: "Adaptive optimization has been paused",
    })
    loadDashboardData()
  }

  const formatDuration = (start: Date, end?: Date) => {
    const duration = (end || new Date()).getTime() - start.getTime()
    const hours = Math.floor(duration / (1000 * 60 * 60))
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60))
    return `${hours}h ${minutes}m`
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "text-green-600"
      case "medium":
        return "text-yellow-600"
      case "high":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getRiskBadgeVariant = (risk: string) => {
    switch (risk) {
      case "low":
        return "default"
      case "medium":
        return "secondary"
      case "high":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Adaptive Optimization</h1>
          <p className="text-muted-foreground">AI-powered environmental factor optimization dashboard</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={() => setAutoRefresh(!autoRefresh)} variant="outline" size="sm">
            <RefreshCw className={`mr-2 h-4 w-4 ${autoRefresh ? "animate-spin" : ""}`} />
            Auto Refresh
          </Button>
          {state.isActive ? (
            <Button onClick={handleStopOptimization} variant="destructive">
              <Pause className="mr-2 h-4 w-4" />
              Stop Optimization
            </Button>
          ) : (
            <Button onClick={handleStartOptimization} disabled={isLoading}>
              <Play className="mr-2 h-4 w-4" />
              Start Optimization
            </Button>
          )}
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center space-x-2">
              <Activity className={`h-4 w-4 ${state.isActive ? "text-green-500" : "text-gray-400"}`} />
              <div className="space-y-1">
                <p className="text-sm font-medium">Optimization Status</p>
                <Badge variant={state.isActive ? "default" : "secondary"}>
                  {state.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4 text-blue-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium">Total Outcomes</p>
                <p className="text-2xl font-bold">{state.totalOutcomes.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center space-x-2">
              <Target className="h-4 w-4 text-green-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium">Recent Performance</p>
                <p className="text-2xl font-bold">{(state.recentPerformance * 100).toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-orange-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium">Next Optimization</p>
                <p className="text-sm">
                  {state.nextOptimization ? new Date(state.nextOptimization).toLocaleTimeString() : "Not scheduled"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="session" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="session">Current Session</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="session" className="space-y-4">
          {state.currentSession ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="h-5 w-5" />
                  <span>Active Optimization Session</span>
                  <Badge variant={state.currentSession.status === "active" ? "default" : "secondary"}>
                    {state.currentSession.status}
                  </Badge>
                </CardTitle>
                <CardDescription>Session started {state.currentSession.startTime.toLocaleString()}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold">Session Duration</h4>
                    <p className="text-2xl font-bold">
                      {formatDuration(state.currentSession.startTime, state.currentSession.endTime)}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold">Total Adjustments</h4>
                    <p className="text-2xl font-bold">{state.currentSession.totalAdjustments}</p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold">Performance Improvement</h4>
                    <div className="flex items-center space-x-2">
                      <p className="text-2xl font-bold">
                        {(state.currentSession.performanceImprovement * 100).toFixed(1)}%
                      </p>
                      {state.currentSession.performanceImprovement > 0 ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      ) : state.currentSession.performanceImprovement < 0 ? (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Session Metrics</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Prediction Accuracy</span>
                        <span>{(state.currentSession.metrics.predictionAccuracy * 100).toFixed(1)}%</span>
                      </div>
                      <Progress value={state.currentSession.metrics.predictionAccuracy * 100} />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Average Error</span>
                        <span>{state.currentSession.metrics.averageError.toFixed(3)}</span>
                      </div>
                      <Progress value={(1 - state.currentSession.metrics.averageError) * 100} />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Improvement Rate</span>
                        <span>{(state.currentSession.metrics.improvementRate * 100).toFixed(2)}%</span>
                      </div>
                      <Progress
                        value={Math.max(0, Math.min(100, (state.currentSession.metrics.improvementRate + 0.1) * 500))}
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Confidence Level</span>
                        <span>{(state.currentSession.metrics.confidenceLevel * 100).toFixed(1)}%</span>
                      </div>
                      <Progress value={state.currentSession.metrics.confidenceLevel * 100} />
                    </div>
                  </div>
                </div>

                {state.currentSession.adjustments.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="font-semibold">Recent Adjustments</h4>
                    <div className="space-y-2">
                      {state.currentSession.adjustments.slice(-5).map((adjustment, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="space-y-1">
                            <p className="font-medium capitalize">
                              {adjustment.factorType} - {adjustment.factorName.replace("_", " ")}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {adjustment.currentValue.toFixed(3)} → {adjustment.suggestedValue.toFixed(3)}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant={getRiskBadgeVariant(adjustment.riskLevel)}>
                              {adjustment.riskLevel} risk
                            </Badge>
                            <span className="text-sm font-mono">{(adjustment.confidence * 100).toFixed(0)}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <Brain className="h-12 w-12 text-muted-foreground mx-auto" />
                  <div>
                    <h3 className="text-lg font-semibold">No Active Session</h3>
                    <p className="text-muted-foreground">
                      Start adaptive optimization to begin learning from environmental factors
                    </p>
                  </div>
                  <Button onClick={handleStartOptimization} disabled={isLoading}>
                    <Play className="mr-2 h-4 w-4" />
                    Start Optimization
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5" />
                <span>Optimization Recommendations</span>
                <Badge variant="outline">{state.recommendations.length}</Badge>
              </CardTitle>
              <CardDescription>AI-generated suggestions for improving environmental factor accuracy</CardDescription>
            </CardHeader>
            <CardContent>
              {state.recommendations.length > 0 ? (
                <div className="space-y-4">
                  {state.recommendations.map((rec, index) => (
                    <div key={index} className="p-4 border rounded-lg space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h4 className="font-semibold capitalize">
                            {rec.factorType} - {rec.factorName.replace("_", " ")}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Sample size: {rec.sampleSize} | Improvement potential:{" "}
                            {(rec.improvementPotential * 100).toFixed(1)}%
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={getRiskBadgeVariant(rec.riskLevel)}>{rec.riskLevel} risk</Badge>
                          <Badge variant="outline">{(rec.confidence * 100).toFixed(0)}% confidence</Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Current Value</p>
                          <p className="text-lg font-mono">{rec.currentValue.toFixed(3)}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Suggested Value</p>
                          <p className="text-lg font-mono">{rec.suggestedValue.toFixed(3)}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Progress value={rec.confidence * 100} className="flex-1" />
                        <span className="text-sm text-muted-foreground">
                          Confidence: {(rec.confidence * 100).toFixed(0)}%
                        </span>
                      </div>

                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="mr-2 h-3 w-3" />
                          Preview
                        </Button>
                        <Button size="sm" disabled={rec.riskLevel === "high" || rec.confidence < 0.7}>
                          <CheckCircle className="mr-2 h-3 w-3" />
                          Apply
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center space-y-4 py-8">
                  <Settings className="h-12 w-12 text-muted-foreground mx-auto" />
                  <div>
                    <h3 className="text-lg font-semibold">No Recommendations</h3>
                    <p className="text-muted-foreground">
                      {state.totalOutcomes < 50
                        ? "Collect more verification outcomes to generate recommendations"
                        : "Current environmental factors are well-optimized"}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          {state.analytics ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Overall Accuracy</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold">
                          {(state.analytics.overallAccuracy * 100).toFixed(1)}%
                        </span>
                        {state.analytics.overallAccuracy > 0.8 ? (
                          <ThumbsUp className="h-5 w-5 text-green-500" />
                        ) : (
                          <ThumbsDown className="h-5 w-5 text-red-500" />
                        )}
                      </div>
                      <Progress value={state.analytics.overallAccuracy * 100} />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Top Performing</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {state.analytics.topPerformingConditions.slice(0, 3).map((condition: any, index: number) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="truncate">{condition.condition.split("_").join(" ")}</span>
                          <span className="font-medium">{(condition.successRate * 100).toFixed(0)}%</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Challenging Conditions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {state.analytics.challengingConditions.slice(0, 3).map((condition: any, index: number) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="truncate">{condition.condition.split("_").join(" ")}</span>
                          <span className="font-medium text-red-600">{(condition.successRate * 100).toFixed(0)}%</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Factor Accuracy Breakdown</CardTitle>
                  <CardDescription>Prediction accuracy by environmental factor</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(state.analytics.factorAccuracy).map(([factor, accuracy]: [string, any]) => (
                      <div key={factor} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="capitalize">{factor.replace("_", " ")}</span>
                          <span>{(accuracy * 100).toFixed(1)}%</span>
                        </div>
                        <Progress value={accuracy * 100} />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {state.analytics.improvementTrends.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Improvement Trends</CardTitle>
                    <CardDescription>Performance trends over the last 30 days</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-7 gap-2 text-xs">
                        {state.analytics.improvementTrends.slice(-7).map((trend: any, index: number) => (
                          <div key={index} className="text-center space-y-1">
                            <div className="text-muted-foreground">
                              {new Date(trend.date).toLocaleDateString("en", { weekday: "short" })}
                            </div>
                            <div className="space-y-1">
                              <div className="text-xs">Acc: {(trend.accuracy * 100).toFixed(0)}%</div>
                              <div className="text-xs">Perf: {(trend.performance * 100).toFixed(0)}%</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto" />
                  <div>
                    <h3 className="text-lg font-semibold">No Analytics Available</h3>
                    <p className="text-muted-foreground">
                      Start collecting verification outcomes to see performance analytics
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Optimization History</CardTitle>
              <CardDescription>Previous optimization sessions and their results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4 py-8">
                <Clock className="h-12 w-12 text-muted-foreground mx-auto" />
                <div>
                  <h3 className="text-lg font-semibold">History Coming Soon</h3>
                  <p className="text-muted-foreground">Optimization session history will be displayed here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
