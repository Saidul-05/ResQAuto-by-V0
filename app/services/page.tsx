import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Our Services | Roadside Assistance",
  description:
    "Explore our comprehensive roadside assistance services including towing, battery jump-start, flat tire change, and more.",
}

const services = [
  {
    id: "towing",
    title: "Towing Service",
    description:
      "Professional towing service for all vehicle types. We'll get you to the nearest repair facility or your preferred location.",
    icon: "🚚",
    color: "bg-blue-100 dark:bg-blue-900",
  },
  {
    id: "battery",
    title: "Battery Jump-Start",
    description: "Dead battery? Our technicians will jump-start your vehicle and get you back on the road quickly.",
    icon: "🔋",
    color: "bg-green-100 dark:bg-green-900",
  },
  {
    id: "tire",
    title: "Flat Tire Change",
    description:
      "We'll replace your flat tire with your spare tire, or tow your vehicle to the nearest repair facility.",
    icon: "🛞",
    color: "bg-yellow-100 dark:bg-yellow-900",
  },
  {
    id: "fuel",
    title: "Fuel Delivery",
    description: "Run out of gas? We'll deliver fuel to your location so you can reach the nearest gas station.",
    icon: "⛽",
    color: "bg-red-100 dark:bg-red-900",
  },
  {
    id: "lockout",
    title: "Lockout Assistance",
    description: "Locked your keys in your car? Our technicians will help you regain access to your vehicle.",
    icon: "🔑",
    color: "bg-purple-100 dark:bg-purple-900",
  },
  {
    id: "winching",
    title: "Winching Service",
    description:
      "If your vehicle is stuck in mud, snow, or a ditch, our winching service will help get you back on the road.",
    icon: "🧵",
    color: "bg-orange-100 dark:bg-orange-900",
  },
]

export default function ServicesPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Our Roadside Assistance Services</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          We offer a comprehensive range of roadside assistance services to keep you moving. Available 24/7, our
          professional technicians are just a call away.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <Card
            key={service.id}
            className="overflow-hidden border-t-4"
            style={{ borderTopColor: `var(--${service.color.split("-")[1]}-600)` }}
          >
            <CardHeader className={`${service.color} flex flex-row items-center gap-4`}>
              <span className="text-4xl">{service.icon}</span>
              <CardTitle>{service.title}</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <CardDescription className="text-base">{service.description}</CardDescription>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Link href={`/services/${service.id}`}>
                <Button variant="outline">Learn More</Button>
              </Link>
              <Link href="/service-request">
                <Button>Request Service</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-3xl font-bold mb-6">Need Emergency Assistance?</h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/emergency">
            <Button size="lg" variant="destructive" className="text-lg px-8">
              Emergency SOS
            </Button>
          </Link>
          <Link href="/membership">
            <Button size="lg" variant="outline" className="text-lg px-8">
              View Membership Plans
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
