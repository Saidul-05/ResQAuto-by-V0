"use client"

import { MultiModalBiometricTester } from "@/components/emergency/multi-modal-biometric-tester"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Layers, Shield, Target, BarChart3, AlertTriangle, CheckCircle, Lock } from "lucide-react"

export default function MultiModalTestPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center space-x-2">
        <Layers className="h-6 w-6 text-purple-500" />
        <h1 className="text-3xl font-bold">Multi-Modal Biometric Testing</h1>
      </div>

      <Alert className="border-purple-200 bg-purple-50">
        <Shield className="h-4 w-4 text-purple-500" />
        <AlertDescription className="text-purple-700">
          <strong>Enhanced Security Testing:</strong> Multi-modal biometric verification combines multiple biometric
          methods to achieve higher security levels and improved reliability. This is critical for high-stakes emergency
          situations where maximum identity verification is required.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="border-blue-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Target className="h-5 w-5 text-blue-500" />
              <span>Dual Primary</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center space-x-2">
              <Badge variant="default">Standard</Badge>
              <span className="text-sm">~60 seconds</span>
            </div>
            <ul className="text-xs space-y-1 text-muted-foreground">
              <li>• Fingerprint + Face</li>
              <li>• 85% min confidence</li>
              <li>• No partial success</li>
              <li>• Balanced security</li>
            </ul>
            <div className="text-xs">
              <strong>Use Case:</strong> Standard emergency verification
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Shield className="h-5 w-5 text-purple-500" />
              <span>Triple Enhanced</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">Enhanced</Badge>
              <span className="text-sm">~90 seconds</span>
            </div>
            <ul className="text-xs space-y-1 text-muted-foreground">
              <li>• Fingerprint + Face + Iris</li>
              <li>• 90% min confidence</li>
              <li>• Partial success allowed</li>
              <li>• Premium security</li>
            </ul>
            <div className="text-xs">
              <strong>Use Case:</strong> High-value emergency cancellation
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Lock className="h-5 w-5 text-red-500" />
              <span>Quad Maximum</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center space-x-2">
              <Badge variant="destructive">Maximum</Badge>
              <span className="text-sm">~120 seconds</span>
            </div>
            <ul className="text-xs space-y-1 text-muted-foreground">
              <li>• All four methods</li>
              <li>• 95% min confidence</li>
              <li>• No partial success</li>
              <li>• Maximum security</li>
            </ul>
            <div className="text-xs">
              <strong>Use Case:</strong> Critical emergency situations
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <BarChart3 className="h-5 w-5 text-green-500" />
              <span>Adaptive Smart</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center space-x-2">
              <Badge variant="outline">AI-Driven</Badge>
              <span className="text-sm">~75 seconds</span>
            </div>
            <ul className="text-xs space-y-1 text-muted-foreground">
              <li>• Dynamic method selection</li>
              <li>• 88% min confidence</li>
              <li>• Early termination</li>
              <li>• Optimized efficiency</li>
            </ul>
            <div className="text-xs">
              <strong>Use Case:</strong> Time-critical emergencies
            </div>
          </CardContent>
        </Card>
      </div>

      <MultiModalBiometricTester />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Multi-Modal Advantages</span>
            </CardTitle>
            <CardDescription>Benefits of combining multiple biometric methods</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <h4 className="font-semibold text-green-600">Enhanced Security</h4>
              <ul className="text-sm space-y-1 text-muted-foreground ml-4">
                <li>• Significantly reduced false acceptance rates</li>
                <li>• Multiple verification points prevent spoofing</li>
                <li>• Weighted scoring based on method reliability</li>
                <li>• Adaptive confidence thresholds</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-blue-600">Improved Reliability</h4>
              <ul className="text-sm space-y-1 text-muted-foreground ml-4">
                <li>• Backup methods when primary fails</li>
                <li>• Compensation for environmental challenges</li>
                <li>• Reduced impact of individual method failures</li>
                <li>• Higher overall success rates</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-purple-600">Flexibility</h4>
              <ul className="text-sm space-y-1 text-muted-foreground ml-4">
                <li>• Configurable security levels</li>
                <li>• Partial success options</li>
                <li>• Emergency condition adaptation</li>
                <li>• User-specific method preferences</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              <span>Implementation Challenges</span>
            </CardTitle>
            <CardDescription>Considerations for multi-modal biometric systems</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <h4 className="font-semibold text-red-600">Technical Complexity</h4>
              <ul className="text-sm space-y-1 text-muted-foreground ml-4">
                <li>• Multiple sensor integration and calibration</li>
                <li>• Increased processing power requirements</li>
                <li>• Complex scoring algorithms</li>
                <li>• Higher system maintenance needs</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-orange-600">User Experience</h4>
              <ul className="text-sm space-y-1 text-muted-foreground ml-4">
                <li>• Longer verification times</li>
                <li>• Multiple interaction steps</li>
                <li>• User training requirements</li>
                <li>• Potential frustration with failures</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-600">Emergency Considerations</h4>
              <ul className="text-sm space-y-1 text-muted-foreground ml-4">
                <li>• Time pressure affecting accuracy</li>
                <li>• Stress impacting biometric quality</li>
                <li>• Device damage from accidents</li>
                <li>• Environmental interference</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-blue-500" />
            <span>Scoring Algorithm</span>
          </CardTitle>
          <CardDescription>How multi-modal confidence scores are calculated</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Weighted Confidence Formula:</h4>
              <code className="text-sm bg-white p-2 rounded border block">
                Overall_Confidence = Σ(Method_Confidence × Method_Weight) / Σ(Method_Weight)
              </code>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">30%</div>
                <div className="text-sm text-muted-foreground">Fingerprint Weight</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">25%</div>
                <div className="text-sm text-muted-foreground">Face Weight</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">35%</div>
                <div className="text-sm text-muted-foreground">Iris Weight</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">10%</div>
                <div className="text-sm text-muted-foreground">Voice Weight</div>
              </div>
            </div>
            <Alert className="border-blue-200">
              <AlertTriangle className="h-4 w-4 text-blue-500" />
              <AlertDescription className="text-blue-700">
                <strong>Note:</strong> Weights are adjusted based on method availability, environmental conditions, and
                emergency context. The adaptive algorithm can modify these weights in real-time for optimal results.
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>

      <Alert className="border-green-200 bg-green-50">
        <CheckCircle className="h-4 w-4 text-green-500" />
        <AlertDescription className="text-green-700">
          <strong>Testing Recommendation:</strong> Test all security levels under various emergency conditions to
          understand the trade-offs between security, reliability, and user experience. Consider implementing adaptive
          algorithms that can adjust verification requirements based on the specific emergency context.
        </AlertDescription>
      </Alert>
    </div>
  )
}
