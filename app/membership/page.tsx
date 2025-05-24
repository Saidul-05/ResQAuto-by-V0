"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, X } from "lucide-react"
import { PaymentForm } from "@/components/payment/payment-form"
import { useToast } from "@/components/ui/use-toast"

const membershipPlans = [
  {
    id: "basic",
    name: "Basic",
    price: 9.99,
    interval: "month",
    description: "Essential roadside assistance for individual drivers",
    features: [
      "24/7 roadside assistance",
      "Towing up to 5 miles",
      "Flat tire service",
      "Battery jump start",
      "Fuel delivery (cost of fuel not included)",
    ],
    limitations: ["Limited to 3 service calls per year", "No lockout service", "No winching"],
  },
  {
    id: "premium",
    name: "Premium",
    price: 19.99,
    interval: "month",
    description: "Comprehensive coverage for frequent drivers",
    features: [
      "24/7 roadside assistance",
      "Towing up to 100 miles",
      "Flat tire service",
      "Battery jump start",
      "Fuel delivery (including cost of fuel)",
      "Lockout service",
      "Winching service",
      "Trip interruption benefits",
    ],
    limitations: ["Limited to 5 service calls per year"],
  },
  {
    id: "family",
    name: "Family",
    price: 29.99,
    interval: "month",
    description: "Complete coverage for multiple drivers in your household",
    features: [
      "24/7 roadside assistance",
      "Towing up to 100 miles",
      "Flat tire service",
      "Battery jump start",
      "Fuel delivery (including cost of fuel)",
      "Lockout service",
      "Winching service",
      "Trip interruption benefits",
      "Coverage for up to 5 family members",
      "Rental car reimbursement",
    ],
    limitations: [],
  },
]

export default function MembershipPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [selectedPlan, setSelectedPlan] = useState(membershipPlans[1]) // Default to Premium
  const [showPayment, setShowPayment] = useState(false)

  const handlePlanSelect = (planId: string) => {
    const plan = membershipPlans.find((p) => p.id === planId)
    if (plan) {
      setSelectedPlan(plan)
    }
  }

  const handleSubscribe = () => {
    setShowPayment(true)
  }

  const handlePaymentSuccess = (paymentId: string) => {
    toast({
      title: "Subscription successful",
      description: `You are now subscribed to the ${selectedPlan.name} plan.`,
    })

    // In a real application, you would update the user's membership status
    setTimeout(() => {
      router.push("/dashboard")
    }, 2000)
  }

  const handlePaymentError = (error: string) => {
    toast({
      title: "Subscription failed",
      description: error,
      variant: "destructive",
    })
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Choose Your Membership Plan</h1>
      <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
        Join RoadRescue today and get peace of mind knowing help is just a call away. Choose the plan that best fits
        your needs and driving habits.
      </p>

      {!showPayment ? (
        <>
          <Tabs defaultValue="premium" className="w-full" onValueChange={handlePlanSelect}>
            <TabsList className="grid w-full grid-cols-3 mb-8">
              {membershipPlans.map((plan) => (
                <TabsTrigger key={plan.id} value={plan.id}>
                  {plan.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {membershipPlans.map((plan) => (
              <TabsContent key={plan.id} value={plan.id} className="space-y-4">
                <div className="grid gap-6 md:grid-cols-3">
                  {membershipPlans.map((p) => (
                    <Card
                      key={p.id}
                      className={`flex flex-col ${p.id === plan.id ? "border-primary ring-2 ring-primary" : ""}`}
                    >
                      <CardHeader>
                        <CardTitle>{p.name}</CardTitle>
                        <CardDescription>{p.description}</CardDescription>
                        <div className="mt-2">
                          <span className="text-3xl font-bold">${p.price}</span>
                          <span className="text-muted-foreground">/{p.interval}</span>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-1">
                        <div className="space-y-4">
                          <h4 className="text-sm font-medium">Features</h4>
                          <ul className="space-y-2">
                            {p.features.map((feature) => (
                              <li key={feature} className="flex items-center">
                                <Check className="mr-2 h-4 w-4 text-green-500" />
                                <span className="text-sm">{feature}</span>
                              </li>
                            ))}
                          </ul>

                          {p.limitations.length > 0 && (
                            <>
                              <h4 className="text-sm font-medium">Limitations</h4>
                              <ul className="space-y-2">
                                {p.limitations.map((limitation) => (
                                  <li key={limitation} className="flex items-center">
                                    <X className="mr-2 h-4 w-4 text-red-500" />
                                    <span className="text-sm">{limitation}</span>
                                  </li>
                                ))}
                              </ul>
                            </>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button
                          className="w-full"
                          variant={p.id === plan.id ? "default" : "outline"}
                          onClick={() => {
                            handlePlanSelect(p.id)
                            if (p.id === plan.id) {
                              handleSubscribe()
                            }
                          }}
                        >
                          {p.id === plan.id ? "Subscribe Now" : "Select Plan"}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </>
      ) : (
        <div className="max-w-md mx-auto">
          <div className="mb-6">
            <Button variant="outline" onClick={() => setShowPayment(false)}>
              Back to Plans
            </Button>
          </div>

          <PaymentForm
            amount={selectedPlan.price}
            description={`${selectedPlan.name} Membership Plan`}
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
          />

          <div className="mt-4 text-center text-sm text-muted-foreground">
            By subscribing, you agree to our{" "}
            <a href="/terms" className="text-primary hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </a>
            .
          </div>
        </div>
      )}
    </div>
  )
}
