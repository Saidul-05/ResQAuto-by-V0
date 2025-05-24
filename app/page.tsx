import { ServiceCard } from "@/components/service-card"
import { TestimonialCard } from "@/components/testimonial-card"
import { MembershipCard } from "@/components/membership-card"
import { HowItWorks } from "@/components/how-it-works"
import { Button } from "@/components/ui/button"
import { ServiceRequestButton } from "@/components/service-request-button"
import Link from "next/link"

export default function Home() {
  // Services data
  const services = [
    {
      id: "flat-tire",
      title: "Flat Tire Change",
      description: "Quick and efficient tire change service to get you back on the road.",
      icon: "🔧",
    },
    {
      id: "battery-jump",
      title: "Battery Jump Start",
      description: "Jump start service for when your battery is dead or weak.",
      icon: "🔋",
    },
    {
      id: "towing",
      title: "Towing Service",
      description: "Professional towing to your preferred repair facility.",
      icon: "🚚",
    },
    {
      id: "fuel-delivery",
      title: "Fuel Delivery",
      description: "Emergency fuel delivery when you run out of gas.",
      icon: "⛽",
    },
    {
      id: "lockout",
      title: "Lockout Assistance",
      description: "Help when you're locked out of your vehicle.",
      icon: "🔑",
    },
    {
      id: "other",
      title: "Other Services",
      description: "Additional roadside assistance services for various situations.",
      icon: "🛠️",
    },
  ]

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "John Smith",
      location: "New York, NY",
      rating: 5,
      text: "The service was incredibly fast. I was stranded with a flat tire and they were there within 20 minutes!",
      date: "2023-05-15",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      location: "Los Angeles, CA",
      rating: 5,
      text: "I've been a member for 2 years and every time I've needed help, they've been prompt and professional.",
      date: "2023-04-22",
    },
    {
      id: 3,
      name: "Michael Brown",
      location: "Chicago, IL",
      rating: 4,
      text: "Great service overall. The technician was knowledgeable and fixed my battery issue quickly.",
      date: "2023-06-03",
    },
  ]

  // Membership plans data
  const membershipPlans = [
    {
      id: "basic",
      title: "Basic Plan",
      price: "$59.99",
      period: "per year",
      features: [
        "24/7 Roadside Assistance",
        "Towing up to 5 miles",
        "Flat Tire Service",
        "Battery Jump Start",
        "Lockout Service",
      ],
      popular: false,
    },
    {
      id: "premium",
      title: "Premium Plan",
      price: "$99.99",
      period: "per year",
      features: [
        "All Basic Plan features",
        "Towing up to 100 miles",
        "Fuel Delivery Service",
        "Trip Interruption Benefits",
        "Rental Car Discounts",
        "4 Service Calls per year",
      ],
      popular: true,
    },
    {
      id: "family",
      title: "Family Plan",
      price: "$149.99",
      period: "per year",
      features: [
        "All Premium Plan features",
        "Coverage for up to 5 family members",
        "Towing up to 200 miles",
        "RV and Motorcycle Coverage",
        "6 Service Calls per year",
        "Hotel Discounts",
      ],
      popular: false,
    },
  ]

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-muted/50 to-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  24/7 Roadside Assistance You Can Trust
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Fast, reliable roadside assistance when you need it most. Our professional technicians are just a
                  click away.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <ServiceRequestButton detailed={true} size="lg" />
                <Link href="/membership">
                  <Button variant="outline" size="lg">
                    View Membership Plans
                  </Button>
                </Link>
              </div>
            </div>
            <img
              src="/placeholder.svg?height=550&width=550"
              width={550}
              height={550}
              alt="Roadside Assistance"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="w-full py-12 md:py-24 lg:py-32" id="services">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Services</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We offer a comprehensive range of roadside assistance services to help you get back on the road quickly
                and safely.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                title={service.title}
                description={service.description}
                icon={service.icon}
                serviceId={service.id}
              />
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <Link href="/services">
              <Button variant="outline">View All Services</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <HowItWorks />

      {/* Membership Plans Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50" id="membership">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Membership Plans</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Choose the perfect membership plan for your roadside assistance needs and enjoy peace of mind on every
                journey.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
            {membershipPlans.map((plan) => (
              <MembershipCard
                key={plan.id}
                title={plan.title}
                price={plan.price}
                period={plan.period}
                features={plan.features}
                popular={plan.popular}
                planId={plan.id}
              />
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <Link href="/membership">
              <Button variant="outline">Compare All Plans</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-12 md:py-24 lg:py-32" id="testimonials">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">What Our Customers Say</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Don't just take our word for it. Here's what our customers have to say about our roadside assistance
                services.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                name={testimonial.name}
                location={testimonial.location}
                rating={testimonial.rating}
                text={testimonial.text}
                date={testimonial.date}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Get Started?</h2>
              <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join thousands of satisfied customers who trust us for their roadside assistance needs.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <ServiceRequestButton />
              <Link href="/membership">
                <Button variant="secondary">Become a Member</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
