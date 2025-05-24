"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, Mail, Lock, User, AlertCircle, Phone, MapPin, Building, ArrowRight, ArrowLeft } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/lib/auth-context"
import { RoleSelection } from "./role-selection"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"

export default function MultiStepRegister() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const { signup, isLoading: authLoading } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedRole, setSelectedRole] = useState("customer")

  // Add scroll to top effect when changing steps
  useEffect(() => {
    // Use setTimeout to ensure the DOM has updated before scrolling
    const timer = setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }, 100)

    return () => clearTimeout(timer)
  }, [currentStep])

  // Check for redirect parameter
  useEffect(() => {
    const role = searchParams?.get("role")
    if (role && ["customer", "mechanic", "provider", "business"].includes(role)) {
      setSelectedRole(role)
    }
  }, [searchParams])

  const [formData, setFormData] = useState({
    // Basic info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",

    // Address
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",

    // Mechanic specific
    specializations: [] as string[],
    experience: "",
    certifications: [] as string[],
    availability: "full-time",
    serviceRadius: "25",

    // Service provider specific
    companyName: "",
    businessType: "sole-proprietor",
    taxId: "",
    website: "",
    fleetSize: "1-5",
    servicesOffered: [] as string[],

    // Business customer specific
    companySize: "small",
    industry: "",
    fleetVehicles: "1-10",

    // Terms
    agreeTerms: false,
    agreeBackground: false,
  })

  const totalSteps = selectedRole === "customer" ? 3 : 4
  const progress = (currentStep / totalSteps) * 100

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleMultiSelectChange = (name: string, value: string, checked: boolean) => {
    setFormData((prev) => {
      const currentValues = prev[name as keyof typeof prev] as string[]
      if (checked) {
        return { ...prev, [name]: [...currentValues, value] }
      } else {
        return { ...prev, [name]: currentValues.filter((v) => v !== value) }
      }
    })
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const validateCurrentStep = (): boolean => {
    setError(null)

    // Step 1: Role selection
    if (currentStep === 1) {
      if (!selectedRole) {
        setError("Please select an account type")
        return false
      }
      return true
    }

    // Step 2: Basic information
    if (currentStep === 2) {
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.password) {
        setError("Please fill in all required fields")
        return false
      }

      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match")
        return false
      }

      // Simple email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        setError("Please enter a valid email address")
        return false
      }

      return true
    }

    // Step 3: Address information
    if (currentStep === 3) {
      if (
        selectedRole !== "customer" &&
        (!formData.address || !formData.city || !formData.state || !formData.zipCode)
      ) {
        setError("Please fill in all address fields")
        return false
      }
      return true
    }

    // Step 4: Role-specific information
    if (currentStep === 4) {
      if (selectedRole === "mechanic") {
        if (formData.specializations.length === 0 || !formData.experience) {
          setError("Please fill in all required fields")
          return false
        }
      } else if (selectedRole === "provider") {
        if (!formData.companyName || !formData.businessType || formData.servicesOffered.length === 0) {
          setError("Please fill in all required fields")
          return false
        }
      } else if (selectedRole === "business") {
        if (!formData.companyName || !formData.industry) {
          setError("Please fill in all required fields")
          return false
        }
      }

      if (!formData.agreeTerms) {
        setError("You must agree to the terms and conditions")
        return false
      }

      if ((selectedRole === "mechanic" || selectedRole === "provider") && !formData.agreeBackground) {
        setError("You must agree to the background check")
        return false
      }

      return true
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateCurrentStep()) {
      return
    }

    if (currentStep < totalSteps) {
      nextStep()
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const result = await signup({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        role: selectedRole as any,
      })

      if (result.success) {
        toast({
          title: "Registration successful",
          description: `Welcome to RoadRescue, ${formData.firstName}!`,
        })

        // Redirect based on role
        if (selectedRole === "mechanic") {
          router.push("/mechanic")
        } else if (selectedRole === "provider") {
          router.push("/provider")
        } else {
          router.push("/dashboard")
        }
      } else {
        setError("Registration failed. Please try again.")
      }
    } catch (err) {
      setError("An error occurred during registration. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex flex-col items-center justify-center py-8 px-4">
      <Card className="w-full max-w-2xl shadow-lg border-t-4 border-t-primary">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
          <CardDescription className="text-center">
            Join RoadRescue to access premium roadside assistance services
          </CardDescription>
          <Progress value={progress} className="h-2 mt-4" />
        </CardHeader>
        <CardContent className="max-h-[60vh] overflow-y-auto pb-6">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Role Selection */}
            {currentStep === 1 && <RoleSelection onRoleSelect={setSelectedRole} selectedRole={selectedRole} />}

            {/* Step 2: Basic Information */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">
                      First Name <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="firstName"
                        name="firstName"
                        placeholder="John"
                        className="pl-10"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">
                      Last Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="name@example.com"
                      className="pl-10"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">
                    Phone Number <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="(123) 456-7890"
                      className="pl-10"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">
                      Password <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">
                      Confirm Password <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Password must be at least 8 characters long and include a number and special character.
                </p>
              </div>
            )}

            {/* Step 3: Address Information */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address">
                    Street Address {selectedRole !== "customer" && <span className="text-red-500">*</span>}
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="address"
                      name="address"
                      placeholder="123 Main St"
                      className="pl-10"
                      value={formData.address}
                      onChange={handleChange}
                      required={selectedRole !== "customer"}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">
                      City {selectedRole !== "customer" && <span className="text-red-500">*</span>}
                    </Label>
                    <Input
                      id="city"
                      name="city"
                      placeholder="New York"
                      value={formData.city}
                      onChange={handleChange}
                      required={selectedRole !== "customer"}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">
                      State {selectedRole !== "customer" && <span className="text-red-500">*</span>}
                    </Label>
                    <Input
                      id="state"
                      name="state"
                      placeholder="NY"
                      value={formData.state}
                      onChange={handleChange}
                      required={selectedRole !== "customer"}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">
                      ZIP Code {selectedRole !== "customer" && <span className="text-red-500">*</span>}
                    </Label>
                    <Input
                      id="zipCode"
                      name="zipCode"
                      placeholder="10001"
                      value={formData.zipCode}
                      onChange={handleChange}
                      required={selectedRole !== "customer"}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Select value={formData.country} onValueChange={(value) => handleSelectChange("country", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="United States">United States</SelectItem>
                        <SelectItem value="Canada">Canada</SelectItem>
                        <SelectItem value="Mexico">Mexico</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Role-specific Information */}
            {currentStep === 4 && (
              <div className="space-y-6">
                {/* Mechanic-specific fields */}
                {selectedRole === "mechanic" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Mechanic Information</h3>

                    <div className="space-y-2">
                      <Label>
                        Specializations <span className="text-red-500">*</span>
                      </Label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          "Engine Repair",
                          "Transmission",
                          "Electrical Systems",
                          "Brakes",
                          "Towing",
                          "Tire Change",
                          "Battery Service",
                          "Lockout Service",
                        ].map((spec) => (
                          <div className="flex items-center space-x-2" key={spec}>
                            <Checkbox
                              id={`spec-${spec}`}
                              checked={formData.specializations.includes(spec)}
                              onCheckedChange={(checked) =>
                                handleMultiSelectChange("specializations", spec, checked as boolean)
                              }
                            />
                            <Label htmlFor={`spec-${spec}`}>{spec}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="experience">
                        Years of Experience <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.experience}
                        onValueChange={(value) => handleSelectChange("experience", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select experience" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0-1">Less than 1 year</SelectItem>
                          <SelectItem value="1-3">1-3 years</SelectItem>
                          <SelectItem value="3-5">3-5 years</SelectItem>
                          <SelectItem value="5-10">5-10 years</SelectItem>
                          <SelectItem value="10+">10+ years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Certifications</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          "ASE Certified",
                          "I-CAR Certified",
                          "AAA Approved",
                          "State Licensed",
                          "Manufacturer Certified",
                        ].map((cert) => (
                          <div className="flex items-center space-x-2" key={cert}>
                            <Checkbox
                              id={`cert-${cert}`}
                              checked={formData.certifications.includes(cert)}
                              onCheckedChange={(checked) =>
                                handleMultiSelectChange("certifications", cert, checked as boolean)
                              }
                            />
                            <Label htmlFor={`cert-${cert}`}>{cert}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="availability">Availability</Label>
                        <Select
                          value={formData.availability}
                          onValueChange={(value) => handleSelectChange("availability", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select availability" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="full-time">Full Time</SelectItem>
                            <SelectItem value="part-time">Part Time</SelectItem>
                            <SelectItem value="weekends">Weekends Only</SelectItem>
                            <SelectItem value="on-call">On Call</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="serviceRadius">Service Radius (miles)</Label>
                        <Select
                          value={formData.serviceRadius}
                          onValueChange={(value) => handleSelectChange("serviceRadius", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select radius" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="10">10 miles</SelectItem>
                            <SelectItem value="25">25 miles</SelectItem>
                            <SelectItem value="50">50 miles</SelectItem>
                            <SelectItem value="100">100 miles</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Service Provider specific fields */}
                {selectedRole === "provider" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Service Provider Information</h3>

                    <div className="space-y-2">
                      <Label htmlFor="companyName">
                        Company Name <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="companyName"
                          name="companyName"
                          placeholder="ABC Roadside Services"
                          className="pl-10"
                          value={formData.companyName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="businessType">
                          Business Type <span className="text-red-500">*</span>
                        </Label>
                        <Select
                          value={formData.businessType}
                          onValueChange={(value) => handleSelectChange("businessType", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select business type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sole-proprietor">Sole Proprietor</SelectItem>
                            <SelectItem value="llc">LLC</SelectItem>
                            <SelectItem value="corporation">Corporation</SelectItem>
                            <SelectItem value="partnership">Partnership</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="taxId">Tax ID / EIN</Label>
                        <Input
                          id="taxId"
                          name="taxId"
                          placeholder="XX-XXXXXXX"
                          value={formData.taxId}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        name="website"
                        type="url"
                        placeholder="https://www.example.com"
                        value={formData.website}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="fleetSize">Fleet Size</Label>
                      <Select
                        value={formData.fleetSize}
                        onValueChange={(value) => handleSelectChange("fleetSize", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select fleet size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-5">1-5 vehicles</SelectItem>
                          <SelectItem value="6-10">6-10 vehicles</SelectItem>
                          <SelectItem value="11-20">11-20 vehicles</SelectItem>
                          <SelectItem value="21+">21+ vehicles</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>
                        Services Offered <span className="text-red-500">*</span>
                      </Label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          "Towing",
                          "Jump Start",
                          "Tire Change",
                          "Fuel Delivery",
                          "Lockout Service",
                          "Winching",
                          "Battery Replacement",
                          "Mobile Repairs",
                        ].map((service) => (
                          <div className="flex items-center space-x-2" key={service}>
                            <Checkbox
                              id={`service-${service}`}
                              checked={formData.servicesOffered.includes(service)}
                              onCheckedChange={(checked) =>
                                handleMultiSelectChange("servicesOffered", service, checked as boolean)
                              }
                            />
                            <Label htmlFor={`service-${service}`}>{service}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Business Customer specific fields */}
                {selectedRole === "business" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Business Customer Information</h3>

                    <div className="space-y-2">
                      <Label htmlFor="companyName">
                        Company Name <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="companyName"
                          name="companyName"
                          placeholder="ABC Corporation"
                          className="pl-10"
                          value={formData.companyName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="industry">
                          Industry <span className="text-red-500">*</span>
                        </Label>
                        <Select
                          value={formData.industry}
                          onValueChange={(value) => handleSelectChange("industry", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select industry" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="transportation">Transportation</SelectItem>
                            <SelectItem value="construction">Construction</SelectItem>
                            <SelectItem value="delivery">Delivery</SelectItem>
                            <SelectItem value="retail">Retail</SelectItem>
                            <SelectItem value="healthcare">Healthcare</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="companySize">Company Size</Label>
                        <Select
                          value={formData.companySize}
                          onValueChange={(value) => handleSelectChange("companySize", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select company size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="small">Small (1-50 employees)</SelectItem>
                            <SelectItem value="medium">Medium (51-250 employees)</SelectItem>
                            <SelectItem value="large">Large (251-1000 employees)</SelectItem>
                            <SelectItem value="enterprise">Enterprise (1000+ employees)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="fleetVehicles">Fleet Size</Label>
                      <Select
                        value={formData.fleetVehicles}
                        onValueChange={(value) => handleSelectChange("fleetVehicles", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select fleet size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-10">1-10 vehicles</SelectItem>
                          <SelectItem value="11-50">11-50 vehicles</SelectItem>
                          <SelectItem value="51-100">51-100 vehicles</SelectItem>
                          <SelectItem value="100+">100+ vehicles</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {/* Terms and agreements */}
                <div className="space-y-4 pt-4 border-t">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="agreeTerms"
                      checked={formData.agreeTerms}
                      onCheckedChange={(checked) => handleCheckboxChange("agreeTerms", checked as boolean)}
                      required
                    />
                    <Label htmlFor="agreeTerms" className="text-sm">
                      I agree to the{" "}
                      <Link href="/terms" className="text-primary hover:underline">
                        terms and conditions
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-primary hover:underline">
                        privacy policy
                      </Link>
                    </Label>
                  </div>

                  {(selectedRole === "mechanic" || selectedRole === "provider") && (
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="agreeBackground"
                        checked={formData.agreeBackground}
                        onCheckedChange={(checked) => handleCheckboxChange("agreeBackground", checked as boolean)}
                        required
                      />
                      <Label htmlFor="agreeBackground" className="text-sm">
                        I consent to a background check and verification of my credentials
                      </Label>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="flex justify-between pt-4">
              {currentStep > 1 ? (
                <Button type="button" variant="outline" onClick={prevStep}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              ) : (
                <div></div> // Empty div for spacing
              )}

              <Button type="submit" disabled={isLoading || authLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {currentStep === totalSteps ? "Creating account..." : "Next..."}
                  </>
                ) : currentStep === totalSteps ? (
                  <>
                    Create Account
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  <>
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t pt-4">
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
