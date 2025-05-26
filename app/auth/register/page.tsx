"use client"

import { Suspense, useEffect } from "react"
import MultiStepRegister from "@/components/auth/multi-step-register"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

function RegisterContent() {
  // Add overflow handling to ensure the page scrolls properly
  useEffect(() => {
    // Make sure the body can scroll
    document.body.style.overflow = "auto"

    return () => {
      // Reset when component unmounts
      document.body.style.overflow = ""
    }
  }, [])

  return (
    <div className="min-h-screen overflow-y-auto py-8">
      <MultiStepRegister />
    </div>
  )
}

function RegisterLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center py-8">
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col items-center justify-center p-8 space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-sm text-muted-foreground">Loading registration form...</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<RegisterLoading />}>
      <RegisterContent />
    </Suspense>
  )
}
