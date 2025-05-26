import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Star, Phone, Clock, MapPin, Users, Wrench, Shield } from "lucide-react"

export default function PremiumMembershipPage() {
  const premiumFeatures = [
    {
      icon: Phone,
      title: "Unlimited Service Calls",
      description: "No limits on roadside assistance requests throughout the year",
    },
    {
      icon: Clock,
      title: "Priority Response",
      description: "15-minute faster response time compared to basic members",
    },
    {
      icon: MapPin,
      title: "Extended Coverage Area",
      description: "Coverage extends 200 miles beyond standard service areas",
    },
    {
      icon: Users,
      title: "Multiple Vehicles",
      description: "Cover up to 4 vehicles under one premium membership",
    },
    {
      icon: Wrench,
      title: "Advanced Services",
      description: "Includes locksmith, winching, and minor roadside repairs",
    },
    {
      icon: Shield,
      title: "24/7 Premium Support",
      description: "Dedicated premium support line with specialized agents",
    },
  ]

  const includedServices = [
    "Emergency towing (unlimited distance)",
    "Battery jump-start and replacement",
    "Flat tire change and repair",
    "Lockout assistance and key replacement",
    "Fuel delivery service",
    "Winching and recovery services",
    "Minor roadside repairs",
    "Trip interruption coverage",
    "Concierge services",
    "Emergency accommodation assistance",
  ]

  const comparisonFeatures = [
    { feature: "Service Calls per Year", basic: "5", premium: "Unlimited" },
    { feature: "Response Time", basic: "45 minutes", premium: "30 minutes" },
    { feature: "Coverage Area", basic: "Standard", premium: "Extended (+200 miles)" },
    { feature: "Vehicles Covered", basic: "1", premium: "Up to 4" },
    { feature: "Towing Distance", basic: "10 miles", premium: "Unlimited" },
    { feature: "Locksmith Services", basic: "Basic", premium: "Advanced" },
    { feature: "Trip Interruption", basic: "Not included", premium: "Included" },
    { feature: "Priority Support", basic: "Standard", premium: "Premium 24/7" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full mb-6">
            <Star className="h-4 w-4" />
            <span className="text-sm font-medium">Most Popular Plan</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Premium Membership
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Experience the ultimate in roadside assistance with unlimited service calls, priority response, and
            comprehensive coverage for all your vehicles.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900">$149</div>
              <div className="text-gray-600">per year</div>
              <div className="text-sm text-green-600 font-medium">Save $50 vs monthly</div>
            </div>

            <div className="hidden sm:block w-px h-16 bg-gray-300"></div>

            <div className="text-center">
              <div className="text-2xl font-semibold text-gray-900">30-Day</div>
              <div className="text-gray-600">Money-Back Guarantee</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              asChild
            >
              <Link href="/auth/register?plan=premium">Start Premium Membership</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/contact">Contact Sales Team</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Premium Features & Benefits</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get the most comprehensive roadside assistance coverage with exclusive premium benefits
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {premiumFeatures.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Included Services */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What's Included</h2>
            <p className="text-xl text-gray-600">Comprehensive roadside assistance services at your fingertips</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {includedServices.map((service, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <span className="text-gray-700">{service}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Premium vs Basic</h2>
            <p className="text-xl text-gray-600">See how Premium membership compares to our Basic plan</p>
          </div>

          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-semibold">Feature</th>
                    <th className="text-center p-4 font-semibold">Basic</th>
                    <th className="text-center p-4 font-semibold bg-gradient-to-r from-blue-50 to-purple-50">
                      <div className="flex items-center justify-center space-x-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span>Premium</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-4 font-medium">{item.feature}</td>
                      <td className="p-4 text-center text-gray-600">{item.basic}</td>
                      <td className="p-4 text-center bg-gradient-to-r from-blue-50 to-purple-50 font-semibold text-blue-700">
                        {item.premium}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Upgrade to Premium?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied premium members who never worry about roadside emergencies. Start your premium
            membership today with our 30-day money-back guarantee.
          </p>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100" asChild>
              <Link href="/auth/register?plan=premium">Start Premium Membership</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600"
              asChild
            >
              <Link href="/membership/basic">Compare with Basic</Link>
            </Button>
          </div>

          <div className="mt-8 text-blue-100 text-sm">
            <p>
              Questions? Call our sales team at <span className="font-semibold">(555) 123-4567</span>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
