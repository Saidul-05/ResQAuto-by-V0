"use client"

import { LearningTransferAnalyzer } from "@/components/emergency/learning-transfer-analyzer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Network, ArrowRight, TrendingUp, BarChart3, Target, Zap, GitBranch } from "lucide-react"

export default function LearningTransferTestPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center space-x-2">
        <Network className="h-6 w-6 text-blue-500" />
        <h1 className="text-3xl font-bold">Learning Transfer Efficiency Testing</h1>
      </div>

      <Alert className="border-blue-200 bg-blue-50">
        <Network className="h-4 w-4 text-blue-500" />
        <AlertDescription className="text-blue-700">
          <strong>Transfer Learning Analysis:</strong> This system measures how effectively AI learning transfers
          between similar emergency types. It analyzes knowledge transfer efficiency, performance improvements, and
          learning acceleration across different emergency scenarios.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="border-green-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <span>Positive Transfer</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-sm text-muted-foreground">
              When learning from one emergency type significantly improves performance in another
            </div>
            <ul className="text-xs space-y-1">
              <li>
                • <strong>Similar stress levels:</strong> Accident → Medical
              </li>
              <li>
                • <strong>Shared methods:</strong> Breakdown → Weather
              </li>
              <li>
                • <strong>Common focus:</strong> Speed optimization transfer
              </li>
              <li>
                • <strong>Category overlap:</strong> Critical → Critical
              </li>
            </ul>
            <div className="text-xs">
              <strong>Expected:</strong> 15-40% performance improvement
            </div>
          </CardContent>
        </Card>

        <Card className="border-yellow-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Target className="h-5 w-5 text-yellow-500" />
              <span>Neutral Transfer</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-sm text-muted-foreground">
              When learning transfer provides minimal benefit or interference
            </div>
            <ul className="text-xs space-y-1">
              <li>
                • <strong>Different categories:</strong> Standard → Critical
              </li>
              <li>
                • <strong>Unrelated methods:</strong> Voice → Iris scanning
              </li>
              <li>
                • <strong>Conflicting focus:</strong> Speed vs. Security
              </li>
              <li>
                • <strong>Low similarity:</strong> Medical → Weather
              </li>
            </ul>
            <div className="text-xs">
              <strong>Expected:</strong> 0-15% performance change
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Zap className="h-5 w-5 text-red-500" />
              <span>Negative Transfer</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-sm text-muted-foreground">
              When learning from one scenario actually hurts performance in another
            </div>
            <ul className="text-xs space-y-1">
              <li>
                • <strong>Conflicting priorities:</strong> Efficiency → Security
              </li>
              <li>
                • <strong>Opposite requirements:</strong> Speed → Accuracy
              </li>
              <li>
                • <strong>Method conflicts:</strong> Single → Multi-modal
              </li>
              <li>
                • <strong>Context mismatch:</strong> Low stress → High stress
              </li>
            </ul>
            <div className="text-xs">
              <strong>Expected:</strong> 5-20% performance decrease
            </div>
          </CardContent>
        </Card>
      </div>

      <LearningTransferAnalyzer />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ArrowRight className="h-5 w-5 text-blue-500" />
              <span>Transfer Mechanisms</span>
            </CardTitle>
            <CardDescription>How learning transfers between emergency types</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <h4 className="font-semibold text-blue-600">Method Compatibility Transfer</h4>
              <ul className="text-sm space-y-1 text-muted-foreground ml-4">
                <li>
                  • <strong>Shared Biometric Methods:</strong> Fingerprint techniques transfer between scenarios
                </li>
                <li>
                  • <strong>Sensor Optimization:</strong> Iris scanning improvements apply across contexts
                </li>
                <li>
                  • <strong>Quality Assessment:</strong> Biometric quality evaluation strategies transfer
                </li>
                <li>
                  • <strong>Error Handling:</strong> Failure recovery patterns apply universally
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-green-600">Stress Adaptation Transfer</h4>
              <ul className="text-sm space-y-1 text-muted-foreground ml-4">
                <li>
                  • <strong>High Stress Handling:</strong> Accident stress management helps medical scenarios
                </li>
                <li>
                  • <strong>Time Pressure Adaptation:</strong> Rapid verification techniques transfer
                </li>
                <li>
                  • <strong>User State Recognition:</strong> Consciousness level assessment transfers
                </li>
                <li>
                  • <strong>Fallback Strategies:</strong> Backup verification methods apply broadly
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-purple-600">Optimization Strategy Transfer</h4>
              <ul className="text-sm space-y-1 text-muted-foreground ml-4">
                <li>
                  • <strong>Speed Optimization:</strong> Fast verification techniques transfer between urgent scenarios
                </li>
                <li>
                  • <strong>Accuracy Enhancement:</strong> Precision improvements apply to high-accuracy requirements
                </li>
                <li>
                  • <strong>Resource Management:</strong> Battery and processing optimization transfers
                </li>
                <li>
                  • <strong>Environmental Adaptation:</strong> Condition-aware adjustments apply broadly
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <GitBranch className="h-5 w-5 text-orange-500" />
              <span>Transfer Barriers</span>
            </CardTitle>
            <CardDescription>What prevents effective learning transfer</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <h4 className="font-semibold text-red-600">Conflicting Requirements</h4>
              <ul className="text-sm space-y-1 text-muted-foreground ml-4">
                <li>
                  • <strong>Speed vs. Security:</strong> Medical speed conflicts with security depth requirements
                </li>
                <li>
                  • <strong>Efficiency vs. Accuracy:</strong> Breakdown efficiency conflicts with accident precision
                </li>
                <li>
                  • <strong>Single vs. Multi-modal:</strong> Simple verification conflicts with complex security
                </li>
                <li>
                  • <strong>Resource vs. Performance:</strong> Battery saving conflicts with maximum capability
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-orange-600">Context Specificity</h4>
              <ul className="text-sm space-y-1 text-muted-foreground ml-4">
                <li>
                  • <strong>Stress Level Differences:</strong> Low stress optimizations don't work under high stress
                </li>
                <li>
                  • <strong>Time Constraint Variations:</strong> Relaxed timing strategies fail under pressure
                </li>
                <li>
                  • <strong>Environmental Factors:</strong> Indoor optimizations don't work outdoors
                </li>
                <li>
                  • <strong>User State Differences:</strong> Conscious user strategies fail for unconscious users
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-yellow-600">Method Incompatibility</h4>
              <ul className="text-sm space-y-1 text-muted-foreground ml-4">
                <li>
                  • <strong>Hardware Dependencies:</strong> Iris scanner optimizations don't help voice recognition
                </li>
                <li>
                  • <strong>Processing Differences:</strong> Visual processing doesn't transfer to audio processing
                </li>
                <li>
                  • <strong>Quality Metrics:</strong> Different biometric types have different quality measures
                </li>
                <li>
                  • <strong>Failure Modes:</strong> Different methods fail in different ways
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-purple-500" />
            <span>Expected Transfer Patterns</span>
          </CardTitle>
          <CardDescription>Typical learning transfer relationships between emergency types</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-green-600">High Transfer Efficiency (70%+)</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                  <span>Minor Accident → Major Accident</span>
                  <Badge variant="default">85%</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                  <span>Minor Medical → Major Medical</span>
                  <Badge variant="default">80%</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                  <span>Minor Breakdown → Major Breakdown</span>
                  <Badge variant="default">75%</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                  <span>Major Accident → Major Medical</span>
                  <Badge variant="default">70%</Badge>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-red-600">Low Transfer Efficiency (&lt;30%)</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between p-2 bg-red-50 rounded">
                  <span>Security Threat → Medical Emergency</span>
                  <Badge variant="destructive">15%</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-red-50 rounded">
                  <span>Minor Breakdown → Security Threat</span>
                  <Badge variant="destructive">20%</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-red-50 rounded">
                  <span>Weather Emergency → Major Medical</span>
                  <Badge variant="destructive">25%</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-red-50 rounded">
                  <span>Major Medical → Security Threat</span>
                  <Badge variant="destructive">25%</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Alert className="border-green-200 bg-green-50">
        <TrendingUp className="h-4 w-4 text-green-500" />
        <AlertDescription className="text-green-700">
          <strong>Testing Recommendation:</strong> Run the analysis with all 8 emergency types to see the complete
          transfer matrix. Look for high transfer efficiency between similar scenarios (same category or stress level)
          and low efficiency between conflicting requirements (speed vs. security). The system should show 60-80%
          transfer efficiency for similar scenarios and 15-30% for dissimilar ones.
        </AlertDescription>
      </Alert>
    </div>
  )
}
