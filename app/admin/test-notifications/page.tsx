"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import { NotificationService } from "@/lib/notification-service"
import { useAuth } from "@/lib/auth-context"
import { Bell, Send, TestTube, CheckCircle, XCircle, Clock, AlertTriangle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface TestResult {
  test: string
  status: "pending" | "success" | "error"
  message: string
  timestamp: Date
}

export default function TestNotificationsPage() {
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [isRunningTests, setIsRunningTests] = useState(false)
  const [notificationService, setNotificationService] = useState<NotificationService | null>(null)
  const [permissionStatus, setPermissionStatus] = useState<NotificationPermission | "default">("default")

  // Test notification form
  const [testUserId, setTestUserId] = useState("")
  const [testTitle, setTestTitle] = useState("Test Notification")
  const [testBody, setTestBody] = useState("This is a test notification from the roadside assistance app.")
  const [testData, setTestData] = useState('{"url": "/dashboard", "type": "test"}')

  const { user } = useAuth()

  useEffect(() => {
    const service = NotificationService.getInstance()
    setNotificationService(service)

    if ("Notification" in window) {
      setPermissionStatus(Notification.permission)
    }

    if (user?.id) {
      setTestUserId(user.id)
    }
  }, [user])

  const addTestResult = (test: string, status: "pending" | "success" | "error", message: string) => {
    setTestResults((prev) => [...prev, { test, status, message, timestamp: new Date() }])
  }

  const updateTestResult = (test: string, status: "success" | "error", message: string) => {
    setTestResults((prev) =>
      prev.map((result) => (result.test === test ? { ...result, status, message, timestamp: new Date() } : result)),
    )
  }

  const runAllTests = async () => {
    setIsRunningTests(true)
    setTestResults([])

    // Test 1: Check browser support
    addTestResult("Browser Support", "pending", "Checking browser compatibility...")

    if (!("Notification" in window)) {
      updateTestResult("Browser Support", "error", "Browser doesn't support notifications")
    } else if (!("serviceWorker" in navigator)) {
      updateTestResult("Browser Support", "error", "Browser doesn't support service workers")
    } else if (!("PushManager" in window)) {
      updateTestResult("Browser Support", "error", "Browser doesn't support push messaging")
    } else {
      updateTestResult("Browser Support", "success", "Browser supports all required features")
    }

    // Test 2: Service Worker Registration
    addTestResult("Service Worker", "pending", "Registering service worker...")

    try {
      const registration = await navigator.serviceWorker.register("/sw.js")
      updateTestResult("Service Worker", "success", `Service worker registered: ${registration.scope}`)
    } catch (error) {
      updateTestResult("Service Worker", "error", `Service worker registration failed: ${error}`)
    }

    // Test 3: Notification Permission
    addTestResult("Permission Request", "pending", "Requesting notification permission...")

    try {
      const permission = await Notification.requestPermission()
      if (permission === "granted") {
        updateTestResult("Permission Request", "success", "Notification permission granted")
        setPermissionStatus("granted")
      } else {
        updateTestResult("Permission Request", "error", `Permission ${permission}`)
        setPermissionStatus(permission)
      }
    } catch (error) {
      updateTestResult("Permission Request", "error", `Permission request failed: ${error}`)
    }

    // Test 4: Notification Service Initialization
    addTestResult("Service Initialization", "pending", "Initializing notification service...")

    if (notificationService && user?.id) {
      try {
        const initialized = await notificationService.initialize(user.id)
        if (initialized) {
          updateTestResult("Service Initialization", "success", "Notification service initialized successfully")
        } else {
          updateTestResult("Service Initialization", "error", "Failed to initialize notification service")
        }
      } catch (error) {
        updateTestResult("Service Initialization", "error", `Initialization failed: ${error}`)
      }
    } else {
      updateTestResult("Service Initialization", "error", "Notification service or user not available")
    }

    // Test 5: Local Notification
    addTestResult("Local Notification", "pending", "Testing local notification...")

    if (Notification.permission === "granted" && notificationService) {
      try {
        await notificationService.sendLocalNotification(
          "Test Local Notification",
          "This is a test of local notifications",
          { icon: "/icons/icon-192x192.png" },
        )
        updateTestResult("Local Notification", "success", "Local notification sent successfully")
      } catch (error) {
        updateTestResult("Local Notification", "error", `Local notification failed: ${error}`)
      }
    } else {
      updateTestResult("Local Notification", "error", "Permission not granted or service not available")
    }

    // Test 6: FCM Token API
    addTestResult("FCM Token API", "pending", "Testing FCM token API...")

    try {
      const response = await fetch("/api/fcm-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ registrationToken: "test-token-123" }),
      })

      if (response.ok) {
        updateTestResult("FCM Token API", "success", "FCM token API is working")
      } else {
        updateTestResult("FCM Token API", "error", `API returned ${response.status}`)
      }
    } catch (error) {
      updateTestResult("FCM Token API", "error", `API request failed: ${error}`)
    }

    // Test 7: Send Notification API
    addTestResult("Send Notification API", "pending", "Testing send notification API...")

    if (user?.id) {
      try {
        const response = await fetch("/api/send-notification", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.id,
            title: "API Test Notification",
            body: "This is a test from the notification API",
            data: { type: "test" },
          }),
        })

        const result = await response.json()
        if (response.ok) {
          updateTestResult("Send Notification API", "success", `API test successful: ${JSON.stringify(result)}`)
        } else {
          updateTestResult("Send Notification API", "error", `API error: ${result.error}`)
        }
      } catch (error) {
        updateTestResult("Send Notification API", "error", `API request failed: ${error}`)
      }
    } else {
      updateTestResult("Send Notification API", "error", "User not authenticated")
    }

    setIsRunningTests(false)
  }

  const sendTestNotification = async () => {
    if (!testUserId || !testTitle || !testBody) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    try {
      let parsedData = {}
      if (testData.trim()) {
        parsedData = JSON.parse(testData)
      }

      const response = await fetch("/api/send-notification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: testUserId,
          title: testTitle,
          body: testBody,
          data: parsedData,
        }),
      })

      const result = await response.json()

      if (response.ok) {
        toast({
          title: "Success",
          description: `Notification sent successfully. Success count: ${result.successCount}`,
        })
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to send notification",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send notification",
        variant: "destructive",
      })
    }
  }

  const sendLocalTestNotification = async () => {
    if (!notificationService) {
      toast({
        title: "Error",
        description: "Notification service not initialized",
        variant: "destructive",
      })
      return
    }

    try {
      await notificationService.sendLocalNotification(testTitle, testBody, { icon: "/icons/icon-192x192.png" })

      toast({
        title: "Success",
        description: "Local notification sent successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send local notification",
        variant: "destructive",
      })
    }
  }

  const getStatusIcon = (status: "pending" | "success" | "error") => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />
    }
  }

  const getStatusBadge = (status: "pending" | "success" | "error") => {
    const variants = {
      pending: "secondary",
      success: "default",
      error: "destructive",
    } as const

    return (
      <Badge variant={variants[status]} className="ml-2">
        {status}
      </Badge>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center space-x-2">
        <TestTube className="h-6 w-6" />
        <h1 className="text-3xl font-bold">Notification System Testing</h1>
      </div>

      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          This page is for testing the notification system. Make sure you're logged in and have appropriate permissions.
          Current permission status: <Badge variant="outline">{permissionStatus}</Badge>
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Automated Tests */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TestTube className="h-5 w-5" />
              <span>Automated Tests</span>
            </CardTitle>
            <CardDescription>Run comprehensive tests to verify all notification functionality</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={runAllTests} disabled={isRunningTests} className="w-full">
              {isRunningTests ? "Running Tests..." : "Run All Tests"}
            </Button>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {testResults.map((result, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(result.status)}
                    <span className="font-medium">{result.test}</span>
                    {getStatusBadge(result.status)}
                  </div>
                  <div className="text-sm text-muted-foreground">{result.timestamp.toLocaleTimeString()}</div>
                </div>
              ))}
            </div>

            {testResults.length > 0 && (
              <div className="text-sm text-muted-foreground">
                <p>
                  Total: {testResults.length} | Success: {testResults.filter((r) => r.status === "success").length} |
                  Failed: {testResults.filter((r) => r.status === "error").length} | Pending:{" "}
                  {testResults.filter((r) => r.status === "pending").length}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Manual Testing */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Send className="h-5 w-5" />
              <span>Manual Testing</span>
            </CardTitle>
            <CardDescription>Send test notifications manually to verify functionality</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="userId">User ID</Label>
              <Input
                id="userId"
                value={testUserId}
                onChange={(e) => setTestUserId(e.target.value)}
                placeholder="Enter user ID to send notification to"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Notification Title</Label>
              <Input
                id="title"
                value={testTitle}
                onChange={(e) => setTestTitle(e.target.value)}
                placeholder="Enter notification title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="body">Notification Body</Label>
              <Textarea
                id="body"
                value={testBody}
                onChange={(e) => setTestBody(e.target.value)}
                placeholder="Enter notification message"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="data">Additional Data (JSON)</Label>
              <Textarea
                id="data"
                value={testData}
                onChange={(e) => setTestData(e.target.value)}
                placeholder='{"url": "/dashboard", "type": "test"}'
                rows={2}
              />
            </div>

            <Separator />

            <div className="space-y-2">
              <Button onClick={sendTestNotification} className="w-full">
                <Send className="mr-2 h-4 w-4" />
                Send Server Notification
              </Button>

              <Button
                onClick={sendLocalTestNotification}
                variant="outline"
                className="w-full"
                disabled={permissionStatus !== "granted"}
              >
                <Bell className="mr-2 h-4 w-4" />
                Send Local Notification
              </Button>
            </div>

            {permissionStatus !== "granted" && (
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Notification permission is required for local notifications. Run the automated tests to request
                  permission.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Test Results Details */}
      {testResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Detailed Test Results</CardTitle>
            <CardDescription>Detailed information about each test execution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {testResults.map((result, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(result.status)}
                      <span className="font-medium">{result.test}</span>
                      {getStatusBadge(result.status)}
                    </div>
                    <span className="text-sm text-muted-foreground">{result.timestamp.toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{result.message}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
