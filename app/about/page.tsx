import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, MapPin, ShieldCheck, Timer, Truck, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-12 md:py-24 bg-muted">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
          <div className="space-y-3">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">About RoadRescue</h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Your trusted partner for roadside assistance for over 15 years. We've helped over 2 million drivers get
              back on the road safely.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:gap-12 xl:grid-cols-[1fr_1fr]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <Badge variant="outline">Our Mission</Badge>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Providing peace of mind on every journey
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  At RoadRescue, we believe that everyone deserves to travel with confidence. Our mission is to deliver
                  exceptional roadside assistance that gives drivers peace of mind no matter where their journey takes
                  them.
                </p>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We are committed to:
                </p>
                <ul className="space-y-2 max-w-[600px] text-muted-foreground">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                    Responding quickly to drivers in need
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                    Providing professional, courteous service
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                    Using the latest technology for efficient assistance
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                    Making safety our top priority
                  </li>
                </ul>
              </div>
            </div>
            <Image
              src="/placeholder.svg?height=550&width=550"
              width={550}
              height={550}
              alt="RoadRescue Team"
              className="mx-auto aspect-square overflow-hidden rounded-xl object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-12 md:py-24 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:gap-12 xl:grid-cols-[1fr_1fr]">
            <Image
              src="/placeholder.svg?height=550&width=550"
              width={550}
              height={550}
              alt="RoadRescue History"
              className="mx-auto aspect-square overflow-hidden rounded-xl object-cover object-center lg:order-last"
            />
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <Badge variant="outline">Our History</Badge>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  From humble beginnings to nationwide service
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  RoadRescue was founded in 2008 by former auto mechanic Michael Rodriguez with a single tow truck and a
                  vision to transform roadside assistance with better service and faster response times.
                </p>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  What started as a local operation in Austin, Texas has grown into a nationwide network with over
                  45,000 service providers. Through strategic partnerships and an unwavering commitment to customer
                  satisfaction, we've expanded our reach while maintaining the personal touch that set us apart from the
                  beginning.
                </p>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Today, we're proud to be one of the largest independent roadside assistance providers in North
                  America, serving millions of customers each year.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Why Choose RoadRescue</h2>
            <p className="mt-4 text-muted-foreground">
              We're committed to providing exceptional service that goes beyond the standard roadside assistance
              experience.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="p-2 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <Timer className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Fast Response Times</h3>
                <p className="text-muted-foreground">
                  Our average response time is just 15 minutes, getting you back on the road quickly and safely.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="p-2 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Nationwide Coverage</h3>
                <p className="text-muted-foreground">
                  Our network of over 45,000 service providers ensures you're covered no matter where you are.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="p-2 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Transparent Pricing</h3>
                <p className="text-muted-foreground">
                  No hidden fees or surprise charges. We're upfront about our services and pricing.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="p-2 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <Truck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Professional Technicians</h3>
                <p className="text-muted-foreground">
                  All our technicians are certified, insured, and regularly trained on the latest vehicle technologies.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="p-2 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">24/7 Customer Support</h3>
                <p className="text-muted-foreground">
                  Our support team is available around the clock to assist with any questions or concerns.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="p-2 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Satisfaction Guarantee</h3>
                <p className="text-muted-foreground">
                  If you're not completely satisfied with our service, we'll make it right or refund your money.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-12 md:py-24 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Leadership Team</h2>
            <p className="mt-4 text-muted-foreground">Meet the people who drive our mission forward every day.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6 text-center">
                <Image
                  src="/placeholder.svg?height=150&width=150"
                  width={150}
                  height={150}
                  alt="Michael Rodriguez"
                  className="mx-auto rounded-full mb-4"
                />
                <h3 className="text-xl font-bold">Michael Rodriguez</h3>
                <p className="text-muted-foreground mb-2">Founder & CEO</p>
                <p className="text-sm text-muted-foreground">
                  Former auto mechanic with a passion for helping stranded motorists.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Image
                  src="/placeholder.svg?height=150&width=150"
                  width={150}
                  height={150}
                  alt="Sarah Chen"
                  className="mx-auto rounded-full mb-4"
                />
                <h3 className="text-xl font-bold">Sarah Chen</h3>
                <p className="text-muted-foreground mb-2">COO</p>
                <p className="text-sm text-muted-foreground">
                  Operations expert with 15+ years in logistics and supply chain management.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Image
                  src="/placeholder.svg?height=150&width=150"
                  width={150}
                  height={150}
                  alt="David Washington"
                  className="mx-auto rounded-full mb-4"
                />
                <h3 className="text-xl font-bold">David Washington</h3>
                <p className="text-muted-foreground mb-2">CTO</p>
                <p className="text-sm text-muted-foreground">
                  Tech visionary leading our digital transformation and innovation efforts.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="rounded-lg bg-primary text-primary-foreground p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
              Join the RoadRescue Family
            </h2>
            <p className="mx-auto max-w-[700px] mb-6">
              Become a member today and enjoy peace of mind knowing we're just a call away whenever you need us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/membership">Explore Membership Options</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="bg-transparent border-primary-foreground/20 hover:bg-primary-foreground/10"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
