"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Phone, MapPin, AlertTriangle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { EnhancedSOSButton } from "@/components/emergency/enhanced-sos-button"
import { EmergencyContacts } from "@/components/emergency/emergency-contacts"
import { AccidentReport } from "@/components/emergency/accident-report"
import { EnhancedLocationTracker } from "@/components/maps/enhanced-location-tracker"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Default locations for major US cities
const DEFAULT_LOCATIONS = [
  { name: "New York", lat: 40.7128, lng: -74.006 },
  { name: "Los Angeles", lat: 34.0522, lng: -118.2437 },
  { name: "Chicago", lat: 41.8781, lng: -87.6298 },
  { name: "Houston", lat: 29.7604, lng: -95.3698 },
  { name: "Phoenix", lat: 33.4484, lng: -112.074 },
]

export default function EmergencyPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [location, setLocation] = useState("")
  const [isLocating, setIsLocating] = useState(false)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number }>(DEFAULT_LOCATIONS[0])
  const [activeTab, setActiveTab] = useState("assistance")
  const [geolocationError, setGeolocationError] = useState<string | null>(null)
  const { toast } = useToast()

  // Use a default location instead of trying to get the user's location on page load
  // This avoids the geolocation permission issues
  useEffect(() => {
    setLocation("Please select your location")
  }, [])

  const handleLocationUpdate = (location: { lat: number; lng: number }) => {
    setUserLocation(location)
    setLocation("Location updated")
    setGeolocationError(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)

      toast({
        title: "Help is on the way!",
        description: "A technician has been dispatched to your location. ETA: 15 minutes.",
      })
    }, 2000)
  }

  // Handle manual location selection
  const handleLocationSelect = (cityIndex: number) => {
    const selectedLocation = DEFAULT_LOCATIONS[cityIndex]
    setUserLocation(selectedLocation)
    setLocation(`Selected: ${selectedLocation.name}`)
    setGeolocationError(null)

    toast({
      title: "Location updated",
      description: `Your location has been set to ${selectedLocation.name}.`,
    })
  }

  return (
    <div className="container max-w-5xl py-6 sm:py-12 px-4 sm:px-6">
      <div className="text-center mb-6 sm:mb-8">
        <Badge variant="destructive" className="mb-2">
          Emergency Assistance
        </Badge>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter mb-2">Need Help Now?</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Request immediate roadside assistance or report an emergency. Our technicians are available 24/7.
        </p>
      </div>

      <div className="grid gap-4 sm:gap-8 grid-cols-1 lg:grid-cols-3 mb-6 sm:mb-8">
        <Card className="bg-destructive text-destructive-foreground">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg sm:text-xl">
              <Phone className="mr-2 h-5 w-5" /> Call for Immediate Help
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl sm:text-2xl font-bold">1-800-ROADHELP</p>
            <p className="text-xs sm:text-sm mt-2">Our support team is available 24/7</p>
          </CardContent>
          <CardFooter>
            <Button variant="destructive" className="w-full bg-white text-destructive hover:bg-white/90" asChild>
              <a href="tel:18007623404">Call Now</a>
            </Button>
          </CardFooter>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader className="pb-2 sm:pb-4">
            <CardTitle className="text-lg sm:text-xl">Emergency Services</CardTitle>
            <CardDescription>
              Get immediate help for roadside emergencies, accidents, or medical situations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EnhancedSOSButton />

            <div className="mt-4 sm:mt-6">
              <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="overflow-x-auto pb-2 -mx-1 px-1">
                  <TabsList className="flex w-full min-w-max">
                    <TabsTrigger value="assistance" className="flex-1 text-xs sm:text-sm py-1.5 px-2 sm:px-4">
                      Roadside Help
                    </TabsTrigger>
                    <TabsTrigger value="accident" className="flex-1 text-xs sm:text-sm py-1.5 px-2 sm:px-4">
                      Report Accident
                    </TabsTrigger>
                    <TabsTrigger value="contacts" className="flex-1 text-xs sm:text-sm py-1.5 px-2 sm:px-4">
                      Emergency Contacts
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="assistance" className="mt-4">
                  {geolocationError && (
                    <Alert variant="warning" className="mb-4">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle>Location Notice</AlertTitle>
                      <AlertDescription>{geolocationError}</AlertDescription>
                    </Alert>
                  )}

                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                      <Label htmlFor="location">Your Current Location</Label>
                      <div className="space-y-4">
                        <EnhancedLocationTracker
                          serviceId="emergency"
                          initialLocation={userLocation}
                          onLocationUpdate={handleLocationUpdate}
                        />

                        {/* City selection buttons */}
                        <div className="border rounded-md p-2 sm:p-3 bg-muted/30">
                          <p className="text-xs sm:text-sm font-medium mb-2">Or select a major city:</p>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 sm:gap-2">
                            {DEFAULT_LOCATIONS.map((city, index) => (
                              <Button
                                key={city.name}
                                type="button"
                                variant="outline"
                                size="sm"
                                className="text-xs sm:text-sm py-1 px-2 h-auto"
                                onClick={() => handleLocationSelect(index)}
                              >
                                <MapPin className="mr-1 h-3 w-3" />
                                {city.name}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Your Name</Label>
                        <Input id="name" placeholder="Enter your full name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" placeholder="Enter your phone number" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="service">Service Needed</Label>
                      <Select>
                        <SelectTrigger id="service">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="flat-tire">Flat Tire Change</SelectItem>
                          <SelectItem value="battery">Battery Jump Start</SelectItem>
                          <SelectItem value="fuel">Fuel Delivery</SelectItem>
                          <SelectItem value="lockout">Lockout Assistance</SelectItem>
                          <SelectItem value="towing">Towing</SelectItem>
                          <SelectItem value="winching">Winching</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="vehicle-make">Vehicle Make</Label>
                        <Input id="vehicle-make" placeholder="e.g., Toyota" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="vehicle-model">Vehicle Model</Label>
                        <Input id="vehicle-model" placeholder="e.g., Camry" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Describe Your Situation</Label>
                      <Textarea
                        id="description"
                        placeholder="Please provide details about your emergency situation"
                        rows={3}
                      />
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Request Assistance Now"
                      )}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="accident" className="mt-4">
                  <AccidentReport />
                </TabsContent>

                <TabsContent value="contacts" className="mt-4">
                  <EmergencyContacts />
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2 sm:pb-4">
          <CardTitle className="text-lg sm:text-xl">What to Expect</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal pl-4 sm:pl-5 space-y-1 sm:space-y-2 text-sm sm:text-base">
            <li>After submitting your request, you'll receive a confirmation via text message.</li>
            <li>A technician will be dispatched to your location with an estimated time of arrival.</li>
            <li>You'll receive real-time updates on your technician's location and ETA.</li>
            <li>
              The technician will resolve your issue on-site if possible, or arrange for towing to a nearby repair
              facility.
            </li>
            <li>After the service is complete, you'll receive a digital receipt and service summary.</li>
          </ol>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-between gap-4">
          <p className="text-xs sm:text-sm text-muted-foreground">
            If you have a membership, please ensure you're logged in to receive your benefits.
          </p>
          <Button variant="outline" asChild className="sm:w-auto w-full">
            <a href="/login">Login to Account</a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
