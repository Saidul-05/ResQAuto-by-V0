"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, Map, Save } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function MapSettingsPage() {
  const { toast } = useToast()

  // Map provider toggles
  const [useGoogleMaps, setUseGoogleMaps] = useState(true)
  const [useLeaflet, setUseLeaflet] = useState(false)

  // API keys
  const [googleMapsApiKey, setGoogleMapsApiKey] = useState("")

  const handleMapToggle = (type: "google" | "leaflet", checked: boolean) => {
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
      title: "Settings saved",
      description: "Map provider configuration has been updated successfully.",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Map Settings</h1>
        <p className="text-muted-foreground">Configure your map provider and API keys</p>
      </div>

      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Important</AlertTitle>
        <AlertDescription>
          Changing your map provider may affect how location data is displayed in your application. Make sure to test
          thoroughly after making changes.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Map className="mr-2 h-5 w-5" /> Google Maps
          </CardTitle>
          <CardDescription>Configure Google Maps as your map provider</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="use-google-maps">Use Google Maps</Label>
              <p className="text-sm text-muted-foreground">Use Google Maps as your primary map provider</p>
            </div>
            <Switch
              id="use-google-maps"
              checked={useGoogleMaps}
              onCheckedChange={(checked) => handleMapToggle("google", checked)}
            />
          </div>

          {useGoogleMaps && (
            <div className="space-y-4 border rounded-md p-4">
              <div className="space-y-2">
                <Label htmlFor="google-maps-api-key">Google Maps API Key</Label>
                <Input
                  id="google-maps-api-key"
                  value={googleMapsApiKey}
                  onChange={(e) => setGoogleMapsApiKey(e.target.value)}
                  placeholder="Your Google Maps API Key"
                />
                <p className="text-xs text-muted-foreground">
                  You can get your API key from the{" "}
                  <a
                    href="https://console.cloud.google.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Google Cloud Console
                  </a>
                </p>
              </div>

              <div className="space-y-2">
                <Label>Required APIs</Label>
                <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                  <li>Maps JavaScript API</li>
                  <li>Geocoding API</li>
                  <li>Places API</li>
                  <li>Directions API</li>
                </ul>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Map className="mr-2 h-5 w-5" /> Leaflet
          </CardTitle>
          <CardDescription>Configure Leaflet as your map provider</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="use-leaflet">Use Leaflet</Label>
              <p className="text-sm text-muted-foreground">Use Leaflet as your primary map provider</p>
            </div>
            <Switch
              id="use-leaflet"
              checked={useLeaflet}
              onCheckedChange={(checked) => handleMapToggle("leaflet", checked)}
            />
          </div>

          {useLeaflet && (
            <div className="space-y-4 border rounded-md p-4">
              <div className="space-y-2">
                <Label>Tile Provider</Label>
                <p className="text-sm text-muted-foreground">
                  Leaflet uses OpenStreetMap tiles by default, which don't require an API key. However, if you want to
                  use a different tile provider, you may need to configure additional settings.
                </p>
              </div>

              <div className="space-y-2">
                <Label>Additional Configuration</Label>
                <p className="text-sm text-muted-foreground">
                  For more advanced configuration options, please refer to the{" "}
                  <a
                    href="https://leafletjs.com/reference.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Leaflet documentation
                  </a>
                  .
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Button onClick={handleSaveSettings} className="w-full">
        <Save className="mr-2 h-4 w-4" /> Save Map Settings
      </Button>
    </div>
  )
}
