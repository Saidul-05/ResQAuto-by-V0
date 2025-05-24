import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function BasicMembershipPage() {
  return (
    <div className="container py-10">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Basic Membership Plan</h1>
        <p className="text-xl text-muted-foreground">
          Essential roadside assistance coverage for peace of mind on the road.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
        <div>
          <h2 className="text-3xl font-bold mb-4">Essential Coverage for Individual Drivers</h2>
          <p className="text-lg mb-6">
            Our Basic membership plan provides the essential roadside assistance services you need at an affordable
            price. Perfect for individual drivers who want peace of mind without breaking the bank.
          </p>
          <div className="flex items-center mb-6">
            <div className="text-4xl font-bold">$9.99</div>
            <div className="text-xl text-muted-foreground ml-2">/ month</div>
          </div>
          <div className="flex gap-4">
            <Button size="lg" asChild>
              <Link href="/membership?plan=basic">Subscribe Now</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/membership">Compare Plans</Link>
            </Button>
          </div>
        </div>
        <div className="relative h-64 md:h-80">
          <Image
            src="/placeholder.svg?height=400&width=600&text=Basic+Membership"
            alt="Basic Membership"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-center">What's Included</h2>
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">Services</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 text-green-500 mt-0.5" />
                    <span>24/7 roadside assistance</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 text-green-500 mt-0.5" />
                    <span>Flat tire service</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 text-green-500 mt-0.5" />
                    <span>Battery jump start</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 text-green-500 mt-0.5" />
                    <span>Lockout service</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 text-green-500 mt-0.5" />
                    <span>Towing up to 5 miles</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 text-green-500 mt-0.5" />
                    <span>Fuel delivery (cost of fuel extra)</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Limitations</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <X className="mr-2 h-5 w-5 text-red-500 mt-0.5" />
                    <span>Limited to 3 service calls per year</span>
                  </li>
                  <li className="flex items-start">
                    <X className="mr-2 h-5 w-5 text-red-500 mt-0.5" />
                    <span>No winching service</span>
                  </li>
                  <li className="flex items-start">
                    <X className="mr-2 h-5 w-5 text-red-500 mt-0.5" />
                    <span>No trip interruption benefits</span>
                  </li>
                  <li className="flex items-start">
                    <X className="mr-2 h-5 w-5 text-red-500 mt-0.5" />
                    <span>No rental car discounts</span>
                  </li>
                  <li className="flex items-start">
                    <X className="mr-2 h-5 w-5 text-red-500 mt-0.5" />
                    <span>Single vehicle coverage only</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>How quickly can I expect service?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Our average response time is 30 minutes in urban and suburban areas. Response times may vary based on
                your location, weather conditions, and service provider availability.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>What if I need a tow beyond 5 miles?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                You can still get towed beyond the 5-mile limit included in your plan. Additional mileage is charged at
                a discounted rate of $4 per mile.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Can I upgrade my plan later?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Yes, you can upgrade to our Premium or Family plan at any time. The price difference will be prorated
                based on your billing cycle.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>What happens if I use all my service calls?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                If you exceed your 3 service calls per year, you can still request assistance at our member-discounted
                pay-per-use rates, which are 15% lower than standard rates.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="bg-muted p-8 rounded-lg">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="mb-6">
            Join our Basic membership plan today and drive with confidence knowing help is just a call away.
          </p>
          <Button size="lg" asChild>
            <Link href="/membership?plan=basic">Subscribe Now</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
