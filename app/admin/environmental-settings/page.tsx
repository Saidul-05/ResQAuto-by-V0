"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import {
  Cloud,
  Signal,
  MapPin,
  Settings,
  Save,
  RotateCcw,
  AlertTriangle,
  TrendingUp,
  Activity,
  Thermometer,
  Wind,
  Sun,
  CloudRain,
  Snowflake,
} from "lucide-react"

import { EnvironmentalTransferTester } from "@/components/emergency/environmental-transfer-tester"

interface WeatherFactorSettings {
  enabled: boolean
  impactMultiplier: number
  stressMultiplier: number
  timeMultiplier: number
  transferPenalty: number
}

interface CoverageFactorSettings {
  enabled: boolean
  signalThresholds: {
    excellent: number
    good: number
    fair: number
    poor: number
  }
  impactMultipliers: {
    excellent: number
    good: number
    fair: number
    poor: number
    none: number
  }
}

interface LocationFactorSettings {
  enabled: boolean
  regionMultipliers: {
    urban: number
    suburban: number
    rural: number
    highway: number
    remote: number
    wilderness: number
  }
  infrastructureImpact: boolean
  emergencyServiceDistance: boolean
}

interface TimeFactorSettings {
  enabled: boolean
  timeMultipliers: {
    dawn: number
    morning: number
    afternoon: number
    evening: number
    night: number
    late_night: number
  }
}

interface EnvironmentalSettings {
  weather: Record<string, WeatherFactorSettings>
  coverage: CoverageFactorSettings
  location: LocationFactorSettings
  time: TimeFactorSettings
  globalSettings: {
    enableEnvironmentalFactors: boolean
    contextSimilarityWeight: number
    transferDecayRate: number
    adaptiveLearning: boolean
  }
}

export default function EnvironmentalSettingsPage() {
  const [settings, setSettings] = useState<EnvironmentalSettings>({
    weather: {
      clear: { enabled: true, impactMultiplier: 1.0, stressMultiplier: 1.0, timeMultiplier: 1.0, transferPenalty: 0.0 },
      cloudy: { enabled: true, impactMultiplier: 1.1, stressMultiplier: 1.05, timeMultiplier: 1.1, transferPenalty: 0.05 },
      rain: { enabled: true, impactMultiplier: 1.2, stressMultiplier: 1.1, timeMultiplier: 1.2, transferPenalty: 0.1 },
      snow: { enabled: true, impactMultiplier: 1.3, stressMultiplier: 1.2, timeMultiplier: 1.4, transferPenalty: 0.15 },
      fog: { enabled: true, impactMultiplier: 1.25, stressMultiplier: 1.15, timeMultiplier: 1.3, transferPenalty: 0.12 },
      storm: { enabled: true, impactMultiplier: 1.5, stressMultiplier: 1.5, timeMultiplier: 1.8, transferPenalty: 0.25 },
      extreme_heat: { enabled: true, impactMultiplier: 1.3, stressMultiplier: 1.3, timeMultiplier: 1.2, transferPenalty: 0.18 },
      extreme_cold: { enabled: true, impactMultiplier: 1.4, stressMultiplier: 1.4, timeMultiplier: 1.5, transferPenalty: 0.22 },
    },
    coverage: {
      enabled: true,
      signalThresholds: { excellent: -60, good: -70, fair: -85, poor: -100 },
      impactMultipliers: { excellent: 1.0, good: 1.1, fair: 1.3, poor: 1.8, none: 3.0 },
    },
    location: {
      enabled: true,
      regionMultipliers: { urban: 1.0, suburban: 1.05, rural: 1.15, highway: 1.1, remote: 1.3, wilderness: 1.4 },
      infrastructureImpact: true,
      emergencyServiceDistance: true,
    },
    time: {
      enabled: true,
      timeMultipliers: { dawn: 1.1, morning: 1.0, afternoon: 1.0, evening: 1.1, night: 1.2, late_night: 1.3 },
    },
    globalSettings: {
      enableEnvironmentalFactors: true,
      contextSimilarityWeight: 0.4,
      transferDecayRate: 0.1,
      adaptiveLearning: true,
    },
  })

  const [hasChanges, setHasChanges] = useState(false)

  const updateWeatherSetting = (weather: string, field: keyof WeatherFactorSettings, value: any) => {
    setSettings(prev => ({
      ...prev,
      weather: {
        ...prev.weather,
        [weather]: {
          ...prev.weather[weather],
          [field]: value,
        },
      },
    }))
    setHasChanges(true)
  }

  const updateCoverageSetting = (field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      coverage: {
        ...prev.coverage,
        [field]: value,
      },
    }))
    setHasChanges(true)
  }

  const updateLocationSetting = (field: keyof LocationFactorSettings, value: any) => {
    setSettings(prev => ({
      ...prev,
      location: {
        ...prev.location,
        [field]: value,
      },
    }))
    setHasChanges(true)
  }

  const updateTimeSetting = (field: keyof TimeFactorSettings, value: any) => {
    setSettings(prev => ({
      ...prev,
      time: {
        ...prev.time,
        [field]: value,
      },
    }))
    setHasChanges(true)
  }

  const updateGlobalSetting = (field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      globalSettings: {
        ...prev.globalSettings,
        [field]: value,
      },
    }))
    setHasChanges(true)
  }

  const saveSettings = () => {
    // In a real implementation, this would save to a backend
    localStorage.setItem('environmentalSettings', JSON.stringify(settings))
    setHasChanges(false)
    toast({
      title: "✅ Settings Saved",
      description: "Environmental factor settings have been updated successfully",
    })
  }

  const resetToDefaults = () => {
    // Reset to default values (current values are already defaults)
    setHasChanges(false)
    toast({
      title: "🔄 Settings Reset",
      description: "Environmental factor settings have been reset to defaults",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Environmental Settings</h1>
          <p className="text-muted-foreground">
            Configure how weather and coverage conditions affect AI transfer learning
          </p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={resetToDefaults} variant="outline" disabled={!hasChanges}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
          <Button onClick={saveSettings} disabled={!hasChanges}>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      {hasChanges && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="pt-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-orange-500" />
              <span className="text-sm text-orange-700">You have unsaved changes</span>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="global" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="global">Global</TabsTrigger>
          <TabsTrigger value="weather">Weather</TabsTrigger>
          <TabsTrigger value="coverage">Coverage</TabsTrigger>
          <TabsTrigger value="location">Location</TabsTrigger>
          <TabsTrigger value="testing">Testing</TabsTrigger>
        </TabsList>

        <TabsContent value="global" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>Global Environmental Settings</span>
              </CardTitle>
              <CardDescription>Master controls for environmental factor integration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Enable Environmental Factors</Label>
                    <div className="text-sm text-muted-foreground">
                      Master switch for all environmental factor calculations
                    </div>
                  </div>
                  <Switch
                    checked={settings.globalSettings.enableEnvironmentalFactors}
                    onCheckedChange={(checked) => updateGlobalSetting('enableEnvironmentalFactors', checked)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Context Similarity Weight</Label>
                  <div className="flex items-center space-x-4">
                    <Slider
                      value={[settings.globalSettings.contextSimilarityWeight]}
                      onValueChange={([value]) => updateGlobalSetting('contextSimilarityWeight', value)}
                      min={0.1}
                      max={1.0}
                      step={0.1}
                      className="flex-1"
                      disabled={!settings.globalSettings.enableEnvironmentalFactors}
                    />
                    <span className="w-12 text-sm font-mono">
                      {settings.globalSettings.contextSimilarityWeight.toFixed(1)}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    How much environmental context similarity affects transfer efficiency
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Transfer Decay Rate</Label>
                  <div className="flex items-center space-x-4">
                    <Slider
                      value={[settings.globalSettings.transferDecayRate]}
                      onValueChange={([value]) => updateGlobalSetting('transferDecayRate', value)}
                      min={0.05}
                      max={0.5}
                      step={0.05}
                      className="flex-1"
                      disabled={!settings.globalSettings.enableEnvironmentalFactors}
                    />
                    <span className="w-12 text-sm font-mono">
                      {settings.globalSettings.transferDecayRate.toFixed(2)}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Rate at which transfer efficiency decreases over time
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Adaptive Learning</Label>
                    <div className="text-sm text-muted-foreground">
                      Allow the system to learn and adjust environmental factors automatically
                    </div>
                  </div>
                  <Switch
                    checked={settings.globalSettings.adaptiveLearning}
                    onCheckedChange={(checked) => updateGlobalSetting('adaptiveLearning', checked)}
                    disabled={!settings.globalSettings.enableEnvironmentalFactors}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
                <div className="space-y-2">
                  <h4 className="font-semibold text-green-600">Active Factors</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Weather:</span>
                      <Badge variant={settings.weather.clear.enabled ? "default" : "secondary"}>
                        {Object.values(settings.weather).filter(w => w.enabled).length}/8
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Coverage:</span>
                      <Badge variant={settings.coverage.enabled ? "default" : "secondary"}>
                        {settings.coverage.enabled ? "Enabled" : "Disabled"}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Location:</span>
                      <Badge variant={settings.location.enabled ? "default" : "secondary"}>
                        {settings.location.enabled ? "Enabled" : "Disabled"}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Time:</span>
                      <Badge variant={settings.time.enabled ? "default" : "secondary"}>
                        {settings.time.enabled ? "Enabled" : "Disabled"}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-blue-600">Impact Summary</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Max Weather Impact:</span>
                        <span className="font-medium">
                          {Math.max(...Object.values(settings.weather).map(w => w.impactMultiplier)).toFixed(1)}x
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Max Coverage Impact:</span>
                        <span className="font-medium">
                          {Math.max(...Object.values(settings.coverage.impactMultipliers)).toFixed(1)}x
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Max Location Impact:</span>
                        <span className="font-medium">
                          {Math.max(...Object.values(settings.location.regionMultipliers)).toFixed(1)}x
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Max Time Impact:</span>
                        <span className="font-medium">
                          {Math.max(...Object.values(settings.time.timeMultipliers)).toFixed(1)}x
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-orange-600">System Status</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center space-x-2">
                        <Activity className="h-3 w-3" />
                        <span>Environmental Processing</span>
                        <Badge variant={settings.globalSettings.enableEnvironmentalFactors ? "default" : "secondary"}>
                          {settings.globalSettings.enableEnvironmentalFactors ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-3 w-3" />
                        <span>Adaptive Learning</span>
                        <Badge variant={settings.globalSettings.adaptiveLearning ? "default" : "secondary"}>
                          {settings.globalSettings.adaptiveLearning ? "On" : "Off"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

        <TabsContent value="weather" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Cloud className="h-5 w-5" />
                <span>Weather Factor Settings</span>
              </CardTitle>
              <CardDescription>Configure how different weather conditions affect transfer learning</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {Object.entries(settings.weather).map(([weatherType, config]) => (
                  <div key={weatherType} className="p-4 border rounded-lg space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {weatherType === "clear" && <Sun className="h-4 w-4 text-yellow-500" />}
                        {weatherType === "cloudy" && <Cloud className="h-4 w-4 text-gray-500" />}
                        {weatherType === "rain" && <CloudRain className="h-4 w-4 text-blue-500" />}
                        {weatherType === "snow" && <Snowflake className="h-4 w-4 text-blue-300" />}
                        {weatherType === "fog" && <Cloud className="h-4 w-4 text-gray-400" />}
                        {weatherType === "storm" && <Wind className="h-4 w-4 text-purple-500" />}
                        {weatherType === "extreme_heat" && <Thermometer className="h-4 w-4 text-red-500" />}
                        {weatherType === "extreme_cold" && <Snowflake className="h-4 w-4 text-blue-600" />}
                        <h4 className="font-semibold capitalize">{weatherType.replace('_', ' ')}</h4>
                      </div>
                      <Switch
                        checked={config.enabled}
                        onCheckedChange={(checked) => updateWeatherSetting(weatherType, 'enabled', checked)}
                        disabled={!settings.globalSettings.enableEnvironmentalFactors}
                      />
                    </div>

                    {config.enabled && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="space-y-2">
                          <Label className="text-xs">Impact Multiplier</Label>
                          <div className="flex items-center space-x-2">
                            <Slider
                              value={[config.impactMultiplier]}
                              onValueChange={([value]) => updateWeatherSetting(weatherType, 'impactMultiplier', value)}
                              min={1.0}
                              max={2.0}
                              step={0.1}
                              className="flex-1"
                            />
                            <span className="w-8 text-xs font-mono">{config.impactMultiplier.toFixed(1)}</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-xs">Stress Multiplier</Label>
                          <div className="flex items-center space-x-2">
                            <Slider
                              value={[config.stressMultiplier]}
                              onValueChange={([value]) => updateWeatherSetting(weatherType, 'stressMultiplier', value)}
                              min={1.0}
                              max={2.0}
                              step={0.05}
                              className="flex-1"
                            />
                            <span className="w-8 text-xs font-mono">{config.stressMultiplier.toFixed(1)}</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-xs">Time Multiplier</Label>
                          <div className="flex items-center space-x-2">
                            <Slider
                              value={[config.timeMultiplier]}
                              onValueChange={([value]) => updateWeatherSetting(weatherType, 'timeMultiplier', value)}
                              min={1.0}
                              max={3.0}
                              step={0.1}
                              className="flex-1"
                            />
                            <span className="w-8 text-xs font-mono">{config.timeMultiplier.toFixed(1)}</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-xs">Transfer Penalty</Label>
                          <div className="flex items-center space-x-2">
                            <Slider
                              value={[config.transferPenalty]}
                              onValueChange={([value]) => updateWeatherSetting(weatherType, 'transferPenalty', value)}
                              min={0.0}
                              max={0.5}
                              step={0.05}
                              className="flex-1"
                            />
                            <span className="w-8 text-xs font-mono">{config.transferPenalty.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="coverage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Signal className="h-5 w-5" />
                <span>Coverage Factor Settings</span>
              </CardTitle>
              <CardDescription>Configure how network coverage affects transfer learning</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Enable Coverage Factors</Label>
                  <div className="text-sm text-muted-foreground">
                    Factor in network signal strength and quality
                  </div>
                </div>
                <Switch
                  checked={settings.coverage.enabled}
                  onCheckedChange={(checked) => updateCoverageSetting('enabled', checked)}
                  disabled={!settings.globalSettings.enableEnvironmentalFactors}
                />
              </div>

              {settings.coverage.enabled && (
                <>
                  <div className="space-y-4">
                    <h4 className="font-semibold">Signal Strength Thresholds (dBm)</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {Object.entries(settings.coverage.signalThresholds).map(([level, threshold]) => (
                        <div key={level} className="space-y-2">
                          <Label className="text-sm capitalize">{level}</Label>
                          <Input
                            type="number"
                            value={threshold}
                            onChange={(e) => updateCoverageSetting('signalThresholds', {
                              ...settings.coverage.signalThresholds,
                              [level]: Number.parseInt(e.target.value)
                            })}
                            className="text-sm"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold">Impact Multipliers</h4>
                    <div className="grid gap-4">
                      {Object.entries(settings.coverage.impactMultipliers).map(([level, multiplier]) => (
                        <div key={level} className="flex items-center space-x-4">
                          <div className="w-20">
                            <Label className="text-sm capitalize">{level}</Label>
                          </div>
                          <Slider
                            value={[multiplier]}
                            onValueChange={([value]) => updateCoverageSetting('impactMultipliers', {
                              ...settings.coverage.impactMultipliers,
                              [level]: value
                            })}
                            min={1.0}
                            max={5.0}
                            step={0.1}
                            className="flex-1"
                          />
                          <span className="w-12 text-sm font-mono">{multiplier.toFixed(1)}x</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="location" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span>Location Factor Settings</span>
              </CardTitle>
              <CardDescription>Configure how geographic location affects transfer learning</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Enable Location Factors</Label>
                  <div className="text-sm text-muted-foreground">
                    Factor in geographic region and infrastructure
                  </div>
                </div>
                <Switch
                  checked={settings.location.enabled}
                  onCheckedChange={(checked) => updateLocationSetting('enabled', checked)}
                  disabled={!settings.globalSettings.enableEnvironmentalFactors}
                />
              </div>

              {settings.location.enabled && (
                <>
                  <div className="space-y-4">
                    <h4 className="font-semibold">Region Multipliers</h4>
                    <div className="grid gap-4">
                      {Object.entries(settings.location.regionMultipliers).map(([region, multiplier]) => (
                        <div key={region} className="flex items-center space-x-4">
                          <div className="w-20">
                            <Label className="text-sm capitalize">{region}</Label>
                          </div>
                          <Slider
                            value={[multiplier]}
                            onValueChange={([value]) => updateLocationSetting('regionMultipliers', {
                              ...settings.location.regionMultipliers,
                              [region]: value
                            })}
                            min={1.0}
                            max={2.0}
                            step={0.05}
                            className="flex-1"
                          />
                          <span className="w-12 text-sm font-mono">{multiplier.toFixed(2)}x</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold">Additional Factors</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label>Infrastructure Impact</Label>
                          <div className="text-sm text-muted-foreground">
                            Consider local infrastructure quality
                          </div>
                        </div>
                        <Switch
                          checked={settings.location.infrastructureImpact}
                          onCheckedChange={(checked) => updateLocationSetting('infrastructureImpact', checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label>Emergency Service Distance</Label>
                          <div className="text-sm text-muted-foreground">
                            Factor in distance to emergency services
                          </div>
                        </div>
                        <Switch
                          checked={settings.location.emergencyServiceDistance}
                          onCheckedChange={(checked) => updateLocationSetting('emergencyServiceDistance', checked)}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="testing" className="space-y-4">
          <EnvironmentalTransferTester />
        </TabsContent>
      </Tabs>
    </div>
  )\
}
