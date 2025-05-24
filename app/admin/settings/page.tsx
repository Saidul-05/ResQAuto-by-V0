"use client"

import { DashboardLayout } from "@/components/dashboard/layout"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import { AlertTriangle, Database, Map, Save, Globe, CreditCard, Shield } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function AdminSettings() {
  // Database settings
  const [enableFirestore, setEnableFirestore] = useState(true)
  const [enableSupabase, setEnableSupabase] = useState(false)

  // Firebase config
  const [firebaseApiKey, setFirebaseApiKey] = useState("AIzaSyC2Wx9tBzZ_Vef2G3e4dpJdmxd86vIpm34")
  const [firebaseAuthDomain, setFirebaseAuthDomain] = useState("roadrescue-demo.firebaseapp.com")
  const [firebaseProjectId, setFirebaseProjectId] = useState("roadrescue-demo")

  // Supabase config
  const [supabaseUrl, setSupabaseUrl] = useState("")
  const [supabaseAnonKey, setSupabaseAnonKey] = useState("")
  const [supabaseServiceKey, setSupabaseServiceKey] = useState("")

  // Map settings
  const [useGoogleMaps, setUseGoogleMaps] = useState(true)
  const [useLeaflet, setUseLeaflet] = useState(false)
  const [googleMapsApiKey, setGoogleMapsApiKey] = useState("YOUR_GOOGLE_MAPS_API_KEY")

  // Currency and language settings
  const [enableUSD, setEnableUSD] = useState(true)
  const [enableBDT, setEnableBDT] = useState(true)
  const [enableEnglish, setEnableEnglish] = useState(true)
  const [enableBangla, setEnableBangla] = useState(true)

  const handleDatabaseToggle = (type, checked) => {
    if (type === "firestore") {
      setEnableFirestore(checked)
      if (checked) setEnableSupabase(false)
    } else {
      setEnableSupabase(checked)
      if (checked) setEnableFirestore(false)
    }
  }

  const handleMapToggle = (type, checked) => {
    if (type === "google") {
      setUseGoogleMaps(checked)
      if (checked) setUseLeaflet(false)
    } else {
      setUseLeaflet(checked)
      if (checked) setUseGoogleMaps(false)
    }
  }

  const handleSaveSettings = () => {
    // In a real app, this would save settings to your backend
    toast({
      title: "Settings saved successfully",
      description: "Your configuration changes have been applied.",
    })
  }

  return (
    <DashboardLayout role="admin">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">System Settings</h1>
        <p className="text-muted-foreground">Configure databases, maps, languages, and other system settings</p>
      </div>

      <Tabs defaultValue="database" className="space-y-6">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-5">
          <TabsTrigger value="database">Database</TabsTrigger>
          <TabsTrigger value="maps">Maps</TabsTrigger>
          <TabsTrigger value="languages">Languages & Currency</TabsTrigger>
          <TabsTrigger value="payments">Payment Gateways</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* Database Settings */}
        <TabsContent value="database">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="mr-2 h-5 w-5" /> Database Configuration
              </CardTitle>
              <CardDescription>Choose your primary database and configure connection settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Important</AlertTitle>
                <AlertDescription>
                  Changing your database connection will affect data storage for your entire application. Ensure you
                  have proper data migration strategy in place before switching databases.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div className="flex items-center justify-between border p-4 rounded-lg">
                  <div className="space-y-0.5">
                    <div className="font-medium">Firebase Firestore</div>
                    <div className="text-sm text-muted-foreground">
                      Use Firebase Firestore for document-based storage and real-time updates
                    </div>
                  </div>
                  <Switch
                    checked={enableFirestore}
                    onCheckedChange={(checked) => handleDatabaseToggle("firestore", checked)}
                  />
                </div>

                {enableFirestore && (
                  <div className="space-y-4 border p-4 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firebase-api-key">Firebase API Key</Label>
                        <Input
                          id="firebase-api-key"
                          value={firebaseApiKey}
                          onChange={(e) => setFirebaseApiKey(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="firebase-auth-domain">Firebase Auth Domain</Label>
                        <Input
                          id="firebase-auth-domain"
                          value={firebaseAuthDomain}
                          onChange={(e) => setFirebaseAuthDomain(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="firebase-project-id">Firebase Project ID</Label>
                      <Input
                        id="firebase-project-id"
                        value={firebaseProjectId}
                        onChange={(e) => setFirebaseProjectId(e.target.value)}
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between border p-4 rounded-lg mt-4">
                  <div className="space-y-0.5">
                    <div className="font-medium">Supabase</div>
                    <div className="text-sm text-muted-foreground">
                      Use Supabase for PostgreSQL database with built-in auth and real-time subscriptions
                    </div>
                  </div>
                  <Switch
                    checked={enableSupabase}
                    onCheckedChange={(checked) => handleDatabaseToggle("supabase", checked)}
                  />
                </div>

                {enableSupabase && (
                  <div className="space-y-4 border p-4 rounded-lg">
                    <div className="space-y-2">
                      <Label htmlFor="supabase-url">Supabase URL</Label>
                      <Input
                        id="supabase-url"
                        value={supabaseUrl}
                        onChange={(e) => setSupabaseUrl(e.target.value)}
                        placeholder="https://your-project.supabase.co"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="supabase-anon-key">Supabase Anon/Public Key</Label>
                      <Input
                        id="supabase-anon-key"
                        value={supabaseAnonKey}
                        onChange={(e) => setSupabaseAnonKey(e.target.value)}
                        placeholder="your-anon-key"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="supabase-service-key">Supabase Service Key (Optional)</Label>
                      <Input
                        id="supabase-service-key"
                        value={supabaseServiceKey}
                        onChange={(e) => setSupabaseServiceKey(e.target.value)}
                        placeholder="your-service-key"
                      />
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings} className="ml-auto">
                <Save className="mr-2 h-4 w-4" /> Save Database Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Maps Settings */}
        <TabsContent value="maps">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Map className="mr-2 h-5 w-5" /> Map Provider Configuration
              </CardTitle>
              <CardDescription>Choose your preferred map provider for displaying locations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between border p-4 rounded-lg">
                  <div className="space-y-0.5">
                    <div className="font-medium">Google Maps</div>
                    <div className="text-sm text-muted-foreground">
                      Use Google Maps for advanced mapping features including Street View and detailed POIs
                    </div>
                  </div>
                  <Switch checked={useGoogleMaps} onCheckedChange={(checked) => handleMapToggle("google", checked)} />
                </div>

                {useGoogleMaps && (
                  <div className="space-y-4 border p-4 rounded-lg">
                    <div className="space-y-2">
                      <Label htmlFor="google-maps-api-key">Google Maps API Key</Label>
                      <Input
                        id="google-maps-api-key"
                        value={googleMapsApiKey}
                        onChange={(e) => setGoogleMapsApiKey(e.target.value)}
                      />
                      <p className="text-sm text-muted-foreground mt-1">
                        Get your API key from the{" "}
                        <a
                          href="https://console.cloud.google.com/"
                          className="text-primary underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Google Cloud Console
                        </a>
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between border p-4 rounded-lg mt-4">
                  <div className="space-y-0.5">
                    <div className="font-medium">Leaflet</div>
                    <div className="text-sm text-muted-foreground">
                      Use Leaflet for an open-source map solution with various tile providers
                    </div>
                  </div>
                  <Switch checked={useLeaflet} onCheckedChange={(checked) => handleMapToggle("leaflet", checked)} />
                </div>

                {useLeaflet && (
                  <div className="space-y-4 border p-4 rounded-lg">
                    <div className="text-sm">
                      Leaflet doesn't require an API key by default, but specific tile providers may require
                      authentication. Configure additional tile providers in the advanced settings.
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/admin/settings/maps/advanced">Advanced Tile Settings</Link>
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings} className="ml-auto">
                <Save className="mr-2 h-4 w-4" /> Save Map Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Languages & Currency Settings */}
        <TabsContent value="languages">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="mr-2 h-5 w-5" /> Languages & Currency
              </CardTitle>
              <CardDescription>Configure supported languages and currencies for your application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Languages</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between border p-4 rounded-lg">
                    <div className="space-y-0.5">
                      <div className="font-medium">English</div>
                      <div className="text-sm text-muted-foreground">Enable English language support</div>
                    </div>
                    <Switch
                      checked={enableEnglish}
                      onCheckedChange={setEnableEnglish}
                      disabled={!enableBangla} // Ensure at least one language is enabled
                    />
                  </div>
                  <div className="flex items-center justify-between border p-4 rounded-lg">
                    <div className="space-y-0.5">
                      <div className="font-medium">Bangla</div>
                      <div className="text-sm text-muted-foreground">Enable Bangla language support</div>
                    </div>
                    <Switch
                      checked={enableBangla}
                      onCheckedChange={setEnableBangla}
                      disabled={!enableEnglish} // Ensure at least one language is enabled
                    />
                  </div>
                </div>

                <Separator className="my-4" />

                <h3 className="text-lg font-medium">Currencies</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between border p-4 rounded-lg">
                    <div className="space-y-0.5">
                      <div className="font-medium">USD (US Dollar)</div>
                      <div className="text-sm text-muted-foreground">Enable USD currency and pricing</div>
                    </div>
                    <Switch
                      checked={enableUSD}
                      onCheckedChange={setEnableUSD}
                      disabled={!enableBDT} // Ensure at least one currency is enabled
                    />
                  </div>
                  <div className="flex items-center justify-between border p-4 rounded-lg">
                    <div className="space-y-0.5">
                      <div className="font-medium">BDT (Bangladeshi Taka)</div>
                      <div className="text-sm text-muted-foreground">Enable BDT currency and pricing</div>
                    </div>
                    <Switch
                      checked={enableBDT}
                      onCheckedChange={setEnableBDT}
                      disabled={!enableUSD} // Ensure at least one currency is enabled
                    />
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="border p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">Default Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="default-language">Default Language</Label>
                      <Select defaultValue="en">
                        <SelectTrigger id="default-language">
                          <SelectValue placeholder="Select a language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="bn">Bangla</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="default-currency">Default Currency</Label>
                      <Select defaultValue="usd">
                        <SelectTrigger id="default-currency">
                          <SelectValue placeholder="Select a currency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="usd">USD</SelectItem>
                          <SelectItem value="bdt">BDT</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings} className="ml-auto">
                <Save className="mr-2 h-4 w-4" /> Save Language & Currency Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Payment Gateway Settings */}
        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="mr-2 h-5 w-5" /> Payment Gateway Configuration
              </CardTitle>
              <CardDescription>Configure your payment processing methods and credentials</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Local Payment Methods (Bangladesh)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border p-4 rounded-lg space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">bKash</div>
                        <div className="text-sm text-muted-foreground">Enable bKash payment method</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bkash-merchant-id">Merchant ID</Label>
                      <Input id="bkash-merchant-id" placeholder="Your bKash Merchant ID" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bkash-api-key">API Key</Label>
                      <Input id="bkash-api-key" placeholder="Your bKash API Key" type="password" />
                    </div>
                  </div>

                  <div className="border p-4 rounded-lg space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Nagad</div>
                        <div className="text-sm text-muted-foreground">Enable Nagad payment method</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nagad-merchant-id">Merchant ID</Label>
                      <Input id="nagad-merchant-id" placeholder="Your Nagad Merchant ID" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nagad-merchant-number">Merchant Number</Label>
                      <Input id="nagad-merchant-number" placeholder="Your Nagad Merchant Number" />
                    </div>
                  </div>

                  <div className="border p-4 rounded-lg space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">SSLCOMMERZ</div>
                        <div className="text-sm text-muted-foreground">Enable SSLCOMMERZ payment gateway</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ssl-store-id">Store ID</Label>
                      <Input id="ssl-store-id" placeholder="Your SSLCOMMERZ Store ID" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ssl-store-password">Store Password</Label>
                      <Input id="ssl-store-password" placeholder="Your SSLCOMMERZ Store Password" type="password" />
                    </div>
                  </div>
                </div>

                <Separator className="my-4" />

                <h3 className="text-lg font-medium">Global Payment Methods</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border p-4 rounded-lg space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Stripe</div>
                        <div className="text-sm text-muted-foreground">Enable Stripe payment processing</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="stripe-publishable-key">Publishable Key</Label>
                      <Input id="stripe-publishable-key" placeholder="pk_test_..." />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="stripe-secret-key">Secret Key</Label>
                      <Input id="stripe-secret-key" placeholder="sk_test_..." type="password" />
                    </div>
                  </div>

                  <div className="border p-4 rounded-lg space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">PayPal</div>
                        <div className="text-sm text-muted-foreground">Enable PayPal payment processing</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="paypal-client-id">Client ID</Label>
                      <Input id="paypal-client-id" placeholder="Your PayPal Client ID" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="paypal-secret">Secret</Label>
                      <Input id="paypal-secret" placeholder="Your PayPal Secret" type="password" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="paypal-sandbox" defaultChecked />
                      <Label htmlFor="paypal-sandbox">Use Sandbox (Testing Environment)</Label>
                    </div>
                  </div>
                </div>

                <div className="border p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">Commission Settings</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="mechanic-commission">Mechanic Commission Rate (%)</Label>
                        <Input id="mechanic-commission" type="number" min="0" max="100" defaultValue="80" />
                        <p className="text-xs text-muted-foreground">Percentage of the service fee paid to mechanics</p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="provider-commission">Service Provider Commission Rate (%)</Label>
                        <Input id="provider-commission" type="number" min="0" max="100" defaultValue="75" />
                        <p className="text-xs text-muted-foreground">
                          Percentage of the service fee paid to service providers
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings} className="ml-auto">
                <Save className="mr-2 h-4 w-4" /> Save Payment Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5" /> Security Configuration
              </CardTitle>
              <CardDescription>Configure security settings for your application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="border p-4 rounded-lg space-y-4">
                  <h3 className="text-lg font-medium">Authentication & Verification</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Email Verification</div>
                        <div className="text-sm text-muted-foreground">Require email verification for new accounts</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">reCAPTCHA</div>
                        <div className="text-sm text-muted-foreground">
                          Enable reCAPTCHA on login, signup, and contact forms
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                      <div className="space-y-2">
                        <Label htmlFor="recaptcha-site-key">reCAPTCHA Site Key</Label>
                        <Input id="recaptcha-site-key" placeholder="Your reCAPTCHA Site Key" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="recaptcha-secret-key">reCAPTCHA Secret Key</Label>
                        <Input id="recaptcha-secret-key" placeholder="Your reCAPTCHA Secret Key" type="password" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border p-4 rounded-lg space-y-4">
                  <h3 className="text-lg font-medium">Role-Based Access Control</h3>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Configure role permissions for different user types in the system
                    </p>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium">Mechanic Application Approval</div>
                          <div className="text-sm text-muted-foreground">
                            Require admin approval for new mechanic registrations
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium">Service Provider Application Approval</div>
                          <div className="text-sm text-muted-foreground">
                            Require admin approval for new service provider registrations
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/admin/roles">Advanced Role Configuration</Link>
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="border p-4 rounded-lg space-y-4">
                  <h3 className="text-lg font-medium">Data Security</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Data Encryption</div>
                        <div className="text-sm text-muted-foreground">Enable encryption for sensitive user data</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Automatic Data Backup</div>
                        <div className="text-sm text-muted-foreground">Schedule automatic backups of your database</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="backup-frequency">Backup Frequency</Label>
                      <Select defaultValue="daily">
                        <SelectTrigger id="backup-frequency">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hourly">Hourly</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings} className="ml-auto">
                <Save className="mr-2 h-4 w-4" /> Save Security Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
