import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Phone, Mail, FileText, HelpCircle, BookOpen } from "lucide-react"
import Link from "next/link"

export default function SupportPage() {
  return (
    <div className="container py-10">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Customer Support</h1>
        <p className="text-xl text-muted-foreground">
          We're here to help. Find the support you need through our various channels.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="relative">
            <Input type="text" placeholder="Search for help articles, FAQs, or topics..." className="pl-10 h-12" />
            <HelpCircle className="absolute left-3 top-3 h-6 w-6 text-muted-foreground" />
          </div>
        </div>

        <Tabs defaultValue="contact" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
            <TabsTrigger value="contact">Contact Us</TabsTrigger>
            <TabsTrigger value="self-help">Self-Help</TabsTrigger>
            <TabsTrigger value="emergency">Emergency</TabsTrigger>
            <TabsTrigger value="account">Account Help</TabsTrigger>
          </TabsList>

          <TabsContent value="contact">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Phone className="mr-2 h-5 w-5" /> Phone Support
                  </CardTitle>
                  <CardDescription>Speak directly with our support team</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">Our support team is available 24/7 to assist you.</p>
                  <p className="font-medium text-lg">1-800-ROAD-HELP</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    For roadside assistance, please call our emergency line.
                  </p>
                  <Button className="mt-4" asChild>
                    <a href="tel:18007623435">Call Now</a>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Mail className="mr-2 h-5 w-5" /> Email Support
                  </CardTitle>
                  <CardDescription>Send us a detailed message</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Email our support team for non-urgent inquiries. We typically respond within 24 hours.
                  </p>
                  <p className="font-medium text-lg">support@roadrescue.com</p>
                  <p className="text-sm text-muted-foreground mt-2">Please include your membership ID if applicable.</p>
                  <Button className="mt-4" asChild>
                    <a href="mailto:support@roadrescue.com">Email Us</a>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageSquare className="mr-2 h-5 w-5" /> Live Chat
                  </CardTitle>
                  <CardDescription>Chat with a support representative</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Connect with our support team instantly through live chat for quick assistance.
                  </p>
                  <p className="text-sm text-muted-foreground">Available Monday-Friday, 8am-8pm EST</p>
                  <Button className="mt-4">Start Chat</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="mr-2 h-5 w-5" /> Submit a Ticket
                  </CardTitle>
                  <CardDescription>Create a support ticket for tracking</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Submit a detailed support ticket for complex issues that require investigation.
                  </p>
                  <p className="text-sm text-muted-foreground">We'll provide you with a ticket number for tracking.</p>
                  <Button className="mt-4" asChild>
                    <Link href="/support/ticket">Create Ticket</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="self-help">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <HelpCircle className="mr-2 h-5 w-5" /> FAQs
                  </CardTitle>
                  <CardDescription>Frequently asked questions</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Find answers to common questions about our services, membership plans, and more.
                  </p>
                  <Button asChild>
                    <Link href="/faqs">View FAQs</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="mr-2 h-5 w-5" /> Knowledge Base
                  </CardTitle>
                  <CardDescription>In-depth articles and guides</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Explore our comprehensive knowledge base for detailed information and step-by-step guides.
                  </p>
                  <Button asChild>
                    <Link href="/knowledge-base">Browse Articles</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Popular Support Topics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <Link
                      href="/support/membership-benefits"
                      className="p-4 border rounded-lg hover:bg-muted transition-colors"
                    >
                      Understanding Membership Benefits
                    </Link>
                    <Link
                      href="/support/request-assistance"
                      className="p-4 border rounded-lg hover:bg-muted transition-colors"
                    >
                      How to Request Assistance
                    </Link>
                    <Link
                      href="/support/billing-questions"
                      className="p-4 border rounded-lg hover:bg-muted transition-colors"
                    >
                      Billing Questions
                    </Link>
                    <Link
                      href="/support/app-troubleshooting"
                      className="p-4 border rounded-lg hover:bg-muted transition-colors"
                    >
                      Mobile App Troubleshooting
                    </Link>
                    <Link
                      href="/support/update-vehicle"
                      className="p-4 border rounded-lg hover:bg-muted transition-colors"
                    >
                      Updating Vehicle Information
                    </Link>
                    <Link
                      href="/support/cancel-membership"
                      className="p-4 border rounded-lg hover:bg-muted transition-colors"
                    >
                      Canceling Membership
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="emergency">
            <Card className="border-destructive">
              <CardHeader className="bg-destructive text-destructive-foreground">
                <CardTitle>Emergency Roadside Assistance</CardTitle>
                <CardDescription className="text-destructive-foreground/80">
                  For immediate roadside assistance
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="text-center mb-6">
                  <p className="text-2xl font-bold mb-2">Call our 24/7 Emergency Hotline</p>
                  <p className="text-3xl font-bold text-destructive">1-800-ROAD-HELP</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Using Our Mobile App</h3>
                    <p className="text-muted-foreground mb-4">
                      The fastest way to request help is through our mobile app, which automatically sends your location
                      to our dispatch team.
                    </p>
                    <Button variant="outline" className="w-full">
                      Download App
                    </Button>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Safety First</h3>
                    <p className="text-muted-foreground mb-4">
                      If you're in an unsafe situation or immediate danger, please call 911 first, then contact our
                      emergency services.
                    </p>
                    <Button variant="destructive" className="w-full" asChild>
                      <Link href="/emergency">Emergency Instructions</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/dashboard/settings" className="text-primary hover:underline">
                        Update Account Information
                      </Link>
                    </li>
                    <li>
                      <Link href="/dashboard/vehicles" className="text-primary hover:underline">
                        Manage Vehicles
                      </Link>
                    </li>
                    <li>
                      <Link href="/dashboard/payment-methods" className="text-primary hover:underline">
                        Update Payment Methods
                      </Link>
                    </li>
                    <li>
                      <Link href="/dashboard/membership" className="text-primary hover:underline">
                        Change Membership Plan
                      </Link>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Billing & Payments</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/dashboard/billing-history" className="text-primary hover:underline">
                        View Billing History
                      </Link>
                    </li>
                    <li>
                      <Link href="/dashboard/invoices" className="text-primary hover:underline">
                        Download Invoices
                      </Link>
                    </li>
                    <li>
                      <Link href="/support/billing-dispute" className="text-primary hover:underline">
                        Report Billing Issue
                      </Link>
                    </li>
                    <li>
                      <Link href="/support/payment-methods" className="text-primary hover:underline">
                        Payment Methods FAQ
                      </Link>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Account Security</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/dashboard/change-password" className="text-primary hover:underline">
                        Change Password
                      </Link>
                    </li>
                    <li>
                      <Link href="/dashboard/two-factor" className="text-primary hover:underline">
                        Enable Two-Factor Authentication
                      </Link>
                    </li>
                    <li>
                      <Link href="/support/account-security" className="text-primary hover:underline">
                        Account Security Tips
                      </Link>
                    </li>
                    <li>
                      <Link href="/support/report-suspicious" className="text-primary hover:underline">
                        Report Suspicious Activity
                      </Link>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-12 p-6 bg-muted rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-center">Need Additional Help?</h3>
          <p className="text-center mb-6">
            Our customer support team is available 24/7 to assist you with any questions or concerns.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/faqs">View FAQs</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
