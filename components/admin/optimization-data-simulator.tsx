"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { toast } from "@/components/ui/use-toast"
import { Play, Database, Zap } from "lucide-react"

import { recordVerificationOutcome, type VerificationOutcome } from "@/lib/adaptive-environmental-optimizer"
import { getEnvironmentalContext, calculateEnvironmentalImpact } from "@/lib/environmental-context"

export function OptimizationDataSimulator() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [generatedCount, setGeneratedCount] = useState(0)

  const generateSampleData = async () => {
    setIsGenerating(true)
    setProgress(0)
    setGeneratedCount(0)

    const totalSamples = 500
    const batchSize = 10

    try {
      for (let i = 0; i < totalSamples; i += batchSize) {
        const batch = Math.min(batchSize, totalSamples - i)

        for (let j = 0; j < batch; j++) {
          const outcome = await generateRandomOutcome()
          recordVerificationOutcome(outcome)
          setGeneratedCount((prev) => prev + 1)
        }

        setProgress(((i + batch) / totalSamples) * 100)

        // Small delay to prevent blocking
        await new Promise((resolve) => setTimeout(resolve, 10))
      }

      toast({
        title: "✅ Data Generation Complete",
        description: `Generated ${totalSamples} sample verification outcomes`,
      })
    } catch (error) {
      toast({
        title: "❌ Error",
        description: "Failed to generate sample data: " + (error as Error).message,
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
      setProgress(0)
    }
  }

  const generateRandomOutcome = async (): Promise<VerificationOutcome> => {
    // Generate random location
    const lat = 40.7128 + (Math.random() - 0.5) * 10 // Around NYC area
    const lng = -74.006 + (Math.random() - 0.5) * 10

    // Get environmental context
    const environmentalContext = await getEnvironmentalContext(lat, lng)
    const predictedImpact = calculateEnvironmentalImpact(environmentalContext)

    // Simulate actual outcome with some randomness
    const baseSuccessRate = 0.85
    const environmentalSuccessRate = baseSuccessRate * predictedImpact.successProbability
    const actualSuccess = Math.random() < environmentalSuccessRate

    const baseTime = 30000 // 30 seconds
    const actualTime = baseTime * predictedImpact.timeMultiplier * (0.8 + Math.random() * 0.4)

    const baseStress = 5 // 1-10 scale
    const actualStress = Math.min(10, baseStress * predictedImpact.stressMultiplier * (0.9 + Math.random() * 0.2))

    const emergencyTypes = ["breakdown", "accident", "flat_tire", "battery_dead", "lockout", "fuel_empty"]
    const biometricMethods = ["fingerprint", "face", "voice", "iris"]

    return {
      id: `outcome_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000), // Last 7 days
      environmentalContext,
      predictedImpact,
      actualOutcome: {
        success: actualSuccess,
        verificationTime: actualTime,
        stressLevel: actualStress,
        userSatisfaction: actualSuccess ? 7 + Math.random() * 3 : 3 + Math.random() * 4,
        methodUsed: biometricMethods[Math.floor(Math.random() * biometricMethods.length)],
        attemptsRequired: actualSuccess ? 1 + Math.floor(Math.random() * 2) : 2 + Math.floor(Math.random() * 3),
        errorType: actualSuccess
          ? undefined
          : ["timeout", "sensor_error", "poor_quality", "user_error"][Math.floor(Math.random() * 4)],
      },
      userId: `user_${Math.floor(Math.random() * 1000)}`,
      emergencyType: emergencyTypes[Math.floor(Math.random() * emergencyTypes.length)],
      location: { lat, lng },
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Database className="h-5 w-5" />
          <span>Optimization Data Simulator</span>
        </CardTitle>
        <CardDescription>Generate sample verification outcomes to test adaptive optimization</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <h4 className="font-semibold">Sample Generation</h4>
            <p className="text-sm text-muted-foreground">
              Creates realistic verification outcomes with environmental factors
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold">Data Variety</h4>
            <div className="space-y-1">
              <Badge variant="outline">8 Weather Types</Badge>
              <Badge variant="outline">5 Coverage Levels</Badge>
              <Badge variant="outline">6 Location Types</Badge>
              <Badge variant="outline">6 Emergency Types</Badge>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold">Outcome Factors</h4>
            <div className="space-y-1 text-sm">
              <div>• Success/failure rates</div>
              <div>• Verification timing</div>
              <div>• User stress levels</div>
              <div>• Method effectiveness</div>
            </div>
          </div>
        </div>

        {isGenerating && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Generating sample data...</span>
              <span>{generatedCount}/500 outcomes</span>
            </div>
            <Progress value={progress} />
          </div>
        )}

        <div className="flex justify-center">
          <Button onClick={generateSampleData} disabled={isGenerating} size="lg">
            {isGenerating ? (
              <>
                <Zap className="mr-2 h-4 w-4 animate-pulse" />
                Generating Data...
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                Generate 500 Sample Outcomes
              </>
            )}
          </Button>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          This will create diverse verification scenarios across different environmental conditions to help train and
          test the adaptive optimization system.
        </div>
      </CardContent>
    </Card>
  )
}
