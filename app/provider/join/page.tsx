import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

export default function ProviderJoinPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Partner with RoadRescue</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Grow your roadside assistance business by joining our network of trusted service providers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl order-2 md:order-1">
          <Image
            src="/placeholder.svg?height=800&width=600"
            alt="Tow truck helping a stranded vehicle"
            fill
            className="object-cover"
          />
        </div>
        <div className="order-1 md:order-2">
          <h2 className="text-3xl font-bold mb-6">Benefits for Service Providers</h2>
          <ul className="space-y-4">
            {[
              "Increase your customer base and revenue",
              "Streamlined dispatching and job management",
              "Reduced idle time with optimized routing",
              "Guaranteed payments with no collection hassles",
              "Marketing support to grow your business",
              "Access to our provider portal and mobile app",
              "24/7 support from our operations team",
            ].map((benefit, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle2 className="h-6 w-6 text-primary mr-2 flex-shrink-0" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Button asChild size="lg" className="mr-4">
              <Link href="/auth/register?role=provider">Become a Partner</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/provider/faq">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-10">Partnership Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              title: "Apply",
              description: "Complete our online application with your business details and service offerings.",
            },
            {
              title: "Verification",
              description: "We'll verify your business credentials, insurance, and service capabilities.",
            },
            {
              title: "Onboarding",
              description: "Complete our onboarding process and get trained on our systems and procedures.",
            },
            {
              title: "Start Operating",
              description: "Begin receiving service requests and grow your business with RoadRescue.",
            },
          ].map((step, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-xl font-bold mb-4">Towing Companies</h3>
            <p className="mb-4">
              Expand your towing business with a steady stream of service requests from our nationwide customer base.
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link href="/auth/register?role=provider&type=towing">Apply as Towing Company</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-xl font-bold mb-4">Mobile Mechanics</h3>
            <p className="mb-4">
              Offer your mobile repair services through our platform and reach more customers in need.
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link href="/auth/register?role=provider&type=mechanic">Apply as Mobile Mechanic</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-xl font-bold mb-4">Roadside Assistance Specialists</h3>
            <p className="mb-4">
              Provide specialized roadside services like lockout assistance, jump starts, and fuel delivery.
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link href="/auth/register?role=provider&type=roadside">Apply as Roadside Specialist</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="bg-muted rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Grow Your Business?</h2>
        <p className="mb-6 max-w-2xl mx-auto">
          Join our network of service providers and take your roadside assistance business to the next level.
        </p>
        <Button asChild size="lg">
          <Link href="/auth/register?role=provider">Become a Partner Today</Link>
        </Button>
      </div>
    </div>
  )
}
