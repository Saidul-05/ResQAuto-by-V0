"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EnhancedSOSButton } from "@/components/emergency/enhanced-sos-button"
import { EnhancedLocationTracker } from "@/components/maps/enhanced-location-tracker"
import { EmergencyStatusCard } from "@/components/emergency/emergency-status-card"
import { EmergencyContacts } from "@/components/emergency/emergency-contacts"
import { AccidentReport } from "@/components/emergency/accident-report"
import { AlertTriangle, Phone, Clock, MapPin, Shield, Car } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"
import { getLocation, DEFAULT_LOCATIONS } from "@/lib/geolocation-service"

export default function EmergencyDashboardPage() {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number }>(DEFAULT_LOCATIONS[0]) // Default to NYC
  const [activeTab, setActiveTab] = useState("overview")
  const [locationError, setLocationError] = useState<string | null>(null)
  const [isLoadingLocation, setIsLoadingLocation] = useState(true)
  const { toast } = useToast()

  // Use our new geolocation service to get the user's location
  useEffect(() => {
    const fetchLocation = async () => {
      setIsLoadingLocation(true)

      try {
        const result = await getLocation({
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        })

        if (result.success && result.location) {
          setUserLocation(result.location)

          if (result.error) {
            // This is a "soft" error - we got a location but with a warning
            setLocationError(result.error)
            toast({
              title: "Location approximated",
              description: result.error,
              variant: "warning",
            })
          } else {
            setLocationError(null)
          }
        } else if (result.error) {
          setLocationError(result.error)
          toast({
            title: "Location error",
            description: result.error,
            variant: "destructive",
          })
        }
      } catch (error) {
        console.error("Error in location fetching:", error)
        setLocationError("An unexpected error occurred while getting your location")
        toast({
          title: "Location error",
          description: "Unable to determine your location. Using default location.",
          variant: "destructive",
        })
      } finally {
        setIsLoadingLocation(false)
      }
    }

    fetchLocation()
  }, [toast])

  const handleLocationUpdate = (location: { lat: number; lng: number }) => {
    setUserLocation(location)
    setLocationError(null)

    toast({
      title: "Location updated",
      description: "Your location has been updated successfully.",
    })
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Emergency Dashboard</h1>
          <p className="text-muted-foreground">
            Get immediate help for roadside emergencies, accidents, or medical situations
          </p>
          {locationError && (
            <p className="text-sm text-amber-500 mt-1 flex items-center">
              <AlertTriangle className="h-4 w-4 mr-1" />
              {locationError}
            </p>
          )}
        </div>
        <Button variant="destructive" size="lg" asChild>
          <a href="tel:18007623404">
            <Phone className="mr-2 h-4 w-4" />
            Call Emergency Hotline
          </a>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <div className="md:col-span-2">
          <EnhancedSOSButton />
        </div>

        <Card className="bg-destructive text-destructive-foreground">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Phone className="mr-2 h-5 w-5" /> Emergency Contacts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Emergency Services:</span>
                <a href="tel:911" className="font-bold hover:underline">
                  911
                </a>
              </div>
              <div className="flex justify-between items-center">
                <span>RoadRescue Hotline:</span>
                <a href="tel:18007623404" className="font-bold hover:underline">
                  1-800-ROADHELP
                </a>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="destructive" className="w-full bg-white text-destructive hover:bg-white/90" asChild>
              <Link href="#contacts" onClick={() => setActiveTab("contacts")}>
                Manage Emergency Contacts
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="location">Location</TabsTrigger>
          <TabsTrigger value="contacts" id="contacts">
            Emergency Contacts
          </TabsTrigger>
          <TabsTrigger value="report">Report Accident</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <EmergencyStatusCard
              status="dispatched"
              serviceType="Flat Tire Assistance"
              requestTime="Today, 2:30 PM"
              estimatedArrival="15 minutes"
              technician={{
                name: "John Smith",
                phone: "+15551234567",
                image: "/placeholder.svg?height=40&width=40",
                rating: 4.8,
              }}
              location="Current Location"
            />

            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-primary mr-2" />
                    <span>Average Response Time</span>
                  </div>
                  <span className="font-bold">15 min</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-primary mr-2" />
                    <span>Service Coverage</span>
                  </div>
                  <span className="font-bold">Nationwide</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 text-primary mr-2" />
                    <span>Membership Status</span>
                  </div>
                  <span className="font-bold text-primary">Premium</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Car className="h-5 w-5 text-primary mr-2" />
                    <span>Registered Vehicles</span>
                  </div>
                  <span className="font-bold">3</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Emergency Assistance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start justify-between border-b pb-4">
                  <div>
                    <p className="font-medium">Battery Jump Start</p>
                    <p className="text-sm text-muted-foreground">July 15, 2023 - 10:30 AM</p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/service-history/123">View Details</Link>
                  </Button>
                </div>

                <div className="flex items-start justify-between border-b pb-4">
                  <div>
                    <p className="font-medium">Flat Tire Change</p>
                    <p className="text-sm text-muted-foreground">June 28, 2023 - 3:15 PM</p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/service-history/122">View Details</Link>
                  </Button>
                </div>

                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium">Towing Service</p>
                    <p className="text-sm text-muted-foreground">June 10, 2023 - 8:45 PM</p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/service-history/121">View Details</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/service-history">View All History</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="location">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <EnhancedLocationTracker
                serviceId="emergency-dashboard"
                initialLocation={userLocation}
                onLocationUpdate={handleLocationUpdate}
              />
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Nearby Services</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Car className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Quick Fix Auto</p>
                      <p className="text-sm text-muted-foreground">1.2 miles away</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Car className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">City Towing Services</p>
                      <p className="text-sm text-muted-foreground">2.5 miles away</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Car className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">AAA Service Center</p>
                      <p className="text-sm text-muted-foreground">3.8 miles away</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Share Location</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Share your current location with emergency contacts or service providers
                  </p>
                  <Button className="w-full">Share My Location</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="contacts">
          <EmergencyContacts />
        </TabsContent>

        <TabsContent value="report">
          <AccidentReport />
        </TabsContent>
      </Tabs>
    </div>
  )
}
