"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Loader2, AlertTriangle, Phone, MapPin, Clock } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Default location (New York City) in case geolocation fails
const DEFAULT_LOCATION = { lat: 40.7128, lng: -74.006 }

export function EnhancedSOSButton() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [emergencyType, setEmergencyType] = useState<string>("accident")
  const [details, setDetails] = useState<string>("")
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState<"idle" | "processing" | "dispatched" | "arriving">("idle")
  const [eta, setEta] = useState<string | null>(null)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [locationError, setLocationError] = useState<string | null>(null)
  const { toast } = useToast()

  // Try to get user's location when the dialog opens
  useEffect(() => {
    if (isDialogOpen && !userLocation && !locationError) {
      getUserLocation()
    }
  }, [isDialogOpen, userLocation, locationError])

  // Simulate progress updates
  useEffect(() => {
    if (isSubmitting) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + 10
        })
      }, 200)

      return () => clearInterval(interval)
    }
  }, [isSubmitting])

  // Reset progress when dialog closes
  useEffect(() => {
    if (!isDialogOpen) {
      setProgress(0)
    }
  }, [isDialogOpen])

  // Update status based on alert being open
  useEffect(() => {
    if (isAlertOpen) {
      setStatus("processing")

      // Simulate status updates
      const processingTimeout = setTimeout(() => {
        setStatus("dispatched")
        setEta("15 minutes")

        toast({
          title: "Technician dispatched",
          description: "A technician has been dispatched to your location.",
        })

        const arrivingTimeout = setTimeout(() => {
          setStatus("arriving")
          setEta("5 minutes")

          toast({
            title: "Technician arriving soon",
            description: "Your technician is almost at your location.",
          })
        }, 10000)

        return () => clearTimeout(arrivingTimeout)
      }, 5000)

      return () => clearTimeout(processingTimeout)
    } else {
      setStatus("idle")
      setEta(null)
    }
  }, [isAlertOpen, toast])

  // Get user's location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      try {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            })
            setLocationError(null)
          },
          (error) => {
            console.error("Error getting location:", error)
            setLocationError(
              "Unable to get your precise location. Emergency services will use an approximate location.",
            )
            setUserLocation(DEFAULT_LOCATION)
          },
        )
      } catch (e) {
        console.error("Geolocation error:", e)
        setLocationError("Unable to access location services. Emergency services will use an approximate location.")
        setUserLocation(DEFAULT_LOCATION)
      }
    } else {
      setLocationError("Your browser doesn't support geolocation. Emergency services will use an approximate location.")
      setUserLocation(DEFAULT_LOCATION)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    // If we don't have a location yet, use the default
    if (!userLocation) {
      setUserLocation(DEFAULT_LOCATION)
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsDialogOpen(false)

    toast({
      title: "Emergency alert sent",
      description: "Help is on the way. Stay where you are.",
      variant: "destructive",
    })

    // Show confirmation alert
    setIsAlertOpen(true)
  }

  const getStatusBadge = () => {
    switch (status) {
      case "processing":
        return <Badge variant="secondary">Processing Request</Badge>
      case "dispatched":
        return <Badge variant="warning">Technician Dispatched</Badge>
      case "arriving":
        return <Badge variant="success">Technician Arriving</Badge>
      default:
        return null
    }
  }

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button
            variant="destructive"
            size="lg"
            className="w-full py-6 text-lg font-bold animate-pulse relative overflow-hidden"
          >
            <AlertTriangle className="mr-2 h-6 w-6" />
            SOS Emergency
            <span className="absolute inset-0 flex items-center justify-center">
              {isSubmitting && (
                <span className="absolute inset-0 bg-black/10">
                  <Progress value={progress} className="absolute bottom-0 left-0 right-0 h-1" />
                </span>
              )}
            </span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Emergency Assistance</DialogTitle>
            <DialogDescription>
              Please provide details about your emergency situation. Our team will be notified immediately.
            </DialogDescription>
          </DialogHeader>

          {locationError && (
            <Alert variant="warning" className="mt-2">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{locationError}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-4 py-4">
            <RadioGroup value={emergencyType} onValueChange={setEmergencyType} className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="accident" id="accident" />
                <Label htmlFor="accident">Car Accident</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medical" id="medical" />
                <Label htmlFor="medical">Medical Emergency</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="safety" id="safety" />
                <Label htmlFor="safety">Safety Concern</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other">Other Emergency</Label>
              </div>
            </RadioGroup>

            <div className="space-y-2">
              <Label htmlFor="details">Additional Details</Label>
              <Textarea
                id="details"
                placeholder="Please describe your emergency situation..."
                value={details}
                onChange={(e) => setDetails(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="sm:w-auto w-full">
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleSubmit} disabled={isSubmitting} className="sm:w-auto w-full">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending Alert...
                </>
              ) : (
                "Send Emergency Alert"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center justify-between">
              <span>Emergency Services Notified</span>
              {getStatusBadge()}
            </AlertDialogTitle>
            <AlertDialogDescription>
              <div className="space-y-4">
                <p>
                  Your emergency alert has been sent. Help is on the way. Please stay where you are if it's safe to do
                  so.
                </p>

                {eta && (
                  <div className="flex items-center text-sm font-medium">
                    <Clock className="mr-2 h-4 w-4 text-primary" />
                    <span>
                      Estimated arrival time: <span className="text-primary">{eta}</span>
                    </span>
                  </div>
                )}

                <div className="flex items-center text-sm font-medium">
                  <MapPin className="mr-2 h-4 w-4 text-primary" />
                  <span>Sharing your location with emergency services</span>
                </div>

                <div className="mt-4 p-4 bg-muted rounded-md">
                  <p className="font-medium">Emergency Contacts:</p>
                  <p className="flex items-center mt-2">
                    <Phone className="mr-2 h-4 w-4" />
                    <a href="tel:911" className="text-primary underline">
                      911
                    </a>{" "}
                    (Emergency Services)
                  </p>
                  <p className="flex items-center mt-2">
                    <Phone className="mr-2 h-4 w-4" />
                    <a href="tel:+18007623404" className="text-primary underline">
                      1-800-ROADHELP
                    </a>{" "}
                    (RoadRescue Support)
                  </p>
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Acknowledge</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
