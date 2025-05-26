"use client"

import { IterativeLearningTester } from "@/components/emergency/iterative-learning-tester"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Brain, TrendingUp, Target, Zap, BarChart3, Lightbulb, Activity, LineChart } from "lucide-react"

export default function IterativeLearningTestPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center space-x-2">
        <Brain className="h-6 w-6 text-blue-500" />
        <h1 className="text-3xl font-bold">AI Iterative Learning Testing</h1>
      </div>

      <Alert className="border-blue-200 bg-blue-50">
        <Brain className="h-4 w-4 text-blue-500" />
        <AlertDescription className="text-blue-700">
          <strong>Machine Learning Testing:</strong> This system demonstrates how the AI algorithm learns and improves
          its decision-making over multiple iterations. Watch as the AI adapts its method selection based on previous
          successes and failures, continuously optimizing for better performance.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="border-green-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <span>Learning Curve</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center space-x-2">
              <Badge variant="default">Adaptive</Badge>
              <span className="text-sm">Continuous</span>
            </div>
            <ul className="text-xs space-y-1 text-muted-foreground">
              <li>• Performance improvement tracking</li>
              <li>• Success rate optimization</li>
              <li>• Time efficiency gains</li>
              <li>• Prediction accuracy growth</li>
            </ul>
            <div className="text-xs">
              <strong>Typical improvement:</strong> 20-40% over 20 iterations
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Target className="h-5 w-5 text-purple-500" />
              <span>Pattern Recognition</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">AI-Powered</Badge>
              <span className="text-sm">Smart</span>
            </div>
            <ul className="text-xs space-y-1 text-muted-foreground">
              <li>• Scenario-specific learning</li>
              <li>• Method effectiveness tracking</li>
              <li>• Failure pattern analysis</li>
              <li>• Success replication</li>
            </ul>
            <div className="text-xs">
              <strong>Learns from:</strong> Both successes and failures
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Zap className="h-5 w-5 text-orange-500" />
              <span>Adaptive Optimization</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center space-x-2">
              <Badge variant="outline">Dynamic</Badge>
              <span className="text-sm">Efficient</span>
            </div>
            <ul className="text-xs space-y-1 text-muted-foreground">
              <li>• Method combination optimization</li>
              <li>• Time vs. accuracy balancing</li>
              <li>• Resource usage optimization</li>
              <li>• Context-aware adaptations</li>
            </ul>
            <div className="text-xs">
              <strong>Optimizes for:</strong> Speed, accuracy, and reliability
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <BarChart3 className="h-5 w-5 text-blue-500" />
              <span>Performance Metrics</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center space-x-2">
              <Badge variant="destructive">Real-time</Badge>
              <span className="text-sm">Tracked</span>
            </div>
            <ul className="text-xs space-y-1 text-muted-foreground">
              <li>• Learning velocity measurement</li>
              <li>• Prediction accuracy tracking</li>
              <li>• Performance score evolution</li>
              <li>• Trend analysis</li>
            </ul>
            <div className="text-xs">
              <strong>Tracks:</strong> 15+ performance indicators
            </div>
          </CardContent>
        </Card>
      </div>

      <IterativeLearningTester />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
              <span>Learning Mechanisms</span>
            </CardTitle>
            <CardDescription>How the AI algorithm learns and adapts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <h4 className="font-semibold text-green-600">Success Pattern Learning</h4>
              <ul className="text-sm space-y-1 text-muted-foreground ml-4">
                <li>
                  • <strong>Method Replication:</strong> Repeats successful method combinations
                </li>
                <li>
                  • <strong>Performance Optimization:</strong> Improves timing and efficiency
                </li>
                <li>
                  • <strong>Context Association:</strong> Links success to environmental conditions
                </li>
                <li>
                  • <strong>Confidence Building:</strong> Increases prediction accuracy over time
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-red-600">Failure Analysis Learning</h4>
              <ul className="text-sm space-y-1 text-muted-foreground ml-4">
                <li>
                  • <strong>Method Avoidance:</strong> Avoids previously failed combinations
                </li>
                <li>
                  • <strong>Alternative Selection:</strong> Tries different approaches
                </li>
                <li>
                  • <strong>Risk Assessment:</strong> Identifies high-risk scenarios
                </li>
                <li>
                  • <strong>Fallback Planning:</strong> Develops backup strategies
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-purple-600">Advanced Learning (10+ iterations)</h4>
              <ul className="text-sm space-y-1 text-muted-foreground ml-4">
                <li>
                  • <strong>Speed Optimization:</strong> Reduces methods when success rate is high
                </li>
                <li>
                  • <strong>Reliability Enhancement:</strong> Adds methods when success rate is low
                </li>
                <li>
                  • <strong>Resource Management:</strong> Optimizes for battery and time constraints
                </li>
                <li>
                  • <strong>Predictive Modeling:</strong> Forecasts outcomes before execution
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-blue-500" />
              <span>Learning Phases</span>
            </CardTitle>
            <CardDescription>Stages of AI learning development</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <h4 className="font-semibold text-blue-600">Phase 1: Initial Learning (1-5 iterations)</h4>
              <ul className="text-sm space-y-1 text-muted-foreground ml-4">
                <li>• Uses baseline algorithm for method selection</li>
                <li>• Establishes initial performance benchmarks</li>
                <li>• Begins collecting success/failure data</li>
                <li>• Low prediction accuracy (50-60%)</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-green-600">Phase 2: Pattern Recognition (6-15 iterations)</h4>
              <ul className="text-sm space-y-1 text-muted-foreground ml-4">
                <li>• Identifies successful method combinations</li>
                <li>• Begins avoiding failed approaches</li>
                <li>• Improves prediction accuracy (60-75%)</li>
                <li>• Starts scenario-specific optimizations</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-purple-600">Phase 3: Advanced Optimization (15+ iterations)</h4>
              <ul className="text-sm space-y-1 text-muted-foreground ml-4">
                <li>• Balances speed vs. accuracy dynamically</li>
                <li>• Implements resource-aware optimizations</li>
                <li>• Achieves high prediction accuracy (75-90%)</li>
                <li>• Develops sophisticated fallback strategies</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-orange-600">Phase 4: Mastery (20+ iterations)</h4>
              <ul className="text-sm space-y-1 text-muted-foreground ml-4">
                <li>• Consistently optimal method selection</li>
                <li>• Predictive accuracy above 85%</li>
                <li>• Minimal verification time with maximum accuracy</li>
                <li>• Robust performance across all scenarios</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <LineChart className="h-5 w-5 text-green-500" />
            <span>Expected Learning Outcomes</span>
          </CardTitle>
          <CardDescription>What to expect from iterative AI learning</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-green-600">Performance Improvements</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Success Rate</span>
                  <span className="text-sm font-medium">60% → 85%+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Verification Time</span>
                  <span className="text-sm font-medium">-40% average</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Prediction Accuracy</span>
                  <span className="text-sm font-medium">50% → 85%+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Performance Score</span>
                  <span className="text-sm font-medium">+20-40 points</span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-blue-600">Learning Velocity</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Initial Learning</span>
                  <span className="text-sm font-medium">Rapid (1-5 iter)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Pattern Recognition</span>
                  <span className="text-sm font-medium">Steady (6-15 iter)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Optimization</span>
                  <span className="text-sm font-medium">Gradual (15+ iter)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Mastery</span>
                  <span className="text-sm font-medium">Stable (20+ iter)</span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-purple-600">Key Milestones</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">First successful pattern (iter 3-5)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">Consistent improvement (iter 8-10)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm">Advanced optimization (iter 15)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-sm">Performance plateau (iter 20+)</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Alert className="border-green-200 bg-green-50">
        <TrendingUp className="h-4 w-4 text-green-500" />
        <AlertDescription className="text-green-700">
          <strong>Testing Recommendation:</strong> Run at least 20 iterations to see meaningful learning patterns. Watch
          for the transition from random performance to consistent improvement around iteration 8-10. The AI should show
          clear learning trends and increasingly sophisticated decision-making strategies.
        </AlertDescription>
      </Alert>
    </div>
  )
}
