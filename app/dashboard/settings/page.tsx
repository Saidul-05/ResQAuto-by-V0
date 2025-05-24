"use client"

import { UserProfile } from "@/components/dashboard/user-profile"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Bell, Shield, CreditCard } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Account Settings</h1>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <div className="grid gap-6 md:grid-cols-2">
            <UserProfile />

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Picture</CardTitle>
                  <CardDescription>Update your profile photo</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-center">
                    <div className="h-32 w-32 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                      <img
                        src="/placeholder.svg?height=128&width=128"
                        alt="Profile"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex justify-center gap-4">
                    <Button variant="outline">Upload New</Button>
                    <Button variant="outline" className="text-destructive hover:text-destructive">
                      Remove
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Account Preferences</CardTitle>
                  <CardDescription>Manage your account settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="language">Language</Label>
                    <select
                      id="language"
                      className="rounded-md border border-input bg-background px-3 py-1"
                      defaultValue="en"
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="timezone">Timezone</Label>
                    <select
                      id="timezone"
                      className="rounded-md border border-input bg-background px-3 py-1"
                      defaultValue="utc-5"
                    >
                      <option value="utc-8">Pacific Time (UTC-8)</option>
                      <option value="utc-7">Mountain Time (UTC-7)</option>
                      <option value="utc-6">Central Time (UTC-6)</option>
                      <option value="utc-5">Eastern Time (UTC-5)</option>
                    </select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                Notification Settings
              </CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Email Notifications</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-service-updates">Service Updates</Label>
                    <Switch id="email-service-updates" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-account-updates">Account Updates</Label>
                    <Switch id="email-account-updates" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-marketing">Marketing & Promotions</Label>
                    <Switch id="email-marketing" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Push Notifications</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="push-service-updates">Service Updates</Label>
                    <Switch id="push-service-updates" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="push-technician-arrival">Technician Arrival</Label>
                    <Switch id="push-technician-arrival" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="push-emergency-alerts">Emergency Alerts</Label>
                    <Switch id="push-emergency-alerts" defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="mr-2 h-5 w-5" />
                  Password & Security
                </CardTitle>
                <CardDescription>Manage your password and security settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
                <Button>Update Password</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>Add an extra layer of security to your account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-muted-foreground">
                      Protect your account with an additional security layer
                    </p>
                  </div>
                  <Switch id="2fa" />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Recovery Codes</p>
                    <p className="text-sm text-muted-foreground">
                      Generate backup codes to use when you don't have your device
                    </p>
                  </div>
                  <Button variant="outline" disabled>
                    Generate Codes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="mr-2 h-5 w-5" />
                Payment Methods
              </CardTitle>
              <CardDescription>Manage your payment methods and billing information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Saved Payment Methods</h3>
                <div className="border rounded-md p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-10 w-16 bg-muted rounded flex items-center justify-center mr-4">
                      <CreditCard className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-medium">Visa ending in 4242</p>
                      <p className="text-sm text-muted-foreground">Expires 12/2025</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                      Remove
                    </Button>
                  </div>
                </div>
                <Button variant="outline">Add Payment Method</Button>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Billing Address</h3>
                <div className="border rounded-md p-4">
                  <p>John Doe</p>
                  <p>123 Main St</p>
                  <p>Apt 4B</p>
                  <p>New York, NY 10001</p>
                  <p>United States</p>
                  <div className="mt-2">
                    <Button variant="outline" size="sm">
                      Edit Address
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
