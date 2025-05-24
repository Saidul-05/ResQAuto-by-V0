"use client"

import { BiometricVerificationTester } from "@/components/emergency/biometric-verification-tester"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Fingerprint, Camera, Eye, Scan, Shield, AlertTriangle, CheckCircle, Lock } from "lucide-react"

export default function BiometricTestPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center space-x-2">
        <Fingerprint className="h-6 w-6 text-purple-500" />
        <h1 className="text-3xl font-bold">Biometric Verification Testing</h1>
      </div>

      <Alert className="border-purple-200 bg-purple-50">
        <Shield className="h-4 w-4 text-purple-500" />
        <AlertDescription className="text-purple-700">
          <strong>Advanced Security Testing:</strong> This comprehensive test validates fingerprint, facial recognition,
          iris scanning, and voice verification systems under various emergency conditions. Biometric verification
          provides the highest level of identity confirmation for critical emergency situations.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="border-green-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Fingerprint className="h-5 w-5 text-green-500" />
              <span>Fingerprint</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center space-x-2">
              <Badge variant="default">Primary</Badge>
              <span className="text-sm">~2-5 seconds</span>
            </div>
            <ul className="text-xs space-y-1 text-muted-foreground">
              <li>• Liveness detection</li>
              <li>• Spoof prevention</li>
              <li>• Multi-finger support</li>
              <li>• 360° recognition</li>
            </ul>
            <div className="text-xs">
              <strong>Accuracy:</strong> 99.8% | <strong>FAR:</strong> 0.001%
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Camera className="h-5 w-5 text-blue-500" />
              <span>Face Recognition</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">Secondary</Badge>
              <span className="text-sm">~3-7 seconds</span>
            </div>
            <ul className="text-xs space-y-1 text-muted-foreground">
              <li>• 3D facial mapping</li>
              <li>• Low-light support</li>
              <li>• Emotion analysis</li>
              <li>• Anti-spoofing</li>
            </ul>
            <div className="text-xs">
              <strong>Accuracy:</strong> 99.5% | <strong>FAR:</strong> 0.01%
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Eye className="h-5 w-5 text-orange-500" />
              <span>Iris Scanning</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center space-x-2">
              <Badge variant="outline">Premium</Badge>
              <span className="text-sm">~4-8 seconds</span>
            </div>
            <ul className="text-xs space-y-1 text-muted-foreground">
              <li>• Dual iris scanning</li>
              <li>• Distance scanning</li>
              <li>• Glasses compatible</li>
              <li>• Highest accuracy</li>
            </ul>
            <div className="text-xs">
              <strong>Accuracy:</strong> 99.99% | <strong>FAR:</strong> 0.0001%
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Scan className="h-5 w-5 text-purple-500" />
              <span>Voice Pattern</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center space-x-2">
              <Badge variant="outline">Backup</Badge>
              <span className="text-sm">~5-10 seconds</span>
            </div>
            <ul className="text-xs space-y-1 text-muted-foreground">
              <li>• Stress detection</li>
              <li>• Noise cancellation</li>
              <li>• Multi-language</li>
              <li>• Emotion analysis</li>
            </ul>
            <div className="text-xs">
              <strong>Accuracy:</strong> 95.2% | <strong>FAR:</strong> 0.1%
            </div>
          </CardContent>
        </Card>
      </div>

      <BiometricVerificationTester />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              <span>Emergency Challenges</span>
            </CardTitle>
            <CardDescription>Factors that affect biometric verification in emergencies</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <h4 className="font-semibold text-red-600">Physical Conditions</h4>
              <ul className="text-sm space-y-1 text-muted-foreground ml-4">
                <li>• Injured fingers may affect fingerprint scanning</li>
                <li>• Facial injuries or swelling impact face recognition</li>
                <li>• Stress and adrenaline affect voice patterns</li>
                <li>• Shaking hands reduce scan quality</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-orange-600">Environmental Factors</h4>
              <ul className="text-sm space-y-1 text-muted-foreground ml-4">
                <li>• Poor lighting conditions (night, emergency lighting)</li>
                <li>• Dirt, blood, or moisture on sensors</li>
                <li>• Background noise interfering with voice recognition</li>
                <li>• Device damage from accident impact</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-blue-600">Technical Limitations</h4>
              <ul className="text-sm space-y-1 text-muted-foreground ml-4">
                <li>• Battery drain affecting sensor performance</li>
                <li>• Network connectivity issues</li>
                <li>• Processing power limitations under stress</li>
                <li>• Sensor calibration drift over time</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Security Features</span>
            </CardTitle>
            <CardDescription>Advanced security measures in biometric verification</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <h4 className="font-semibold">Anti-Spoofing Protection</h4>
              <ul className="text-sm space-y-1 text-muted-foreground ml-4">
                <li>• Liveness detection prevents fake fingerprints</li>
                <li>• 3D facial mapping detects photos/videos</li>
                <li>• Pulse detection in fingerprint sensors</li>
                <li>• Eye movement tracking for iris scanning</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Quality Assurance</h4>
              <ul className="text-sm space-y-1 text-muted-foreground ml-4">
                <li>• Image quality scoring and validation</li>
                <li>• Multiple template matching algorithms</li>
                <li>• Confidence scoring for each attempt</li>
                <li>• Automatic retry with quality feedback</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Privacy Protection</h4>
              <ul className="text-sm space-y-1 text-muted-foreground ml-4">
                <li>• Encrypted biometric template storage</li>
                <li>• Local processing when possible</li>
                <li>• Automatic data deletion after verification</li>
                <li>• GDPR and CCPA compliance</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lock className="h-5 w-5 text-blue-500" />
            <span>Biometric Security Levels</span>
          </CardTitle>
          <CardDescription>Different security configurations for various emergency scenarios</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-green-600">Level 1: Basic</h4>
              <ul className="text-xs space-y-1 text-muted-foreground">
                <li>• Single biometric method</li>
                <li>• Standard quality thresholds</li>
                <li>• 3 retry attempts</li>
                <li>• 60-second timeout</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-blue-600">Level 2: Standard</h4>
              <ul className="text-xs space-y-1 text-muted-foreground">
                <li>• Primary + backup method</li>
                <li>• Enhanced quality checks</li>
                <li>• Liveness detection required</li>
                <li>• 90-second timeout</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-orange-600">Level 3: Enhanced</h4>
              <ul className="text-xs space-y-1 text-muted-foreground">
                <li>• Multi-modal verification</li>
                <li>• Advanced anti-spoofing</li>
                <li>• Behavioral analysis</li>
                <li>• 120-second timeout</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-red-600">Level 4: Maximum</h4>
              <ul className="text-xs space-y-1 text-muted-foreground">
                <li>• All available methods</li>
                <li>• Highest quality thresholds</li>
                <li>• Continuous monitoring</li>
                <li>• 180-second timeout</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Alert className="border-green-200 bg-green-50">
        <CheckCircle className="h-4 w-4 text-green-500" />
        <AlertDescription className="text-green-700">
          <strong>Testing Best Practices:</strong> Test biometric verification under various simulated emergency
          conditions to ensure reliability. Consider fallback methods when primary biometric verification fails, and
          always maintain user privacy and data security during the verification process.
        </AlertDescription>
      </Alert>
    </div>
  )
}
