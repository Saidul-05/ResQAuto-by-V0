"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { toast } from "@/components/ui/use-toast"
import {
  Fingerprint,
  Camera,
  Scan,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Shield,
  Eye,
  Monitor,
  WifiOff,
  BatteryLow,
  RefreshCw,
  Settings,
} from "lucide-react"

interface BiometricDevice {
  id: string
  name: string
  type: "fingerprint" | "face" | "iris" | "voice"
  available: boolean
  quality: "excellent" | "good" | "fair" | "poor"
  batteryLevel: number
  connected: boolean
  lastCalibration: Date
  errorRate: number
  supportedFeatures: string[]
}

interface BiometricAttempt {
  id: string
  timestamp: Date
  deviceId: string
  type: "fingerprint" | "face" | "iris" | "voice"
  result: "success" | "failure" | "retry" | "timeout" | "device_error"
  confidence: number
  processingTime: number
  qualityScore: number
  errorMessage?: string
  biometricData?: {
    templateMatch: number
    liveness: boolean
    spoofDetection: boolean
    imageQuality: number
  }
}

interface BiometricTestState {
  isRunning: boolean
  currentTest: "fingerprint" | "face" | "iris" | "voice" | null
  devices: BiometricDevice[]
  attempts: BiometricAttempt[]
  testProgress: number
  overallResult: "pending" | "success" | "failure" | "partial"
  securityLevel: "basic" | "standard" | "enhanced" | "maximum"
  environmentalFactors: {
    lighting: "excellent" | "good" | "poor" | "dark"
    stability: "stable" | "shaky" | "unstable"
    noise: "quiet" | "moderate" | "loud"
    interference: boolean
  }
  simulatedConditions: {
    deviceDamage: boolean
    lowBattery: boolean
    networkIssues: boolean
    userStress: boolean
    emergencyLighting: boolean
  }
}

export function BiometricVerificationTester() {
  const [testState, setTestState] = useState<BiometricTestState>({
    isRunning: false,
    currentTest: null,
    devices: [],
    attempts: [],
    testProgress: 0,
    overallResult: "pending",
    securityLevel: "standard",
    environmentalFactors: {
      lighting: "good",
      stability: "stable",
      noise: "quiet",
      interference: false,
    },
    simulatedConditions: {
      deviceDamage: false,
      lowBattery: false,
      networkIssues: false,
      userStress: false,
      emergencyLighting: false,
    },
  })

  const [scanningProgress, setScanningProgress] = useState(0)
  const [isScanning, setIsScanning] = useState(false)
  const scanningIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Initialize mock biometric devices
  useEffect(() => {
    const mockDevices: BiometricDevice[] = [
      {
        id: "fp_sensor_1",
        name: "Primary Fingerprint Sensor",
        type: "fingerprint",
        available: true,
        quality: "excellent",
        batteryLevel: 85,
        connected: true,
        lastCalibration: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        errorRate: 0.02,
        supportedFeatures: ["liveness_detection", "spoof_detection", "multi_finger", "360_degree"],
      },
      {
        id: "face_cam_1",
        name: "Front-Facing Camera (Face Recognition)",
        type: "face",
        available: true,
        quality: "good",
        batteryLevel: 92,
        connected: true,
        lastCalibration: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
        errorRate: 0.05,
        supportedFeatures: ["3d_mapping", "liveness_detection", "emotion_analysis", "low_light"],
      },
      {
        id: "iris_scanner_1",
        name: "Iris Scanner (Premium)",
        type: "iris",
        available: false, // Not commonly available
        quality: "excellent",
        batteryLevel: 78,
        connected: false,
        lastCalibration: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
        errorRate: 0.001,
        supportedFeatures: ["dual_iris", "distance_scanning", "glasses_compatible"],
      },
      {
        id: "voice_mic_1",
        name: "Voice Recognition Microphone",
        type: "voice",
        available: true,
        quality: "fair",
        batteryLevel: 67,
        connected: true,
        lastCalibration: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        errorRate: 0.08,
        supportedFeatures: ["noise_cancellation", "stress_detection", "multi_language"],
      },
    ]

    setTestState((prev) => ({ ...prev, devices: mockDevices }))
  }, [])

  const simulateBiometricScan = async (
    deviceId: string,
    type: "fingerprint" | "face" | "iris" | "voice",
  ): Promise<BiometricAttempt> => {
    const device = testState.devices.find((d) => d.id === deviceId)
    if (!device) {
      throw new Error("Device not found")
    }

    setIsScanning(true)
    setScanningProgress(0)

    // Simulate scanning progress
    return new Promise((resolve) => {
      let progress = 0
      scanningIntervalRef.current = setInterval(() => {
        progress += Math.random() * 15 + 5 // Random progress between 5-20%
        setScanningProgress(Math.min(progress, 100))

        if (progress >= 100) {
          if (scanningIntervalRef.current) {
            clearInterval(scanningIntervalRef.current)
          }
          setIsScanning(false)
          setScanningProgress(0)

          // Calculate success probability based on device quality and environmental factors
          let successProbability = 0.9 // Base success rate

          // Adjust for device quality
          switch (device.quality) {
            case "excellent":
              successProbability *= 0.98
              break
            case "good":
              successProbability *= 0.92
              break
            case "fair":
              successProbability *= 0.85
              break
            case "poor":
              successProbability *= 0.7
              break
          }

          // Adjust for environmental factors
          if (testState.environmentalFactors.lighting === "poor") successProbability *= 0.8
          if (testState.environmentalFactors.lighting === "dark") successProbability *= 0.6
          if (testState.environmentalFactors.stability === "shaky") successProbability *= 0.85
          if (testState.environmentalFactors.stability === "unstable") successProbability *= 0.7
          if (testState.environmentalFactors.noise === "loud" && type === "voice") successProbability *= 0.75

          // Adjust for simulated conditions
          if (testState.simulatedConditions.deviceDamage) successProbability *= 0.6
          if (testState.simulatedConditions.lowBattery) successProbability *= 0.8
          if (testState.simulatedConditions.userStress) successProbability *= 0.85
          if (testState.simulatedConditions.emergencyLighting && type === "face") successProbability *= 0.7

          const isSuccess = Math.random() < successProbability
          const confidence = isSuccess ? Math.random() * 0.3 + 0.7 : Math.random() * 0.5 + 0.2 // 70-100% or 20-70%
          const processingTime = Math.random() * 2000 + 1000 // 1-3 seconds
          const qualityScore = Math.random() * 0.4 + 0.6 // 60-100%

          const attempt: BiometricAttempt = {
            id: `attempt_${Date.now()}`,
            timestamp: new Date(),
            deviceId,
            type,
            result: isSuccess ? "success" : "failure",
            confidence,
            processingTime,
            qualityScore,
            biometricData: {
              templateMatch: confidence,
              liveness: Math.random() > 0.1, // 90% liveness detection
              spoofDetection: Math.random() > 0.05, // 95% spoof detection
              imageQuality: qualityScore,
            },
            errorMessage: !isSuccess ? getRandomErrorMessage(type) : undefined,
          }

          resolve(attempt)
        }
      }, 100)
    })
  }

  const getRandomErrorMessage = (type: "fingerprint" | "face" | "iris" | "voice"): string => {
    const errorMessages = {
      fingerprint: [
        "Fingerprint image quality too low",
        "Finger placement incorrect",
        "Sensor surface dirty or damaged",
        "Multiple fingers detected",
        "Finger too dry or wet",
        "Partial fingerprint captured",
      ],
      face: [
        "Face not properly aligned",
        "Insufficient lighting detected",
        "Multiple faces in frame",
        "Face partially obscured",
        "Camera lens dirty or damaged",
        "Head movement during scan",
      ],
      iris: [
        "Iris pattern unclear",
        "Eye movement detected",
        "Glasses interference",
        "Insufficient iris visibility",
        "Pupil dilation issues",
        "Distance from scanner incorrect",
      ],
      voice: [
        "Background noise too high",
        "Voice pattern unclear",
        "Microphone quality poor",
        "Speech too fast or slow",
        "Voice stress detected",
        "Audio sample too short",
      ],
    }

    const messages = errorMessages[type]
    return messages[Math.floor(Math.random() * messages.length)]
  }

  const runBiometricTest = async (type: "fingerprint" | "face" | "iris" | "voice") => {
    const device = testState.devices.find((d) => d.type === type && d.available)
    if (!device) {
      toast({
        title: "Device Not Available",
        description: `${type} scanner is not available or connected`,
        variant: "destructive",
      })
      return
    }

    setTestState((prev) => ({ ...prev, currentTest: type, isRunning: true }))

    toast({
      title: `🔍 Starting ${type.charAt(0).toUpperCase() + type.slice(1)} Scan`,
      description: "Please position yourself correctly for scanning",
    })

    try {
      const attempt = await simulateBiometricScan(device.id, type)

      setTestState((prev) => ({
        ...prev,
        attempts: [attempt, ...prev.attempts.slice(0, 9)], // Keep last 10 attempts
        currentTest: null,
        isRunning: false,
      }))

      if (attempt.result === "success") {
        toast({
          title: "✅ Biometric Verification Successful",
          description: `${type.charAt(0).toUpperCase() + type.slice(1)} verified with ${(attempt.confidence * 100).toFixed(1)}% confidence`,
        })
      } else {
        toast({
          title: "❌ Biometric Verification Failed",
          description: attempt.errorMessage || "Verification failed",
          variant: "destructive",
        })
      }
    } catch (error) {
      setTestState((prev) => ({ ...prev, currentTest: null, isRunning: false }))
      toast({
        title: "🚫 Device Error",
        description: "Biometric device encountered an error",
        variant: "destructive",
      })
    }
  }

  const runComprehensiveTest = async () => {
    setTestState((prev) => ({ ...prev, isRunning: true, testProgress: 0, attempts: [] }))

    const availableDevices = testState.devices.filter((d) => d.available)
    let completedTests = 0

    for (const device of availableDevices) {
      setTestState((prev) => ({ ...prev, currentTest: device.type }))

      try {
        const attempt = await simulateBiometricScan(device.id, device.type)
        setTestState((prev) => ({
          ...prev,
          attempts: [attempt, ...prev.attempts],
        }))
      } catch (error) {
        console.error(`Error testing ${device.type}:`, error)
      }

      completedTests++
      setTestState((prev) => ({
        ...prev,
        testProgress: (completedTests / availableDevices.length) * 100,
      }))

      // Small delay between tests
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }

    // Calculate overall result
    const successfulAttempts = testState.attempts.filter((a) => a.result === "success").length
    const totalAttempts = testState.attempts.length

    let overallResult: "success" | "failure" | "partial" = "failure"
    if (successfulAttempts === totalAttempts && totalAttempts > 0) {
      overallResult = "success"
    } else if (successfulAttempts > 0) {
      overallResult = "partial"
    }

    setTestState((prev) => ({
      ...prev,
      isRunning: false,
      currentTest: null,
      overallResult,
      testProgress: 100,
    }))

    toast({
      title: "🏁 Comprehensive Test Complete",
      description: `${successfulAttempts}/${totalAttempts} biometric verifications successful`,
    })
  }

  const toggleSimulatedCondition = (condition: keyof typeof testState.simulatedConditions) => {
    setTestState((prev) => ({
      ...prev,
      simulatedConditions: {
        ...prev.simulatedConditions,
        [condition]: !prev.simulatedConditions[condition],
      },
    }))
  }

  const getDeviceStatusIcon = (device: BiometricDevice) => {
    if (!device.connected) return <WifiOff className="h-4 w-4 text-red-500" />
    if (device.batteryLevel < 20) return <BatteryLow className="h-4 w-4 text-orange-500" />
    if (!device.available) return <XCircle className="h-4 w-4 text-gray-500" />
    return <CheckCircle className="h-4 w-4 text-green-500" />
  }

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case "fingerprint":
        return <Fingerprint className="h-5 w-5" />
      case "face":
        return <Camera className="h-5 w-5" />
      case "iris":
        return <Eye className="h-5 w-5" />
      case "voice":
        return <Scan className="h-5 w-5" />
      default:
        return <Shield className="h-5 w-5" />
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Fingerprint className="h-6 w-6 text-purple-500" />
            <span>Biometric Verification Testing</span>
          </CardTitle>
          <CardDescription>
            Test fingerprint, facial recognition, iris scanning, and voice verification systems
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Button onClick={runComprehensiveTest} disabled={testState.isRunning} className="flex-1">
              <Scan className="mr-2 h-4 w-4" />
              Run Comprehensive Biometric Test
            </Button>
            <Button
              onClick={() => setTestState((prev) => ({ ...prev, attempts: [] }))}
              variant="outline"
              disabled={testState.isRunning}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Clear Results
            </Button>
          </div>

          {testState.isRunning && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Test Progress</span>
                <span>{testState.testProgress.toFixed(0)}%</span>
              </div>
              <Progress value={testState.testProgress} className="w-full" />
              {testState.currentTest && (
                <p className="text-sm text-muted-foreground">
                  Currently testing: {testState.currentTest.charAt(0).toUpperCase() + testState.currentTest.slice(1)}
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Device Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Monitor className="h-5 w-5" />
            <span>Biometric Devices</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {testState.devices.map((device) => (
              <Card
                key={device.id}
                className={`border-l-4 ${
                  device.available && device.connected
                    ? "border-l-green-500"
                    : device.available
                      ? "border-l-orange-500"
                      : "border-l-gray-500"
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getDeviceIcon(device.type)}
                      <span className="font-medium text-sm">{device.name}</span>
                    </div>
                    {getDeviceStatusIcon(device)}
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Quality:</span>
                      <Badge
                        variant={
                          device.quality === "excellent"
                            ? "default"
                            : device.quality === "good"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {device.quality}
                      </Badge>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Battery:</span>
                      <span className={device.batteryLevel < 20 ? "text-red-500" : ""}>{device.batteryLevel}%</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Error Rate:</span>
                      <span>{(device.errorRate * 100).toFixed(1)}%</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => runBiometricTest(device.type)}
                    disabled={!device.available || !device.connected || testState.isRunning}
                    size="sm"
                    className="w-full mt-3"
                  >
                    Test {device.type.charAt(0).toUpperCase() + device.type.slice(1)}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Scanning Progress */}
      {isScanning && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-blue-700">
              <Scan className="h-5 w-5 animate-pulse" />
              <span>Scanning in Progress...</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Scan Progress</span>
                <span>{scanningProgress.toFixed(0)}%</span>
              </div>
              <Progress value={scanningProgress} className="w-full" />
            </div>
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                {testState.currentTest === "fingerprint" && "Place your finger firmly on the sensor and hold still"}
                {testState.currentTest === "face" && "Look directly at the camera and remain still"}
                {testState.currentTest === "iris" && "Look into the scanner and keep your eyes open"}
                {testState.currentTest === "voice" && "Speak clearly into the microphone"}
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}

      {/* Simulated Conditions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>Simulated Emergency Conditions</span>
          </CardTitle>
          <CardDescription>Test biometric verification under various emergency scenarios</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(testState.simulatedConditions).map(([condition, enabled]) => (
              <div key={condition} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={condition}
                  checked={enabled}
                  onChange={() => toggleSimulatedCondition(condition as any)}
                  className="rounded"
                />
                <label htmlFor={condition} className="text-sm cursor-pointer">
                  {condition.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Test Results */}
      {testState.attempts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5" />
              <span>Biometric Test Results</span>
              <Badge variant="outline">{testState.attempts.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {testState.attempts.map((attempt) => (
                <Card
                  key={attempt.id}
                  className={`border-l-4 ${
                    attempt.result === "success" ? "border-l-green-500 bg-green-50" : "border-l-red-500 bg-red-50"
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {getDeviceIcon(attempt.type)}
                        <span className="font-medium">
                          {attempt.type.charAt(0).toUpperCase() + attempt.type.slice(1)} Verification
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {attempt.result === "success" ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500" />
                        )}
                        <Badge variant={attempt.result === "success" ? "default" : "destructive"} className="text-xs">
                          {attempt.result}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Confidence:</span>
                        <div className="font-medium">{(attempt.confidence * 100).toFixed(1)}%</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Quality:</span>
                        <div className="font-medium">{(attempt.qualityScore * 100).toFixed(1)}%</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Processing:</span>
                        <div className="font-medium">{attempt.processingTime.toFixed(0)}ms</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Time:</span>
                        <div className="font-medium">{attempt.timestamp.toLocaleTimeString()}</div>
                      </div>
                    </div>

                    {attempt.biometricData && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-sm mb-2">Biometric Analysis:</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                          <div>
                            <span className="text-muted-foreground">Template Match:</span>
                            <div>{(attempt.biometricData.templateMatch * 100).toFixed(1)}%</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Liveness:</span>
                            <div>{attempt.biometricData.liveness ? "✅ Detected" : "❌ Failed"}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Spoof Detection:</span>
                            <div>{attempt.biometricData.spoofDetection ? "✅ Passed" : "❌ Failed"}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Image Quality:</span>
                            <div>{(attempt.biometricData.imageQuality * 100).toFixed(1)}%</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {attempt.errorMessage && (
                      <Alert className="mt-3 border-red-200">
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                        <AlertDescription className="text-red-700">{attempt.errorMessage}</AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Overall Test Summary */}
      {testState.attempts.length > 0 && !testState.isRunning && (
        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-blue-500" />
              <span>Biometric Verification Summary</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {testState.attempts.filter((a) => a.result === "success").length}
                </div>
                <div className="text-sm text-muted-foreground">Successful</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {testState.attempts.filter((a) => a.result === "failure").length}
                </div>
                <div className="text-sm text-muted-foreground">Failed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {(
                    (testState.attempts.reduce((sum, a) => sum + a.confidence, 0) / testState.attempts.length) *
                    100
                  ).toFixed(1)}
                  %
                </div>
                <div className="text-sm text-muted-foreground">Avg Confidence</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {(
                    testState.attempts.reduce((sum, a) => sum + a.processingTime, 0) / testState.attempts.length
                  ).toFixed(0)}
                  ms
                </div>
                <div className="text-sm text-muted-foreground">Avg Processing</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
