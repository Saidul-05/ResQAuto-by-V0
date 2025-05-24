"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, AlertCircle, Info, Calendar } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"
import { LocationTracker } from "@/components/maps/location-tracker"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import type { ServiceType } from "@/types/service"

// Extended service types with more detailed options
const serviceTypes: { value: ServiceType; label: string; description: string }[] = [
  {
    value: "flat-tire",
    label: "Flat Tire",
    description: "Tire replacement with your spare or temporary repair",
  },
  {
    value: "battery-jump",
    label: "Battery Jump Start",
    description: "Jump start your vehicle's battery or replacement if needed",
  },
  {
    value: "towing",
    label: "Towing",
    description: "Transport your vehicle to a repair facility",
  },
  {
    value: "fuel-delivery",
    label: "Fuel Delivery",
    description: "Emergency fuel delivery when you run out",
  },
  {
    value: "lockout",
    label: "Lockout Assistance",
    description: "Help when you're locked out of your vehicle",
  },
  {
    value: "other",
    label: "Other",
    description: "Other roadside assistance services",
  },
]

// Vehicle makes for dropdown
const vehicleMakes = [
  "Acura",
  "Audi",
  "BMW",
  "Buick",
  "Cadillac",
  "Chevrolet",
  "Chrysler",
  "Dodge",
  "Ford",
  "GMC",
  "Honda",
  "Hyundai",
  "Infiniti",
  "Jaguar",
  "Jeep",
  "Kia",
  "Land Rover",
  "Lexus",
  "Lincoln",
  "Mazda",
  "Mercedes-Benz",
  "Mercury",
  "Mini",
  "Mitsubishi",
  "Nissan",
  "Pontiac",
  "Porsche",
  "Ram",
  "Saturn",
  "Subaru",
  "Tesla",
  "Toyota",
  "Volkswagen",
  "Volvo",
  "Other",
]

// Current year for the year dropdown
const currentYear = new Date().getFullYear()
const years = Array.from({ length: 30 }, (_, i) => currentYear - i)

// Urgency levels
const urgencyLevels = [
  { value: "critical", label: "Critical - Unsafe situation, need immediate help" },
  { value: "urgent", label: "Urgent - Stranded but safe, need help soon" },
  { value: "standard", label: "Standard - Need assistance but not urgent" },
  { value: "scheduled", label: "Scheduled - Plan for future assistance" },
]

export default function DetailedServiceRequestPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("service")
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [showScheduleOptions, setShowScheduleOptions] = useState(false)

  // Form data state
  const [formData, setFormData] = useState({
    serviceType: "" as ServiceType,
    description: "",
    make: "",
    model: "",
    year: "",
    color: "",
    licensePlate: "",
    vin: "",
    mileage: "",
    urgency: "standard",
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    additionalPassengers: "0",
    pets: false,
    specialNeeds: "",
    preferredTime: "",
    membershipNumber: "",
    agreeToTerms: false,
    scheduledDate: "",
    scheduledTime: "",
  })

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Show schedule options if urgency is "scheduled"
    if (name === "urgency" && value === "scheduled") {
      setShowScheduleOptions(true)
    } else if (name === "urgency") {
      setShowScheduleOptions(false)
    }
  }

  // Handle checkbox changes
  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  // Handle location update
  const handleLocationUpdate = (location: { lat: number; lng: number }) => {
    setUserLocation(location)
  }

  // Handle date selection
  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    if (selectedDate) {
      setFormData((prev) => ({
        ...prev,
        scheduledDate: format(selectedDate, "yyyy-MM-dd"),
      }))
    }
  }

  // Handle tab navigation
  const handleNext = () => {
    // Validate current tab
    if (activeTab === "service") {
      if (!formData.serviceType) {
        setError("Please select a service type")
        return
      }
      setActiveTab("vehicle")
    } else if (activeTab === "vehicle") {
      if (!formData.make || !formData.model) {
        setError("Please provide your vehicle make and model")
        return
      }
      setActiveTab("location")
    } else if (activeTab === "location") {
      if (!userLocation) {
        setError("Please provide your location")
        return
      }
      setActiveTab("contact")
    } else if (activeTab === "contact") {
      if (!formData.contactName || !formData.contactPhone) {
        setError("Please provide your contact information")
        return
      }
      if (!formData.agreeToTerms) {
        setError("Please agree to the terms and conditions")
        return
      }
      handleSubmit()
    }

    setError(null)
  }

  const handleBack = () => {
    if (activeTab === "vehicle") {
      setActiveTab("service")
    } else if (activeTab === "location") {
      setActiveTab("vehicle")
    } else if (activeTab === "contact") {
      setActiveTab("location")
    }

    setError(null)
  }

  // Handle form submission
  const handleSubmit = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Validate required fields
      if (!userLocation) {
        throw new Error("Location is required")
      }

      if (!formData.serviceType) {
        throw new Error("Service type is required")
      }

      if (!formData.contactName || !formData.contactPhone) {
        throw new Error("Contact information is required")
      }

      // Create service request
      const response = await fetch("/api/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: "1", // In a real app, this would be the authenticated user's ID
          serviceType: formData.serviceType,
          location: userLocation,
          description: formData.description,
          urgency: formData.urgency,
          scheduledDate: formData.scheduledDate,
          scheduledTime: formData.scheduledTime,
          contactInfo: {
            name: formData.contactName,
            phone: formData.contactPhone,
            email: formData.contactEmail,
          },
          vehicleInfo: {
            make: formData.make,
            model: formData.model,
            year: Number.parseInt(formData.year) || new Date().getFullYear(),
            color: formData.color,
            licensePlate: formData.licensePlate,
            vin: formData.vin,
            mileage: formData.mileage,
          },
          additionalInfo: {
            passengers: Number.parseInt(formData.additionalPassengers) || 0,
            pets: formData.pets,
            specialNeeds: formData.specialNeeds,
            membershipNumber: formData.membershipNumber,
          },
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to create service request")
      }

      const serviceRequest = await response.json()

      toast({
        title: "Service request created",
        description: "Your service request has been submitted successfully.",
      })

      // Redirect to service tracking page
      router.push(`/service-tracking/${serviceRequest.id}`)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to create service request"
      setError(errorMessage)

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Request Roadside Assistance</h1>
      <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
        Need help on the road? Fill out this detailed form to request immediate assistance. Our technicians will be
        dispatched to your location as soon as possible.
      </p>

      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Detailed Service Request</CardTitle>
          <CardDescription>Please provide all the details for your roadside assistance needs</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="service">Service</TabsTrigger>
              <TabsTrigger value="vehicle">Vehicle</TabsTrigger>
              <TabsTrigger value="location">Location</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
            </TabsList>

            {/* Service Tab */}
            <TabsContent value="service" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">What service do you need?</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {serviceTypes.map((type) => (
                    <div
                      key={type.value}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        formData.serviceType === type.value ? "border-primary bg-primary/5" : "hover:border-primary/50"
                      }`}
                      onClick={() => handleSelectChange("serviceType", type.value)}
                    >
                      <div className="font-medium">{type.label}</div>
                      <div className="text-sm text-muted-foreground">{type.description}</div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 pt-4">
                  <Label htmlFor="description">Describe your issue in detail</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Please provide specific details about your situation"
                    className="min-h-[100px]"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="urgency">How urgent is your situation?</Label>
                  <RadioGroup
                    value={formData.urgency}
                    onValueChange={(value) => handleSelectChange("urgency", value)}
                    className="space-y-2"
                  >
                    {urgencyLevels.map((level) => (
                      <div key={level.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={level.value} id={level.value} />
                        <Label htmlFor={level.value} className="cursor-pointer">
                          {level.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {showScheduleOptions && (
                  <div className="space-y-4 border rounded-md p-4 bg-muted/30">
                    <h4 className="font-medium">Schedule for later</h4>

                    <div className="space-y-2">
                      <Label>Select Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal">
                            <Calendar className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <CalendarComponent
                            mode="single"
                            selected={date}
                            onSelect={handleDateSelect}
                            initialFocus
                            disabled={(date) => date < new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="scheduledTime">Preferred Time</Label>
                      <Select
                        value={formData.scheduledTime}
                        onValueChange={(value) => handleSelectChange("scheduledTime", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="morning">Morning (8am - 12pm)</SelectItem>
                          <SelectItem value="afternoon">Afternoon (12pm - 5pm)</SelectItem>
                          <SelectItem value="evening">Evening (5pm - 9pm)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Vehicle Tab */}
            <TabsContent value="vehicle" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Vehicle Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="make">Make</Label>
                    <Select value={formData.make} onValueChange={(value) => handleSelectChange("make", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select make" />
                      </SelectTrigger>
                      <SelectContent>
                        {vehicleMakes.map((make) => (
                          <SelectItem key={make} value={make.toLowerCase()}>
                            {make}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="model">Model</Label>
                    <Input
                      id="model"
                      name="model"
                      placeholder="e.g., Camry"
                      value={formData.model}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="year">Year</Label>
                    <Select value={formData.year} onValueChange={(value) => handleSelectChange("year", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="color">Color</Label>
                    <Input
                      id="color"
                      name="color"
                      placeholder="e.g., Silver"
                      value={formData.color}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="licensePlate">License Plate</Label>
                    <Input
                      id="licensePlate"
                      name="licensePlate"
                      placeholder="e.g., ABC123"
                      value={formData.licensePlate}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="vin">VIN (Optional)</Label>
                    <Input
                      id="vin"
                      name="vin"
                      placeholder="Vehicle Identification Number"
                      value={formData.vin}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mileage">Approximate Mileage (Optional)</Label>
                  <Input
                    id="mileage"
                    name="mileage"
                    placeholder="e.g., 45000"
                    value={formData.mileage}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </TabsContent>

            {/* Location Tab */}
            <TabsContent value="location" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Your Location</h3>

                <div className="space-y-2">
                  <Label>Current Location</Label>
                  <div className="h-[300px] border rounded-md overflow-hidden">
                    <LocationTracker
                      serviceId="new-detailed"
                      initialLocation={userLocation || undefined}
                      onLocationUpdate={handleLocationUpdate}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Drag the marker to adjust your exact location if needed
                  </p>
                </div>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    Please ensure your location is as accurate as possible to help our technicians find you quickly.
                  </AlertDescription>
                </Alert>
              </div>
            </TabsContent>

            {/* Contact Tab */}
            <TabsContent value="contact" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Contact Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactName">Full Name</Label>
                    <Input
                      id="contactName"
                      name="contactName"
                      placeholder="Your full name"
                      value={formData.contactName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactPhone">Phone Number</Label>
                    <Input
                      id="contactPhone"
                      name="contactPhone"
                      placeholder="Your phone number"
                      value={formData.contactPhone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Email Address</Label>
                  <Input
                    id="contactEmail"
                    name="contactEmail"
                    type="email"
                    placeholder="Your email address"
                    value={formData.contactEmail}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-4 pt-2">
                  <h3 className="text-lg font-medium">Additional Information</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="additionalPassengers">Additional Passengers</Label>
                      <Select
                        value={formData.additionalPassengers}
                        onValueChange={(value) => handleSelectChange("additionalPassengers", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select number" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">No additional passengers</SelectItem>
                          <SelectItem value="1">1 passenger</SelectItem>
                          <SelectItem value="2">2 passengers</SelectItem>
                          <SelectItem value="3">3 passengers</SelectItem>
                          <SelectItem value="4">4 passengers</SelectItem>
                          <SelectItem value="5+">5+ passengers</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="membershipNumber">Membership Number (Optional)</Label>
                      <Input
                        id="membershipNumber"
                        name="membershipNumber"
                        placeholder="If you're a member"
                        value={formData.membershipNumber}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="pets"
                      checked={formData.pets}
                      onCheckedChange={(checked) => handleCheckboxChange("pets", checked as boolean)}
                    />
                    <Label htmlFor="pets" className="cursor-pointer">
                      I have pets with me
                    </Label>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialNeeds">Special Needs or Instructions</Label>
                    <Textarea
                      id="specialNeeds"
                      name="specialNeeds"
                      placeholder="Any special needs, medical conditions, or additional instructions"
                      value={formData.specialNeeds}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="flex items-center space-x-2 pt-4">
                    <Checkbox
                      id="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) => handleCheckboxChange("agreeToTerms", checked as boolean)}
                      required
                    />
                    <Label htmlFor="agreeToTerms" className="cursor-pointer">
                      I agree to the{" "}
                      <a href="/terms" className="text-primary underline">
                        terms and conditions
                      </a>
                    </Label>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          {activeTab !== "service" ? (
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
          ) : (
            <div></div>
          )}

          <Button onClick={handleNext} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : activeTab === "contact" ? (
              "Submit Request"
            ) : (
              "Next"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
