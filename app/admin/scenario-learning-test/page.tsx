"use client"

import { ScenarioSpecificLearningTester } from "@/components/emergency/scenario-specific-learning-tester"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Brain, Car, Heart, Shield, AlertTriangle, Target, TrendingUp, BarChart3, ArrowRight } from "lucide-react"

export default function ScenarioLearningTestPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center space-x-2">
        <Brain className="h-6 w-6 text-purple-500" />
        <h1 className="text-3xl font-bold">Scenario-Specific AI Learning Testing</h1>
      </div>

      <Alert className="border-purple-200 bg-purple-50">
        <Brain className="h-4 w-4 text-purple-500" />
        <AlertDescription className="text-purple-700">
          <strong>Advanced AI Learning:</strong> This system demonstrates how the AI algorithm develops specialized
          learning strategies for different emergency types. Each scenario requires unique optimizations for speed,
          accuracy, and security based on the specific emergency context.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Card className="border-blue-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Car className="h-5 w-5 text-blue-500" />
              <span>Breakdown</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">Medium Priority</Badge>
            </div>
            <ul className="text-xs space-y-1 text-muted-foreground">
              <li>• Efficiency optimization</li>
              <li>• Battery conservation</li>
              <li>• Weather adaptation</li>
              <li>• Moderate stress handling</li>
            </ul>
            <div className="text-xs">
              <strong>Focus:</strong> Balanced performance
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <span>Accident</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center space-x-2">
              <Badge variant="destructive">Critical Priority</Badge>
            </div>
            <ul className="text-xs space-y-1 text-muted-foreground">
              <li>• Extreme stress adaptation</li>
              <li>• Injury compensation</li>
              <li>• Rapid verification</li>
              <li>• High accuracy requirement</li>
            </ul>
            <div className="text-xs">
              <strong>Focus:</strong> Speed + accuracy
            </div>
          </CardContent>
        </Card>

        <Card className="border-pink-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Heart className="h-5 w-5 text-pink-500" />
              <span>Medical</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center space-x-2">
              <Badge variant="destructive">Critical Priority</Badge>
            </div>
            <ul className="text-xs space-y-1 text-muted-foreground">
              <li>• Maximum speed priority</li>
              <li>• Consciousness adaptation</li>
              <li>• Medical context awareness</li>
              <li>• Life-critical timing</li>
            </ul>
            <div className="text-xs">
              <strong>Focus:</strong> Speed above all
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Shield className="h-5 w-5 text-green-500" />
              <span>Security</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center space-x-2">
              <Badge variant="default">High Priority</Badge>
            </div>
            <ul className="text-xs space-y-1 text-muted-foreground">
              <li>• Maximum security level</li>
              <li>• Multi-modal verification</li>
              <li>• Threat assessment</li>
              <li>• Enhanced accuracy</li>
            </ul>
            <div className="text-xs">
              <strong>Focus:</strong> Security depth
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <svg className="h-5 w-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.5 17a4.5 4.5 0 01-1.44-8.765 4.5 4.5 0 018.302-3.046 3.5 3.5 0 014.504 4.272A4 4 0 0115 17H5.5zm3.75-2.75a.75.75 0 001.5 0V9.66l1.95 2.1a.75.75 0 101.1-1.02l-3.25-3.5a.75.75 0 00-1.1 0l-3.25 3.5a.75.75 0 101.1 1.02l1.95-2.1v4.59z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Weather</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center space-x-2">
              <Badge variant="default">High Priority</Badge>
            </div>
            <ul className="text-xs space-y-1 text-muted-foreground">
              <li>• Environmental adaptation</li>
              <li>• Sensor protection</li>
              <li>• Weather resilience</li>
              <li>• Condition-aware selection</li>
            </ul>
            <div className="text-xs">
              <strong>Focus:</strong> Environmental adaptation
            </div>
          </CardContent>
        </Card>
      </div>

      <ScenarioSpecificLearningTester />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-blue-500" />
              <span>Scenario-Specific Adaptations</span>
            </CardTitle>
            <CardDescription>How AI adapts to different emergency contexts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <h4 className="font-semibold text-blue-600">Vehicle Breakdown Learning</h4>
              <ul className="text-sm space-y-1 text-muted-foreground ml-4">
                <li>
                  • <strong>Efficiency Focus:</strong> Optimizes for battery life and processing speed
                </li>
                <li>
                  • <strong>Weather Adaptation:</strong> Adjusts method selection based on environmental conditions
                </li>
                <li>
                  • <strong>Stress Management:</strong> Handles moderate stress levels effectively
                </li>
                <li>
                  • <strong>Resource Conservation:</strong> Balances accuracy with power consumption
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-red-600">Vehicle Accident Learning</h4>
              <ul className="text-sm space-y-1 text-muted-foreground ml-4">
                <li>
                  • <strong>Stress Resistance:</strong> Prioritizes methods that work under extreme stress
                </li>
                <li>
                  • <strong>Injury Compensation:</strong> Adapts to potential physical injuries
                </li>
                <li>
                  • <strong>Time Pressure:</strong> Optimizes for fastest possible verification
                </li>
                <li>
                  • <strong>High Accuracy:</strong> Maintains security despite speed requirements
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-pink-600">Medical Emergency Learning</h4>
              <ul className="text-sm space-y-1 text-muted-foreground ml-4">
                <li>
                  • <strong>Speed Priority:</strong> Fastest verification methods always selected
                </li>
                <li>
                  • <strong>Consciousness Levels:</strong> Adapts to varying user awareness states
                </li>
                <li>
                  • <strong>Medical Context:</strong> Considers medical conditions in method selection
                </li>
                <li>
                  • <strong>Life-Critical Timing:</strong> Minimizes verification time at all costs
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ArrowRight className="h-5 w-5 text-green-500" />
              <span>Cross-Scenario Learning</span>
            </CardTitle>
            <CardDescription>How learning transfers between emergency types</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <h4 className="font-semibold text-green-600">Positive Transfer Learning</h4>
              <ul className="text-sm space-y-1 text-muted-foreground ml-4">
                <li>
                  • <strong>Stress Adaptation:</strong> Accident stress handling helps medical emergencies
                </li>
                <li>
                  • <strong>Speed Optimization:</strong> Medical speed techniques benefit accident scenarios
                </li>
                <li>
                  • <strong>Method Reliability:</strong> Security verification depth improves all scenarios
                </li>
                <li>
                  • <strong>Environmental Adaptation:</strong> Weather learning helps breakdown scenarios
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-orange-600">Scenario-Specific Barriers</h4>
              <ul className="text-sm space-y-1 text-muted-foreground ml-4">
                <li>
                  • <strong>Speed vs Security:</strong> Medical speed conflicts with security depth
                </li>
                <li>
                  • <strong>Accuracy vs Efficiency:</strong> Breakdown efficiency conflicts with accident accuracy
                </li>
                <li>
                  • <strong>Environmental vs Speed:</strong> Weather adaptation may slow medical response
                </li>
                <li>
                  • <strong>Context Specificity:</strong> Some learnings don't transfer between scenarios
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-purple-600">Learning Optimization</h4>
              <ul className="text-sm space-y-1 text-muted-foreground ml-4">
                <li>
                  • <strong>Selective Transfer:</strong> AI learns which strategies transfer effectively
                </li>
                <li>
                  • <strong>Context Awareness:</strong> Applies appropriate learning based on emergency type
                </li>
                <li>
                  • <strong>Adaptive Weighting:</strong> Balances transferred vs scenario-specific learning
                </li>
                <li>
                  • <strong>Continuous Refinement:</strong> Improves transfer learning over time
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-blue-500" />
            <span>Expected Learning Patterns</span>
          </CardTitle>
          <CardDescription>Typical AI learning progression for each emergency type</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-blue-600">Breakdown</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Learning Speed:</span>
                  <span className="font-medium">Moderate</span>
                </div>
                <div className="flex justify-between">
                  <span>Peak Performance:</span>
                  <span className="font-medium">Iter 12-15</span>
                </div>
                <div className="flex justify-between">
                  <span>Success Rate:</span>
                  <span className="font-medium">80-90%</span>
                </div>
                <div className="flex justify-between">
                  <span>Specialization:</span>
                  <span className="font-medium">Efficiency</span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-red-600">Accident</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Learning Speed:</span>
                  <span className="font-medium">Fast</span>
                </div>
                <div className="flex justify-between">
                  <span>Peak Performance:</span>
                  <span className="font-medium">Iter 8-10</span>
                </div>
                <div className="flex justify-between">
                  <span>Success Rate:</span>
                  <span className="font-medium">85-95%</span>
                </div>
                <div className="flex justify-between">
                  <span>Specialization:</span>
                  <span className="font-medium">Speed+Accuracy</span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-pink-600">Medical</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Learning Speed:</span>
                  <span className="font-medium">Very Fast</span>
                </div>
                <div className="flex justify-between">
                  <span>Peak Performance:</span>
                  <span className="font-medium">Iter 6-8</span>
                </div>
                <div className="flex justify-between">
                  <span>Success Rate:</span>
                  <span className="font-medium">90-95%</span>
                </div>
                <div className="flex justify-between">
                  <span>Specialization:</span>
                  <span className="font-medium">Maximum Speed</span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-green-600">Security</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Learning Speed:</span>
                  <span className="font-medium">Slow</span>
                </div>
                <div className="flex justify-between">
                  <span>Peak Performance:</span>
                  <span className="font-medium">Iter 15-20</span>
                </div>
                <div className="flex justify-between">
                  <span>Success Rate:</span>
                  <span className="font-medium">95-99%</span>
                </div>
                <div className="flex justify-between">
                  <span>Specialization:</span>
                  <span className="font-medium">Max Security</span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-orange-600">Weather</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Learning Speed:</span>
                  <span className="font-medium">Moderate</span>
                </div>
                <div className="flex justify-between">
                  <span>Peak Performance:</span>
                  <span className="font-medium">Iter 10-12</span>
                </div>
                <div className="flex justify-between">
                  <span>Success Rate:</span>
                  <span className="font-medium">75-85%</span>
                </div>
                <div className="flex justify-between">
                  <span>Specialization:</span>
                  <span className="font-medium">Environmental</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Alert className="border-green-200 bg-green-50">
        <TrendingUp className="h-4 w-4 text-green-500" />
        <AlertDescription className="text-green-700">
          <strong>Testing Recommendation:</strong> Run all 5 emergency scenarios with 15+ iterations each to see
          distinct learning patterns. Medical emergencies should show fastest learning, security should show highest
          final accuracy, and cross-scenario transfer should become evident after 10+ iterations per scenario.
        </AlertDescription>
      </Alert>
    </div>
  )
}
