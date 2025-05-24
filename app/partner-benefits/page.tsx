import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, TrendingUp, Shield, Clock, DollarSign, Award } from "lucide-react"

export default function PartnerBenefitsPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Partner Benefits</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Discover the advantages of partnering with RoadRescue as a mechanic or service provider.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-3xl font-bold mb-6">Why Partner With Us?</h2>
          <p className="mb-6">
            At RoadRescue, we're committed to creating mutually beneficial partnerships with mechanics and service
            providers. Our platform is designed to help you grow your business while providing exceptional service to
            customers in need.
          </p>
          <ul className="space-y-4">
            {[
              "Access to a large and growing customer base",
              "Increased revenue opportunities",
              "Flexible scheduling to fit your business needs",
              "Reduced administrative burden",
              "Professional development and training resources",
              "Marketing and promotional support",
            ].map((benefit, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle2 className="h-6 w-6 text-primary mr-2 flex-shrink-0" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
          <Image
            src="/placeholder.svg?height=800&width=600"
            alt="Roadside assistance professional helping a customer"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-10">Key Benefits</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <TrendingUp className="h-10 w-10 text-primary" />,
              title: "Business Growth",
              description:
                "Expand your customer base and increase your revenue through our platform's steady stream of service requests.",
            },
            {
              icon: <Shield className="h-10 w-10 text-primary" />,
              title: "Reduced Risk",
              description:
                "We handle payment processing, customer acquisition, and dispute resolution, reducing your business risks.",
            },
            {
              icon: <Clock className="h-10 w-10 text-primary" />,
              title: "Flexible Scheduling",
              description: "Set your own hours and service areas to match your business capacity and preferences.",
            },
            {
              icon: <DollarSign className="h-10 w-10 text-primary" />,
              title: "Competitive Compensation",
              description:
                "Earn competitive rates for your services with transparent payment processes and weekly payouts.",
            },
            {
              icon: <Award className="h-10 w-10 text-primary" />,
              title: "Recognition & Rewards",
              description:
                "Build your reputation through customer ratings and reviews, and earn rewards for exceptional service.",
            },
          ].map((benefit, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center gap-4">
                {benefit.icon}
                <CardTitle>{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <Card>
          <CardHeader>
            <CardTitle>For Mechanics</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-6">
              As a RoadRescue mechanic, you'll have the opportunity to use your skills to help people in need while
              building a flexible career with competitive pay.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                <span>Access to specialized training and certification opportunities</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                <span>Tools and resources to enhance your technical skills</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                <span>Career advancement pathways within the RoadRescue network</span>
              </li>
            </ul>
            <Button asChild className="w-full">
              <Link href="/mechanic/join">Learn More</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>For Service Providers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-6">
              Partner with RoadRescue to expand your service business, optimize your operations, and increase your
              revenue while maintaining your independence.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                <span>Business development resources and marketing support</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                <span>Advanced dispatching technology to optimize your fleet</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                <span>Opportunities for exclusive service area partnerships</span>
              </li>
            </ul>
            <Button asChild className="w-full">
              <Link href="/provider/join">Learn More</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="bg-muted rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Join Our Partner Network?</h2>
        <p className="mb-6 max-w-2xl mx-auto">
          Whether you're a skilled mechanic or an established service provider, we have partnership opportunities that
          can help you grow and succeed.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/auth/register?role=mechanic">Join as a Mechanic</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/auth/register?role=provider">Join as a Service Provider</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
