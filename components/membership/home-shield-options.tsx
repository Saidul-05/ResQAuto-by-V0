"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface HomeShieldPlan {
  id: string
  name: string
  price: number
  currency: string
  interval: string
  description: string
  features: string[]
  popular?: boolean
}

const defaultPlans: HomeShieldPlan[] = [
  {
    id: "basic",
    name: "Basic Shield",
    price: 9.99,
    currency: "USD",
    interval: "month",
    description: "Essential home protection for peace of mind",
    features: [
      "24/7 emergency assistance",
      "Home lockout service",
      "Basic plumbing issues",
      "Electrical emergencies",
      "10% discount on all repairs",
    ],
  },
  {
    id: "premium",
    name: "Premium Shield",
    price: 19.99,
    currency: "USD",
    interval: "month",
    description: "Comprehensive coverage for your home",
    features: [
      "All Basic Shield features",
      "HVAC emergency service",
      "Appliance breakdown assistance",
      "Annual home safety inspection",
      "20% discount on all repairs",
      "Priority scheduling",
    ],
    popular: true,
  },
  {
    id: "ultimate",
    name: "Ultimate Shield",
    price: 29.99,
    currency: "USD",
    interval: "month",
    description: "Complete protection for your home and family",
    features: [
      "All Premium Shield features",
      "Pest control emergencies",
      "Roof leak assistance",
      "Smart home device support",
      "30% discount on all repairs",
      "VIP priority service",
      "Free annual maintenance check",
    ],
  },
]

interface HomeShieldOptionsProps {
  plans?: HomeShieldPlan[]
}

export function HomeShieldOptions({ plans = defaultPlans }: HomeShieldOptionsProps) {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const { toast } = useToast()

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId)

    // In a real app, you would navigate to checkout or show a payment form
    toast({
      title: "Plan selected",
      description: `You've selected the ${plans.find((p) => p.id === planId)?.name} plan. Proceed to checkout to complete your subscription.`,
    })
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold">HomeShield Protection Plans</h2>
        <p className="text-muted-foreground mt-2">Protect your home with our comprehensive HomeShield plans</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card key={plan.id} className={`flex flex-col ${plan.popular ? "border-primary shadow-lg" : ""}`}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center">{plan.name}</CardTitle>
                  <CardDescription className="mt-2">{plan.description}</CardDescription>
                </div>
                {plan.popular && <Badge className="bg-primary">Popular</Badge>}
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="mb-4">
                <span className="text-3xl font-bold">${plan.price}</span>
                <span className="text-muted-foreground">/{plan.interval}</span>
              </div>

              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                variant={plan.popular ? "default" : "outline"}
                onClick={() => handleSelectPlan(plan.id)}
              >
                {selectedPlan === plan.id ? "Selected" : "Select Plan"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
