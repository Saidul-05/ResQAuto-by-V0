"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Loader2, AlertTriangle, Send, X } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { FileUploaderBlob } from "@/components/ui/file-uploader-blob"

export function AccidentReport() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [accidentPhotos, setAccidentPhotos] = useState<string[]>([])

  const [formData, setFormData] = useState({
    location: "",
    date: "",
    time: "",
    description: "",
    injuries: "no",
    vehicleDamage: "",
    otherVehicles: "no",
    policeReport: "no",
    policeReportNumber: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileUpload = (url: string) => {
    setAccidentPhotos((prev) => [...prev, url])
  }

  const removePhoto = (index: number) => {
    setAccidentPhotos((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // In a real app, you would send the form data and photos to your backend
      console.log("Accident report:", { ...formData, photos: accidentPhotos })

      toast({
        title: "Report submitted",
        description: "Your accident report has been submitted successfully.",
      })

      // Reset form
      setFormData({
        location: "",
        date: "",
        time: "",
        description: "",
        injuries: "no",
        vehicleDamage: "",
        otherVehicles: "no",
        policeReport: "no",
        policeReportNumber: "",
      })
      setAccidentPhotos([])
      setShowForm(false)
    } catch (error) {
      console.error("Error submitting report:", error)
      toast({
        title: "Submission failed",
        description: "Failed to submit your report. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-4">
      {!showForm ? (
        <Button onClick={() => setShowForm(true)} className="w-full" variant="outline">
          <AlertTriangle className="mr-2 h-4 w-4" />
          Report an Accident
        </Button>
      ) : (
        <Card className="border-2 border-yellow-200 dark:border-yellow-900">
          <CardHeader className="bg-yellow-50 dark:bg-yellow-900/20">
            <CardTitle className="flex items-center text-lg">
              <AlertTriangle className="mr-2 h-5 w-5 text-yellow-600 dark:text-yellow-500" />
              Accident Report
            </CardTitle>
            <CardDescription>File an accident report for insurance and documentation purposes</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" name="date" type="date" value={formData.date} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input id="time" name="time" type="time" value={formData.time} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="Street address or intersection"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Accident Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe what happened in detail"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="vehicleDamage">Vehicle Damage</Label>
                <Textarea
                  id="vehicleDamage"
                  name="vehicleDamage"
                  placeholder="Describe the damage to your vehicle"
                  value={formData.vehicleDamage}
                  onChange={handleChange}
                  rows={2}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Were there any injuries?</Label>
                <RadioGroup
                  value={formData.injuries}
                  onValueChange={(value) => handleRadioChange("injuries", value)}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="injuries-yes" />
                    <Label htmlFor="injuries-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="injuries-no" />
                    <Label htmlFor="injuries-no">No</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Were other vehicles involved?</Label>
                <RadioGroup
                  value={formData.otherVehicles}
                  onValueChange={(value) => handleRadioChange("otherVehicles", value)}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="other-vehicles-yes" />
                    <Label htmlFor="other-vehicles-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="other-vehicles-no" />
                    <Label htmlFor="other-vehicles-no">No</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Was a police report filed?</Label>
                <RadioGroup
                  value={formData.policeReport}
                  onValueChange={(value) => handleRadioChange("policeReport", value)}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="police-report-yes" />
                    <Label htmlFor="police-report-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="police-report-no" />
                    <Label htmlFor="police-report-no">No</Label>
                  </div>
                </RadioGroup>
              </div>

              {formData.policeReport === "yes" && (
                <div className="space-y-2">
                  <Label htmlFor="policeReportNumber">Police Report Number</Label>
                  <Input
                    id="policeReportNumber"
                    name="policeReportNumber"
                    placeholder="e.g. RP-12345678"
                    value={formData.policeReportNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label>Accident Photos</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FileUploaderBlob
                    accept="image/*"
                    maxSize={10 * 1024 * 1024} // 10MB
                    onFileUpload={(url) => handleFileUpload(url)}
                    buttonText="Add Accident Photo"
                  />

                  {accidentPhotos.length > 0 && (
                    <div className="border rounded-md p-4">
                      <p className="text-sm font-medium mb-2">Uploaded Photos ({accidentPhotos.length})</p>
                      <div className="grid grid-cols-2 gap-2">
                        {accidentPhotos.map((photo, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={photo || "/placeholder.svg"}
                              alt={`Accident photo ${index + 1}`}
                              className="h-24 w-full object-cover rounded-md"
                            />
                            <button
                              type="button"
                              className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => removePhoto(index)}
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  Upload photos of the accident scene, vehicle damage, and any relevant details.
                </p>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Checkbox id="confirm" required />
                <Label htmlFor="confirm" className="text-sm">
                  I confirm that the information provided is accurate to the best of my knowledge.
                </Label>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-4">
            <Button variant="ghost" onClick={() => setShowForm(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Submit Report
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
