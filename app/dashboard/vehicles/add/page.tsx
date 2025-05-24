"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Car, ArrowLeft, Save } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { FileUploaderBlob } from "@/components/ui/file-uploader-blob"

export default function AddVehiclePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [vehicleImage, setVehicleImage] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: new Date().getFullYear().toString(),
    color: "",
    licensePlate: "",
    vin: "",
    insuranceName: "",
    insuranceNumber: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileUpload = (url: string) => {
    setVehicleImage(url)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In a real app, you would send the form data and image URL to your backend
      console.log("Vehicle data:", { ...formData, imageUrl: vehicleImage })

      toast({
        title: "Vehicle added",
        description: "Your vehicle has been added successfully.",
      })

      // Redirect to vehicles page
      router.push("/dashboard/vehicles")
    } catch (error) {
      console.error("Error adding vehicle:", error)
      toast({
        title: "Error",
        description: "Failed to add vehicle. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 30 }, (_, i) => (currentYear - i).toString())

  return (
    <div className="container max-w-4xl py-8">
      <Button variant="ghost" onClick={() => router.back()} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Vehicles
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Add New Vehicle</CardTitle>
          <CardDescription>Add your vehicle details for faster service requests</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="make">Make</Label>
                  <Select value={formData.make} onValueChange={(value) => handleSelectChange("make", value)} required>
                    <SelectTrigger id="make">
                      <SelectValue placeholder="Select make" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Toyota">Toyota</SelectItem>
                      <SelectItem value="Honda">Honda</SelectItem>
                      <SelectItem value="Ford">Ford</SelectItem>
                      <SelectItem value="Chevrolet">Chevrolet</SelectItem>
                      <SelectItem value="Nissan">Nissan</SelectItem>
                      <SelectItem value="BMW">BMW</SelectItem>
                      <SelectItem value="Mercedes">Mercedes</SelectItem>
                      <SelectItem value="Audi">Audi</SelectItem>
                      <SelectItem value="Hyundai">Hyundai</SelectItem>
                      <SelectItem value="Kia">Kia</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="model">Model</Label>
                  <Input
                    id="model"
                    name="model"
                    placeholder="e.g. Camry"
                    value={formData.model}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Select value={formData.year} onValueChange={(value) => handleSelectChange("year", value)} required>
                    <SelectTrigger id="year">
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year} value={year}>
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
                    placeholder="e.g. Silver"
                    value={formData.color}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="licensePlate">License Plate</Label>
                  <Input
                    id="licensePlate"
                    name="licensePlate"
                    placeholder="e.g. ABC123"
                    value={formData.licensePlate}
                    onChange={handleChange}
                    required
                  />
                </div>
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
                <p className="text-xs text-muted-foreground">
                  The VIN can usually be found on your insurance card, vehicle registration, or on the driver's side
                  dashboard.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="insuranceName">Insurance Provider (Optional)</Label>
                  <Input
                    id="insuranceName"
                    name="insuranceName"
                    placeholder="e.g. State Farm"
                    value={formData.insuranceName}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="insuranceNumber">Insurance Policy Number (Optional)</Label>
                  <Input
                    id="insuranceNumber"
                    name="insuranceNumber"
                    placeholder="e.g. POL-12345678"
                    value={formData.insuranceNumber}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Vehicle Image (Optional)</Label>
                <FileUploaderBlob
                  accept="image/*"
                  maxSize={10 * 1024 * 1024} // 10MB
                  onFileUpload={(url) => handleFileUpload(url)}
                  currentFileUrl={vehicleImage || undefined}
                  buttonText="Upload Vehicle Image"
                />
                <p className="text-xs text-muted-foreground">
                  Upload a clear photo of your vehicle to help our technicians identify it more easily.
                </p>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Vehicle
                </>
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-6">
          <div className="flex items-center text-sm text-muted-foreground">
            <Car className="mr-2 h-4 w-4" />
            Your vehicle information is securely stored and only used for service requests.
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
