"use client"

import { AdaptiveAlgorithmTester } from "@/components/emergency/adaptive-algorithm-tester"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Brain, Zap, Target, TrendingUp, Lightbulb, Cpu, BarChart3 } from "lucide-react"

export default function AdaptiveAlgorithmTestPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center space-x-2">
        <Brain className="h-6 w-6 text-purple-500" />
        <h1 className="text-3xl font-bold">AI-Driven Adaptive Algorithm Testing</h1>
      </div>

      <Alert className="border-purple-200 bg-purple-50">
        <Brain className="h-4 w-4 text-purple-500" />
        <AlertDescription className="text-purple-700">
          <strong>Artificial Intelligence Testing:</strong> This system tests how AI algorithms intelligently select
          optimal biometric methods based on real-time environmental conditions, user context, and emergency scenarios.
          The adaptive algorithm optimizes for both security and efficiency.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="border-blue-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Target className="h-5 w-5 text-blue-500" />
              <span>Context Analysis</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center space-x-2">
              <Badge variant="default">Real-time</Badge>
              <span className="text-sm">Multi-factor</span>
            </div>
            <ul className="text-xs space-y-1 text-muted-foreground">
              <li>• Environmental conditions</li>
              <li>• User stress and injury status</li>
              <li>• Device and battery status</li>
              <li>• Emergency type and urgency</li>
            </ul>
            <div className="text-xs">
              <strong>AI analyzes 15+ variables</strong> to make optimal decisions
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Zap className="h-5 w-5 text-green-500" />
              <span>Smart Selection</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">Optimized</Badge>
              <span className="text-sm">Dynamic</span>
            </div>
            <ul className="text-xs space-y-1 text-muted-foreground">
              <li>• Method prioritization</li>
              <li>• Early termination logic</li>
              <li>• Fallback planning</li>
              <li>• Risk assessment</li>
            </ul>
            <div className="text-xs">
              <strong>Reduces verification time</strong> by up to 60%
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Cpu className="h-5 w-5 text-purple-500" />
              <span>Machine Learning</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center space-x-2">
              <Badge variant="outline">AI-Powered</Badge>
              <span className="text-sm">Adaptive</span>
            </div>
            <ul className="text-xs space-y-1 text-muted-foreground">
              <li>• Pattern recognition</li>
              <li>• Predictive modeling</li>
              <li>• Continuous optimization</li>
              <li>• Context learning</li>
            </ul>
            <div className="text-xs">
              <strong>Improves accuracy</strong> through continuous learning
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <TrendingUp className="h-5 w-5 text-orange-500" />
              <span>Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center space-x-2">
              <Badge variant="destructive">High-Performance</Badge>
              <span className="text-sm">Efficient</span>
            </div>
            <ul className="text-xs space-y-1 text-muted-foreground">
              <li>• 40-60% time reduction</li>
              <li>• 95%+ accuracy maintained</li>
              <li>• 30% battery savings</li>
              <li>• 85% success rate</li>
            </ul>
            <div className="text-xs">
              <strong>Optimizes</strong> security vs. efficiency trade-offs
            </div>
          </CardContent>
        </Card>
      </div>

      <AdaptiveAlgorithmTester />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
              <span>AI Decision Factors</span>
            </CardTitle>
            <CardDescription>Key variables the adaptive algorithm considers</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <h4 className="font-semibold text-blue-600">Environmental Intelligence</h4>
              <ul className="text-sm space-y-1 text-muted-foreground ml-4">
                <li>
                  • <strong>Lighting conditions:</strong> Affects facial and iris recognition accuracy
                </li>
                <li>
                  • <strong>Noise levels:</strong> Impacts voice pattern recognition quality
                </li>
                <li>
                  • <strong>Device condition:</strong> Sensor damage affects all biometric methods
                </li>
                <li>
                  • <strong>Battery status:</strong> Influences power-hungry method selection
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-red-600">User Context Analysis</h4>
              <ul className="text-sm space-y-1 text-muted-foreground ml-4">
                <li>
                  • <strong>Stress levels:</strong> High stress reduces biometric quality
                </li>
                <li>
                  • <strong>Injury assessment:</strong> Physical injuries affect method availability
                </li>
                <li>
                  • <strong>Consciousness state:</strong> Determines cooperation capability
                </li>
                <li>
                  • <strong>Time pressure:</strong> Influences method selection and timeout
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-purple-600">Emergency Context</h4>
              <ul className="text-sm space-y-1 text-muted-foreground ml-4">
                <li>
                  • <strong>Emergency type:</strong> Medical emergencies prioritize speed
                </li>
                <li>
                  • <strong>Security level:</strong> High-risk situations require more methods
                </li>
                <li>
                  • <strong>Previous attempts:</strong> Failed attempts influence method selection
                </li>
                <li>
                  • <strong>Location context:</strong> Unsafe areas prioritize quick verification
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-green-500" />
              <span>Optimization Strategies</span>
            </CardTitle>
            <CardDescription>How the AI optimizes biometric verification</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <h4 className="font-semibold text-green-600">Efficiency Optimizations</h4>
              <ul className="text-sm space-y-1 text-muted-foreground ml-4">
                <li>
                  • <strong>Early termination:</strong> Stops when confidence threshold is met
                </li>
                <li>
                  • <strong>Method prioritization:</strong> Tests most reliable methods first
                </li>
                <li>
                  • <strong>Parallel processing:</strong> Simultaneous method execution when possible
                </li>
                <li>
                  • <strong>Adaptive timeouts:</strong> Dynamic time limits based on context
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-orange-600">Quality Assurance</h4>
              <ul className="text-sm space-y-1 text-muted-foreground ml-4">
                <li>
                  • <strong>Quality scoring:</strong> Real-time biometric quality assessment
                </li>
                <li>
                  • <strong>Confidence weighting:</strong> Higher weight for more reliable methods
                </li>
                <li>
                  • <strong>Cross-validation:</strong> Multiple methods validate each other
                </li>
                <li>
                  • <strong>Error prediction:</strong> Anticipates and prevents common failures
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-blue-600">Adaptive Learning</h4>
              <ul className="text-sm space-y-1 text-muted-foreground ml-4">
                <li>
                  • <strong>Pattern recognition:</strong> Learns from successful combinations
                </li>
                <li>
                  • <strong>Context memory:</strong> Remembers optimal methods for scenarios
                </li>
                <li>
                  • <strong>Performance tracking:</strong> Monitors and improves success rates
                </li>
                <li>
                  • <strong>Predictive modeling:</strong> Forecasts verification outcomes
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-blue-500" />
            <span>Adaptive Algorithm Flow</span>
          </CardTitle>
          <CardDescription>Step-by-step process of AI-driven method selection</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-2">1</div>
                <div className="text-sm font-medium">Context Analysis</div>
                <div className="text-xs text-muted-foreground mt-1">Analyze environment and user state</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-2">2</div>
                <div className="text-sm font-medium">Method Scoring</div>
                <div className="text-xs text-muted-foreground mt-1">Calculate adaptive scores for each method</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 mb-2">3</div>
                <div className="text-sm font-medium">Smart Selection</div>
                <div className="text-xs text-muted-foreground mt-1">Select optimal method combination</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600 mb-2">4</div>
                <div className="text-sm font-medium">Execution</div>
                <div className="text-xs text-muted-foreground mt-1">Execute verification with early termination</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600 mb-2">5</div>
                <div className="text-sm font-medium">Learning</div>
                <div className="text-xs text-muted-foreground mt-1">Learn from results for future optimization</div>
              </div>
            </div>
            <Alert className="border-blue-200">
              <Brain className="h-4 w-4 text-blue-500" />
              <AlertDescription className="text-blue-700">
                <strong>Continuous Improvement:</strong> The adaptive algorithm learns from each verification attempt,
                continuously improving its decision-making process. Over time, it becomes more accurate at predicting
                optimal method combinations for specific emergency scenarios.
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>

      <Alert className="border-green-200 bg-green-50">
        <Zap className="h-4 w-4 text-green-500" />
        <AlertDescription className="text-green-700">
          <strong>Testing Recommendation:</strong> Test the adaptive algorithm under various emergency scenarios to
          understand how it optimizes method selection. Pay attention to the efficiency gains and accuracy maintenance
          across different contexts. The AI should consistently choose the most appropriate methods for each situation.
        </AlertDescription>
      </Alert>
    </div>
  )
}
