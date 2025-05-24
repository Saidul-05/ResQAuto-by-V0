"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Mail, CheckCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsLoading(false)
    setIsSuccess(true)
    setEmail("")

    toast({
      title: "Subscription successful!",
      description: "Thank you for subscribing to our newsletter.",
    })

    // Reset success state after a delay
    setTimeout(() => {
      setIsSuccess(false)
    }, 3000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Stay Updated</CardTitle>
        <CardDescription>
          Subscribe to our newsletter for roadside assistance tips and exclusive offers.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="email"
              placeholder="Enter your email"
              className="pl-10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading || isSuccess}
            />
          </div>
          <Button type="submit" disabled={isLoading || isSuccess}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Subscribing...
              </>
            ) : isSuccess ? (
              <>
                <CheckCircle className="mr-2 h-4 w-4" />
                Subscribed!
              </>
            ) : (
              "Subscribe"
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        We respect your privacy. Unsubscribe at any time.
      </CardFooter>
    </Card>
  )
}
