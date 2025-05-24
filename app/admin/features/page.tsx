"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { Save, Smartphone, Users, Search, Megaphone, Globe } from "lucide-react"

export default function FeaturesPage() {
  // App Download feature
  const [enableAppDownload, setEnableAppDownload] = useState(true)
  const [appDownloadDelay, setAppDownloadDelay] = useState("2000")
  const [appStoreLink, setAppStoreLink] = useState("https://apps.apple.com/app/roadrescue")
  const [playStoreLink, setPlayStoreLink] = useState("https://play.google.com/store/apps/details?id=com.roadrescue")

  // Authentication feature
  const [enableAuth, setEnableAuth] = useState(true)
  const [authProvider, setAuthProvider] = useState("firebase")
  const [requireEmailVerification, setRequireEmailVerification] = useState(true)

  // SEO features
  const [enableSEO, setEnableSEO] = useState(true)
  const [generateSitemap, setGenerateSitemap] = useState(true)
  const [enableStructuredData, setEnableStructuredData] = useState(true)
  const [enableCanonicalUrls, setEnableCanonicalUrls] = useState(true)

  // Marketing features
  const [enableNewsletter, setEnableNewsletter] = useState(true)
  const [enableReferrals, setEnableReferrals] = useState(true)
  const [enablePromos, setEnablePromos] = useState(true)
  const [referralDiscount, setReferralDiscount] = useState("25")

  // Geolocation features
  const [enableGeolocation, setEnableGeolocation] = useState(true)
  const [geolocationFallback, setGeolocationFallback] = useState("ip")
  const [geolocationTimeout, setGeolocationTimeout] = useState("10000")

  const { toast } = useToast()

  const handleSave = () => {
    // In a real app, this would save to your backend
    toast({
      title: "Settings saved",
      description: "Your feature settings have been updated.",
    })
  }

  return (
    <DashboardLayout role="admin">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Feature Management</h1>
        <p className="text-muted-foreground">Enable or disable features and configure their settings</p>
      </div>

      <Tabs defaultValue="app-download" className="space-y-6">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-5">
          <TabsTrigger value="app-download">App Download</TabsTrigger>
          <TabsTrigger value="auth">Authentication</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="marketing">Marketing</TabsTrigger>
          <TabsTrigger value="geolocation">Geolocation</TabsTrigger>
        </TabsList>

        {/* App Download Settings */}
        <TabsContent value="app-download">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Smartphone className="mr-2 h-5 w-5" /> App Download Banner
              </CardTitle>
              <CardDescription>Configure the app download banner settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enable-app-download">Enable App Download Banner</Label>
                  <p className="text-sm text-muted-foreground">
                    Show a banner prompting users to download the mobile app
                  </p>
                </div>
                <Switch id="enable-app-download" checked={enableAppDownload} onCheckedChange={setEnableAppDownload} />
              </div>

              {enableAppDownload && (
                <>
                  <Separator />

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="app-store-link">App Store Link</Label>
                        <Input
                          id="app-store-link"
                          value={appStoreLink}
                          onChange={(e) => setAppStoreLink(e.target.value)}
                          placeholder="https://apps.apple.com/app/your-app"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="play-store-link">Play Store Link</Label>
                        <Input
                          id="play-store-link"
                          value={playStoreLink}
                          onChange={(e) => setPlayStoreLink(e.target.value)}
                          placeholder="https://play.google.com/store/apps/details?id=com.yourapp"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="app-download-delay">Display Delay (ms)</Label>
                      <Input
                        id="app-download-delay"
                        type="number"
                        value={appDownloadDelay}
                        onChange={(e) => setAppDownloadDelay(e.target.value)}
                        min="0"
                        max="10000"
                      />
                      <p className="text-xs text-muted-foreground">
                        Time in milliseconds before showing the banner after page load
                      </p>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} className="ml-auto">
                <Save className="mr-2 h-4 w-4" /> Save Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Authentication Settings */}
        <TabsContent value="auth">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" /> Authentication System
              </CardTitle>
              <CardDescription>Configure authentication settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enable-auth">Enable Authentication</Label>
                  <p className="text-sm text-muted-foreground">Allow users to create accounts and log in</p>
                </div>
                <Switch id="enable-auth" checked={enableAuth} onCheckedChange={setEnableAuth} />
              </div>

              {enableAuth && (
                <>
                  <Separator />

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="auth-provider">Authentication Provider</Label>
                      <Select value={authProvider} onValueChange={setAuthProvider}>
                        <SelectTrigger id="auth-provider">
                          <SelectValue placeholder="Select provider" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="firebase">Firebase Authentication</SelectItem>
                          <SelectItem value="auth0">Auth0</SelectItem>
                          <SelectItem value="cognito">AWS Cognito</SelectItem>
                          <SelectItem value="custom">Custom Authentication</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="require-email-verification">Require Email Verification</Label>
                        <p className="text-sm text-muted-foreground">
                          Users must verify their email before accessing their account
                        </p>
                      </div>
                      <Switch
                        id="require-email-verification"
                        checked={requireEmailVerification}
                        onCheckedChange={setRequireEmailVerification}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Social Login Providers</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                          <Switch id="google-login" defaultChecked />
                          <Label htmlFor="google-login">Google</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="facebook-login" defaultChecked />
                          <Label htmlFor="facebook-login">Facebook</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="apple-login" defaultChecked />
                          <Label htmlFor="apple-login">Apple</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="twitter-login" />
                          <Label htmlFor="twitter-login">Twitter</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} className="ml-auto">
                <Save className="mr-2 h-4 w-4" /> Save Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* SEO Settings */}
        <TabsContent value="seo">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Search className="mr-2 h-5 w-5" /> SEO Tools
              </CardTitle>
              <CardDescription>Configure search engine optimization settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enable-seo">Enable SEO Features</Label>
                  <p className="text-sm text-muted-foreground">Enable search engine optimization features</p>
                </div>
                <Switch id="enable-seo" checked={enableSEO} onCheckedChange={setEnableSEO} />
              </div>

              {enableSEO && (
                <>
                  <Separator />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="generate-sitemap">Generate Sitemap</Label>
                        <p className="text-sm text-muted-foreground">Automatically generate and update sitemap.xml</p>
                      </div>
                      <Switch id="generate-sitemap" checked={generateSitemap} onCheckedChange={setGenerateSitemap} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="enable-structured-data">Structured Data</Label>
                        <p className="text-sm text-muted-foreground">
                          Add schema.org structured data for rich search results
                        </p>
                      </div>
                      <Switch
                        id="enable-structured-data"
                        checked={enableStructuredData}
                        onCheckedChange={setEnableStructuredData}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="enable-canonical-urls">Canonical URLs</Label>
                        <p className="text-sm text-muted-foreground">
                          Add canonical URL tags to prevent duplicate content issues
                        </p>
                      </div>
                      <Switch
                        id="enable-canonical-urls"
                        checked={enableCanonicalUrls}
                        onCheckedChange={setEnableCanonicalUrls}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="default-meta-description">Default Meta Description</Label>
                      <Textarea
                        id="default-meta-description"
                        placeholder="Enter a default meta description for pages without one"
                        defaultValue="RoadRescue provides 24/7 roadside assistance services including flat tire changes, battery jump starts, fuel delivery, and towing. Get help when you need it most."
                        rows={3}
                      />
                      <p className="text-xs text-muted-foreground">
                        Used when a page doesn't have a specific meta description
                      </p>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} className="ml-auto">
                <Save className="mr-2 h-4 w-4" /> Save Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Marketing Settings */}
        <TabsContent value="marketing">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Megaphone className="mr-2 h-5 w-5" /> Marketing Tools
              </CardTitle>
              <CardDescription>Configure marketing features and promotions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enable-newsletter">Newsletter Signup</Label>
                  <p className="text-sm text-muted-foreground">Show newsletter signup forms throughout the site</p>
                </div>
                <Switch id="enable-newsletter" checked={enableNewsletter} onCheckedChange={setEnableNewsletter} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enable-referrals">Referral Program</Label>
                  <p className="text-sm text-muted-foreground">Enable the refer-a-friend program</p>
                </div>
                <Switch id="enable-referrals" checked={enableReferrals} onCheckedChange={setEnableReferrals} />
              </div>

              {enableReferrals && (
                <div className="space-y-2 pl-6 border-l-2 border-muted">
                  <Label htmlFor="referral-discount">Referral Discount (%)</Label>
                  <Input
                    id="referral-discount"
                    type="number"
                    value={referralDiscount}
                    onChange={(e) => setReferralDiscount(e.target.value)}
                    min="5"
                    max="50"
                  />
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enable-promos">Promotional Banners</Label>
                  <p className="text-sm text-muted-foreground">Show promotional banners for special offers</p>
                </div>
                <Switch id="enable-promos" checked={enablePromos} onCheckedChange={setEnablePromos} />
              </div>

              {enablePromos && (
                <div className="space-y-4 pl-6 border-l-2 border-muted">
                  <div className="space-y-2">
                    <Label htmlFor="current-promo">Current Promotion</Label>
                    <Select defaultValue="summer">
                      <SelectTrigger id="current-promo">
                        <SelectValue placeholder="Select promotion" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="summer">Summer Special</SelectItem>
                        <SelectItem value="new-user">New User Discount</SelectItem>
                        <SelectItem value="holiday">Holiday Offer</SelectItem>
                        <SelectItem value="none">No Active Promotion</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} className="ml-auto">
                <Save className="mr-2 h-4 w-4" /> Save Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Geolocation Settings */}
        <TabsContent value="geolocation">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="mr-2 h-5 w-5" /> Geolocation Services
              </CardTitle>
              <CardDescription>Configure location tracking and geolocation settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enable-geolocation">Enable Geolocation</Label>
                  <p className="text-sm text-muted-foreground">Use browser geolocation to track user location</p>
                </div>
                <Switch id="enable-geolocation" checked={enableGeolocation} onCheckedChange={setEnableGeolocation} />
              </div>

              {enableGeolocation && (
                <>
                  <Separator />

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="geolocation-fallback">Fallback Method</Label>
                      <Select value={geolocationFallback} onValueChange={setGeolocationFallback}>
                        <SelectTrigger id="geolocation-fallback">
                          <SelectValue placeholder="Select fallback method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ip">IP-based Geolocation</SelectItem>
                          <SelectItem value="manual">Manual Location Entry</SelectItem>
                          <SelectItem value="default">Default Location</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">
                        Method to use when browser geolocation fails or is denied
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="geolocation-timeout">Timeout (ms)</Label>
                      <Input
                        id="geolocation-timeout"
                        type="number"
                        value={geolocationTimeout}
                        onChange={(e) => setGeolocationTimeout(e.target.value)}
                        min="1000"
                        max="30000"
                      />
                      <p className="text-xs text-muted-foreground">Maximum time to wait for geolocation response</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="default-location">Default Location</Label>
                      <Select defaultValue="new-york">
                        <SelectTrigger id="default-location">
                          <SelectValue placeholder="Select default location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new-york">New York</SelectItem>
                          <SelectItem value="los-angeles">Los Angeles</SelectItem>
                          <SelectItem value="chicago">Chicago</SelectItem>
                          <SelectItem value="houston">Houston</SelectItem>
                          <SelectItem value="phoenix">Phoenix</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">Location to use when geolocation is unavailable</p>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} className="ml-auto">
                <Save className="mr-2 h-4 w-4" /> Save Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}
