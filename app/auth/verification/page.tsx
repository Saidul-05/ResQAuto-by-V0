"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileUploader } from "@/components/file-uploader"
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/lib/auth-context"
import { Textarea } from "@/components/ui/textarea"

export default function VerificationPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const authContext = useAuth()
  const { user, updateUser } = authContext
  const [activeTab, setActiveTab] = useState("documents")
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    licenseNumber: "",
    licenseState: "",
    insurancePolicy: "",
    insuranceProvider: "",
    businessLicense: "",
    taxId: "",
    additionalInfo: "",
  })

  const [files, setFiles] = useState({
    driversLicense: null as File | null,
    insuranceProof: null as File | null,
    certification: null as File | null,
    businessLicense: null as File | null,
  })

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (name: string, file: File | null) => {
    setFiles((prev) => ({ ...prev, [name]: file }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // In a real app, you would upload the files and submit the form data
      console.log("Form data:", formData)
      console.log("Files:", files)

      // Update user verification status
      if (updateUser) {
        await updateUser({ verified: true })
      }

      setSuccess(true)

      // Redirect after a delay
      setTimeout(() => {
        if (user?.role === "mechanic") {
          router.push("/mechanic")
        } else if (user?.role === "provider") {
          router.push("/provider")
        } else {
          router.push("/dashboard")
        }
      }, 3000)
    } catch (err) {
      setError("An error occurred during verification. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  // Show loading state during SSR/initial mount
  if (!mounted) {
    return (
      <div className="container flex items-center justify-center min-h-screen py-12">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Loading...</CardTitle>
            <CardDescription>Please wait while we load your verification page.</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </CardContent>
        </Card>
      </div>
    )
  }

  // Handle case where user is not authenticated or doesn't have required role
  if (!user || (user.role !== "mechanic" && user.role !== "provider")) {
    return (
      <div className="container flex items-center justify-center min-h-screen py-12">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Verification Required</CardTitle>
            <CardDescription>This page is only for mechanics and service providers.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push("/")}>Return to Home</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Handle case where user is already verified
  if (user.verified) {
    return (
      <div className="container flex items-center justify-center min-h-screen py-12">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Already Verified</CardTitle>
            <CardDescription>Your account has already been verified.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
            <p className="text-center mb-4">Thank you for verifying your account. You can now access all features.</p>
            <Button onClick={() => router.push(user.role === "mechanic" ? "/mechanic" : "/provider")}>
              Go to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container flex items-center justify-center min-h-screen py-12">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Account Verification</CardTitle>
          <CardDescription>
            {user.role === "mechanic"
              ? "Complete your mechanic verification to start accepting jobs"
              : "Verify your service provider account to start offering services"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mb-4 bg-green-50 border-green-200">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <AlertDescription className="text-green-700">
                Verification submitted successfully! We&apos;ll review your information and update your account status.
                You&apos;ll be redirected to your dashboard shortly.
              </AlertDescription>
            </Alert>
          )}

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="information">Information</TabsTrigger>
            </TabsList>

            <form onSubmit={handleSubmit}>
              <TabsContent value="documents" className="space-y-4 py-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Driver&apos;s License or ID</Label>
                    <FileUploader
                      accept="image/*,application/pdf"
                      maxSize={5 * 1024 * 1024} // 5MB
                      onFileSelect={(file) => handleFileChange("driversLicense", file)}
                      currentFile={files.driversLicense}
                    />
                    <p className="text-xs text-muted-foreground">
                      Upload a clear photo or scan of your driver&apos;s license or government-issued ID.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Proof of Insurance</Label>
                    <FileUploader
                      accept="image/*,application/pdf"
                      maxSize={5 * 1024 * 1024} // 5MB
                      onFileSelect={(file) => handleFileChange("insuranceProof", file)}
                      currentFile={files.insuranceProof}
                    />
                    <p className="text-xs text-muted-foreground">
                      Upload your insurance certificate or policy document.
                    </p>
                  </div>

                  {user.role === "mechanic" && (
                    <div className="space-y-2">
                      <Label>Professional Certifications (Optional)</Label>
                      <FileUploader
                        accept="image/*,application/pdf"
                        maxSize={5 * 1024 * 1024} // 5MB
                        onFileSelect={(file) => handleFileChange("certification", file)}
                        currentFile={files.certification}
                      />
                      <p className="text-xs text-muted-foreground">
                        Upload any professional certifications or training documents.
                      </p>
                    </div>
                  )}

                  {user.role === "provider" && (
                    <div className="space-y-2">
                      <Label>Business License</Label>
                      <FileUploader
                        accept="image/*,application/pdf"
                        maxSize={5 * 1024 * 1024} // 5MB
                        onFileSelect={(file) => handleFileChange("businessLicense", file)}
                        currentFile={files.businessLicense}
                      />
                      <p className="text-xs text-muted-foreground">
                        Upload your business license or registration documents.
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex justify-end pt-4">
                  <Button type="button" onClick={() => setActiveTab("information")}>
                    Next
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="information" className="space-y-4 py-4">
                {user.role === "mechanic" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="licenseNumber">Driver&apos;s License Number</Label>
                        <Input
                          id="licenseNumber"
                          name="licenseNumber"
                          value={formData.licenseNumber}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="licenseState">License State</Label>
                        <Input
                          id="licenseState"
                          name="licenseState"
                          value={formData.licenseState}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="insurancePolicy">Insurance Policy Number</Label>
                        <Input
                          id="insurancePolicy"
                          name="insurancePolicy"
                          value={formData.insurancePolicy}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="insuranceProvider">Insurance Provider</Label>
                        <Input
                          id="insuranceProvider"
                          name="insuranceProvider"
                          value={formData.insuranceProvider}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {user.role === "provider" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="businessLicense">Business License Number</Label>
                        <Input
                          id="businessLicense"
                          name="businessLicense"
                          value={formData.businessLicense}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="taxId">Tax ID / EIN</Label>
                        <Input id="taxId" name="taxId" value={formData.taxId} onChange={handleChange} required />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="insuranceProvider">Insurance Provider</Label>
                      <Input
                        id="insuranceProvider"
                        name="insuranceProvider"
                        value={formData.insuranceProvider}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="additionalInfo">Additional Information</Label>
                  <Textarea
                    id="additionalInfo"
                    name="additionalInfo"
                    placeholder="Add any additional information that might help with your verification"
                    value={formData.additionalInfo}
                    onChange={handleChange}
                    rows={4}
                  />
                </div>

                <div className="flex justify-between pt-4">
                  <Button type="button" variant="outline" onClick={() => setActiveTab("documents")}>
                    Back
                  </Button>

                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Verification"
                    )}
                  </Button>
                </div>
              </TabsContent>
            </form>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-center border-t pt-4">
          <p className="text-sm text-muted-foreground">
            Verification typically takes 1-2 business days. You&apos;ll receive an email once your account is verified.
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
