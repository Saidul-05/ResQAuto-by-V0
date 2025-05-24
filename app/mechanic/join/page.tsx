import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

export default function MechanicJoinPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Join Our Mechanic Network</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Become a part of RoadRescue's trusted network of mechanics and grow your business while helping people in
          need.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-3xl font-bold mb-6">Why Join RoadRescue?</h2>
          <ul className="space-y-4">
            {[
              "Steady stream of service requests",
              "Flexible working hours",
              "Competitive pay rates",
              "Build your reputation with ratings and reviews",
              "Access to our mobile app for easy job management",
              "Professional development opportunities",
              "Join a community of skilled professionals",
            ].map((benefit, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle2 className="h-6 w-6 text-primary mr-2 flex-shrink-0" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Button asChild size="lg" className="mr-4">
              <Link href="/auth/register?role=mechanic">Apply Now</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/mechanic/faq">Learn More</Link>
            </Button>
          </div>
        </div>
        <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
          <Image
            src="/placeholder.svg?height=800&width=600"
            alt="Mechanic working on a car"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Apply",
              description: "Complete our simple online application form with your qualifications and experience.",
            },
            {
              title: "Get Verified",
              description:
                "Our team will review your application, check your credentials, and conduct a background check.",
            },
            {
              title: "Start Earning",
              description: "Once approved, you'll receive service requests through our platform and start earning.",
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

      <div className="bg-muted rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Join Our Network?</h2>
        <p className="mb-6 max-w-2xl mx-auto">
          Join hundreds of mechanics who are growing their business and helping people in need with RoadRescue.
        </p>
        <Button asChild size="lg">
          <Link href="/auth/register?role=mechanic">Apply Now</Link>
        </Button>
      </div>
    </div>
  )
}
