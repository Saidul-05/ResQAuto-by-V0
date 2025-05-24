"use client"

import { useEffect } from "react"
import MultiStepRegister from "@/components/auth/multi-step-register"

export default function RegisterPage() {
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
