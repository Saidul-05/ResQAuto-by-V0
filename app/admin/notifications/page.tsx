"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, Settings, TestTube, Users, BarChart3 } from "lucide-react"
import Link from "next/link"

export default function NotificationDashboard() {
  const [stats] = useState({
    totalNotifications: 1247,
    activeUsers: 89,
    deliveryRate: 94.2,
    avgResponseTime: "1.2s",
  })

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Bell className="h-6 w-6" />
          <h1 className="text-3xl font-bold">Notification Management</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Link href="/admin/test-notifications">
            <Button variant="outline">
              <TestTube className="mr-2 h-4 w-4" />
              Test System
            </Button>
          </Link>
          <Button>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Notifications</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalNotifications.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeUsers}</div>
            <p className="text-xs text-muted-foreground">Users with notifications enabled</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delivery Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.deliveryRate}%</div>
            <p className="text-xs text-muted-foreground">
              <Badge variant="default" className="text-xs">
                Excellent
              </Badge>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <TestTube className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgResponseTime}</div>
            <p className="text-xs text-muted-foreground">API response time</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Service Request Test</CardTitle>
            <CardDescription>Test service request notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Send Test Notification</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Emergency Alert Test</CardTitle>
            <CardDescription>Test emergency notification system</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="destructive" className="w-full">
              Send Emergency Test
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Status Update Test</CardTitle>
            <CardDescription>Test status change notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              Send Status Test
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle>System Status</CardTitle>
          <CardDescription>Current notification system configuration and status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Firebase Configuration</h4>
                <p className="text-sm text-muted-foreground">Firebase Cloud Messaging settings</p>
              </div>
              <Badge variant="default">Active</Badge>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Service Worker</h4>
                <p className="text-sm text-muted-foreground">Push notification service worker</p>
              </div>
              <Badge variant="default">Registered</Badge>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">API Endpoints</h4>
                <p className="text-sm text-muted-foreground">Notification API status</p>
              </div>
              <Badge variant="default">Operational</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
